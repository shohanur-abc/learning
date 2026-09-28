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

// ── ১. বিশুদ্ধ উদাহরণ ও র-ইমপোর্ট ───────────────────────────────────────────
import ClientComponentBoundary from "./client-component-boundary"
import ClientComponentBoundaryRaw from "./client-component-boundary.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import ServerComponentPattern from "./server-component-pattern"
import ServerComponentPatternRaw from "./server-component-pattern.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import InterleavingComposition from "./interleaving-composition"
import InterleavingCompositionRaw from "./interleaving-composition.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ───────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "client-component-boundary",
    filePath:
      "apps/react/app/06-modern-react-19-and-nextjs/6.1-server-vs-client-components/client-component-boundary.tsx",
    title: "১. Client Component Boundary ('use client')",
    description:
      "ইভেন্ট লিসেনার (onClick), স্টেট হুক (useState) এবং ব্রাউজার ইন্টার‍্যাক্টিভিটির জন্য 'use client' ডিরেক্টিভ ব্যবহারের বিশুদ্ধ উদাহরণ।",
    badge: "'use client'",
    code: ClientComponentBoundaryRaw,
    preview: <ClientComponentBoundary />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="বাউন্ডারির গুরুত্ব (Behind the Scenes):">
          Next.js App Router-এ <code>&apos;use client&apos;</code> কোনো কম্পোনেন্টকে সার্ভারে চলা থেকে আটকে দেয় না—বরং এটি একটি <strong>বাউন্ডারি</strong> তৈরি করে। এর নিচের সমস্ত কোড ব্রাউজারে রান করার জন্য ক্লায়েন্ট বান্ডেলে অন্তর্ভুক্ত হয় এবং সার্ভারে প্রথমবার প্রি-রেন্ডার হওয়ার পর ব্রাউজারে হাইড্রেট (hydrate) হয়।
        </ConceptAlert>

        <ComparisonGrid
          left={{
            title: "Client Components ('use client')",
            badge: "Interactive",
            variant: "primary",
            description: "কখন ক্লায়েন্ট কম্পোনেন্ট ব্যবহার করবেন:",
            items: [
              "ইভেন্ট হ্যান্ডলার যেমন <code>onClick</code>, <code>onChange</code>",
              "React স্টেট এবং ইফেক্ট হুক যেমন <code>useState</code>, <code>useEffect</code>",
              "ব্রাউজার স্পেসিফিক API যেমন <code>localStorage</code>, <code>navigator</code>, <code>window</code>",
              "কাস্টম অ্যানিমেশন বা ইন্টারঅ্যাক্টিভ উইজেট",
            ],
          }}
          right={{
            title: "Server Components (Default RSC)",
            badge: "Zero Bundle",
            variant: "emerald",
            description: "কখন সার্ভার কম্পোনেন্ট ব্যবহার করবেন:",
            items: [
              "ডাটাবেস বা ব্যাকএন্ড API থেকে সরাসরি ডেটা ফেচিং",
              "সিক্রেট কী বা এনভায়রনমেন্ট ভ্যারিয়েবল সুরক্ষিত রাখা",
              "ভারী ডিপেন্ডেন্সি (যেমন markdown parser) ব্রাউজারে না পাঠিয়ে 0-bundle রাখা",
              "প্রাথমিক পেজ লোড ও এসইও (SEO) অপ্টিমাইজেশন",
            ],
          }}
        />
      </div>
    ),
  },
  {
    id: "server-component-pattern",
    filePath:
      "apps/react/app/06-modern-react-19-and-nextjs/6.1-server-vs-client-components/server-component-pattern.tsx",
    title: "২. Server Component Pattern (RSC Architecture)",
    description:
      "ক্লায়েন্ট বান্ডেল সাইজ শূন্য রাখা, স্টেটলেস পিউর প্রেজেন্টেশন এবং সিকিউর সার্ভার ডাটা প্রসেসিংয়ের মডেল।",
    badge: "RSC Default",
    code: ServerComponentPatternRaw,
    preview: <ServerComponentPattern />,
    learningNotes: (
      <RuleTable
        title="Server বনাম Client Components সক্ষমতার তুলনামূলক ম্যাট্রিক্স:"
        rows={[
          {
            feature: "ডাটাবেস ও ব্যাকএন্ড রিসোর্স অ্যাক্সেস",
            vanillaOrHtml: "Server: সরাসরি অ্যাক্সেসযোগ্য (Direct SQL/ORM)",
            reactEquivalent: "Client: নিষিদ্ধ (API Route প্রয়োজন)",
            note: "সার্ভারে ক্রেডেনশিয়াল ব্রাউজারে ফাঁস হওয়ার কোনো ঝুঁকি থাকে না।",
          },
          {
            feature: "ক্লায়েন্ট বান্ডেল সাইজ",
            vanillaOrHtml: "Server: ০ কিলোবাইট (0 KB JS Bundle)",
            reactEquivalent: "Client: কোডের আকার অনুযায়ী বান্ডেল বাড়ে",
            note: "RSC ব্রাউজারে শুধুমাত্র JSON ও HTML পাঠিয়ে বান্ডেল হালকা রাখে।",
          },
          {
            feature: "ইন্টারঅ্যাক্টিভ ইভেন্ট লিসেনার",
            vanillaOrHtml: "Server: ব্যবহার করা যায় না (No DOM events)",
            reactEquivalent: "Client: সমর্থিত (onClick, onKeyDown, etc.)",
            note: "ইভেন্ট লিসেনারের জন্য বাধ্যতামূলকভাবে 'use client' লাগবে।",
          },
          {
            feature: "React State ও Lifecycle Hooks",
            vanillaOrHtml: "Server: অসমর্থিত (useState, useEffect নিষিদ্ধ)",
            reactEquivalent: "Client: পূর্ণ সমর্থিত",
            note: "সার্ভারে লাইফসাইকেল কেবল একবারই ঘটে—রেন্ডার সমাপ্ত হলে শেষ।",
          },
          {
            feature: "ব্রাউজার API (localStorage/window)",
            vanillaOrHtml: "Server: পাওয়া যায় না (undefined)",
            reactEquivalent: "Client: useEffect-এর ভেতরে নিরাপদভাবে ব্যবহারযোগ্য",
            note: "সার্ভার এক্সিকিউশনের সময় কোনো window অবজেক্ট থাকে না।",
          },
        ]}
      />
    ),
  },
  {
    id: "interleaving-composition",
    filePath:
      "apps/react/app/06-modern-react-19-and-nextjs/6.1-server-vs-client-components/interleaving-composition.tsx",
    title: "৩. Interleaving Architecture: Children Prop প্যাটার্ন",
    description:
      "ক্লায়েন্ট কম্পোনেন্টে সার্ভার কম্পোনেন্ট ইম্পোর্ট না করে {children} প্রপসের মাধ্যমে কমপোজ করার আধুনিক আর্কিটেকচার।",
    badge: "Composition",
    code: InterleavingCompositionRaw,
    preview: <InterleavingComposition />,
    learningNotes: (
      <CommonPitfall
        title="Client Component-এর ভেতর Server Component সরাসরি ইম্পোর্ট করা"
        mistakeDescription="ক্লায়েন্ট ফাইলে সরাসরি সার্ভার কম্পোনেন্ট ইম্পোর্ট করলে তা ক্লায়েন্ট বান্ডেলে কনভার্ট হয়ে যায়:"
        badCode={`// ❌ ভুল পদ্ধতি: ClientComponent.tsx-এ সরাসরি ইম্পোর্ট
"use client"
import ServerDataView from "./ServerDataView" // ⚠️ এটিও ক্লায়েন্ট বান্ডেলে চলে যাবে!

export default function Modal() {
  return <div><ServerDataView /></div>
}`}
        solutionDescription="সার্ভার কম্পোনেন্টকে children হিসেবে পাস করে কমপোজ করা:"
        goodCode={`// ✅ সঠিক পদ্ধতি: Interleaving via children prop
"use client"
export default function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)
  return isOpen ? <div>{children}</div> : null
}

// 🌐 Server Parent-এ ব্যবহার:
// <Modal><ServerDataView /></Modal>`}
        whyItFails="যখন কোনো ফাইলে 'use client' থাকে, তার ইম্পোর্ট করা সমস্ত ফাইলকে বাউন্ডারির অংশ ধরে ক্লায়েন্ট বান্ডেলে রূপান্তর করা হয়। কিন্তু প্যারেন্ট সার্ভার কম্পোনেন্ট থেকে চাইল্ড হিসেবে পাঠালে সার্ভার চাইল্ড আগে রেন্ডার হয় এবং ক্লায়েন্ট বান্ডেল সম্পূর্ণ শূন্য থাকে।"
      />
    ),
  },
]

// ── ৩. মূল পেজ কম্পোনেন্ট ───────────────────────────────────────────────────
export default function ServerVsClientComponentsPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="নেক্সট ও আরএসসি • Level 6.1"
        title="Server Components (RSC) বনাম Client Components ('use client')"
        description={
          <>
            Next.js App Router-এ ডিফল্টভাবে সব কম্পোনেন্ট হলো{" "}
            <strong>React Server Components (RSC)</strong>। ব্রাউজারে ইন্টার‍্যাক্টিভিটি যোগ করতে চাইলে
            সুনির্দিষ্টভাবে <code>&apos;use client&apos;</code> বাউন্ডারি ডিক্লেয়ার করতে হয়। জানুন কখন কোন কম্পোনেন্ট ব্যবহার করবেন
            এবং কীভাবে দুটিকে চমৎকারভাবে ইন্টারলিভ করবেন।
          </>
        }
        formula={{
          label: "RSC Paradigm",
          value: "Server Component (Default, 0 Bundle JS) | Client Component (Interactive Boundary)",
        }}
      />

      {/* ইন্টারেক্টিভ শোকেস ও কোড এক্সপ্লোরার */}
      <ExamplePageShell
        title="ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার"
        description="নিচের ৩টি ডেমো পর্যবেক্ষণ করে আধুনিক Next.js এবং React Server Components-এর বাউন্ডারি ও কম্পোজিশন আর্কিটেকচার শিখুন।"
        items={showcaseItems}
      />

      {/* কনসেপ্ট যাচাই কুইজ */}
      <ConceptQuiz
        question="Next.js App Router-এ নিচের কোন পরিস্থিতিতে একটি কম্পোনেন্ট ফাইলে 'use client' ডিরেক্টিভ দেওয়া বাধ্যতামূলক?"
        hint="চিন্তা করুন: কোন ফিচারগুলোর জন্য ব্রাউজারের সক্রিয় জাভাস্ক্রিপ্ট রানটাইম প্রয়োজন?"
        options={[
          {
            text: "যখন কম্পোনেন্টে useState, useEffect বা onClick-এর মতো ইভেন্ট লিসেনার প্রয়োজন হয়।",
            isCorrect: true,
            feedback: "🎉 একদম সঠিক! ইভেন্ট হ্যান্ডলার ও রিঅ্যাক্ট স্টেট হুক ব্রাউজার রানটাইম ছাড়া চলতে পারে না, তাই 'use client' বাধ্যতামূলক।",
          },
          {
            text: "যেকোনো কার্ড বা বাটনে Tailwind CSS ক্লাস স্টাইলিং করার জন্য।",
            isCorrect: false,
            feedback: "❌ ভুল! Server Components-এ শতভাগ Tailwind CSS এবং ক্লাস স্টাইলিং সমর্থিত। স্টাইলিংয়ের জন্য 'use client' লাগে না।",
          },
          {
            text: "সার্ভার ডাটাবেস থেকে ডেটা ফেচ বা ব্যাকএন্ড কোড চালানোর জন্য।",
            isCorrect: false,
            feedback: "❌ ভুল! ডাটাবেস কোড সার্ভারেই সবচেয়ে নিরাপদ ও সরাসরি চলে—সেখানে 'use client' দিলে বরং নিরাপত্তা বিঘ্নিত হবে।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ৫.৩ React.memo & Lazy Loading",
          href: "/05-performance-optimization/5.3-react-memo-and-lazy-loading",
        }}
        next={{
          title: "পরবর্তী: ৬.২ React 19 New Hooks",
          href: "/06-modern-react-19-and-nextjs/6.2-react-19-new-hooks",
        }}
      />
    </div>
  )
}
