import { formatCurrency } from '../../utils/formatCurrency'

function EmiPlanSelector({ emiPlans, selectedPlanIndex, onSelect }) {
  return (
    <div className="space-y-3">
      {emiPlans.map((plan, index) => {
        const isSelected = index === selectedPlanIndex

        return (
          <button
            key={`${plan.tenureMonths}-${plan.monthlyAmount}`}
            type="button"
            onClick={() => onSelect(index)}
            className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isSelected
                ? 'border-primary bg-primary/10 hover:bg-primary/15'
                : 'border-text-secondary/20 bg-card hover:border-primary/50'
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                isSelected ? 'border-primary' : 'border-text-secondary/50'
              }`}
              aria-hidden="true"
            >
              {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-text-primary">
                {plan.tenureMonths} months
              </span>
              {plan.noCostEmi === true ? (
                <span className="mt-1 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
                  No-cost EMI
                </span>
              ) : plan.interestRate != null ? (
                <span className="mt-1 block text-xs text-text-secondary">
                  {plan.interestRate}% p.a.
                </span>
              ) : null}
              {plan.totalPayable != null && (
                <span className="mt-2 block text-xs text-text-secondary">
                  Total payable: {formatCurrency(plan.totalPayable)}
                </span>
              )}
            </span>
            <span className="shrink-0 text-lg font-bold text-text-primary">
              {formatCurrency(plan.monthlyAmount)}/mo
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default EmiPlanSelector
