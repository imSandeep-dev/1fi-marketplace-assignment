function ProductGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Loading products"
      aria-busy="true"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl bg-card p-4 shadow-sm">
          <div className="aspect-video animate-pulse rounded-xl bg-text-secondary/15" />
          <div className="mt-4 h-5 w-3/5 animate-pulse rounded bg-text-secondary/15" />
          <div className="mt-3 h-5 w-2/5 animate-pulse rounded bg-text-secondary/15" />
          <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-text-secondary/15" />
        </div>
      ))}
    </div>
  )
}

export default ProductGridSkeleton
