import * as React from "react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ১.২ JSX Rule #2 & #3: JavaScript Expressions ({}) & Attributes
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * JSX-এ কার্লি ব্রেসেস `{}` দিয়ে JavaScript ভ্যারিয়েবল, গাণিতিক হিসাব এবং
 * ডাইনামিক অ্যাট্রিবিউট লেখার খাঁটি উদাহরণ।
 */
export default function JsxExpressionsAndAttributes() {
  // ১. সাধারণ ভ্যারিয়েবলসমূহ (JavaScript Variables)
  const studentName = "সাকিব হাসান"
  const courseTitle = "React: Scratch to Pro"
  const price = 1200
  const discount = 200
  const isEnrolled = true
  const avatarUrl =
    "https://nextjs.org/_next/static/immutable/media/nextjs-logotype-light.00-_80jv8_dct.svg"

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      {/* ডাইনামিক অ্যাট্রিবিউট src={avatarUrl} এবং সেলফ-ক্লোজিং ট্যাগ (<img />) */}
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl}
          alt={studentName}
          className="size-12 rounded-full border border-border object-cover"
        />
        <div>
          {/* টেক্সট ইন্টারপোলেশন: {studentName} */}
          <h4 className="text-base font-bold text-foreground">
            স্বাগতম, {studentName}!
          </h4>
          <p className="text-xs text-muted-foreground">
            কোর্স: {courseTitle}
          </p>
        </div>
      </div>

      {/* কার্লি ব্রেসেসের ভেতরে গাণিতিক এক্সপ্রেশন: {price - discount} */}
      <div className="rounded-lg bg-muted/40 p-3 text-xs flex justify-between items-center">
        <span className="text-muted-foreground">কোর্স ফি (ডিসকাউন্টসহ):</span>
        <span className="font-bold text-foreground">
          {price - discount} টাকা
        </span>
      </div>

      {/* HTML 'class' এর বদলে 'className' এবং টারনারি এক্সপ্রেশন */}
      <div className="text-xs">
        স্ট্যাটাস:{" "}
        <span className={isEnrolled ? "text-emerald-500 font-semibold" : "text-muted-foreground"}>
          {isEnrolled ? "এনরোল্ড (Active)" : "নট এনরোল্ড"}
        </span>
      </div>

      {/* HTML 'for'-এর বদলে 'htmlFor' এবং ডাবল কার্লি ব্রেস {{}} স্টাইল */}
      <div>
        <label
          htmlFor="promo-input"
          className="block text-xs font-medium text-muted-foreground mb-1"
        >
          কুপন কোড (htmlFor):
        </label>
        <input
          id="promo-input"
          type="text"
          placeholder="PROMO2026"
          style={{ letterSpacing: "0.1em" }}
          className="h-8 w-full max-w-xs rounded-lg border border-input bg-background px-3 text-xs outline-none"
        />
      </div>
    </div>
  )
}

