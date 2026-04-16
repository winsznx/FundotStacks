import { cn } from '@/lib/cn'

export function Stat({ label, value, delta, helpText, className }) {
  const deltaClass = !delta
    ? ''
    : delta > 0
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-600 dark:text-red-400'

  return (
    <div className={cn('space-y-1', className)}>
      <p className="text-xs font-medium uppercase tracking-wide text-secondary-500 dark:text-secondary-400">
        {label}
      </p>
      <p className="text-2xl font-bold text-secondary-900 dark:text-white">{value}</p>
      {delta !== undefined && delta !== null && (
        <p className={cn('text-sm font-semibold', deltaClass)}>
          {delta > 0 ? '+' : ''}{delta}%
        </p>
      )}
      {helpText && <p className="text-xs text-secondary-500 dark:text-secondary-400">{helpText}</p>}
    </div>
  )
}

export function StatGroup({ className, children }) {
  return <div className={cn('grid gap-4 grid-cols-2 md:grid-cols-4', className)}>{children}</div>
}
