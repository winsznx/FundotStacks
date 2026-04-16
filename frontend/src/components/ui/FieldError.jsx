import { cn } from '@/lib/cn'

export function FieldError({ className, children, id }) {
  if (!children) return null
  return (
    <p
      id={id}
      role="alert"
      className={cn('mt-1 text-xs font-medium text-red-600 dark:text-red-400', className)}
    >
      {children}
    </p>
  )
}
