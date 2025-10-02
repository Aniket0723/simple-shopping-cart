"use client"

import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

export default function SiteHeader() {
  const { itemCount } = useCart()

  return (
    <header className="border-b bg-background sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <nav className="container mx-auto flex items-center justify-between px-4 py-5 md:px-6 md:py-6">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          Shopping Cart
          <span className="sr-only">Home</span>
        </Link>
        <Link href="/cart" aria-label="View cart">
          <Button variant="default" size="lg" className="gap-2 font-medium">
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-xs font-bold">
                {itemCount}
              </span>
            )}
          </Button>
        </Link>
      </nav>
    </header>
  )
}
