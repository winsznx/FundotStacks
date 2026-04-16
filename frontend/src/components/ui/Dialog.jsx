import { useEffect } from 'react'
import { cn } from '@/lib/cn'

export function Dialog({ open, onClose, title, className, children, footer }) {
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          'relative w-full max-w-lg rounded-2xl bg-white dark:bg-secondary-900 shadow-xl border border-secondary-200 dark:border-secondary-800 overflow-hidden',
          className,
        )}
      >
        {title && (
          <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-secondary-500 hover:text-secondary-900 dark:hover:text-white"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-secondary-200 dark:border-secondary-800 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
