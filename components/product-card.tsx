"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/format"
import { ShoppingCart } from "lucide-react"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-300 border-border overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square w-full overflow-hidden bg-muted relative">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-5 space-y-2">
        <h3 className="text-lg md:text-xl font-bold text-foreground text-balance leading-tight">{product.name}</h3>
        <p className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button
          onClick={() => addItem(product, 1)}
          className="w-full font-semibold text-base gap-2"
          size="lg"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
