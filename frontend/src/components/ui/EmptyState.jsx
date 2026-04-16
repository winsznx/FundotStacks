import { cn } from '@/lib/cn'

export function EmptyState({ title, description, action, className, icon }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-10 rounded-2xl border border-dashed border-secondary-300 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-900/50',
        className,
      )}
    >
      {icon && <div className="mb-4 text-4xl" aria-hidden="true">{icon}</div>}
      {title && <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">{title}</h3>}
      {description && <p className="mt-2 max-w-sm text-sm text-secondary-600 dark:text-secondary-400">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
