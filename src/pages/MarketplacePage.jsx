import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import EmptyState from '../components/marketplace/EmptyState'
import ErrorState from '../components/marketplace/ErrorState'
import ProductGrid from '../components/marketplace/ProductGrid'
import ProductGridSkeleton from '../components/marketplace/ProductGridSkeleton'
import { getProducts } from '../services/productService'

function MarketplacePage() {
  const navigate = useNavigate()
  const { searchQuery = '' } = useOutletContext()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  async function loadProducts() {
    setIsLoading(true)
    setError(null)

    try {
      const productList = await getProducts()
      setProducts(productList)
    } catch {
      setError('Unable to load marketplace products. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isCurrent = true

    getProducts()
      .then((productList) => {
        if (isCurrent) {
          setProducts(productList)
        }
      })
      .catch(() => {
        if (isCurrent) {
          setError('Unable to load marketplace products. Please try again.')
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false)
        }
      })

    return () => {
      isCurrent = false
    }
  }, [])

  function handleProductClick(product) {
    navigate(`/shop/marketplace/product/${product.id}`)
  }

  if (isLoading) {
    return <ProductGridSkeleton />
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadProducts} />
  }

  if (products.length === 0) {
    return <EmptyState message="No marketplace products are available right now." />
  }

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredProducts = products.filter((product) =>
    [product.name, product.category, product.brand]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedQuery)),
  )

  if (filteredProducts.length === 0) {
    return <EmptyState message="No products match your search." />
  }

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-text-primary">Marketplace</h1>
      <ProductGrid products={filteredProducts} onProductClick={handleProductClick} />
    </section>
  )
}

export default MarketplacePage
