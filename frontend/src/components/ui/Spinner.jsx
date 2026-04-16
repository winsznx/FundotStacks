import { cn } from '@/lib/cn'

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-4',
  xl: 'w-14 h-14 border-4',
}

export function Spinner({ size = 'md', className, label = 'Loading' }) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        'inline-block rounded-full border-current border-t-transparent motion-safe:animate-spin text-primary-500',
        sizeMap[size],
        className,
      )}
    >
      <span className="sr-only">{label}</span>
    </span>
  )
}
