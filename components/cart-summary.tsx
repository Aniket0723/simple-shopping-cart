"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/format"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"

export default function CartSummary() {
  const { itemsArray, total, setQuantity, removeItem, clear } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const isEmpty = useMemo(() => itemsArray.length === 0, [itemsArray])

  async function onCheckout() {
    setIsSubmitting(true)
    setMessage(null)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsArray.map((it) => ({ id: it.id, quantity: it.quantity })),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data?.message || "Checkout failed")
      } else {
        setMessage(`Success! Total charged: ${formatCurrency(data.total)}`)
        clear()
      }
    } catch (e) {
      setMessage("Checkout error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container mx-auto px-4 py-8 md:px-6 md:py-12 space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" aria-label="Back to products">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold">Your Cart</h1>
      </div>

      {isEmpty ? (
        <div className="text-center py-16 space-y-6">
          <div className="flex justify-center">
            <div className="bg-muted rounded-full p-8">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-foreground">Your cart is empty</p>
            <p className="text-muted-foreground">Add some products to get started</p>
          </div>
          <Link href="/">
            <Button size="lg" className="gap-2">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {itemsArray.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 p-4 md:p-6">
                  <div className="size-16 md:size-20 overflow-hidden rounded-lg bg-muted flex-shrink-0">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg md:text-xl text-pretty mb-2">{item.name}</CardTitle>
                    <p className="text-lg font-semibold text-primary">{formatCurrency(item.price)}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 pb-4 md:px-6 md:pb-6">
                  <div className="flex items-center gap-3" aria-label={`Quantity for ${item.name}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(item.id, Math.max(1, item.quantity - 1))}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="min-w-12 text-center font-semibold text-lg">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-xl font-bold text-foreground">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">Remove {item.name}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="h-fit sticky top-24 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(total)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-0">
              <Button onClick={onCheckout} className="w-full text-base font-semibold" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Processing…" : "Proceed to Checkout"}
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={clear}>
                Clear Cart
              </Button>
              {message ? (
                <p
                  role="status"
                  className={`text-sm text-center p-3 rounded-md ${message.includes("Success") ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}`}
                >
                  {message}
                </p>
              ) : null}
            </CardFooter>
          </Card>
        </div>
      )}
    </section>
  )
}
