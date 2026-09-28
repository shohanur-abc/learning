/**
 * ─────────────────────────────────────────────────────────────────────────────
 * React Curriculum E2E Automated Test Suite (node:test)
 * ─────────────────────────────────────────────────────────────────────────────
 * Formal node:test suite that runs all 4 tiers of verification across
 * curriculum topics.
 *
 * Can be run via:
 *   node --test scripts/verify-curriculum.test.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  ALL_TOPICS,
  verifyTopic,
  runTypecheck,
  runBuild,
} from "./verify-curriculum.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

describe("React Curriculum Verification Suite", () => {
  // Group topics by module
  const modules = [
    { num: "02", title: "Module 02: Interactivity and State" },
    { num: "03", title: "Module 03: Forms and Side Effects" },
    { num: "04", title: "Module 04: State Architecture" },
    { num: "05", title: "Module 05: Performance Optimization" },
    { num: "06", title: "Module 06: Modern React 19 and Next.js" },
  ];

  for (const mod of modules) {
    describe(mod.title, () => {
      const topicsInMod = ALL_TOPICS.filter((t) => t.moduleNumber === mod.num);

      for (const topic of topicsInMod) {
        describe(`Topic ${topic.name} (${topic.id})`, () => {
          it("should satisfy all structural, pedagogical purity, raw import, and page shell contracts", () => {
            const result = verifyTopic(topic, REPO_ROOT);

            if (!result.passed) {
              const formattedIssues = result.issues
                .map((iss) => `  - [Tier ${iss.tier} | ${iss.rule}] ${iss.message}`)
                .join("\n");
              assert.fail(`Topic ${topic.id} failed verification:\n${formattedIssues}`);
            }

            assert.strictEqual(
              result.passed,
              true,
              `Topic ${topic.id} must pass all contract checks`
            );
          });
        });
      }
    });
  }

  describe("Tier 6: TypeScript Compilation & Turbopack Static Prerender", () => {
    it("pnpm run typecheck should pass with 0 errors across workspace", () => {
      const tc = runTypecheck(REPO_ROOT);
      if (!tc.passed) {
        assert.fail(`TypeScript typecheck failed:\n${tc.output}`);
      }
      assert.strictEqual(tc.passed, true);
    });

    it("pnpm run build should prerender all static routes with Turbopack", () => {
      const b = runBuild(REPO_ROOT);
      if (!b.passed) {
        assert.fail(`Next.js build failed:\n${b.output}`);
      }
      assert.strictEqual(b.passed, true);
    });
  });
});
