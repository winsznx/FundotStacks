import { describe, it, expect } from 'vitest'
import {
  formatSTX,
  formatBTC,
  formatSats,
  formatUSD,
  formatNumber,
  formatPercent,
  microSTXToSTX,
  stxToMicroSTX,
  satsToBTC,
  btcToSats,
} from '../format.js'

describe('format', () => {
  it('formats STX with decimals', () => {
    expect(formatSTX(1234.5, 2)).toBe('1,234.50 STX')
  })

  it('handles nullish STX values', () => {
    expect(formatSTX(null)).toBe('0.00 STX')
  })

  it('formats BTC', () => {
    expect(formatBTC(0.1234, 4)).toBe('0.1234 BTC')
  })

  it('formats sats as integers', () => {
    expect(formatSats(12345.6)).toBe('12,346 sats')
  })

  it('formats USD', () => {
    expect(formatUSD(12)).toBe('$12.00')
  })

  it('formats numbers', () => {
    expect(formatNumber(1000000)).toBe('1,000,000')
  })

  it('formats percent', () => {
    expect(formatPercent(50.1234, 2)).toBe('50.12%')
  })

  it('converts microSTX to STX', () => {
    expect(microSTXToSTX(1_000_000)).toBe(1)
  })

  it('converts STX to microSTX', () => {
    expect(stxToMicroSTX(1.5)).toBe(1_500_000)
  })

  it('converts between sats and BTC', () => {
    expect(satsToBTC(100_000_000)).toBe(1)
    expect(btcToSats(0.5)).toBe(50_000_000)
  })
})
