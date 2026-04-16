import { describe, it, expect } from 'vitest'
import { groupBy, unique, uniqueBy, chunk } from '../array.js'
import { clamp, range, percentage } from '../number.js'

describe('array helpers', () => {
  it('groupBy groups items by key function', () => {
    const result = groupBy([{ t: 'a' }, { t: 'b' }, { t: 'a' }], (x) => x.t)
    expect(result.a).toHaveLength(2)
    expect(result.b).toHaveLength(1)
  })

  it('unique dedupes primitives', () => {
    expect(unique([1, 1, 2, 3, 3])).toEqual([1, 2, 3])
  })

  it('uniqueBy dedupes by key', () => {
    expect(uniqueBy([{ id: 1 }, { id: 1 }, { id: 2 }], (x) => x.id)).toHaveLength(2)
  })

  it('chunk splits into equal slices', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })
})

describe('number helpers', () => {
  it('clamps within bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-1, 0, 10)).toBe(0)
    expect(clamp(11, 0, 10)).toBe(10)
  })

  it('range produces ascending and descending sequences', () => {
    expect(range(0, 3)).toEqual([0, 1, 2])
    expect(range(3, 0, -1)).toEqual([3, 2, 1])
  })

  it('percentage caps at 100 and handles zero goal', () => {
    expect(percentage(50, 100)).toBe(50)
    expect(percentage(200, 100)).toBe(100)
    expect(percentage(10, 0)).toBe(0)
  })
})
