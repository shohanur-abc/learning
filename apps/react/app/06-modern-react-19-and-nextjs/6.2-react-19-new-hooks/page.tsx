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
import UseActionStateForm from "./use-action-state-form"
import UseActionStateFormRaw from "./use-action-state-form.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import UseFormStatusButton from "./use-form-status-button"
import UseFormStatusButtonRaw from "./use-form-status-button.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import UseOptimisticUpdates from "./use-optimistic-updates"
import UseOptimisticUpdatesRaw from "./use-optimistic-updates.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

// ── ২. শোকেস আইটেমস ও শিক্ষণীয় নোটস ───────────────────────────────────────
const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "use-action-state-form",
    filePath:
      "apps/react/app/06-modern-react-19-and-nextjs/6.2-react-19-new-hooks/use-action-state-form.tsx",
    title: "১. useActionState: Native Form Actions",
    description:
      "ম্যানুয়াল লোডিং স্টেট বা try/catch ছাড়া অ্যাসিনক্রোনাস ফর্ম সাবমিশন, পেন্ডিং স্টেট ও রেসপন্স পরিচালনার আধুনিক রিঅ্যাক্ট ১৯ হুক।",
    badge: "useActionState",
    code: UseActionStateFormRaw,
    preview: <UseActionStateForm />,
    learningNotes: (
      <RuleTable
        title="React 18 বনাম React 19 ফর্ম হ্যান্ডলিং রূপান্তর:"
        rows={[
          {
            feature: "লোডিং স্টেট ট্র্যাকিং",
            vanillaOrHtml: "React 18: ম্যানুয়াল const [isLoading, setIsLoading] = useState(false)",
            reactEquivalent: "React 19: useActionState-এর তৃতীয় রিটার্ন ভ্যালু (isPending)",
            note: "React ট্রানজিশনের সাথে ইন্টিগ্রেট করে অটোমেটিক স্টেট পরিচালনা করে।",
          },
          {
            feature: "সাবমিশন হ্যান্ডলার বাইন্ডিং",
            vanillaOrHtml: "React 18: onSubmit={(e) => { e.preventDefault(); ... }}",
            reactEquivalent: "React 19: <form action={formAction}>",
            note: "JavaScript অক্ষম থাকলেও প্রোগ্রেসিভ এনহ্যান্সমেন্ট বজায় থাকে।",
          },
          {
            feature: "রেসপন্স ডেটা ও এরর রিটার্ন",
            vanillaOrHtml: "React 18: আলাদা আলাদা useState (error, result)",
            reactEquivalent: "React 19: অ্যাকশন ফাংশনের রিটার্ন ভ্যালুই সরাসরি state অবজেক্ট",
            note: "স্টেট আপডেট এবং লোডিং ফ্ল্যাগ একই ট্রানজিশনে সিঙ্ক হয়।",
          },
        ]}
      />
    ),
  },
  {
    id: "use-form-status-button",
    filePath:
      "apps/react/app/06-modern-react-19-and-nextjs/6.2-react-19-new-hooks/use-form-status-button.tsx",
    title: "২. useFormStatus: Decoupled Submit Indicator",
    description:
      "প্যারেন্ট ফর্ম থেকে কোনো প্রপ ড্রিলিং ছাড়া যেকোনো নেস্টেড চাইল্ড কম্পোনেন্ট থেকে ফর্মের pending স্ট্যাটাস রিড করার প্যাটার্ন।",
    badge: "useFormStatus",
    code: UseFormStatusButtonRaw,
    preview: <UseFormStatusButton />,
    learningNotes: (
      <CommonPitfall
        title="প্যারেন্ট ফর্মে useFormStatus কল করার ভুল"
        mistakeDescription="যে কম্পোনেন্টে <form> ট্যাগ রেন্ডার হচ্ছে সেখানেই useFormStatus কল করা:"
        badCode={`// ❌ ভুল কোড: Parent কম্পোনেন্টে useFormStatus কাজ করবে না!
export default function MyForm() {
  const { pending } = useFormStatus() // ⚠️ সবসময় false থাকবে!
  return (
    <form action={submitAction}>
      <button disabled={pending}>Submit</button>
    </form>
  )
}`}
        solutionDescription="সাবমিট বাটনটিকে একটি পৃথক চাইল্ড কম্পোনেন্টে রূপান্তর করা:"
        goodCode={`// ✅ সঠিক কোড: Child কম্পোনেন্টে useFormStatus কল করুন
function SubmitButton() {
  const { pending } = useFormStatus() // ✅ প্যারেন্ট ফর্মের কনটেক্সট পড়তে পারবে
  return <button disabled={pending}>Submit</button>
}

export default function MyForm() {
  return (
    <form action={submitAction}>
      <SubmitButton />
    </form>
  )
}`}
        whyItFails="useFormStatus ইন্টারনালি React-এর ফর্ম কনটেক্সট ব্যবহার করে। প্যারেন্ট কম্পোনেন্টটি যখন এক্সিকিউট হয় তখনো <form> তৈরি হয়নি, ফলে কনটেক্সট শূন্য থাকে। শুধুমাত্র ফর্মের অভ্যন্তরীণ চাইল্ডেই এই স্ট্যাটাস উপলভ্য হয়।"
      />
    ),
  },
  {
    id: "use-optimistic-updates",
    filePath:
      "apps/react/app/06-modern-react-19-and-nextjs/6.2-react-19-new-hooks/use-optimistic-updates.tsx",
    title: "৩. useOptimistic: Zero-Latency UI Updates",
    description:
      "সার্ভার কনফার্মেশন আসার পূর্বেই ব্রাউজারে অবিলম্বে তাৎক্ষণিক ভিজ্যুয়াল ফিডব্যাক প্রদর্শন করার অপ্টিমিস্টিক প্যাটার্ন।",
    badge: "useOptimistic",
    code: UseOptimisticUpdatesRaw,
    preview: <UseOptimisticUpdates />,
    learningNotes: (
      <div className="space-y-4">
        <ConceptAlert type="tip" title="Optimistic UI-এর গুরুত্ব:">
          ব্যবহারকারী যখন লাইক, ভোট বা কমেন্ট করেন, তখন ১ সেকেন্ড নেটওয়ার্ক স্পিনারের দিকে তাকিয়ে থাকা অত্যন্ত বিরক্তিকর। <code>useOptimistic</code>-এর মাধ্যমে ব্যবহারকারী ক্লিক করার <strong>০ মিলিসেকেন্ডে</strong> আপডেট দেখতে পান, আর পেছনের ব্যাকগ্রাউন্ডে সার্ভার কল চলতে থাকে।
        </ConceptAlert>

        <ComparisonGrid
          left={{
            title: "Traditional Pessimistic UI",
            badge: "Slow UX",
            variant: "destructive",
            description: "সার্ভার নিশ্চিত না করা পর্যন্ত ইউজার আটকে থাকে:",
            items: [
              "বাটনে ক্লিক করার পর লোডিং স্পিনার প্রদর্শিত হয়।",
              "নেটওয়ার্ক ধীরগতি হলে অ্যাপ ল্যাগি অনুভূত হয়।",
              "ব্যবহারকারীর মনোযোগ বিচ্ছিন্ন হয়।",
            ],
          }}
          right={{
            title: "React 19 Optimistic UI",
            badge: "Instant UX",
            variant: "emerald",
            description: "সাফল্য ধরে নিয়ে সাথে সাথে UI আপডেট হয়:",
            items: [
              "বাটনে ক্লিক করার সাথে সাথে সংখ্যা বৃদ্ধি পায়।",
              "ব্যাকগ্রাউন্ডে ট্রানজিশন চলে—ইউজার কোনো বাধা পায় না।",
              "ব্যর্থ হলে React স্বয়ংক্রিয়ভাবে আগের সঠিক স্টেটে ফিরে যায়।",
            ],
          }}
        />
      </div>
    ),
  },
]

// ── ৩. মূল পেজ কম্পোনেন্ট ───────────────────────────────────────────────────
export default function React19NewHooksPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* টপিক হিরো ব্যানার */}
      <TopicHero
        badge="রিঅ্যাক্ট ১৯ • Level 6.2"
        title="React 19 New Hooks: Actions, Status & Optimistic UI"
        description={
          <>
            React 19-এ ফর্ম পরিচালনা এবং অ্যাসিনক্রোনাস ট্রানজিশনের জন্য তিনটি অত্যন্ত গুরুত্বপূর্ণ
            নেটিভ হুক যুক্ত হয়েছে: <code>useActionState</code>, <code>useFormStatus</code> এবং{" "}
            <code>useOptimistic</code>। এগুলো ম্যানুয়াল লোডিং স্টেট, প্রপ ড্রিলিং এবং ধীরগতির UI এক্সপেরিয়েন্স দূর করে।
          </>
        }
        formula={{
          label: "React 19 Hooks",
          value: "useActionState + useFormStatus + useOptimistic",
        }}
      />

      {/* ইন্টারেক্টিভ শোকেস ও কোড এক্সপ্লোরার */}
      <ExamplePageShell
        title="ইন্টারেক্টিভ ডেমো ও কোড এক্সপ্লোরার"
        description="নিচের ৩টি ডেমো প্র্যাকটিস করো এবং কোডের বাস্তব প্রয়োগ দেখতে 'Code' ট্যাবে বা ফাইলের লিঙ্কে ক্লিক করো।"
        items={showcaseItems}
      />

      {/* কনসেপ্ট যাচাই কুইজ */}
      <ConceptQuiz
        question="React 19-এর useFormStatus হুকটি ব্যবহারের আবশ্যকীয় নিয়ম কোনটি?"
        hint="মনে রাখবেন: হুকটি প্যারেন্ট ফর্মের স্ট্যাটাস কনটেক্সটের মাধ্যমে পড়ে।"
        options={[
          {
            text: "হুকটিকে অবশ্যই <form>-এর ভেতরের কোনো Child কম্পোনেন্টে কল করতে হবে, ফর্ম রেন্ডারকারী প্যারেন্ট কম্পোনেন্টে নয়।",
            isCorrect: true,
            feedback: "🎉 সঠিক! useFormStatus ফর্মের ইন্টারনাল কনটেক্সট পড়ে। তাই <form> ট্যাগ যে কম্পোনেন্টে আছে তার ভেতর কল করলে স্ট্যাটাস পাওয়া যায় না।",
          },
          {
            text: "এটিকে শুধুমাত্র সার্ভার কম্পোনেন্টে (RSC) কল করতে হবে।",
            isCorrect: false,
            feedback: "❌ ভুল! useFormStatus ব্রাউজারের ফর্ম সাবমিশন স্টেট পড়ে, তাই এটি একটি Client Hook ('use client' ফাইলে চলে)।",
          },
          {
            text: "এটির জন্য বাধ্যতামূলকভাবে Redux বা কোনো থার্ড পার্টি স্টেট লাইব্রেরি থাকতে হবে।",
            isCorrect: false,
            feedback: "❌ ভুল! useFormStatus হলো React 19 এবং react-dom-এর বিল্ট-ইন নেটিভ ফিচার, কোনো বাহ্যিক লাইব্রেরি লাগে না।",
          },
        ]}
      />

      {/* পেজিনেশন নেভিগেশন */}
      <TopicPagination
        linkComponent={Link}
        previous={{
          title: "পূর্ববর্তী: ৬.১ Server vs Client Components",
          href: "/06-modern-react-19-and-nextjs/6.1-server-vs-client-components",
        }}
        next={{
          title: "পরবর্তী: ৬.৩ Tailwind & Shadcn Architecture",
          href: "/06-modern-react-19-and-nextjs/6.3-tailwind-and-shadcn-architecture",
        }}
      />
    </div>
  )
}
