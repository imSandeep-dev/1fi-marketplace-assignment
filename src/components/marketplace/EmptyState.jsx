import { PackageOpen } from 'lucide-react'

function EmptyState({ message }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl bg-card px-6 py-10 text-center shadow-sm">
      <PackageOpen className="text-primary" size={36} aria-hidden="true" />
      <p className="mt-3 text-sm text-text-secondary">{message}</p>
    </div>
  )
}

export default EmptyState
