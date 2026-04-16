export function clamp(value, min, max) {
  if (Number.isNaN(value)) return min
  if (value < min) return min
  if (value > max) return max
  return value
}

export function range(start, end, step = 1) {
  if (step === 0) return []
  const out = []
  if (step > 0) {
    for (let i = start; i < end; i += step) out.push(i)
  } else {
    for (let i = start; i > end; i += step) out.push(i)
  }
  return out
}

export function percentage(numerator, denominator) {
  if (!denominator) return 0
  return Math.min((numerator / denominator) * 100, 100)
}
