import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

export const Input = forwardRef(function Input(
  { className, invalid = false, type = 'text', ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full rounded-xl border bg-white dark:bg-secondary-900 px-4 py-2 text-sm text-secondary-900 dark:text-white placeholder:text-secondary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:opacity-60',
        invalid
          ? 'border-red-400 focus-visible:ring-red-400'
          : 'border-secondary-200 dark:border-secondary-700',
        className,
      )}
      {...rest}
    />
  )
})
