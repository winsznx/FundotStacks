/**
 * Average time between Stacks blocks in milliseconds (~10 minutes)
 * @type {number}
 */
export const STACKS_BLOCK_TIME_MS = 10 * 60 * 1000;

/**
 * Milliseconds in one second
 * @type {number}
 */
export const SECOND_MS = 1000;

/**
 * Milliseconds in one minute
 * @type {number}
 */
export const MINUTE_MS = 60 * SECOND_MS;

/**
 * Milliseconds in one hour
 * @type {number}
 */
export const HOUR_MS = 60 * MINUTE_MS;

/**
 * Milliseconds in one day
 * @type {number}
 */
export const DAY_MS = 24 * HOUR_MS;

/**
 * Approximate number of blocks per day on Stacks
 * @type {number}
 */
export const BLOCKS_PER_DAY = 144;

/**
 * Estimates remaining time in milliseconds based on block height difference
 * @param {number} currentHeight 
 * @param {number} targetHeight 
 * @returns {number}
 */
export const estimateRemainingTimeMs = (currentHeight, targetHeight) => {
    if (targetHeight <= currentHeight) return 0;
    return (targetHeight - currentHeight) * STACKS_BLOCK_TIME_MS;
};
