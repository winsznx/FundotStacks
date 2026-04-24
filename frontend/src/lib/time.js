/**
 * Time and Block Estimation Utilities
 */

import { STACKS_BLOCK_TIME_MS } from '../constants/time.js';

/**
 * Formats milliseconds into a human-readable duration
 */
export function formatDuration(ms) {
  if (ms <= 0) return 'Expired';
  
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

/**
 * Calculates estimated countdown from current block to target block
 */
export function getBlockCountdown(targetBlock, currentBlock) {
  if (!targetBlock || !currentBlock) return null;
  const blocksLeft = targetBlock - currentBlock;
  if (blocksLeft <= 0) return 0;
  return blocksLeft * STACKS_BLOCK_TIME_MS;
}
