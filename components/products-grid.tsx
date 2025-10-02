"use client"

import useSWR from "swr"
import { ProductCard } from "./product-card"
import type { Product } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function ProductsGrid() {
  const { data, error, isLoading } = useSWR<{ products: Product[] }>("/api/products", fetcher)

  if (error) {
    return (
      <div role="alert" className="container mx-auto p-6 md:p-8">
        <div className="bg-destructive/10 text-destructive px-6 py-4 rounded-lg text-center">
          Failed to load products. Please try again later.
        </div>
      </div>
    )
  }

  if (isLoading || !data) {
    return (
      <div className="container mx-auto p-6 md:p-8">
        <div className="text-center text-muted-foreground">Loading products…</div>
      </div>
    )
  }

  return (
    <section aria-labelledby="products-heading" className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <h2 id="products-heading" className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-balance">
        Our Collection
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
