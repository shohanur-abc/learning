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
import MappingCollectionsWithKeys from "./mapping-collections-with-keys"
import MappingCollectionsWithKeysRaw from "./mapping-collections-with-keys.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import IndexVsStableKeyDemo from "./index-vs-stable-key-demo"
import IndexVsStableKeyDemoRaw from "./index-vs-stable-key-demo.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import FragmentKeysAndNestedLists from "./fragment-keys-and-nested-lists"
import FragmentKeysAndNestedListsRaw from "./fragment-keys-and-nested-lists.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ───────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "mapping-collections-with-keys",
    filePath:
      "apps/react/app/02-interactivity-and-state/2.4-lists-and-keys/mapping-collections-with-keys.tsx",
    title: "১. Array.map() দিয়ে কালেকশন রেন্ডারিং ও Key-এর গুরুত্ব",
    description:
      "অ্যারে ডেটা থেকে JSX এলিমেন্ট তৈরি এবং React Reconciliation অ্যালগরিদমের জন্য স্ট্যাবল আইডি কি নির্ধারণ।",
    badge: "Array.map()",
    code: MappingCollectionsWithKeysRaw,
    preview: <MappingCollectionsWithKeys />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="React Reconciliation ও Key-এর ভূমিকা:">
          React যখন কোনো লিস্ট রি-রেন্ডার করে, তখন সে প্রতিটি এলিমেন্টের পরিচয়
          নিশ্চিত করার জন্য <code>key</code> প্রোপার্টি মেলায়। যদি কি স্ট্যাবল থাকে,
          তবে React বুঝতে পারে কোন আইটেমটি নতুন যোগ হয়েছে বা সরানো হয়েছে, এবং পুরো DOM
          মুছে ফেলার বদলে কেবল প্রয়োজনীয় নোডটি আপডেট করে।
        </ConceptAlert>

        <ComparisonGrid
          left={{
            title: "Index as Key (অ্যান্টি-প্যাটার্ন)",
            badge: "Risky",
            variant: "destructive",
            description: "লিস্টে key={index} ব্যবহার করার ঝুঁকি:",
            items: [
              "আইটেম ফিল্টার, ডিলিট বা রি-অর্ডার করলে ইনডেক্স স্থানান্তরিত হয়।",
              "ফর্ম ইনপুট, সিলেকশন ও চেকবক্সের স্টেট ভুল আইটেমে আটকে যায়।",
              "DOM নোড রি-ইউজ ভুল হওয়ায় অ্যানিমেশনে গ্লিচ দেখা দেয়।",
            ],
          }}
          right={{
            title: "Stable ID as Key (রেকমেন্ডেড)",
            badge: "Predictable",
            variant: "emerald",
            description: "ডেটাবেস বা বিজনেস আইডি key={item.id} ব্যবহারের সুফল:",
            items: [
              "তালিকার যেকোনো অবস্থানে আইটেম সরানো বা যুক্ত করলেও পরিচয় অটুট থাকে।",
              "কম্পোনেন্টের নিজস্ব স্টেট ও ইনপুট ভ্যালু সর্বদা নির্ভুল থাকে।",
              "React Diffing অ্যালগরিদম সর্বোচ্চ গতিতে DOM আপডেট করে।",
            ],
          }}
        />
      </div>
    ),
  },
  {
    id: "index-vs-stable-key-demo",
    filePath:
      "apps/react/app/02-interactivity-and-state/2.4-lists-and-keys/index-vs-stable-key-demo.tsx",
    title: "২. Index as Key অ্যান্টি-প্যাটার্ন বনাম Stable Keys",
    description:
      "তালিকার শুরুতে আইটেম যোগ করলে কেন index key ইনপুট স্টেট নষ্ট করে দেয় এবং stable id কীভাবে তা রক্ষা করে।",
    badge: "Anti-Pattern Stress Test",
    code: IndexVsStableKeyDemoRaw,
    preview: <IndexVsStableKeyDemo />,
    learningNotes: (
      <CommonPitfall
        title="লিস্ট আইটেমে key হিসেবে Math.random() ব্যবহার করা"
        mistakeDescription="প্রতি রেন্ডারে ডাইনামিক র্যান্ডম কি জেনারেট করা:"
        solutionDescription="ডেটার ইউনিক প্রোপার্টি (item.id) অথবা ক্রিপ্টো ইউআইডি ব্যবহার করা:"
        badCode={`// ❌ মারাত্মক ভুল: প্রতি রেন্ডারে নতুন র্যান্ডম নম্বর
{items.map(item => (
  <ListItem key={Math.random()} data={item} />
))}`}
        goodCode={`// ✅ সঠিক: প্রতিটি আইটেমের জন্য স্থির অপরিবর্তনশীল আইডি
{items.map(item => (
  <ListItem key={item.id} data={item} />
))}`}
        whyItFails="Math.random() ব্যবহার করলে প্রতিবার কম্পোনেন্ট রি-রেন্ডার হওয়ার সময় প্রতিটি এলিমেন্টের জন্য সম্পূর্ণ নতুন কি তৈরি হয়। React ধরে নেয় আগের সব এলিমেন্ট মুছে গেছে এবং সম্পূর্ণ নতুন এলিমেন্ট যোগ হয়েছে। ফলে ব্রাউজার সমস্ত DOM নোড ধ্বংস করে নতুন করে তৈরি করে, সমস্ত ইনপুট স্টেট মুছে যায় এবং অ্যাপের পারফরম্যান্স মারাত্মকভাবে হ্রাস পায়।"
      />
    ),
  },
  {
    id: "fragment-keys-and-nested-lists",
    filePath:
      "apps/react/app/02-interactivity-and-state/2.4-lists-and-keys/fragment-keys-and-nested-lists.tsx",
    title: "৩. React.Fragment Key এবং Nested List স্ট্রাকচার",
    description:
      "অতিরিক্ত div ছাড়া পাশাপাশি একাধিক এলিমেন্ট রিটার্ন করতে Fragment-এ key পাস এবং নেস্টেড লুপ হ্যান্ডলিং।",
    badge: "Fragment Key",
    code: FragmentKeysAndNestedListsRaw,
    preview: <FragmentKeysAndNestedLists />,
    learningNotes: (
      <RuleTable
        title="React Lists ও Keys ব্যবহারের মূল নিয়মাবলী:"
        rows={[
          {
            feature: "Key-এর অবস্থান",
            vanillaOrHtml: "প্রযোজ্য নয়",
            reactEquivalent: "সরাসরি .map() থেকে রিটার্ন হওয়া outermost ট্যাগে",
            note: "চাইল্ড কম্পোনেন্টের ভেতরে নয়, .map কলব্যাকের প্রধান এলিমেন্টে দিতে হবে।",
          },
          {
            feature: "Key-এর স্থায়িত্ব",
            vanillaOrHtml: "Math.random()",
            reactEquivalent: "আইটেমের লাইফসাইকেলে সর্বদা স্থির (Stable)",
            note: "রেন্ডারের মাঝে কি-এর মান বদলানো যাবে না।",
          },
          {
            feature: "Key-এর ইউনিকনেস",
            vanillaOrHtml: "Global HTML id",
            reactEquivalent: "শুধু সহোদর (Sibling) এলিমেন্টগুলোর মাঝে ইউনিক",
            note: "সম্পূর্ণ পেজ জুড়ে গ্লোবালি ইউনিক হওয়ার দরকার নেই।",
          },
          {
            feature: "Fragment-এ Key",
            vanillaOrHtml: "<> শর্টহ্যান্ড",
            reactEquivalent: "<React.Fragment key={item.id}>",
            note: "<>...</> শর্টহ্যান্ড কি বা অন্য কোনো প্রপ গ্রহণ করে না।",
          },
        ]}
      />
    ),
  },
]

// ── ৩. মূল পেজ কম্পোনেন্ট ───────────────────────────────────────────────────
export default function ListsAndKeysPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="লিস্ট ও রিঅ্যাক্ট Diffing • Level 2.4"
        title="Lists & Keys (.map)"
        description={
          <>
            <strong>Array.prototype.map()</strong> ব্যবহার করে ডাইনামিক ডেটা কালেকশনকে
            JSX উপাদানে রূপান্তর করা। React-এর{" "}
            <strong>Reconciliation Diffing অ্যালগরিদমের</strong> জন্য স্ট্যাবল Key কেন
            অপরিহার্য এবং <strong>Index as Key</strong> ব্যবহারের বিপদ থেকে সুরক্ষিত
            থাকার বাস্তব গাইড।
          </>
        }
        formula={{
          label: "Reconciliation Key",
          value: "key={item.id} (Must be stable, unique, and predictable)",
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
        question="ডাইনামিক লিস্টে যেখানে আইটেম সাজানো (sort), ফিল্টার বা ডিলিট হতে পারে, সেখানে key={index} ব্যবহার করলে কী সমস্যা হতে পারে?"
        hint="React কীভাবে DOM নোড রি-ইউজ করে এবং ইনপুট স্টেট কীভাবে সংরক্ষিত থাকে তা ভাবো।"
        options={[
          {
            text: "TypeScript কম্পাইলেশন এরর দিয়ে বিল্ড বন্ধ করে দেবে",
            isCorrect: false,
            feedback: "❌ ভুল! key={index} টেকনিক্যালি বৈধ কোড, টাইপস্ক্রিপ্ট কোনো এরর দেয় না। এটি একটি রানটাইম লজিক্যাল ও UI স্টেট বাগ।",
          },
          {
            text: "লিস্টের কোনো আইটেম ডিলিট বা রি-অর্ডার করলে ইনপুট ফিল্ড ও অ্যানিমেশনের স্টেট ভুল আইটেমে স্থানান্তরিত হবে",
            isCorrect: true,
            feedback: "🎉 সঠিক! ইনডেক্স পরিবর্তিত হয়ে যাওয়ায় React ভুল নোডে পুরনো স্টেট ধরে রাখে, ফলে ফর্ম ইনপুট, চেকবক্স ও ফোকাস ভুল আইটেমে স্থানান্তরিত হয়ে ব্যবহারকারীর অভিজ্ঞতা নষ্ট করে।",
          },
          {
            text: "কোনো সমস্যা হবে না, React স্বয়ংক্রিয়ভাবে ইনডেক্স সংশোধন করে নেবে",
            isCorrect: false,
            feedback: "❌ ভুল! React ইনডেক্সের ওপর অন্ধভাবে নির্ভর করে কাজ করে এবং বিভ্রান্ত হয়ে ভুল কম্পোনেন্ট আপডেট করে।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ২.৩ Conditional Rendering",
          href: "/02-interactivity-and-state/2.3-conditional-rendering",
        }}
        next={{
          title: "পরবর্তী: ৩.১ Forms in React",
          href: "/03-forms-and-side-effects/3.1-forms-in-react",
        }}
      />
    </div>
  )
}
