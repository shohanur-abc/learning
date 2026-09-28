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

// ── ১. পিউর এক্সাম্পল কম্পোনেন্ট ও টার্বোপ্যাক র-ইমপোর্ট ───────────────────────
import CounterReducerActions from "./counter-reducer-actions"
import CounterReducerActionsRaw from "./counter-reducer-actions.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import ComplexCartReducer from "./complex-cart-reducer"
import ComplexCartReducerRaw from "./complex-cart-reducer.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import UndoRedoReducer from "./undo-redo-reducer"
import UndoRedoReducerRaw from "./undo-redo-reducer.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ─────────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "counter-reducer-actions",
    filePath:
      "apps/react/app/04-state-architecture/4.3-use-reducer-hook/counter-reducer-actions.tsx",
    title: "১. Reducer ফান্ডামেন্টালস ও Discriminated Union Actions",
    description:
      "স্টেট ট্রানজিশনকে ফাংশনাল ও প্রেডিক্টেবল করা: Pure Reducer ফাংশন, টাইপড অ্যাকশন অবজেক্ট (Dispatch) এবং স্টেট সীমা নির্ধারণের স্পষ্ট মেকানিক্স।",
    badge: "Core useReducer",
    code: CounterReducerActionsRaw,
    preview: <CounterReducerActions />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="useReducer-এর মূল গঠন ও সূত্র:">
          <code>const [state, dispatch] = useReducer(reducer, initialState);</code>
          <p className="mt-2 text-xs">
            যেখানে <strong>reducer</strong> হলো একটি সাধারণ JavaScript ফাংশন:
            <code>(state, action) =&gt; newState</code>। কম্পোনেন্ট থেকে সরাসরি স্টেট বদলানো
            নিষিদ্ধ; কেবল একটি অ্যাকশন <code>dispatch(&#123; type: &quot;INCREMENT&quot; &#125;)</code>{" "}
            পাঠানো হয়। Reducer সিদ্ধান্ত নেয় সেই অ্যাকশনের প্রেক্ষিতে পরবর্তী স্টেট কী হবে।
          </p>
        </ConceptAlert>

        <ComparisonGrid
          left={{
            title: "সরাসরি স্টেট মিউটেশন (ভুল পদ্ধতি)",
            badge: "Mutation Bug",
            variant: "destructive",
            description: "Reducer-এর ভেতর সরাসরি স্টেট অবজেক্ট পরিবর্তন করার কুফল:",
            items: [
              "<code>state.count++</code> বা <code>state.items.push()</code> করা",
              "অবজেক্ট রেফারেন্স অপরিবর্তিত থাকায় React কোনো রি-রেন্ডার ট্রিগার করে না",
              "টাইম-ট্রাভেল বা স্টেটের আগের স্ন্যাপশট ট্র্যাক করার ক্ষমতা চিরতরে নষ্ট হয়",
            ],
          }}
          right={{
            title: "ইমিউটেবল রিটার্ন (সঠিক Reducer)",
            badge: "Pure & Predictable",
            variant: "emerald",
            description: "নতুন অবজেক্ট তৈরি করে ফেরত দেওয়ার সুবিধা:",
            items: [
              "<code>&#123; ...state, count: state.count + 1 &#125;</code> রিটার্ন করা",
              "React সঙ্গে সঙ্গে রেফারেন্স পার্থক্য শনাক্ত করে নিখুঁতভাবে UI আপডেট করে",
              "ফাংশনটি পিউর হওয়ায় ইউনিট টেস্ট (Unit Test) করা অত্যন্ত সহজ হয়",
            ],
          }}
        />
      </div>
    ),
  },
  {
    id: "complex-cart-reducer",
    filePath:
      "apps/react/app/04-state-architecture/4.3-use-reducer-hook/complex-cart-reducer.tsx",
    title: "২. জটিল ও আন্তঃনির্ভরশীল স্টেট ট্রানজিশন",
    description:
      "একটি অ্যাকশন ডিসপ্যাচে কার্ট আইটেম, কুপন ডিসকাউন্ট এবং ফ্রি-শিপিং শর্তের মতো একাধিক আন্তঃনির্ভরশীল হিসাবকে একযোগে এটমিকভাবে আপডেট করা।",
    badge: "Interdependent State",
    code: ComplexCartReducerRaw,
    preview: <ComplexCartReducer />,
    learningNotes: (
      <div className="space-y-4">
        <RuleTable
          title="useState বনাম useReducer: কখন কোনটি ব্যবহার করবেন?"
          colHeaders={[
            "বিবেচ্য বিষয়",
            "useState নির্বাচন করুন",
            "useReducer নির্বাচন করুন",
            "পরামর্শ",
          ]}
          rows={[
            {
              feature: "১. স্টেটের জটিলতা",
              vanillaOrHtml: "সহজ স্ট্রিং, সংখ্যা বা বুলিয়ান",
              reactEquivalent: "নেস্টেড অবজেক্ট বা সম্পর্কিত অ্যারে",
              note: "একাধিক ফিল্ড থাকলে useReducer গোছানো রাখে।",
            },
            {
              feature: "২. লজিক শেয়ারিং ও টেস্ট",
              vanillaOrHtml: "UI কম্পোনেন্টের ভেতরেই আবদ্ধ",
              reactEquivalent: "কম্পোনেন্টের বাইরে পিউর ফাংশন",
              note: "Reducer ফাংশন কোনো DOM বা React ছাড়াই টেস্ট করা যায়।",
            },
            {
              feature: "৩. পরবর্তী স্টেটের নির্ভরতা",
              vanillaOrHtml: "স্বাধীন একক ফিল্ড পরিবর্তন",
              reactEquivalent: "আগের একাধিক মানের ওপর নির্ভরশীল",
              note: "যেমন: কার্ট বদলালে স্বয়ংক্রিয়ভাবে শিপিং ফি হিসাব।",
            },
            {
              feature: "৪. অ্যাকশনের ধরন",
              vanillaOrHtml: "setCount(10)",
              reactEquivalent: "dispatch({ type, payload })",
              note: "অ্যাকশন অবজেক্ট অ্যাপ্লিকেশনে লগিং ও ডিবাগিং সহজ করে।",
            },
          ]}
        />

        <CommonPitfall
          title="একই ইভেন্টে ৪-৫টি ভিন্ন useState সেটার কল করে জট পাকানো"
          mistakeDescription="আইটেম ডিলিট করার পর setItems(), setTotal(), setDiscount(), setShipping() একের পর এক কল করা।"
          solutionDescription="একটিমাত্র useReducer অ্যাকশন ডিসপ্যাচে সব হিসাব একীভূত করা।"
          badCode={`// ❌ একাধিক ফ্র্যাগমেন্টেড useState সেটার
function handleRemove(id) {
  setItems(prev => prev.filter(i => i.id !== id));
  setSubtotal(calcSubtotal()); // বাসি (stale) স্টেট পড়ার ঝুঁকি!
  setShipping(checkShipping());
  setDiscount(recalcDiscount());
}`}
          goodCode={`// ✅ একটি একক এটমিক অ্যাকশন
function handleRemove(id) {
  dispatch({ type: "REMOVE_PRODUCT", payload: { id } });
  // Reducer ফাংশন এক ট্রানজিশনে সব ডিপেন্ডেন্ট ফিল্ড নিখুঁতভাবে তৈরি করে!
}`}
          whyItFails="একাধিক সেটার পরপর কল করলে কোডের পাঠযোগ্যতা নষ্ট হয় এবং কোনো একটি সেটার বাদ পড়লে বা অসময়ে এক্সিকিউট হলে স্টেট ইনকনসিস্টেন্সি তৈরি হয়।"
        />
      </div>
    ),
  },
  {
    id: "undo-redo-reducer",
    filePath:
      "apps/react/app/04-state-architecture/4.3-use-reducer-hook/undo-redo-reducer.tsx",
    title: "৩. টাইম-ট্রাভেল ইঞ্জিন (Undo / Redo Architecture)",
    description:
      "মেমোরি স্ট্যাক ট্র্যাকিংয়ের মাধ্যমে পূর্বাবস্থায় ফিরে যাওয়া (Undo) এবং পুনরায় ফিরিয়ে আনার (Redo) আর্কিটেকচারাল প্যাটার্ন।",
    badge: "Time-Travel Engine",
    code: UndoRedoReducerRaw,
    preview: <UndoRedoReducer />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="tip" title="হিস্টোরি ট্র্যাকিংয়ের ৩-পার্ট আর্কিটেকচার:">
          যেকোনো টাইম-ট্রাভেল সিস্টেমে তিনটি অংশ থাকে:
          <ul className="list-disc pl-4 mt-2 space-y-1 text-xs">
            <li><strong>past:</strong> পূর্বে ঘটে যাওয়া স্টেটগুলোর স্ন্যাপশট অ্যারে।</li>
            <li><strong>present:</strong> ব্যবহারকারী এই মুহূর্তে স্ক্রিনে যা দেখছেন।</li>
            <li><strong>future:</strong> আনডু করার পর ভবিষ্যতের যে স্ন্যাপশটগুলো জমা হয়েছিল।</li>
          </ul>
          নতুন এডিট হলে <code>future</code> খালি হয়ে যায় এবং <code>present</code> টি <code>past</code>-এ যোগ হয়।
        </ConceptAlert>

        <CommonPitfall
          title="Reducer ফাংশনের ভেতর সাইড ইফেক্ট (API কল, LocalStorage) চালানো"
          mistakeDescription="কেস ব্লকের ভেতরে সরাসরি fetch() ডাকা বা Math.random() ব্যবহার করা।"
          solutionDescription="Reducer ফাংশন সবসময় ডিটারমিনিস্টিক পিউর ফাংশন রাখা এবং সাইড ইফেক্ট useEffect বা ইভেন্ট হ্যান্ডলারে রাখা।"
          badCode={`// ❌ Reducer-এ সাইড ইফেক্ট সম্পূর্ণ নিষিদ্ধ
function reducer(state, action) {
  switch (action.type) {
    case "SAVE_DATA":
      fetch("/api/save", { method: "POST" }); // মারাত্মক অ্যান্টি-প্যাটার্ন!
      localStorage.setItem("user", JSON.stringify(state));
      return { ...state, saved: true };
  }
}`}
          goodCode={`// ✅ পিউর রিডিউসার + বাইরে সাইড ইফেক্ট
function reducer(state, action) {
  switch (action.type) {
    case "SAVE_DATA":
      return { ...state, saved: true }; // শুধুই পিউর স্টেট ট্রানজিশন
  }
}`}
          whyItFails="React কনকারেন্ট মোডে কোনো কোনো রেন্ডারে রিডিউসারকে একাধিকবার চালাতে পারে। ভেতরে এপিআই বা লোকালস্টোরেজ কল থাকলে একই রিকোয়েস্ট ডুপ্লিকেট হয়ে অপ্রত্যাশিত সাইড-ইফেক্ট সৃষ্টি করবে।"
        />
      </div>
    ),
  },
]

/**
 * ৪.৩ useReducer Hook পেজ কম্পোনেন্ট
 */
export default function UseReducerPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="স্টেট ইঞ্জিন • Level 4.3"
        title="useReducer Hook: প্রেডিক্টেবল স্টেট ইঞ্জিন"
        description={
          <>
            জটিল ও আন্তঃনির্ভরশীল স্টেট ট্রানজিশন সুশৃঙ্খলভাবে পরিচালনা করার শক্তিশালী হুক।
            Pure Reducer ফাংশন, টাইপড অ্যাকশন অবজেক্ট (Dispatch) এবং টাইম-ট্রাভেল
            স্টেট ম্যানেজমেন্টের বাস্তবসম্মত প্রয়োগ।
          </>
        }
        formula={{
          label: "Reducer Formula",
          value: "const [state, dispatch] = useReducer(reducer, initialState) ➔ (state, action) => newState",
        }}
      />

      {/* ইন্টারেক্টিভ শোকেস ও কোড এক্সপ্লোরার */}
      <ExamplePageShell
        title="ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার"
        description="নিচের ডেমোগুলোর সাথে ইন্টার‍্যাক্ট করো এবং সোর্স কোড দেখতে 'Code' ট্যাবে অথবা ফাইলের লিঙ্কে ক্লিক করো।"
        items={showcaseItems}
      />

      {/* কুইক কুইজ */}
      <ConceptQuiz
        question="React-এ একটি Reducer ফাংশন সম্পর্কে নিচের কোন শর্তটি বজায় রাখা বাধ্যতামূলক?"
        hint="ফাংশনাল প্রোগ্রামিংয়ের নীতি এবং পার্শ্বপ্রতিক্রিয়াহীন (Side-Effect Free) স্বভাব বিবেচনা করো।"
        options={[
          {
            text: "Reducer ফাংশনটি অবশ্যই একটি Pure Function হতে হবে — একই স্টেট ও অ্যাকশনের জন্য সর্বদা একই নতুন স্টেট রিটার্ন করতে হবে এবং কোনো সাইড ইফেক্ট রাখা যাবে না।",
            isCorrect: true,
            feedback: "🎉 অসাধারণ ও সম্পূর্ণ সঠিক! পিউর ফাংশন হওয়াই রিঅ্যাক্ট রিডিউসারের মূল ভিত্তি, যা প্রেডিক্টেবিলিটি নিশ্চিত করে।",
          },
          {
            text: "Reducer ফাংশনের ভেতর অবশ্যই ব্রাউজারের fetch() এপিআই কল করে ডেটাবেজে সেভ করতে হবে।",
            isCorrect: false,
            feedback: "❌ সম্পূর্ণ ভুল! রিডিউসারের ভেতর এপিআই কল বা সাইড ইফেক্ট চালানো কঠোরভাবে নিষিদ্ধ।",
          },
          {
            text: "Reducer-কে অবশ্যই সরাসরি state অবজেক্ট মিউটেট (state.count++) করতে হবে।",
            isCorrect: false,
            feedback: "❌ ভুল! সরাসরি মিউটেট করলে React স্টেট পরিবর্তন বুঝতে পারে না এবং রি-রেন্ডার হয় না।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ৪.২ Context API & useContext",
          href: "/04-state-architecture/4.2-context-api-and-use-context",
        }}
        next={{
          title: "পরবর্তী: ৫.১ Re-render Mechanics",
          href: "/05-performance-optimization/5.1-react-re-render-mechanics",
        }}
      />
    </div>
  )
}
