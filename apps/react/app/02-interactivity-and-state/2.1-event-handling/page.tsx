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
import InlineVsNamedHandlers from "./inline-vs-named-handlers"
import InlineVsNamedHandlersRaw from "./inline-vs-named-handlers.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import SyntheticEventObject from "./synthetic-event-object"
import SyntheticEventObjectRaw from "./synthetic-event-object.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import PreventDefaultAndPropagation from "./prevent-default-and-propagation"
import PreventDefaultAndPropagationRaw from "./prevent-default-and-propagation.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ───────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "inline-vs-named-handlers",
    filePath:
      "apps/react/app/02-interactivity-and-state/2.1-event-handling/inline-vs-named-handlers.tsx",
    title: "১. Inline বনাম Named Event Handlers এবং প্যারামিটার পাসিং",
    description:
      "ফাংশন রেফারেন্স বনাম এক্সিকিউশন কলিংয়ের পার্থক্য এবং অ্যারো ফাংশন ব্যবহার করে নিরাপদে আর্গুমেন্ট পাঠানোর সঠিক নিয়ম।",
    badge: "Syntax & Calling",
    code: InlineVsNamedHandlersRaw,
    preview: <InlineVsNamedHandlers />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="মূল সূত্র: Reference vs Execution">
          React-এ <code>onClick=&#123;handleClick&#125;</code> লেখার মানে হলো
          আমরা ব্রাউজারকে বলছি: <em>&ldquo;যখন ব্যবহারকারী ক্লিক করবে, তখন এই ফাংশনটি রান
            করো।&rdquo;</em> কিন্তু যদি <code>onClick=&#123;handleClick()&#125;</code> লেখা
          হয়, তবে বন্ধনী <code>()</code> থাকার কারণে কম্পোনেন্ট স্ক্রিনে রেন্ডার হওয়ার
          মুহূর্তেই ফাংশনটি এক্সিকিউট হয়ে যায়।
        </ConceptAlert>

        <ComparisonGrid
          left={{
            title: "ভুল পদ্ধতি: রেন্ডারেই কল করে ফেলা",
            badge: "Anti-Pattern",
            variant: "destructive",
            description: "কার্লি ব্রেসেসে প্যারামিটারসহ সরাসরি ফাংশন কল করা:",
            items: [
              "<code>onClick={handleClick(id)}</code> রেন্ডারের সময়ই রান হয়ে যায়।",
              "ফাংশনের ভেতর <code>setState</code> থাকলে ইনফিনিট রি-রেন্ডার ক্র্যাশ ঘটে।",
              "ব্যবহারকারীর আসল ক্লিকের সময় কোনো ফাংশন অবশিষ্ট থাকে না (যদি না তা কারিড হয়)।",
            ],
          }}
          right={{
            title: "সঠিক পদ্ধতি: অ্যারো ফাংশন কলব্যাক",
            badge: "Recommended",
            variant: "emerald",
            description: "প্যারামিটার পাঠাতে একটি নতুন বেনামী ফাংশনে র‍্যাপ করা:",
            items: [
              "<code>onClick={() => handleClick(id)}</code> নিরাপদ ও স্পষ্ট।",
              "ফাংশনটি কেবল তখনই সক্রিয় হয় যখন আসল ক্লিক ইভেন্ট ঘটে।",
              "ইভেন্ট অবজেক্ট দরকার হলে <code>(e) => handleClick(id, e)</code> লেখা যায়।",
            ],
          }}
        />
      </div>
    ),
  },
  {
    id: "synthetic-event-object",
    filePath:
      "apps/react/app/02-interactivity-and-state/2.1-event-handling/synthetic-event-object.tsx",
    title: "২. SyntheticEvent অবজেক্ট ও ক্রস-ব্রাউজার ইউনিফিকেশন",
    description:
      "React-এর সিন্থেটিক ইভেন্ট র‍্যাপার থেকে মাউস কোঅর্ডিনেট, ইভেন্ট টাইপ, কী-বোর্ড কোড ও target বনাম currentTarget মেটাডেটা অ্যাক্সেস করা।",
    badge: "SyntheticEvent",
    code: SyntheticEventObjectRaw,
    preview: <SyntheticEventObject />,
    learningNotes: (
      <RuleTable
        title="HTML Native Events বনাম React SyntheticEvent চিটশিট:"
        rows={[
          {
            feature: "ইভেন্ট অ্যাট্রিবিউট নাম",
            vanillaOrHtml: 'onclick="fn()", onkeydown="..."',
            reactEquivalent: "onClick={fn}, onKeyDown={fn}",
            note: "JSX-এ সর্বদা camelCase রূপ ব্যবহৃত হয়।",
          },
          {
            feature: "ডিফল্ট আচরণ বন্ধ",
            vanillaOrHtml: 'onclick="return false;"',
            reactEquivalent: "e.preventDefault() বাধ্যতামূলক",
            note: "React-এ false রিটার্ন করলে কোনো কাজ হয় না।",
          },
          {
            feature: "টার্গেট রেফারেন্স",
            vanillaOrHtml: "e.target (যেখানে ইভেন্ট শুরু)",
            reactEquivalent: "e.target বনাম e.currentTarget",
            note: "currentTarget সর্বদা হ্যান্ডলার লাগানো নোড নির্দেশ করে।",
          },
          {
            feature: "TypeScript টাইপিং",
            vanillaOrHtml: "MouseEvent / KeyboardEvent",
            reactEquivalent: "React.MouseEvent<T>, React.KeyboardEvent<T>",
            note: "জেনেরিক টাইপ দিলে target এলিমেন্টের প্রোপার্টিতে অটো-কমপ্লিশন পাওয়া যায়।",
          },
        ]}
      />
    ),
  },
  {
    id: "prevent-default-and-propagation",
    filePath:
      "apps/react/app/02-interactivity-and-state/2.1-event-handling/prevent-default-and-propagation.tsx",
    title: "৩. preventDefault() এবং stopPropagation() এর বাস্তব প্রয়োগ",
    description:
      "ফর্ম সাবমিশনের পেজ রিলোড বন্ধ করা এবং নেস্টেড এলিমেন্টের ইভেন্ট বাবলিং প্যারেন্টে পৌঁছানো থেকে প্রতিহত করা।",
    badge: "Event Flow",
    code: PreventDefaultAndPropagationRaw,
    preview: <PreventDefaultAndPropagation />,
    learningNotes: (
      <CommonPitfall
        title="ইভেন্ট হ্যান্ডলারে প্যারামিটার পাঠানোর ভুল পদ্ধতি"
        mistakeDescription="রেন্ডারের সময়ই আর্গুমেন্টসহ ফাংশন কল করে ফেলা:"
        solutionDescription="প্যারামিটার পাস করতে একটি অ্যারো ফাংশন দিয়ে কলব্যাক রেফারেন্স তৈরি করা:"
        badCode={`// ❌ ভুল: রেন্ডার হওয়ামাত্রই alertRun রান করবে এবং ইনফিনিট লুপ তৈরি করতে পারে
<button onClick={alertUser("সাকিব")}>
  ক্লিক করুন
</button>`}
        goodCode={`// ✅ সঠিক: একটি অ্যারো ফাংশনে কলব্যাক রেফারেন্স হিসেবে পাস করা
<button onClick={() => alertUser("সাকিব")}>
  ক্লিক করুন
</button>`}
        whyItFails="জাভাস্ক্রিপ্টে ফাংশন নামের পর প্রথম বন্ধনী () দিলে তা সাথে সাথে এক্সিকিউট হয়ে যায়। React যখন JSX এলিমেন্টগুলো তৈরি করে, তখন এই লাইনটি পেয়েই ফাংশনটি রান করিয়ে দেয়। তাই ক্লিকের অপেক্ষায় রাখার জন্য একটি অ্যারো ফাংশন তৈরি করে দিতে হয়।"
      />
    ),
  },
]

// ── ৩. মূল পেজ কম্পোনেন্ট ───────────────────────────────────────────────────
export default function EventHandlingPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="ইন্টারেক্টিভিটি • Level 2.1"
        title="Event Handling ও Synthetic Events"
        description={
          <>
            React অ্যাপ্লিকেশনে ব্যবহারকারীর ক্লিক, টাইপিং এবং ফর্ম সাবমিশনে
            সাড়া দেওয়ার ভিত্তি হলো <strong>ইভেন্ট হ্যান্ডলিং</strong>। ব্রাউজারের নেটিভ
            ইভেন্টগুলোর ভিন্নতা দূর করে React একটি সর্বজনীন{" "}
            <strong>SyntheticEvent</strong> সরবরাহ করে।
          </>
        }
        formula={{
          label: "Event Handler Golden Rule",
          value: "onClick={handleClick} (Function Reference, not Execution!)",
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
        question="React-এ একটি বাটনে প্যারামিটারসহ ইভেন্ট হ্যান্ডলার কল করতে নিচের কোন সিনট্যাক্সটি সঠিক ও নিরাপদ?"
        hint="ফাংশনটি যাতে রেন্ডারের সময় সাথে সাথে রান না হয়ে কেবল ক্লিকের সময় রান হয় তা নিশ্চিত করো।"
        options={[
          {
            text: "<button onClick={handleDelete(id)}>ডিলিট</button>",
            isCorrect: false,
            feedback: "❌ ভুল! এখানে বন্ধনী থাকার কারণে কম্পোনেন্ট রেন্ডার হওয়ার সময়ই ফাংশনটি রান হয়ে যাবে।",
          },
          {
            text: "<button onClick={() => handleDelete(id)}>ডিলিট</button>",
            isCorrect: true,
            feedback: "🎉 অসাধারণ! এটি একটি কলব্যাক রেফারেন্স পাস করে যা কেবল ব্যবহারকারী ক্লিক করলেই id সহ কার্যকর হবে।",
          },
          {
            text: '<button onClick="handleDelete(id)">ডিলিট</button>',
            isCorrect: false,
            feedback: "❌ ভুল! React-এ স্ট্রিং আকারে ইভেন্ট হ্যান্ডলার পাস করা যায় না; সর্বদা কার্লি ব্রেসেসে জাভাস্ক্রিপ্ট ফাংশন পাস করতে হয়।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ১.৪ Props & Children",
          href: "/01-foundations/1.4-props-and-children",
        }}
        next={{
          title: "পরবর্তী: ২.২ useState Deep Dive",
          href: "/02-interactivity-and-state/2.2-use-state-deep-dive",
        }}
      />
    </div>
  )
}
