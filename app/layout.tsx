import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import SiteHeader from "@/components/site-header"
import { CartProvider } from "@/hooks/use-cart"
import { Suspense } from "react"
import "./globals.css"
import { DM_Sans } from "next/font/google"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Shopping Cart - Simple Shopping",
  description: "A simple shopping cart application",
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${dmSans.variable} ${GeistMono.variable}`}>
        <CartProvider>
          <SiteHeader />
          <Suspense>{children}</Suspense>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
