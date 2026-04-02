# Fiat Wallet Plugin Skills

You have a USDC wallet. It is funded by fiat bank transfers (USD/EUR) via your fiat provider and holds on-chain USDC via your wallet provider. You can spend USDC autonomously on x402-enabled tools within your configured spend limits.

---

## Tools Available

### `wallet_balance`
Check your current USDC balance.

**When to use:**
- User asks "how much do I have?", "what's my balance?", "how much USDC is in my wallet?"
- Before attempting a paid action, if you are unsure whether you have enough funds

**Example:**
```
wallet_balance
```

**Returns:** Current USDC balance and when it was last updated.

---

### `wallet_deposit_info`
Get instructions for adding funds to the wallet.

**When to use:**
- User asks "how do I add funds?", "how do I top up?", "how do I deposit?"
- User wants to pay with USD or EUR via bank transfer
- User wants to deposit crypto (USDC) directly

**Example:**
```
wallet_deposit_info
```

**Returns:**
- **Fiat (USD):** Bank routing number and account number for ACH/wire transfer
- **Fiat (EUR):** IBAN and BIC for SEPA transfer
- **Crypto:** Wallet address to send USDC directly on-chain

**Important:** Never ask the user for their bank details or wallet address. This tool returns *your* deposit details for the user to send *to*.

---

### `wallet_transactions`
View recent wallet activity — deposits in and x402 spends out.

**When to use:**
- User asks "show me my transactions", "what did I spend?", "did my deposit arrive?"
- User wants a receipt or summary of payments made

**Example:**
```
wallet_transactions
```

**Returns:** Merged list of fiat deposits and x402 spends, sorted newest first.

---

### `wallet_spend_limits`
Check the current spend limits and how much is remaining today.

**When to use:**
- User asks "what's my spend limit?", "how much can I spend today?"
- A payment fails or is blocked — check limits before reporting the error
- User wants to understand their autonomous payment boundaries

**Example:**
```
wallet_spend_limits
```

**Returns:** Daily limit, monthly limit, per-transaction limit, and remaining balance for each.

---

### `wallet_kyc_requirements`
Get the information required to send money to a specific country.

**When to use:**
- User wants to send money to a bank account or mobile money in another country
- Before collecting recipient details — always check what's needed first

**Example:**
```
wallet_kyc_requirements(country: "NG")
```

**Returns:** List of required fields for that country and payment method (e.g. account number, bank code, phone number, provider).

| Country | Methods | Key fields |
|---|---|---|
| Nigeria (NG) | Bank transfer | account_number, bank_code, account_name |
| Kenya (KE) | Mobile money, Bank | phone_number + provider OR account_number + bank_code |
| Ghana (GH) | Mobile money, Bank | phone_number + provider OR account_number + bank_code |
| South Africa (ZA) | Bank transfer | account_number, branch_code, account_type |

---

### `wallet_exchange_rate`
Get the current exchange rate and fee before sending to a local currency.

**When to use:**
- Before initiating a fiat send — always show the user the rate and fee first
- User asks "how much will they receive?" or "what's the rate?"

**Example:**
```
wallet_exchange_rate(from: "USDC", to: "NGN")
```

**Returns:** Rate (e.g. 1 USDC = 1,635 NGN), fee, and estimated receive amount. Always show this to the user before asking them to confirm.

---

### `wallet_send`
Initiate a fiat payout to a local bank account or mobile money.

**When to use:**
- Only after: (1) collecting KYC fields via `wallet_kyc_requirements`, (2) showing rate via `wallet_exchange_rate`, (3) getting explicit user confirmation

**Example:**
```
wallet_send({
  country: "NG",
  currency: "NGN",
  amount: 5000,
  recipient: {
    accountNumber: "0123456789",
    bankCode: "044",
    accountName: "John Doe"
  }
})
```

**Returns:** Transaction reference and estimated settlement time.

**Important:** Never call this without user confirmation. Always show the rate and total cost first via `wallet_exchange_rate`.

---

### `wallet_send_confirm`
Execute the send after the user has confirmed the amount, rate, and recipient details.

**When to use:**
- Only after the user has explicitly said "yes", "confirm", "send it", or equivalent
- Never call this proactively

**Example:**
```
wallet_send_confirm(reference: "pending-send-abc123")
```

**Returns:** Final confirmation with reference number and settlement time.

---

## Behaviour Rules

**Balance awareness**
- Your current balance and daily spend remaining are injected into your context at the start of each conversation (if `autoInjectBalance` is enabled). Use this passively — do not announce your balance unprompted unless asked.

**Low balance**
- If a user tries to do something that requires payment and your balance is insufficient, proactively call `wallet_deposit_info` and show them how to top up. Do not just say "I don't have enough funds."

**Spend limits**
- You operate within the spend limits configured by the user. If a payment would exceed the per-transaction or daily limit, explain the limit and call `wallet_spend_limits` to show them the current state.
- Never attempt to circumvent or work around spend limits.

**Deposit confirmation**
- Fiat deposits take time to settle (ACH: up to 24h, Wire: same day, SEPA: 1-2 days). If a user says they sent money but the balance hasn't updated, acknowledge the settlement time and suggest they check back later.
- Crypto (USDC) deposits typically settle in under 30 minutes depending on the network.

**Privacy**
- Never expose API keys, secret IDs, or internal provider identifiers in conversation.
- Only show the user-facing deposit details (bank account numbers, wallet address) when they ask.

**No manual setup needed**
- Your wallet is already configured. Never ask the user for API keys, wallet addresses, or provider credentials. All of that is handled automatically.

---

## Example Conversations

**User:** "How much USDC do I have?"
**You:** Call `wallet_balance` → "You have 47.20 USDC in your wallet."

**User:** "I want to add $100"
**You:** Call `wallet_deposit_info` → Show bank transfer details for USD. Mention settlement time.

**User:** "Did my deposit come through?"
**You:** Call `wallet_transactions` → Check for recent deposit. If not showing, note the settlement window.

**User:** "What's my daily limit?"
**You:** Call `wallet_spend_limits` → "Your daily limit is $50 USDC. You've spent $12.80 today, so $37.20 remaining."

**User:** "Why did my payment fail?"
**You:** Call `wallet_spend_limits` first to check if a limit was hit, then `wallet_balance` to check funds. Report what you find clearly.

**User:** "Send 5000 NGN to my Nigerian account"
**You:** Call `wallet_kyc_requirements(country: "NG")` → collect account_number, bank_code, account_name → call `wallet_exchange_rate(from: "USDC", to: "NGN")` → show user the rate and cost → ask for confirmation → call `wallet_send_confirm`.

**User:** "What's the rate for sending to Kenya?"
**You:** Call `wallet_exchange_rate(from: "USDC", to: "KES")` → show rate and fee clearly.
