/**
 * Stacks Address and ID Utilities
 */

/**
 * Truncates a Stacks address or transaction ID for display
 * @param {string} address 
 * @param {number} start 
 * @param {number} end 
 * @returns {string}
 */
export function truncateAddress(address, start = 6, end = 4) {
  if (!address || typeof address !== 'string') return '';
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

/**
 * Alias for truncateAddress focused on Tx IDs
 */
export function truncateTxId(txId, start = 8, end = 6) {
  return truncateAddress(txId, start, end);
}

/**
 * Removes '0x' prefix from hex string if present
 * @param {string} value 
 * @returns {string}
 */
export function stripHexPrefix(value) {
  if (typeof value !== 'string') return '';
  return value.startsWith('0x') ? value.slice(2) : value;
}

/**
 * Adds '0x' prefix to hex string if missing
 * @param {string} value 
 * @returns {string}
 */
export function withHexPrefix(value) {
  if (typeof value !== 'string') return '';
  return value.startsWith('0x') ? value : `0x${value}`;
}

/**
 * Validates Stacks address format
 * @param {string} address 
 * @returns {boolean}
 */
export function isValidStacksAddress(address) {
  if (!address || typeof address !== 'string') return false;
  // Basic check for Stacks address prefixes (SP, ST, SM)
  return /^[S][PMT][0-9A-Z]{28,41}$/i.test(address);
}
