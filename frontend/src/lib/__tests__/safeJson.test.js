import { describe, it, expect } from 'vitest'
import { safeJsonParse, safeJsonStringify } from '../safeJson.js'

describe('safeJson', () => {
  it('parses valid JSON', () => {
    expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 })
  })

  it('returns fallback on invalid JSON', () => {
    expect(safeJsonParse('not json', { ok: false })).toEqual({ ok: false })
  })

  it('returns fallback for non-strings', () => {
    expect(safeJsonParse(undefined, 'x')).toBe('x')
  })

  it('stringifies values', () => {
    expect(safeJsonStringify({ a: 1 })).toBe('{"a":1}')
  })

  it('returns fallback for circular values', () => {
    const obj = {}
    obj.self = obj
    expect(safeJsonStringify(obj, 'fallback')).toBe('fallback')
  })
})
