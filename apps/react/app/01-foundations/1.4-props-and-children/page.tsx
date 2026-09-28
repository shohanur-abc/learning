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

import PassingPropsAndDestructuring from "./passing-props-and-destructuring"
import PassingPropsAndDestructuringRaw from "./passing-props-and-destructuring.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import TheChildrenProp from "./the-children-prop"
import TheChildrenPropRaw from "./the-children-prop.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import PropsAreReadOnly from "./props-are-read-only"
import PropsAreReadOnlyRaw from "./props-are-read-only.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "passing-props-and-destructuring",
    filePath:
      "apps/react/app/01-foundations/1.4-props-and-children/passing-props-and-destructuring.tsx",
    title: "১. Props পাস করা, Destructuring ও Default Values",
    description:
      "প্যারেন্ট কম্পোনেন্ট থেকে চাইল্ডে স্ট্রিং, সংখ্যা ও বুলিয়ান প্রপস পাঠানো এবং অবজেক্ট ডিস্ট্রাকচারিংয়ের মাধ্যমে ডিফল্ট ভ্যালু নির্ধারণের বাস্তব উদাহরণ।",
    badge: "Props Basics",
    code: PassingPropsAndDestructuringRaw,
    preview: <PassingPropsAndDestructuring />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="Props কী?">
          Props (Properties-এর সংক্ষিপ্ত রূপ) হলো রিঅ্যাক্ট কম্পোনেন্টে ডেটা পাঠানোর প্রধান মাধ্যম।
          একটি সাধারণ JavaScript ফাংশনে যেমন আর্গুমেন্ট পাস করা হয়, JSX-এ কম্পোনেন্ট ডাকার সময়
          ঠিক তেমনি অ্যাট্রিবিউট হিসেবে প্রপস পাঠানো হয়:{" "}
          <code>&lt;StudentCard name=&quot;সাকিব&quot; rating=&#123;4.9&#125; /&gt;</code>।
        </ConceptAlert>

        <RuleTable
          title="Props ব্যবহারের সুবর্ণ নিয়মসমূহ"
          colHeaders={["বিষয় (Topic)", "ভুল বা সেকেলে পদ্ধতি", "সঠিক React পদ্ধতি", "নোট (Note)"]}
          rows={[
            {
              feature: "১. সংখ্যা পাস করা",
              vanillaOrHtml: 'rating="4.9" (String রূপ)',
              reactEquivalent: "rating={4.9}",
              note: "সংখ্যা, বুলিয়ান বা এক্সপ্রেশন পাস করতে সবসময় কার্লি ব্রেসেস {} দিতে হয়।",
            },
            {
              feature: "২. ডিফল্ট মান",
              vanillaOrHtml: 'const role = props.role || "Learner"',
              reactEquivalent: '({ role = "Learner" })',
              note: "ES6 Destructuring প্যারামিটারে সরাসরি ডিফল্ট মান অ্যাসাইন করা ক্লিন।",
            },
            {
              feature: "৩. ডেটার গতিপথ",
              vanillaOrHtml: "উভয়মুখী ডেটা বাইন্ডিং",
              reactEquivalent: "Unidirectional Flow",
              note: "ডেটা কেবল প্যারেন্ট থেকে নিচের দিকে চাইল্ডে প্রবাহিত হয়।",
            },
          ]}
        />
      </div>
    ),
  },
  {
    id: "the-children-prop",
    filePath:
      "apps/react/app/01-foundations/1.4-props-and-children/the-children-prop.tsx",
    title: "২. The `children` Prop (কম্পোনেন্ট র‍্যাপার ও স্লট)",
    description:
      "ওপেনিং ও ক্লোজিং ট্যাগের মাঝে যেকোনো কাস্টম JSX কন্টেন্ট পাস করে নমনীয় কন্টেইনার কম্পোনেন্ট তৈরি করা।",
    badge: "Wrapper Pattern",
    code: TheChildrenPropRaw,
    preview: <TheChildrenProp />,
    learningNotes: (
      <div className="space-y-4">
        <ComparisonGrid
          left={{
            title: "Rigid Props (অনমনীয় পদ্ধতি)",
            badge: "Inflexible",
            variant: "destructive",
            description: "প্রতিটি কন্টেন্টের জন্য আলাদা আলাদা প্রপ পাঠালে যা অসুবিধা হয়:",
            items: [
              "নতুন কোনো আইকন বা বাটন ঢোকাতে চাইলে বারবার নতুন প্রপস যোগ করতে হয়",
              "কম্পোনেন্টের প্রপস লিস্ট দীর্ঘ ও ফুলিয়ে ফাঁপিয়ে বড় হয়ে যায়",
              "প্যারেন্টের নিজস্ব কাস্টম লেআউট সাজানোর স্বাধীনতা নষ্ট হয়",
            ],
          }}
          right={{
            title: "Children Prop (নমনীয় র‍্যাপার)",
            badge: "Flexible",
            variant: "default",
            description: "children প্রপ ব্যবহারের সুবিধা:",
            items: [
              "ওপেনিং ও ক্লোজিং ট্যাগের মাঝে যেকোনো কাস্টম JSX সরাসরি পাস করা যায়",
              "কনটেইনার কম্পোনেন্ট কেবল ফ্রেম, প্যাডিং ও ব্যাকগ্রাউন্ডের দায়িত্ব নেয়",
              "কন্টেন্টের ভেতরের ডিজাইন বদলালেও কনটেইনার ফাইলে কোনো হাত দিতে হয় না",
            ],
          }}
        />

        <CommonPitfall
          title="props.children কে সরাসরি অ্যারে ভেবে পরিবর্তন করা"
          mistakeDescription="props.children.push(...) বা ইনডেক্স ধরে সরাসরি রূপান্তর করার চেষ্টা করা।"
          solutionDescription="children-কে অপরিবর্তিত রেখে নতুন উপাদানের সাথে সাজানো অথবা React.Children ইউটিলিটি ব্যবহার করা।"
          badCode={`function Box(props) {
  // ❌ ভুল: children কোনো সাধারণ মিউটেবল অ্যারে নয়
  props.children.push(<div>অতিরিক্ত</div>)
  return <div>{props.children}</div>
}`}
          goodCode={`function Box({ children }) {
  // ✅ সঠিক: children অপরিবর্তিত রেখে পাশে নতুন উপাদান যোগ করা
  return (
    <div>
      {children}
      <div>অতিরিক্ত</div>
    </div>
  )
}`}
          whyItFails="React-এ children একটি অপ্যাক ডেটা স্ট্রাকচার (Opaque Data Structure)। একটিমাত্র চাইল্ড থাকলে এটি অবজেক্ট, একাধিক থাকলে অ্যারে এবং কিছু না থাকলে undefined হয়। তাই সরাসরি অ্যারে মেথড চালালে রানটাইমে ক্র্যাশ হতে পারে।"
        />
      </div>
    ),
  },
  {
    id: "props-are-read-only",
    filePath:
      "apps/react/app/01-foundations/1.4-props-and-children/props-are-read-only.tsx",
    title: "৩. Props Immutability (Props সর্বদা অপরিবর্তনযোগ্য)",
    description:
      "React কম্পোনেন্ট পিউর ফাংশনের মতো আচরণ করে—নিজের প্রপস কখনো পরিবর্তন না করে নতুন ভেরিয়েবলে Derived Value হিসাব করার নিয়ম।",
    badge: "Read-Only",
    code: PropsAreReadOnlyRaw,
    preview: <PropsAreReadOnly />,
    learningNotes: (
      <div className="space-y-4">
        <CommonPitfall
          title="Props-এর মান সরাসরি পরিবর্তন (Re-assign) করা"
          mistakeDescription="চাইল্ড কম্পোনেন্টের ভেতর props.baseAmount = 100 এভাবে সরাসরি প্রপ পরিবর্তন করা।"
          solutionDescription="প্রপসকে অপরিবর্তিত রেখে নতুন লোকাল ভেরিয়েবলে Derived Value (হিসাবকৃত মান) তৈরি করা।"
          badCode={`function Invoice(props) {
  // ❌ মারাত্মক ভুল: প্রপসের মান কখনোই পরিবর্তন করা যায় না!
  props.baseAmount = props.baseAmount - 500
  return <div>{props.baseAmount}</div>
}`}
          goodCode={`function Invoice({ baseAmount }) {
  // ✅ সঠিক: নতুন লোকাল ভেরিয়েবলে হিসাব করা
  const finalTotal = baseAmount - 500
  return <div>{finalTotal}</div>
}`}
          whyItFails="React-এ Props হলো 'Strictly Read-Only'। React আশা করে কম্পোনেন্ট পিউর ফাংশন হবে (একই ইনপুটে একই আউটপুট)। প্রপস পরিবর্তন করলে প্যারেন্ট ও চাইল্ডের স্টেটের সিনক্রোনাইজেশন নষ্ট হয় এবং মারাত্মক মেমোরি বাগ তৈরি হয়।"
        />
      </div>
    ),
  },
]

/**
 * ১.৪ Props & Children
 */
export default function PropsAndChildrenPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* ১. টপিক হিরো ব্যানার */}
      <TopicHero
        badge="কোর কনসেপ্ট • Level 1.4"
        title="Props & Children (Top-Down Data Flow)"
        description={
          <>
            রিঅ্যাক্টে প্যারেন্ট কম্পোনেন্ট থেকে চাইল্ড কম্পোনেন্টে তথ্য পাঠানোর একমাত্র উপায় হলো{" "}
            <strong>Props</strong>। এছাড়া ওপেনিং ও ক্লোজিং ট্যাগের মাঝের কন্টেন্টকে কনটেইনারে পাস করার
            বিশেষ উপায় হলো <strong>children</strong> প্রপ।
          </>
        }
        formula={{
          label: "React Data Flow",
          value: "Props flow downwards (Parent ➔ Child). Props are Read-Only.",
        }}
      />

      {/* ২. ইন্টারেক্টিভ শোকেস আইটেমস ও কোড এক্সপ্লোরার */}
      <ExamplePageShell
        title="ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার"
        description="নিচের ডেমোগুলো পর্যবেক্ষণ করো এবং কোড স্ট্রাকচার দেখতে 'Code' ট্যাবে অথবা সোর্স ফাইলের লিঙ্কে ক্লিক করো।"
        items={showcaseItems}
      />

      {/* ৩. কুইজ: শিক্ষার্থী নিজের জ্ঞান যাচাই করতে পারবে */}
      <ConceptQuiz
        question="React-এ কোনো কম্পোনেন্টের Props (প্যারামিটার) সম্পর্কে নিচের কোন তথ্যটি সত্য?"
        hint="মনে রেখো: Pure Function-এর নীতি এবং একমুখী ডেটা প্রবাহ (Unidirectional Data Flow)।"
        options={[
          {
            text: "Props হলো সম্পূর্ণ Read-Only (Immutable); কোনো কম্পোনেন্ট তার নিজের প্রপসের মান সরাসরি পরিবর্তন করতে পারে না।",
            isCorrect: true,
            feedback: "অসাধারণ! রিঅ্যাক্টে প্রপস সম্পূর্ণ অপরিবর্তনযোগ্য। প্রপস পরিবর্তন করতে চাইলে প্যারেন্টের স্টেট আপডেট করতে হয়।",
          },
          {
            text: "চাইল্ড কম্পোনেন্ট চাইলে যেকোনো সময় তার প্যারেন্ট থেকে পাওয়া প্রপসে নতুন মান অ্যাসাইন করতে পারে।",
            isCorrect: false,
            feedback: "না, প্রপস পরিবর্তন করার চেষ্টা করলে রিঅ্যাক্টের একমুখী ডেটা প্রবাহ ভেঙে পড়বে এবং বাগ তৈরি হবে।",
          },
          {
            text: "Props দিয়ে কেবল স্ট্রিং পাস করা যায়; সংখ্যা, অ্যারে বা অবজেক্ট পাস করা যায় না।",
            isCorrect: false,
            feedback: "ভুল ধারণা। কার্লি ব্রেসেস {} ব্যবহার করে যেকোনো জাভাস্ক্রিপ্ট ডেটা টাইপ (number, object, array, function) প্রপস হিসেবে পাস করা যায়।",
          },
        ]}
      />

      {/* ৪. পেজিনেশন ফুটার: পূর্ববর্তী ও পরবর্তী টপিকের নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ১.৩ Components & Composition",
          href: "/01-foundations/1.3-components-and-composition",
        }}
        next={{
          title: "পরবর্তী: ২.১ Event Handling",
          href: "/02-interactivity-and-state/2.1-event-handling",
        }}
      />
    </div>
  )
}
