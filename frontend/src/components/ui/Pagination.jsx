import { cn } from '@/lib/cn'
import { clamp, range } from '@/lib/number'

export function Pagination({ page, pageCount, onPageChange, className, siblingCount = 1 }) {
  if (pageCount <= 1) return null
  const current = clamp(page, 1, pageCount)
  const start = Math.max(1, current - siblingCount)
  const end = Math.min(pageCount, current + siblingCount)
  const pages = range(start, end + 1)

  const goTo = (next) => {
    const safe = clamp(next, 1, pageCount)
    if (safe !== current) onPageChange?.(safe)
  }

  return (
    <nav className={cn('flex items-center gap-1', className)} aria-label="Pagination">
      <button
        type="button"
        onClick={() => goTo(current - 1)}
        disabled={current === 1}
        className="px-3 py-1.5 rounded-lg text-sm font-medium text-secondary-600 dark:text-secondary-300 disabled:opacity-40"
      >
        Prev
      </button>
      {start > 1 && <span className="px-2 text-secondary-400">…</span>}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => goTo(p)}
          aria-current={p === current ? 'page' : undefined}
          className={cn(
            'min-w-[2rem] px-2.5 py-1.5 rounded-lg text-sm font-medium',
            p === current
              ? 'bg-primary-500 text-white'
              : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800',
          )}
        >
          {p}
        </button>
      ))}
      {end < pageCount && <span className="px-2 text-secondary-400">…</span>}
      <button
        type="button"
        onClick={() => goTo(current + 1)}
        disabled={current === pageCount}
        className="px-3 py-1.5 rounded-lg text-sm font-medium text-secondary-600 dark:text-secondary-300 disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  )
}
