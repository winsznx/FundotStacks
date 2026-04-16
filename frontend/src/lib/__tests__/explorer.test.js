import { describe, it, expect } from 'vitest'
import {
  buildExplorerTxUrl,
  buildExplorerAddressUrl,
  buildExplorerBlockUrl,
} from '../explorer.js'

describe('explorer URL builders', () => {
  it('builds mainnet tx urls without suffix', () => {
    expect(buildExplorerTxUrl('0xabc', 'mainnet')).toBe('https://explorer.hiro.so/txid/0xabc')
  })

  it('adds testnet suffix by default', () => {
    expect(buildExplorerTxUrl('0xabc')).toBe('https://explorer.hiro.so/txid/0xabc?chain=testnet')
  })

  it('builds address urls', () => {
    expect(buildExplorerAddressUrl('SP1', 'mainnet')).toBe('https://explorer.hiro.so/address/SP1')
  })

  it('builds block urls', () => {
    expect(buildExplorerBlockUrl(100, 'mainnet')).toBe('https://explorer.hiro.so/block/100')
  })
})
