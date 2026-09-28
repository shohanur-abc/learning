"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { RotateCcw, Plus, Minus, Dices, Sliders } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৪.৩ useReducer Hook: Counter Reducer & Discriminated Actions
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * `useReducer` হলো একটি স্টেট ম্যানেজমেন্ট ইঞ্জিন যা ফাংশনাল প্রোগ্রামিংয়ের নীতিতে চলে:
 * `(CurrentState, Action) ➔ NewState`
 * সরাসরি স্টেট পরিবর্তন না করে কী ঘটনা ঘটেছে তা একটি অ্যাকশন অবজেক্টের
 * মাধ্যমে `dispatch` করা হয়। Reducer ফাংশনটি একটি Pure Function হিসেবে নতুন স্টেট নির্ধারণ করে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. Reducer ফাংশন কম্পোনেন্টের বাইরে থাকে এবং কোনো সাইড ইফেক্ট তৈরি করে না।
 * ২. TypeScript Discriminated Union অ্যাকশন টাইপিংয়ের কারণে টাইপো হওয়ার সুযোগ থাকে না।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface CounterState {
  readonly count: number
  readonly step: number
  readonly min: number
  readonly max: number
  readonly lastAction: string
}

export type CounterAction =
  | { readonly type: "INCREMENT" }
  | { readonly type: "DECREMENT" }
  | { readonly type: "RESET" }
  | { readonly type: "SET_STEP"; readonly payload: number }
  | { readonly type: "RANDOMIZE" }

const initialCounterState: CounterState = {
  count: 0,
  step: 1,
  min: -20,
  max: 50,
  lastAction: "INIT",
}

/**
 * পিউর রিডিউসার ফাংশন: কম্পোনেন্টের বাইরে সংজ্ঞায়িত
 */
export function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case "INCREMENT": {
      const nextCount = Math.min(state.max, state.count + state.step)
      return {
        ...state,
        count: nextCount,
        lastAction: `INCREMENT (+${state.step})`,
      }
    }

    case "DECREMENT": {
      const nextCount = Math.max(state.min, state.count - state.step)
      return {
        ...state,
        count: nextCount,
        lastAction: `DECREMENT (-${state.step})`,
      }
    }

    case "SET_STEP": {
      return {
        ...state,
        step: Math.max(1, action.payload),
        lastAction: `SET_STEP (${action.payload})`,
      }
    }

    case "RANDOMIZE": {
      const randomValue =
        Math.floor(Math.random() * (state.max - state.min + 1)) + state.min
      return {
        ...state,
        count: randomValue,
        lastAction: `RANDOMIZE (${randomValue})`,
      }
    }

    case "RESET": {
      return {
        ...initialCounterState,
        lastAction: "RESET",
      }
    }

    default:
      return state
  }
}

/**
 * কাউন্টার রিডিউসার কম্পোনেন্ট
 */
export default function CounterReducerActions() {
  const [state, dispatch] = React.useReducer(counterReducer, initialCounterState)

  const isAtMax = state.count >= state.max
  const isAtMin = state.count <= state.min

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            useReducer: Typed Actions
          </span>
        </div>
        <Badge variant="outline" className="text-xs font-mono">
          Last Action: {state.lastAction}
        </Badge>
      </div>

      {/* ডিসপ্লে সেকশন */}
      <div className="flex flex-col items-center justify-center rounded-lg border border-border/80 bg-muted/20 p-5 space-y-1">
        <span className="text-xs font-medium text-muted-foreground uppercase">
          বর্তমান কাউন্ট মান
        </span>
        <div className="font-mono text-4xl font-extrabold text-foreground">
          {state.count}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
          <span>সীমা: [{state.min} থেকে {state.max}]</span>
          <span>•</span>
          <span>স্টেপ: <strong>{state.step}</strong></span>
        </div>
      </div>

      {/* অ্যাকশন কন্ট্রোল বাটন */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={isAtMin}
          onClick={() => dispatch({ type: "DECREMENT" })}
          className="gap-1 text-xs"
        >
          <Minus className="size-3.5" />
          মাইনাস ({state.step})
        </Button>

        <Button
          size="sm"
          variant="default"
          disabled={isAtMax}
          onClick={() => dispatch({ type: "INCREMENT" })}
          className="gap-1 text-xs"
        >
          <Plus className="size-3.5" />
          প্লাস ({state.step})
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => dispatch({ type: "RANDOMIZE" })}
          className="gap-1 text-xs"
        >
          <Dices className="size-3.5" />
          র্যান্ডম মান
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => dispatch({ type: "RESET" })}
          className="gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-3.5" />
          রিসেট
        </Button>
      </div>

      {/* স্টেপ কনফিগারেশন */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs text-muted-foreground">স্টেপ সাইজ পরিবর্তন করো:</span>
        <div className="flex items-center gap-1.5">
          {[1, 5, 10].map((stepValue) => (
            <Button
              key={stepValue}
              size="xs"
              variant={state.step === stepValue ? "default" : "outline"}
              onClick={() => dispatch({ type: "SET_STEP", payload: stepValue })}
              className="text-xs font-mono"
            >
              +{stepValue}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
