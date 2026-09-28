"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Badge } from "@workspace/ui/components/badge"
import { RenderPulse } from "@workspace/ui/components/custom/learning-components"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৫.২ useMemo: Caching Expensive Computations
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * `useMemo` একটি ক্যালকুলেশনের রিটার্ন ভ্যালুকে মেমোরিতে ক্যাশ করে রাখে।
 * ডিপেন্ডেন্সি অ্যারের মান পরিবর্তিত না হওয়া পর্যন্ত প্রতি রেন্ডারে পুনরায় সেই ব্যয়বহুল
 * হিসাব না করে পূর্বের ক্যাশ করা মান সরাসরি ফেরত দেয়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `useMemo(() => calculate(a, b), [a, b])`
 * ২. সম্পর্কহীন স্টেট পরিবর্তনের কারণে কম্পোনেন্ট রি-রেন্ডার হলেও ভারী হিসাব স্কিপ হয়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface ProductItem {
  readonly id: number
  readonly name: string
  readonly category: string
  readonly price: number
}

const initialProducts: readonly ProductItem[] = [
  { id: 1, name: "React 19 Mastery Book", category: "বই", price: 650 },
  { id: 2, name: "Next.js App Router Guide", category: "বই", price: 820 },
  { id: 3, name: "Mechanical Keyboard", category: "হার্ডওয়্যার", price: 4500 },
  { id: 4, name: "Ergonomic Desk Chair", category: "ফার্নিচার", price: 12500 },
  { id: 5, name: "Ultra-Wide Monitor 34\"", category: "হার্ডওয়্যার", price: 38000 },
  { id: 6, name: "TypeScript Deep Dive", category: "বই", price: 750 },
]

export default function UseMemoCalculation() {
  const [query, setQuery] = React.useState("")
  const [unrelatedCount, setUnrelatedCount] = React.useState(0)

  // ক্যালকুলেশন কাউন্টার: useMemo-এর হিসাব কতবার পরিবর্তিত হয়েছে তা ট্র্যাক করা
  const [calculationRunCount, setCalculationRunCount] = React.useState(1)

  // useMemo দিয়ে ফিল্টারিং এবং সামারি ক্যালকুলেশন মেমোইজ করা
  const filteredData = React.useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const matches = initialProducts.filter((item) =>
      item.name.toLowerCase().includes(normalized) ||
      item.category.toLowerCase().includes(normalized)
    )

    const totalValue = matches.reduce((sum, item) => sum + item.price, 0)

    return {
      items: matches,
      totalValue,
    }
  }, [query])

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      {/* হেডার ও রেন্ডার ট্র্যাকার */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            useMemo: ব্যয়বহুল হিসাব মেমোইজেশন
          </h4>
          <p className="text-xs text-muted-foreground">
            ডিপেন্ডেন্সি (search query) না বদলালে ভারী হিসাব পুনরায় চলবে না
          </p>
        </div>
        <RenderPulse label="কম্পোনেন্ট রেন্ডার" />
      </div>

      {/* কন্ট্রোল প্যানেল */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* সার্চ ইনপুট (ডিপেন্ডেন্সি) */}
        <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              সার্চ ফিল্টার (ডিপেন্ডেন্সি)
            </span>
            <Badge variant="outline" className="text-xs">
              ম্যাচ: {filteredData.items.length}টি
            </Badge>
          </div>
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setCalculationRunCount((prev) => prev + 1)
            }}
            placeholder="প্রোডাক্ট বা ক্যাটাগরি খুঁজুন (যেমন: বই)..."
            className="text-xs"
          />
          <p className="text-[11px] text-muted-foreground">
            সার্চ কোয়েরি বদলালে useMemo পুনরায় হিসাব সম্পন্ন করবে।
          </p>
        </div>

        {/* সম্পর্কহীন কাউন্টার স্টেট */}
        <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              সম্পর্কহীন স্টেট (Unrelated State)
            </span>
            <Badge variant="outline" className="font-mono text-xs">
              কাউন্ট: {unrelatedCount}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setUnrelatedCount((prev) => prev + 1)}
              className="text-xs"
            >
              +১ কাউন্টার বাড়ান
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setUnrelatedCount(0)}
              className="text-xs"
            >
              রিসেট
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            এই বাটনে ক্লিক করলে কম্পোনেন্ট রি-রেন্ডার হবে, কিন্তু হিসাব চলবে না!
          </p>
        </div>
      </div>

      {/* useMemo এক্সিকিউশন স্ট্যাটাস বার */}
      <div className="rounded-lg border border-border/60 bg-muted/40 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">useMemo হিসাব রান হয়েছে:</span>
          <Badge
            variant="secondary"
            className="font-mono font-bold text-xs bg-primary/10 text-primary border-primary/20"
          >
            {calculationRunCount} বার
          </Badge>
        </div>
        <div className="font-mono text-xs font-semibold text-foreground">
          ফিল্টারকৃত মোট মূল্য: ৳{filteredData.totalValue.toLocaleString()}
        </div>
      </div>

      {/* প্রোডাক্ট তালিকা */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">
          ফলাফল তালিকা:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredData.items.map((prod) => (
            <div
              key={prod.id}
              className="rounded-lg border border-border/80 bg-background p-3 flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-medium text-foreground">{prod.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  {prod.category}
                </div>
              </div>
              <div className="font-mono font-semibold text-primary">
                ৳{prod.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
