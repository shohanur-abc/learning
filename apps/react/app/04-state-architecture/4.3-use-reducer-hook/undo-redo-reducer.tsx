"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { History, Undo2, Redo2, RotateCcw, Sparkles } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৪.৩ useReducer Hook: Undo / Redo Time-Travel Reducer
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * আনডু-রিডু (Undo/Redo) হলো স্টেট ম্যানেজমেন্টের একটি ক্লাসিক আর্কিটেকচারাল প্যাটার্ন।
 * সাধারণ `useState` দিয়ে এটি হ্যান্ডেল করা অসম্ভব হয়ে পড়ে, কিন্তু `useReducer`-এ
 * স্টেটকে তিনটি অংশে ভাগ করে খুব সহজেই টাইম-ট্রাভেল হিস্টোরি তৈরি করা যায়:
 * `{ past: [...পূর্বে যা ছিল], present: বর্তমান_মান, future: [...আনডুর পর যা ছিল] }`
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. UNDO অ্যাকশনে past-এর শেষ মানটি present হয়, এবং বর্তমান present ভ্যালু future-এ পুশ হয়।
 * ২. REDO অ্যাকশনে future-এর প্রথম মানটি present হয়, এবং বর্তমান মান past-এ জমা হয়।
 * ৩. নতুন কোনো এডিট (SET) ঘটলে future হিস্টোরি স্বয়ংক্রিয়ভাবে ক্লিয়ার হয়ে যায়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface NoteDraft {
  readonly title: string
  readonly tag: string
  readonly timestamp: string
}

export interface HistoryState<T> {
  readonly past: readonly T[]
  readonly present: T
  readonly future: readonly T[]
}

export type HistoryAction<T> =
  | { readonly type: "SET"; readonly payload: T }
  | { readonly type: "UNDO" }
  | { readonly type: "REDO" }
  | { readonly type: "RESET"; readonly payload: T }

const INITIAL_NOTE: NoteDraft = {
  title: "রিঅ্যাক্ট স্টেট আর্কিটেকচার শেখা হচ্ছে",
  tag: "Architecture",
  timestamp: "10:00 AM",
}

const initialHistoryState: HistoryState<NoteDraft> = {
  past: [],
  present: INITIAL_NOTE,
  future: [],
}

/**
 * জেনেরিক হিস্টোরি রিডিউসার ফাংশন
 */
export function undoRedoReducer<T>(
  state: HistoryState<T>,
  action: HistoryAction<T>
): HistoryState<T> {
  switch (action.type) {
    case "UNDO": {
      if (state.past.length === 0) return state

      const previous = state.past[state.past.length - 1]
      if (previous === undefined) return state

      const nextPast = state.past.slice(0, state.past.length - 1)
      return {
        past: nextPast,
        present: previous,
        future: [state.present, ...state.future],
      }
    }

    case "REDO": {
      if (state.future.length === 0) return state

      const next = state.future[0]
      if (next === undefined) return state

      const nextFuture = state.future.slice(1)
      return {
        past: [...state.past, state.present],
        present: next,
        future: nextFuture,
      }
    }

    case "SET": {
      // যদি নতুন মান বর্তমান মানের সমান হয় তবে কোনো ট্রানজিশন দরকার নেই
      if (JSON.stringify(state.present) === JSON.stringify(action.payload)) {
        return state
      }

      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: [], // নতুন পরিবর্তন এলে আগের future বাতিল হয়
      }
    }

    case "RESET": {
      return {
        past: [],
        present: action.payload,
        future: [],
      }
    }

    default:
      return state
  }
}

const QUICK_TAGS = ["Architecture", "Hooks", "Patterns", "Performance"]

/**
 * মূল কম্পোনেন্ট: টাইম-ট্রাভেল আনডু-রিডু ডেমো
 */
export default function UndoRedoReducer() {
  const [history, dispatch] = React.useReducer(
    undoRedoReducer<NoteDraft>,
    initialHistoryState
  )

  const canUndo = history.past.length > 0
  const canRedo = history.future.length > 0

  const handleTitleChange = (newTitle: string) => {
    dispatch({
      type: "SET",
      payload: {
        ...history.present,
        title: newTitle,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    })
  }

  const handleTagChange = (newTag: string) => {
    dispatch({
      type: "SET",
      payload: {
        ...history.present,
        tag: newTag,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    })
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <History className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Time-Travel Undo/Redo Engine
          </span>
        </div>

        {/* আনডু / রিডু অ্যাকশন বাটন */}
        <div className="flex items-center gap-1.5">
          <Button
            size="xs"
            variant="outline"
            disabled={!canUndo}
            onClick={() => dispatch({ type: "UNDO" })}
            className="gap-1 text-xs"
          >
            <Undo2 className="size-3" />
            পূর্বাবস্থা ({history.past.length})
          </Button>

          <Button
            size="xs"
            variant="outline"
            disabled={!canRedo}
            onClick={() => dispatch({ type: "REDO" })}
            className="gap-1 text-xs"
          >
            <Redo2 className="size-3" />
            পুনরায় ({history.future.length})
          </Button>

          <Button
            size="icon-xs"
            variant="ghost"
            onClick={() => dispatch({ type: "RESET", payload: INITIAL_NOTE })}
            aria-label="রিসেট নোট"
            className="text-muted-foreground"
          >
            <RotateCcw className="size-3" />
          </Button>
        </div>
      </div>

      {/* নোট এডিটর */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label
            htmlFor="note-input"
            className="text-xs font-medium text-foreground flex items-center gap-1"
          >
            <Sparkles className="size-3 text-primary" />
            নোটের শিরোনাম পরিবর্তন করুন (প্রতি এডিটে হিস্টোরি তৈরি হয়):
          </label>
          <Input
            id="note-input"
            type="text"
            value={history.present.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="text-xs"
          />
        </div>

        {/* ট্যাগ সিলেক্টর */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs text-muted-foreground">ট্যাগ বাছাই:</span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_TAGS.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`rounded-md border px-2 py-0.5 text-xs transition-colors ${
                  history.present.tag === tag
                    ? "border-primary bg-primary text-primary-foreground font-medium"
                    : "border-border bg-muted/40 text-muted-foreground hover:bg-muted"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* প্রিভিউ ও হিস্টোরি স্ট্যাক ভিউ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border pt-4">
        {/* বর্তমান রেন্ডারড স্টেট */}
        <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              বর্তমান কার্ড (Present)
            </span>
            <Badge variant="outline" className="text-[10px]">
              {history.present.tag}
            </Badge>
          </div>
          <p className="text-sm font-medium text-foreground">
            {history.present.title}
          </p>
          <span className="text-[10px] text-muted-foreground block">
            সর্বশেষ আপডেট: {history.present.timestamp}
          </span>
        </div>

        {/* হিস্টোরি স্ট্যাক ট্র্যাকার */}
        <div className="rounded-lg border border-border bg-card p-3 space-y-2 text-xs">
          <span className="font-semibold text-foreground block">
            মেমোরি স্ট্যাক ট্র্যাকার
          </span>
          <div className="space-y-1 text-muted-foreground text-[11px]">
            <div className="flex justify-between">
              <span>Past হিস্টোরি সংখ্যা:</span>
              <strong className="text-foreground">{history.past.length}</strong>
            </div>
            <div className="flex justify-between">
              <span>Future হিস্টোরি সংখ্যা:</span>
              <strong className="text-foreground">{history.future.length}</strong>
            </div>
            <div className="flex justify-between border-t border-border/50 pt-1">
              <span>মোট ট্রানজিশন স্ন্যাপশট:</span>
              <strong className="text-primary font-mono">
                {history.past.length + 1 + history.future.length}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
