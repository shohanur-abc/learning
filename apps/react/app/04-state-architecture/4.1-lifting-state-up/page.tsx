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
import TemperatureSyncConverter from "./temperature-sync-converter"
import TemperatureSyncConverterRaw from "./temperature-sync-converter.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import SharedCartAndSummary from "./shared-cart-and-summary"
import SharedCartAndSummaryRaw from "./shared-cart-and-summary.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import AccordionExclusiveCollapse from "./accordion-exclusive-collapse"
import AccordionExclusiveCollapseRaw from "./accordion-exclusive-collapse.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ─────────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "temperature-sync-converter",
    filePath:
      "apps/react/app/04-state-architecture/4.1-lifting-state-up/temperature-sync-converter.tsx",
    title: "১. সিঙ্ক্রোনাইজড ইনপুট ও Single Source of Truth",
    description:
      "সেলসিয়াস ও ফারেনহাইট দুটি সিবলিং ইনপুটকে নিজেদের ভেতর ডুপ্লিকেট স্টেট না রেখে কমন প্যারেন্টে স্টেট Lift করার মাধ্যমে নিখুঁত রিয়েল-টাইম সিঙ্ক তৈরি করা।",
    badge: "Synchronized Inputs",
    code: TemperatureSyncConverterRaw,
    preview: <TemperatureSyncConverter />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="Lifting State Up-এর মূল দর্শন:">
          রিঅ্যাক্টে ডেটা সবসময় নিচের দিকে প্রবাহিত হয় (Top-down Unidirectional Data Flow)।
          দুটি সিবলিং কম্পোনেন্ট কখনো সরাসরি একে অপরের সাথে ডেটা আদান-প্রদান করতে পারে না।
          তাই যখন দুটি সিবলিংয়ের মধ্যে পারস্পরিক সমন্বয়ের প্রয়োজন হয়, তখন তাদের শেয়ার করা স্টেটটিকে
          তাদের নিকটতম কমন পূর্বপুরুষ (Closest Common Ancestor)-এ তুলে নিতে হয়।
        </ConceptAlert>

        <ComparisonGrid
          left={{
            title: "ডুপ্লিকেট লোকাল স্টেট (Anti-Pattern)",
            badge: "Out of Sync Risk",
            variant: "destructive",
            description: "উভয় চাইল্ডে আলাদা আলাদা useState রাখলে যা ঘটে:",
            items: [
              "<code>const [celsius, setC] = useState()</code> এবং <code>[fahr, setF] = useState()</code> আলাদা রাখা",
              "একটি ইনপুট আপডেট হলে অন্য ইনপুটের স্টেট ম্যানুয়ালি আপডেট করতে গিয়ে জটিলতা বাড়ে",
              "অসময়ে আপডেট বা রেস কন্ডিশনের কারণে দুই ইনপুটে ভিন্ন ডেটা দেখানোর ঝুঁকি থাকে",
            ],
          }}
          right={{
            title: "Lifting State Up (Recommended)",
            badge: "Single Source of Truth",
            variant: "emerald",
            description: "কমন প্যারেন্টে স্টেট তুলে নেওয়ার সুবিধা:",
            items: [
              "ডেটা কেবল একটি জায়গায় (প্যারেন্টে) স্টেট আকারে সংরক্ষিত থাকে",
              "সিবলিং চাইল্ডরা কেবল <code>value</code> এবং <code>onChange</code> কলব্যাক প্রপস পায়",
              "অন্য স্কেলের মানটি রানটাইমে হিসাবকৃত ডেরাইভড ভ্যালু (Derived Value) হিসেবে নিখুঁত থাকে",
            ],
          }}
        />
      </div>
    ),
  },
  {
    id: "shared-cart-and-summary",
    filePath:
      "apps/react/app/04-state-architecture/4.1-lifting-state-up/shared-cart-and-summary.tsx",
    title: "২. সিবলিং কম্পোনেন্ট সমন্বয়: ক্যাটালগ ও অর্ডার সামারি",
    description:
      "সিবলিং-১ (প্রোডাক্ট ক্যাটালগ) বাটন ক্লিকে আইটেম যুক্ত করে এবং সিবলিং-২ (সামারি রিসিট) স্বয়ংক্রিয়ভাবে মোট মূল্য ও আইটেম প্রদর্শন করে।",
    badge: "Sibling Orchestration",
    code: SharedCartAndSummaryRaw,
    preview: <SharedCartAndSummary />,
    learningNotes: (
      <div className="space-y-4">
        <RuleTable
          title="Lifting State Up-এর আর্কিটেকচারাল নিয়মাবলি"
          colHeaders={[
            "নীতি / বিষয়",
            "ভুল পদ্ধতি",
            "সঠিক React প্যাটার্ন",
            "ব্যাখ্যা",
          ]}
          rows={[
            {
              feature: "১. স্টেটের অবস্থান",
              vanillaOrHtml: "উভয় চাইল্ডে লোকাল স্টেট",
              reactEquivalent: "Closest Common Ancestor",
              note: "যেসব চাইল্ডের ডেটা প্রয়োজন, তাদের সবার উপরের কমন প্যারেন্টে স্টেট রাখতে হবে।",
            },
            {
              feature: "২. ডেটা পাস করার দিক",
              vanillaOrHtml: "সিবলিং টু সিবলিং সরাসরি পাস",
              reactEquivalent: "Props Downwards (⬇️)",
              note: "প্যারেন্ট থেকে চাইল্ডে ডেটা কেবল প্রপস হিসেবে নিচে নামবে।",
            },
            {
              feature: "৩. স্টেট আপডেটের দিক",
              vanillaOrHtml: "গ্লোবাল ভ্যারিয়েবল মিউটেশন",
              reactEquivalent: "Events / Callbacks Upwards (⬆️)",
              note: "চাইল্ড কোনো অ্যাকশন নিলে প্যারেন্ট থেকে পাঠানো কলব্যাক ফাংশন ট্রিগার করবে।",
            },
            {
              feature: "৪. গণনাকৃত ডেটা",
              vanillaOrHtml: "আলাদা স্টেটে মোট হিসাব রাখা",
              reactEquivalent: "Derived State on the Fly",
              note: "কার্টের মোট মূল্য আলাদা স্টেট নয়, বর্তমান কার্ট অ্যারে থেকে রিডিউস করে বের করা হয়।",
            },
          ]}
        />

        <CommonPitfall
          title="ডেরাইভ করা যায় এমন ডেটাকে অপ্রয়োজনীয় আলাদা স্টেটে রাখা"
          mistakeDescription="কার্ট আইটেমের পাশাপাশি totalItemsCount ও totalPrice-এর জন্য আলাদা আলাদা useState ঘোষণা করা।"
          solutionDescription="কার্ট স্টেট থেকে রেন্ডারের সময় সরাসরি reduce বা derived হিসাব করা।"
          badCode={`// ❌ অতিরিক্ত ও ঝুঁকিপূর্ণ স্টেট
const [cartItems, setCartItems] = useState([]);
const [totalPrice, setTotalPrice] = useState(0);

function addItem(item) {
  setCartItems([...cartItems, item]);
  setTotalPrice(totalPrice + item.price); // সিঙ্ক নষ্ট হওয়ার ঝুঁকি
}`}
          goodCode={`// ✅ নিখুঁত ডেরাইভড ভ্যালু
const [cartItems, setCartItems] = useState([]);
// আলাদা স্টেটের কোনো দরকার নেই!
const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);`}
          whyItFails="স্টেটের সংখ্যা যত বেশি হয়, তাদের মধ্যে অসঙ্গতি (Inconsistency) তৈরি হওয়ার ঝুঁকি তত বাড়ে। কোনো কারণে কার্ট আপডেট হলেও টোটাল প্রাইস আপডেট না হলে ইউজার ভুল রিসিট দেখবে।"
        />
      </div>
    ),
  },
  {
    id: "accordion-exclusive-collapse",
    filePath:
      "apps/react/app/04-state-architecture/4.1-lifting-state-up/accordion-exclusive-collapse.tsx",
    title: "৩. Controlled সিবলিং: মিউচুয়াল এক্সক্লুসিভ অ্যাকর্ডিয়ন",
    description:
      "একাধিক অ্যাকর্ডিয়ন প্যানেলের মাঝে একই সাথে কেবল একটি প্যানেল খোলা রাখার জন্য activeId স্টেট প্যারেন্টে উত্তোলন।",
    badge: "Controlled Components",
    code: AccordionExclusiveCollapseRaw,
    preview: <AccordionExclusiveCollapse />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="tip" title="Controlled Component রূপান্তর:">
          যখন একটি চাইল্ড কম্পোনেন্টের অভ্যন্তরীণ ভিজ্যুয়াল স্টেট (যেমন <code>isOpen</code>) তার নিজের
          ভেতরে না রেখে প্যারেন্ট থেকে প্রপস হিসেবে পাঠানো হয় এবং পরিবর্তনের জন্য প্যারেন্টের কলব্যাক
          ডাকা হয়, তখন সেই চাইল্ডটি <strong>Controlled Component</strong>-এ পরিণত হয়। এর ফলে প্যারেন্ট
          যেকোনো সময় সব চাইল্ডের সার্বিক অবস্থা নিয়ন্ত্রণ করতে পারে।
        </ConceptAlert>

        <CommonPitfall
          title="সিবলিংদের স্বাধীন স্টেট রেখে মিউচুয়াল এক্সক্লুসিভ করার চেষ্টা করা"
          mistakeDescription="প্রতিটি অ্যাকর্ডিয়ন আইটেমে নিজস্ব const [isOpen, setIsOpen] = useState(false) রেখে অন্যান্যদের বন্ধ করার চেষ্টা করা।"
          solutionDescription="প্যারেন্ট কন্টেইনারে activeId স্টেট সংরক্ষণ করে চাইল্ডে isOpen={activeId === item.id} পাস করা।"
          badCode={`// ❌ প্রতিটি প্যানেলে নিজস্ব স্টেট থাকলে প্যানেল-১ জানে না প্যানেল-২ খোলা হয়েছে কিনা
function AccordionPanel() {
  const [isOpen, setIsOpen] = useState(false);
  return <div onClick={() => setIsOpen(!isOpen)}>...</div>;
}`}
          goodCode={`// ✅ প্যারেন্টে স্টেট তুলে এনে চাইল্ডকে Controlled বানানো
function AccordionContainer() {
  const [activeId, setActiveId] = useState(null);
  return items.map(item => (
    <AccordionPanel 
      isOpen={activeId === item.id} 
      onToggle={() => setActiveId(activeId === item.id ? null : item.id)} 
    />
  ));
}`}
          whyItFails="সিবলিং কম্পোনেন্টগুলো পরস্পরের ইন্টারনাল মেমোরি বা স্টেট পড়তে পারে না। তাই কোনো প্যানেল নিজস্ব স্টেটে চললে অন্য প্যানেল খোলার সময় আগের প্যানেল স্বয়ংক্রিয়ভাবে বন্ধ হতে পারে না।"
        />
      </div>
    ),
  },
]

/**
 * ৪.১ Lifting State Up পেজ কম্পোনেন্ট
 */
export default function LiftingStateUpPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="স্টেট আর্কিটেকচার • Level 4.1"
        title="Lifting State Up (স্টেট উপরে ওঠানো)"
        description={
          <>
            React-এ একাধিক কম্পোনেন্টের মধ্যে সমন্বিত ডেটা শেয়ার করার জন্য স্টেটকে
            তাদের নিকটতম কমন প্যারেন্টে (Common Ancestor) তুলে নেওয়া। এটিই React অ্যাপ্লিকেশনে{" "}
            <strong>Single Source of Truth</strong> এবং নির্ভরযোগ্য টপ-ডাউন ডেটা ফ্লো নিশ্চিত করে।
          </>
        }
        formula={{
          label: "Lifting State Up Formula",
          value: "Parent owns State ➔ Props down (Values) ➔ Callbacks up (Events)",
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
        question="React অ্যাপ্লিকেশনে দুটি সিবলিং কম্পোনেন্টের মধ্যে লাইভ ডেটা সিঙ্ক করার সবচেয়ে আদর্শ স্থাপত্য পদ্ধতি কোনটি?"
        hint="React-এর একমুখী ডেটা প্রবাহ (Unidirectional Data Flow) এবং সিঙ্গেল সোর্স অব ট্রুথ নীতি মনে করো।"
        options={[
          {
            text: "স্টেটটিকে তাদের নিকটতম কমন প্যারেন্টে তুলে নিয়ে (Lifting State Up) প্রপস ও কলব্যাকের মাধ্যমে পাস করা।",
            isCorrect: true,
            feedback: "🎉 অসাধারণ ও নির্ভুল! এটিই রিঅ্যাক্টের প্রমিত প্যাটার্ন যা ডেটা ডুপ্লিকেশন রোধ করে এবং একটি সিঙ্গেল সোর্স অব ট্রুথ নিশ্চিত করে।",
          },
          {
            text: "চাইল্ড-১ থেকে সরাসরি চাইল্ড-২-এর মেমোরিতে DOM ইভেন্ট পাঠিয়ে ডেটা সিঙ্ক করা।",
            isCorrect: false,
            feedback: "❌ ভুল। রিঅ্যাক্টে চাইল্ড কম্পোনেন্টরা একে অপরের মেমোরি বা স্টেট সরাসরি অ্যাক্সেস করতে পারে না।",
          },
          {
            text: "উভয় চাইল্ডে দুটি আলাদা useState ঘোষণা করে setInterval দিয়ে প্রতি সেকেন্ডে তাদের সিঙ্ক করা।",
            isCorrect: false,
            feedback: "❌ এটি অত্যন্ত ক্ষতিকর ও ভঙ্গুর একটি অ্যান্টি-প্যাটার্ন যা অ্যাপের পারফরম্যান্স নষ্ট করবে।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ৩.৪ Custom Hooks",
          href: "/03-forms-and-side-effects/3.4-custom-hooks",
        }}
        next={{
          title: "পরবর্তী: ৪.২ Context API & useContext",
          href: "/04-state-architecture/4.2-context-api-and-use-context",
        }}
      />
    </div>
  )
}
