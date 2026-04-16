import { describe, it, expect } from 'vitest'
import { campaignKeys, milestoneKeys, nftKeys, refundKeys } from '../queryKeys.js'

describe('queryKeys', () => {
  it('builds stable campaign keys', () => {
    expect(campaignKeys.detail(7)).toEqual(['campaigns', 'detail', 7])
    expect(campaignKeys.contribution(7, 'SP1')).toEqual(['campaigns', 'contribution', 7, 'SP1'])
  })

  it('builds milestone keys scoped to campaign', () => {
    expect(milestoneKeys.byCampaign(3)).toEqual(['milestones', 'campaign', 3])
  })

  it('builds nft keys for backer and owner views', () => {
    expect(nftKeys.backer(1, 'SP2')).toEqual(['nft', 'backer', 1, 'SP2'])
    expect(nftKeys.owned('SP3')).toEqual(['nft', 'owned', 'SP3'])
  })

  it('builds refund keys scoped to campaign + backer', () => {
    expect(refundKeys.status(5, 'SP4')).toEqual(['refunds', 'status', 5, 'SP4'])
  })
})
