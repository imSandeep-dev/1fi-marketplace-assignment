import { CircleAlert } from 'lucide-react'

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl bg-card px-6 py-10 text-center shadow-sm">
      <CircleAlert className="text-primary" size={36} aria-hidden="true" />
      <p className="mt-3 text-sm text-text-secondary">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Retry
      </button>
    </div>
  )
}

export default ErrorState
