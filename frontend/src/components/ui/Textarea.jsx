import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

export const Textarea = forwardRef(function Textarea(
  { className, invalid = false, rows = 4, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full rounded-xl border bg-white dark:bg-secondary-900 px-4 py-2 text-sm text-secondary-900 dark:text-white placeholder:text-secondary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:opacity-60 resize-y',
        invalid
          ? 'border-red-400 focus-visible:ring-red-400'
          : 'border-secondary-200 dark:border-secondary-700',
        className,
      )}
      {...rest}
    />
  )
})
