import { describe, it, expect, vi } from 'vitest'
import { debounce } from '../debounce.js'
import { throttle } from '../throttle.js'

describe('debounce', () => {
  it('invokes the function once after the wait window', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const d = debounce(fn, 100)
    d('a'); d('b'); d('c')
    vi.advanceTimersByTime(99)
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(2)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('c')
    vi.useRealTimers()
  })

  it('cancels a scheduled call', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const d = debounce(fn, 50)
    d('x')
    d.cancel()
    vi.advanceTimersByTime(100)
    expect(fn).not.toHaveBeenCalled()
    vi.useRealTimers()
  })
})

describe('throttle', () => {
  it('invokes immediately then trails once more', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const t = throttle(fn, 50)
    t(1)
    t(2)
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(60)
    expect(fn).toHaveBeenCalledTimes(2)
    vi.useRealTimers()
  })
})
