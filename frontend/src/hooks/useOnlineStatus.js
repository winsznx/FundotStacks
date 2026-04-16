import { useEffect, useState } from 'react'

function getOnline() {
  if (typeof navigator === 'undefined') return true
  return navigator.onLine
}

export function useOnlineStatus() {
  const [online, setOnline] = useState(getOnline)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  return online
}
