export const CAMPAIGN_STATUS = Object.freeze({
  ACTIVE: 1,
  FUNDED: 2,
  COMPLETED: 3,
  CANCELLED: 4,
})

export const CAMPAIGN_STATUS_LABEL = Object.freeze({
  [CAMPAIGN_STATUS.ACTIVE]: 'Active',
  [CAMPAIGN_STATUS.FUNDED]: 'Funded',
  [CAMPAIGN_STATUS.COMPLETED]: 'Completed',
  [CAMPAIGN_STATUS.CANCELLED]: 'Cancelled',
})

export const CAMPAIGN_STATUS_COLOR = Object.freeze({
  [CAMPAIGN_STATUS.ACTIVE]: 'bg-green-500',
  [CAMPAIGN_STATUS.FUNDED]: 'bg-blue-500',
  [CAMPAIGN_STATUS.COMPLETED]: 'bg-purple-500',
  [CAMPAIGN_STATUS.CANCELLED]: 'bg-red-500',
})
