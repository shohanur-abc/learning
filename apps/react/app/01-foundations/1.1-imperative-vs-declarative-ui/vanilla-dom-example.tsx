"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * উদাহরণ ১: IMPERATIVE APPROACH (VANILLA JAVASCRIPT)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * Imperative Programming-এ ব্রাউজারকে ধাপে ধাপে (step-by-step) নির্দেশ দিতে হয়
 * যে ডেটা পরিবর্তন হলে DOM কীভাবে (HOW) আপডেট করতে হবে।
 *
 * ⚠️ বড় অ্যাপ্লিকেশনে কেন সমস্যা হয়:
 * ১. DOM-এর একাধিক জায়গায় যদি `count` ব্যবহার করা হয়, তবে প্রতিটি Event Listener-এ
 *    গিয়ে ম্যানুয়ালি সেই সব জায়গা আপডেট করতে হয়।
 * ২. একটি আপডেটও ভুলে গেলে বা মিস হলে UI এবং ডেটা Desync হয়ে যায় (UI Bug)।
 * ৩. মেমরি লিক এড়াতে প্রতিটি Listener ম্যানুয়ালি Clean-up করতে হয়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function VanillaDomExample() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const root = containerRef.current
    if (!root) return

    // ── STEP 1: DOM Elements ম্যানুয়ালি সিলেক্ট করা (Querying the DOM) ────────
    const displayEl = root.querySelector<HTMLSpanElement>("#imperative-display")
    const badgeEl = root.querySelector<HTMLSpanElement>("#imperative-badge")
    const incBtn = root.querySelector<HTMLButtonElement>("#imperative-inc")
    const decBtn = root.querySelector<HTMLButtonElement>("#imperative-dec")
    const resetBtn = root.querySelector<HTMLButtonElement>("#imperative-reset")

    // ── STEP 2: মেমরিতে স্টেট ভ্যারিয়েবল মেইনটেইন করা ─────────────────────────
    let count = 0
    const MAX_LIMIT = 5

    /**
     * DOM আপডেট ফাংশন:
     * ব্রাউজারকে স্পষ্টভাবে বলে দিতে হচ্ছে প্রতিটি এলিমেন্টের textContent,
     * Tailwind ক্লাস এবং disabled অ্যাট্রিবিউট কীভাবে বদলাবে।
     */
    function updateDOM() {
      if (!displayEl || !badgeEl || !incBtn || !decBtn) return

      // ম্যানুয়াল পরিবর্তন ১: Text node আপডেট করা
      displayEl.textContent = String(count)

      // ম্যানুয়াল পরিবর্তন ২: শর্ত অনুযায়ী Tailwind ক্লাস ও ব্যাজ টেক্সট পরিবর্তন
      if (count >= MAX_LIMIT) {
        displayEl.className = "text-3xl font-bold font-mono text-destructive"
        badgeEl.textContent = "Limit Reached"
        badgeEl.className =
          "px-2 py-0.5 rounded-full text-xs font-semibold bg-destructive/15 text-destructive border border-destructive/30"
      } else if (count > 0) {
        displayEl.className = "text-3xl font-bold font-mono text-primary"
        badgeEl.textContent = "Active"
        badgeEl.className =
          "px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30"
      } else {
        displayEl.className = "text-3xl font-bold font-mono text-foreground"
        badgeEl.textContent = "Zero"
        badgeEl.className =
          "px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border"
      }

      // ম্যানুয়াল পরিবর্তন ৩: বাটনের disabled অ্যাট্রিবিউট টগল করা
      incBtn.disabled = count >= MAX_LIMIT
      decBtn.disabled = count <= 0
    }

    // ── STEP 3: ম্যানুয়ালি Event Listener যোগ করা ও ফাংশন কল করা ──────────────
    function handleInc() {
      if (count < MAX_LIMIT) {
        count += 1
        updateDOM() // ⚠️ এই লাইনটি ভুলে গেলেই UI আপডেট হবে না!
      }
    }

    function handleDec() {
      if (count > 0) {
        count -= 1
        updateDOM()
      }
    }

    function handleReset() {
      count = 0
      updateDOM()
    }

    incBtn?.addEventListener("click", handleInc)
    decBtn?.addEventListener("click", handleDec)
    resetBtn?.addEventListener("click", handleReset)

    // প্রথম রেন্ডারে ইনিশিয়াল DOM সিঙ্ক
    updateDOM()

    // ── STEP 4: মেমরি লিক এড়াতে প্রতিটি Listener ম্যানুয়ালি Clean-up করা ───────
    return () => {
      incBtn?.removeEventListener("click", handleInc)
      decBtn?.removeEventListener("click", handleDec)
      resetBtn?.removeEventListener("click", handleReset)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="rounded-xl border bg-card p-6 shadow-xs space-y-5"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            পদ্ধতি: Imperative (Vanilla JS)
          </div>
          <div className="text-sm font-semibold text-foreground">
            document.querySelector দিয়ে সরাসরি DOM ম্যানিপুলেশন
          </div>
        </div>
        <span
          id="imperative-badge"
          className="px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border"
        >
          Zero
        </span>
      </div>

      <div className="flex items-center justify-center py-4 bg-muted/20 rounded-lg">
        <span id="imperative-display" className="text-3xl font-bold font-mono">
          0
        </span>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          id="imperative-dec"
          className="px-3 py-1.5 rounded-lg border text-xs font-medium bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          - Decrement
        </button>
        <button
          type="button"
          id="imperative-inc"
          className="px-3 py-1.5 rounded-lg border text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          + Increment
        </button>
        <button
          type="button"
          id="imperative-reset"
          className="p-1.5 rounded-lg border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          title="Reset"
        >
          <RotateCcw className="size-4" />
        </button>
      </div>
    </div>
  )
}
