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
import DomNodeFocusAndScroll from "./dom-node-focus-and-scroll"
import DomNodeFocusAndScrollRaw from "./dom-node-focus-and-scroll.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import MutableRenderTracker from "./mutable-render-tracker"
import MutableRenderTrackerRaw from "./mutable-render-tracker.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import TimerHandlePersistence from "./timer-handle-persistence"
import TimerHandlePersistenceRaw from "./timer-handle-persistence.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ───────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "dom-node-focus-and-scroll",
    filePath:
      "apps/react/app/03-forms-and-side-effects/3.3-use-ref-and-dom-access/dom-node-focus-and-scroll.tsx",
    title: "১. DOM Node Access: ফোকাস, সিলেকশন ও স্ক্রল",
    description:
      "React-এর ডিক্লেয়ারেটিভ সীমানা পেরিয়ে সরাসরি ব্রাউজার DOM নোডে পৌঁছানোর জন্য `useRef`-এর ব্যবহার (focus, select, getBoundingClientRect, scrollTo)।",
    badge: "DOM Escape Hatch",
    code: DomNodeFocusAndScrollRaw,
    preview: <DomNodeFocusAndScroll />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="Escape Hatch হিসেবে useRef">
          React সবসময় ডিক্লেয়ারেটিভভাবে DOM নিয়ন্ত্রণ করতে পছন্দ করে। কিন্তু কিছু
          কাজের জন্য সরাসরি ব্রাউজারের নেটিভ DOM API ব্যবহার করা ছাড়া উপায় থাকে না—যেমন
          ইনপুট ফিল্ডে কার্সর ফোকাস দেওয়া, টেক্সট হাইলাইট করা, বা নির্দিষ্ট সেকশনে
          স্ক্রল করানো। এই প্রয়োজন মেটাতে <code>useRef</code> একটি <strong>Escape Hatch</strong>
          হিসেবে কাজ করে।
        </ConceptAlert>

        <RuleTable
          title="useState বনাম useRef তুলনামূলক ম্যাট্রিক্স"
          colHeaders={["বৈশিষ্ট্য", "useState", "useRef", "সিদ্ধান্ত গাইডলাইন"]}
          rows={[
            {
              feature: "মান পরিবর্তনে রি-রেন্ডার?",
              vanillaOrHtml: "হ্যাঁ (অবশ্যই UI রি-রেন্ডার হয়)",
              reactEquivalent: "না (কোনো রি-রেন্ডার ট্রিগার হয় না)",
              note: "স্ক্রিনে দেখাতে হলে state, গোপনে রাখতে হলে ref।",
            },
            {
              feature: "মান পরিবর্তনের নিয়ম",
              vanillaOrHtml: "Immutable (setState দিয়ে)",
              reactEquivalent: "Direct Mutable (ref.current = x)",
              note: "ref.current সরাসরি রিড ও রাইট করা যায়।",
            },
            {
              feature: "রেন্ডারের মাঝে অ্যাক্সেস",
              vanillaOrHtml: "রেন্ডারে সরাসরি পড়া নিরাপদ",
              reactEquivalent: "রেন্ডারে রাইট করা নিষিদ্ধ",
              note: "ref কেবল ইফেক্ট বা ইভেন্ট হ্যান্ডলারে পরিবর্তনযোগ্য।",
            },
          ]}
        />
      </div>
    ),
  },
  {
    id: "mutable-render-tracker",
    filePath:
      "apps/react/app/03-forms-and-side-effects/3.3-use-ref-and-dom-access/mutable-render-tracker.tsx",
    title: "২. Mutable Values: রেন্ডার কাউন্টার ও পূর্ববর্তী স্টেট",
    description:
      "UI রি-রেন্ডার না ঘটিয়ে কম্পোনেন্টের মোট রেন্ডার সংখ্যা গণনা এবং আগের স্টেটের মান (Previous State) মেমোরিতে ধরে রাখা।",
    badge: "Silent State Container",
    code: MutableRenderTrackerRaw,
    preview: <MutableRenderTracker />,
    learningNotes: (
      <div className="space-y-4">
        <ComparisonGrid
          left={{
            title: "useState-এ মান সংরক্ষণ",
            badge: "UI-Bound",
            variant: "default",
            description: "যখন মানের পরিবর্তনে স্ক্রিনের ছবি বদলে যাওয়া দরকার",
            items: [
              "ফর্মের টাইপ করা টেক্সট",
              "মোডাল খোলা বা বন্ধের অবস্থা",
              "এপিআই থেকে আসা ডেটা লিস্ট",
              "ব্যবহারকারীর সিলেক্ট করা ফিল্টার",
            ],
          }}
          right={{
            title: "useRef-এ মান সংরক্ষণ",
            badge: "Behind-the-Scenes",
            variant: "emerald",
            description: "যখন তথ্য কেবল লজিকের প্রয়োজনে দরকার, UI-তে সরাসরি নয়",
            items: [
              "টাইমার বা অ্যানিমেশন ফ্রেম আইডি",
              "মোট কতবার রেন্ডার হলো তা ট্র্যাকিং",
              "আগের রেন্ডারে স্টেটের মান কী ছিল",
              "কোনো রিকোয়েস্ট ইন-ফ্লাইট আছে কিনা সেই ফ্ল্যাগ",
            ],
          }}
        />

        <CommonPitfall
          title="JSX রেন্ডার চলাকালীন সরাসরি ref.current পরিবর্তন (Write) করা"
          mistakeDescription="কম্পোনেন্টের বডিতে রেন্ডার চলাকালে ref.current++ লিখে ফেলা।"
          solutionDescription="ref.current সবসময় useEffect-এর ভেতর অথবা ক্লিক/চেঞ্জ ইভেন্ট হ্যান্ডলারের ভেতরে পরিবর্তন করুন।"
          badCode={`// ❌ মারাত্মক ভুল: রেন্ডারের মাঝে মিউটেশন
function MyComponent() {
  const countRef = React.useRef(0)
  countRef.current += 1 // রেন্ডারের মাঝে পরিবর্তন নিষিদ্ধ!
  return <div>{countRef.current}</div>
}`}
          goodCode={`// ✅ সঠিক উপায়: useEffect-এর ভেতরে আপডেট
function MyComponent() {
  const countRef = React.useRef(0)
  React.useEffect(() => {
    countRef.current += 1 // রেন্ডার সম্পন্ন হওয়ার পর নিরাপদ
  })
  return <div>Render Tracker</div>
}`}
          whyItFails="React রেন্ডার ফাংশন সবসময় একটি Pure Function হওয়া উচিত। রেন্ডারের মাঝে ref পরিবর্তন করলে কনকারেন্ট রেন্ডারিং (Concurrent Rendering) এবং স্ট্রিক্ট মোডে অপ্রত্যাশিত বাগ ও অসামঞ্জস্য তৈরি হয়।"
        />
      </div>
    ),
  },
  {
    id: "timer-handle-persistence",
    filePath:
      "apps/react/app/03-forms-and-side-effects/3.3-use-ref-and-dom-access/timer-handle-persistence.tsx",
    title: "৩. Timer Handle Persistence (স্টপওয়াচ)",
    description:
      "`setInterval` আইডিকে `ref.current`-এ নিরাপদভাবে ধারণ করে প্রতি রেন্ডারে অক্ষুণ্ণ রাখা এবং পরবর্তীতে পরিষ্কারভাবে `clearInterval` করা।",
    badge: "Handle Persistence",
    code: TimerHandlePersistenceRaw,
    preview: <TimerHandlePersistence />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="tip" title="লোকাল ভ্যারিয়েবল কেন টাইমার আইডি ধরে রাখতে পারে না?">
          যদি আপনি একটি সাধারণ লোকাল ভ্যারিয়েবল নেন (যেমন: <code>let timerId;</code>),
          প্রতি সেকেন্ডে যখন স্টপওয়াচের সেকেন্ড আপডেট হয়ে কম্পোনেন্ট রি-রেন্ডার হবে,
          তখন সাথে সাথে ফাংশনটি নতুন করে শুরু হবে এবং <code>timerId</code> ভ্যারিয়েবলটি
          পুনরায় <code>undefined</code> হয়ে যাবে! ফলে পরবর্তীতে Pause বা Reset বাটনে চাপ দিলে
          আপনি আর কখনোই চলমান টাইমারটিকে বন্ধ করতে পারবেন না। <code>useRef</code> এই আইডিটিকে
          সকল রেন্ডারের সীমানা ছাড়িয়ে স্থায়ী মেমোরিতে বাঁচিয়ে রাখে।
        </ConceptAlert>
      </div>
    ),
  },
]

// ── ৩. মূল পেজ কম্পোনেন্ট ───────────────────────────────────────────────────
export default function UseRefAndDomAccessPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="DOM ও মেমোরি রেফারেন্স • Level 3.3"
        title="useRef & DOM Access"
        description={
          <>
            সরাসরি DOM নোড অ্যাক্সেস (Focus, Scroll, Measure) এবং রি-রেন্ডার ছাড়া মিউটেবল
            মান সংরক্ষণ। টাইমার আইডি, প্রিভিয়াস স্টেট এবং রেন্ডার কাউন্ট ট্র্যাকিংয়ের বাস্তব কৌশল।
          </>
        }
        formula={{
          label: "useRef Mental Model",
          value: "ref.current = value (Does NOT trigger re-render)",
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
        question="useState এবং useRef-এর মধ্যে সবচেয়ে মৌলিক পার্থক্য কোনটি?"
        hint="কোনটি মান পরিবর্তনের পর ব্রাউজারের UI নতুন করে আঁকতে রি-রেন্ডার ট্রিগার করে?"
        options={[
          {
            text: "useState-এর মান পরিবর্তন করলে কম্পোনেন্ট স্বয়ংক্রিয়ভাবে রি-রেন্ডার হয়, কিন্তু useRef-এর মান পরিবর্তনে কোনো রি-রেন্ডার ঘটে না।",
            isCorrect: true,
            feedback: "🎉 একেবারে সঠিক! useState স্ক্রিনে ভিজ্যুয়াল পরিবর্তন ঘটায়, আর useRef কেবল ব্যাকগ্রাউন্ড মেমোরিতে মান ধরে রাখে।",
          },
          {
            text: "useRef কেবল টেক্সট স্ট্রিং ধরে রাখতে পারে, আর useState যেকোনো ডেটা টাইপ নিতে পারে।",
            isCorrect: false,
            feedback: "❌ ভুল। useRef যেকোনো অবজেক্ট, সংখ্যা, ফাংশন বা DOM নোড ধরে রাখতে পারে।",
          },
          {
            text: "useRef ব্যবহারের ফলে অ্যাপ্লিকেশনের গতি কমে যায়।",
            isCorrect: false,
            feedback: "❌ বরং বিপরীত! useRef রি-রেন্ডার এড়িয়ে পারফরম্যান্স অপটিমাইজ করতে সহায়তা করে।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ৩.২ useEffect Hook",
          href: "/03-forms-and-side-effects/3.2-use-effect-hook",
        }}
        next={{
          title: "পরবর্তী: ৩.৪ Custom Hooks",
          href: "/03-forms-and-side-effects/3.4-custom-hooks",
        }}
      />
    </div>
  )
}
