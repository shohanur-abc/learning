"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Building2, FolderGit2, Sparkles, Layers } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৪.২ Context API & useContext: Nested Scope Context
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React-এ `useContext(MyContext)` সবসময় কম্পোনেন্ট ট্রির ওপরের দিকে খুঁজে সবচেয়ে
 * নিকটতম (Closest) `<MyContext.Provider>` থেকে মান গ্রহণ করে।
 * অর্থাৎ একই Context-কে নেস্টেড করে একটি নির্দিষ্ট সাব-ট্রির মান ওভাররাইড (Override) করা সম্ভব,
 * যা বাইরের প্যারেন্ট বা সমান্তরাল সিবলিং ট্রিকে কোনোভাবেই প্রভাবিত করে না।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. নেস্টেড প্রোভাইডার লোকালাইজড স্কোপ (Localized Scope) তৈরি করে।
 * ২. একই কম্পোনেন্টকে ভিন্ন ভিন্ন প্রোভাইডারে বসালে সে তার নিকটতম স্কোপের মান প্রদর্শন করে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface WorkspaceScope {
  readonly name: string
  readonly tier: "Enterprise" | "Team" | "Sandbox"
  readonly storageQuotaGb: number
  readonly colorClass: string
}

const WorkspaceContext = React.createContext<WorkspaceScope>({
  name: "রুট স্পেস (Root Fallback)",
  tier: "Sandbox",
  storageQuotaGb: 5,
  colorClass: "border-border bg-card",
})

/** জেনেরিক কনজিউমার কার্ড: এটি তার নিকটতম স্কোপ প্রদর্শন করে */
function WorkspaceCard({ label }: { readonly label: string }) {
  const scope = React.useContext(WorkspaceContext)

  return (
    <div
      className={`rounded-lg border p-3 space-y-1.5 transition-colors ${scope.colorClass}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <Layers className="size-3.5 text-primary" />
          {label}
        </span>
        <Badge
          variant={
            scope.tier === "Enterprise"
              ? "default"
              : scope.tier === "Team"
                ? "secondary"
                : "outline"
          }
          className="text-[10px] px-1.5 py-0"
        >
          {scope.tier}
        </Badge>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
        <span>স্কোপ: <strong className="text-foreground">{scope.name}</strong></span>
        <span>কোটা: <strong>{scope.storageQuotaGb} GB</strong></span>
      </div>
    </div>
  )
}

/**
 * মূল কম্পোনেন্ট: নেস্টেড স্কোপড কনটেক্সট ডেমো
 */
export default function NestedScopeContext() {
  const globalScope: WorkspaceScope = {
    name: "গ্লোবাল এন্টারপ্রাইজ অর্গানাইজেশন",
    tier: "Enterprise",
    storageQuotaGb: 1000,
    colorClass: "border-primary/40 bg-primary/5",
  }

  const teamScope: WorkspaceScope = {
    name: "কোর ইঞ্জিনিয়ারিং টিম",
    tier: "Team",
    storageQuotaGb: 200,
    colorClass: "border-blue-500/40 bg-blue-500/5",
  }

  const sandboxScope: WorkspaceScope = {
    name: "প্রোটোটাইপ স্যান্ডবক্স",
    tier: "Sandbox",
    storageQuotaGb: 20,
    colorClass: "border-amber-500/40 bg-amber-500/5",
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Building2 className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Nested & Scoped Providers
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          Closest Provider Resolution
        </Badge>
      </div>

      {/* ১. গ্লোবাল রুট প্রোভাইডার */}
      <WorkspaceContext.Provider value={globalScope}>
        <div className="rounded-xl border-2 border-primary/30 p-4 space-y-3.5 bg-card">
          <div className="flex items-center gap-2 text-xs font-bold text-primary">
            <Building2 className="size-4" />
            লেভেল ১: রুট প্রোভাইডার (Global Enterprise)
          </div>

          <WorkspaceCard label="রুট লেভেলের ড্যাশবোর্ড কার্ড" />

          {/* ২. নেস্টেড টিম প্রোভাইডার (ওভাররাইড ১) */}
          <WorkspaceContext.Provider value={teamScope}>
            <div className="rounded-lg border-2 border-blue-500/30 p-3.5 space-y-3 bg-card/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <FolderGit2 className="size-3.5" />
                লেভেল ২: নেস্টেড সাব-প্রোভাইডার (Engineering Team Override)
              </div>

              <WorkspaceCard label="টিম লেভেলের প্রজেক্ট কার্ড" />

              {/* ৩. আরও গভীরে নেস্টেড স্যান্ডবক্স প্রোভাইডার (ওভাররাইড ২) */}
              <WorkspaceContext.Provider value={sandboxScope}>
                <div className="rounded-md border-2 border-amber-500/30 p-3 space-y-2 bg-card/40">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    <Sparkles className="size-3" />
                    লেভেল ৩: ডিপলি নেস্টেড প্রোভাইডার (Sandbox Lab Override)
                  </div>
                  <WorkspaceCard label="ইনকুবেশন স্যান্ডবক্স কার্ড" />
                </div>
              </WorkspaceContext.Provider>
            </div>
          </WorkspaceContext.Provider>
        </div>
      </WorkspaceContext.Provider>

      <div className="rounded-md bg-muted/40 p-2.5 text-[11px] text-muted-foreground">
        🧠 <strong>কী ঘটল?</strong> প্রতিটি <code>WorkspaceCard</code> হুবহু একই কোড ব্যবহার করেছে, কিন্তু
        ট্রি-তে তার অবস্থানের সবচেয়ে নিকটবর্তী (Closest) প্রোভাইডারের মান স্বয়ংক্রিয়ভাবে পেয়েছে।
      </div>
    </div>
  )
}
