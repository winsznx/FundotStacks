/**
 * Functional Array Utilities
 */

/**
 * Groups list by a key function
 */
export function groupBy(list, keyFn) {
  if (!Array.isArray(list)) return {};
  return list.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

/**
 * Returns unique items from a list
 */
export function unique(list) {
  if (!Array.isArray(list)) return [];
  return Array.from(new Set(list));
}

/**
 * Returns unique items from a list by a key function
 */
export function uniqueBy(list, keyFn) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  return list.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Chunks an array into smaller arrays of specified size
 */
export function chunk(list, size) {
  if (!Array.isArray(list) || size <= 0) return [];
  const out = [];
  for (let i = 0; i < list.length; i += size) {
    out.push(list.slice(i, i + size));
  }
  return out;
}

/**
 * Flattens nested arrays
 */
export function flatten(list) {
  if (!Array.isArray(list)) return [];
  return list.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
}
