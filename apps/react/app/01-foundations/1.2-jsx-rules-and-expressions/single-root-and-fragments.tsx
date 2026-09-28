import * as React from "react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ১.২ JSX Rule #1: Single Root Element & React Fragments (<>...</>)
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * একাধিক এলিমেন্টকে ব্রাউজারে কোনো অতিরিক্ত <div> ট্যাগ তৈরি না করে
 * সরাসরি রিটার্ন করতে React Fragment (<>...</>) ব্যবহার করা হয়।
 */
export default function SingleRootAndFragments() {
  return (
    <>
      <h3 className="text-base font-semibold text-foreground">
        React Fragments (&lt;&gt;...&lt;/&gt;)
      </h3>
      <p className="text-xs text-muted-foreground">
        এই হেডিং এবং প্যারাগ্রাফটি কোনো বাড়তি প্যারেন্ট &lt;div&gt; ছাড়াই সরাসরি
        রিটার্ন করা হয়েছে।
      </p>
    </>
  )
}

