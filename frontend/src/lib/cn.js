/**
 * ClassName Utility - Optimized for Tailwind
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines tailwind classes and merges conflicts
 * @param {...(string|Object|Array|undefined)} inputs 
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Conditional class joining without merging
 */
export const joinClasses = clsx;
