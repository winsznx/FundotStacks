/**
 * Numerical and Currency Formatting
 */

/**
 * Formats a number as a currency string
 */
export function formatCurrency(amount, currency = 'STX', decimals = 2) {
  const value = Number(amount || 0);
  
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${formatter.format(value)} ${currency}`;
}

/**
 * Formats large numbers with suffixes (K, M, B)
 */
export function formatCompactNumber(number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(number);
}

/**
 * Safely parses a number from string, returns fallback on failure
 */
export function parseNumber(value, fallback = 0) {
  const parsed = Number(value);
  return isNaN(parsed) ? fallback : parsed;
}
