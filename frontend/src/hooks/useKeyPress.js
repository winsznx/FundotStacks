import { useEffect } from 'react'

export function useKeyPress(targetKey, handler, { event = 'keydown' } = {}) {
  useEffect(() => {
    if (!handler) return
    const listener = (e) => {
      if (e.key === targetKey) handler(e)
    }
    window.addEventListener(event, listener)
    return () => window.removeEventListener(event, listener)
  }, [targetKey, handler, event])
}
