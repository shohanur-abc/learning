"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { RenderPulse } from "@workspace/ui/components/custom/learning-components"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৫.৩ Dynamic Code-Splitting: React.lazy & React.Suspense
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * বড় অ্যাপ্লিকেশনে সমস্ত কোড একসাথে ইনিশিয়াল বান্ডলে লোড করলে পেজ ওপেন হতে দেরি হয়।
 * `React.lazy` দিয়ে ভারী কোনো কম্পোনেন্টকে আলাদা চাংক (chunk) ফাইলে বিভক্ত করা যায়,
 * যা শুধুমাত্র কম্পোনেন্টটি স্ক্রিনে মাউন্ট করার প্রয়োজন হলে ডাউনলোড হয়।
 * ডাউনলোড চলার সময় `<React.Suspense fallback={<Skeleton />}>` ফলব্যাক UI প্রদর্শন করে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `const HeavyComp = React.lazy(() => import("./HeavyComp"))`
 * ২. `<Suspense fallback={<LoadingIndicator />}>` দিয়ে রেন্ডার করতে হয়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ফলব্যাক লোডিং স্কেলিটন কম্পোনেন্ট
function ChartLoadingSkeleton() {
  return (
    <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 w-44 bg-muted-foreground/20 rounded" />
        <div className="h-4 w-20 bg-muted-foreground/20 rounded" />
      </div>
      <div className="h-12 w-full bg-muted-foreground/10 rounded" />
      <div className="grid grid-cols-3 gap-2 pt-2">
        <div className="h-10 bg-muted-foreground/10 rounded" />
        <div className="h-10 bg-muted-foreground/10 rounded" />
        <div className="h-10 bg-muted-foreground/10 rounded" />
      </div>
      <div className="text-[11px] text-primary font-mono text-center pt-1">
        ⏳ Suspense Fallback: চাংক ডাউনলোড ও ইনিশিয়ালাইজ হচ্ছে...
      </div>
    </div>
  )
}

// কৃত্রিম নেটওয়ার্ক লেটেন্সি সহ React.lazy ডাইনামিক লোড সিমুলেশন
const LazyAnalyticsChart = React.lazy(
  () =>
    new Promise<{ default: React.ComponentType<{ totalVisitors: number }> }>(
      (resolve) => {
        setTimeout(() => {
          resolve({
            default: function AnalyticsChart({
              totalVisitors,
            }: {
              totalVisitors: number
            }) {
              return (
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      📊 অ্যানালিটিক্স গ্রাফ লোড সম্পন্ন (Lazy Loaded)
                    </span>
                    <Badge variant="outline" className="text-xs font-mono">
                      Visitors: {totalVisitors.toLocaleString()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    এই ভারী মডিউলটি মূল জাভাস্ক্রিপ্ট বান্ডল থেকে আলাদা রাখা হয়েছিল।
                    ইউজার রিকোয়েস্ট করার পরই কেবল এটি ডাউনলোড হয়ে স্ক্রিনে যুক্ত হয়েছে।
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                    <div className="rounded border bg-background p-2">
                      <div className="text-[10px] text-muted-foreground">ব্যান্ডউইথ সাশ্রয়</div>
                      <div className="font-bold text-foreground mt-0.5">~120 KB</div>
                    </div>
                    <div className="rounded border bg-background p-2">
                      <div className="text-[10px] text-muted-foreground">লোডিং টেকনিক</div>
                      <div className="font-bold text-primary mt-0.5">React.lazy</div>
                    </div>
                    <div className="rounded border bg-background p-2">
                      <div className="text-[10px] text-muted-foreground">UI সেফটি</div>
                      <div className="font-bold text-emerald-600 mt-0.5">&lt;Suspense&gt;</div>
                    </div>
                  </div>
                </div>
              )
            },
          })
        }, 1200)
      }
    )
)

export default function LazyLoadingSuspense() {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [loadKey, setLoadKey] = React.useState(0)

  const handleTriggerLoad = () => {
    setIsLoaded(true)
    setLoadKey((k) => k + 1)
  }

  const handleReset = () => {
    setIsLoaded(false)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      {/* হেডার */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            React.lazy ও Suspense: ডাইনামিক কোড-স্প্লিটিং
          </h4>
          <p className="text-xs text-muted-foreground">
            প্রয়োজন ছাড়া বড় কম্পোনেন্ট লোড না করে বান্ডল সাইজ কমানোর উপায়
          </p>
        </div>
        <RenderPulse label="প্যারেন্ট রেন্ডার" />
      </div>

      {/* অ্যাকশন কন্ট্রোলস */}
      <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">
            ডাইনামিক চাংক লোডার কন্ট্রোল:
          </span>
          <Badge
            variant={isLoaded ? "default" : "secondary"}
            className="text-xs"
          >
            {isLoaded ? "চাংক মাউন্টেড" : "চাংক আন-মাউন্টেড"}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          নিচের বাটনে ক্লিক করে ডাইনামিক ইম্পোর্ট ট্রিগার করুন এবং Suspense ফলব্যাক স্কেলিটন প্রত্যক্ষ করুন।
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleTriggerLoad}
            className="text-xs"
          >
            {isLoaded ? "পুনরায় লোড সিমুলেট করুন" : "হেভি চার্ট লোড করুন"}
          </Button>
          {isLoaded && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              className="text-xs"
            >
              রিসেট / আনমাউন্ট
            </Button>
          )}
        </div>
      </div>

      {/* Suspense কনটেইনার */}
      <div className="rounded-lg border border-border bg-background p-4 space-y-2">
        <div className="text-xs font-semibold text-foreground mb-2">
          Suspense বাউন্ডারি আউটপুট:
        </div>

        {isLoaded ? (
          <React.Suspense fallback={<ChartLoadingSkeleton />}>
            <LazyAnalyticsChart key={loadKey} totalVisitors={28450} />
          </React.Suspense>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
            এখনো কম্পোনেন্ট লোড করা হয়নি। উপরের বাটন ক্লিক করে ডাইনামিক লোড শুরু করুন।
          </div>
        )}
      </div>
    </div>
  )
}
