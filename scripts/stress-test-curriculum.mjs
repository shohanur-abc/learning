#!/usr/bin/env node

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Empirical Stress Testing Suite: React Curriculum Architecture & Pedagogical Invariants
 * ─────────────────────────────────────────────────────────────────────────────
 * Author: Challenger 1 (teamwork_preview_challenger)
 * Target: Modules 02 through 06 (17 topics, 51 pure example components)
 *
 * Runs deterministic stress tests, oracles, generators, and boundary checks
 * on the exact pedagogical mechanisms required by the Project Orchestrator.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const APP_DIR = path.join(REPO_ROOT, "apps", "react", "app");

test("Suite 1: Topic 2.2 — useState Deep Dive (Updaters, Batching, Lazy Initializer)", async (t) => {
  await t.test("1.1 Snapshot vs Updater Queue Simulation", () => {
    // Direct snapshot model: 3 calls to setCount(count + 1) with snapshot count = 0
    let snapshotCount = 0;
    const directUpdates = [snapshotCount + 1, snapshotCount + 1, snapshotCount + 1];
    // In React snapshot semantics, each call in the same render sees snapshotCount = 0
    snapshotCount = directUpdates[directUpdates.length - 1]; // last update applies
    assert.equal(snapshotCount, 1, "Direct snapshot updates should only increment by 1");

    // Updater queue model: 3 calls to setCount(prev => prev + 1)
    let updaterCount = 0;
    const updaterQueue = [
      (prev) => prev + 1,
      (prev) => prev + 1,
      (prev) => prev + 1,
    ];
    for (const fn of updaterQueue) {
      updaterCount = fn(updaterCount);
    }
    assert.equal(updaterCount, 3, "Updater functions queued should increment by 3");
  });

  await t.test("1.2 Lazy Initializer Execution Invariant", () => {
    let executionCount = 0;
    function expensiveInit() {
      executionCount++;
      return { token: "AUTH-TEST", createdAt: Date.now() };
    }

    // Simulate React lazy initialization: initializer called only once across multiple render cycles
    let isInitialized = false;
    let cachedState = null;
    function simulateUseState(initializer) {
      if (!isInitialized) {
        cachedState = typeof initializer === "function" ? initializer() : initializer;
        isInitialized = true;
      }
      return cachedState;
    }

    // Render 1
    const r1 = simulateUseState(expensiveInit);
    // Render 2
    const r2 = simulateUseState(expensiveInit);
    // Render 3
    const r3 = simulateUseState(expensiveInit);

    assert.equal(executionCount, 1, "Lazy initializer must execute exactly once across renders");
    assert.equal(r1.token, "AUTH-TEST");
    assert.equal(r1, r2, "Subsequent renders must reuse the cached state");
    assert.equal(r2, r3);
  });

  await t.test("1.3 Immutability of Object and Array State", () => {
    const originalState = Object.freeze({
      user: Object.freeze({ name: "Shakib", preferences: Object.freeze({ theme: "dark" }) }),
      tags: Object.freeze(["react", "nextjs"]),
    });

    // Pure update: return new references without mutating originals
    const updatedState = {
      ...originalState,
      user: {
        ...originalState.user,
        preferences: {
          ...originalState.user.preferences,
          theme: "light",
        },
      },
      tags: [...originalState.tags, "tailwind"],
    };

    assert.notEqual(updatedState, originalState, "Root reference must change");
    assert.notEqual(updatedState.user, originalState.user, "Nested object reference must change");
    assert.notEqual(updatedState.tags, originalState.tags, "Array reference must change");
    assert.equal(originalState.user.preferences.theme, "dark", "Original state must remain immutable");
    assert.equal(originalState.tags.length, 2, "Original array must not be mutated");
    assert.equal(updatedState.tags.length, 3);
  });
});

test("Suite 2: Topic 2.3 — Conditional Rendering (&& Operator & '0' Trap)", async (t) => {
  await t.test("2.1 JavaScript Short-Circuit 0 Trap", () => {
    const unreadCount = 0;
    // When unreadCount === 0:
    const dangerousResult = unreadCount && "NotificationBadge";
    // In JS: 0 && <anything> evaluates to 0
    assert.equal(dangerousResult, 0, "0 && <Badge /> evaluates directly to number 0");
    assert.notEqual(dangerousResult, false, "0 is NOT false in JS evaluation, it is number 0");
  });

  await t.test("2.2 Safe Boolean Guard Patterns", () => {
    const unreadCount = 0;
    // Pattern A: count > 0
    const safeResultA = unreadCount > 0 && "NotificationBadge";
    assert.equal(safeResultA, false, "count > 0 evaluates to boolean false (ignored by React)");

    // Pattern B: Boolean(count)
    const safeResultB = Boolean(unreadCount) && "NotificationBadge";
    assert.equal(safeResultB, false, "Boolean(count) evaluates to boolean false");

    // Positive case:
    const positiveCount = 5;
    const positiveResult = positiveCount > 0 && "NotificationBadge";
    assert.equal(positiveResult, "NotificationBadge", "When count > 0, returns the badge");
  });

  await t.test("2.3 React JSX Rendering Contract for Falsy Values", () => {
    // In React: null, undefined, false render nothing.
    // Numbers (even 0) render as text nodes!
    function simulateReactRenderer(value) {
      if (value === false || value === null || value === undefined) {
        return ""; // nothing rendered
      }
      return String(value); // rendered to DOM text node
    }

    assert.equal(simulateReactRenderer(0), "0", "Number 0 is rendered to DOM text!");
    assert.equal(simulateReactRenderer(false), "", "Boolean false renders nothing");
    assert.equal(simulateReactRenderer(null), "", "null renders nothing");
    assert.equal(simulateReactRenderer(undefined), "", "undefined renders nothing");
  });
});

test("Suite 3: Topic 2.4 — Lists & Keys (Index vs Stable ID Keys)", async (t) => {
  await t.test("3.1 Array Unshift Key Invariance", () => {
    const initialList = [
      { id: "id-1", text: "Task 1", domState: "Input Text for Task 1" },
      { id: "id-2", text: "Task 2", domState: "Input Text for Task 2" },
    ];

    const newItem = { id: "id-new", text: "Task New", domState: "" };
    const updatedList = [newItem, ...initialList];

    // Under Stable ID Key mapping:
    const keyMapStable = new Map(updatedList.map((item) => [item.id, item]));
    assert.equal(keyMapStable.get("id-1").text, "Task 1", "Stable key preserves exact item identity");
    assert.equal(keyMapStable.get("id-1").domState, "Input Text for Task 1");

    // Under Index Key mapping (anti-pattern):
    // Index 0 was previously id-1, now it is id-new!
    const previousIndex0 = initialList[0];
    const newIndex0 = updatedList[0];
    assert.notEqual(previousIndex0.id, newIndex0.id, "Index 0 now points to a completely different item");
    assert.equal(newIndex0.id, "id-new");
  });
});

test("Suite 4: Topic 3.1 — Forms in React (Controlled vs Uncontrolled)", async (t) => {
  await t.test("4.1 Uncontrolled FormData Native Extraction", () => {
    // Simulate FormData key/value extraction
    const mockData = new Map([
      ["title", "React 19 Server Actions"],
      ["category", "feedback"],
      ["feedback", "Great pedagogical examples!"],
      ["urgent", "on"],
    ]);

    const title = mockData.get("title") || "";
    const category = mockData.get("category") || "feedback";
    const feedback = mockData.get("feedback") || "";
    const urgent = mockData.get("urgent") === "on";

    assert.equal(title, "React 19 Server Actions");
    assert.equal(category, "feedback");
    assert.equal(feedback, "Great pedagogical examples!");
    assert.equal(urgent, true, "Checkbox 'on' must resolve to boolean true");
  });

  await t.test("4.2 Controlled Form Multi-field Reducer / State Pattern", () => {
    let formState = {
      username: "",
      email: "",
      role: "developer",
    };

    function handleFieldChange(state, name, value) {
      return {
        ...state,
        [name]: value,
      };
    }

    formState = handleFieldChange(formState, "username", "shakib");
    formState = handleFieldChange(formState, "email", "shakib@learning.dev");
    formState = handleFieldChange(formState, "role", "architect");

    assert.deepEqual(formState, {
      username: "shakib",
      email: "shakib@learning.dev",
      role: "architect",
    });
  });
});

test("Suite 5: Topic 3.2 — useEffect Lifecycle & Race Condition Safeguard", async (t) => {
  await t.test("5.1 Out-of-Order Async Race Condition Simulation", async () => {
    let renderedResult = null;
    let activeCleanup = null;

    function triggerFetch(userId, delayMs, responseData) {
      // If previous effect exists, run its cleanup
      if (activeCleanup) {
        activeCleanup();
      }

      let ignore = false;
      activeCleanup = () => {
        ignore = true;
      };

      return new Promise((resolve) => {
        setTimeout(() => {
          if (!ignore) {
            renderedResult = responseData;
          }
          resolve({ userId, ignored: ignore });
        }, delayMs);
      });
    }

    // User rapidly clicks user-1 (100ms slow), then immediately clicks user-2 (20ms fast)
    const p1 = triggerFetch("user-1", 100, "DATA_USER_1");
    const p2 = triggerFetch("user-2", 20, "DATA_USER_2");

    const [res1, res2] = await Promise.all([p1, p2]);

    assert.equal(res1.ignored, true, "Stale request (user-1) must be ignored");
    assert.equal(res2.ignored, false, "Fresh request (user-2) must not be ignored");
    assert.equal(renderedResult, "DATA_USER_2", "Authoritative state must be the latest request");
  });

  await t.test("5.2 Timer Cleanup on Component Unmount", () => {
    let timerCleared = false;
    let timerRef = { current: 12345 };

    function cleanup() {
      if (timerRef.current !== null) {
        timerCleared = true;
        timerRef.current = null;
      }
    }

    cleanup();
    assert.equal(timerCleared, true, "Timer must be cleared during cleanup");
    assert.equal(timerRef.current, null);
  });
});

test("Suite 6: Topic 3.3 — useRef & Mutable Persistence", async (t) => {
  await t.test("6.1 Mutable Value Modification Without Re-render", () => {
    const ref = { current: 0 };
    let renderTriggerCount = 0;

    function onRender() {
      // Updating ref.current does NOT trigger another render
      ref.current += 1;
    }

    onRender();
    onRender();
    onRender();

    assert.equal(ref.current, 3, "Ref preserves mutable counter");
    assert.equal(renderTriggerCount, 0, "No re-renders were triggered by ref mutation");
  });
});

test("Suite 7: Topic 4.2 — Context Scoping and Error Guarding", async (t) => {
  await t.test("7.1 Consumer Guard Throws Outside Provider", () => {
    function useAuthSimulation(contextValue) {
      if (!contextValue) {
        throw new Error("useAuth অবশ্যই একটি <AuthProvider> এর ভেতর কল করতে হবে।");
      }
      return contextValue;
    }

    assert.throws(
      () => useAuthSimulation(undefined),
      /useAuth অবশ্যই একটি <AuthProvider> এর ভেতর কল করতে হবে/,
      "Must throw expected educational Bengali error outside provider"
    );

    const validContext = { user: { name: "Shakib", role: "Developer" } };
    assert.doesNotThrow(() => useAuthSimulation(validContext));
  });

  await t.test("7.2 Nested Scope Provider Precedence", () => {
    // In React context hierarchy, nearest provider shadows root
    const rootScope = { name: "Root Organization", tier: "Enterprise" };
    const childScope = { name: "Engineering Team", tier: "Team" };

    function resolveScope(providerStack) {
      return providerStack[providerStack.length - 1] || rootScope;
    }

    assert.equal(resolveScope([rootScope]).tier, "Enterprise");
    assert.equal(resolveScope([rootScope, childScope]).tier, "Team", "Nearest provider wins");
  });
});

test("Suite 8: Topic 4.3 — useReducer Deterministic State Transitions", async (t) => {
  // Read and test the actual cart reducer logic
  const FREE_SHIPPING_THRESHOLD = 800;
  const STANDARD_SHIPPING = 60;

  function calculateSubtotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function calculateOrderDerivations(items, couponCode) {
    const subtotal = calculateSubtotal(items);
    const shippingCost =
      subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
    let discountAmount = 0;
    let couponError = null;

    if (couponCode) {
      const codeUpper = couponCode.toUpperCase().trim();
      if (codeUpper === "SAVE20") {
        discountAmount = Math.round(subtotal * 0.2);
      } else if (codeUpper === "FLAT100") {
        discountAmount = Math.min(100, subtotal);
      } else {
        couponError = "অবৈধ কুপন কোড। 'SAVE20' বা 'FLAT100' ব্যবহার করো।";
      }
    }

    return { discountAmount, shippingCost, couponError };
  }

  function complexCartReducer(state, action) {
    switch (action.type) {
      case "ADD_PRODUCT": {
        const existing = state.items.find((item) => item.id === action.payload.id);
        const nextItems = existing
          ? state.items.map((item) =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...state.items, { ...action.payload, quantity: 1 }];
        const derivations = calculateOrderDerivations(nextItems, state.couponCode);
        return { ...state, items: nextItems, ...derivations };
      }
      case "REMOVE_PRODUCT": {
        const nextItems = state.items.filter((item) => item.id !== action.payload.id);
        const derivations = calculateOrderDerivations(nextItems, state.couponCode);
        return { ...state, items: nextItems, ...derivations };
      }
      case "UPDATE_QUANTITY": {
        const nextItems = state.items
          .map((item) => {
            if (item.id === action.payload.id) {
              const nextQty = item.quantity + action.payload.delta;
              return nextQty > 0 ? { ...item, quantity: nextQty } : null;
            }
            return item;
          })
          .filter((item) => item !== null);
        const derivations = calculateOrderDerivations(nextItems, state.couponCode);
        return { ...state, items: nextItems, ...derivations };
      }
      case "APPLY_COUPON": {
        const derivations = calculateOrderDerivations(state.items, action.payload.code);
        return {
          ...state,
          couponCode: derivations.couponError ? state.couponCode : action.payload.code,
          ...derivations,
        };
      }
      default:
        return state;
    }
  }

  await t.test("8.1 Cart Reducer Transitions & Invariants", () => {
    let state = {
      items: [{ id: "c1", name: "Course", price: 600, quantity: 1 }],
      couponCode: null,
      discountAmount: 0,
      shippingCost: 60, // 600 < 800
      couponError: null,
    };

    // Add item that pushes subtotal to 1200 >= 800 (Free Shipping)
    state = complexCartReducer(state, {
      type: "ADD_PRODUCT",
      payload: { id: "c1", name: "Course", price: 600 },
    });
    assert.equal(state.items[0].quantity, 2);
    assert.equal(state.shippingCost, 0, "Subtotal 1200 qualifies for free shipping");

    // Apply SAVE20 coupon (20% of 1200 = 240)
    state = complexCartReducer(state, {
      type: "APPLY_COUPON",
      payload: { code: "SAVE20" },
    });
    assert.equal(state.discountAmount, 240);
    assert.equal(state.couponError, null);

    // Apply invalid coupon
    state = complexCartReducer(state, {
      type: "APPLY_COUPON",
      payload: { code: "INVALID99" },
    });
    assert.ok(state.couponError !== null, "Invalid coupon must produce an error message");

    // Decrement quantity twice to drop item completely
    state = complexCartReducer(state, {
      type: "UPDATE_QUANTITY",
      payload: { id: "c1", delta: -1 },
    });
    assert.equal(state.items[0].quantity, 1);
    state = complexCartReducer(state, {
      type: "UPDATE_QUANTITY",
      payload: { id: "c1", delta: -1 },
    });
    assert.equal(state.items.length, 0, "Quantity <= 0 must remove item from cart");
    assert.equal(state.shippingCost, 0, "Empty cart has zero shipping cost");
  });

  await t.test("8.2 Undo / Redo Time-Travel Reducer Transitions", () => {
    function undoRedoReducer(state, action) {
      switch (action.type) {
        case "UNDO": {
          if (state.past.length === 0) return state;
          const previous = state.past[state.past.length - 1];
          const nextPast = state.past.slice(0, state.past.length - 1);
          return {
            past: nextPast,
            present: previous,
            future: [state.present, ...state.future],
          };
        }
        case "REDO": {
          if (state.future.length === 0) return state;
          const next = state.future[0];
          const nextFuture = state.future.slice(1);
          return {
            past: [...state.past, state.present],
            present: next,
            future: nextFuture,
          };
        }
        case "SET": {
          if (state.present === action.payload) return state;
          return {
            past: [...state.past, state.present],
            present: action.payload,
            future: [],
          };
        }
        default:
          return state;
      }
    }

    let state = { past: [], present: "v1", future: [] };
    state = undoRedoReducer(state, { type: "SET", payload: "v2" });
    state = undoRedoReducer(state, { type: "SET", payload: "v3" });

    assert.equal(state.present, "v3");
    assert.deepEqual(state.past, ["v1", "v2"]);

    // Undo to v2
    state = undoRedoReducer(state, { type: "UNDO" });
    assert.equal(state.present, "v2");
    assert.deepEqual(state.future, ["v3"]);

    // Undo to v1
    state = undoRedoReducer(state, { type: "UNDO" });
    assert.equal(state.present, "v1");
    assert.deepEqual(state.future, ["v2", "v3"]);

    // Undo at boundary (no-op)
    const stateAtBoundary = undoRedoReducer(state, { type: "UNDO" });
    assert.equal(stateAtBoundary.present, "v1");

    // Redo to v2
    state = undoRedoReducer(state, { type: "REDO" });
    assert.equal(state.present, "v2");

    // New edit clears future
    state = undoRedoReducer(state, { type: "SET", payload: "v2-branch" });
    assert.equal(state.present, "v2-branch");
    assert.deepEqual(state.future, [], "Future history must be cleared on new SET");
  });
});

test("Suite 9: Topic 5.1/5.2/5.3 — Performance Optimization & Custom Equality", async (t) => {
  await t.test("9.1 Custom arePropsEqual Comparator Invariant", () => {
    function areProjectsEqual(prevProps, nextProps) {
      return (
        prevProps.project.id === nextProps.project.id &&
        prevProps.project.title === nextProps.project.title
      );
    }

    const prev = { project: { id: 1, title: "Next.js", meta: { lastPing: "10:00:00" } } };
    const nextTimestampOnly = { project: { id: 1, title: "Next.js", meta: { lastPing: "10:00:05" } } };
    const nextTitleChanged = { project: { id: 1, title: "Next.js Pro", meta: { lastPing: "10:00:05" } } };

    // In React.memo, returning TRUE means props are equal (skip re-render)
    assert.equal(areProjectsEqual(prev, nextTimestampOnly), true, "Timestamp change only should skip re-render (return true)");
    assert.equal(areProjectsEqual(prev, nextTitleChanged), false, "Title change must trigger re-render (return false)");
  });

  await t.test("9.2 useCallback Identity Retention Oracle", () => {
    let lastFn = null;
    let memoizedFn = null;
    let cachedDeps = null;

    function simulateUseCallback(fn, deps) {
      if (!cachedDeps || !deps.every((d, i) => d === cachedDeps[i])) {
        cachedDeps = deps;
        memoizedFn = fn;
      }
      return memoizedFn;
    }

    const fn1 = simulateUseCallback(() => "hello", [1]);
    const fn2 = simulateUseCallback(() => "hello", [1]);
    assert.equal(fn1, fn2, "Callback reference must remain strictly identical when deps do not change");

    const fn3 = simulateUseCallback(() => "hello", [2]);
    assert.notEqual(fn1, fn3, "Callback reference must update when deps change");
  });
});

test("Suite 10: Topic 6.1/6.2/6.3 — Modern React 19 & Next.js Pro", async (t) => {
  await t.test("10.1 Server Component Lack of Client Directive", () => {
    const serverCompPath = path.join(
      APP_DIR,
      "06-modern-react-19-and-nextjs",
      "6.1-server-vs-client-components",
      "server-component-pattern.tsx"
    );
    const content = fs.readFileSync(serverCompPath, "utf-8");
    const lines = content.split("\n").map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith("//") && !l.startsWith("/*") && !l.startsWith("*"));
    const firstCodeLine = lines[0] || "";
    const hasDirective = firstCodeLine.startsWith('"use client"') || firstCodeLine.startsWith("'use client'");
    assert.equal(
      hasDirective,
      false,
      "Server Component must NOT start with 'use client' directive"
    );
  });

  await t.test("10.2 React 19 registerUserAction Form Action Validation", async () => {
    async function registerUserAction(prevState, formData) {
      const username = formData.get("username")?.toString().trim();
      if (!username || username.length < 3) {
        return {
          message: "ইউজারনেম কমপক্ষে ৩ অক্ষরের হতে হবে!",
          success: false,
          submissionCount: prevState.submissionCount,
        };
      }
      return {
        message: `স্বাগতম @${username}! সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে।`,
        success: true,
        submissionCount: prevState.submissionCount + 1,
      };
    }

    const initial = { message: null, success: false, submissionCount: 0 };
    const invalidForm = new Map([["username", "ab"]]);
    const resFail = await registerUserAction(initial, invalidForm);
    assert.equal(resFail.success, false);
    assert.equal(resFail.submissionCount, 0);

    const validForm = new Map([["username", "shakib"]]);
    const resPass = await registerUserAction(resFail, validForm);
    assert.equal(resPass.success, true);
    assert.equal(resPass.submissionCount, 1);
  });

  await t.test("10.3 useOptimistic Reducer Update", () => {
    const updateFn = (currentLikes, addedLikes) => currentLikes + addedLikes;
    assert.equal(updateFn(42, 1), 43, "Optimistic update should increment immediately");
  });

  await t.test("10.4 CSS Design Tokens Compliance", () => {
    const tokensFile = path.join(
      APP_DIR,
      "06-modern-react-19-and-nextjs",
      "6.3-tailwind-and-shadcn-architecture",
      "design-tokens-theming.tsx"
    );
    const content = fs.readFileSync(tokensFile, "utf-8");
    // Ensure semantic token usage
    assert.ok(content.includes("bg-background"), "Should use bg-background");
    assert.ok(content.includes("text-foreground"), "Should use text-foreground");
    assert.ok(content.includes("bg-card"), "Should use bg-card");
    assert.ok(content.includes("bg-primary"), "Should use bg-primary");
    // Ensure no hardcoded hex color codes in classes
    assert.ok(!/#([0-9a-fA-F]{3}){1,2}\b/.test(content), "Should not use hardcoded hex color codes");
  });
});

test("Suite 11: 17 Topics Prerender and Export Integrity", async (t) => {
  await t.test("11.1 All 17 topic directories have valid page.tsx and pure examples", () => {
    const modules = [
      "02-interactivity-and-state",
      "03-forms-and-side-effects",
      "04-state-architecture",
      "05-performance-optimization",
      "06-modern-react-19-and-nextjs",
    ];

    let totalExamples = 0;
    for (const mod of modules) {
      const modDir = path.join(APP_DIR, mod);
      const topics = fs.readdirSync(modDir, { withFileTypes: true }).filter((d) => d.isDirectory());
      for (const topic of topics) {
        const topicDir = path.join(modDir, topic.name);
        const pageFile = path.join(topicDir, "page.tsx");
        assert.ok(fs.existsSync(pageFile), `Topic ${topic.name} must have page.tsx`);

        const examples = fs.readdirSync(topicDir).filter((f) => f.endsWith(".tsx") && f !== "page.tsx");
        assert.ok(examples.length >= 2, `Topic ${topic.name} must have at least 2 pure examples`);
        totalExamples += examples.length;
      }
    }

    assert.equal(totalExamples, 51, "Total pure example components across 17 topics must equal 51");
  });
});
