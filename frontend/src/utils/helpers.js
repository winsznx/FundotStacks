/**
 * Miscellaneous Helper Functions
 */

import { microStxToStx } from '../constants/currency.js';
import { CAMPAIGN_STATUS_LABEL, CAMPAIGN_STATUS_COLOR } from '../constants/status.js';
import { truncateAddress as truncate } from '../lib/address.js';

/**
 * Proxies to truncateAddress in lib/address.js for backward compatibility
 */
export const truncateAddress = truncate;

/**
 * Formats micro-STX amount to a readable STX string
 */
export function formatSTX(microStx, decimals = 2) {
    const stx = microStxToStx(microStx);
    return stx.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }) + ' STX';
}

/**
 * Calculates progress percentage between raised and goal
 */
export function calculateProgress(raised, goal) {
    if (!goal || goal <= 0) return 0;
    const progress = (Number(raised) / Number(goal)) * 100;
    return Math.min(progress, 100);
}

/**
 * Gets the human-readable label for a status code
 */
export function getStatusLabel(status) {
    return CAMPAIGN_STATUS_LABEL[status] || 'Unknown';
}

/**
 * Gets the CSS color class for a status code
 */
export function getStatusColor(status) {
    return CAMPAIGN_STATUS_COLOR[status] || 'bg-secondary-500';
}

/**
 * Prevents default event behavior
 */
export const stopPropagation = (e) => e.stopPropagation();

/**
 * Generates a random ID
 */
export const generateId = () => Math.random().toString(36).substr(2, 9);

/**
 * Pluralizes a word based on count
 */
export const pluralize = (count, singular, plural = singular + 's') => 
  count === 1 ? singular : plural;

/**
 * Shallow comparison of two objects
 */
export const shallowEqual = (objA, objB) => {
  if (Object.is(objA, objB)) return true;
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) return false;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
};
