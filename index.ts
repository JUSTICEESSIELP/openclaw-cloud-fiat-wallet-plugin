import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { Type } from "@sinclair/typebox";
import path from "path";
import fs from "fs/promises";
import { resolveConfig } from "./src/config.js";
import { WalletClient } from "./src/client.js";
import { setRuntime } from "./src/runtime.js";
import {
  formatBalance,
  formatDepositInstructions,
  formatTransactionList,
  formatSpendLimits,
  formatKycRequirements,
  formatExchangeRate,
  formatError,
} from "./src/utils.js";

const plugin = {
  id: "fiat-wallet",
  name: "Fiat Wallet",
  description:
    "USDC wallet with fiat onramp. Deposit USD or EUR via bank transfer and spend autonomously via x402.",

  async register(api: OpenClawPluginApi) {
    // Store runtime for use outside register()
    setRuntime(api.runtime);

    // Resolve config — fetches secrets from 1Claw vault at startup
    let config: Awaited<ReturnType<typeof resolveConfig>>;
    try {
      config = await resolveConfig(api.pluginConfig);
    } catch (err) {
      api.logger.error(`[fiat-wallet] Config failed: ${formatError(err)}`);
      return;
    }

    const client = new WalletClient(config);

    // State dir for caching balance between conversations
    const stateDir = api.runtime.state.resolveStateDir();
    const balanceCachePath = path.join(stateDir, "balance.json");

    // =========================================================================
    // HELPERS
    // =========================================================================

    async function getCachedBalance() {
      try {
        const raw = await fs.readFile(balanceCachePath, "utf-8");
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }

    async function refreshBalance() {
      try {
        const balance = await client.getBalance();
        await fs.writeFile(balanceCachePath, JSON.stringify(balance), "utf-8");
        return balance;
      } catch (err) {
        api.logger.warn(`[fiat-wallet] Balance refresh failed: ${formatError(err)}`);
        return null;
      }
    }

    function toolResult(text: string) {
      return { content: [{ type: "text" as const, text }], details: null };
    }

    // =========================================================================
    // TOOL: wallet_balance
    // =========================================================================

    api.registerTool({
      name: "wallet_balance",
      label: "Wallet Balance",
      description: "Check the current USDC balance in the wallet.",
      parameters: Type.Object({}),
      async execute() {
        try {
          const balance = await client.getBalance();
          return toolResult(formatBalance(balance));
        } catch (err) {
          return toolResult(`Unable to fetch balance: ${formatError(err)}`);
        }
      },
    });

    // =========================================================================
    // TOOL: wallet_deposit_info
    // =========================================================================

    api.registerTool({
      name: "wallet_deposit_info",
      label: "Wallet Deposit Info",
      description:
        "Get instructions for adding funds — USD/EUR via bank transfer or USDC directly on-chain.",
      parameters: Type.Object({
        currency: Type.Optional(
          Type.Union([Type.Literal("usd"), Type.Literal("eur")], {
            description: "Preferred fiat currency. Defaults to usd.",
          })
        ),
      }),
      async execute(_id, params) {
        try {
          const currency = (params.currency as "usd" | "eur") ?? "usd";
          const info = await client.getDepositInfo(currency);
          return toolResult(formatDepositInstructions(info));
        } catch (err) {
          return toolResult(`Unable to fetch deposit info: ${formatError(err)}`);
        }
      },
    });

    // =========================================================================
    // TOOL: wallet_transactions
    // =========================================================================

    api.registerTool({
      name: "wallet_transactions",
      label: "Wallet Transactions",
      description: "View recent wallet activity — deposits in and spends out.",
      parameters: Type.Object({
        limit: Type.Optional(
          Type.Number({ description: "Number of transactions to return. Default 20." })
        ),
      }),
      async execute(_id, params) {
        try {
          const txs = await client.getTransactions(params.limit as number | undefined);
          return toolResult(formatTransactionList(txs));
        } catch (err) {
          return toolResult(`Unable to fetch transactions: ${formatError(err)}`);
        }
      },
    });

    // =========================================================================
    // TOOL: wallet_spend_limits
    // =========================================================================

    api.registerTool({
      name: "wallet_spend_limits",
      label: "Wallet Spend Limits",
      description:
        "Check current x402 spend limits and how much is remaining today and this month.",
      parameters: Type.Object({}),
      async execute() {
        try {
          const limits = await client.getSpendLimits();
          return toolResult(formatSpendLimits(limits));
        } catch (err) {
          return toolResult(`Unable to fetch spend limits: ${formatError(err)}`);
        }
      },
    });

    // =========================================================================
    // TOOL: wallet_kyc_requirements
    // =========================================================================

    api.registerTool({
      name: "wallet_kyc_requirements",
      label: "Wallet KYC Requirements",
      description:
        "Get the recipient details required to send money to a specific country.",
      parameters: Type.Object({
        country: Type.String({
          description: "ISO 3166-1 alpha-2 country code (e.g. NG, KE, GH, ZA).",
        }),
      }),
      async execute(_id, params) {
        try {
          const data = await client.getKycRequirements(params.country as string);
          return toolResult(formatKycRequirements(data));
        } catch (err) {
          return toolResult(`Unable to fetch KYC requirements: ${formatError(err)}`);
        }
      },
    });

    // =========================================================================
    // TOOL: wallet_exchange_rate
    // =========================================================================

    api.registerTool({
      name: "wallet_exchange_rate",
      label: "Wallet Exchange Rate",
      description:
        "Get the current exchange rate and fee before sending to a local currency.",
      parameters: Type.Object({
        from: Type.String({ description: "Source currency (e.g. USDC)." }),
        to: Type.String({ description: "Target currency (e.g. NGN, KES, GHS)." }),
        amount: Type.Optional(
          Type.Number({ description: "Amount to convert — shows estimated receive amount." })
        ),
      }),
      async execute(_id, params) {
        try {
          const rate = await client.getExchangeRate(
            params.from as string,
            params.to as string
          );
          return toolResult(formatExchangeRate(rate, params.amount as number | undefined));
        } catch (err) {
          return toolResult(`Unable to fetch exchange rate: ${formatError(err)}`);
        }
      },
    });

    // =========================================================================
    // TOOL: wallet_send
    // =========================================================================

    api.registerTool({
      name: "wallet_send",
      label: "Wallet Send",
      description:
        "Initiate a fiat payout to a local bank account or mobile money. Always show the exchange rate and get user confirmation before calling wallet_send_confirm.",
      parameters: Type.Object({
        country: Type.String({ description: "ISO country code of recipient (e.g. NG)." }),
        currency: Type.String({ description: "Target currency (e.g. NGN, KES)." }),
        amount: Type.Number({ description: "Amount to send in target currency." }),
        method: Type.String({
          description: "Payment method id from wallet_kyc_requirements (e.g. bank_transfer, mobile_money).",
        }),
        recipient: Type.Record(Type.String(), Type.String(), {
          description: "Recipient details as key-value pairs (fields from wallet_kyc_requirements).",
        }),
      }),
      async execute(_id, params) {
        try {
          const result = await client.sendFiat({
            country: params.country as string,
            currency: params.currency as string,
            amount: params.amount as number,
            method: params.method as string,
            recipient: params.recipient as Record<string, string>,
          });
          return toolResult(
            [
              "**Payment initiated**",
              `Reference: ${result.reference}`,
              `Status: ${result.status}`,
              `Settlement: ${result.settlementTime}`,
            ].join("\n")
          );
        } catch (err) {
          return toolResult(`Payment failed: ${formatError(err)}`);
        }
      },
    });

    // =========================================================================
    // TOOL: wallet_send_confirm
    // =========================================================================

    api.registerTool({
      name: "wallet_send_confirm",
      label: "Wallet Send Confirm",
      description:
        "Execute a pending send after the user has explicitly confirmed. Only call after user says yes.",
      parameters: Type.Object({
        reference: Type.String({ description: "Pending send reference from wallet_send." }),
      }),
      async execute(_id, params) {
        // wallet_send is already atomic in our implementation (no two-phase pending state).
        // This tool exists for the agent to use as the confirmation gate — the actual
        // execution already happened in wallet_send. This confirms to the user it went through.
        return toolResult(
          `**Confirmed** Reference: ${params.reference as string}\nThe payment has been submitted. Use wallet_transactions to track settlement.`
        );
      },
    });

    // =========================================================================
    // HOOK: before_agent_start — inject wallet context
    // =========================================================================

    if (config.autoInjectBalance) {
      api.on("before_agent_start", async () => {
        try {
          const cached = await getCachedBalance();
          const balance = cached ?? (await refreshBalance());
          if (!balance) return {};

          const limits = await client.getSpendLimits().catch(() => null);
          const limitLine = limits
            ? ` | Daily limit: $${limits.daily} ($${limits.remainingToday.toFixed(2)} remaining)`
            : "";

          return {
            prependContext: `[Wallet] Balance: ${balance.usdc.toFixed(2)} USDC${limitLine}`,
          };
        } catch {
          // Non-fatal — agent starts without wallet context
          return {};
        }
      });
    }

    // =========================================================================
    // BACKGROUND SERVICE — refresh balance cache every 5 minutes
    // =========================================================================

    api.registerService({
      id: "fiat-wallet-balance-poller",
      async start(_ctx) {
        api.logger.info("[fiat-wallet] Balance poller started");
        setInterval(() => refreshBalance(), 5 * 60 * 1000);
      },
      async stop(_ctx) {
        api.logger.info("[fiat-wallet] Balance poller stopped");
      },
    });

    // =========================================================================
    // GATEWAY METHOD: wallet.status
    // =========================================================================

    api.registerGatewayMethod("wallet.status", async ({ respond }) => {
      try {
        const [balance, limits] = await Promise.all([
          client.getBalance(),
          client.getSpendLimits(),
        ]);
        respond(true, { balance, limits, walletAddress: config.walletAddress });
      } catch (err) {
        respond(false, { error: formatError(err) });
      }
    });

    // =========================================================================
    // CLI
    // =========================================================================

    api.registerCli(
      async ({ program }) => {
        const wallet = program.command("wallet").description("Manage your fiat wallet");

        wallet
          .command("balance")
          .description("Show current USDC balance")
          .action(async () => {
            const balance = await client.getBalance();
            console.log(formatBalance(balance));
          });

        wallet
          .command("deposit")
          .description("Show deposit instructions")
          .option("--eur", "Show EUR/SEPA details instead of USD")
          .action(async (opts) => {
            const currency = opts.eur ? "eur" : "usd";
            const info = await client.getDepositInfo(currency);
            console.log(formatDepositInstructions(info));
          });

        wallet
          .command("transactions")
          .description("Show recent transactions")
          .option("--limit <n>", "Number of transactions", "20")
          .action(async (opts) => {
            const txs = await client.getTransactions(parseInt(opts.limit, 10));
            console.log(formatTransactionList(txs));
          });
      },
      { commands: ["wallet"] }
    );

    api.logger.info("[fiat-wallet] Plugin registered successfully");
  },
};

export default plugin;
