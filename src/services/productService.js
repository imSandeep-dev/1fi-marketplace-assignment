import products from '../data/products.json'

const NETWORK_DELAY_MS = 600

function withDelay(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), NETWORK_DELAY_MS)
  })
}

export function getProducts() {
  return withDelay(products)
}

export function getProductById(id) {
  return withDelay(products.find((product) => product.id === id) ?? null)
}
