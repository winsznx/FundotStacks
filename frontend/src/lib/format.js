/**
 * Formatting Utilities
 */

/**
 * Formats a timestamp into a readable date
 */
export function formatDate(timestamp, options = {}) {
  if (!timestamp) return '';
  
  const date = new Date(typeof timestamp === 'number' && timestamp < 1e12 ? timestamp * 1000 : timestamp);
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options
  }).format(date);
}

/**
 * Formats a block height into an estimated date based on current block
 */
export function formatBlockHeight(height, currentBlock) {
  if (!height) return '';
  if (!currentBlock) return `Block #${height}`;
  
  const blocksRemaining = height - currentBlock;
  if (blocksRemaining <= 0) return 'Passed';
  
  // Stacks block time is ~10 mins
  const minsRemaining = blocksRemaining * 10;
  const days = Math.floor(minsRemaining / (24 * 60));
  
  if (days > 0) return `~${days} day${days > 1 ? 's' : ''} left`;
  return `~${Math.floor(minsRemaining / 60)} hour${Math.floor(minsRemaining / 60) > 1 ? 's' : ''} left`;
}
