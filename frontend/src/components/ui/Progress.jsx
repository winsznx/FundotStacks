import { cn } from '@/lib/cn'
import { clamp } from '@/lib/number'

export function Progress({ value = 0, max = 100, className, label }) {
  const pct = clamp(Number(value), 0, max) / max * 100
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn('w-full h-2 rounded-full bg-secondary-200 dark:bg-secondary-800 overflow-hidden', className)}
    >
      <div
        className="h-full bg-primary-500 transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
