import { describe, it, expect } from 'vitest'
import {
  formatSTX,
  truncateAddress,
  calculateProgress,
  getStatusLabel,
  getStatusColor,
  cn,
} from '../helpers.js'

describe('legacy helpers', () => {
  it('formats STX default to 2 decimals', () => {
    expect(formatSTX(1000)).toBe('1,000.00 STX')
  })

  it('returns 0 STX for nullish', () => {
    expect(formatSTX(null)).toBe('0 STX')
  })

  it('truncates addresses', () => {
    expect(truncateAddress('SPABCDEF123456', 2, 3)).toBe('SP...456')
  })

  it('calculateProgress caps at 100', () => {
    expect(calculateProgress(200, 100)).toBe(100)
    expect(calculateProgress(50, 100)).toBe(50)
    expect(calculateProgress(10, 0)).toBe(0)
  })

  it('status label and color map', () => {
    expect(getStatusLabel(1)).toBe('Active')
    expect(getStatusColor(4)).toBe('bg-red-500')
    expect(getStatusLabel(99)).toBe('Unknown')
  })

  it('cn is re-exported and functional', () => {
    expect(typeof cn).toBe('function')
    expect(cn('a', 'b')).toContain('a')
  })
})
