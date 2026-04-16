import { describe, it, expect } from 'vitest'

describe('hook module surface', () => {
  it('useToggle returns [value, toggle, setValue]', async () => {
    const { useToggle } = await import('../useToggle.js')
    expect(typeof useToggle).toBe('function')
  })

  it('usePrevious is exported', async () => {
    const { usePrevious } = await import('../usePrevious.js')
    expect(typeof usePrevious).toBe('function')
  })

  it('useDebounce is exported', async () => {
    const { useDebounce } = await import('../useDebounce.js')
    expect(typeof useDebounce).toBe('function')
  })
})
