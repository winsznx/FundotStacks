/**
 * Schema and Logic Validation
 */

/**
 * Basic email validator
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates if a string is a valid URL
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Checks if value is within range
 */
export function isInRange(value, min, max) {
  const n = Number(value);
  return !isNaN(n) && n >= min && n <= max;
}

/**
 * Checks if string meets minimum complexity
 */
export function isComplexString(str, minLength = 8) {
  if (!str || str.length < minLength) return false;
  return /[A-Z]/.test(str) && /[0-9]/.test(str);
}
