import { CheckCircle2, X } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'

function ConfirmationModal({ isOpen, onClose, product, selectedVariant, selectedPlan }) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-text-primary/55 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-card p-6 text-center shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-summary-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-text-secondary hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="Close order summary"
        >
          <X size={20} aria-hidden="true" />
        </button>
        <CheckCircle2 className="mx-auto text-primary" size={48} aria-hidden="true" />
        <h2 id="order-summary-title" className="mt-4 text-xl font-bold text-text-primary">
          Order Summary (Demo)
        </h2>
        <p className="mt-4 font-semibold text-text-primary">{product.name}</p>
        {selectedVariant && (
          <p className="mt-1 text-sm text-text-secondary">{selectedVariant.label}</p>
        )}
        <p className="mt-3 text-sm text-text-secondary">
          {selectedPlan.tenureMonths} months — {formatCurrency(selectedPlan.monthlyAmount)}/mo
        </p>
        <p className="mt-5 text-xs leading-5 text-text-secondary">
          This is a demo flow. No real payment or order is created.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Back to Marketplace
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal
