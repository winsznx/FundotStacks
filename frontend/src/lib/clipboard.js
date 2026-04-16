export async function copyToClipboard(value) {
  if (typeof value !== 'string') return false
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      return false
    }
  }
  return false
}
