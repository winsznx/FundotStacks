/**
 * Custom Hook - Copy to Clipboard
 */

import { useState, useCallback, useEffect } from 'react';
import { copyToClipboard } from '../lib/clipboard.js';

export function useCopyToClipboard(resetTimeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text) => {
    const success = await copyToClipboard(text);
    if (success) {
      setIsCopied(true);
    }
    return success;
  }, []);

  useEffect(() => {
    if (isCopied && resetTimeout > 0) {
      const timer = setTimeout(() => setIsCopied(false), resetTimeout);
      return () => clearTimeout(timer);
    }
  }, [isCopied, resetTimeout]);

  return { isCopied, copy };
}
