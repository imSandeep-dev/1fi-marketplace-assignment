function VariantSelector({ variants, selectedVariantId, onSelect }) {
  if (!variants?.length) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedVariantId

        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isSelected
                ? 'border-primary bg-primary text-white hover:bg-primary/90'
                : 'border-text-secondary/30 bg-card text-text-primary hover:border-primary'
            }`}
          >
            {variant.label}
          </button>
        )
      })}
    </div>
  )
}

export default VariantSelector
