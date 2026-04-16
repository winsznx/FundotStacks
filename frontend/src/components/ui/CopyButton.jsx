import { useState } from 'react'
import { cn } from '@/lib/cn'
import { copyToClipboard } from '@/lib/clipboard'

export function CopyButton({ value, className, label = 'Copy', copiedLabel = 'Copied!' }) {
  const [copied, setCopied] = useState(false)

  const onClick = async () => {
    const ok = await copyToClipboard(value)
    if (!ok) return
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800',
        className,
      )}
      aria-live="polite"
    >
      {copied ? copiedLabel : label}
    </button>
  )
}
