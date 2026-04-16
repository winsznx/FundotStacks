import { describe, it, expect } from 'vitest'
import {
  isStxAddress,
  isBtcAddress,
  isTxId,
  isPositiveNumber,
  isNonNegativeInteger,
} from '../validation.js'

describe('validation', () => {
  it('recognizes mainnet and testnet STX addresses', () => {
    expect(isStxAddress('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKPVKG95G')).toBe(true)
    expect(isStxAddress('ST2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKPVKG95G')).toBe(true)
  })

  it('rejects malformed STX addresses', () => {
    expect(isStxAddress('SP!!!')).toBe(false)
    expect(isStxAddress('')).toBe(false)
    expect(isStxAddress(null)).toBe(false)
  })

  it('recognizes BTC bech32 and legacy addresses', () => {
    expect(isBtcAddress('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq')).toBe(true)
    expect(isBtcAddress('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2')).toBe(true)
  })

  it('rejects bad BTC addresses', () => {
    expect(isBtcAddress('notanaddress')).toBe(false)
    expect(isBtcAddress(null)).toBe(false)
  })

  it('validates tx ids with or without 0x prefix', () => {
    expect(isTxId('a'.repeat(64))).toBe(true)
    expect(isTxId('0x' + 'a'.repeat(64))).toBe(true)
    expect(isTxId('abc')).toBe(false)
  })

  it('checks positive numbers', () => {
    expect(isPositiveNumber(1)).toBe(true)
    expect(isPositiveNumber(0)).toBe(false)
    expect(isPositiveNumber(-1)).toBe(false)
    expect(isPositiveNumber('foo')).toBe(false)
  })

  it('checks non-negative integers', () => {
    expect(isNonNegativeInteger(0)).toBe(true)
    expect(isNonNegativeInteger(5)).toBe(true)
    expect(isNonNegativeInteger(1.5)).toBe(false)
    expect(isNonNegativeInteger(-1)).toBe(false)
  })
})
