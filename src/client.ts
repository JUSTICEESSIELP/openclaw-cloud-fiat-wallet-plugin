import type { WalletConfig } from "./config.js";

// =============================================================================
// TYPES
// =============================================================================

export interface BalanceResponse {
  usdc: number;
  lastUpdated: string;
}

export interface DepositInfoResponse {
  currency: "usd" | "eur";
  bank?: {
    routingNumber?: string;
    accountNumber?: string;
    iban?: string;
    bic?: string;
    bankName: string;
    reference: string;
  };
  crypto: {
    address: string;
    network: string;
    settlementTime: string;
  };
}

export interface Transaction {
  id: string;
  type: "deposit" | "spend" | "send";
  amount: number;
  currency: string;
  description: string;
  status: "pending" | "settled" | "failed";
  createdAt: string;
}

export interface SpendLimits {
  daily: number;
  monthly: number;
  perTransaction: number;
  remainingToday: number;
  remainingThisMonth: number;
}

export interface KycRequirement {
  field: string;
  label: string;
  required: boolean;
  example?: string;
}

export interface KycRequirementsResponse {
  country: string;
  methods: Array<{
    id: string;
    label: string;
    fields: KycRequirement[];
    settlementTime: string;
  }>;
}

export interface ExchangeRateResponse {
  from: string;
  to: string;
  rate: number;
  fee: string;
  expiresAt: string;
}

export interface SendFiatPayload {
  country: string;
  currency: string;
  amount: number;
  method: string;
  recipient: Record<string, string>;
}

export interface SendFiatResponse {
  reference: string;
  status: string;
  settlementTime: string;
}

// =============================================================================
// CLIENT
// =============================================================================

export class WalletClient {
  private readonly apiUrl: string;
  private readonly apiToken: string;

  constructor(config: WalletConfig) {
    this.apiUrl = config.apiUrl;
    this.apiToken = config.apiToken;
  }

  private async call<T>(path: string, opts: RequestInit = {}): Promise<T> {
    const url = `${this.apiUrl}/plugin/wallet${path}`;
    const res = await fetch(url, {
      ...opts,
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
        ...(opts.headers ?? {}),
      },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(
        `[fiat-wallet] Control plane error ${res.status} on ${path}: ${body}`
      );
    }

    return res.json() as Promise<T>;
  }

  getBalance(): Promise<BalanceResponse> {
    return this.call<BalanceResponse>("/balance");
  }

  getDepositInfo(currency: "usd" | "eur"): Promise<DepositInfoResponse> {
    return this.call<DepositInfoResponse>(`/deposit-info?currency=${currency}`);
  }

  getTransactions(limit = 20): Promise<Transaction[]> {
    return this.call<Transaction[]>(`/transactions?limit=${limit}`);
  }

  getSpendLimits(): Promise<SpendLimits> {
    return this.call<SpendLimits>("/spend-limits");
  }

  getKycRequirements(country: string): Promise<KycRequirementsResponse> {
    return this.call<KycRequirementsResponse>(
      `/kyc-requirements?country=${encodeURIComponent(country)}`
    );
  }

  getExchangeRate(from: string, to: string): Promise<ExchangeRateResponse> {
    return this.call<ExchangeRateResponse>(
      `/exchange-rate?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    );
  }

  sendFiat(payload: SendFiatPayload): Promise<SendFiatResponse> {
    return this.call<SendFiatResponse>("/send-fiat", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}
