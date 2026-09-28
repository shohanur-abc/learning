"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Badge } from "@workspace/ui/components/badge"
import { AlertCircle, CheckCircle } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ২.৪ Lists & Keys: Index as Key Anti-Pattern বনাম Stable ID Keys
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React এলিমেন্ট ম্যাচিংয়ের জন্য `key` ব্যবহার করে।
 * - যদি `key={index}` ব্যবহার করা হয় এবং তালিকার শুরুতে নতুন আইটেম যোগ করা হয়,
 *   তবে পুরনো আইটেমগুলোর ইনডেক্স ১ করে সরে যায়। React মনে করে ইনডেক্স ০ এর
 *   এলিমেন্ট একই রয়েছে, ফলে ইনপুট ফিল্ডের লোকাল স্টেট (যা DOM নোডে ছিল) ভুল
 *   আইটেমে স্থানান্তরিত হয়ে যায়!
 * - যদি `key={item.id}` ব্যবহার করা হয়, তবে React প্রতিটি আইটেমের আসল অস্তিত্ব
 *   চিনতে পারে এবং স্টেট সর্বদা সঠিক আইটেমের সাথে সংযুক্ত থাকে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface TodoItem {
  readonly id: string
  readonly text: string
}

export default function IndexVsStableKeyDemo() {
  const [items, setItems] = React.useState<readonly TodoItem[]>([
    { id: "id-1", text: "React Foundations শেষ করা" },
    { id: "id-2", text: "useState মেকানিক্স অনুশীলন" },
  ])

  // তালিকার শীর্ষে (Unshift) নতুন আইটেম যোগ করা
  function handleAddToTop() {
    const newItem: TodoItem = {
      id: `id-${Date.now().toString().slice(-4)}`,
      text: `নতুন টাস্ক #${items.length + 1}`,
    }
    setItems((prev) => [newItem, ...prev])
  }

  function handleReset() {
    setItems([
      { id: "id-1", text: "React Foundations শেষ করা" },
      { id: "id-2", text: "useState মেকানিক্স অনুশীলন" },
    ])
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Index বনাম Stable ID Key স্ট্রেস টেস্ট
          </span>
          <p className="text-xs text-muted-foreground">
            নিচের যেকোনো ইনপুট বক্সে কিছু টাইপ করে &ldquo;শীর্ষে নতুন আইটেম যোগ&rdquo; বাটনে ক্লিক করো
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="xs" variant="default" onClick={handleAddToTop}>
            + শীর্ষে নতুন আইটেম যোগ
          </Button>
          <Button size="xs" variant="outline" onClick={handleReset}>
            রিসেট
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* কলাম ১: Index as Key (ভুল পদ্ধতি) */}
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-destructive flex items-center gap-1">
              <AlertCircle className="size-3.5" />
              ভুল: <code>key=&#123;index&#125;</code>
            </span>
            <Badge variant="destructive" className="text-[10px]">
              Anti-Pattern
            </Badge>
          </div>

          <p className="text-[11px] text-muted-foreground">
            এখানে শীর্ষে যোগ করলে টাইপ করা লেখা ভুল আইটেমে আটকে থাকবে!
          </p>

          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                // ❌ অ্যান্টি-প্যাটার্ন: index as key
                key={index}
                className="rounded-md border border-border bg-background p-2.5 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">
                    {item.text}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    index: {index}
                  </span>
                </div>
                {/* আনকন্ট্রোল্ড ইনপুট যা DOM নোডের মেমোরিতে স্টেট ধরে রাখে */}
                <Input
                  placeholder="এখানে নোট লিখুন..."
                  className="text-xs h-7"
                />
              </div>
            ))}
          </div>
        </div>

        {/* কলাম ২: Stable Unique Key (সঠিক পদ্ধতি) */}
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle className="size-3.5" />
              সঠিক: <code>key=&#123;item.id&#125;</code>
            </span>
            <Badge
              variant="outline"
              className="text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/40"
            >
              Recommended
            </Badge>
          </div>

          <p className="text-[11px] text-muted-foreground">
            এখানে শীর্ষে যোগ করলেও টাইপ করা লেখা তার নির্দিষ্ট আইটেমের সাথেই থাকবে।
          </p>

          <div className="space-y-2">
            {items.map((item) => (
              <div
                // ✅ রিকমেন্ডেড: stable unique id as key
                key={item.id}
                className="rounded-md border border-border bg-background p-2.5 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">
                    {item.text}
                  </span>
                  <span className="font-mono text-[10px] text-primary">
                    key: {item.id}
                  </span>
                </div>
                {/* আনকন্ট্রোল্ড ইনপুট */}
                <Input
                  placeholder="এখানে নোট লিখুন..."
                  className="text-xs h-7"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
