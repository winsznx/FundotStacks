/**
 * Number of micro-STX in 1 STX
 * @type {number}
 */
export const MICROSTX_PER_STX = 1_000_000;

/**
 * Number of Satoshis in 1 BTC
 * @type {number}
 */
export const SATS_PER_BTC = 100_000_000;

/**
 * Number of decimals for STX
 * @type {number}
 */
export const STX_DECIMALS = 6;

/**
 * Number of decimals for BTC
 * @type {number}
 */
export const BTC_DECIMALS = 8;

/**
 * Convert STX to micro-STX
 * @param {number} stx 
 * @returns {number}
 */
export const stxToMicroStx = (stx) => Math.floor(stx * MICROSTX_PER_STX);

/**
 * Convert micro-STX to STX
 * @param {number|string|bigint} microStx 
 * @returns {number}
 */
export const microStxToStx = (microStx) => Number(microStx) / MICROSTX_PER_STX;
