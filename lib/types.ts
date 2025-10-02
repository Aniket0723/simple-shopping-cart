export type Product = {
  id: string
  name: string
  price: number // in USD
  imageUrl: string
}

export type CartItem = {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

export type CartState = {
  items: Record<string, CartItem>
}
