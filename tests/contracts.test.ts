import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
const read = (name: string) => readFileSync(new URL(`../apps/${name}/index.tsx`, import.meta.url), "utf8");
const web = read("web");
const terminal = read("terminal");
const commerce = read("commerce");
describe("Gildara launch contracts", () => {
 it("has three independently runnable Bun HTTP services", () => { for (const source of [web, terminal, commerce]) expect(source).toContain("Bun.serve("); });
 it("keeps the original funded-account boundary", () => { expect(web).toContain("NOT ENABLED"); expect(commerce).toContain("custodyConnected:false"); expect(commerce).toContain("brokerageConnected:false"); expect(commerce).toContain("realOrders:false"); });
 it("keeps premium and market research interfaces", () => { expect(web).toContain("GILDARA"); expect(terminal).toContain("market-access-note"); expect(commerce).toContain("metalPulse"); expect(commerce).toContain("id=\\\"calcTotal\\\""); });
 it("has protected operator functionality and privacy rights", () => { expect(commerce).toContain("GILDARA_ADMIN_TOKEN"); expect(commerce).toContain('path==="/api/commerce/admin/update"'); expect(commerce).toContain("DELETE ALL MY SERVICE REQUESTS"); expect(web).toContain("gildara_commerce_requests"); });
 it("supports authenticated research and simulation", () => { expect(web).toContain("/api/v2/auth/register"); expect(web).toContain("/api/v2/paper"); expect(terminal).toContain("Manual portfolio"); });
 it("does not embed common payment or DB secrets", () => { for (const source of [web, terminal, commerce]) { expect(source).not.toMatch(/sk_live_[A-Za-z0-9]{10,}/); expect(source).not.toMatch(/whsec_[A-Za-z0-9]{10,}/); expect(source).not.toMatch(/postgres(?:ql)?:\\/\\/[^\\s"'`]+/); } });
});
