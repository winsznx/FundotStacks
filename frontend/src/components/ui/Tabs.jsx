import { cn } from '@/lib/cn'

export function Tabs({ items, value, onChange, className }) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 rounded-xl bg-secondary-100 dark:bg-secondary-800 p-1',
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange?.(item.value)}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
              active
                ? 'bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white shadow-sm'
                : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white',
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
