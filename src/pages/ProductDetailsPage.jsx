import { useEffect, useState } from 'react'
import { ArrowLeft, ImageOff } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ConfirmationModal from '../components/marketplace/ConfirmationModal'
import EmiPlanSelector from '../components/marketplace/EmiPlanSelector'
import ErrorState from '../components/marketplace/ErrorState'
import VariantSelector from '../components/marketplace/VariantSelector'
import productImages from '../data/productImages'
import { getProductById } from '../services/productService'
import { formatCurrency } from '../utils/formatCurrency'

function ProductDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="h-10 w-24 rounded-full bg-text-secondary/15" />
      <div className="aspect-video rounded-2xl bg-text-secondary/15" />
      <div className="h-7 w-3/4 rounded bg-text-secondary/15" />
      <div className="h-6 w-1/3 rounded bg-text-secondary/15" />
      <div className="h-12 rounded-full bg-text-secondary/15" />
      <div className="h-24 rounded-2xl bg-text-secondary/15" />
      <div className="h-24 rounded-2xl bg-text-secondary/15" />
    </div>
  )
}

function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedVariantId, setSelectedVariantId] = useState(null)
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasImageError, setHasImageError] = useState(false)

  async function loadProduct() {
    setIsLoading(true)
    setError(null)
    setSelectedVariantId(null)
    setSelectedPlanIndex(null)
    setIsModalOpen(false)
    setHasImageError(false)

    try {
      const fetchedProduct = await getProductById(id)
      setProduct(fetchedProduct)
      if (fetchedProduct?.variants?.length) {
        setSelectedVariantId(fetchedProduct.variants[0].id)
      }
    } catch {
      setError('Unable to load this product. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isCurrent = true

    getProductById(id)
      .then((fetchedProduct) => {
        if (!isCurrent) {
          return
        }

        setProduct(fetchedProduct)
        setSelectedVariantId(fetchedProduct?.variants?.[0]?.id ?? null)
        setSelectedPlanIndex(null)
        setIsModalOpen(false)
        setHasImageError(false)
      })
      .catch(() => {
        if (isCurrent) {
          setError('Unable to load this product. Please try again.')
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
  }, [id])

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadProduct} />
  }

  if (!product) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl bg-card px-6 py-10 text-center shadow-sm">
        <h1 className="text-xl font-bold text-text-primary">Product not found</h1>
        <Link
          to="/shop/marketplace"
          className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Back to Marketplace
        </Link>
      </div>
    )
  }

  const selectedVariant = product.variants?.find(
    (variant) => variant.id === selectedVariantId,
  )
  const selectedPlan = selectedPlanIndex === null ? null : product.emiPlans[selectedPlanIndex]
  const hasDetails = product.description || product.specifications?.length
  const canProceed = Boolean(selectedPlan) && (!product.variants?.length || Boolean(selectedVariant))

  return (
    <section className="pb-20">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Back
      </button>

      <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
        <div className="aspect-[4/3] bg-primary/5">
          {hasImageError || !productImages[product.id] ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-text-secondary/10 text-text-secondary">
              <ImageOff size={32} aria-hidden="true" />
              <span className="text-sm">Image unavailable</span>
            </div>
          ) : (
            <img
              src={productImages[product.id]}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={() => setHasImageError(true)}
            />
          )}
        </div>
        <div className="p-5">
          <h1 className="text-2xl font-bold text-text-primary">{product.name}</h1>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-text-primary">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-text-secondary line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {product.variants?.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-text-primary">Choose an option</h2>
          <VariantSelector
            variants={product.variants}
            selectedVariantId={selectedVariantId}
            onSelect={setSelectedVariantId}
          />
        </section>
      )}

      {hasDetails && (
        <section className="mt-6 rounded-2xl bg-card p-5 shadow-sm">
          <h2 className="text-lg font-bold text-text-primary">Details</h2>
          {product.description && (
            <p className="mt-3 text-sm leading-6 text-text-secondary">{product.description}</p>
          )}
          {product.specifications?.length > 0 && (
            <dl className="mt-4 divide-y divide-text-secondary/15">
              {product.specifications.map((specification) => (
                <div key={specification.label} className="flex justify-between gap-6 py-3 text-sm">
                  <dt className="text-text-secondary">{specification.label}</dt>
                  <dd className="text-right font-medium text-text-primary">
                    {specification.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      )}

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold text-text-primary">Choose an EMI plan</h2>
        <EmiPlanSelector
          emiPlans={product.emiPlans}
          selectedPlanIndex={selectedPlanIndex}
          onSelect={setSelectedPlanIndex}
        />
      </section>

      <div className="sticky bottom-20 z-20 mt-6 bg-page py-3">
        <button
          type="button"
          disabled={!canProceed}
          onClick={() => setIsModalOpen(true)}
          className="w-full rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-text-secondary/40 disabled:text-white/80"
        >
          Proceed with this plan
        </button>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        selectedVariant={selectedVariant}
        selectedPlan={selectedPlan}
      />
    </section>
  )
}

export default ProductDetailsPage
