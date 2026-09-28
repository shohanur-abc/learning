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
import ThemeContextProviderDemo from "./theme-context-provider"
import ThemeContextProviderDemoRaw from "./theme-context-provider.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import CustomContextConsumer from "./custom-context-consumer"
import CustomContextConsumerRaw from "./custom-context-consumer.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import NestedScopeContext from "./nested-scope-context"
import NestedScopeContextRaw from "./nested-scope-context.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ─────────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "theme-context-provider",
    filePath:
      "apps/react/app/04-state-architecture/4.2-context-api-and-use-context/theme-context-provider.tsx",
    title: "১. Theme Context: Provider ও কাস্টম কনজিউমার হুক",
    description:
      "createContext তৈরি, কাস্টম প্রোভাইডারে থিম স্টেট সংরক্ষণ এবং চাইল্ড কম্পোনেন্টে কোনো প্রপস ছাড়া সরাসরি ডেটা এক্সেসের স্ট্যান্ডার্ড প্যাটার্ন।",
    badge: "Core Context API",
    code: ThemeContextProviderDemoRaw,
    preview: <ThemeContextProviderDemo />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="Context API-এর কার্যপদ্ধতি:">
          React Context মূলত ৩টি ধাপে কাজ করে:
          <ol className="list-decimal pl-4 mt-2 space-y-1 text-xs">
            <li><strong>createContext():</strong> গ্লোবাল স্টোরের একটি ব্লুপ্রিন্ট তৈরি করে।</li>
            <li><strong>&lt;Context.Provider value=&#123;...&#125;&gt;:</strong> চাইল্ড কম্পোনেন্ট ট্রির শীর্ষে বসে ডেটা ব্রডকাস্ট করে।</li>
            <li><strong>useContext(Context):</strong> সাবস্ক্রাইব করা যেকোনো চাইল্ড সরাসরি বর্তমান মান গ্রহণ করে এবং মান পাল্টালে রি-রেন্ডার হয়।</li>
          </ol>
        </ConceptAlert>

        <ComparisonGrid
          left={{
            title: "Prop Drilling (অ্যান্টি-প্যাটার্ন)",
            badge: "Rigid & Fragile",
            variant: "destructive",
            description: "মধ্যবর্তী কম্পোনেন্টগুলো দিয়ে জোর করে প্রপস পাঠানোর সমস্যা:",
            items: [
              "যেসব কম্পোনেন্টের ডেটার কোনো দরকার নেই, তারাও প্রপস গ্রহণ ও পাস করতে বাধ্য হয়",
              "কোনো একটি কম্পোনেন্টের প্রপসের নাম বদলালে পুরো চেইন ভেঙে যায়",
              "রিউজেবিলিটি নষ্ট হয় কারণ কম্পোনেন্ট নির্দিষ্ট প্রপসের ওপর কঠোরভাবে আবদ্ধ হয়ে পড়ে",
            ],
          }}
          right={{
            title: "Context API (টেলিপোর্টেশন)",
            badge: "Clean & Decoupled",
            variant: "emerald",
            description: "Context ব্যবহারের চমৎকার সুফল:",
            items: [
              "মাঝামাঝি থাকা কম্পোনেন্টগুলোকে সম্পূর্ণ ক্লিন রাখা যায় (Zero Prop Drilling)",
              "গভীর চাইল্ডরা কেবল <code>useContext</code> ডেকে সরাসরি প্রয়োজনীয় ডেটা তুলে নেয়",
              "গ্লোবাল সেটিংস (থিম, ভাষা, লগইন ইউজার) সহজে ম্যানেজ করা যায়",
            ],
          }}
        />
      </div>
    ),
  },
  {
    id: "custom-context-consumer",
    filePath:
      "apps/react/app/04-state-architecture/4.2-context-api-and-use-context/custom-context-consumer.tsx",
    title: "২. প্রপ ড্রিলিং দূরীকরণ ও Auth Role ম্যানেজমেন্ট",
    description:
      "ড্যাশবোর্ড নেভবারে কোনো ইউজার প্রপস পাস না করে ৩-লেয়ার গভীরতার প্রোফাইল কম্পোনেন্টে সরাসরি অথেন্টিকেশন স্টেট ও রোল পরিবর্তন কার্যকর করা।",
    badge: "Auth & Zero Drilling",
    code: CustomContextConsumerRaw,
    preview: <CustomContextConsumer />,
    learningNotes: (
      <div className="space-y-4">
        <RuleTable
          title="কখন Context ব্যবহার করবেন এবং কখন করবেন না"
          colHeaders={[
            "পরিস্থিতি (Scenario)",
            "প্রস্তাবিত সমাধান",
            "কারণ / নীতি",
            "নোট",
          ]}
          rows={[
            {
              feature: "১. গ্লোবাল অ্যাপ ডেটা",
              vanillaOrHtml: "Context API",
              reactEquivalent: "<AuthProvider>, <ThemeProvider>",
              note: "যেসব ডেটা পুরো অ্যাপ্লিকেশনের সর্বত্র প্রয়োজন হয়।",
            },
            {
              feature: "২. মাত্র ১-২ লেভেল গভীরতা",
              vanillaOrHtml: "সাধারণ Props Passing",
              reactEquivalent: "props={value}",
              note: "অল্প দূরত্বের জন্য Context আনা অপ্রয়োজনীয় জটিলতা সৃষ্টি করে।",
            },
            {
              feature: "৩. কম্পোনেন্ট কম্পোজিশন",
              vanillaOrHtml: "children Prop পাসিং",
              reactEquivalent: "<Card>{content}</Card>",
              note: "প্রপ ড্রিলিং এড়াতে অনেক সময় চিলড্রেন পাস করাই যথেষ্ট।",
            },
            {
              feature: "৪. দ্রুত পরিবর্তিত স্টেট",
              vanillaOrHtml: "সতর্কতা / Zustand / Redux",
              reactEquivalent: "Split Contexts",
              note: "প্রতি মিলি-সেকেন্ডে বদলানো স্টেট এক কনটেক্সটে রাখলে পুরো ট্রি রি-রেন্ডার হতে পারে।",
            },
          ]}
        />

        <CommonPitfall
          title="প্রোভাইডারের বাইরে useContext কল করা এবং টাইপ গার্ড না রাখা"
          mistakeDescription="useContext কল করে সরাসরি context.user এক্সেস করা, যেখানে প্রোভাইডার মিসিং থাকলে ক্র্যাশ করে।"
          solutionDescription="কাস্টম হুক বানিয়ে undefined কিনা তা চেক করে স্পষ্ট এরর মেসেজ ছুঁড়ে দেওয়া।"
          badCode={`// ❌ ঝুঁকিপূর্ণ সরাসরি ব্যবহার
function Profile() {
  const context = useContext(AuthContext);
  return <div>{context.user.name}</div>; // context undefined হলে TypeError ক্র্যাশ!
}`}
          goodCode={`// ✅ নিরাপদ কাস্টম হুক প্যাটার্ন
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth অবশ্যই একটি <AuthProvider> এর ভেতর কল করতে হবে।");
  }
  return context;
}`}
          whyItFails="যদি কোনো ডেভেলপার ভুলবশত প্রোভাইডার ট্রি-র বাইরে কম্পোনেন্টটি মাউন্ট করে, তবে কাস্টম গার্ড না থাকলে সাইট সাইলেন্ট ক্র্যাশ বা রহস্যময় বাগ তৈরি করে।"
        />
      </div>
    ),
  },
  {
    id: "nested-scope-context",
    filePath:
      "apps/react/app/04-state-architecture/4.2-context-api-and-use-context/nested-scope-context.tsx",
    title: "৩. Nested Scope ও Closest Provider Resolution",
    description:
      "একই Context প্রোভাইডারকে নেস্ট করে কীভাবে নির্দিষ্ট সাব-ট্রির মান ওভাররাইড করা যায় এবং React কীভাবে নিকটতম প্রোভাইডারের মান পড়ে তার বাস্তব ডেমো।",
    badge: "Provider Scoping",
    code: NestedScopeContextRaw,
    preview: <NestedScopeContext />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="tip" title="Closest Provider Resolution মেকানিক্স:">
          React-এর ভার্চুয়াল DOM-এ যখন কোনো চাইল্ড <code>useContext(MyContext)</code> ডাকে,
          React তার নিজের নোড থেকে শুরু করে প্যারেন্ট নোডের দিকে উপরের দিকে স্ক্যান করে।
          প্রথম যে <code>&lt;MyContext.Provider&gt;</code> টি পাওয়া যায়, ঠিক তার <code>value</code> টিই
          চাইল্ডে প্রদান করা হয়। এর উপরের প্রোভাইডারগুলোকে স্বয়ংক্রিয়ভাবে শ্যাডো (Shadow/Override) করে রাখা হয়।
        </ConceptAlert>

        <CommonPitfall
          title="Provider-এর value অবজেক্টে useMemo ছাড়া ইনলাইন অবজেক্ট পাস করা"
          mistakeDescription="<Context.Provider value={{ user, role, logout }}> এভাবে প্রতি রেন্ডারে নতুন অবজেক্ট রেফারেন্স পাস করা।"
          solutionDescription="useMemo দিয়ে value অবজেক্টকে মেমোইজ করা যাতে অপ্রয়োজনীয় রি-রেন্ডার রোধ করা যায়।"
          badCode={`// ❌ প্রতি প্যারেন্ট রেন্ডারে নতুন অবজেক্ট তৈরি হয়
<AuthContext.Provider value={{ user, theme }}>
  <App />
</AuthContext.Provider>`}
          goodCode={`// ✅ useMemo দিয়ে অবজেক্ট রেফারেন্স সুরক্ষিত রাখা
const value = useMemo(() => ({ user, theme }), [user, theme]);
<AuthContext.Provider value={value}>
  <App />
</AuthContext.Provider>`}
          whyItFails="React-এ Context কনজিউমাররা Object.is কম্প্যারিজনের মাধ্যমে চেক করে। ইনলাইন অবজেক্ট দিলে প্যারেন্ট রি-রেন্ডার হলে মান একই থাকলেও অবজেক্ট রেফারেন্স বদলে যায় এবং সব কনজিউমার চাইল্ড বাধ্য হয়ে রি-রেন্ডার হয়।"
        />
      </div>
    ),
  },
]

/**
 * ৪.২ Context API & useContext পেজ কম্পোনেন্ট
 */
export default function ContextApiPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="গ্লোবাল স্টেট • Level 4.2"
        title="Context API ও useContext Hook"
        description={
          <>
            গভীর কম্পোনেন্ট ট্রিতে প্রপ ড্রিলিং (Prop Drilling) ছাড়াই ডেটা সরবরাহ করার
            শক্তিশালী রিঅ্যাক্ট সিস্টেম। থিম, অথেন্টিকেশন ও ইউজার প্রেফারেন্সের মতো শেয়ার্ড
            ডেটা নিরাপদে ম্যানেজ করার আধুনিক সমাধান।
          </>
        }
        formula={{
          label: "Context Resolution Formula",
          value: "const Ctx = createContext() ➔ <Ctx.Provider value={v}> ➔ useContext(Ctx) reads closest v",
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
        question="React-এ Context API ব্যবহারের প্রধানতম সুবিধাজনক ক্ষেত্র কোনটি?"
        hint="মাঝামাঝি থাকা কম্পোনেন্টগুলোর ভেতর দিয়ে অপ্রয়োজনীয় প্রপস পাস করার কষ্ট লাঘবের কথা ভাবো।"
        options={[
          {
            text: "মাঝামাঝি থাকা মধ্যবর্তী কম্পোনেন্টগুলোকে দূষিত (Prop Drilling) না করে গভীর চাইল্ডে সরাসরি ডেটা টেলিপোর্ট করা।",
            isCorrect: true,
            feedback: "🎉 একেবারে সঠিক! Context API মূলত Prop Drilling দূর করে কোডবেসকে ক্লিন ও ডিকাপল্ড রাখে।",
          },
          {
            text: "সব ধরনের useState মুছে দিয়ে অ্যাপ্লিকেশনের সব ডেটা একমাত্র একটি গ্লোবাল কনটেক্সটে রাখা।",
            isCorrect: false,
            feedback: "❌ ভুল। লোকাল স্টেটের জন্য useState সর্বোত্তম। সব ডেটা এক কনটেক্সটে রাখলে বিশাল রি-রেন্ডার সমস্যা হবে।",
          },
          {
            text: "কম্পোনেন্টের রি-রেন্ডার সম্পূর্ণ বন্ধ করে পারফরম্যান্স বাড়ানো।",
            isCorrect: false,
            feedback: "❌ ভুল। কনটেক্সট মান পরিবর্তিত হলে সাবস্ক্রাইব করা প্রতিটি কনজিউমার চাইল্ড অবশ্যই রি-রেন্ডার হয়।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ৪.১ Lifting State Up",
          href: "/04-state-architecture/4.1-lifting-state-up",
        }}
        next={{
          title: "পরবর্তী: ৪.৩ useReducer Hook",
          href: "/04-state-architecture/4.3-use-reducer-hook",
        }}
      />
    </div>
  )
}
