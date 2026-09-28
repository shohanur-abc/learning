"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  ShoppingCart,
  Tag,
  Truck,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৪.৩ useReducer Hook: Complex Cart Reducer with Interdependent State
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * যখন কোনো স্টেট আপডেটে একাধিক ভ্যারিয়েবল পরস্পরের ওপর নির্ভর করে (যেমন:
 * আইটেম যোগ হলে সাবটোটাল বাড়ে, যা ফ্রি শিপিংয়ের শর্ত পূরণ করে, আবার কুপনের ডিসকাউন্টও
 * পরিবর্তিত সাবটোটালের ওপর নতুন করে হিসাব করতে হয়), তখন `useState` দিয়ে হ্যান্ডেল করলে
 * একাধিক সেটার ডাকতে হয় এবং রেস কন্ডিশন বা ভুল হিসাবের ঝুঁকি থাকে।
 * `useReducer` সমস্ত আন্তঃনির্ভরশীল হিসাবকে একটিমাত্র এটমিক (Atomic) ট্রানজিশনে সমাধান করে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. কুপন কোড ও ফ্রি শিপিং সাবটোটালের ওপর নির্ভর করে এক রিডিউসারেই আপডেট হয়।
 * ২. কোনো আইটেম রিমুভ করলে কুপন ও শিপিং স্বয়ংক্রিয়ভাবে পুনরায় সঠিকভাবে হিসাব করা হয়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface CartProduct {
  readonly id: string
  readonly name: string
  readonly price: number
}

export interface CartLineItem extends CartProduct {
  readonly quantity: number
}

export interface CartState {
  readonly items: readonly CartLineItem[]
  readonly couponCode: string | null
  readonly discountAmount: number
  readonly shippingCost: number
  readonly couponError: string | null
}

export type CartAction =
  | { readonly type: "ADD_PRODUCT"; readonly payload: CartProduct }
  | { readonly type: "REMOVE_PRODUCT"; readonly payload: { readonly id: string } }
  | { readonly type: "UPDATE_QUANTITY"; readonly payload: { readonly id: string; readonly delta: number } }
  | { readonly type: "APPLY_COUPON"; readonly payload: { readonly code: string } }
  | { readonly type: "REMOVE_COUPON" }
  | { readonly type: "CLEAR_CART" }

const CATALOG_ITEMS: readonly CartProduct[] = [
  { id: "c1", name: "রিঅ্যাক্ট আর্কিটেকচার কোর্স", price: 600 },
  { id: "c2", name: "Next.js প্র্যাকটিক্যাল হ্যান্ডবুক", price: 350 },
  { id: "c3", name: "সুইফট UI কিট বান্ডেল", price: 250 },
]

const FREE_SHIPPING_THRESHOLD = 800
const STANDARD_SHIPPING = 60

/** হেল্পার: সাবটোটাল হিসাব */
function calculateSubtotal(items: readonly CartLineItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

/** হেল্পার: শিপিং ফি ও কুপন ডিসকাউন্ট হিসাব */
function calculateOrderDerivations(
  items: readonly CartLineItem[],
  couponCode: string | null
): { discountAmount: number; shippingCost: number; couponError: string | null } {
  const subtotal = calculateSubtotal(items)

  const shippingCost =
    subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING

  let discountAmount = 0
  let couponError: string | null = null

  if (couponCode) {
    const codeUpper = couponCode.toUpperCase().trim()
    if (codeUpper === "SAVE20") {
      discountAmount = Math.round(subtotal * 0.2) // ২০% ছাড়
    } else if (codeUpper === "FLAT100") {
      discountAmount = Math.min(100, subtotal) // ১০০ টাকা ছাড়
    } else {
      couponError = "অবৈধ কুপন কোড। 'SAVE20' বা 'FLAT100' ব্যবহার করো।"
    }
  }

  return { discountAmount, shippingCost, couponError }
}

const initialCartState: CartState = {
  items: [
    { id: "c1", name: "রিঅ্যাক্ট আর্কিটেকচার কোর্স", price: 600, quantity: 1 },
    { id: "c2", name: "Next.js প্র্যাকটিক্যাল হ্যান্ডবুক", price: 350, quantity: 1 },
  ],
  couponCode: "SAVE20",
  discountAmount: 190, // (600 + 350) * 0.2 = 190
  shippingCost: 0, // 950 >= 800 (ফ্রি শিপিং)
  couponError: null,
}

/**
 * জটিল স্টেট রিডিউসার: সমস্ত ডিপেন্ডেন্ট লজিক এক জায়গায় হ্যান্ডেল করে
 */
export function complexCartReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const existing = state.items.find((item) => item.id === action.payload.id)
      const nextItems = existing
        ? state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }]

      const { discountAmount, shippingCost, couponError } =
        calculateOrderDerivations(nextItems, state.couponCode)

      return {
        ...state,
        items: nextItems,
        discountAmount,
        shippingCost,
        couponError,
      }
    }

    case "REMOVE_PRODUCT": {
      const nextItems = state.items.filter(
        (item) => item.id !== action.payload.id
      )
      const { discountAmount, shippingCost, couponError } =
        calculateOrderDerivations(nextItems, state.couponCode)

      return {
        ...state,
        items: nextItems,
        discountAmount,
        shippingCost,
        couponError,
      }
    }

    case "UPDATE_QUANTITY": {
      const nextItems = state.items
        .map((item) => {
          if (item.id === action.payload.id) {
            const nextQty = item.quantity + action.payload.delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter((item): item is CartLineItem => item !== null)

      const { discountAmount, shippingCost, couponError } =
        calculateOrderDerivations(nextItems, state.couponCode)

      return {
        ...state,
        items: nextItems,
        discountAmount,
        shippingCost,
        couponError,
      }
    }

    case "APPLY_COUPON": {
      const { discountAmount, shippingCost, couponError } =
        calculateOrderDerivations(state.items, action.payload.code)

      return {
        ...state,
        couponCode: couponError ? null : action.payload.code.toUpperCase(),
        discountAmount,
        shippingCost,
        couponError,
      }
    }

    case "REMOVE_COUPON": {
      const { shippingCost } = calculateOrderDerivations(state.items, null)
      return {
        ...state,
        couponCode: null,
        discountAmount: 0,
        shippingCost,
        couponError: null,
      }
    }

    case "CLEAR_CART": {
      return {
        items: [],
        couponCode: null,
        discountAmount: 0,
        shippingCost: 0,
        couponError: null,
      }
    }

    default:
      return state
  }
}

/**
 * মূল কম্পোনেন্ট: জটিল শপিং কার্ট ডেমো
 */
export default function ComplexCartReducer() {
  const [state, dispatch] = React.useReducer(complexCartReducer, initialCartState)
  const [couponInput, setCouponInput] = React.useState("")

  const subtotal = calculateSubtotal(state.items)
  const finalTotal = Math.max(0, subtotal - state.discountAmount + state.shippingCost)

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (!couponInput.trim()) return
    dispatch({ type: "APPLY_COUPON", payload: { code: couponInput } })
    setCouponInput("")
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <ShoppingCart className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Complex Interdependent State Transitions
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          Atomic Transitions
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ক্যাটালগ ও কার্ট আইটেম লিস্ট */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              কোর্স ক্যাটালগ (আইটেম যোগ করুন)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {CATALOG_ITEMS.map((product) => (
                <button
                  type="button"
                  key={product.id}
                  onClick={() =>
                    dispatch({ type: "ADD_PRODUCT", payload: product })
                  }
                  className="rounded-lg border border-border bg-muted/20 p-2.5 text-left hover:bg-accent/40 transition-colors"
                >
                  <p className="text-xs font-medium text-foreground truncate">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-primary font-semibold mt-1">
                    ৳{product.price}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-t border-border pt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>কার্টের আইটেম ({state.items.length})</span>
              {state.items.length > 0 && (
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => dispatch({ type: "CLEAR_CART" })}
                  className="text-xs text-destructive hover:bg-destructive/10"
                >
                  সব খালি করুন
                </Button>
              )}
            </div>

            {state.items.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-5 text-center text-xs text-muted-foreground">
                কার্ট ফাঁকা। ওপরের ক্যাটালগ থেকে আইটেম যোগ করুন।
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-2.5 text-xs"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        ৳{item.price} × {item.quantity} = ৳
                        {item.price * item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        size="icon-xs"
                        variant="outline"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, delta: -1 },
                          })
                        }
                        aria-label="পরিমাণ কমান"
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="font-mono text-xs font-bold w-5 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon-xs"
                        variant="outline"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, delta: 1 },
                          })
                        }
                        aria-label="পরিমাণ বাড়ান"
                      >
                        <Plus className="size-3" />
                      </Button>
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_PRODUCT",
                            payload: { id: item.id },
                          })
                        }
                        aria-label="আইটেম মুছুন"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* অর্ডার হিসাব ও কুপন বক্স */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-border bg-muted/20 p-4 space-y-4">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              অর্ডার ব্রেকডাউন ও ইনভয়েস
            </span>

            {/* কুপন ইনপুট */}
            <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
              <Input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="যেমন: SAVE20 বা FLAT100"
                className="text-xs h-8"
              />
              <Button type="submit" size="sm" variant="outline" className="text-xs h-8">
                প্রয়োগ
              </Button>
            </form>

            {state.couponError && (
              <div className="flex items-center gap-1.5 text-[11px] text-destructive">
                <AlertCircle className="size-3.5 shrink-0" />
                {state.couponError}
              </div>
            )}

            {state.couponCode && (
              <div className="flex items-center justify-between rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-xs text-emerald-600 dark:text-emerald-400">
                <span className="flex items-center gap-1">
                  <Tag className="size-3" /> কুপন <strong>{state.couponCode}</strong> সক্রিয়
                </span>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "REMOVE_COUPON" })}
                  className="text-[10px] underline hover:opacity-80"
                >
                  রিমুভ
                </button>
              </div>
            )}

            <div className="space-y-1.5 text-xs border-t border-border pt-3">
              <div className="flex justify-between text-muted-foreground">
                <span>সাবটোটাল:</span>
                <span>৳{subtotal}</span>
              </div>
              {state.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>ডিসকাউন্ট:</span>
                  <span>-৳{state.discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Truck className="size-3" /> ডেলিভারি চার্জ:
                </span>
                <span>
                  {state.shippingCost === 0 && subtotal > 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      ফ্রি শিপিং (৳{FREE_SHIPPING_THRESHOLD}+)
                    </span>
                  ) : (
                    `৳${state.shippingCost}`
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex items-center justify-between text-base font-bold text-foreground">
              <span>সর্বমোট প্রদেয়:</span>
              <span className="text-primary text-lg">৳{finalTotal}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <CheckCircle2 className="size-3 text-primary" />
              <span>রিডিউসারে একবারে সব ডিপেন্ডেন্ট স্টেট ট্রানজিশন হয়েছে।</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
