/**
 * Custom Hook - Click Outside Detection
 */

import { useEffect, useCallback } from 'react';

export function useClickOutside(ref, handler, enabled = true) {
  const listener = useCallback((event) => {
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    handler(event);
  }, [ref, handler]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [enabled, listener]);
}
