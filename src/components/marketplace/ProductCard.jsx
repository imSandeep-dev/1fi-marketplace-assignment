import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import productImages from '../../data/productImages'
import { formatCurrency } from '../../utils/formatCurrency'

function ProductCard({ product, onClick }) {
  const [hasImageError, setHasImageError] = useState(false)
  const cheapestEmiPlan = product.emiPlans.reduce((lowestPlan, plan) =>
    plan.monthlyAmount < lowestPlan.monthlyAmount ? plan : lowestPlan,
  )

  return (
    <button
      type="button"
      onClick={() => onClick(product)}
      className="w-full overflow-hidden rounded-2xl bg-card text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-primary/5">
        {hasImageError || !productImages[product.id] ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-text-secondary/10 text-text-secondary">
            <ImageOff size={24} aria-hidden="true" />
            <span className="text-xs">Image unavailable</span>
          </div>
        ) : (
          <img
            src={productImages[product.id]}
            alt={product.name}
            className="h-full w-full object-cover object-center"
            onError={() => setHasImageError(true)}
          />
        )}
        {cheapestEmiPlan.noCostEmi === true && (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            No-cost EMI
          </span>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-base font-bold text-text-primary">{product.name}</h2>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-text-primary">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-text-secondary line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-text-secondary">
          EMI from {formatCurrency(cheapestEmiPlan.monthlyAmount)}/mo
        </p>
      </div>
    </button>
  )
}

export default ProductCard
