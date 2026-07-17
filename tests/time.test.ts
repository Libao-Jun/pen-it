import { describe, it, expect } from 'vitest'
import { timestamp } from '../src/time'

describe('timestamp', () => {
  it('应该返回一个数字', () => {
    expect(typeof timestamp()).toBe('number')
  })

  it('应该返回正整数', () => {
    expect(timestamp()).toBeGreaterThan(0)
  })

  it('应该返回当前时间戳（与 Date.now() 相差不超过 10ms）', () => {
    const now = Date.now()
    const ts = timestamp()
    expect(Math.abs(ts - now)).toBeLessThanOrEqual(10)
  })

  it('应该返回毫秒级时间戳（值应大于 1970 年后的合理值）', () => {
    // 2020-01-01 的时间戳为 1577836800000
    expect(timestamp()).toBeGreaterThan(1577836800000)
  })

  it('两次连续调用返回值应为非递减（后 >= 前）', () => {
    const ts1 = timestamp()
    const ts2 = timestamp()
    expect(ts2).toBeGreaterThanOrEqual(ts1)
  })

  it('应精确到毫秒级（与 new Date().getTime() 一致）', () => {
    const before = new Date().getTime()
    const ts = timestamp()
    const after = new Date().getTime()
    expect(ts).toBeGreaterThanOrEqual(before)
    expect(ts).toBeLessThanOrEqual(after + 5)
  })

  it('返回的应是整数，非浮点数', () => {
    expect(Number.isInteger(timestamp())).toBe(true)
  })

  it('不是 NaN', () => {
    expect(Number.isNaN(timestamp())).toBe(false)
  })

  it('不是 Infinity', () => {
    expect(Number.isFinite(timestamp())).toBe(true)
  })
})
