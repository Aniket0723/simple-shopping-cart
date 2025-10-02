import ProductsGrid from "@/components/products-grid"

export default function Page() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-b from-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-12 md:py-20 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
            Welcome to Shopping Cart
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover premium products curated just for you
          </p>
        </div>
      </section>
      <ProductsGrid />
    </main>
  )
}
