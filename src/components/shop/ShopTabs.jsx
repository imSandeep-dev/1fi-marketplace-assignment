const tabs = ['Top Brands', 'Nearby Stores', '1Fi Marketplace']

function ShopTabs({ activeTab, onTabChange }) {
  return (
    <div
      className="flex w-full items-center rounded-full bg-primary/10 p-1"
      role="tablist"
      aria-label="Shop categories"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab)}
            className={`relative min-w-0 flex-1 whitespace-nowrap rounded-full px-2 py-2 text-xs transition-colors sm:px-3 sm:text-sm ${
              isActive
                ? 'bg-card font-bold text-primary shadow-sm hover:bg-primary/10'
                : 'font-medium text-text-secondary hover:bg-primary/5 hover:text-primary/80'
            }`}
          >
            {tab}
            {isActive && (
              <span
                className="mx-auto mt-1 block h-0.5 w-5 rounded-full bg-primary"
                aria-hidden="true"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default ShopTabs
