import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
const read = (name: string) => readFileSync(new URL(`../apps/${name}/index.tsx`, import.meta.url), "utf8");
const web = read("web"), terminal = read("terminal"), commerce = read("commerce");
describe("Premium Gildara deployment contracts", () => {
  it("builds on three Bun HTTP services", () => {
    for (const source of [web, terminal, commerce]) expect(source).toContain("Bun.serve(");
  });
  it("keeps real financial execution turned off", () => {
    expect(web).toContain("NOT ENABLED");
    expect(commerce).toContain("custodyConnected:false");
    expect(commerce).toContain("brokerageConnected:false");
    expect(commerce).toContain("realOrders:false");
  });
  it("has premium market UX and cost transparency", () => {
    expect(web).toContain("gildara-quicklinks");
    expect(terminal).toContain("market-access-note");
    expect(commerce).toContain("metalPulse");
    expect(commerce).toContain("calcTotal");
  });
  it("preserves account, simulation, referral and operator workflows", () => {
    expect(web).toContain("/api/v2/auth/register");
    expect(web).toContain("/api/v2/paper");
    expect(commerce).toContain("GILDARA_ADMIN_TOKEN");
    expect(commerce).toContain("/api/commerce/admin/update");
    expect(commerce).toContain("DELETE ALL MY SERVICE REQUESTS");
    expect(web).toContain("gildara_commerce_requests");
  });
  it("does not include obvious embedded secrets", () => {
    for (const source of [web, terminal, commerce]) {
      expect(source).not.toMatch(/sk_live_[A-Za-z0-9]{10,}/);
      expect(source).not.toMatch(/whsec_[A-Za-z0-9]{10,}/);
      expect(source.includes("postgres://") || source.includes("postgresql://")).toBe(false);
    }
  });
});
