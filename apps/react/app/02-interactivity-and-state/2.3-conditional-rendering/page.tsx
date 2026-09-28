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
import GuardReturnsAndTernary from "./guard-returns-and-ternary"
import GuardReturnsAndTernaryRaw from "./guard-returns-and-ternary.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import ShortCircuitAndZeroTrap from "./short-circuit-and-zero-trap"
import ShortCircuitAndZeroTrapRaw from "./short-circuit-and-zero-trap.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import SwitchAndNullRendering from "./switch-and-null-rendering"
import SwitchAndNullRenderingRaw from "./switch-and-null-rendering.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ───────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "guard-returns-and-ternary",
    filePath:
      "apps/react/app/02-interactivity-and-state/2.3-conditional-rendering/guard-returns-and-ternary.tsx",
    title: "১. Early Guard Returns এবং Ternary Operator",
    description:
      "ফাংশনের শুরুতেই শর্তাধীন আর্লি রিটার্ন এবং JSX-এর ভেতর বাইনারি সিদ্ধান্তের জন্য টারনারি অপারেটরের ব্যবহার।",
    badge: "Guards & Ternary",
    code: GuardReturnsAndTernaryRaw,
    preview: <GuardReturnsAndTernary />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="info" title="Early Return গার্ড প্যাটার্ন:">
          যদি কোনো ডেটা অনুপস্থিত থাকে (যেমন: <code>isLoading</code> অথবা{" "}
          <code>!user</code>), তবে কম্পোনেন্টের মূল লজিক চালানোর আগেই শুরুতে{" "}
          <code>return &lt;LoadingSpinner /&gt;</code> করে দেওয়াকে Guard Clause
          বলে। এটি JSX-এর গভীর নেস্টেড <code>if-else</code> জট দূর করে কোডকে
          ক্লিন ও রিডেবল রাখে।
        </ConceptAlert>

        <ComparisonGrid
          left={{
            title: "নেস্টেড কন্ডিশনাল জট",
            badge: "Hard to Read",
            variant: "destructive",
            description: "JSX-এর ভেতর গভীর নেস্টেড টারনারি লেখা:",
            items: [
              "<code>{isLoading ? &lt;Spin/&gt; : isError ? &lt;Err/&gt; : ...}</code>",
              "কোড পড়া অত্যন্ত কঠিন হয়ে দাঁড়ায় এবং ব্র্যাকেট মেলানো কষ্টকর হয়।",
              "কোন কন্ডিশনে কোন UI রেন্ডার হচ্ছে তা ট্র্যাক করা যায় না।",
            ],
          }}
          right={{
            title: "আর্লি রিটার্ন গার্ড ক্লজ",
            badge: "Clean Architecture",
            variant: "emerald",
            description: "ফাংশনের শীর্ষে শর্ত পরীক্ষা করে আগেভাগে রিটার্ন করা:",
            items: [
              "<code>if (isLoading) return &lt;Spin /&gt;;</code>",
              "<code>if (error) return &lt;ErrorCard /&gt;;</code>",
              "মূল JSX অংশটি কোনো অতিরিক্ত কন্ডিশন ছাড়াই ক্লিন থাকে।",
            ],
          }}
        />
      </div>
    ),
  },
  {
    id: "short-circuit-and-zero-trap",
    filePath:
      "apps/react/app/02-interactivity-and-state/2.3-conditional-rendering/short-circuit-and-zero-trap.tsx",
    title: "২. Short-Circuit (&&) এবং ০ (Zero) রেন্ডারিংয়ের ফাঁদ",
    description:
      "ঐচ্ছিক এলিমেন্ট দেখাতে && এর ব্যবহার এবং unreadCount=0 হলে কেন স্ক্রিনে '0' প্রিন্ট হয়ে যায় তার সমাধান।",
    badge: "Logical AND Trap",
    code: ShortCircuitAndZeroTrapRaw,
    preview: <ShortCircuitAndZeroTrap />,
    learningNotes: (
      <CommonPitfall
        title="0 && <Component /> ফাঁদে পড়ে স্ক্রিনে অনাকাঙ্ক্ষিত '0' প্রিন্ট হওয়া"
        mistakeDescription="সরাসরি সংখ্যার সাথে লজিক্যাল AND দিয়ে কম্পোনেন্ট রেন্ডার করা:"
        solutionDescription="বুলিয়ান তুলনা (count > 0) অথবা Boolean(count) নিশ্চিত করা:"
        badCode={`// ❌ ভুল: messages.length যখন ০, তখন স্ক্রিনে '0' প্রিন্ট হয়ে থাকে!
{messages.length && <Badge>{messages.length}টি মেসেজ</Badge>}`}
        goodCode={`// ✅ সঠিক: স্পষ্ট বুলিয়ান এক্সপ্রেশন ব্যবহার করা
{messages.length > 0 && <Badge>{messages.length}টি মেসেজ</Badge>}

// অথবা টারনারি অপারেটর:
{messages.length > 0 ? <Badge>{messages.length}টি মেসেজ</Badge> : null}`}
        whyItFails="জাভাস্ক্রিপ্টে 0 && <Component /> এক্সপ্রেশনটি মূল্যায়ন করলে প্রথম ফলসি মান 0 সরাসরি রিটার্ন হয়। React-এ false, null, undefined স্ক্রিনে কিছু রেন্ডার না করলেও সংখ্যা (যেমন 0) ভ্যালিড টেক্সট হিসেবে স্ক্রিনে প্রদর্শিত হয়।"
      />
    ),
  },
  {
    id: "switch-and-null-rendering",
    filePath:
      "apps/react/app/02-interactivity-and-state/2.3-conditional-rendering/switch-and-null-rendering.tsx",
    title: "৩. Record/Dictionary ম্যাপিং ও Null Rendering",
    description:
      "একাধিক স্টেট হ্যান্ডল করার ক্লিন প্যাটার্ন এবং উপাদান সাময়িকভাবে আনমাউন্ট রাখতে null রিটার্ন করা।",
    badge: "Multi-state & Null",
    code: SwitchAndNullRenderingRaw,
    preview: <SwitchAndNullRendering />,
    learningNotes: (
      <RuleTable
        title="Conditional Rendering প্যাটার্ন চিটশিট:"
        rows={[
          {
            feature: "Early Guard Return",
            vanillaOrHtml: "ফাংশনের শীর্ষে if (condition) return",
            reactEquivalent: "if (isLoading) return <Skeleton />;",
            note: "পুরো কম্পোনেন্ট ব্লক করতে বা লোডিং দেখাতে সেরা।",
          },
          {
            feature: "Ternary Operator (?:)",
            vanillaOrHtml: "condition ? valA : valB",
            reactEquivalent: "isAuth ? <Dashboard /> : <Login />",
            note: "দুটি বিকল্পের যেকোনো একটি বেছে নেওয়ার জন্য আদর্শ।",
          },
          {
            feature: "Short-Circuit (&&)",
            vanillaOrHtml: "condition && val",
            reactEquivalent: "count > 0 && <Badge />",
            note: "শর্ত সত্য হলে কিছু দেখানো, মিথ্যা হলে কিছুই না। ০ ফাঁদ এড়িয়ে চলুন।",
          },
          {
            feature: "Null Rendering",
            vanillaOrHtml: "return null;",
            reactEquivalent: "!isOpen ? null : <Modal />",
            note: "DOM নোড তৈরি না করে উপাদানকে সম্পূর্ণ খালি রাখতে ব্যবহৃত হয়।",
          },
        ]}
      />
    ),
  },
]

// ── ৩. মূল পেজ কম্পোনেন্ট ───────────────────────────────────────────────────
export default function ConditionalRenderingPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="কন্ডিশনাল UI • Level 2.3"
        title="Conditional Rendering কৌশলসমূহ"
        description={
          <>
            অ্যাপ্লিকেশনের স্টেট ও ডেটার বর্তমান অবস্থার ওপর নির্ভর করে
            গতিশীলভাবে ভিন্ন ভিন্ন UI প্রদর্শন করা।{" "}
            <strong>Early Guard Return</strong>, <strong>Ternary অপারেটর</strong>,{" "}
            <strong>Logical AND (&&)</strong> এবং কুখ্যাত{" "}
            <strong>০ (Zero) রেন্ডারিং ফাঁদ</strong> এড়ানোর আধুনিক নির্দেশিকা।
          </>
        }
        formula={{
          label: "Conditional Pattern",
          value: "condition ? <ComponentA /> : <ComponentB />",
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
        question="যদি const cartItemsCount = 0 হয়, তবে {cartItemsCount && <CartBadge />} লিখলে স্ক্রিনে কী দেখাবে?"
        hint="জাভাস্ক্রিপ্ট শর্ট সার্কিট এবং রিঅ্যাক্টের সংখ্যা রেন্ডারিং আচরণ বিবেচনা করো।"
        options={[
          {
            text: "স্ক্রিনে কিছুই দেখাবে না (ফাঁকা থাকবে)",
            isCorrect: false,
            feedback: "❌ ভুল! React-এ false বা null স্ক্রিনে ফাঁকা থাকে, কিন্তু সংখ্যা ০ ভ্যালিড টেক্সট হিসেবে প্রিন্ট হয়।",
          },
          {
            text: "স্ক্রিনে '0' সংখ্যাটি প্রদর্শিত হবে",
            isCorrect: true,
            feedback: "🎉 সঠিক! জাভাস্ক্রিপ্টে 0 && <CartBadge /> এক্সপ্রেশনটি 0 রিটার্ন করে, এবং React কোনো সংখ্যাকে বৈধ UI কন্টেন্ট হিসেবে DOM-এ এঁকে দেয়। এটি এড়াতে cartItemsCount > 0 && <CartBadge /> লিখতে হয়।",
          },
          {
            text: "CartBadge কম্পোনেন্টটি শূন্য মান নিয়ে রেন্ডার হবে",
            isCorrect: false,
            feedback: "❌ ভুল! শর্ট-সার্কিটের কারণে CartBadge এক্সিকিউটই হবে না, শুধু 0 সংখ্যাটি রিটার্ন হবে।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ২.২ useState Deep Dive",
          href: "/02-interactivity-and-state/2.2-use-state-deep-dive",
        }}
        next={{
          title: "পরবর্তী: ২.৪ Lists & Keys (.map)",
          href: "/02-interactivity-and-state/2.4-lists-and-keys",
        }}
      />
    </div>
  )
}
