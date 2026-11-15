# Gildara production architecture

## Existing Railway topology — reuse only

| App | Source path | Existing Railway service | Host | HTTP health |
|---|---|---|---|---|
| Public + research API | `apps/web` | `gildara-web` | `gildara-web-production.up.railway.app` | `GET /api/health` |
| Premium terminal | `apps/terminal` | `gildara-terminal` | `gildara-terminal-production.up.railway.app` | `GET /` |
| Metals commerce + operations | `apps/commerce` | `gildara-commerce` | `gildara-commerce-production.up.railway.app` | `GET /health` |
| PostgreSQL | managed Railway service | `Postgres` | internal network | DB connection |

The services are deployed as Bun Railway Functions as of initial import. The app source is mirrored into this repo; a change in GitHub does **not** automatically change production until existing Railway services are reconnected to this repository and deployment checks pass.

## Data flows

User -> public site -> waitlist and research API -> PostgreSQL. Terminal uses same origin proxy to the research API. Commerce uses its own PostgreSQL intake and operator actions, and proxies authenticated research routes. Metal source references are non-executable and labelled as such.

## Revenue and access

- Free research: reference metal and daily FX data, cost engine, metal converter, virtual paper trading and manual holdings.
- Subscription research: optional Stripe Checkout/Billing integration, **disabled** until an independently authorized Gildara merchant is configured.
- B2B: quoted research reports, source-licensed widgets and institutional enquiry flow.
- Partner introductions: enquiries only until real executing partners, disclosed compensation and geographic eligibility exist.
- No client deposits, genuine trade execution, custody, loan issuance, fund pooling or interest obligations.

## Security / data handling

Store all service secrets in Railway Variables; never in this public repository. `GILDARA_ADMIN_TOKEN` is required for the operator desk, and HTTPS-only authenticated research sessions are maintained by the web API. Stripe webhook signatures are verified server-side. PII access is confined to authenticated members and the operator desk. Commercial enquiries have their own deletion path.

## Release

Run `bun run check`. Deploy each existing service from its path; retain `DATABASE_URL`/Railway Postgres reference and independent service domains. Verify `GET /api/health`, `GET /health`, protected operator `401`, and POST commerce `/smoke`. No public business revenue should be inferred from synthetic tests or illustrative calculations.
