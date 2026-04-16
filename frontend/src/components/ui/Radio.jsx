import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

export const Radio = forwardRef(function Radio(
  { className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type="radio"
      className={cn(
        'h-4 w-4 border-secondary-300 dark:border-secondary-700 text-primary-500 focus:ring-primary-400',
        className,
      )}
      {...rest}
    />
  )
})
