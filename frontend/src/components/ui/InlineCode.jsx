import { cn } from '@/lib/cn'

export function InlineCode({ className, children, ...rest }) {
  return (
    <code
      className={cn(
        'px-1.5 py-0.5 rounded-md text-xs font-mono bg-secondary-100 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200',
        className,
      )}
      {...rest}
    >
      {children}
    </code>
  )
}
