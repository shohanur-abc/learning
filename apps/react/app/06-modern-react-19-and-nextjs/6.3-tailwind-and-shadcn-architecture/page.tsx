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
import DesignTokensTheming from "./design-tokens-theming"
import DesignTokensThemingRaw from "./design-tokens-theming.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import CompoundComponentSlots from "./compound-component-slots"
import CompoundComponentSlotsRaw from "./compound-component-slots.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import AccessiblePrimitiveWrapper from "./accessible-primitive-wrapper"
import AccessiblePrimitiveWrapperRaw from "./accessible-primitive-wrapper.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ───────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "design-tokens-theming",
    filePath:
      "apps/react/app/06-modern-react-19-and-nextjs/6.3-tailwind-and-shadcn-architecture/design-tokens-theming.tsx",
    title: "১. Semantic Design Tokens & Theming",
    description:
      "হার্ডকোডেড রঙের পরিবর্তে OKLCH সিএসএস ভ্যারিয়েবলভিত্তিক সেমান্টিক টোকেন ব্যবহারের মাধ্যমে লাইট ও ডার্ক মোডের স্বয়ংক্রিয় অভিযোজন।",
    badge: "Design Tokens",
    code: DesignTokensThemingRaw,
    preview: <DesignTokensTheming />,
    learningNotes: (
      <div className="space-y-4">
        <ComparisonGrid
          left={{
            title: "হার্ডকোডেড কালার পদ্ধতি",
            badge: "Anti-Pattern",
            variant: "destructive",
            description: "প্রতিটি উপাদানে ম্যানুয়াল কালার ও dark ক্লাস:",
            items: [
              "<code>bg-white text-gray-900 dark:bg-zinc-900 dark:text-white</code>",
              "অ্যাপের থিম বদলাতে গেলে শত শত ফাইলে হাত দিতে হয়।",
              "কনট্রাস্ট রেশিও এবং এক্সেসিবিলিটি নিশ্চিত করা কঠিন।",
            ],
          }}
          right={{
            title: "সেমান্টিক ডিজাইন টোকেন",
            badge: "Recommended",
            variant: "emerald",
            description: "অর্থপূর্ণ বিমূর্ত টোকেন ব্যবহার করা:",
            items: [
              "<code>bg-background text-foreground border-border</code>",
              "রুট সিএসএস ভ্যারিয়েবলে একবার পরিবর্তন করলে পুরো অ্যাপ সিঙ্ক।",
              "ডার্ক মোডের জন্য কোনো অতিরিক্ত ক্লাস লিখতে হয় না।",
            ],
          }}
        />

        <RuleTable
          title="Shadcn কোর সেমান্টিক টোকেন ডিকশনারি:"
          rows={[
            {
              feature: "ক্যানভাস ব্যাকগ্রাউন্ড",
              vanillaOrHtml: "bg-background",
              reactEquivalent: "text-foreground",
              note: "পুরো অ্যাপ্লিকেশনের মূল ভিত্তি ও প্রধান টেক্সট রঙ।",
            },
            {
              feature: "কার্ড ও সারফেস",
              vanillaOrHtml: "bg-card",
              reactEquivalent: "text-card-foreground",
              note: "উত্তোলিত (elevated) কনটেইনার ও মডিউলের জন্য।",
            },
            {
              feature: "প্রাইমারি অ্যাকশন",
              vanillaOrHtml: "bg-primary",
              reactEquivalent: "text-primary-foreground",
              note: "প্রধান কল-টু-অ্যাকশন (CTA) বাটন ও গুরুত্বপূর্ণ হাইলাইট।",
            },
            {
              feature: "গৌণ ও সহায়ক টেক্সট",
              vanillaOrHtml: "bg-muted",
              reactEquivalent: "text-muted-foreground",
              note: "সহায়ক টেক্সট, টাইমস্ট্যাম্প ও নিষ্ক্রিয় ব্যাকগ্রাউন্ড।",
            },
          ]}
        />
      </div>
    ),
  },
  {
    id: "compound-component-slots",
    filePath:
      "apps/react/app/06-modern-react-19-and-nextjs/6.3-tailwind-and-shadcn-architecture/compound-component-slots.tsx",
    title: "২. Compound Components & data-slot Pattern",
    description:
      "প্রপ বিস্ফোরণ (prop explosion) রোধ করে CardHeader, CardTitle, CardContent এবং data-slot অ্যাট্রিবিউট দিয়ে কম্পোজেবল লেআউট তৈরির কৌশল।",
    badge: "data-slot",
    code: CompoundComponentSlotsRaw,
    preview: <CompoundComponentSlots />,
    learningNotes: (
      <ConceptAlert type="info" title="কম্পাউন্ড আর্কিটেকচারের সুবিধা:">
        চিরাচরিত মনোলিথিক কম্পোনেন্টে <code>&lt;Card title=&quot;...&quot; subtitle=&quot;...&quot; showHeader=&quot;...&quot; footerAction=&#123;...&#125; /&gt;</code>-এর মতো বিশালাকার প্রপস পাস করতে হতো। কম্পাউন্ড স্লট আর্কিটেকচারে প্রতিটি অংশ একটি স্বাধীন চাইল্ড—ফলে যেকোনো কাস্টম JSX সরাসরি স্লটের মাঝে বসানো যায় কোনো সীমাবদ্ধতা ছাড়া।
      </ConceptAlert>
    ),
  },
  {
    id: "accessible-primitive-wrapper",
    filePath:
      "apps/react/app/06-modern-react-19-and-nextjs/6.3-tailwind-and-shadcn-architecture/accessible-primitive-wrapper.tsx",
    title: "৩. Accessible Primitive Wrapper & cn() Utility",
    description:
      "clsx ও tailwind-merge সমন্বিত cn() ইউটিলিটির মাধ্যমে সিএসএস কনফ্লিক্ট ছাড়া স্টাইল মার্জিং এবং WAI-ARIA অ্যাক্সেসিবিলিটি নিশ্চিতকরণ।",
    badge: "cn() & ARIA",
    code: AccessiblePrimitiveWrapperRaw,
    preview: <AccessiblePrimitiveWrapper />,
    learningNotes: (
      <CommonPitfall
        title="সরাসরি স্ট্রিং কনক্যাটিনেশন দিয়ে ক্লাস মার্জ করার ভুল"
        mistakeDescription="ক্লাস স্ট্রিং যোগ করলে Tailwind-এর Specificity সমস্যার সৃষ্টি হয়:"
        badCode={`// ❌ ভুল পদ্ধতি: সাধারণ স্ট্রিং কনক্যাটিনেশন
function MyButton({ className, ...props }) {
  // যদি className="px-6" আসে, তবে CSS-এ "px-4" আগে থাকলে px-6 কাজ নাও করতে পারে!
  return <button className={"px-4 py-2 " + className} {...props} />
}`}
        solutionDescription="cn() ইউটিলিটি ব্যবহার করে স্বয়ংক্রিয়ভাবে ক্লাস ডি-ডুপ্লিকেট করা:"
        goodCode={`// ✅ সঠিক পদ্ধতি: cn() (clsx + tailwind-merge)
import { cn } from "@workspace/ui/lib/utils"

function MyButton({ className, ...props }) {
  // tailwind-merge বিরোধপূর্ণ px-4 কে সরিয়ে শুধুমাত্র px-6 রাখবে
  return <button className={cn("px-4 py-2", className)} {...props} />
}`}
        whyItFails="CSS ক্লাস স্পেসিফিসিটি ক্লাসের ক্রমানুসারের ওপর নির্ভর করে, HTML অ্যাট্রিবিউটে লেখার ক্রমের ওপর নয়। tailwind-merge ক্লাসগুলোর ক্যাটাগরি (যেমন padding-x) চিনে শেষ মানটিকে সঠিকভাবে প্রাধান্য দেয়।"
      />
    ),
  },
]

// ── ৩. মূল পেজ কম্পোনেন্ট ───────────────────────────────────────────────────
export default function TailwindAndShadcnArchitecturePage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="ডিজাইন সিস্টেম • Level 6.3"
        title="Tailwind CSS v4 & Shadcn Architecture: Scalable Design Systems"
        description={
          <>
            Shadcn UI কোনো চিরাচরিত কম্পোনেন্ট লাইব্রেরি নয়—এটি আপনার কোডবেইসে কপি-পেস্ট করা
            একটি উন্মুক্ত আর্কিটেকচারাল প্যাটার্ন। জানুন কীভাবে OKLCH ভ্যারিয়েবলভিত্তিক সেমান্টিক টোকেন,
            কম্পাউন্ড কম্পোনেন্ট স্লট এবং <code>cn()</code> ইউটিলিটি দিয়ে স্কেলেবল ও এক্সেসিবল ডিজাইন সিস্টেম গড়ে তোলা যায়।
          </>
        }
        formula={{
          label: "Modern UI Architecture",
          value: "CSS Variables (OKLCH) + Accessible Primitives + CVA / cn Utility",
        }}
      />

      {/* ইন্টারেক্টিভ শোকেস ও কোড এক্সপ্লোরার */}
      <ExamplePageShell
        title="ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার"
        description="নিচের ৩টি ডেমো প্র্যাকটিস করো এবং কোডের গভীর নিয়মাবলী বুঝতে 'Code' ট্যাবে বা ফাইলের লিঙ্কে ক্লিক করো।"
        items={showcaseItems}
      />

      {/* কনসেপ্ট যাচাই কুইজ */}
      <ConceptQuiz
        question="Shadcn কম্পোনেন্ট আর্কিটেকচারে সরাসরি হার্ডকোডেড রঙের বদলে সেমান্টিক টোকেন (যেমন bg-card, text-foreground) ব্যবহারের মূল সুবিধা কী?"
        hint="চিন্তা করুন: থিম পরিবর্তনের সময় কয়টি ফাইলে কোড পরিবর্তন করতে হয়?"
        options={[
          {
            text: "লাইট ও ডার্ক মোডে আলাদা কোনো কোড না লিখে স্বয়ংক্রিয়ভাবে থিম অনুযায়ী রং অভিযোজিত হয় এবং ডিজাইন সিস্টেমে সামঞ্জস্য বজায় থাকে।",
            isCorrect: true,
            feedback: "🎉 অসাধারণ! সেমান্টিক টোকেন সিএসএস ভ্যারিয়েবল দিয়ে চালিত হওয়ায় কেবল ভ্যারিয়েবলের ভ্যালু বদলালেই পুরো অ্যাপের থিমিং সিঙ্ক থাকে।",
          },
          {
            text: "এটি ব্রাউজারের মেমোরি খরচ শূন্য করে দেয় এবং অ্যাপের সাইজ অর্ধেক করে।",
            isCorrect: false,
            feedback: "❌ ভুল! ডিজাইন টোকেন মূলত কোড মেইনটেইনেবিলিটি এবং থিমিংয়ের জন্য, ব্রাউজার মেমোরির সাথে এর সরাসরি সম্পর্ক নেই।",
          },
          {
            text: "এটি React-এর রেন্ডারিং গতি দ্বিগুণ করে দেয়।",
            isCorrect: false,
            feedback: "❌ ভুল! সিএসএস ক্লাস রেন্ডারিং স্পিড দ্বিগুণ করে না, এটি শুধুমাত্র স্টাইলিং ও থিমিং আর্কিটেকচার।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন (কারিকুলামের শেষ অধ্যায়) */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ৬.২ React 19 New Hooks",
          href: "/06-modern-react-19-and-nextjs/6.2-react-19-new-hooks",
        }}
        overviewHref="/"
        overviewLabel="🎉 কারিকুলাম সম্পন্ন: মূল পাতা"
      />
    </div>
  )
}
