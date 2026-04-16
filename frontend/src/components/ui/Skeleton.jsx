import { cn } from '@/lib/cn'

export function Skeleton({ className, rounded = 'rounded-md', ...rest }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'motion-safe:animate-pulse bg-secondary-200 dark:bg-secondary-800',
        rounded,
        className,
      )}
      {...rest}
    />
  )
}
