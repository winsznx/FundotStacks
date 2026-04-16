import { cn } from '@/lib/cn'

export function Divider({ orientation = 'horizontal', className }) {
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-block w-px self-stretch bg-secondary-200 dark:bg-secondary-800', className)}
      />
    )
  }
  return (
    <hr
      className={cn('border-0 h-px bg-secondary-200 dark:bg-secondary-800 w-full', className)}
    />
  )
}
