import { useEffect } from 'react'

export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [locked])
}
