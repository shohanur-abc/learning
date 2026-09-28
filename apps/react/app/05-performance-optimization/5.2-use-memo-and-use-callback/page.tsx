"use client"

import Link from "next/link"

import {
  ExamplePageShell,
  type ShowcaseItem,
} from "@workspace/ui/components/custom/example-page-shell"
import {
  TopicHero,
  RuleTable,
  ComparisonGrid,
  CommonPitfall,
  ConceptAlert,
  ConceptQuiz,
  TopicPagination,
} from "@workspace/ui/components/custom/learning-components"

import UseMemoCalculation from "./use-memo-calculation"
import UseMemoCalculationRaw from "./use-memo-calculation.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import UseCallbackReference from "./use-callback-reference"
import UseCallbackReferenceRaw from "./use-callback-reference.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import WhenNotToMemoize from "./when-not-to-memoize"
import WhenNotToMemoizeRaw from "./when-not-to-memoize.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "use-memo-calculation",
    filePath:
      "apps/react/app/05-performance-optimization/5.2-use-memo-and-use-callback/use-memo-calculation.tsx",
    title: "১. useMemo: ব্যয়বহুল গণনা ক্যাশ করা (Value Memoization)",
    description:
      "ফিল্টারিং বা জটিল গাণিতিক হিসাব মেমোইজ করে রাখা, যাতে সম্পর্কহীন কোনো স্টেট পরিবর্তনের কারণে কম্পোনেন্ট রি-রেন্ডার হলেও ওই হিসাব পুনরায় না চলে।",
    badge: "Value Cache",
    code: UseMemoCalculationRaw,
    preview: <UseMemoCalculation />,
    learningNotes: (
      <ConceptAlert type="info" title="কখন ব্যবহার করবেন useMemo?">
        একটি হিসাবকে মেমোইজ করার আগে দুটি প্রশ্ন করুন: ১) হিসাবটি কি সত্যিই ধীরগতির বা হাজার হাজার আইটেমের লুপ চালায়? ২) হিসাব থেকে তৈরি অবজেক্ট বা অ্যারে কি অন্য কোনো <code>React.memo</code> কম্পোনেন্টে প্রপস হিসেবে যাচ্ছে বা অন্য কোনো <code>useEffect</code>-এর ডিপেন্ডেন্সি? এই দুটি শর্ত পূরণ হলে তবেই <code>useMemo</code> উপযুক্ত।
      </ConceptAlert>
    ),
  },
  {
    id: "use-callback-reference",
    filePath:
      "apps/react/app/05-performance-optimization/5.2-use-memo-and-use-callback/use-callback-reference.tsx",
    title: "২. useCallback: ফাংশনের রেফারেন্স স্থির রাখা (Reference Memoization)",
    description:
      "জাভাস্ক্রিপ্টে প্রতি রেন্ডারে নতুন ফাংশন অবজেক্ট তৈরি হওয়া রোধ করে মেমোরি রেফারেন্স স্থির রাখা, যাতে চাইল্ডের React.memo অপ্টিমাইজেশন অটুট থাকে।",
    badge: "Reference Cache",
    code: UseCallbackReferenceRaw,
    preview: <UseCallbackReference />,
    learningNotes: (
      <ComparisonGrid
        left={{
          title: "useMemo(() => fn, deps)",
          badge: "Returns Value",
          variant: "primary",
          description: "ক্যালকুলেশন ফাংশনটি রান করে তার ফলাফল ক্যাশ করে:",
          items: [
            "উদ্দেশ্য: জটিল হিসাবের রিটার্ন ভ্যালু (Object, Array, Primitive) ক্যাশ করা।",
            "সিনট্যাক্স: <code>const val = useMemo(() => compute(), [a])</code>",
            "রিটার্ন: ফাংশনটির এক্সেকিউশনের আউটপুট রিটার্ন করে।",
            "ব্যবহার ক্ষেত্র: ফিল্টার, সর্ট, গ্রুপিং ও ট্রান্সফরমেশন।",
          ],
        }}
        right={{
          title: "useCallback(fn, deps)",
          badge: "Returns Function",
          variant: "emerald",
          description: "ফাংশনের রেফারেনশিয়াল আইডেন্টিটি ক্যাশ করে:",
          items: [
            "উদ্দেশ্য: ইভেন্ট হ্যান্ডলার বা কলব্যাকের মেমোরি পয়েন্টার স্থির রাখা।",
            "সিনট্যাক্স: <code>const fn = useCallback(() => doWork(), [a])</code>",
            "রিটার্ন: ফাংশনটিকে সরাসরি রান না করে তার রেফারেন্স ফেরত দেয়।",
            "ব্যবহার ক্ষেত্র: <code>React.memo</code> চাইল্ডে প্রপ হিসেবে পাস করা ফাংশন।",
          ],
        }}
      />
    ),
  },
  {
    id: "when-not-to-memoize",
    filePath:
      "apps/react/app/05-performance-optimization/5.2-use-memo-and-use-callback/when-not-to-memoize.tsx",
    title: "৩. কখন মেমোইজ করবেন না (Premature Optimization Trap)",
    description:
      "সহজ প্রিমিটিভ হিসাব (যেমন price * quantity) এ useMemo এর ক্ষতি বনাম সরাসরি ডেরাইভড স্টেট হিসাবের সহজ ও দ্রুত সমাধান।",
    badge: "Anti-Pattern Fix",
    code: WhenNotToMemoizeRaw,
    preview: <WhenNotToMemoize />,
    learningNotes: (
      <CommonPitfall
        title="সহজ প্রিমিটিভ হিসাবে useMemo র‍্যাপ করার ভুল"
        mistakeDescription="ছোট গাণিতিক বা স্ট্রিং যোগে useMemo ব্যবহার করা:"
        badCode={`// ❌ অতিরিক্ত জটিলতা ও অপ্রয়োজনীয় হুক ওভারহেড
const fullName = useMemo(() => firstName + " " + lastName, [firstName, lastName]);
const totalPrice = useMemo(() => price * quantity, [price, quantity]);`}
        solutionDescription="সরাসরি ডেরাইভড ভ্যালু হিসেবে বডিতে হিসাব করা:"
        goodCode={`// ✅ খাঁটি জাভাস্ক্রিপ্ট — দ্রুত, পরিচ্ছন্ন ও কোনো মেমোরি ফুটপ্রিন্ট নেই
const fullName = firstName + " " + lastName;
const totalPrice = price * quantity;`}
        whyItFails="useMemo কোনো ফ্রি লাঞ্চ নয়! এটি কল করার সময় React-কে ইন্টারনাল হুক লিংকড লিস্টে মেমোরি বরাদ্দ করতে হয়, অ্যারে অবজেক্ট বানাতে হয় এবং প্রতি রেন্ডারে অ্যারে এলিমেন্টগুলো তুলনা করতে হয়। এর খরচ সাধারণ যোগ বা গুণের চেয়ে অনেক বেশি!"
      />
    ),
  },
]

export default function UseMemoAndUseCallbackPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* ১. টপিক হিরো */}
      <TopicHero
        badge="পারফরম্যান্স • Level 5.2"
        title="useMemo ও useCallback: Fine-Grained Memoization"
        description={
          <>
            React অ্যাপে পারফরম্যান্স অপ্টিমাইজেশনের দুটি প্রধান অস্ত্র হলো{" "}
            <strong>useMemo</strong> এবং <strong>useCallback</strong>। তবে এগুলো অন্ধভাবে সব জায়গায়
            ব্যবহার না করে কখন ব্যবহার করবেন এবং কখন এড়িয়ে চলবেন — তা জানাই একজন সিনিয়র ইঞ্জিনিয়ারের পরিচয়।
          </>
        }
        formula={{
          label: "Memoization Rule",
          value: "useMemo = Cache Value | useCallback = Cache Function Reference",
        }}
      />

      {/* ২. তুলনা চিটশিট রুল টেবিল */}
      <RuleTable
        title="Direct Calculation বনাম useMemo বনাম useCallback চিটশিট:"
        colHeaders={["পদ্ধতি (Method)", "কী ক্যাশ করে?", "ব্যবহার কখন?", "ওভারহেড"]}
        rows={[
          {
            feature: "Direct Calculation",
            vanillaOrHtml: "কিছুই না (প্রতি রেন্ডারে রান)",
            reactEquivalent: "const total = price * qty",
            note: "শূন্য ওভারহেড। সাধারণ সব হিসাবে এটিই সেরা পছন্দ।",
          },
          {
            feature: "useMemo",
            vanillaOrHtml: "ক্যালকুলেশনের রিটার্ন ভ্যালু",
            reactEquivalent: "useMemo(() => compute(), [deps])",
            note: "হাজার হাজার ডেটা ফিল্টারিং বা জটিল ট্রান্সফরমেশনের জন্য।",
          },
          {
            feature: "useCallback",
            vanillaOrHtml: "ফাংশন মেমোরি রেফারেন্স",
            reactEquivalent: "useCallback(() => handleClick(), [deps])",
            note: "React.memo যুক্ত চাইল্ডে হ্যান্ডলার পাস করার জন্য।",
          },
        ]}
      />

      {/* ৩. ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার */}
      <ExamplePageShell
        title="ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার"
        description="নিচের ডেমোগুলোতে ক্লিক করে মেমোইজেশন ও রেফারেনশিয়াল আইডেন্টিটির ফলাফল যাচাই করুন।"
        items={showcaseItems}
      />

      {/* ৪. কুইজ */}
      <ConceptQuiz
        question="React-এ useCallback হুকটির প্রাথমিক উদ্দেশ্য কী?"
        hint="ফাংশন অবজেক্টের মেমোরি ঠিকানা (memory address) অপরিবর্তিত রাখা নিয়ে চিন্তা করুন।"
        options={[
          {
            text: "ফাংশনের রিটার্নকৃত ফলাফল মেমোরিতে ক্যাশ করা যাতে হিসাব দ্রুত হয়।",
            isCorrect: false,
            feedback: "এটি useMemo-এর কাজ, useCallback-এর কাজ নয়।",
          },
          {
            text: "ফাংশনের রেফারেনশিয়াল আইডেন্টিটি অপরিবর্তিত রাখা, যাতে মেমোইজড চাইল্ড কম্পোনেন্ট অপ্রয়োজনীয়ভাবে রি-রেন্ডার না হয়।",
            isCorrect: true,
            feedback: "চমৎকার! useCallback ফাংশন রেফারেন্স অপরিবর্তিত রেখে অপ্রয়োজনীয় চাইল্ড রেন্ডার ঠেকায়।",
          },
          {
            text: "ফাংশনের ভেতর অ্যাসিনক্রোনাস নেটওয়ার্ক কল স্বয়ংক্রিয়ভাবে হ্যান্ডেল করা।",
            isCorrect: false,
            feedback: "ভুল। অ্যাসিনক্রোনাস নেটওয়ার্ক কলের জন্য useEffect বা Server Actions ব্যবহার করা হয়।",
          },
        ]}
      />

      {/* ৫. পেজিনেশন ফুটার */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ৫.১ React Re-render Mechanics",
          href: "/05-performance-optimization/5.1-react-re-render-mechanics",
        }}
        next={{
          title: "পরবর্তী: ৫.৩ React.memo ও Lazy Loading",
          href: "/05-performance-optimization/5.3-react-memo-and-lazy-loading",
        }}
      />
    </div>
  )
}
