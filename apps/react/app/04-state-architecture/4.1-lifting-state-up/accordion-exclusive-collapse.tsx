"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { ChevronDown, Layers, HelpCircle } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৪.১ Lifting State Up: Accordion Exclusive Collapse
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * একটি অ্যাকর্ডিয়ন সেকশনে যদি একই সাথে কেবল একটি আইটেম খোলা (Expanded) রাখার নিয়ম থাকে,
 * তবে প্রতিটি প্যানেলে নিজস্ব `isOpen` স্টেট রাখা অসম্ভব। কারণ প্যানেল-১ জানে না
 * কখন প্যানেল-২ ওপেন করা হলো।
 * স্টেটকে প্যারেন্ট কন্টেইনারে `activeId` হিসেবে তুলে এনে প্রতিটি প্যানেলে
 * `isOpen={activeId === id}` বুলিয়ান প্রপ এবং `onToggle` কলব্যাক পাঠাতে হয়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. চাইল্ডরা 'Controlled Component'-এ রূপান্তরিত হয় (তারা নিজেদের ওপেন/ক্লোজ স্টেট নিজেরা নিয়ন্ত্রণ করে না)।
 * ২. প্যারেন্ট সিদ্ধান্ত নেয় কোন আইটেমটি প্রদর্শিত হবে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface AccordionItemData {
  readonly id: string
  readonly title: string
  readonly category: string
  readonly content: string
}

const FAQ_DATA: readonly AccordionItemData[] = [
  {
    id: "lifting-intro",
    title: "Lifting State Up আসলে কী?",
    category: "Architecture",
    content:
      "যখন একাধিক কম্পোনেন্ট একই ডেটা শেয়ার করতে বা সিঙ্ক্রোনাইজড থাকতে চায়, তখন লোকাল স্টেটকে সিবলিংদের থেকে সরিয়ে তাদের নিকটতম কমন প্যারেন্টে (Common Ancestor) নিয়ে আসাকেই Lifting State Up বলা হয়।",
  },
  {
    id: "single-source",
    title: "Single Source of Truth কেন প্রয়োজন?",
    category: "Principle",
    content:
      "অ্যাপ্লিকেশনের কোনো ডেটা যেন কেবল একটি নির্দিষ্ট জায়গায় সংরক্ষিত থাকে। যদি একই তথ্য দুটি আলাদা চাইল্ডের লোকাল স্টেটে ডুপ্লিকেট থাকে, তবে একটি আপডেট হয়ে অন্যটি পুরনো থেকে যাওয়ার মারাত্মক ঝুঁকি তৈরি হয়।",
  },
  {
    id: "when-to-lift",
    title: "কখন স্টেট উপরে তুলতে হয় এবং কখন নয়?",
    category: "Best Practice",
    content:
      "যদি কোনো স্টেট কেবল একটি নির্দিষ্ট কম্পোনেন্টের ভিজ্যুয়াল পরিবর্তনের জন্য লাগে (যেমন হোভার বা সাধারণ লোকাল ড্রপডাউন), তবে তা লোকাল রাখুন। কিন্তু যদি অন্য কোনো সিবলিং বা দূরবর্তী অংশ সেই তথ্যের ওপর নির্ভর করে, তখনই কেবল স্টেট Lift করুন।",
  },
]

interface AccordionPanelProps {
  readonly item: AccordionItemData
  readonly isOpen: boolean
  readonly onToggle: () => void
}

/** Controlled সিবলিং কম্পোনেন্ট: কোনো নিজস্ব `isOpen` স্টেট নেই */
function AccordionPanel({ item, isOpen, onToggle }: AccordionPanelProps) {
  return (
    <div className="rounded-lg border border-border bg-card/70 overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between p-3.5 text-left text-sm font-medium text-foreground hover:bg-accent/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="size-4 text-primary shrink-0" />
          <span>{item.title}</span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            {item.category}
          </Badge>
        </div>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>

      {isOpen && (
        <div className="border-t border-border/60 bg-muted/20 p-3.5 text-xs text-muted-foreground leading-relaxed">
          {item.content}
        </div>
      )}
    </div>
  )
}

/**
 * প্যারেন্ট অ্যাকর্ডিয়ন কন্টেইনার: `activeId` স্টেট ধারণ করে মিউচুয়াল এক্সক্লুসিভ এক্সপ্যানশন নিশ্চিত করে
 */
export default function AccordionExclusiveCollapse() {
  // প্যারেন্ট জানে বর্তমানে কোন প্যানেলটি খোলা আছে (null মানে সবগুলো বন্ধ)
  const [activeId, setActiveId] = React.useState<string | null>("lifting-intro")

  const handleToggle = (id: string) => {
    // ইতোমধ্যে খোলা থাকলে ক্লিক করলে বন্ধ হবে, অন্যথায় নতুন প্যানেলটি খুলবে
    setActiveId((current) => (current === id ? null : id))
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Exclusive Accordion (মিউচুয়াল এক্সক্লুসিভ)
          </span>
        </div>
        <Badge variant="secondary" className="text-xs">
          সক্রিয় প্যানেল: {activeId ?? "সবগুলো বন্ধ"}
        </Badge>
      </div>

      <div className="space-y-2.5">
        {FAQ_DATA.map((item) => (
          <AccordionPanel
            key={item.id}
            item={item}
            isOpen={activeId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>

      <div className="rounded-md bg-muted/40 p-2.5 text-[11px] text-muted-foreground">
        📌 <strong>মডেল বিশ্লেষণ:</strong> যেকোনো একটি প্যানেল খুললে স্বয়ংক্রিয়ভাবে অন্য প্যানেলটি বন্ধ হয়ে যায়।
        প্যানেলগুলো সিবলিং হওয়া সত্ত্বেও প্যারেন্টের <code>activeId</code> স্টেট তাদের আচরণ নিয়ন্ত্রণ করছে।
      </div>
    </div>
  )
}
