/**
 * Campaign lifecycle status codes
 * @enum {number}
 */
export const CAMPAIGN_STATUS = Object.freeze({
    ACTIVE: 1,
    FUNDED: 2,
    COMPLETED: 3,
    CANCELLED: 4,
});

/**
 * Human-readable labels for campaign statuses
 * @type {Readonly<Record<number, string>>}
 */
export const CAMPAIGN_STATUS_LABEL = Object.freeze({
    [CAMPAIGN_STATUS.ACTIVE]: 'Active',
    [CAMPAIGN_STATUS.FUNDED]: 'Funded',
    [CAMPAIGN_STATUS.COMPLETED]: 'Completed',
    [CAMPAIGN_STATUS.CANCELLED]: 'Cancelled',
});

/**
 * Tailwind CSS color classes for campaign statuses
 * @type {Readonly<Record<number, string>>}
 */
export const CAMPAIGN_STATUS_COLOR = Object.freeze({
    [CAMPAIGN_STATUS.ACTIVE]: 'bg-green-500',
    [CAMPAIGN_STATUS.FUNDED]: 'bg-blue-500',
    [CAMPAIGN_STATUS.COMPLETED]: 'bg-purple-500',
    [CAMPAIGN_STATUS.CANCELLED]: 'bg-red-500',
});

/**
 * Returns whether a status is terminal (cannot be changed further)
 * @param {number} status 
 * @returns {boolean}
 */
export const isTerminalStatus = (status) =>
    [CAMPAIGN_STATUS.COMPLETED, CAMPAIGN_STATUS.CANCELLED].includes(status);
