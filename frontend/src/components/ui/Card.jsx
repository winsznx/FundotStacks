import { cn } from '@/lib/cn'

export function Card({ as: Tag = 'div', className, hoverable = false, children, ...rest }) {
  return (
    <Tag
      className={cn(
        'rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-sm',
        hoverable && 'transition-shadow hover:shadow-lg',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function CardHeader({ className, children, ...rest }) {
  return (
    <div className={cn('p-6 border-b border-secondary-200 dark:border-secondary-800', className)} {...rest}>
      {children}
    </div>
  )
}

export function CardBody({ className, children, ...rest }) {
  return <div className={cn('p-6', className)} {...rest}>{children}</div>
}

export function CardFooter({ className, children, ...rest }) {
  return (
    <div className={cn('p-6 border-t border-secondary-200 dark:border-secondary-800', className)} {...rest}>
      {children}
    </div>
  )
}
