export function groupBy(list, keyFn) {
  const result = {}
  for (const item of list) {
    const key = keyFn(item)
    if (!result[key]) result[key] = []
    result[key].push(item)
  }
  return result
}

export function unique(list) {
  return Array.from(new Set(list))
}

export function uniqueBy(list, keyFn) {
  const seen = new Set()
  const out = []
  for (const item of list) {
    const key = keyFn(item)
    if (seen.has(key)) continue
    seen.add(key)
    out.push(item)
  }
  return out
}

export function chunk(list, size) {
  if (size <= 0) return []
  const out = []
  for (let i = 0; i < list.length; i += size) {
    out.push(list.slice(i, i + size))
  }
  return out
}
