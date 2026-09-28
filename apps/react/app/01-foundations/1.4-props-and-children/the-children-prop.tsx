import * as React from "react"
import { AlertCircle, CheckCircle, Info } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ১.৪ The `children` Prop: কম্পোনেন্ট র‍্যাপার ও কন্টেন্ট স্লট
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * JSX-এ যেকোনো কম্পোনেন্টের ওপেনিং ও ক্লোজিং ট্যাগের মাঝে যা কিছু লেখা হয়,
 * সেটি স্বয়ংক্রিয়ভাবে `children` প্রপ হিসেবে কম্পোনেন্টে প্রবেশ করে।
 */

interface ContentCardProps {
  readonly title: string
  readonly children: React.ReactNode
}

/** একটি পুনর্ব্যবহারযোগ্য কনটেইনার কম্পোনেন্ট যা `children` প্রপ র‍্যাপ করে */
function ContentCard({ title, children }: ContentCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-4 shadow-xs">
      <h4 className="border-b border-border pb-2.5 text-xs font-semibold text-foreground">
        {title}
      </h4>
      <div className="pt-3 text-xs leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

/** প্যারেন্ট কম্পোনেন্ট: ContentCard এর ভেতর ভিন্ন ভিন্ন JSX উপাদান পাঠাচ্ছে */
export default function TheChildrenProp() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* ব্যবহার ১: শিশুদের মতো কন্টেইনারের ভেতর সাধারণ টেক্সট ও আইকন দেওয়া */}
      <ContentCard title="সিস্টেম আপডেট">
        <div className="flex items-start gap-2.5">
          <Info className="size-4 shrink-0 text-primary mt-0.5" />
          <p>
            React 19-এর সকল নতুন ফিচার এই কারিকুলামে বিস্তারিত আলোচনা করা হয়েছে।
          </p>
        </div>
      </ContentCard>

      {/* ব্যবহার ২: অন্য একটি কন্টেইনারে সম্পূর্ণ ভিন্ন মার্কআপ (ব্যাজ ও স্ট্যাটাস) দেওয়া */}
      <ContentCard title="এনরোলমেন্ট স্ট্যাটাস">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500 font-medium">
            <CheckCircle className="size-4" />
            <span>সফলভাবে সম্পন্ন হয়েছে</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            আপনার সার্টিফিকেট ডাউনলোডের জন্য প্রস্তুত।
          </p>
        </div>
      </ContentCard>
    </div>
  )
}
