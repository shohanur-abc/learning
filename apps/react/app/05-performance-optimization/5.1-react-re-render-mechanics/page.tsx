"use client"

import Link from "next/link"

import {
  ExamplePageShell,
  type ShowcaseItem,
} from "@workspace/ui/components/custom/example-page-shell"
import {
  TopicHero,
  ComparisonGrid,
  MentalModelSteps,
  CommonPitfall,
  ConceptAlert,
  ConceptQuiz,
  TopicPagination,
} from "@workspace/ui/components/custom/learning-components"

import StateTriggerRerender from "./state-trigger-rerender"
import StateTriggerRerenderRaw from "./state-trigger-rerender.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import ParentChildCascade from "./parent-child-cascade"
import ParentChildCascadeRaw from "./parent-child-cascade.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import ChildIsolationWithChildren from "./child-isolation-with-children"
import ChildIsolationWithChildrenRaw from "./child-isolation-with-children.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "state-trigger-rerender",
    filePath:
      "apps/react/app/05-performance-optimization/5.1-react-re-render-mechanics/state-trigger-rerender.tsx",
    title: "১. State Trigger ও ফাংশন রি-এক্সিকিউশন",
    description:
      "React-এ স্টেট পরিবর্তন হলে কীভাবে পুরো কম্পোনেন্ট ফাংশনটি আবার শুরু থেকে শেষ পর্যন্ত রান করে তার বাস্তব ডেমো।",
    badge: "Core Mechanic",
    code: StateTriggerRerenderRaw,
    preview: <StateTriggerRerender />,
    learningNotes: (
      <ConceptAlert type="info" title="Render Phase বনাম Commit Phase:">
        React-এ একটি কম্পোনেন্ট রি-রেন্ডার হওয়া মানে কিন্তু ব্রাউজারের আসল DOM সরাসরি পরিবর্তিত হওয়া নয়! রি-রেন্ডার চলাকালে React কম্পোনেন্ট ফাংশনটি রান করে নতুন Virtual DOM তৈরি করে এবং পূর্বের Virtual DOM-এর সাথে তুলনা (Diffing / Reconciliation) করে। শুধুমাত্র যদি সত্যিই কোনো পরিবর্তন ধরা পড়ে, কেবল তখনই আসল ব্রাউজার DOM আপডেট (Commit Phase) হয়।
      </ConceptAlert>
    ),
  },
  {
    id: "parent-child-cascade",
    filePath:
      "apps/react/app/05-performance-optimization/5.1-react-re-render-mechanics/parent-child-cascade.tsx",
    title: "২. Parent-Child Cascade: ডিফল্ট রেন্ডারিং বিহেভিয়ার",
    description:
      "প্যারেন্ট কম্পোনেন্টের স্টেট পরিবর্তন হলে ডিফল্টভাবে তার নিচের সমস্ত চাইল্ড কম্পোনেন্ট রি-রেন্ডার হয় — এমনকি চাইল্ডের কোনো প্রপস পরিবর্তন না হলেও।",
    badge: "Default Behavior",
    code: ParentChildCascadeRaw,
    preview: <ParentChildCascade />,
    learningNotes: (
      <ComparisonGrid
        left={{
          title: "ডিফল্ট রেন্ডার ক্যাসকেড (Normal React)",
          badge: "Default",
          variant: "destructive",
          description: "প্যারেন্ট রি-রেন্ডার হলে চাইল্ডের আচরণ:",
          items: [
            "প্যারেন্টের স্টেট বদলালে চাইল্ড স্বয়ংক্রিয়ভাবে পুনরায় এক্সিকিউট হয়।",
            "চাইল্ডের প্রপস অপরিবর্তিত থাকলেও ডিফল্টভাবে এই ক্যাসকেড ঘটে।",
            "হালকা কম্পোনেন্টের ক্ষেত্রে এটি অতি দ্রুত ঘটে এবং কোনো সমস্যা তৈরি করে না।",
            "কিন্তু ভারী কম্পোনেন্ট বা গভীর ট্রি হলে এটি পারফরম্যান্স ড্রপ ঘটাতে পারে।",
          ],
        }}
        right={{
          title: "অপ্টিমাইজড সমাধান (Isolated Cascade)",
          badge: "Optimized",
          variant: "emerald",
          description: "ক্যাসকেড থামানোর আধুনিক উপায়সমূহ:",
          items: [
            "<strong>Lifting Content Up:</strong> <code>children</code> প্রপ ব্যবহার করে সাব-ট্রি আইসোলেট করা।",
            "<strong>Moving State Down:</strong> স্টেটকে নিচের লিফ (leaf) নোডে নামিয়ে নেওয়া।",
            "<strong>React.memo:</strong> শুধুমাত্র যখন প্রপস বদলাবে তখন রি-রেন্ডার করার নির্দেশ দেওয়া।",
            "প্রয়োজন ছাড়া শুরুতেই আগাম মেমোইজেশন (Premature Optimization) পরিহার করা।",
          ],
        }}
      />
    ),
  },
  {
    id: "child-isolation-with-children",
    filePath:
      "apps/react/app/05-performance-optimization/5.1-react-re-render-mechanics/child-isolation-with-children.tsx",
    title: "৩. Architectural Optimization: Children প্রপ দিয়ে চাইল্ড আইসোলেশন",
    description:
      "React.memo ব্যবহার না করেই শুধুমাত্র কম্পোনেন্ট কম্পোজিশন ও 'children' প্রপের সাহায্যে প্যারেন্টের রেন্ডার থেকে চাইল্ডকে সম্পূর্ণ মুক্ত রাখা।",
    badge: "Architecture Fix",
    code: ChildIsolationWithChildrenRaw,
    preview: <ChildIsolationWithChildren />,
    learningNotes: (
      <CommonPitfall
        title="স্টেটকে অতিরিক্ত উপরে (Lift State Too High) নিয়ে যাওয়া"
        mistakeDescription="একটি সাধারণ ইনপুট বা স্ক্রল স্টেটকে পুরো পৃষ্ঠার প্যারেন্ট কম্পোনেন্টে রাখা:"
        badCode={`// ❌ পুরো পেজের প্যারেন্টে স্টেট রাখা
function LargeDashboard() {
  const [search, setSearch] = useState("") // প্রতিটি ক্লিকে পুরো ড্যাশবোর্ড রি-রেন্ডার হবে!
  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      <HeavyAnalyticsChart />
      <MassiveDataTable />
    </div>
  )
}`}
        solutionDescription="স্টেটকে নির্দিষ্ট সাব-কম্পোনেন্টে নামিয়ে নেওয়া অথবা children প্রপ ব্যবহার করা:"
        goodCode={`// ✅ স্টেটকে আইসোলেটেড কম্পোনেন্টে রাখা
function SearchBar() {
  const [search, setSearch] = useState("")
  return <input value={search} onChange={e => setSearch(e.target.value)} />
}

function LargeDashboard() {
  return (
    <div>
      <SearchBar /> {/* শুধু SearchBar রি-রেন্ডার হবে */}
      <HeavyAnalyticsChart /> {/* অক্ষত থাকবে */}
      <MassiveDataTable />
    </div>
  )
}`}
        whyItFails="React-এ স্টেট যেখানে থাকে, সেই পুরো কম্পোনেন্ট ফাংশন এবং তার নিচের সমস্ত চাইল্ড রি-রেন্ডার হয়। তাই স্টেটকে যতটা সম্ভব প্রয়োজন অনুযায়ী নিচের দিকে বা আলাদা কন্টেইনারে রাখলে বিনা খরচে সেরা পারফরম্যান্স পাওয়া যায়।"
      />
    ),
  },
]

export default function ReactReRenderMechanicsPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* ১. টপিক হিরো ব্যানার */}
      <TopicHero
        badge="পারফরম্যান্স • Level 5.1"
        title="React Re-render Mechanics ও Render Pipeline"
        description={
          <>
            React অ্যাপের গতি ও পারফরম্যান্স বোঝার মূল রহস্য হলো{" "}
            <strong>Re-render Mechanics</strong> বোঝা। কখন একটি কম্পোনেন্ট রি-রেন্ডার হয়,
            Virtual DOM Reconciliation কীভাবে কাজ করে, এবং কীভাবে অপ্রয়োজনীয় রি-রেন্ডার রোধ করা যায়
            — এই অধ্যায়ে আমরা তা গভীরভাবে জানব।
          </>
        }
        formula={{
          label: "React Render Pipeline",
          value: "Trigger → Render (Diffing) → Commit (DOM Update)",
        }}
      />

      {/* ২. রেন্ডার পাইপলাইনের মানসিক মডেল */}
      <MentalModelSteps
        title="React রেন্ডারিং পাইপলাইনের ৩টি প্রধান ধাপ:"
        steps={[
          {
            step: 1,
            title: "১. Trigger (ট্রিগার)",
            description:
              "ইউজার অ্যাকশনের কারণে useState-এর সেটার কল হওয়া বা প্রপস পরিবর্তনের মাধ্যমে রেন্ডার শিডিউল হয়।",
            badge: "State Change",
          },
          {
            step: 2,
            title: "২. Render (রেন্ডার ও ডিফে)",
            description:
              "React কম্পোনেন্ট ফাংশনটি রান করে নতুন JSX তৈরি করে এবং পূর্বের Virtual DOM-এর সাথে ডিফারেন্স তুলনা করে।",
            badge: "Virtual DOM",
          },
          {
            step: 3,
            title: "৩. Commit (কম্যিট ও পেইন্ট)",
            description:
              "শুধুমাত্র যে নোডগুলোতে সত্যিকারের পরিবর্তন পাওয়া গেছে, ব্রাউজারের আসল DOM-এ কেবল সেটুকু আপডেট হয়।",
            badge: "Real DOM",
          },
        ]}
      />

      {/* ৩. ইন্টারেক্টিভ শোকেস ডেমো ও কোড এক্সপ্লোরার */}
      <ExamplePageShell
        title="ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার"
        description="নিচের ৩টি ডেমোতে ক্লিক করে বাস্তব রেন্ডার ট্র্যাকিং এবং আইসোলেশন প্যাটার্ন প্রত্যক্ষ করুন।"
        items={showcaseItems}
      />

      {/* ৪. কুইজ */}
      <ConceptQuiz
        question="React-এ কোনো Parent কম্পোনেন্টের স্টেট পরিবর্তিত হলে তার Child কম্পোনেন্টগুলোর ডিফল্ট আচরণ কী?"
        hint="React কোনো বিশেষ মেমোইজেশন কনফিগারেশন ছাড়া সাব-ট্রিকে কীভাবে ট্রিট করে তা চিন্তা করুন।"
        options={[
          {
            text: "শুধুমাত্র যে Child-এর props পরিবর্তিত হয়েছে সেটি রি-রেন্ডার হয়।",
            isCorrect: false,
            feedback: "না, React ডিফল্টভাবে props চেক না করেই সমস্ত child কম্পোনেন্ট পুনরায় এক্সিকিউট করে।",
          },
          {
            text: "ডিফল্টভাবে সমস্ত Child কম্পোনেন্ট পুনরায় এক্সিকিউট (re-render) হয়, যদি না তাদের React.memo বা children স্লটিং দিয়ে অপ্টিমাইজ করা থাকে।",
            isCorrect: true,
            feedback: "একদম সঠিক! এটিই React-এর ডিফল্ট Parent-Child cascade নিয়ম।",
          },
          {
            text: "ব্রাউজারের আসল HTML DOM সাথে সাথে কোনো তুলনা ছাড়াই সম্পূর্ণ নতুন করে ড্র হয়।",
            isCorrect: false,
            feedback: "ভুল। আসল DOM সরাসরি ড্র হয় না, আগে Virtual DOM Diffing হয় এবং কেবল পরিবর্তিত অংশ DOM-এ যায়।",
          },
        ]}
      />

      {/* ৫. পেজিনেশন ফুটার */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ৪.৩ useReducer Hook",
          href: "/04-state-architecture/4.3-use-reducer-hook",
        }}
        next={{
          title: "পরবর্তী: ৫.২ useMemo ও useCallback",
          href: "/05-performance-optimization/5.2-use-memo-and-use-callback",
        }}
      />
    </div>
  )
}
