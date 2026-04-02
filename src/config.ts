import { createClient } from "@1claw/sdk";
import { z } from "zod";

// =============================================================================
// SCHEMA
// =============================================================================

const WalletConfigSchema = z.object({
  // Control plane connection (fetched from 1Claw)
  apiUrl: z.string().url(),
  apiToken: z.string().min(1),

  // Display-only (fetched from 1Claw)
  walletAddress: z.string().min(1),

  // Fiat account IDs (fetched from 1Claw — passed to control plane in requests)
  usdAccountId: z.string().min(1),
  eurAccountId: z.string().min(1),

  // Behaviour settings (from pluginConfig UI — not sensitive)
  dailySpendLimit: z.number().positive().default(50),
  monthlySpendLimit: z.number().positive().default(500),
  perTransactionLimit: z.number().positive().default(5),
  autoInjectBalance: z.boolean().default(true),
});

export type WalletConfig = z.infer<typeof WalletConfigSchema>;

// =============================================================================
// HELPERS
// =============================================================================

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`[fiat-wallet] Missing required env var: ${key}`);
  return val;
}

// =============================================================================
// RESOLVE CONFIG
// Bootstraps from 2 env vars, fetches everything else from 1Claw vault.
// pluginConfig supplies non-sensitive behaviour settings from the UI.
// =============================================================================

export async function resolveConfig(
  pluginConfig: Record<string, unknown> = {}
): Promise<WalletConfig> {
  // Step 1: bootstrap — only 2 env vars needed
  const agentApiKey = requireEnv("ONECLAW_AGENT_API_KEY");
  const vaultId = requireEnv("ONECLAW_VAULT_ID");

  // Step 2: authenticate to 1Claw
  const client = createClient({
    baseUrl: "https://api.1claw.xyz",
    apiKey: agentApiKey,
  });

  // Step 3: fetch all real secrets just-in-time from vault
  // Each call is logged in the 1Claw audit trail
  const secretKeys = [
    "plugin/api-url",
    "plugin/api-token",
    "wallet/address",
    "fiat/usd-account-id",
    "fiat/eur-account-id",
  ] as const;

  const results = await Promise.all(
    secretKeys.map((key) => client.secrets.get(vaultId, key))
  );

  // Check each result for errors before accessing data
  const [apiUrl, apiToken, walletAddress, usdAccountId, eurAccountId] = results.map(
    (res, i) => {
      if (res.error) {
        throw new Error(
          `[fiat-wallet] Failed to fetch secret "${secretKeys[i]}" from vault: ${res.error.message}`
        );
      }
      return res.data?.value;
    }
  );

  // Step 4: parse and validate — throws clearly if anything is missing or malformed
  return WalletConfigSchema.parse({
    apiUrl,
    apiToken,
    walletAddress,
    usdAccountId,
    eurAccountId,

    // Behaviour settings from pluginConfig (user-controlled via UI)
    dailySpendLimit: (pluginConfig.dailySpendLimit as number) ?? 50,
    monthlySpendLimit: (pluginConfig.monthlySpendLimit as number) ?? 500,
    perTransactionLimit: (pluginConfig.perTransactionLimit as number) ?? 5,
    autoInjectBalance: (pluginConfig.autoInjectBalance as boolean) ?? true,
  });
}
