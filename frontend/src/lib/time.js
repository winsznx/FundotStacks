import { STACKS_BLOCK_TIME_MS, MINUTE_MS, HOUR_MS, DAY_MS } from '@/constants/time'

export function blocksToMs(blocks) {
  return blocks * STACKS_BLOCK_TIME_MS
}

export function blockHeightToRelative(targetBlock, currentBlock) {
  const remaining = targetBlock - currentBlock
  if (remaining <= 0) return 'Ended'
  const ms = blocksToMs(remaining)
  if (ms >= DAY_MS) {
    const days = Math.floor(ms / DAY_MS)
    return `${days} day${days > 1 ? 's' : ''}`
  }
  if (ms >= HOUR_MS) {
    const hours = Math.floor(ms / HOUR_MS)
    return `${hours} hour${hours > 1 ? 's' : ''}`
  }
  const minutes = Math.max(1, Math.floor(ms / MINUTE_MS))
  return `${minutes} minute${minutes > 1 ? 's' : ''}`
}

export function formatDate(date, locale = 'en-US') {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatDateTime(date, locale = 'en-US') {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
