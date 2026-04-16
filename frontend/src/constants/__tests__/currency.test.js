import { describe, it, expect } from 'vitest'
import {
  MICROSTX_PER_STX,
  SATS_PER_BTC,
  STX_DECIMALS,
  BTC_DECIMALS,
} from '../currency.js'

describe('currency constants', () => {
  it('microSTX base is 1e6', () => {
    expect(MICROSTX_PER_STX).toBe(1_000_000)
  })

  it('sats base is 1e8', () => {
    expect(SATS_PER_BTC).toBe(100_000_000)
  })

  it('decimals match chain conventions', () => {
    expect(STX_DECIMALS).toBe(6)
    expect(BTC_DECIMALS).toBe(8)
  })
})
