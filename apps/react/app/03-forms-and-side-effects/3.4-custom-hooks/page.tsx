"use client"

import Link from "next/link"

import {
  ExamplePageShell,
  type ShowcaseItem,
} from "@workspace/ui/components/custom/example-page-shell"
import {
  TopicHero,
  ComparisonGrid,
  RuleTable,
  CommonPitfall,
  ConceptAlert,
  ConceptQuiz,
  TopicPagination,
} from "@workspace/ui/components/custom/learning-components"

// ── ১. পিউর এক্সাম্পল কম্পোনেন্ট ও র-ইমপোর্ট ─────────────────────────────────
import UseToggleHook from "./use-toggle-hook"
import UseToggleHookRaw from "./use-toggle-hook.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import UseLocalStorageHook from "./use-local-storage-hook"
import UseLocalStorageHookRaw from "./use-local-storage-hook.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import UseWindowSizeHook from "./use-window-size-hook"
import UseWindowSizeHookRaw from "./use-window-size-hook.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ───────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "use-toggle-hook",
    filePath:
      "apps/react/app/03-forms-and-side-effects/3.4-custom-hooks/use-toggle-hook.tsx",
    title: "১. useToggle Hook: রিইউজেবল বুলিয়ান কন্ট্রোল",
    description:
      "বারংবার বুলিয়ান টগল কোড লেখার অবসান ঘটিয়ে [value, toggle, setTrue, setFalse] প্যাটার্নে কাস্টম হুক এক্সট্র্যাক্ট করা।",
    badge: "Stateful Logic Reuse",
    code: UseToggleHookRaw,
    preview: <UseToggleHook />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="Custom Hook কী?">
          Custom Hook হলো একটি সাধারণ JavaScript ফাংশন যার নাম <strong>&quot;use&quot;</strong> দিয়ে
          শুরু হয় এবং যার ভেতরে অন্যান্য React Hooks (যেমন: <code>useState</code>, <code>useEffect</code>,
          <code>useCallback</code>) কল করা যায়। এটি কম্পোনেন্টের UI রেন্ডারিং লজিক থেকে
          স্টেটফুল বিজনেস লজিককে সম্পূর্ণ আলাদা করে সহজে টেস্ট ও পুনঃব্যবহারযোগ্য করে তোলে।
        </ConceptAlert>

        <RuleTable
          title="Custom Hook রচনার সোনালী নিয়মাবলী"
          colHeaders={["নিয়ম (Rule)", "বাধ্যতামূলক শর্ত", "সঠিক উদাহরণ", "কেন প্রয়োজনীয়?"]}
          rows={[
            {
              feature: "১. নেমিং কনভেনশন",
              vanillaOrHtml: "ছোট হাতের 'use' দিয়ে শুরু",
              reactEquivalent: "useToggle, useLocalStorage",
              note: "React linter যাতে স্বয়ংক্রিয়ভাবে হুকের নিয়ম প্রয়োগ করতে পারে।",
            },
            {
              feature: "২. শীর্ষ স্তরে কল (Top Level)",
              vanillaOrHtml: "লুপ বা if-এর ভেতর নিষিদ্ধ",
              reactEquivalent: "ফাংশনের শীর্ষ স্তরে",
              note: "প্রতি রেন্ডারে যাতে হুকের কলের ধারাবাহিকতা অক্ষুণ্ণ থাকে।",
            },
            {
              feature: "৩. হুক কম্পোজিশন",
              vanillaOrHtml: "অন্তত ১টি হুক কল থাকতে হবে",
              reactEquivalent: "useState / useEffect কল",
              note: "ভেতরে কোনো হুক না থাকলে তা সাধারণ ইউটিলিটি ফাংশন হওয়াই উচিত।",
            },
          ]}
        />
      </div>
    ),
  },
  {
    id: "use-local-storage-hook",
    filePath:
      "apps/react/app/03-forms-and-side-effects/3.4-custom-hooks/use-local-storage-hook.tsx",
    title: "২. useLocalStorage Hook: SSR-নিরাপদ ডেটা পারসিস্টেন্স",
    description:
      "React স্টেট এবং ব্রাউজারের লোকাল স্টোরেজকে স্বয়ংক্রিয়ভাবে সিঙ্ক রাখা, নেক্সট.জেএস SSR ক্র্যাশ রোধ এবং জেনেরিক টাইপসাপোর্ট নিশ্চিতকরণ।",
    badge: "Persistent Storage",
    code: UseLocalStorageHookRaw,
    preview: <UseLocalStorageHook />,
    learningNotes: (
      <div className="space-y-4">
        <ComparisonGrid
          left={{
            title: "সাধারণ ইউটিলিটি ফাংশন",
            badge: "Pure Helper",
            variant: "default",
            description: "স্টেটবিহীন হিসাব-নিকাশ",
            items: [
              "কোনো React হুক কল করতে পারে না",
              "কোনো রি-রেন্ডার ট্রিগার করতে পারে না",
              "কেবল ইনপুট আর্গুমেন্ট নিয়ে আউটপুট রিটার্ন করে",
              "যেমন: <code>formatDate(date)</code> বা <code>calculateTax(amount)</code>",
            ],
          }}
          right={{
            title: "কাস্টম রিঅ্যাক্ট হুক",
            badge: "Stateful Hook",
            variant: "emerald",
            description: "React লাইফসাইকেল ও স্টেটের সাথে যুক্ত",
            items: [
              "<code>useState</code> ও <code>useEffect</code> ধারণ করে",
              "স্টেট বদলালে কলার কম্পোনেন্ট স্বয়ংক্রিয় রি-রেন্ডার হয়",
              "ব্রাউজার ইভেন্ট বা সাবস্ক্রিপশনের সাথে সিঙ্ক করতে পারে",
              "যেমন: <code>useLocalStorage(key, val)</code> বা <code>useDebounce(val)</code>",
            ],
          }}
        />

        <CommonPitfall
          title="মনে করা যে একাধিক কম্পোনেন্টে একই কাস্টম হুক কল করলে স্টেট শেয়ার হবে"
          mistakeDescription="ভুল ধারণা: ComponentA এবং ComponentB দুজনেই useLocalStorage কল করেছে, তাই A-তে আপডেট করলে B-ও সাথে সাথে কোনো ইভেন্ট ছাড়াই স্টেট শেয়ার করবে।"
          solutionDescription="কাস্টম হুক লজিক রিইউজ করে, কিন্তু স্টেট শেয়ার করে না। কম্পোনেন্টগুলোর মাঝে সরাসরি স্টেট শেয়ার করতে চাইলে 'Lifting State Up' বা 'Context API' ব্যবহার করতে হবে।"
          badCode={`// ❌ ভুল ধারণা: দুটি চাইল্ড একই স্টেট শেয়ার করছে মনে করা
function Profile() {
  const [theme] = useTheme() // স্বতন্ত্র স্টেট কপি ১
}
function Navbar() {
  const [theme] = useTheme() // সম্পূর্ণ আলাদা স্টেট কপি ২
}`}
          goodCode={`// ✅ সঠিক স্থাপত্য: স্টেট শেয়ার করতে Lifting Up বা Context ব্যবহার
// ThemeContext.Provider এর মাধ্যমে একটি একক স্টেট বিতরণ করা`}
          whyItFails="কাস্টম হুক কোনো গ্লোবাল স্টোর (যেমন Redux বা Context) নয়। এটি কেবল একটি ফাংশন যার ভেতর নতুন করে useState ও useEffect রান হয়। প্রতিটি কল কম্পোনেন্টকে নিজস্ব স্বাধীন মেমোরি সেল দেয়।"
        />
      </div>
    ),
  },
  {
    id: "use-window-size-hook",
    filePath:
      "apps/react/app/03-forms-and-side-effects/3.4-custom-hooks/use-window-size-hook.tsx",
    title: "৩. useWindowSize Hook: রেসপন্সিভ ভিউপোর্ট সাবস্ক্রিপশন",
    description:
      "উইন্ডো রিসাইজ ইভেন্ট লিসেনারকে কাস্টম হুকে এনক্যাপসুলেট করে মোবাইল, ট্যাবলেট ও ডেস্কটপ ব্রেকপয়েন্ট রিয়েল-টাইমে সরবরাহ করা।",
    badge: "DOM Event Hook",
    code: UseWindowSizeHookRaw,
    preview: <UseWindowSizeHook />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="tip" title="হুকের ভেতরে ক্লিন-আপের ক্ষমতা">
          কাস্টম হুকের সবচেয়ে বড় সৌন্দর্য হলো এটি সাবস্ক্রিপশন ও তার ক্লিন-আপকে সম্পূর্ণ
          নিজস্ব বাউন্ডারির মধ্যে লুকিয়ে ফেলে। কোনো কম্পোনেন্ট যখন <code>useWindowSize()</code>
          ব্যবহার করে, তখন কম্পোনেন্টকে জানতেও হয় না যে ব্যাকগ্রাউন্ডে কখন
          <code>addEventListener</code> যুক্ত হলো আর কখন <code>removeEventListener</code>
          দ্বারা মেমোরি মুক্ত হলো!
        </ConceptAlert>
      </div>
    ),
  },
]

// ── ৩. মূল পেজ কম্পোনেন্ট ───────────────────────────────────────────────────
export default function CustomHooksPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="লজিক রিইউজ • Level 3.4"
        title="Custom Hooks: রিইউজেবল স্টেটফুল লজিক"
        description={
          <>
            কম্পোনেন্ট থেকে স্টেটফুল বিজনেস লজিক আলাদা করে পুনঃব্যবহারযোগ্য জাভাস্ক্রিপ্ট
            ফাংশনে রূপান্তর। নেমিং কনভেনশন, হুকের নিয়মাবলি এবং স্টেট শেয়ারিং বনাম লজিক শেয়ারিংয়ের পার্থক্য।
          </>
        }
        formula={{
          label: "Custom Hook Definition",
          value: "Custom Hook = Standard Function + React Hooks (starts with 'use')",
        }}
      />

      {/* ইন্টারেক্টিভ শোকেস ও কোড এক্সপ্লোরার */}
      <ExamplePageShell
        title="ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার"
        description="নিচের ডেমোগুলোর সাথে ইন্টার‍্যাক্ট করো এবং বাস্তব কোড দেখতে 'Code' ট্যাবে বা ফাইলের লিঙ্কে ক্লিক করো।"
        items={showcaseItems}
      />

      {/* কুইক কুইজ */}
      <ConceptQuiz
        question="যদি দুটি সম্পূর্ণ আলাদা কম্পোনেন্ট একই কাস্টম হুক `useCounter()` কল করে, তবে তাদের স্টেটের আচরণ কেমন হবে?"
        hint="কাস্টম হুক কি লজিক রি-ইউজ করে নাকি স্টেট ইনস্ট্যান্স শেয়ার করে?"
        options={[
          {
            text: "প্রতিটি কম্পোনেন্ট তার নিজস্ব সম্পূর্ণ স্বাধীন ও আইসোলেটেড স্টেট কপি পাবে; একজনের মান বাড়লে অন্যজনের মান বদলাবে না।",
            isCorrect: true,
            feedback: "🎉 অসাধারণ! কাস্টম হুক কেবল স্টেটফুল কোডকে রিইউজ করে, কিন্তু স্টেট ইনস্ট্যান্স শেয়ার করে না। প্রতিটি কল নতুন useState তৈরি করে।",
          },
          {
            text: "দুটি কম্পোনেন্ট একই গ্লোবাল স্টেট শেয়ার করবে এবং একজনের কাউন্টার বাড়ালে স্বয়ংক্রিয়ভাবে অন্যজনের কাউন্টারও বেড়ে যাবে।",
            isCorrect: false,
            feedback: "❌ ভুল। কাস্টম হুক কোনো গ্লোবাল ভ্যারিয়েবল নয়; এটি প্রতি কলে স্বাধীন স্টেট বরাদ্দ করে।",
          },
          {
            text: "React বিল্ড টাইমে কম্পাইলেশন এরর দিয়ে দ্বিতীয় কলটি রিজেক্ট করবে।",
            isCorrect: false,
            feedback: "❌ কাস্টম হুক যত খুশি তত কম্পোনেন্টে নির্বিঘ্নে কল করা যায়।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ৩.৩ useRef & DOM Access",
          href: "/03-forms-and-side-effects/3.3-use-ref-and-dom-access",
        }}
        next={{
          title: "পরবর্তী: ৪.১ Lifting State Up",
          href: "/04-state-architecture/4.1-lifting-state-up",
        }}
      />
    </div>
  )
}
