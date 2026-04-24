/**
 * Promise-based delay
 * @param {number} ms 
 * @returns {Promise<void>}
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Resolves after a specific number of frames
 */
export const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));
