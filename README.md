# Shopping Cart

A modern, full-stack e-commerce shopping cart application built with Next.js 15, React, TypeScript, and Tailwind CSS. This project demonstrates a complete shopping experience with product browsing, cart management, and checkout functionality.

## Features

- **Product Catalog**: Browse 8 premium products with images and pricing
- **Shopping Cart**: Add, remove, and update product quantities
- **Persistent Cart**: Cart data persists across browser sessions using localStorage
- **Real-time Updates**: Cart state syncs across all components using SWR
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Checkout Flow**: Complete checkout process with backend validation
- **Dark Mode Support**: Full dark mode theme support
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **SWR** - Data fetching and state management
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **TypeScript** - Type-safe backend code

## Backend Architecture

### API Endpoints

#### 1. GET /api/products
Returns a list of all available products.

**Response:**
\`\`\`json
{
  "products": [
    {
      "id": "1",
      "name": "Wireless Headphones",
      "price": 129.99,
      "imageUrl": "/premium-wireless-headphones.png"
    }
    // ... more products
  ]
}
\`\`\`

**Implementation Details:**
- Products are stored as hardcoded JSON data in the route file
- No database required - perfect for demo/prototype applications
- Returns 8 products with id, name, price, and imageUrl

#### 2. POST /api/checkout
Processes checkout orders with product validation and logging.

**Request Body:**
\`\`\`json
{
  "items": [
    { "id": "1", "quantity": 2 },
    { "id": "3", "quantity": 1 }
  ]
}
\`\`\`

**Response:**
\`\`\`json
{
  "ok": true,
  "message": "Order received",
  "total": 309.97,
  "items": [
    {
      "id": "1",
      "name": "Wireless Headphones",
      "price": 129.99,
      "quantity": 2,
      "lineTotal": 259.98
    }
    // ... more items
  ]
}
\`\`\`

**Implementation Details:**
- Validates all product IDs against the product catalog
- Calculates line totals and order total
- Logs complete order details to server console with timestamp
- Returns detailed order summary with pricing breakdown
- Error handling for invalid products or empty carts

**Console Output Example:**
\`\`\`
[checkout] New order received: {
  items: [
    { id: '1', name: 'Wireless Headphones', price: 129.99, quantity: 2, lineTotal: 259.98 }
  ],
  total: 259.98,
  createdAt: '2025-02-10T12:34:56.789Z'
}
\`\`\`

## Frontend Architecture

### State Management

#### Cart Hook (`hooks/use-cart.tsx`)
The cart uses a custom React hook with SWR for state management:

- **Persistent Storage**: Cart data saved to localStorage
- **Real-time Sync**: SWR keeps cart state synchronized across all components
- **Optimistic Updates**: Instant UI updates without waiting for storage
- **Type Safety**: Full TypeScript support for cart operations

**Available Methods:**
\`\`\`typescript
const {
  state,          // Current cart state
  itemsArray,     // Array of cart items
  itemCount,      // Total number of items
  total,          // Total price
  addItem,        // Add product to cart
  removeItem,     // Remove product from cart
  setQuantity,    // Update item quantity
  clear           // Clear entire cart
} = useCart()
\`\`\`

### Key Components

#### 1. SiteHeader (`components/site-header.tsx`)
- Navigation bar with brand logo
- Shopping cart icon with item count badge
- Responsive mobile menu
- Links to home and cart pages

#### 2. ProductsGrid (`components/products-grid.tsx`)
- Fetches products from `/api/products`
- Displays products in responsive grid layout
- Loading states and error handling
- Uses SWR for data fetching

#### 3. ProductCard (`components/product-card.tsx`)
- Individual product display
- Product image, name, and price
- "Add to Cart" button with loading state
- Toast notifications on add

#### 4. CartSummary (`components/cart-summary.tsx`)
- Lists all cart items with images
- Quantity controls (increment/decrement)
- Remove item functionality
- Displays subtotal and total
- "Proceed to Checkout" button
- Handles checkout API call
- Success/error notifications

### Styling

The application uses a custom emerald green theme with:
- **Primary Color**: Emerald green (#059669)
- **Accent Color**: Light emerald (#10b981)
- **Typography**: DM Sans for headings and body text
- **Dark Mode**: Full dark theme support with proper contrast
- **Responsive**: Mobile-first design with Tailwind breakpoints

## Installation and Setup

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Local Development

1. **Clone or download the project**
   \`\`\`bash
   # If using git
   git clone <repository-url>
   cd shopping-cart
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
# Create optimized production build
npm run build

# Start production server
npm run start
\`\`\`

## Usage Guide

### Adding Products to Cart
1. Browse products on the home page
2. Click "Add to Cart" on any product
3. See confirmation toast notification
4. Cart badge updates with item count

### Managing Cart
1. Click the cart icon in the header
2. View all items in your cart
3. Adjust quantities using +/- buttons
4. Remove items with the trash icon
5. See real-time total updates

### Checkout Process
1. Review items in cart
2. Click "Proceed to Checkout"
3. Order is sent to backend for processing
4. Backend validates products and calculates total
5. Order details logged to server console
6. Success message displayed
7. Cart automatically cleared

### Viewing Server Logs
When running locally, checkout orders are logged to your terminal:
\`\`\`bash
[checkout] New order received: { items: [...], total: 299.99, createdAt: '...' }
\`\`\`

## Development Notes

### No Database Required
This application uses hardcoded product data, making it perfect for:
- Prototyping and demos
- Learning Next.js and React patterns
- Testing e-commerce UI/UX concepts

### Extending the Application
To add a real database:
1. Replace hardcoded products in `/api/products/route.ts`
2. Update `/api/checkout/route.ts` to save orders to database
3. Add user authentication for order history
4. Implement payment processing (Stripe, PayPal, etc.)

### Environment Variables
No environment variables required for basic functionality. Add these for production:
- `NEXT_PUBLIC_API_URL` - API base URL
- Database connection strings (if adding persistence)
- Payment gateway keys (if adding payments)


