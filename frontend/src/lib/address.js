export function truncateAddress(address, start = 6, end = 4) {
  if (!address || typeof address !== 'string') return ''
  if (address.length <= start + end) return address
  return `${address.slice(0, start)}...${address.slice(-end)}`
}

export function truncateTxId(txId, start = 8, end = 6) {
  return truncateAddress(txId, start, end)
}

export function stripHexPrefix(value) {
  if (typeof value !== 'string') return ''
  return value.startsWith('0x') ? value.slice(2) : value
}

export function withHexPrefix(value) {
  if (typeof value !== 'string') return ''
  return value.startsWith('0x') ? value : `0x${value}`
}
