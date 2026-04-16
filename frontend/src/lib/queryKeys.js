export const campaignKeys = {
  all: ['campaigns'],
  lists: () => [...campaignKeys.all, 'list'],
  detail: (id) => [...campaignKeys.all, 'detail', id],
  contribution: (id, backer) => [...campaignKeys.all, 'contribution', id, backer],
}

export const milestoneKeys = {
  all: ['milestones'],
  byCampaign: (campaignId) => [...milestoneKeys.all, 'campaign', campaignId],
  detail: (campaignId, milestoneId) => [...milestoneKeys.all, 'detail', campaignId, milestoneId],
}

export const nftKeys = {
  all: ['nft'],
  backer: (campaignId, address) => [...nftKeys.all, 'backer', campaignId, address],
  owned: (address) => [...nftKeys.all, 'owned', address],
}

export const refundKeys = {
  all: ['refunds'],
  status: (campaignId, address) => [...refundKeys.all, 'status', campaignId, address],
}
