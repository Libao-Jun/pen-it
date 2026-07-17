/**
 * 将值限制在 [min, max] 闭区间内
 * @param value - 待限制的数值
 * @param min - 最小值
 * @param max - 最大值
 * @returns 限制后的数值
 */
export const clamp = (value: number, min: number, max: number): number => {
  if (min > max) {
    [min, max] = [max, min]
  }
  return Math.min(Math.max(value, min), max)
}

/**
 * 生成 [min, max] 闭区间内的随机整数
 * @param min - 最小值（含）
 * @param max - 最大值（含）
 * @returns 随机整数
 */
export const randomInt = (min: number, max: number): number => {
  if (min > max) {
    [min, max] = [max, min]
  }
  const lower = Math.ceil(min)
  const upper = Math.floor(max)
  return Math.floor(Math.random() * (upper - lower + 1)) + lower
}

/**
 * 生成 [min, max) 区间内的随机浮点数
 * @param min - 最小值（含）
 * @param max - 最大值（不含）
 * @returns 随机浮点数
 */
export const randomFloat = (min: number, max: number): number => {
  if (min > max) {
    [min, max] = [max, min]
  }
  return Math.random() * (max - min) + min
}

/**
 * 四舍五入到指定小数位
 * @param value - 待处理的数值
 * @param decimals - 保留的小数位数（默认 0）
 * @returns 四舍五入后的数值
 */
export const round = (value: number, decimals: number = 0): number => {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * 数组求和（空数组返回 0）
 * @param arr - 数字数组
 * @returns 和
 */
export const sum = (arr: number[]): number => arr.reduce((acc, val) => acc + val, 0)

/**
 * 数组平均值（空数组返回 NaN）
 * @param arr - 数字数组
 * @returns 平均值
 */
export const average = (arr: number[]): number => {
  if (arr.length === 0) return NaN
  return sum(arr) / arr.length
}

/**
 * 判断数值是否在 [min, max] 闭区间内
 * @param value - 待判断的数值
 * @param min - 最小值
 * @param max - 最大值
 * @returns 是否在区间内
 */
export const inRange = (value: number, min: number, max: number): boolean => {
  if (min > max) {
    [min, max] = [max, min]
  }
  return value >= min && value <= max
}

/**
 * 线性插值：在 start 到 end 之间按比例 t 取中间值
 * @param start - 起始值
 * @param end - 结束值
 * @param t - 插值因子 [0, 1]
 * @returns 插值结果
 */
export const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * t
}
