import { useEffect } from 'react'
import { cn } from '@/lib/cn'

export function Drawer({ open, onClose, side = 'right', className, children }) {
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const sideClass = side === 'left'
    ? 'left-0 border-r'
    : 'right-0 border-l'

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <aside
        className={cn(
          'absolute top-0 bottom-0 w-80 max-w-full bg-white dark:bg-secondary-900 shadow-xl border-secondary-200 dark:border-secondary-800 overflow-y-auto',
          sideClass,
          className,
        )}
      >
        {children}
      </aside>
    </div>
  )
}
