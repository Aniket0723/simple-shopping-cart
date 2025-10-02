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

export async function GET() {
  return NextResponse.json({ products: PRODUCTS })
}
