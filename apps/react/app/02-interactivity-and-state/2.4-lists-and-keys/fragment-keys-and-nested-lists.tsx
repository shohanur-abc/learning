"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Layers, ChevronRight } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ২.৪ Lists & Keys: React.Fragment Key ও Nested Lists
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * ১. Fragment Key: কখনো কখনো লিস্টের একটি আইটেম থেকে পাশাপাশি একাধিক এলিমেন্ট
 *    রিটার্ন করতে হয় (যেমন <dt> ও <dd> অথবা রো ও ডিভাইডার)। শর্টহ্যান্ড `<>...</>`
 *    সিনট্যাক্সে কোনো প্রপস বা `key` দেওয়া যায় না। সেক্ষেত্রে পূর্ণাঙ্গ
 *    `<React.Fragment key={item.id}>...</React.Fragment>` ব্যবহার বাধ্যতামূলক।
 * ২. Nested Lists: ক্যাটাগরি এবং তার ভেতরে সাব-আইটেম রেন্ডার করতে নেস্টেড `.map()`
 *    ব্যবহার করা হয়। প্রতিটি লেভেলের নিজস্ব স্বতন্ত্র `key` থাকতে হবে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface SubTopic {
  readonly id: string
  readonly title: string
}

interface ModuleCategory {
  readonly categoryId: string
  readonly name: string
  readonly topics: readonly SubTopic[]
}

const MODULE_DATA: readonly ModuleCategory[] = [
  {
    categoryId: "mod-01",
    name: "Module 01: Foundations",
    topics: [
      { id: "top-11", title: "Imperative vs Declarative UI" },
      { id: "top-12", title: "JSX Rules & JavaScript Expressions" },
      { id: "top-13", title: "Components & Composition" },
      { id: "top-14", title: "Props & Children" },
    ],
  },
  {
    categoryId: "mod-02",
    name: "Module 02: Interactivity & State",
    topics: [
      { id: "top-21", title: "Event Handling & Synthetic Events" },
      { id: "top-22", title: "useState Deep Dive & Snapshot Model" },
      { id: "top-23", title: "Conditional Rendering Patterns" },
      { id: "top-24", title: "Lists & Keys (.map)" },
    ],
  },
]

export default function FragmentKeysAndNestedLists() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            React.Fragment Key ও নেস্টেড লিস্ট
          </span>
          <p className="text-xs text-muted-foreground">
            বাড়তি <code>&lt;div&gt;</code> ছাড়া পাশাপাশি মাল্টিপল এলিমেন্ট রেন্ডারিং
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          React.Fragment
        </Badge>
      </div>

      {/* নেস্টেড ডেটা স্ট্রাকচার রেন্ডারিং */}
      <div className="space-y-4">
        {MODULE_DATA.map((moduleItem) => (
          // ✅ আউটার লুপে React.Fragment key={moduleItem.categoryId}
          <React.Fragment key={moduleItem.categoryId}>
            <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-primary" />
                <h4 className="text-xs font-semibold text-foreground">
                  {moduleItem.name}
                </h4>
                <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                  Key: {moduleItem.categoryId}
                </span>
              </div>

              {/* ইনার নেস্টেড লিস্ট */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                {moduleItem.topics.map((topic) => (
                  // ✅ ইনার লুপে স্বতন্ত্র key={topic.id}
                  <div
                    key={topic.id}
                    className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs"
                  >
                    <ChevronRight className="size-3 text-muted-foreground shrink-0" />
                    <span className="font-medium text-foreground truncate">
                      {topic.title}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground ml-auto shrink-0">
                      {topic.id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="text-xs text-muted-foreground leading-relaxed bg-muted/40 p-3 rounded-md border border-border/50">
        💡 <strong>সিনট্যাক্স নোট:</strong> রিঅ্যাক্টে <code>&lt;&gt;...&lt;/&gt;</code> শর্টহ্যান্ড ফ্র্যাগমেন্টে <code>key</code> প্রোপার্টি সাপোর্ট করে না। কোনো লিস্টের মধ্যে ফ্র্যাগমেন্ট রিটার্ন করতে হলে সর্বদা <code>&lt;React.Fragment key=&#123;id&#125;&gt;</code> লিখতে হবে।
      </div>
    </div>
  )
}
