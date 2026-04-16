import { useCallback, useState } from 'react'
import { copyToClipboard } from '@/lib/clipboard'

export function useCopyToClipboard(resetMs = 1500) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (value) => {
    const ok = await copyToClipboard(value)
    if (ok) {
      setCopied(true)
      if (resetMs > 0) setTimeout(() => setCopied(false), resetMs)
    }
    return ok
  }, [resetMs])

  return { copied, copy }
}
