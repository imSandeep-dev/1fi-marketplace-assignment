import { Home, Receipt, Store, TrendingUp, User } from 'lucide-react'

const navigationItems = [
  { label: 'Home', icon: Home },
  { label: 'Shop', icon: Store, active: true },
  { label: 'EMI Dues', icon: Receipt },
  { label: 'Limit', icon: TrendingUp },
  { label: 'Profile', icon: User },
]

function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/10 bg-card px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-4px_14px_rgba(17,24,39,0.06)]"
      aria-label="Primary navigation"
    >
      <div className="mx-auto w-full max-w-2xl px-4 md:px-6">
        <div className="mx-auto flex max-w-md items-end justify-between">
          {navigationItems.map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              className={`relative flex min-w-0 flex-1 flex-col items-center gap-1 text-xs ${
                active ? 'font-semibold text-primary' : 'text-text-secondary'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              {active && (
                <span
                  className="absolute -top-2 h-0.5 w-6 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
              <Icon size={20} strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
              <span className="whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default BottomNav
