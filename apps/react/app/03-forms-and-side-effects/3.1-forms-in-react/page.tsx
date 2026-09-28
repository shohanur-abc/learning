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
import ControlledInputBasics from "./controlled-input-basics"
import ControlledInputBasicsRaw from "./controlled-input-basics.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import MultiFieldFormState from "./multi-field-form-state"
import MultiFieldFormStateRaw from "./multi-field-form-state.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import UncontrolledFormWithFormData from "./uncontrolled-form-with-formdata"
import UncontrolledFormWithFormDataRaw from "./uncontrolled-form-with-formdata.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ───────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "controlled-input-basics",
    filePath:
      "apps/react/app/03-forms-and-side-effects/3.1-forms-in-react/controlled-input-basics.tsx",
    title: "১. Controlled Input Basics ও লাইভ ভ্যালিডেশন",
    description:
      "React স্টেটকে তথ্যের একক উৎস (Single Source of Truth) হিসেবে ব্যবহার করে রিয়েল-টাইম ক্যারেক্টার কাউন্টার এবং ডায়নামিক ভ্যালিডেশন ফিডব্যাক তৈরি।",
    badge: "Controlled Basics",
    code: ControlledInputBasicsRaw,
    preview: <ControlledInputBasics />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="Single Source of Truth কী?">
          সাধারণ HTML-এ <code>&lt;input&gt;</code> এর মান ব্রাউজারের নিজস্ব DOM নোড
          ধারণ করে। কিন্তু React-এ <code>value=&#123;username&#125;</code> দিলে ইনপুটটি
          সম্পূর্ণরূপে React স্টেটের অনুগত হয়ে পড়ে। ব্যবহারকারী কিছু টাইপ করলে তা প্রথমে
          <code>onChange</code> ইভেন্টে যায়, স্টেট আপডেট করে, এবং সেই নতুন স্টেট পুনরায়
          ইনপুটে মান হিসেবে বসে। ফলে React স্টেটই হয়ে ওঠে তথ্যের একক ও চূড়ান্ত সত্য।
        </ConceptAlert>

        <ComparisonGrid
          left={{
            title: "Controlled Component",
            badge: "React-Driven",
            variant: "emerald",
            description: "স্টেট দিয়ে সম্পূর্ণ পরিচালিত ইনপুট",
            items: [
              "<code>value={state}</code> এবং <code>onChange</code> বাধ্যতামূলক",
              "প্রতিটি কীস্ট্রোকে তাৎক্ষণিক ভ্যালিডেশন সম্ভব",
              "শর্ত অনুযায়ী সাবমিট বাটন স্বয়ংক্রিয়ভাবে ডিসেবল রাখা যায়",
              "ইনপুট ফরম্যাটিং (যেমন: কেবল বড় হাতের অক্ষর) জোরপূর্বক প্রয়োগ করা যায়",
            ],
          }}
          right={{
            title: "Uncontrolled Component",
            badge: "DOM-Driven",
            variant: "default",
            description: "ব্রাউজারের ডিফল্ট আচরণ ভিত্তিক ইনপুট",
            items: [
              "<code>defaultValue</code> ব্যবহৃত হয়, কোনো স্টেট বাইন্ডিং থাকে না",
              "কেবল ফর্ম সাবমিটের সময় মান পড়া হয়",
              "প্রতি কীস্ট্রোকে কোনো রি-রেন্ডার হয় না",
              "বিশাল ও দীর্ঘ ফর্মের জন্য কোড খুব সংক্ষিপ্ত হয়",
            ],
          }}
        />
      </div>
    ),
  },
  {
    id: "multi-field-form-state",
    filePath:
      "apps/react/app/03-forms-and-side-effects/3.1-forms-in-react/multi-field-form-state.tsx",
    title: "২. Multi-Field Generic Form State",
    description:
      "একটিমাত্র অবজেক্ট স্টেট এবং কম্পিউটেড প্রোপার্টি নেম ([e.target.name]: value) ব্যবহার করে টেক্সট, ইমেইল, ড্রপডাউন ও চেকবক্স ফিল্ড পরিচালনা।",
    badge: "Generic Form Object",
    code: MultiFieldFormStateRaw,
    preview: <MultiFieldFormState />,
    learningNotes: (
      <div className="space-y-4">
        <RuleTable
          title="বিভিন্ন ধরনের ইনপুট হ্যান্ডল করার নিয়মাবলী"
          colHeaders={["ইনপুট টাইপ", "React Property", "হ্যান্ডলারে পড়ার নিয়ম", "নোট"]}
          rows={[
            {
              feature: "টেক্সট / ইমেইল / নাম্বার",
              vanillaOrHtml: 'value={state.field}',
              reactEquivalent: "e.target.value",
              note: "স্ট্রিং মান সরাসরি স্টেটে বসে।",
            },
            {
              feature: "চেকবক্স (Checkbox)",
              vanillaOrHtml: 'checked={state.agree}',
              reactEquivalent: "e.target.checked",
              note: "চেকবক্সে value নয়, checked বুলিয়ান প্রপ ব্যবহার করতে হয়।",
            },
            {
              feature: "সিলেক্ট ড্রপডাউন (Select)",
              vanillaOrHtml: 'value={state.role}',
              reactEquivalent: "e.target.value",
              note: "অপশনে selected না লিখে সিলেক্টে value দিতে হয়।",
            },
          ]}
        />

        <CommonPitfall
          title="Controlled ইনপুটের প্রাথমিক মান (initial state) undefined রাখা"
          mistakeDescription="ইনিশিয়াল স্টেট খালি রাখা বা undefined দিয়ে স্টেট শুরু করা।"
          solutionDescription="টেক্সট ইনপুটের ক্ষেত্রে সবসময় প্রাথমিক মান খালি স্ট্রিং ('') বা নির্দিষ্ট ডিফল্ট স্ট্রিং দিন।"
          badCode={`// ❌ মারাত্মক ভুল: initial state undefined
const [name, setName] = React.useState()
return <input value={name} onChange={e => setName(e.target.value)} />`}
          goodCode={`// ✅ সঠিক পদ্ধতি: স্পষ্ট প্রাথমিক মান প্রদান
const [name, setName] = React.useState("")
return <input value={name} onChange={e => setName(e.target.value)} />`}
          whyItFails="initial state undefined হলে React ধরে নেয় ইনপুটটি Uncontrolled। পরবর্তীতে যখনই ব্যবহারকারী টাইপ করে স্ট্রিং স্টেট আসে, React এটিকে Controlled-এ রূপান্তর করতে গিয়ে কনসোলে 'A component is changing an uncontrolled input to be controlled' ওয়ার্নিং দেখায়।"
        />
      </div>
    ),
  },
  {
    id: "uncontrolled-form-with-formdata",
    filePath:
      "apps/react/app/03-forms-and-side-effects/3.1-forms-in-react/uncontrolled-form-with-formdata.tsx",
    title: "৩. Uncontrolled Form ও Native FormData API",
    description:
      "প্রতি কীস্ট্রোকে রি-রেন্ডার না ঘটিয়ে ব্রাউজারের নেটিভ FormData API দিয়ে ক্লিন ও হালকাভাবে ফর্ম সাবমিশন প্রসেস করার উপায়।",
    badge: "Zero Re-renders",
    code: UncontrolledFormWithFormDataRaw,
    preview: <UncontrolledFormWithFormData />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="tip" title="কখন Uncontrolled Form ব্যবহার করবেন?">
          যদি আপনার ফর্মে কোনো লাইভ ভ্যালিডেশন, ডায়নামিক কন্ডিশনাল ফিল্ড বা কীস্ট্রোকের সাথে
          UI পরিবর্তনের প্রয়োজন না থাকে—তবে অহেতুক ডজনখানেক <code>useState</code> না নিয়ে
          ব্রাউজারের নেটিভ <code>FormData</code> ব্যবহার করা সবচেয়ে দ্রুত ও পরিষ্কার সমাধান।
          সাবমিটের পর <code>form.reset()</code> কল করলেই নেটিভভাবে সব ফিল্ড ফাঁকা হয়ে যায়।
        </ConceptAlert>
      </div>
    ),
  },
]

// ── ৩. মূল পেজ কম্পোনেন্ট ───────────────────────────────────────────────────
export default function FormsInReactPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="ফর্ম ও ভ্যালিডেশন • Level 3.1"
        title="Forms in React: Controlled বনাম Uncontrolled"
        description={
          <>
            HTML ফর্ম ইনপুটগুলোকে React স্টেটের নিয়ন্ত্রণে আনা। Controlled ইনপুটের মাধ্যমে
            Single Source of Truth নিশ্চিতকরণ, তাৎক্ষণিক ভ্যালিডেশন এবং মাল্টি-ফিল্ড ফর্ম হ্যান্ডলিং।
          </>
        }
        formula={{
          label: "Controlled Pattern",
          value: "value={state} + onChange={handleChange} (Single Source of Truth)",
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
        question="React-এ একটি চেকবক্স (Checkbox) ইনপুটকে Controlled কম্পোনেন্ট হিসেবে হ্যান্ডেল করার সঠিক পদ্ধতি কোনটি?"
        hint="সাধারণ টেক্সট ইনপুটের সাথে চেকবক্সের ভ্যালু প্রোপার্টির পার্থক্য মনে করো।"
        options={[
          {
            text: '<input type="checkbox" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} />',
            isCorrect: true,
            feedback: "🎉 অসাধারণ! চেকবক্সের স্টেট একটি বুলিয়ান (true/false) এবং তা e.target.checked থেকে পড়তে হয় ও checked প্রপে বাইন্ড করতে হয়।",
          },
          {
            text: '<input type="checkbox" value={isChecked} onChange={e => setIsChecked(e.target.value)} />',
            isCorrect: false,
            feedback: "❌ চেকবক্সে value বাইন্ড করলে তা কেবল স্ট্রিং পাঠায়, চেকবক্সের টিক চিহ্ন স্টেটের সাথে সিঙ্ক হয় না।",
          },
          {
            text: '<input type="checkbox" selected={isChecked} onChange={e => setIsChecked(e.target.selected)} />',
            isCorrect: false,
            feedback: "❌ HTML বা React ইনপুটে 'selected' প্রপ নেই; selected কেবল <option> ট্যাগে কাজ করে।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ২.৪ Lists & Keys (.map)",
          href: "/02-interactivity-and-state/2.4-lists-and-keys",
        }}
        next={{
          title: "পরবর্তী: ৩.২ useEffect Hook",
          href: "/03-forms-and-side-effects/3.2-use-effect-hook",
        }}
      />
    </div>
  )
}
