import { NextResponse } from "next/server"

const PRODUCTS = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 129.99,
    imageUrl: "/premium-wireless-headphones.png",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    imageUrl: "/luxury-smart-watch.jpg",
  },
  {
    id: "3",
    name: "Laptop Stand",
    price: 49.99,
    imageUrl: "/modern-laptop-stand.jpg",
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    price: 159.99,
    imageUrl: "/rgb-mechanical-keyboard.jpg",
  },
  {
    id: "5",
    name: "USB-C Hub",
    price: 79.99,
    imageUrl: "/usb-c-hub-adapter.jpg",
  },
  {
    id: "6",
    name: "Desk Lamp",
    price: 89.99,
    imageUrl: "/modern-desk-lamp.png",
  },
  {
    id: "7",
    name: "Webcam 4K",
    price: 199.99,
    imageUrl: "/4k-webcam.png",
  },
  {
    id: "8",
    name: "Portable SSD",
    price: 149.99,
    imageUrl: "/portable-ssd-drive.jpg",
  },
]

type CheckoutItem = { id: string; quantity: number }

export async function POST(req: Request) {
  const { items } = (await req.json()) as { items: CheckoutItem[] }

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ ok: false, message: "No items provided" }, { status: 400 })
  }

  // Build a map of products for quick lookup
  const productMap = new Map(PRODUCTS.map((p) => [p.id, p]))

  let total = 0
  const detailed = items.map((it) => {
    const product = productMap.get(it.id)
    if (!product) {
      throw new Error(`Invalid product id: ${it.id}`)
    }
    const qty = Math.max(1, Math.floor(it.quantity || 1))
    const lineTotal = product.price * qty
    total += lineTotal
    return { id: product.id, name: product.name, price: product.price, quantity: qty, lineTotal }
  })

  // Simulate "processing" - log to server console
  console.log("[checkout] New order received:", {
    items: detailed,
    total,
    createdAt: new Date().toISOString(),
  })

  return NextResponse.json({
    ok: true,
    message: "Order received",
    total,
    items: detailed,
  })
}
