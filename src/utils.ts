import type {
  BalanceResponse,
  DepositInfoResponse,
  ExchangeRateResponse,
  KycRequirementsResponse,
  SpendLimits,
  Transaction,
} from "./client.js";

export function formatBalance(balance: BalanceResponse): string {
  const updated = new Date(balance.lastUpdated).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `**${balance.usdc.toFixed(2)} USDC** (updated ${updated})`;
}

export function formatDepositInstructions(info: DepositInfoResponse): string {
  const lines: string[] = [];

  if (info.currency === "usd" && info.bank) {
    lines.push("**Deposit USD via bank transfer:**");
    if (info.bank.bankName) lines.push(`Bank: ${info.bank.bankName}`);
    if (info.bank.routingNumber) lines.push(`Routing number: ${info.bank.routingNumber}`);
    if (info.bank.accountNumber) lines.push(`Account number: ${info.bank.accountNumber}`);
    if (info.bank.reference) lines.push(`Reference: ${info.bank.reference} *(include this)*`);
    lines.push("Settlement: up to 24 hours (ACH) or same day (Wire)");
  }

  if (info.currency === "eur" && info.bank) {
    lines.push("**Deposit EUR via SEPA transfer:**");
    if (info.bank.bankName) lines.push(`Bank: ${info.bank.bankName}`);
    if (info.bank.iban) lines.push(`IBAN: ${info.bank.iban}`);
    if (info.bank.bic) lines.push(`BIC: ${info.bank.bic}`);
    if (info.bank.reference) lines.push(`Reference: ${info.bank.reference} *(include this)*`);
    lines.push("Settlement: 1–2 business days (SEPA)");
  }

  lines.push("");
  lines.push("**Or deposit USDC directly on-chain:**");
  lines.push(`Address: \`${info.crypto.address}\``);
  lines.push(`Network: ${info.crypto.network}`);
  lines.push(`Settlement: ${info.crypto.settlementTime}`);

  return lines.join("\n");
}

export function formatTransactionList(transactions: Transaction[]): string {
  if (!transactions.length) return "No transactions found.";

  const lines = transactions.map((tx) => {
    const date = new Date(tx.createdAt).toLocaleDateString();
    const sign = tx.type === "deposit" ? "+" : "-";
    const status = tx.status !== "settled" ? ` *(${tx.status})*` : "";
    return `${date} | ${sign}${tx.amount.toFixed(2)} ${tx.currency} | ${tx.description}${status}`;
  });

  return ["**Recent transactions:**", ...lines].join("\n");
}

export function formatSpendLimits(limits: SpendLimits): string {
  return [
    "**Spend limits:**",
    `Per transaction: $${limits.perTransaction.toFixed(2)} USDC`,
    `Daily: $${limits.daily.toFixed(2)} USDC (${limits.remainingToday.toFixed(2)} remaining today)`,
    `Monthly: $${limits.monthly.toFixed(2)} USDC (${limits.remainingThisMonth.toFixed(2)} remaining this month)`,
  ].join("\n");
}

export function formatKycRequirements(data: KycRequirementsResponse): string {
  const lines: string[] = [`**Requirements to send money to ${data.country}:**`];

  for (const method of data.methods) {
    lines.push(`\n**${method.label}** (settles ${method.settlementTime}):`);
    for (const field of method.fields) {
      const req = field.required ? "required" : "optional";
      const ex = field.example ? ` (e.g. ${field.example})` : "";
      lines.push(`- ${field.label}${ex} — ${req}`);
    }
  }

  return lines.join("\n");
}

export function formatExchangeRate(rate: ExchangeRateResponse, amount?: number): string {
  const lines: string[] = [
    `**Exchange rate:** 1 ${rate.from} = ${rate.rate.toLocaleString()} ${rate.to}`,
    `Fee: ${rate.fee}`,
  ];

  if (amount) {
    const received = (amount * rate.rate).toLocaleString();
    const cost = (amount).toFixed(2);
    lines.push(`You send: ${cost} ${rate.from}`);
    lines.push(`They receive: ~${received} ${rate.to}`);
  }

  const expires = new Date(rate.expiresAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  lines.push(`Rate valid until: ${expires}`);

  return lines.join("\n");
}

export function formatError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}
