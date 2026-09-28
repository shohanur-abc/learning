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

import ReactMemoComponent from "./react-memo-component"
import ReactMemoComponentRaw from "./react-memo-component.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import ReactMemoCustomCompare from "./react-memo-custom-compare"
import ReactMemoCustomCompareRaw from "./react-memo-custom-compare.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import LazyLoadingSuspense from "./lazy-loading-suspense"
import LazyLoadingSuspenseRaw from "./lazy-loading-suspense.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "react-memo-component",
    filePath:
      "apps/react/app/05-performance-optimization/5.3-react-memo-and-lazy-loading/react-memo-component.tsx",
    title: "১. React.memo: কম্পোনেন্ট মেমোইজেশন ও শ্যালো তুলনা",
    description:
      "React.memo দিয়ে কম্পোনেন্ট র‍্যাপ করে রাখা, যাতে প্রপস অপরিবর্তিত থাকলে প্যারেন্টের রেন্ডার হলেও চাইল্ড কম্পোনেন্ট অপ্রয়োজনীয় এক্সিকিউশন স্কিপ করে।",
    badge: "Component Memo",
    code: ReactMemoComponentRaw,
    preview: <ReactMemoComponent />,
    learningNotes: (
      <ConceptAlert type="info" title="React.memo ডিফল্টভাবে কীভাবে কাজ করে?">
        ডিফল্টভাবে <code>React.memo</code> শুধুমাত্র প্রপসের <strong>Shallow Comparison (Object.is)</strong> সম্পাদন করে। অর্থাৎ <code>prevProps.key === nextProps.key</code>। যদি কোনো প্রপসে প্রিমিটিভ ভ্যালু (যেমন number, string, boolean) পাঠানো হয়, তবে তা চমৎকার কাজ করে। তবে অবজেক্ট বা ফাংশন পাস করলে রেফারেনশিয়াল সমতা রক্ষায় সতর্ক থাকতে হয়।
      </ConceptAlert>
    ),
  },
  {
    id: "react-memo-custom-compare",
    filePath:
      "apps/react/app/05-performance-optimization/5.3-react-memo-and-lazy-loading/react-memo-custom-compare.tsx",
    title: "২. Custom Comparison: arePropsEqual ফাংশন",
    description:
      "প্রপস অবজেক্টের রেফারেন্স প্রতি রেন্ডারে পরিবর্তন হলেও শুধুমাত্র প্রয়োজনীয় বিজনেস ফিল্ড (যেমন id, title) অপরিবর্তিত থাকলে রেন্ডার স্কিপ করার কাস্টম নিয়ম তৈরি।",
    badge: "Custom Compare",
    code: ReactMemoCustomCompareRaw,
    preview: <ReactMemoCustomCompare />,
    learningNotes: (
      <ComparisonGrid
        left={{
          title: "ডিফল্ট Shallow Compare",
          badge: "Object.is",
          variant: "destructive",
          description: "প্রতিটি প্রপের মেমোরি পয়েন্টার হুবহু এক হতে হয়:",
          items: [
            "প্যারেন্টে নতুন অবজেক্ট তৈরি হলে (<code>{} !== {}</code>) মেমো ভেঙে যায়।",
            "টাইমস্ট্যাম্প বা মেটাডেটার সামান্য পরিবর্তনেও চাইল্ড রি-রেন্ডার হয়।",
            "ডিপ অবজেক্ট বা নেস্টেড প্রপসের ক্ষেত্রে অকার্যকর হতে পারে।",
          ],
        }}
        right={{
          title: "Custom arePropsEqual",
          badge: "Smart Check",
          variant: "emerald",
          description: "নির্দিষ্ট গুরুত্বপূর্ণ ফিল্ড তুলনা করে সিদ্ধান্ত নেওয়া হয়:",
          items: [
            "<code>arePropsEqual(prevProps, nextProps)</code> লজিক লেখা যায়।",
            "সত্য (<code>true</code>) রিটার্ন করলে রেন্ডার স্কিপ হয়।",
            "মিথ্যা (<code>false</code>) রিটার্ন করলে রি-রেন্ডার কার্যকর হয়।",
          ],
        }}
      />
    ),
  },
  {
    id: "lazy-loading-suspense",
    filePath:
      "apps/react/app/05-performance-optimization/5.3-react-memo-and-lazy-loading/lazy-loading-suspense.tsx",
    title: "৩. Dynamic Code-Splitting: React.lazy ও Suspense",
    description:
      "ভারী চার্ট বা মডিউলগুলোকে মূল বান্ডল থেকে আলাদা করে ডাইনামিক চাংকে লোড করা এবং লোডিং চলাকালীন Suspense ফলব্যাক স্কেলিটন দেখানো।",
    badge: "Code Splitting",
    code: LazyLoadingSuspenseRaw,
    preview: <LazyLoadingSuspense />,
    learningNotes: (
      <CommonPitfall
        title="React.memo কম্পোনেন্টে ইনলাইন অবজেক্ট বা ফাংশন পাস করা"
        mistakeDescription="প্রতি রেন্ডারে নতুন অবজেক্ট বা অ্যারো ফাংশন তৈরি করে পাঠানো:"
        badCode={`// ❌ প্রতি রেন্ডারে নতুন অবজেক্ট ও ফাংশন রেফারেন্স তৈরি হয়
<MemoizedCard 
  style={{ marginTop: 10 }} 
  onClick={() => handleClick()} 
/>`}
        solutionDescription="useCallback ও useMemo ব্যবহার করা অথবা ইনলাইন রেফারেন্স পরিহার করা:"
        goodCode={`// ✅ স্থির রেফারেন্স নিশ্চিত করা
const handleClick = useCallback(() => { ... }, []);
const cardStyle = useMemo(() => ({ marginTop: 10 }), []);

<MemoizedCard style={cardStyle} onClick={handleClick} />`}
        whyItFails="React.memo শ্যালো তুলনা করার সময় দেখে prevProps.style !== nextProps.style (কারণ জাভাস্ক্রিপ্টে প্রতিবার {} তৈরি হলে নতুন মেমোরি অ্যাড্রেস পায়)। ফলে React.memo সম্পূর্ণ ব্যর্থ হয় এবং প্রতিবার চাইল্ড রি-রেন্ডার হতে বাধ্য হয়।"
      />
    ),
  },
]

export default function ReactMemoAndLazyLoadingPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* ১. টপিক হিরো */}
      <TopicHero
        badge="পারফরম্যান্স • Level 5.3"
        title="React.memo ও Dynamic Lazy Loading (Suspense)"
        description={
          <>
            React অ্যাপ্লিকেশনের স্কেলেবিলিটির চূড়ান্ত ধাপে আমরা শিখব কীভাবে{" "}
            <strong>React.memo</strong> দিয়ে কম্পোনেন্ট রেন্ডার রি-ইউজ করা যায় এবং{" "}
            <strong>React.lazy ও Suspense</strong> দিয়ে জাভাস্ক্রিপ্ট বান্ডল সাইজ কমিয়ে ইনিশিয়াল
            লোড টাইমকে আলোর গতিতে রূপান্তর করা যায়।
          </>
        }
        formula={{
          label: "Performance Combo",
          value: "React.memo(Component) + React.lazy() + <Suspense />",
        }}
      />

      {/* ২. রুল টেবিল চিটশিট */}
      <RuleTable
        title="রিঅ্যাক্ট মেমোইজেশন ও কোড-স্প্লিটিং স্ট্র্যাটেজি চিটশিট:"
        colHeaders={["টেকনিক", "কী অপ্টিমাইজ করে?", "মূল মেকানিজম", "সতর্কতা"]}
        rows={[
          {
            feature: "React.memo",
            vanillaOrHtml: "কম্পোনেন্ট রি-রেন্ডার",
            reactEquivalent: "React.memo(Comp, [areEqual])",
            note: "ইনলাইন ফাংশন বা অবজেক্ট পাস করলে মেমো ভেঙে যায়।",
          },
          {
            feature: "useMemo",
            vanillaOrHtml: "জটিল হিসাবের মান",
            reactEquivalent: "useMemo(() => calc(), [deps])",
            note: "ছোট প্রিমিটিভে ব্যবহার করা অপচয়।",
          },
          {
            feature: "useCallback",
            vanillaOrHtml: "ফাংশন রেফারেন্স",
            reactEquivalent: "useCallback(() => fn(), [deps])",
            note: "শুধুমাত্র মেমোইজড চাইল্ডের জন্যই কার্যকর।",
          },
          {
            feature: "React.lazy",
            vanillaOrHtml: "বান্ডল সাইজ ও ডাউনলোড",
            reactEquivalent: "React.lazy(() => import())",
            note: "অবশ্যই Suspense বাউন্ডারির ভেতরে রেন্ডার করতে হবে।",
          },
        ]}
      />

      {/* ৩. ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার */}
      <ExamplePageShell
        title="ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার"
        description="নিচের ডেমোগুলোর সাথে ইন্টার‍্যাক্ট করে কম্পোনেন্ট মেমোইজেশন এবং ডাইনামিক কোড স্প্লিটিং পরখ করুন।"
        items={showcaseItems}
      />

      {/* ৪. কুইজ */}
      <ConceptQuiz
        question="React.memo ডিফল্টভাবে props-এর কোন ধরণের তুলনা (comparison) সম্পাদন করে?"
        hint="JavaScript-এর Object.is এবং শ্যালো সমতা নিয়ে চিন্তা করুন।"
        options={[
          {
            text: "Shallow comparison (Object.is) — অবজেক্ট বা অ্যার প্রপস নতুন রেফারেন্স হলে রি-রেন্ডার হয়ে যায়।",
            isCorrect: true,
            feedback: "একদম নির্ভুল! এটি প্রতিটি প্রপ কি-এর ক্ষেত্রে শ্যালো সমতা পরীক্ষা করে।",
          },
          {
            text: "Deep recursive equality comparison — অবজেক্টের প্রতিটি নেস্টেড লেভেলে গিয়ে মান তুলনা করে।",
            isCorrect: false,
            feedback: "ভুল। ডিপ কম্প্যারিজন অত্যন্ত ব্যয়বহুল হওয়ায় React ডিফল্টভাবে তা করে না।",
          },
          {
            text: "DOM diff comparison — ব্রাউজারের আসল DOM ট্যাগের তুলনা করে।",
            isCorrect: false,
            feedback: "ভুল। React.memo প্রপস তুলনা করে, আসল DOM নিয়ে এর কোনো কারবার নেই।",
          },
        ]}
      />

      {/* ৫. পেজিনেশন ফুটার */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ৫.২ useMemo ও useCallback",
          href: "/05-performance-optimization/5.2-use-memo-and-use-callback",
        }}
        next={{
          title: "পরবর্তী: ৬.১ Server বনাম Client Components",
          href: "/06-modern-react-19-and-nextjs/6.1-server-vs-client-components",
        }}
      />
    </div>
  )
}
