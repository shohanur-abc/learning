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
import EffectDependencyVariants from "./effect-dependency-variants"
import EffectDependencyVariantsRaw from "./effect-dependency-variants.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import CleanupTimerAndEvents from "./cleanup-timer-and-events"
import CleanupTimerAndEventsRaw from "./cleanup-timer-and-events.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import DataFetchRaceCondition from "./data-fetch-race-condition"
import DataFetchRaceConditionRaw from "./data-fetch-race-condition.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ───────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "effect-dependency-variants",
    filePath:
      "apps/react/app/03-forms-and-side-effects/3.2-use-effect-hook/effect-dependency-variants.tsx",
    title: "১. Dependency Array-এর ৩টি ভ্যারিয়েন্ট",
    description:
      "ডিপেন্ডেন্সি অ্যারে ছাড়া (প্রতি রেন্ডারে), খালি অ্যারে [] (কেবল মাউন্টে), এবং নির্দিষ্ট ডিপেন্ডেন্সি [count] পরিবর্তনের পার্থক্য পর্যবেক্ষণ।",
    badge: "Dependency Variants",
    code: EffectDependencyVariantsRaw,
    preview: <EffectDependencyVariants />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="সিঙ্ক্রোনাইজেশনের মানসিক মডেল (Mental Model)">
          <code>useEffect</code> লাইফসাইকেল মেথড নয়, এটি মূলত <strong>সিঙ্ক্রোনাইজেশন</strong> টুল।
          রেন্ডার চলাকালীন React পিউর ফাংশন হিসেবে কাজ করে স্ক্রিনে কী আঁকা হবে তা হিসাব করে।
          রেন্ডার সম্পন্ন হওয়ার পর ব্রাউজারের DOM তৈরি হলে React ইফেক্টের ভেতরে থাকা কোড
          চালায় যাতে বাহ্যিক সিস্টেম (যেমন: DOM API, উইন্ডো লিসেনার, টাইমার, বা অ্যানিমেশন)
          স্টেটের সাথে সিঙ্ক হতে পারে।
        </ConceptAlert>

        <RuleTable
          title="Dependency Array-এর তুলনামূলক নিয়মাবলী"
          colHeaders={["ভ্যারিয়েন্ট সিনট্যাক্স", "কখন কার্যকর হয়?", "ব্যবহারের উদ্দেশ্য", "সতর্কতা"]}
          rows={[
            {
              feature: "১. useEffect(fn)",
              vanillaOrHtml: "প্রতিটি রেন্ডারের পর",
              reactEquivalent: "DOM সাইজ পরিমাপ বা অবিরাম সিঙ্ক",
              note: "ভেতরে স্টেট আপডেট করলে ইনফিনিট লুপ তৈরি হবে!",
            },
            {
              feature: "২. useEffect(fn, [])",
              vanillaOrHtml: "কেবল প্রাথমিক মাউন্টে একবার",
              reactEquivalent: "এককালীন ইভেন্ট লিসেনার বা উইজেট শুরু",
              note: "স্টেট বা প্রপসের পুরনো মান (stale closure) তৈরি হতে পারে।",
            },
            {
              feature: "৩. useEffect(fn, [prop, state])",
              vanillaOrHtml: "তালিকার যেকোনো মান বদলালে",
              reactEquivalent: "নির্দিষ্ট ভ্যারিয়েবলের সাপেক্ষে সিঙ্ক্রোনাইজেশন",
              note: "ব্যবহৃত সমস্ত রিঅ্যাক্টিভ ভ্যালু তালিকায় উল্লেখ করতে হবে।",
            },
          ]}
        />
      </div>
    ),
  },
  {
    id: "cleanup-timer-and-events",
    filePath:
      "apps/react/app/03-forms-and-side-effects/3.2-use-effect-hook/cleanup-timer-and-events.tsx",
    title: "২. Cleanup Function: মেমোরি লিক ও টাইমার বন্ধ করা",
    description:
      "কম্পোনেন্ট আনমাউন্ট হওয়ার সময় বা পরবর্তী ইফেক্ট রান করার আগে টাইমার ও উইন্ডো ইভেন্ট লিসেনার ধ্বংস করার সুরক্ষামূলক কৌশল।",
    badge: "Resource Cleanup",
    code: CleanupTimerAndEventsRaw,
    preview: <CleanupTimerAndEvents />,
    learningNotes: (
      <div className="space-y-4">
        <ComparisonGrid
          left={{
            title: "ক্লিন-আপ ছাড়া (Memory Leak)",
            badge: "Hazardous",
            variant: "destructive",
            description: "আনমাউন্টের পরেও ব্যাকগ্রাউন্ডে রিসোর্স চলতে থাকে",
            items: [
              "<code>setInterval</code> মেমোরিতে চলতেই থাকে",
              "উইন্ডো ইভেন্ট লিসেনারগুলো জমতে থাকে",
              "স্ক্রিন দৃশ্যমান না থাকলেও CPU ও ব্যাটারি খরচ হয়",
              "অস্তিত্বহীন কম্পোনেন্টের স্টেট পরিবর্তনের কারণে সতর্কবার্তা আসে",
            ],
          }}
          right={{
            title: "ক্লিন-আপ সহ (Safe & Optimized)",
            badge: "Recommended",
            variant: "emerald",
            description: "ইফেক্টের রিটার্ন ফাংশন সমস্ত আবর্জনা পরিষ্কার করে",
            items: [
              "<code>return () => clearInterval(id)</code>",
              "<code>return () => window.removeEventListener(...)</code>",
              "কম্পোনেন্ট বন্ধ হওয়ার সাথে সাথেই মেমোরি সম্পূর্ণ খালি হয়",
              "পারফরম্যান্স এবং অ্যাপ্লিকেশন স্ট্যাবিলিটি সর্বোচ্চ থাকে",
            ],
          }}
        />

        <CommonPitfall
          title="ডিপেন্ডেন্সি অ্যারে ছাড়া useEffect-এ সরাসরি setState কল করে ব্রাউজার ফ্রিজ করা"
          mistakeDescription="useEffect-এর ভেতরে স্টেট আপডেট করা কিন্তু কোনো ডিপেন্ডেন্সি অ্যারে না দেওয়া।"
          solutionDescription="ইফেক্টটিকে নির্দিষ্ট ডিপেন্ডেন্সিতে সীমাবদ্ধ করুন অথবা ইভেন্ট হ্যান্ডলারে সরাসরি লজিক স্থানান্তর করুন।"
          badCode={`// ❌ মারাত্মক বিপদ: অসীম লুপ (Infinite Render Loop)
React.useEffect(() => {
  setCount(count + 1)
})`}
          goodCode={`// ✅ নিরাপদ উপায়: নির্দিষ্ট ইভেন্টে বা খালি ডিপেন্ডেন্সিতে আপডেট
React.useEffect(() => {
  // মাউন্টে একবার টাইমার সেট করা
  const timer = setInterval(() => setCount(c => c + 1), 1000)
  return () => clearInterval(timer)
}, [])`}
          whyItFails="ডিপেন্ডেন্সি অ্যারে না দিলে প্রতি রেন্ডারের পর ইফেক্ট চলে। ইফেক্ট স্টেট আপডেট করে, স্টেট আপডেট আবার নতুন রেন্ডার ঘটায়, নতুন রেন্ডার আবার ইফেক্ট চালায়—ফলে একটি অনন্ত লুপ তৈরি হয়ে নিমেষেই ব্রাউজার ক্র্যাশ করে।"
        />
      </div>
    ),
  },
  {
    id: "data-fetch-race-condition",
    filePath:
      "apps/react/app/03-forms-and-side-effects/3.2-use-effect-hook/data-fetch-race-condition.tsx",
    title: "৩. Asynchronous Race Condition ও Ignore Flag",
    description:
      "দ্রুত একাধিক রিকোয়েস্ট পাঠানোর পর ধীরগতির পুরনো রেসপন্স যাতে নতুন রেসপন্সকে প্রতিস্থাপন না করে সেজন্য বুলিয়ান ফ্ল্যাগ দিয়ে ডেটা ফেচিং সুরক্ষিত রাখা।",
    badge: "Race Condition Safe",
    code: DataFetchRaceConditionRaw,
    preview: <DataFetchRaceCondition />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="tip" title="Race Condition কেন ঘটে এবং Ignore Flag কীভাবে বাঁচায়?">
          মনে করুন আপনি প্রথমে <strong>ইউজার ১</strong>-এ ক্লিক করলেন (নেটওয়ার্ক লেটেন্সি ১.৫ সেকেন্ড),
          এবং আধা সেকেন্ড পরেই <strong>ইউজার ২</strong>-এ ক্লিক করলেন (নেটওয়ার্ক লেটেন্সি ০.৩ সেকেন্ড)।
          ইউজার ২-এর উত্তর দ্রুত চলে আসবে এবং স্ক্রিনে দেখাবে। কিন্তু এর কিছুক্ষণ পর ইউজার ১-এর
          পুরনো উত্তরটি এসে ইউজার ২-এর স্ক্রিনকে ওভাররাইট করে ফেলবে!
          ক্লিন-আপে <code>ignore = true</code> করে রাখলে পুরনো উত্তর আসার আগেই তা বাতিল হয়ে যায়।
        </ConceptAlert>
      </div>
    ),
  },
]

// ── ৩. মূল পেজ কম্পোনেন্ট ───────────────────────────────────────────────────
export default function UseEffectHookPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="সাইড ইফেক্ট • Level 3.2"
        title="useEffect Hook ও সিঙ্ক্রোনাইজেশন"
        description={
          <>
            React রেন্ডারিং সাইকেলের বাইরে বাহ্যিক সিস্টেমের সাথে সিঙ্ক করা। ডিপেন্ডেন্সি
            অ্যারে ভ্যারিয়েন্ট, ক্লিন-আপ ফাংশনের সাহায্যে মেমোরি লিক রোধ এবং ডেটা ফেচিং রেস কন্ডিশন প্রতিরোধ।
          </>
        }
        formula={{
          label: "Effect Lifecycle",
          value: "useEffect(() => { setup(); return () => cleanup(); }, [deps])",
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
        question="কোনো useEffect-এ উইন্ডো ইভেন্ট লিসেনার যুক্ত করার পর ক্লিন-আপ রিটার্ন ফাংশন না দিলে কী সমস্যা ঘটবে?"
        hint="কম্পোনেন্ট যতবার রি-রেন্ডার বা আনমাউন্ট হবে, ব্যাকগ্রাউন্ডে ব্রাউজারের মেমোরিতে কী ঘটবে?"
        options={[
          {
            text: "ব্রাউজারে মেমোরি লিক (Memory Leak) ঘটবে এবং পুরনো লিসেনার ব্যাকগ্রাউন্ডে সক্রিয় থেকে অপ্রত্যাশিত আচরণ তৈরি করবে।",
            isCorrect: true,
            feedback: "🎉 একদম সঠিক! অপ্রয়োজনীয় লিসেনারগুলো মেমোরিতে জমতে থাকে এবং কম্পোনেন্ট আনমাউন্ট হয়ে গেলেও কোড এক্সিকিউট করতে থাকে।",
          },
          {
            text: "React বিল্ডের সময় TypeScript কম্পাইলেশন এরর দিয়ে বিল্ড আটকে দেবে।",
            isCorrect: false,
            feedback: "❌ না, ক্লিন-আপ ঐচ্ছিক হওয়ায় TypeScript কোনো বিল্ড এরর দেবে না; সমস্যাটি রানটাইমে মারাত্মক মেমোরি লিক সৃষ্টি করবে।",
          },
          {
            text: "ইভেন্ট লিসেনারটি ব্রাউজারে প্রথম থেকেই কাজ করবে না।",
            isCorrect: false,
            feedback: "❌ লিসেনার কাজ করবে ঠিকই, কিন্তু পরবর্তীতে তা কখনই বন্ধ করা যাবে না।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ৩.১ Forms in React",
          href: "/03-forms-and-side-effects/3.1-forms-in-react",
        }}
        next={{
          title: "পরবর্তী: ৩.৩ useRef & DOM Access",
          href: "/03-forms-and-side-effects/3.3-use-ref-and-dom-access",
        }}
      />
    </div>
  )
}
