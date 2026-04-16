import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

export const SearchInput = forwardRef(function SearchInput(
  { className, onClear, value, ...rest },
  ref,
) {
  const showClear = typeof value === 'string' && value.length > 0 && typeof onClear === 'function'
  return (
    <div className={cn('relative', className)}>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
      <input
        ref={ref}
        type="search"
        value={value}
        className="w-full rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 pl-9 pr-9 py-2 text-sm text-secondary-900 dark:text-white placeholder:text-secondary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        {...rest}
      />
      {showClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
        >
          ×
        </button>
      )}
    </div>
  )
})
