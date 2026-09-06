import ProductCard from './ProductCard'

function ProductGrid({ products, onProductClick }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onClick={onProductClick} />
      ))}
    </div>
  )
}

export default ProductGrid
