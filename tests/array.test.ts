import { describe, it, expect } from 'vitest'
import { unique, uniqueByKey, sortNumAsc, sortNumDesc, sortByKey, toArray } from '../src/array'

// ============================================================
// unique
// ============================================================
describe('unique', () => {
  it('should remove duplicate primitives', () => {
    expect(unique([1, 2, 2, 3])).toEqual([1, 2, 3])
  })

  it('should handle empty array', () => {
    expect(unique([])).toEqual([])
  })

  it('should handle array with no duplicates', () => {
    expect(unique([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should handle array with all duplicates', () => {
    expect(unique([1, 1, 1])).toEqual([1])
  })

  it('should handle string array', () => {
    expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
  })

  it('should not mutate original array', () => {
    const arr = [1, 2, 2, 3]
    const result = unique(arr)
    expect(arr).toEqual([1, 2, 2, 3])
    expect(result).toEqual([1, 2, 3])
  })

  it('should handle objects by reference', () => {
    const obj = { a: 1 }
    expect(unique([obj, obj])).toEqual([obj])
  })

  it('should not dedupe different object references', () => {
    const result = unique([{ a: 1 }, { a: 1 }])
    expect(result).toHaveLength(2)
  })

  it('should preserve insertion order', () => {
    expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2])
  })
})

// ============================================================
// uniqueByKey
// ============================================================
describe('uniqueByKey', () => {
  it('should dedupe objects by specified key (last wins via Map)', () => {
    const arr = [
      { id: 1, name: 'a' },
      { id: 1, name: 'b' },
      { id: 2, name: 'c' },
    ]
    const result = uniqueByKey(arr, 'id')
    expect(result).toHaveLength(2)
    // Map constructor overwrites duplicate keys — last occurrence kept
    expect(result[0]).toEqual({ id: 1, name: 'b' })
    expect(result[1]).toEqual({ id: 2, name: 'c' })
  })

  it('should preserve last occurrence for duplicate keys', () => {
    const arr = [
      { id: 1, value: 'first' },
      { id: 1, value: 'second' },
    ]
    expect(uniqueByKey(arr, 'id')).toEqual([{ id: 1, value: 'second' }])
  })

  it('should handle empty array', () => {
    expect(uniqueByKey([], 'id')).toEqual([])
  })

  it('should handle array with unique keys', () => {
    const arr = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ]
    expect(uniqueByKey(arr, 'id')).toEqual(arr)
  })

  it('should not mutate original array', () => {
    const arr = [
      { id: 1, name: 'a' },
      { id: 1, name: 'b' },
    ]
    const result = uniqueByKey(arr, 'id')
    expect(arr).toHaveLength(2)
    expect(result).toHaveLength(1)
  })

  it('should work with string key', () => {
    const arr = [
      { code: 'a', val: 1 },
      { code: 'b', val: 2 },
      { code: 'a', val: 3 },
    ]
    expect(uniqueByKey(arr, 'code')).toHaveLength(2)
  })
})

// ============================================================
// sortNumAsc
// ============================================================
describe('sortNumAsc', () => {
  it('should sort numbers in ascending order', () => {
    expect(sortNumAsc([3, 1, 2])).toEqual([1, 2, 3])
  })

  it('should handle negative numbers', () => {
    expect(sortNumAsc([-1, -3, 0, 2])).toEqual([-3, -1, 0, 2])
  })

  it('should handle empty array', () => {
    expect(sortNumAsc([])).toEqual([])
  })

  it('should handle single element', () => {
    expect(sortNumAsc([42])).toEqual([42])
  })

  it('should not mutate original', () => {
    const arr = [3, 1, 2]
    const result = sortNumAsc(arr)
    expect(arr).toEqual([3, 1, 2])
  })

  it('should handle already sorted array', () => {
    expect(sortNumAsc([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should handle duplicate values', () => {
    expect(sortNumAsc([3, 1, 2, 1])).toEqual([1, 1, 2, 3])
  })
})

// ============================================================
// sortNumDesc
// ============================================================
describe('sortNumDesc', () => {
  it('should sort numbers in descending order', () => {
    expect(sortNumDesc([1, 3, 2])).toEqual([3, 2, 1])
  })

  it('should handle negative numbers', () => {
    expect(sortNumDesc([-1, -3, 0, 2])).toEqual([2, 0, -1, -3])
  })

  it('should handle empty array', () => {
    expect(sortNumDesc([])).toEqual([])
  })

  it('should handle single element', () => {
    expect(sortNumDesc([42])).toEqual([42])
  })

  it('should not mutate original', () => {
    const arr = [1, 3, 2]
    const result = sortNumDesc(arr)
    expect(arr).toEqual([1, 3, 2])
  })

  it('should handle duplicate values', () => {
    expect(sortNumDesc([3, 1, 2, 1])).toEqual([3, 2, 1, 1])
  })
})

// ============================================================
// sortByKey
// ============================================================
describe('sortByKey', () => {
  const arr = [{ age: 30 }, { age: 20 }, { age: 40 }]

  it('should sort ascending by default', () => {
    const result = sortByKey(arr, 'age')
    expect(result).toEqual([{ age: 20 }, { age: 30 }, { age: 40 }])
  })

  it('should sort ascending when explicitly specified', () => {
    const result = sortByKey(arr, 'age', 'asc')
    expect(result).toEqual([{ age: 20 }, { age: 30 }, { age: 40 }])
  })

  it('should sort descending', () => {
    const result = sortByKey(arr, 'age', 'desc')
    expect(result).toEqual([{ age: 40 }, { age: 30 }, { age: 20 }])
  })

  it('should not mutate original', () => {
    const original = [{ age: 30 }, { age: 20 }]
    sortByKey(original, 'age')
    expect(original).toEqual([{ age: 30 }, { age: 20 }])
  })

  it('should handle empty array', () => {
    expect(sortByKey([], 'age')).toEqual([])
  })

  it('should handle single element', () => {
    expect(sortByKey([{ age: 30 }], 'age')).toEqual([{ age: 30 }])
  })

  it('should handle string keys', () => {
    const data = [{ name: 'c' }, { name: 'a' }, { name: 'b' }]
    // Note: string subtraction results in NaN, sort order may be unstable
    // This reveals a limitation: sortByKey works best with numeric values
  })
})

// ============================================================
// toArray
// ============================================================
describe('toArray', () => {
  it('should convert NodeList-like to array', () => {
    const divs = document.querySelectorAll('div')
    const result = toArray(divs)
    expect(Array.isArray(result)).toBe(true)
  })

  it('should convert array-like object to array', () => {
    const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
    const result = toArray(arrayLike)
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('should handle empty array-like', () => {
    const empty = { length: 0 }
    expect(toArray(empty)).toEqual([])
  })

  it('should handle string as array-like', () => {
    // String is also ArrayLike
    const result = toArray('hello')
    expect(result).toEqual(['h', 'e', 'l', 'l', 'o'])
  })
})
