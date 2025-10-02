import dynamic from "next/dynamic"

// Load client component dynamically to ensure 'use client' works in RSC page
const CartSummary = dynamic(() => import("@/components/cart-summary"), { ssr: false })

export default function CartPage() {
  return (
    <main>
      <CartSummary />
    </main>
  )
}
