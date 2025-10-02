// Node.js ESM script to verify products endpoint shape
// Usage: Run this script in v0 to see logs.

const base = process.env.V0_PREVIEW_URL || 'http://localhost:3000'

async function run() {
  console.log('[test] Fetching', `${base}/api/products`)
  const res = await fetch(`${base}/api/products`)
  if (!res.ok) {
    console.log('[test] FAIL: HTTP status', res.status)
    return
  }
  const data = await res.json()
  if (!data || !Array.isArray(data.products)) {
    console.log('[test] FAIL: Missing products array')
    return
  }
  const products = data.products
  const hasEnough = products.length >= 5
  const hasFields = products.every(
    (p) => typeof p.id === 'string' && typeof p.name === 'string' && typeof p.price === 'number' && typeof p.imageUrl === 'string'
  )
  if (hasEnough && hasFields) {
    console.log('[test] PASS: received', products.length, 'products with correct fields')
  } else {
    console.log('[test] FAIL: Validation did not pass', { count: products.length, hasFields })
  }
}

run().catch((e) => {
  console.log('[test] ERROR:', e?.message || e)
})
