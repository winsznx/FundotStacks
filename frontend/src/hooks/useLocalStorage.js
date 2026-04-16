import { useCallback, useEffect, useState } from 'react'
import { safeJsonParse, safeJsonStringify } from '@/lib/safeJson'

function readInitial(key, fallback) {
  if (typeof window === 'undefined') return fallback
  const raw = window.localStorage.getItem(key)
  if (raw === null) return fallback
  const parsed = safeJsonParse(raw, undefined)
  return parsed === undefined ? fallback : parsed
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readInitial(key, initialValue))

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(key, safeJsonStringify(value))
  }, [key, value])

  const remove = useCallback(() => {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(key)
    setValue(initialValue)
  }, [key, initialValue])

  return [value, setValue, remove]
}
