import { describe, it, expect, vi } from 'vitest'
import { sleep } from '../sleep.js'

describe('sleep', () => {
  it('resolves after the requested delay', async () => {
    vi.useFakeTimers()
    const spy = vi.fn()
    const p = sleep(100).then(spy)
    await vi.advanceTimersByTimeAsync(99)
    expect(spy).not.toHaveBeenCalled()
    await vi.advanceTimersByTimeAsync(2)
    await p
    expect(spy).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })
})
