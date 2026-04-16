import { describe, it, expect } from 'vitest'
import { cn } from '../cn.js'

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('filters out falsy values', () => {
    expect(cn('a', false, null, undefined, '', 'b')).toBe('a b')
  })

  it('dedupes conflicting tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('respects conditional objects', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active')
  })
})
