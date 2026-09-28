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

import SingleRootAndFragments from "./single-root-and-fragments"
import SingleRootAndFragmentsRaw from "./single-root-and-fragments.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import JsxExpressionsAndAttributes from "./jsx-expressions-and-attributes"
import JsxExpressionsAndAttributesRaw from "./jsx-expressions-and-attributes.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import ValidVsInvalidExpressions from "./valid-vs-invalid-expressions"
import ValidVsInvalidExpressionsRaw from "./valid-vs-invalid-expressions.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "single-root-and-fragments",
    filePath:
      "apps/react/app/01-foundations/1.2-jsx-rules-and-expressions/single-root-and-fragments.tsx",
    title: "১. Single Root Element ও React Fragments (<>...</>)",
    description:
      "একটি কম্পোনেন্টে একাধিক এলিমেন্ট রিটার্ন করার জন্য কোনো বাড়তি <div> ছাড়া সরাসরি React Fragment (<>...</>) ব্যবহারের বাস্তব উদাহরণ।",
    badge: "Rule #1",
    code: SingleRootAndFragmentsRaw,
    preview: <SingleRootAndFragments />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="কেন এই নিয়ম? (Behind the Scenes):">
          JSX দেখতে HTML-এর মতো হলেও এটি আসলে জাভাস্ক্রিপ্ট ফাংশন কল: <code>React.createElement(...)</code>। জাভাস্ক্রিপ্টে একটি ফাংশন থেকে একসাথে কমা দিয়ে দুটি মান রিটার্ন করা যায় না (যেমন: <code>return a, b;</code> অবৈধ)। তাই একাধিক এলিমেন্টকে অবশ্যই একটি কমন প্যারেন্ট অথবা Fragment-এর ভেতরে রাখতে হয়।
        </ConceptAlert>

        <ComparisonGrid
          left={{
            title: "অতিরিক্ত <div> দিয়ে র‍্যাপ করা",
            badge: "DOM Bloat",
            variant: "destructive",
            description: "অনেকে অভ্যাসবশত সব জায়গায় <div> দিয়ে র‍্যাপ করেন:",
            items: [
              "ব্রাউজারের আসল DOM-এ একটি অপ্রয়োজনীয় <code>&lt;div&gt;</code> যুক্ত হয়।",
              "প্যারেন্ট যদি CSS Flexbox বা CSS Grid হয়, তবে চাইল্ডদের লেআউট ভেঙে যায়।",
              "অপ্রয়োজনীয় নোড তৈরি হওয়ায় ব্রাউজারের মেমোরি খরচ বাড়ে।",
            ],
          }}
          right={{
            title: "React Fragment (<>...</>) ব্যবহার করা",
            badge: "Clean DOM",
            variant: "emerald",
            description: "আধুনিক রিঅ্যাক্ট স্ট্যান্ডার্ড সল্যুশন:",
            items: [
              "ব্রাউজারের আসল HTML DOM-এ কোনো বাড়তি ট্যাগ তৈরি হয় না।",
              "প্যারেন্ট Flexbox বা Grid লেআউট শতভাগ অক্ষত থাকে।",
              "একদম ক্লিন ও হালকা DOM আউটপুট পাওয়া যায়।",
            ],
          }}
        />
      </div>
    ),
  },
  {
    id: "jsx-expressions-and-attributes",
    filePath:
      "apps/react/app/01-foundations/1.2-jsx-rules-and-expressions/jsx-expressions-and-attributes.tsx",
    title: "২. কার্লি ব্রেসেস `{}` এক্সপ্রেশন ও HTML বনাম JSX Rules",
    description:
      "JSX-এ ভ্যারিয়েবল, গাণিতিক হিসাব ও ডাইনামিক অ্যাট্রিবিউট লেখার নিয়ম এবং HTML অ্যাট্রিবিউটের সাথে JSX-এর প্রধান পার্থক্যসমূহ।",
    badge: "Rule #2 & #3",
    code: JsxExpressionsAndAttributesRaw,
    preview: <JsxExpressionsAndAttributes />,
    learningNotes: (
      <RuleTable
        title="HTML বনাম JSX সিনট্যাক্স রূপান্তর চিটশিট:"
        rows={[
          {
            feature: "CSS ক্লাস নির্ধারণ",
            vanillaOrHtml: 'class="card"',
            reactEquivalent: 'className="card"',
            note: "JavaScript-এ 'class' একটি রিজার্ভড কি-ওয়ার্ড।",
          },
          {
            feature: "ফর্ম লেবেল বাইন্ডিং",
            vanillaOrHtml: 'for="user-email"',
            reactEquivalent: 'htmlFor="user-email"',
            note: "JavaScript-এ 'for' লুপের জন্য সংরক্ষিত।",
          },
          {
            feature: "সেলফ-ক্লোজিং ট্যাগ",
            vanillaOrHtml: "<input>, <img>, <br>",
            reactEquivalent: "<input />, <img />, <br />",
            note: "JSX-এ সব চাইল্ডহীন ট্যাগ অবশ্যই স্ল্যাশ দিয়ে ক্লোজ করতে হবে।",
          },
          {
            feature: "ইনলাইন স্টাইলিং",
            vanillaOrHtml: 'style="color: red; margin-top: 10px;"',
            reactEquivalent: 'style={{ color: "red", marginTop: "10px" }}',
            note: "CSS স্ট্রিং নয়, JavaScript অবজেক্ট (CamelCase) পাস করতে হয়।",
          },
          {
            feature: "ইভেন্ট লিসেনার",
            vanillaOrHtml: 'onclick="handleClick()"',
            reactEquivalent: "onClick={handleClick}",
            note: "CamelCase ফরম্যাট এবং ফাংশন রেফারেন্স পাস করতে হয়।",
          },
        ]}
      />
    ),
  },
  {
    id: "valid-vs-invalid-expressions",
    filePath:
      "apps/react/app/01-foundations/1.2-jsx-rules-and-expressions/valid-vs-invalid-expressions.tsx",
    title: "৩. Expression বনাম Statement ও 0 রেন্ডারিংয়ের ফাঁদ",
    description:
      "কার্লি ব্রেসেসের ভেতরে কী বসতে পারে আর কী বসতে পারে না? Booleans/null কেন স্ক্রিনে ফাঁকা থাকে এবং '0 && <Badge />' কেন স্ক্রিনে '0' প্রিন্ট করে।",
    badge: "Rule #4",
    code: ValidVsInvalidExpressionsRaw,
    preview: <ValidVsInvalidExpressions />,
    learningNotes: (
      <CommonPitfall
        title="লজিক্যাল AND (&&) এবং ০ (Zero) রেন্ডারিংয়ের ফাঁদ"
        mistakeDescription="তালিকা খালি থাকলে 0 রেন্ডার হওয়া:"
        badCode={`// ❌ unreadCount যখন ০, তখন স্ক্রিনে '0' প্রিন্ট হয়ে যায়!
{unreadCount && <Badge>{unreadCount}টি নোটিফিকেশন</Badge>}`}
        solutionDescription="বুলিয়ান তুলনা বা টারনারি ব্যবহার করা:"
        goodCode={`// ✅ বুলিয়ান তুলনা নিশ্চিত করে স্ক্রিন পরিষ্কার রাখা
{unreadCount > 0 && <Badge>{unreadCount}টি নোটিফিকেশন</Badge>}

// অথবা টারনারি অপারেটর:
{unreadCount > 0 ? <Badge>{unreadCount}টি নোটিফিকেশন</Badge> : null}`}
        whyItFails="JavaScript-এ 0 && <Component /> এক্সপ্রেশনটি সরাসরি 0 রিটার্ন করে। React-এ false, null, undefined স্ক্রিনে কিছু রেন্ডার না করলেও সংখ্যা (যেমন 0) ভ্যালিড টেক্সট হিসেবে স্ক্রিনে প্রদর্শিত হয়।"
      />
    ),
  },
]

export default function JsxRulesAndExpressionsPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* ১. টপিক হিরো ব্যানার */}
      <TopicHero
        badge="কোর সিনট্যাক্স • Level 1.2"
        title="JSX Rules & JavaScript Expressions"
        description={
          <>
            JSX হলো <strong>JavaScript XML</strong> — দেখতে HTML-এর মতো হলেও এটি আসলে{" "}
            <strong>খাঁটি JavaScript</strong>। ব্রাউজার সরাসরি JSX বুঝতে পারে না; বিল্ড টাইমে{" "}
            Babel বা SWC কম্পাইলার এটিকে{" "}
            <code>React.createElement(...)</code> ফাংশন কলে রূপান্তরিত করে।
          </>
        }
        formula={{
          label: "JSX-এর মূল নীতি",
          value: "JSX = HTML-like syntax + Pure JS Expressions inside {}",
        }}
      />

      {/* ২. ইন্টারেক্টিভ শোকেস আইটেমস ও কোড এক্সপ্লোরার */}
      <ExamplePageShell
        title="ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার"
        description="নিচের ৩টি ডেমো প্র্যাকটিস করো এবং কোডের গভীর নিয়মাবলী বুঝতে 'Code' ট্যাবে বা ফাইলের লিঙ্কে ক্লিক করো।"
        items={showcaseItems}
      />

      {/* ৩. কুইজ: শিক্ষার্থী নিজের জ্ঞান যাচাই করতে পারবে */}
      <ConceptQuiz
        question="নিচের কোন কোডটি একটি JSX এলিমেন্টের কার্লি ব্রেসেস { ... }-এর ভেতর বৈধ (Valid)?"
        hint="মনে রেখো: Statements (যেমন if/for) কোনো মান রিটার্ন করে না, কিন্তু Expressions (যেমন ternary) একটি মান রিটার্ন করে।"
        options={[
          {
            text: "{ if (user.isLoggedIn) { <span>Welcome</span> } }",
            isCorrect: false,
            feedback: "if statement কোনো মান রিটার্ন করে না, তাই কার্লি ব্রেসেসে লিখলে Syntax Error হবে।",
          },
          {
            text: "{ user.isLoggedIn ? <span>Welcome</span> : <span>Login</span> }",
            isCorrect: true,
            feedback: "অসাধারণ! Ternary অপারেটর একটি বৈধ JavaScript Expression, যা একটি JSX এলিমেন্ট রিটার্ন করে।",
          },
          {
            text: "{ for (let i = 0; i < 5; i++) { <div>{i}</div> } }",
            isCorrect: false,
            feedback: "for loop একটি Statement। লুপ চালাতে হলে JSX-এ .map() মেথড ব্যবহার করতে হয়।",
          },
        ]}
      />

      {/* ৪. পেজিনেশন ফুটার: পূর্ববর্তী ও পরবর্তী টপিকের নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ১.১ Imperative vs Declarative UI",
          href: "/01-foundations/1.1-imperative-vs-declarative-ui",
        }}
        next={{
          title: "পরবর্তী: ১.৩ Components & Composition",
          href: "/01-foundations/1.3-components-and-composition",
        }}
      />
    </div>
  )
}

