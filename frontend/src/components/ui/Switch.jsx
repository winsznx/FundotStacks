import { cn } from '@/lib/cn'

export function Switch({ checked = false, onCheckedChange, disabled = false, className, label, id }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-60',
        checked ? 'bg-primary-500' : 'bg-secondary-300 dark:bg-secondary-700',
        className,
      )}
    >
      <span
        className={cn(
          'h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5',
        )}
      />
    </button>
  )
}
