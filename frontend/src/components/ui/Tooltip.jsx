import { useId } from 'react'
import { cn } from '@/lib/cn'

export function Tooltip({ label, children, className, side = 'top' }) {
  const id = useId()
  const sideMap = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }
  return (
    <span className={cn('relative inline-flex group', className)}>
      <span aria-describedby={id}>{children}</span>
      <span
        role="tooltip"
        id={id}
        className={cn(
          'pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-secondary-900 dark:bg-secondary-700 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
          sideMap[side],
        )}
      >
        {label}
      </span>
    </span>
  )
}
