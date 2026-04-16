import { describe, it, expect } from 'vitest'
import {
  CAMPAIGN_STATUS,
  CAMPAIGN_STATUS_LABEL,
  CAMPAIGN_STATUS_COLOR,
} from '../status.js'

describe('campaign status constants', () => {
  it('exposes numeric status codes', () => {
    expect(CAMPAIGN_STATUS.ACTIVE).toBe(1)
    expect(CAMPAIGN_STATUS.FUNDED).toBe(2)
    expect(CAMPAIGN_STATUS.COMPLETED).toBe(3)
    expect(CAMPAIGN_STATUS.CANCELLED).toBe(4)
  })

  it('labels every status', () => {
    for (const code of Object.values(CAMPAIGN_STATUS)) {
      expect(CAMPAIGN_STATUS_LABEL[code]).toBeDefined()
      expect(CAMPAIGN_STATUS_COLOR[code]).toMatch(/^bg-/)
    }
  })

  it('freezes the enum so it cannot mutate', () => {
    expect(Object.isFrozen(CAMPAIGN_STATUS)).toBe(true)
    expect(Object.isFrozen(CAMPAIGN_STATUS_LABEL)).toBe(true)
  })
})
