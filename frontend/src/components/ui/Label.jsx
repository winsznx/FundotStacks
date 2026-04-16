import { cn } from '@/lib/cn'

export function Label({ className, required = false, children, ...rest }) {
  return (
    <label
      className={cn(
        'block text-sm font-semibold text-secondary-700 dark:text-secondary-300',
        className,
      )}
      {...rest}
    >
      {children}
      {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
    </label>
  )
}
