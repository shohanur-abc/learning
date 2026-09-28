"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { ShoppingBag, ShoppingCart, Trash2, Plus, ArrowRight } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৪.১ Lifting State Up: Shared Cart and Summary
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * যখন সিবলিং কম্পোনেন্ট 'ক্যাটালগ' এবং সিবলিং কম্পোনেন্ট 'সামারি' পরস্পরের
 * সাথে তথ্য শেয়ার করতে চায়, তখন স্টেটকে তাদের কমন প্যারেন্টে 'Lift' করতে হয়।
 * ডেটা প্রপস আকারে নিচে নামে (Top-down) এবং ইভেন্ট কলব্যাকের মাধ্যমে উপরে ওঠে (Bottom-up)।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. ProductList বাটন ক্লিকে প্যারেন্ট থেকে পাওয়া `onAddToCart` কলব্যাক ট্রিগার করে।
 * ২. CartSummary প্যারেন্ট থেকে প্রপস হিসেবে `items` গ্রহণ করে মোট হিসাব প্রদর্শন করে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface Product {
  readonly id: string
  readonly name: string
  readonly price: number
  readonly category: string
}

export interface CartItem extends Product {
  readonly quantity: number
}

const AVAILABLE_PRODUCTS: readonly Product[] = [
  { id: "p1", name: "রিঅ্যাক্ট প্র্যাকটিক্যাল গাইড বই", price: 450, category: "বই" },
  { id: "p2", name: "JavaScript অ্যালগরিদম চিটশিট", price: 200, category: "গাইড" },
  { id: "p3", name: "মডার্ন ওয়েব আর্কিটেকচার স্টিকার প্যাক", price: 120, category: "সোয়াগ" },
]

interface ProductCatalogProps {
  readonly products: readonly Product[]
  readonly onAddToCart: (product: Product) => void
}

/** সিবলিং কম্পোনেন্ট ১: প্রোডাক্ট ক্যাটালগ (ইনপুট বা অ্যাকশন জেনারেটর) */
function ProductCatalog({ products, onAddToCart }: ProductCatalogProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <ShoppingBag className="size-4 text-primary" />
        উপলব্ধ পণ্য তালিকা (সিবলিং ক্যাটালগ)
      </div>
      <div className="grid grid-cols-1 gap-2.5">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-lg border border-border bg-card/60 p-3 transition-colors hover:bg-accent/30"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{product.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">৳{product.price}</span>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {product.category}
                </Badge>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddToCart(product)}
              className="gap-1 text-xs"
            >
              <Plus className="size-3.5" />
              কার্টে যোগ
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

interface CartSummaryProps {
  readonly cartItems: readonly CartItem[]
  readonly onRemoveFromCart: (productId: string) => void
  readonly onClearCart: () => void
}

/** সিবলিং কম্পোনেন্ট ২: কার্ট সামারি ও চেকআউট (আউটপুট ডিসপ্লে ও রিমুভ অ্যাকশন) */
function CartSummary({
  cartItems,
  onRemoveFromCart,
  onClearCart,
}: CartSummaryProps) {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <div className="flex flex-col justify-between rounded-lg border border-border bg-card/60 p-4 space-y-4">
      <div>
        <div className="flex items-center justify-between border-b border-border pb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <ShoppingCart className="size-4 text-primary" />
            অর্ডার সামারি (সিবলিং সামারি)
          </div>
          <Badge variant="secondary" className="text-xs">
            {totalItems} আইটেম
          </Badge>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-6 text-center text-xs text-muted-foreground">
            কার্ট বর্তমানে ফাঁকা। বামদিকের ক্যাটালগ থেকে পণ্য যোগ করো।
          </div>
        ) : (
          <div className="divide-y divide-border/60 max-h-48 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 text-xs"
              >
                <div>
                  <span className="font-medium text-foreground">{item.name}</span>
                  <div className="text-muted-foreground text-[11px]">
                    ৳{item.price} × {item.quantity} = ৳{item.price * item.quantity}
                  </div>
                </div>
                <Button
                  size="icon-xs"
                  variant="ghost"
                  onClick={() => onRemoveFromCart(item.id)}
                  aria-label={`${item.name} কার্ট থেকে মুছুন`}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border pt-3 space-y-2">
        <div className="flex items-center justify-between text-sm font-semibold text-foreground">
          <span>সর্বমোট মূল্য:</span>
          <span className="text-primary text-base">৳{totalPrice}</span>
        </div>
        {cartItems.length > 0 && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onClearCart}
              className="text-xs text-muted-foreground flex-1"
            >
              রিসেট
            </Button>
            <Button size="sm" variant="default" className="text-xs flex-1 gap-1">
              অর্ডার করুন <ArrowRight className="size-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * কমন প্যারেন্ট কম্পোনেন্ট: স্টেট সংরক্ষণ ও সিবলিংদের সমন্বয়
 */
export default function SharedCartAndSummary() {
  const initialItem = AVAILABLE_PRODUCTS[0]
  const [cartItems, setCartItems] = React.useState<readonly CartItem[]>(
    initialItem ? [{ ...initialItem, quantity: 1 }] : []
  )

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id)
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === productId)
      if (existing && existing.quantity > 1) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
      return prevItems.filter((item) => item.id !== productId)
    })
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Lifting State Up: প্যারেন্ট অর্কেস্ট্রেশন
        </span>
        <Badge variant="outline" className="text-xs">
          কার্ট স্টেট প্যারেন্টে সংরক্ষিত
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* সিবলিং ১: ক্যাটালগ (ইভেন্ট কলব্যাক পাঠায়) */}
        <ProductCatalog
          products={AVAILABLE_PRODUCTS}
          onAddToCart={handleAddToCart}
        />

        {/* সিবলিং ২: সামারি (প্রপস ডেটা গ্রহণ করে ও রিমুভ কলব্যাক পাঠায়) */}
        <CartSummary
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onClearCart={handleClearCart}
        />
      </div>
    </div>
  )
}
