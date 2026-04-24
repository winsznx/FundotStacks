/**
 * React Query Key Factory
 */

export const campaignKeys = {
  all: ['campaigns'],
  lists: () => [...campaignKeys.all, 'list'],
  list: (filters) => [...campaignKeys.lists(), { filters }],
  details: () => [...campaignKeys.all, 'detail'],
  detail: (id) => [...campaignKeys.details(), id],
  contributions: () => [...campaignKeys.all, 'contribution'],
  contribution: (id, backer) => [...campaignKeys.contributions(), { id, backer }],
};

export const milestoneKeys = {
  all: ['milestones'],
  config: (id) => [...milestoneKeys.all, 'config', id],
  list: (id) => [...milestoneKeys.all, 'list', id],
};

export const nftKeys = {
  all: ['nfts'],
  backer: (campaignId, backer) => [...nftKeys.all, 'backer', { campaignId, backer }],
  uri: (tokenId) => [...nftKeys.all, 'uri', tokenId],
};
