/**
 * Miscellaneous Helper Functions
 */

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
