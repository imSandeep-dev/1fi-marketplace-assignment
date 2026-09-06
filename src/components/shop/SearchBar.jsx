import { Search } from 'lucide-react'

function SearchBar({ placeholder, value, onChange }) {
  return (
    <label className="flex w-full items-center gap-3 rounded-full bg-card px-4 py-3 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-primary">
      <Search className="shrink-0 text-text-secondary" size={20} aria-hidden="true" />
      <span className="sr-only">Search</span>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
      />
    </label>
  )
}

export default SearchBar
