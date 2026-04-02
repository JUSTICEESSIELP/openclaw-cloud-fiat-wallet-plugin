# @openclaw/fiat-wallet

USDC wallet plugin for OpenClaw. Deposit USD or EUR via bank transfer, hold USDC on-chain, and spend autonomously via x402 payments — all from your AI agent.

## Install

```bash
openclaw plugins install @openclaw/fiat-wallet
```

Or find it on ClawHub: **clawhub.io/packages/@openclaw/fiat-wallet**

## Requirements

Two environment variables must be set in your OpenClaw instance before the plugin will start:

| Variable | Description |
|---|---|
| `ONECLAW_AGENT_API_KEY` | Your 1Claw agent API key |
| `ONECLAW_VAULT_ID` | Your 1Claw vault ID |

The plugin fetches all other secrets (wallet address, fiat account IDs, control plane token) from the 1Claw vault at startup. No other env vars needed.

Add them to your OpenClaw secret:

```yaml
# In your OpenClawInstance secret
ONECLAW_AGENT_API_KEY: your-agent-api-key
ONECLAW_VAULT_ID: your-vault-id
```

Or in `openclaw.json` env section if running locally:

```json
{
  "env": {
    "ONECLAW_AGENT_API_KEY": "your-agent-api-key",
    "ONECLAW_VAULT_ID": "your-vault-id"
  }
}
```

## Configuration

Set these in the plugin config (via OpenClaw UI or `openclaw.json`):

```json
{
  "plugins": {
    "@openclaw/fiat-wallet": {
      "dailySpendLimit": 50,
      "monthlySpendLimit": 500,
      "perTransactionLimit": 5,
      "autoInjectBalance": true
    }
  }
}
```

| Option | Default | Description |
|---|---|---|
| `dailySpendLimit` | `50` | Max USDC the agent can spend per day via x402 |
| `monthlySpendLimit` | `500` | Max USDC the agent can spend per month via x402 |
| `perTransactionLimit` | `5` | Max USDC per single x402 payment |
| `autoInjectBalance` | `true` | Prepend balance + remaining spend limit to every conversation |

## What the agent can do

| Tool | What it does |
|---|---|
| `wallet_balance` | Check current USDC balance |
| `wallet_deposit_info` | Get bank transfer details (USD/EUR) or on-chain deposit address |
| `wallet_transactions` | View recent deposits and spends |
| `wallet_spend_limits` | Check limits and how much is remaining today/this month |
| `wallet_kyc_requirements` | Get recipient fields required to send to a country |
| `wallet_exchange_rate` | Get live rate and fee before sending |
| `wallet_send` | Initiate a fiat payout to a local bank or mobile money |
| `wallet_send_confirm` | Confirm a pending send after user approval |

## CLI

```bash
openclaw wallet balance
openclaw wallet deposit
openclaw wallet deposit --eur
openclaw wallet transactions
openclaw wallet transactions --limit 50
```

## Supported send destinations

| Country | Methods |
|---|---|
| Nigeria (NG) | Bank transfer |
| Kenya (KE) | Mobile money, Bank transfer |
| Ghana (GH) | Mobile money, Bank transfer |
| South Africa (ZA) | Bank transfer |

## How deposits work

| Method | Currency | Settlement |
|---|---|---|
| ACH bank transfer | USD | Up to 24 hours |
| Wire transfer | USD | Same day |
| SEPA transfer | EUR | 1–2 business days |
| On-chain USDC | USDC | ~30 minutes |

## Source

- **ClawHub**: clawhub.io/packages/@openclaw/fiat-wallet
- **GitHub**: github.com/JUSTICEESSIELP/openclaw-cloud-fiat-wallet-plugin
- **License**: MIT
