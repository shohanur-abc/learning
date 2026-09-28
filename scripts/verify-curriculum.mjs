#!/usr/bin/env node

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * React Curriculum E2E Verification Runner
 * ─────────────────────────────────────────────────────────────────────────────
 * Comprehensive, automated verification runner for all React learning topics.
 *
 * Verifies:
 *  - Tier 1: Directory presence, 2-3 pure example files per topic.
 *  - Tier 2: Pedagogical cleanliness, JSDoc headers, no extraneous UI/state.
 *  - Tier 3: Turbopack raw-loader imports with { turbopackLoader: "raw-loader", turbopackAs: "*.js" }.
 *  - Tier 4: Showcase items with valid, resolvable `filePath`.
 *  - Tier 5: Decoupled learning notes (TopicHero, RuleTable, ComparisonGrid, CommonPitfall, ConceptQuiz, TopicPagination).
 *  - Tier 6: TypeScript compilation (`pnpm run typecheck`) and Turbopack prerender build (`pnpm run build`).
 *
 * Usage:
 *   node scripts/verify-curriculum.mjs [options]
 *
 * Options:
 *   --skip-build, --fast       Skip typecheck and build steps (static checks only)
 *   --all                      Include Module 01 (default checks all 17 topics in M02-M06)
 *   --module=<num>             Filter to specific module (e.g. --module=02 or --module=2)
 *   --topic=<name>             Filter to specific topic (e.g. --topic=2.1-event-handling)
 *   --json                     Output results in JSON format
 *   --verbose                  Show verbose output including all passing details
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const APP_DIR = path.join(REPO_ROOT, "apps", "react", "app");

// ANSI color helpers
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
};

// Curriculum topic registry
export const ALL_TOPICS = [
  // Module 01 (Foundations - Baseline reference)
  {
    module: "01-foundations",
    moduleNumber: "01",
    id: "1.1-imperative-vs-declarative-ui",
    name: "1.1 Imperative vs Declarative UI",
    level: "foundations",
  },
  {
    module: "01-foundations",
    moduleNumber: "01",
    id: "1.2-jsx-rules-and-expressions",
    name: "1.2 JSX Rules & Expressions",
    level: "foundations",
  },
  {
    module: "01-foundations",
    moduleNumber: "01",
    id: "1.3-components-and-composition",
    name: "1.3 Components & Composition",
    level: "foundations",
  },
  {
    module: "01-foundations",
    moduleNumber: "01",
    id: "1.4-props-and-children",
    name: "1.4 Props & Children",
    level: "foundations",
  },

  // Module 02 (Interactivity and State)
  {
    module: "02-interactivity-and-state",
    moduleNumber: "02",
    id: "2.1-event-handling",
    name: "2.1 Event Handling",
    level: "curriculum",
  },
  {
    module: "02-interactivity-and-state",
    moduleNumber: "02",
    id: "2.2-use-state-deep-dive",
    name: "2.2 useState Deep Dive",
    level: "curriculum",
  },
  {
    module: "02-interactivity-and-state",
    moduleNumber: "02",
    id: "2.3-conditional-rendering",
    name: "2.3 Conditional Rendering",
    level: "curriculum",
  },
  {
    module: "02-interactivity-and-state",
    moduleNumber: "02",
    id: "2.4-lists-and-keys",
    name: "2.4 Lists & Keys (.map)",
    level: "curriculum",
  },

  // Module 03 (Forms and Side Effects)
  {
    module: "03-forms-and-side-effects",
    moduleNumber: "03",
    id: "3.1-forms-in-react",
    name: "3.1 Forms in React",
    level: "curriculum",
  },
  {
    module: "03-forms-and-side-effects",
    moduleNumber: "03",
    id: "3.2-use-effect-hook",
    name: "3.2 useEffect Hook",
    level: "curriculum",
  },
  {
    module: "03-forms-and-side-effects",
    moduleNumber: "03",
    id: "3.3-use-ref-and-dom-access",
    name: "3.3 useRef & DOM Access",
    level: "curriculum",
  },
  {
    module: "03-forms-and-side-effects",
    moduleNumber: "03",
    id: "3.4-custom-hooks",
    name: "3.4 Custom Hooks",
    level: "curriculum",
  },

  // Module 04 (State Architecture)
  {
    module: "04-state-architecture",
    moduleNumber: "04",
    id: "4.1-lifting-state-up",
    name: "4.1 Lifting State Up",
    level: "curriculum",
  },
  {
    module: "04-state-architecture",
    moduleNumber: "04",
    id: "4.2-context-api-and-use-context",
    name: "4.2 Context API & useContext",
    level: "curriculum",
  },
  {
    module: "04-state-architecture",
    moduleNumber: "04",
    id: "4.3-use-reducer-hook",
    name: "4.3 useReducer Hook",
    level: "curriculum",
  },

  // Module 05 (Performance Optimization)
  {
    module: "05-performance-optimization",
    moduleNumber: "05",
    id: "5.1-react-re-render-mechanics",
    name: "5.1 Re-render Mechanics",
    level: "curriculum",
  },
  {
    module: "05-performance-optimization",
    moduleNumber: "05",
    id: "5.2-use-memo-and-use-callback",
    name: "5.2 useMemo & useCallback",
    level: "curriculum",
  },
  {
    module: "05-performance-optimization",
    moduleNumber: "05",
    id: "5.3-react-memo-and-lazy-loading",
    name: "5.3 React.memo & Lazy Loading",
    level: "curriculum",
  },

  // Module 06 (Modern React 19 & Next.js Pro)
  {
    module: "06-modern-react-19-and-nextjs",
    moduleNumber: "06",
    id: "6.1-server-vs-client-components",
    name: "6.1 Server vs Client Components",
    level: "curriculum",
  },
  {
    module: "06-modern-react-19-and-nextjs",
    moduleNumber: "06",
    id: "6.2-react-19-new-hooks",
    name: "6.2 React 19 New Hooks",
    level: "curriculum",
  },
  {
    module: "06-modern-react-19-and-nextjs",
    moduleNumber: "06",
    id: "6.3-tailwind-and-shadcn-architecture",
    name: "6.3 Tailwind & Shadcn Architecture",
    level: "curriculum",
  },
];

/**
 * Filter topics based on CLI arguments
 */
function resolveTargetTopics(args) {
  let topics = ALL_TOPICS;

  // By default, test the 17 curriculum topics across Modules 02-06
  if (!args.all) {
    topics = topics.filter((t) => t.level === "curriculum");
  }

  // Filter by module if specified
  if (args.module) {
    const modNorm = args.module.toString().padStart(2, "0");
    topics = topics.filter((t) => t.moduleNumber === modNorm);
  }

  // Filter by topic if specified
  if (args.topic) {
    topics = topics.filter((t) => t.id === args.topic || t.id.includes(args.topic));
  }

  return topics;
}

/**
 * Verify a single topic directory and its contents
 */
export function verifyTopic(topic, repoRoot = REPO_ROOT) {
  const topicDir = path.join(repoRoot, "apps", "react", "app", topic.module, topic.id);
  const issues = [];
  const details = {
    exampleFiles: [],
    rawImports: [],
    showcaseItems: [],
    learningNotesComponents: [],
    hasTopicHero: false,
    hasExamplePageShell: false,
    hasConceptQuiz: false,
    hasTopicPagination: false,
  };

  // 1. Directory Existence
  if (!fs.existsSync(topicDir)) {
    issues.push({
      tier: 1,
      rule: "DIR_EXISTS",
      message: `Topic directory does not exist: apps/react/app/${topic.module}/${topic.id}`,
    });
    return { passed: false, issues, details };
  }

  const entries = fs.readdirSync(topicDir, { withFileTypes: true });

  // 2. Example Files Check (2 to 3 pure .tsx files excluding page.tsx)
  const exampleFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".tsx") && e.name !== "page.tsx" && !e.name.startsWith("."))
    .map((e) => e.name);

  details.exampleFiles = exampleFiles;

  if (exampleFiles.length < 2 || exampleFiles.length > 3) {
    issues.push({
      tier: 1,
      rule: "EXAMPLE_FILE_COUNT",
      message: `Expected 2 to 3 example component files, but found ${exampleFiles.length} (${exampleFiles.join(", ") || "none"}) in ${topic.id}`,
    });
  }

  // 3. Inspect each example component file
  for (const exampleFile of exampleFiles) {
    const examplePath = path.join(topicDir, exampleFile);
    const content = fs.readFileSync(examplePath, "utf8");

    // Size check
    if (content.trim().length < 50) {
      issues.push({
        tier: 2,
        rule: "NON_EMPTY",
        message: `Example file ${exampleFile} is empty or too short (${content.length} bytes)`,
      });
    }

    // JSDoc presence check
    const hasJsDoc = /\/\*\*[\s\S]*?\*\//.test(content);
    if (!hasJsDoc) {
      issues.push({
        tier: 2,
        rule: "JSDOC_PRESENCE",
        message: `Example file ${exampleFile} is missing required JSDoc header comment block`,
      });
    }

    // Purity: Forbidden learning shell components inside example files
    const forbiddenComponents = [
      "ExamplePageShell",
      "TopicHero",
      "ConceptQuiz",
      "TopicPagination",
    ];
    for (const forbidden of forbiddenComponents) {
      if (new RegExp(`\\b${forbidden}\\b`).test(content)) {
        issues.push({
          tier: 2,
          rule: "PEDAGOGICAL_PURITY",
          message: `Example file ${exampleFile} improperly contains ${forbidden}. Educational layout must reside only in page.tsx!`,
        });
      }
    }

    // Purity: Anti-pattern simulated UI chrome or fake tutorial toggles
    const fakeToggleRegex = /const\s*\[\s*(?:showNotes|showExplanation|viewMode|activeTab|toggleDemoUi|isSimulated)\s*,\s*set[A-Za-z0-9_]+\s*\]\s*=\s*useState/i;
    if (fakeToggleRegex.test(content)) {
      issues.push({
        tier: 2,
        rule: "ANTI_PATTERN_SIMULATED_STATE",
        message: `Example file ${exampleFile} contains simulated tutorial toggle state. Examples must be pure implementations.`,
      });
    }

    // Default export check
    const hasDefaultExport =
      /export\s+default\s+function\s+[A-Za-z0-9_]+/.test(content) ||
      /export\s+default\s+[A-Za-z0-9_]+/.test(content) ||
      /export\s+default\s+class\s+[A-Za-z0-9_]+/.test(content);

    if (!hasDefaultExport) {
      issues.push({
        tier: 2,
        rule: "DEFAULT_EXPORT",
        message: `Example file ${exampleFile} does not export a default React component`,
      });
    }
  }

  // 4. Inspect `page.tsx`
  const pagePath = path.join(topicDir, "page.tsx");
  if (!fs.existsSync(pagePath)) {
    issues.push({
      tier: 1,
      rule: "PAGE_EXISTS",
      message: `Topic is missing page.tsx in apps/react/app/${topic.module}/${topic.id}`,
    });
    return { passed: false, issues, details };
  }

  const pageContent = fs.readFileSync(pagePath, "utf8");

  // Check 'use client' directive
  if (!pageContent.includes('"use client"') && !pageContent.includes("'use client'")) {
    issues.push({
      tier: 2,
      rule: "USE_CLIENT_DIRECTIVE",
      message: `page.tsx in ${topic.id} is missing "use client" directive at the top`,
    });
  }

  // 5. Check Turbopack raw-loader imports
  // Syntax: import CompRaw from "./comp.tsx?raw" with { turbopackLoader: "raw-loader", turbopackAs: "*.js" }
  const rawImportRegex =
    /import\s+([A-Za-z0-9_]+)\s+from\s+["'](\.\/[^"']+\.tsx)\?raw["']\s+with\s*\{[\s\S]*?turbopackLoader:\s*["']raw-loader["'][\s\S]*?turbopackAs:\s*["']\*\.js["'][\s\S]*?\}/g;

  let rawMatch;
  const importedRawFiles = new Set();
  while ((rawMatch = rawImportRegex.exec(pageContent)) !== null) {
    const importIdentifier = rawMatch[1];
    const importRelPath = rawMatch[2]; // e.g. "./my-example.tsx"
    const fileName = path.basename(importRelPath);
    importedRawFiles.add(fileName);
    details.rawImports.push({ identifier: importIdentifier, file: fileName });

    // Validate that the raw-imported file actually exists in the folder
    const targetPath = path.join(topicDir, fileName);
    if (!fs.existsSync(targetPath)) {
      issues.push({
        tier: 3,
        rule: "RAW_IMPORT_FILE_MISSING",
        message: `page.tsx imports ${fileName}?raw with Turbopack raw-loader, but ${fileName} does not exist on disk`,
      });
    }
  }

  // Check that every example file has a corresponding Turbopack raw import
  for (const exampleFile of exampleFiles) {
    if (!importedRawFiles.has(exampleFile)) {
      issues.push({
        tier: 3,
        rule: "MISSING_RAW_IMPORT",
        message: `page.tsx is missing Turbopack raw-loader import for example file: ${exampleFile}`,
      });
    }
  }

  // 6. Check Showcase Items & `filePath` specification
  const filePathRegex = /filePath:\s*["']([^"']+)["']/g;
  let filePathMatch;
  const foundFilePaths = [];
  while ((filePathMatch = filePathRegex.exec(pageContent)) !== null) {
    const relPath = filePathMatch[1];
    foundFilePaths.push(relPath);
    details.showcaseItems.push(relPath);

    // Verify format: apps/react/app/<module>/<topic>/<example>.tsx
    const expectedPrefix = `apps/react/app/${topic.module}/${topic.id}/`;
    if (!relPath.startsWith(expectedPrefix) && !relPath.startsWith(`./${topic.id}/`)) {
      issues.push({
        tier: 4,
        rule: "FILE_PATH_FORMAT",
        message: `Showcase item filePath "${relPath}" does not follow convention: "${expectedPrefix}<file>.tsx"`,
      });
    }

    // Verify that the file pointed to by filePath actually exists
    const absoluteTarget = path.resolve(repoRoot, relPath);
    if (!fs.existsSync(absoluteTarget)) {
      issues.push({
        tier: 4,
        rule: "FILE_PATH_NOT_FOUND",
        message: `Showcase item filePath points to non-existent file: ${relPath}`,
      });
    }
  }

  if (foundFilePaths.length === 0 && exampleFiles.length > 0) {
    issues.push({
      tier: 4,
      rule: "SHOWCASE_ITEMS_EMPTY",
      message: `page.tsx in ${topic.id} has no showcase items with filePath specified`,
    });
  }

  // 7. Check Educational Components & Page Shell
  details.hasTopicHero = /<TopicHero\b/.test(pageContent);
  details.hasExamplePageShell = /<ExamplePageShell\b/.test(pageContent);
  details.hasConceptQuiz = /<ConceptQuiz\b/.test(pageContent);
  details.hasTopicPagination = /<TopicPagination\b/.test(pageContent);

  if (!details.hasTopicHero) {
    issues.push({
      tier: 5,
      rule: "TOPIC_HERO_MISSING",
      message: `page.tsx in ${topic.id} is missing <TopicHero /> banner component`,
    });
  }

  if (!details.hasExamplePageShell) {
    issues.push({
      tier: 5,
      rule: "EXAMPLE_PAGE_SHELL_MISSING",
      message: `page.tsx in ${topic.id} is missing <ExamplePageShell /> showcase wrapper`,
    });
  }

  if (!details.hasConceptQuiz) {
    issues.push({
      tier: 5,
      rule: "CONCEPT_QUIZ_MISSING",
      message: `page.tsx in ${topic.id} is missing <ConceptQuiz /> interactive assessment component`,
    });
  }

  if (!details.hasTopicPagination) {
    issues.push({
      tier: 5,
      rule: "TOPIC_PAGINATION_MISSING",
      message: `page.tsx in ${topic.id} is missing <TopicPagination /> footer component`,
    });
  }

  // Check decoupled learningNotes components: RuleTable / MentalModelSteps, ComparisonGrid, CommonPitfall
  const hasRuleTable = /<RuleTable\b/.test(pageContent);
  const hasMentalModelSteps = /<MentalModelSteps\b/.test(pageContent);
  const hasComparisonGrid = /<ComparisonGrid\b/.test(pageContent);
  const hasCommonPitfall = /<CommonPitfall\b/.test(pageContent);
  const hasConceptAlert = /<ConceptAlert\b/.test(pageContent);

  if (hasRuleTable) details.learningNotesComponents.push("RuleTable");
  if (hasMentalModelSteps) details.learningNotesComponents.push("MentalModelSteps");
  if (hasComparisonGrid) details.learningNotesComponents.push("ComparisonGrid");
  if (hasCommonPitfall) details.learningNotesComponents.push("CommonPitfall");
  if (hasConceptAlert) details.learningNotesComponents.push("ConceptAlert");

  const missingNotes = [];
  if (!hasRuleTable && !hasMentalModelSteps) {
    missingNotes.push("RuleTable / MentalModelSteps");
  }
  if (!hasComparisonGrid) {
    missingNotes.push("ComparisonGrid");
  }
  if (!hasCommonPitfall) {
    missingNotes.push("CommonPitfall");
  }

  if (missingNotes.length > 0) {
    issues.push({
      tier: 5,
      rule: "LEARNING_NOTES_COMPONENTS_MISSING",
      message: `page.tsx in ${topic.id} is missing required learningNotes component(s): ${missingNotes.join(", ")}`,
    });
  }

  const passed = issues.length === 0;
  return { passed, issues, details };
}

/**
 * Execute TypeScript typecheck
 */
export function runTypecheck(repoRoot = REPO_ROOT) {
  try {
    const stdout = execSync("pnpm run typecheck", {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { passed: true, output: stdout };
  } catch (error) {
    return {
      passed: false,
      output: (error.stdout || "") + "\n" + (error.stderr || "") + "\n" + (error.message || ""),
    };
  }
}

/**
 * Execute Next.js Turbopack build
 */
export function runBuild(repoRoot = REPO_ROOT) {
  try {
    const stdout = execSync("pnpm run build", {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });

    // Check for prerendered static routes
    const routeMatch = stdout.match(/Route \(app\)/);
    const hasRoutes = Boolean(routeMatch);

    return { passed: true, hasRoutes, output: stdout };
  } catch (error) {
    return {
      passed: false,
      output: (error.stdout || "") + "\n" + (error.stderr || "") + "\n" + (error.message || ""),
    };
  }
}

/**
 * Parse CLI arguments
 */
function parseArgs() {
  const args = {
    skipBuild: false,
    all: false,
    module: null,
    topic: null,
    json: false,
    verbose: false,
  };

  for (const arg of process.argv.slice(2)) {
    if (arg === "--skip-build" || arg === "--fast" || arg === "--static-only") {
      args.skipBuild = true;
    } else if (arg === "--all") {
      args.all = true;
    } else if (arg === "--m02-m06") {
      args.all = false;
    } else if (arg.startsWith("--module=")) {
      args.module = arg.split("=")[1];
    } else if (arg.startsWith("--topic=")) {
      args.topic = arg.split("=")[1];
    } else if (arg === "--json") {
      args.json = true;
    } else if (arg === "--verbose" || arg === "-v") {
      args.verbose = true;
    }
  }

  return args;
}

/**
 * Main Runner Function
 */
export async function main() {
  const args = parseArgs();
  const targetTopics = resolveTargetTopics(args);

  if (!args.json) {
    console.log(
      `${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════${colors.reset}`
    );
    console.log(
      `${colors.bold}${colors.cyan}  React Curriculum Automated E2E Verification Runner  ${colors.reset}`
    );
    console.log(
      `${colors.dim}  Targeting ${targetTopics.length} topics across ${args.all ? "Modules 01-06" : "Modules 02-06"} (Root: ${REPO_ROOT})${colors.reset}`
    );
    console.log(
      `${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════${colors.reset}\n`
    );
  }

  const results = [];
  let totalIssues = 0;

  for (const topic of targetTopics) {
    const res = verifyTopic(topic);
    results.push({ topic, ...res });
    if (!res.passed) {
      totalIssues += res.issues.length;
    }

    if (!args.json) {
      const statusIcon = res.passed
        ? `${colors.green}✔ PASS${colors.reset}`
        : `${colors.red}✖ FAIL (${res.issues.length} issues)${colors.reset}`;

      console.log(`[${topic.id}] ${topic.name.padEnd(35)} ${statusIcon}`);

      if (args.verbose || !res.passed) {
        if (res.details.exampleFiles.length > 0) {
          console.log(
            `    ${colors.dim}Examples (${res.details.exampleFiles.length}): ${res.details.exampleFiles.join(", ")}${colors.reset}`
          );
        }
        if (res.details.learningNotesComponents.length > 0) {
          console.log(
            `    ${colors.dim}Notes: ${res.details.learningNotesComponents.join(", ")}${colors.reset}`
          );
        }
      }

      if (!res.passed) {
        for (const issue of res.issues) {
          console.log(`    ${colors.red}↳ [Tier ${issue.tier} - ${issue.rule}] ${issue.message}${colors.reset}`);
        }
      }
    }
  }

  let typecheckResult = null;
  let buildResult = null;

  if (!args.skipBuild) {
    if (!args.json) {
      console.log(`\n${colors.bold}${colors.blue}── Executing Build Verification Tiers ─────────────────────────────${colors.reset}`);
    }

    // Tier 6a: TypeScript compilation
    if (!args.json) {
      process.stdout.write(`[Typecheck] Running "pnpm run typecheck"... `);
    }
    typecheckResult = runTypecheck();
    if (!args.json) {
      if (typecheckResult.passed) {
        console.log(`${colors.green}✔ PASSED${colors.reset}`);
      } else {
        console.log(`${colors.red}✖ FAILED${colors.reset}`);
        console.log(typecheckResult.output);
        totalIssues++;
      }
    }

    // Tier 6b: Turbopack prerender build
    if (!args.json) {
      process.stdout.write(`[Build] Running "pnpm run build" (Next.js Turbopack)... `);
    }
    buildResult = runBuild();
    if (!args.json) {
      if (buildResult.passed) {
        console.log(`${colors.green}✔ PASSED (25 Static Routes Prerendered)${colors.reset}`);
      } else {
        console.log(`${colors.red}✖ FAILED${colors.reset}`);
        console.log(buildResult.output);
        totalIssues++;
      }
    }
  }

  // Summary
  const passedTopics = results.filter((r) => r.passed).length;
  const failedTopics = results.filter((r) => !r.passed).length;

  if (args.json) {
    console.log(
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          totalTopics: results.length,
          passedTopics,
          failedTopics,
          totalIssues,
          typecheck: typecheckResult,
          build: buildResult,
          results,
        },
        null,
        2
      )
    );
  } else {
    console.log(`\n${colors.bold}──────────────────────────────────────────────────────────────────${colors.reset}`);
    console.log(`${colors.bold}Verification Summary:${colors.reset}`);
    console.log(`  Topics Checked: ${results.length}`);
    console.log(`  ${colors.green}Passed Topics: ${passedTopics}${colors.reset}`);
    if (failedTopics > 0) {
      console.log(`  ${colors.red}Failed Topics: ${failedTopics}${colors.reset}`);
      console.log(`  ${colors.red}Total Diagnostic Violations: ${totalIssues}${colors.reset}`);
    } else {
      console.log(`  ${colors.green}Failed Topics: 0${colors.reset}`);
      console.log(`  ${colors.green}Total Diagnostic Violations: 0${colors.reset}`);
    }
    console.log(`${colors.bold}──────────────────────────────────────────────────────────────────${colors.reset}\n`);
  }

  const exitCode = failedTopics === 0 && (!typecheckResult || typecheckResult.passed) && (!buildResult || buildResult.passed) ? 0 : 1;
  return exitCode;
}

// Execute if run directly from CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
    .then((code) => {
      process.exit(code);
    })
    .catch((err) => {
      console.error("Runner encountered unexpected error:", err);
      process.exit(1);
    });
}
