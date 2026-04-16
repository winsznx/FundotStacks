import { describe, it, expect } from 'vitest'
import { blocksToMs, blockHeightToRelative, formatDate } from '../time.js'

describe('time helpers', () => {
  it('blocksToMs uses 10 minute blocks', () => {
    expect(blocksToMs(6)).toBe(60 * 60 * 1000)
  })

  it('renders ended when target passed', () => {
    expect(blockHeightToRelative(10, 20)).toBe('Ended')
  })

  it('renders days when far in the future', () => {
    expect(blockHeightToRelative(1 + 24 * 6, 1)).toBe('1 day')
  })

  it('renders hours when hours-only', () => {
    expect(blockHeightToRelative(1 + 6, 1)).toBe('1 hour')
  })

  it('formats dates consistently', () => {
    expect(formatDate('2024-01-15T00:00:00Z')).toMatch(/\d{4}/)
  })
})
