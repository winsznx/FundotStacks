import { describe, it, expect } from 'vitest'
import { truncateAddress, truncateTxId, stripHexPrefix, withHexPrefix } from '../address.js'

describe('address helpers', () => {
  it('truncates long addresses', () => {
    expect(truncateAddress('SP3ABCDEF1234567890', 4, 4)).toBe('SP3A...7890')
  })

  it('returns short addresses unchanged', () => {
    expect(truncateAddress('SP3', 6, 4)).toBe('SP3')
  })

  it('returns empty string for nullish input', () => {
    expect(truncateAddress(null)).toBe('')
    expect(truncateAddress(undefined)).toBe('')
  })

  it('truncates tx ids with wider window', () => {
    expect(truncateTxId('0x1234567890abcdef1234567890', 6, 4)).toBe('0x1234...7890')
  })

  it('strips and adds 0x prefix', () => {
    expect(stripHexPrefix('0xabc')).toBe('abc')
    expect(stripHexPrefix('abc')).toBe('abc')
    expect(withHexPrefix('abc')).toBe('0xabc')
    expect(withHexPrefix('0xabc')).toBe('0xabc')
  })
})
