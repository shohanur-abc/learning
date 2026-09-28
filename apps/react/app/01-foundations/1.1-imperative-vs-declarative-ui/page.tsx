"use client"

import Link from "next/link"

import {
  ExamplePageShell,
  type ShowcaseItem,
} from "@workspace/ui/components/custom/example-page-shell"
import {
  TopicHero,
  ComparisonGrid,
  ConceptAlert,
  TopicPagination,
} from "@workspace/ui/components/custom/learning-components"

import VanillaDomExample from "./vanilla-dom-example"
import VanillaDomExampleRaw from "./vanilla-dom-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import ReactDeclarativeExample from "./react-declarative-example"
import ReactDeclarativeExampleRaw from "./react-declarative-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import SideBySideComparison from "./side-by-side-comparison"
import SideBySideComparisonRaw from "./side-by-side-comparison.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "vanilla-js-imperative",
    filePath: "apps/react/app/01-foundations/1.1-imperative-vs-declarative-ui/vanilla-dom-example.tsx",
    title: "১. Imperative পদ্ধতি (Vanilla JavaScript)",
    description:
      "ব্রাউজারকে ধাপে ধাপে নির্দেশ দেওয়া কীভাবে কাজ করতে হবে: querySelector, manual textContent mutation, Tailwind class toggling এবং manual event clean-up।",
    badge: "Imperative",
    code: VanillaDomExampleRaw,
    preview: <VanillaDomExample />,
    learningNotes: (
      <ConceptAlert type="warning" title="জটিলতা ও সম্ভাব্য সমস্যা:">
        এই সাধারণ কাউন্টারটি চালাতে আমাদের ৫টি <code>querySelector</code>, ৩টি <code>addEventListener</code>, ৩টি ম্যানুয়াল ক্লাস টগল, ২টি <code>disabled</code> স্টেট এবং ৩টি clean-up কল লিখতে হয়েছে। কোনো একটি আপডেট মিস হলেই স্টেট এবং DOM অমিল হয়ে UI Bug তৈরি হবে।
      </ConceptAlert>
    ),
  },
  {
    id: "react-declarative",
    filePath: "apps/react/app/01-foundations/1.1-imperative-vs-declarative-ui/react-declarative-example.tsx",
    title: "২. Declarative পদ্ধতি (React State Model)",
    description:
      "স্টেট অনুযায়ী UI কেমন দেখাবে তা ডিক্লেয়ার করা (UI = f(state))। React স্বয়ংক্রিয়ভাবে Virtual DOM diffing করে ব্রাউজার আপডেট করে।",
    badge: "Declarative",
    code: ReactDeclarativeExampleRaw,
    preview: <ReactDeclarativeExample />,
    learningNotes: (
      <ConceptAlert type="success" title="React-এর গ্যারান্টি:">
        আমরা সরাসরি কোনো DOM নোড ম্যানুয়ালি পরিবর্তন করিনি। <code>setCount</code> কল হওয়ামাত্র React কম্পোনেন্টটি রি-রান করে, Derived Value হিসাব করে এবং Virtual DOM Diffing-এর সাহায্যে শুধুমাত্র প্রয়োজনীয় অংশটুকু ব্রাউজারে আপডেট করে।
      </ConceptAlert>
    ),
  },
  {
    id: "side-by-side-comparison",
    filePath: "apps/react/app/01-foundations/1.1-imperative-vs-declarative-ui/side-by-side-comparison.tsx",
    title: "৩. রিয়েল-ওয়ার্ল্ড টেস্ট: নতুন রিকোয়ারমেন্ট যোগ করা",
    description:
      "ক্লায়েন্ট নতুন ফিচার (Progress bar, alert, reset button) চাইলে Vanilla JS-এর জটিলতা বনাম React-এর Derived State-এর সহজ সমাধান।",
    badge: "Stress Test",
    code: SideBySideComparisonRaw,
    preview: <SideBySideComparison />,
    learningNotes: (
      <ComparisonGrid
        left={{
          title: "Vanilla JS (Imperative)",
          badge: "Manual Churn",
          variant: "destructive",
          description: "নতুন ফিচারের জন্য নতুন নতুন ম্যানুয়াল DOM স্টেপ যোগ করতে হয়:",
          items: [
            "<code>querySelector</code> দিয়ে নতুন Progress Bar নোড খোঁজা।",
            "প্রতিটি হ্যান্ডলারে <code>bar.style.width</code> ম্যানুয়ালি হিসাব করে বসানো।",
            "শর্ত চেক করে ওয়ার্নিং টেক্সট আপডেট করা।",
            "একাধিক রিসেট বাটন থাকলে সব জায়গায় স্টেট সিঙ্ক ম্যানুয়ালি হ্যান্ডেল করা।",
            "<strong>ঝুঁকি:</strong> একটি জায়গায় আপডেট বাদ পড়লেই পার্মানেন্ট UI Bug তৈরি হয়।",
          ],
        }}
        right={{
          title: "React (Declarative)",
          badge: "Derived State",
          variant: "emerald",
          description: "নতুন ফিচারের জন্য শুধু বর্তমান স্টেট অনুযায়ী JSX ডিক্লেয়ার করতে হয়:",
          items: [
            "<code>progress = (count / MAX) * 100</code> সহজে ডিক্লেয়ার করা।",
            "সরাসরি <code>&lt;Progress value=... /&gt;</code>-এ মান পাস করা।",
            "সাধারণ JavaScript Ternary অপারেটর দিয়ে ওয়ার্নিং টেক্সট দেখানো।",
            "যেকোনো বাটন থেকে <code>setCount(0)</code> কল করলেই পুরো UI এক নিমেষে সিঙ্ক।",
            "<strong>নিশ্চয়তা:</strong> State এবং UI কখনোই আউট-অফ-সিঙ্ক হতে পারে না।",
          ],
        }}
      />
    ),
  },
]

export default function ImperativeVsDeclarativePage() {
  return (
    <div className="space-y-10 pb-16">
      {/* Reusable Topic Hero */}
      <TopicHero
        badge="কোর কনসেপ্ট • Level 1.1"
        title="Imperative বনাম Declarative UI"
        description={
          <>
            তুমি যদি আগে থেকেই JavaScript এবং Tailwind CSS জেনে থাকো, তবে React শেখার প্রথম ও সবচেয়ে গুরুত্বপূর্ণ মানসিক রূপান্তর (mental shift) হলো:{" "}
            <strong>Imperative চিন্তা</strong> (ব্রাউজারকে ধাপে ধাপে DOM পরিবর্তনের নির্দেশ দেওয়া) থেকে{" "}
            <strong>Declarative চিন্তায়</strong> (স্টেট অনুযায়ী UI কেমন দেখতে হবে তা ঘোষণা করা) যাওয়া।
          </>
        }
        formula={{
          label: "React-এর গোল্ডেন ফর্মুলা",
          value: "UI = f(state)",
        }}
      />

      {/* Reusable Mental Model Comparison Grid */}
      <ComparisonGrid
        left={{
          title: "Imperative (Vanilla JavaScript)",
          badge: "Vanilla JS",
          variant: "destructive",
          description: "মানসিক মডেল: তুমি একজন মাইক্রোম্যানেজিং ডিরেক্টর।",
          items: [
            "<code>document.querySelector</code> দিয়ে এলিমেন্ট খুঁজতে হয়।",
            "ম্যানুয়ালি টেক্সট বদলাতে হয়: <code>el.innerText = count</code>।",
            "ম্যানুয়ালি Tailwind ক্লাস টগল করতে হয়: <code>el.classList.add(...)</code>।",
            "<strong>প্রধান সমস্যা:</strong> অ্যাপ বড় হওয়ার সাথে সাথে স্টেট এবং DOM আউট-অফ-সিঙ্ক হয়ে স্প্যাগেটি কোড তৈরি করে।",
          ],
        }}
        right={{
          title: "Declarative (React)",
          badge: "React",
          variant: "emerald",
          description: "মানসিক মডেল: তুমি একজন আর্কিটেক্ট, যে স্টেটের দৃশ্য ডিক্লেয়ার করো।",
          items: [
            "ডেটার একক উৎস তৈরি করো: <code>const [count, setCount] = useState(0)</code>।",
            "JSX-এ বলে দাও <code>count = 0</code> হলে কী দেখাবে আর <code>5</code> হলে কী দেখাবে।",
            "স্টেট বদলালে React নিজে থেকে কম্পোনেন্ট রি-রান করে এবং Virtual DOM Diffing দিয়ে স্বয়ংক্রিয়ভাবে ব্রাউজার আপডেট করে।",
            "<strong>প্রধান সুপারপাওয়ার:</strong> UI এবং State কখনোই একে অপরের অমিল হতে পারে না।",
          ],
        }}
      />

      {/* Interactive Showcase Demos with Syntax-Highlighted Code Tabs & Learning Notes */}
      <ExamplePageShell
        title="ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার"
        description="নিচের ডেমোগুলোর সাথে ইন্টার‍্যাক্ট করো এবং কোডের গভীর ব্যাখ্যা দেখতে 'Code' ট্যাবে ক্লিক করো।"
        items={showcaseItems}
      />

      {/* Reusable Topic Pagination Footer */}
      <TopicPagination
        linkComponent={Link}
        next={{
          title: "পরবর্তী: ১.২ JSX Rules & Expressions",
          href: "/01-foundations/1.2-jsx-rules-and-expressions",
        }}
      />
    </div>
  )
}
