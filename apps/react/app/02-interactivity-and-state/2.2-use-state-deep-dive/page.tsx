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
import UpdaterFunctionAndBatching from "./updater-function-and-batching"
import UpdaterFunctionAndBatchingRaw from "./updater-function-and-batching.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import ImmutableObjectAndArrayState from "./immutable-object-and-array-state"
import ImmutableObjectAndArrayStateRaw from "./immutable-object-and-array-state.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import LazyInitialState from "./lazy-initial-state"
import LazyInitialStateRaw from "./lazy-initial-state.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ───────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "updater-function-and-batching",
    filePath:
      "apps/react/app/02-interactivity-and-state/2.2-use-state-deep-dive/updater-function-and-batching.tsx",
    title: "১. State Snapshot, Updater Function এবং Automatic Batching",
    description:
      "পরপর একাধিকবার setState কল করলে কী ঘটে? স্ন্যাপশট বনাম আপডেটার কিউ মেকানিক্স এবং রি-রেন্ডার অপ্টিমাইজেশন।",
    badge: "Updater Function",
    code: UpdaterFunctionAndBatchingRaw,
    preview: <UpdaterFunctionAndBatching />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="State Snapshot Model:">
          React-এ একটি রেন্ডারের ভেতরে স্টেট ভ্যারিয়েবলটি একটি স্থির ছবির
          (Snapshot) মতো আচরণ করে। একই ফাংশনে বারবার{" "}
          <code>setCount(count + 1)</code> লিখলে প্রতিবারই সেই রেন্ডারের পুরনো
          মানটিই ব্যবহৃত হয়। মান নির্ভরযোগ্যভাবে বাড়াতে সর্বদা{" "}
          <code>setCount(prev =&gt; prev + 1)</code> আপডেটার ফাংশন ব্যবহার করা উচিত।
        </ConceptAlert>

        <ComparisonGrid
          left={{
            title: "সরাসরি মান পাস (Direct Value)",
            badge: "Snapshot Bound",
            variant: "destructive",
            description: "একই হ্যান্ডলারে একাধিক আপডেট কল করলে:",
            items: [
              "<code>setCount(count + 1)</code> স্ন্যাপশটের মানের ওপর নির্ভরশীল।",
              "পরপর ৩ বার কল করলেও শেষ পর্যন্ত মান কেবল ১ বাড়ে।",
              "অ্যাসিঙ্ক্রোনাস ইভেন্ট বা টাইমআউটের ভেতর পুরনো মান পাওয়ার ঝুঁকি থাকে।",
            ],
          }}
          right={{
            title: "আপডেটার ফাংশন (Updater Callback)",
            badge: "Queue Safe",
            variant: "emerald",
            description: "পূর্ববর্তী পেন্ডিং স্টেটের ওপর নির্ভর করে মান পরিবর্তন:",
            items: [
              "<code>setCount(prev => prev + 1)</code> কিউ-এর সর্বশেষ মান গ্রহণ করে।",
              "পরপর ৩ বার কল করলে মান সঠিকভাবে ৩ বাড়বে।",
              "কনকারেন্ট মোড ও জটিল ট্রানজিশনে শতভাগ নিরাপদ।",
            ],
          }}
        />
      </div>
    ),
  },
  {
    id: "immutable-object-and-array-state",
    filePath:
      "apps/react/app/02-interactivity-and-state/2.2-use-state-deep-dive/immutable-object-and-array-state.tsx",
    title: "২. Object ও Array স্টেটের Immutability ও Spread Syntax",
    description:
      "স্টেট সরাসরি মিউটেট না করে স্প্রেড অপারেটর (...) এবং .filter() দিয়ে সম্পূর্ণ নতুন মেমোরি রেফারেন্স তৈরি করার নিয়ম।",
    badge: "Immutability",
    code: ImmutableObjectAndArrayStateRaw,
    preview: <ImmutableObjectAndArrayState />,
    learningNotes: (
      <RuleTable
        title="JavaScript মিউটেশন বনাম React ইমিউটেবল প্যাটার্ন চিটশিট:"
        rows={[
          {
            feature: "অবজেক্ট প্রোপার্টি পরিবর্তন",
            vanillaOrHtml: 'user.name = "নতুন নাম" ❌',
            reactEquivalent: 'setUser(prev => ({ ...prev, name: "নতুন নাম" })) ✅',
            note: "Shallow comparison পাস করতে নতুন অবজেক্ট রেফারেন্স আবশ্যক।",
          },
          {
            feature: "নেস্টেড অবজেক্ট আপডেট",
            vanillaOrHtml: 'user.details.title = "Lead" ❌',
            reactEquivalent: 'setUser(prev => ({ ...prev, details: { ...prev.details, title: "Lead" } })) ✅',
            note: "প্রতিটি নেস্টেড লেভেলে স্প্রেড অপারেটর দিতে হয়।",
          },
          {
            feature: "অ্যারেতে নতুন আইটেম যোগ",
            vanillaOrHtml: "items.push(newItem) ❌",
            reactEquivalent: "setItems(prev => [...prev, newItem]) ✅",
            note: "push() মূল অ্যারে পরিবর্তন করে; স্প্রেড নতুন অ্যারে বানায়।",
          },
          {
            feature: "অ্যারে থেকে আইটেম মোছা",
            vanillaOrHtml: "items.splice(index, 1) ❌",
            reactEquivalent: "setItems(prev => prev.filter(i => i.id !== id)) ✅",
            note: "filter() একটি নতুন ফিল্টার করা অ্যারে রিটার্ন করে।",
          },
        ]}
      />
    ),
  },
  {
    id: "lazy-initial-state",
    filePath:
      "apps/react/app/02-interactivity-and-state/2.2-use-state-deep-dive/lazy-initial-state.tsx",
    title: "৩. Lazy Initial State: ভারি ইনিশিয়ালাইজেশন অপ্টিমাইজেশন",
    description:
      "প্রতি রি-রেন্ডারে জটিল হিসাব এড়াতে useState-এ কলব্যাক ফাংশন পাস করার কৌশল।",
    badge: "Performance Tip",
    code: LazyInitialStateRaw,
    preview: <LazyInitialState />,
    learningNotes: (
      <CommonPitfall
        title="স্টেট ভ্যারিয়েবল সরাসরি পরিবর্তন (Direct Mutation) করার ফাঁদ"
        mistakeDescription="অবজেক্ট বা অ্যারের প্রোপার্টি সরাসরি পাল্টে ফেলা:"
        solutionDescription="স্প্রেড অপারেটর দিয়ে নতুন অবজেক্ট বা অ্যারে রেফারেন্স তৈরি করে স্টেটে পাঠানো:"
        badCode={`// ❌ ভুল: অবজেক্ট সরাসরি মিউটেট করা
user.score += 10;
setUser(user); // রেফারেন্স একই থাকায় React UI আপডেট করবে না!`}
        goodCode={`// ✅ সঠিক: স্প্রেড অপারেটর দিয়ে নতুন অবজেক্ট কপি তৈরি করা
setUser(prev => ({
  ...prev,
  score: prev.score + 10,
}));`}
        whyItFails="React পারফরম্যান্সের স্বার্থে Object.is দিয়ে রেফারেন্স তুলনা (Shallow Comparison) করে। সরাসরি অবজেক্ট মিউটেট করলে মেমোরি অ্যাড্রেস একই থাকে, ফলে React ধরে নেয় ডেটা পরিবর্তন হয়নি এবং রি-রেন্ডার স্কিপ করে।"
      />
    ),
  },
]

// ── ৩. মূল পেজ কম্পোনেন্ট ───────────────────────────────────────────────────
export default function UseStateDeepDivePage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="স্টেট ম্যানেজমেন্ট • Level 2.2"
        title="useState Hook-এর গভীর মেকানিক্স"
        description={
          <>
            সাধারণ লোকাল ভ্যারিয়েবল কেন রেন্ডার সাইকেলে মুছে যায়, কীভাবে{" "}
            <strong>useState</strong> কম্পোনেন্টের মেমোরি সংরক্ষণ করে, স্টেট আপডেট
            ব্যাচিং এবং <strong>ইমিউটেবিলিটি</strong> নিশ্চিত করার গভীর মেকানিক্স।
          </>
        }
        formula={{
          label: "State Snapshot Model",
          value: "const [state, setState] = useState(initialValue)",
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
        question="নিচের হ্যান্ডলারটিতে বাটন একবার ক্লিক করলে কাউন্টারের মান মোট কত বাড়বে?
function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}"
        hint="মনে রেখো: একটি রেন্ডারে স্টেট একটি স্থির স্ন্যাপশট হিসেবে কাজ করে।"
        options={[
          {
            text: "কাউন্টারের মান ৩ বাড়বে",
            isCorrect: false,
            feedback: "❌ ভুল! স্ন্যাপশট মডেলের কারণে তিনটি কলেই একই পুরনো count মান ব্যবহৃত হয়, ফলে মান মাত্র ১ বাড়ে।",
          },
          {
            text: "কাউন্টারের মান ১ বাড়বে",
            isCorrect: true,
            feedback: "🎉 সঠিক! একই রেন্ডার স্ন্যাপশটে count-এর মান স্থির থাকায় প্রতিটি কল একই মান সেট করতে চায়, শেষ পর্যন্ত মাত্র ১ বৃদ্ধি পায়। ৩ বাড়াতে হলে আপডেটার ফাংশন setCount(c => c + 1) ব্যবহার করতে হতো।",
          },
          {
            text: "React একটি রানটাইম এরর থ্রো করবে",
            isCorrect: false,
            feedback: "❌ ভুল! কোডটি সম্পূর্ণ বৈধ, কিন্তু এটি লজিক্যাল ত্রুটি তৈরি করে।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ২.১ Event Handling",
          href: "/02-interactivity-and-state/2.1-event-handling",
        }}
        next={{
          title: "পরবর্তী: ২.৩ Conditional Rendering",
          href: "/02-interactivity-and-state/2.3-conditional-rendering",
        }}
      />
    </div>
  )
}
