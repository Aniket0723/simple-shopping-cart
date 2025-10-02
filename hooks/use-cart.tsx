"use client"

import type React from "react"

import useSWR from "swr"
import { createContext, useContext, useMemo } from "react"
import type { CartState, Product } from "@/lib/types"

const STORAGE_KEY = "cart:v1"

function readCart(): CartState {
  if (typeof window === "undefined") return { items: {} }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: {} }
    const parsed = JSON.parse(raw) as CartState
    if (!parsed?.items) return { items: {} }
    return parsed
  } catch {
    return { items: {} }
  }
}

function writeCart(state: CartState) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

// Use SWR to keep cart state in sync across components
function useCartSWR() {
  const { data, mutate } = useSWR<CartState>(STORAGE_KEY, async () => readCart(), {
    fallbackData: { items: {} },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const state = data ?? { items: {} }

  function persist(next: CartState) {
    writeCart(next)
    // don't revalidate; local state source-of-truth
    mutate(next, { revalidate: false })
  }

  function addItem(product: Product, quantity = 1) {
    const existing = state.items[product.id]
    const nextQty = (existing?.quantity ?? 0) + Math.max(1, Math.floor(quantity))
    const next: CartState = {
      items: {
        ...state.items,
        [product.id]: {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: nextQty,
        },
      },
    }
    persist(next)
  }

  function removeItem(id: string) {
    const { [id]: _, ...rest } = state.items
    persist({ items: rest })
  }

  function setQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    const current = state.items[id]
    if (!current) return
    const next: CartState = {
      items: {
        ...state.items,
        [id]: { ...current, quantity: Math.floor(quantity) },
      },
    }
    persist(next)
  }

  function clear() {
    persist({ items: {} })
  }

  const itemsArray = useMemo(() => Object.values(state.items), [state.items])
  const itemCount = useMemo(() => itemsArray.reduce((n, it) => n + it.quantity, 0), [itemsArray])
  const total = useMemo(() => itemsArray.reduce((sum, it) => sum + it.price * it.quantity, 0), [itemsArray])

  return {
    state,
    itemsArray,
    itemCount,
    total,
    addItem,
    removeItem,
    setQuantity,
    clear,
  }
}

// Context wrapper so header and pages can consume easily
type CartContextValue = ReturnType<typeof useCartSWR>
const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const value = useCartSWR()
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
