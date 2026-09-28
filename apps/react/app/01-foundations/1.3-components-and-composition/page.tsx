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

import FunctionalComponent from "./functional-component"
import FunctionalComponentRaw from "./functional-component.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import ComponentComposition from "./component-composition"
import ComponentCompositionRaw from "./component-composition.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import ComponentReusability from "./component-reusability"
import ComponentReusabilityRaw from "./component-reusability.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "functional-component",
    filePath:
      "apps/react/app/01-foundations/1.3-components-and-composition/functional-component.tsx",
    title: "১. React Functional Component এর ভিত্তি",
    description:
      "একটি সাধারণ জাভাস্ক্রিপ্ট ফাংশন যা রিটার্ন হিসেবে JSX প্রদান করে এবং স্বাধীনভাবে রেন্ডার হয়।",
    badge: "Core Concept",
    code: FunctionalComponentRaw,
    preview: <FunctionalComponent />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="কেন PascalCase (Capital Letter) বাধ্যতামূলক?">
          JSX-এ <code>&lt;userBadge /&gt;</code> এবং <code>&lt;UserBadge /&gt;</code> এর মাঝে
          কম্পাইলারের জন্য আকাশ-পাতাল তফাত রয়েছে! JSX যখন Babel বা SWC কম্পাইল করে:
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong>ছোট হাতের অক্ষর (lowercase):</strong> যেমন <code>&lt;div&gt;</code> বা{" "}
              <code>&lt;button&gt;</code> কে কম্পাইলার বিল্ট-ইন HTML স্ট্রিং হিসেবে{" "}
              <code>React.createElement(&apos;div&apos;)</code> এ রূপান্তর করে।
            </li>
            <li>
              <strong>বড় হাতের অক্ষর (PascalCase):</strong> যেমন{" "}
              <code>&lt;UserStatusBadge /&gt;</code> কে সরাসরি জাভাস্ক্রিপ্ট ফাংশন ভেরিয়েবল রেফারেন্স হিসেবে{" "}
              <code>React.createElement(UserStatusBadge)</code> এ রূপান্তর করে।
            </li>
          </ul>
        </ConceptAlert>

        <RuleTable
          title="Functional Component তৈরির ৩টি সুবর্ণ নিয়ম"
          colHeaders={["বিষয় (Rule)", "ভুল বা সাধারণ পদ্ধতি", "React নিয়ম", "ব্যাখ্যা (Why)"]}
          rows={[
            {
              feature: "১. নামকরণ (Naming)",
              vanillaOrHtml: "userProfileCard() বা <usercard />",
              reactEquivalent: "function UserProfileCard()",
              note: "অবশ্যই PascalCase (Capital letter) হতে হবে।",
            },
            {
              feature: "২. রিটার্ন মান (Return)",
              vanillaOrHtml: "HTML string বা DOM node",
              reactEquivalent: "return <JSX /> বা return null",
              note: "ফাংশনটি অবশ্যই বৈধ JSX অথবা null রিটার্ন করবে।",
            },
            {
              feature: "৩. পিউরিটি (Pure Function)",
              vanillaOrHtml: "বাইরের গ্লোবাল ভ্যারিয়েবল পরিবর্তন",
              reactEquivalent: "UI = f(props)",
              note: "একই ইনপুটের জন্য একই JSX তৈরি করা উচিত।",
            },
          ]}
        />
      </div>
    ),
  },
  {
    id: "component-composition",
    filePath:
      "apps/react/app/01-foundations/1.3-components-and-composition/component-composition.tsx",
    title: "২. Component Composition (লেগো ব্লকের মতো জোড়া লাগানো)",
    description:
      "Single Responsibility Principle মেনে ছোট ছোট স্পেশালাইজড কম্পোনেন্ট তৈরি করে সেগুলো দিয়ে বড় ইন্টারফেস গঠন করা।",
    badge: "Architecture",
    code: ComponentCompositionRaw,
    preview: <ComponentComposition />,
    learningNotes: (
      <div className="space-y-4">
        <ComparisonGrid
          left={{
            title: "Monolithic Component (এক ফাইলে সব)",
            badge: "Anti-Pattern",
            variant: "destructive",
            description: "একটি বিশাল কম্পোনেন্টে পুরো পেজের সব কোড লিখলে যা ঘটে:",
            items: [
              "কোড পড়া এবং পরিবর্তন করা অত্যন্ত কঠিন হয়ে পড়ে",
              "একটি ছোট বাগ ফিক্স করতে পুরো ফাইল ঘেঁটে দেখতে হয়",
              "কোনো অংশ অন্য কোথাও রিইউজ বা আলাদা টেস্ট করা যায় না",
              "টিমমেটদের সাথে মার্জ কনফ্লিক্ট তৈরি হওয়ার ঝুঁকি বাড়ে",
            ],
          }}
          right={{
            title: "Composed Components (ছোট ছোট মডুলার ব্লক)",
            badge: "Clean Architecture",
            variant: "default",
            description: "ছোট কম্পোনেন্ট আলাদা করে কম্পোজ করলে যা লাভ হয়:",
            items: [
              "প্রতিটি কম্পোনেন্ট কেবল ১টি সুনির্দিষ্ট কাজ করে (Single Responsibility)",
              "যেকোনো বাগ মুহূর্তের মধ্যে খুঁজে বের করা ও সমাধান করা যায়",
              "ছোট অংশগুলোকে অ্যাপের অন্যান্য যেকোনো জায়গায় রিইউজ করা যায়",
              "কোডবেস বড় হলেও প্রতিটি ফাইল থাকে পরিচ্ছন্ন ও ফোকাসড",
            ],
          }}
        />

        <CommonPitfall
          title="একটি কম্পোনেন্টের ভেতরে আরেকটি কম্পোনেন্ট ডিক্লেয়ার করা"
          mistakeDescription="একটি প্যারেন্ট ফাংশন কম্পোনেন্টের বডির ভেতরে চাইল্ড কম্পোনেন্ট ফাংশন ডিফাইন করা।"
          solutionDescription="সব কম্পোনেন্ট সবসময় ফাইলের টপ-লেভেলে আলাদা আলাদা ফাংশন হিসেবে ডিক্লেয়ার করা।"
          badCode={`function ParentCard() {
  // ❌ ভুল: প্রতিবার ParentCard রেন্ডার হলে নতুন ChildComponent তৈরি হবে!
  function ChildAvatar() {
    return <img src="/user.jpg" alt="User" />
  }

  return <div><ChildAvatar /></div>
}`}
          goodCode={`// ✅ সঠিক: সব কম্পোনেন্ট টপ-লেভেলে আলাদা ফাংশন থাকবে
function ChildAvatar() {
  return <img src="/user.jpg" alt="User" />
}

function ParentCard() {
  return <div><ChildAvatar /></div>
}`}
          whyItFails="প্যারেন্ট কম্পোনেন্টের ভেতরে চাইল্ড কম্পোনেন্ট ডিফাইন করলে, প্যারেন্টের প্রতি রেন্ডারে চাইল্ড কম্পোনেন্টের সম্পূর্ণ নতুন রেফারেন্স তৈরি হয়। React একে ভিন্ন টাইপ মনে করে পুরনো সাব-ট্রি ডিলিট করে নতুন করে মাউন্ট করে। ফলে স্টেট হারিয়ে যায়, ইনপুটের ফোকাস বারবার চলে যায় এবং পারফরম্যান্স মারাত্মক ক্ষতিগ্রস্ত হয়।"
        />
      </div>
    ),
  },
  {
    id: "component-reusability",
    filePath:
      "apps/react/app/01-foundations/1.3-components-and-composition/component-reusability.tsx",
    title: "৩. Reusability (পুনর্ব্যবহারযোগ্যতা ও DRY নীতি)",
    description:
      "একটি কম্পোনেন্ট একবার তৈরি করে পুরো অ্যাপ্লিকেশনে ভিন্ন ভিন্ন উপাত্ত দিয়ে বারবার ব্যবহারের বাস্তব রূপ।",
    badge: "DRY Principle",
    code: ComponentReusabilityRaw,
    preview: <ComponentReusability />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="tip" title="DRY (Don't Repeat Yourself) নীতি:">
          যদি দেখো তোমার অ্যাপে একই রকম কার্ড, ব্যাজ বা বাটন ৩ বার বা তার বেশি ব্যবহার হচ্ছে, সাথে
          সাথে সেটিকে একটি স্বাধীন কম্পোনেন্টে রূপান্তর করো। এতে ভবিষ্যতে ডিজাইনে কোনো পরিবর্তন
          আনতে হলে কেবল একটি ফাইলে পরিবর্তন করলেই পুরো অ্যাপ্লিকেশন স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে।
        </ConceptAlert>
      </div>
    ),
  },
]

/**
 * ১.৩ Components & Composition
 */
export default function ComponentsAndCompositionPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* ১. টপিক হিরো ব্যানার */}
      <TopicHero
        badge="কোর আর্কিটেকচার • Level 1.3"
        title="Components & Component Composition"
        description={
          <>
            রিঅ্যাক্ট অ্যাপ্লিকেশনের মূল ভিত্তি হলো <strong>Components</strong>। কম্পোনেন্ট হলো
            লেগো ব্লকের (Lego blocks) মতো—ছোট ছোট স্বাধীন ও পুনর্ব্যবহারযোগ্য টুকরো দিয়ে বড় এবং জটিল
            ইন্টারফেস তৈরি করার পদ্ধতিকে বলা হয় <strong>Composition</strong>।
          </>
        }
        formula={{
          label: "কম্পোজিশনের মূলনীতি",
          value: "Complex UI = Small, Focused, Reusable Components",
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
        question="React-এ কাস্টম কম্পোনেন্টের নাম সবসময় Capital Letter (PascalCase, যেমন: <UserProfile />) দিয়ে শুরু করা কেন বাধ্যতামূলক?"
        hint="মনে রেখো: Babel/SWC কীভাবে সাধারণ HTML ট্যাগ এবং React Component-কে আলাদা করে চেনে।"
        options={[
          {
            text: "Babel বা SWC কম্পাইলার ছোট হাতের নাম দেখলে সেটিকে সাধারণ ব্রাউজার HTML ট্যাগ মনে করে, কিন্তু ক্যাপিটাল লেটার দেখলে কাস্টম React Component ফাংশন হিসেবে প্রসেস করে।",
            isCorrect: true,
            feedback: "একদম সঠিক! <profileCard /> দিলে React সেটিকে ব্রাউজারের অজানা HTML ট্যাগ মনে করবে, কিন্তু <ProfileCard /> দিলে ফাংশনটিকে এক্সিকিউট করবে।",
          },
          {
            text: "ছোট হাতের নাম দিলে জাভাস্ক্রিপ্ট ফাংশন থেকে কোনো কিছু return করা যায় না।",
            isCorrect: false,
            feedback: "না, জাভাস্ক্রিপ্টে সব নামের ফাংশন থেকেই return করা যায়। এটি কেবল React JSX-এর ক্যাপিটালাইজেশন কনভেনশন।",
          },
          {
            text: "ক্যাপিটাল লেটার না দিলে Tailwind CSS-এর কোনো ক্লাস কাজ করে না।",
            isCorrect: false,
            feedback: "Tailwind CSS ক্লাসের সাথে কম্পোনেন্টের নামের ক্যাপিটালাইজেশনের কোনো সম্পর্ক নেই।",
          },
        ]}
      />

      {/* ৪. পেজিনেশন ফুটার: পূর্ববর্তী ও পরবর্তী টপিকের নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ১.২ JSX Rules & Expressions",
          href: "/01-foundations/1.2-jsx-rules-and-expressions",
        }}
        next={{
          title: "পরবর্তী: ১.৪ Props & Children",
          href: "/01-foundations/1.4-props-and-children",
        }}
      />
    </div>
  )
}
