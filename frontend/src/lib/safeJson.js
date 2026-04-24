/**
 * Robust JSON Utilities
 */

/**
 * Safely parses JSON string
 */
export function safeParse(json, fallback = null) {
  if (typeof json !== 'string') return fallback;
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error('JSON parse error:', e);
    return fallback;
  }
}

/**
 * Safely stringifies object
 */
export function safeStringify(data, fallback = '') {
  try {
    return JSON.stringify(data);
  } catch (e) {
    console.error('JSON stringify error:', e);
    return fallback;
  }
}
