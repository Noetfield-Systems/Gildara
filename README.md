# Gildara Markets

**Independent precious-metals and global-wealth research venture** · [Public website](https://gildara-web-production.up.railway.app/) · [Market terminal](https://gildara-terminal-production.up.railway.app/) · [Metal Commerce](https://gildara-commerce-production.up.railway.app/)

**Own value. Trade the world. Know your true cost.**

Gildara provides sourced indicative metals and foreign-exchange references, a simulated trading workspace, metal-content and ownership-cost calculators, recurring purchase scenario models, and real commercial enquiries and B2B request tracking. Its research-account and customer-interest systems persist to PostgreSQL.

> **Real-money status:** No live brokerage, metal custody, asset-backed lending, deposits, managed investments, or executable spot quotations. Paper trades and modeling are expressly simulated. No account with a partner financial institution is opened by registering at Gildara.

## Repository

Three Bun TypeScript services run on Railway: `apps/web` handles the public website, research-account API, and database; `apps/terminal` handles the premium research terminal; `apps/commerce` handles precious-metal research, service requests, the operator desk, and Stripe-ready research-subscription integration. One existing Railway PostgreSQL service is shared. Do not create duplicate infrastructure.

## Environments

Copy `.env.example` for configuration names only. Do not commit local environment files, payment keys or database credentials. Do not point Gildara billing at a merchant account of a different legal venture without authorization.

## Development

Install [Bun](https://bun.sh/). Run `bun install` and `bun run check` at repository root. Run each service with `bun run dev:web`, `bun run dev:terminal` or `bun run dev:commerce` using its required environment variables. CI validates all three deployment entrypoints.

## Production

Existing Railway project: `gildara-markets`. Existing services: `gildara-web`, `gildara-terminal`, `gildara-commerce`, `Postgres`. Each app has its own `apps/<service>` root. Source of truth is `main` after CI. Web health: `/api/health`, Commerce health: `/health`. POST-only terminal integration test: `/smoke`.

## Ownership boundaries

All user figures, product-fee assumptions and market references must show their source and simulation status. Executing brokers, custodians, jurisdictional support and independently verified settlement are required before advertising real asset orders, metal custody, loans or guaranteed yields.
