// 去重

/**
 * Set 去重
 * @param arr - 数组
 * @returns 去重后的数组
 */
export const unique = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

/**
 * 对象数组按 key 去重
 * @param arr - 对象数组
 * @param key - 用于去重判定的键名
 * @returns 去重后的数组
 */
export const uniqueByKey = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
): T[] => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

// 排序

/**
 * 数值升序
 * @param arr - 数值数组
 * @returns 升序排序后的新数组
 */
export const sortNumAsc = (arr: number[]): number[] => {
  return [...arr].sort((a, b) => a - b);
};

/**
 * 数值降序
 * @param arr - 数值数组
 * @returns 降序排序后的新数组
 */
export const sortNumDesc = (arr: number[]): number[] => {
  return [...arr].sort((a, b) => b - a);
};

/**
 * 按对象属性排序
 * @param arr - 对象数组
 * @param key - 用于排序的属性名
 * @param order - 排序方向，"asc" 升序 / "desc" 降序，默认 "asc"
 * @returns 排序后的新数组
 */
export const sortByKey = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc",
): T[] => {
  return [...arr].sort((a, b) =>
    order === "asc" ? a[key] - b[key] : b[key] - a[key],
  );
};

// 类型转换辅助

/**
 * 类数组转数组
 * @param arrayLike - 类数组对象（如 NodeList、arguments）
 * @returns 转换后的数组
 */
export const toArray = <T>(arrayLike: ArrayLike<T>): T[] => {
  return Array.from(arrayLike);
};

// 合并

/**
 * 合并多个数组
 * @param arrays - 一个或多个数组
 * @returns 合并后的新数组
 */
export const mergeArrays = <T>(...arrays: T[][]): T[] => {
  return ([] as T[]).concat(...arrays);
};

// 扁平化

/**
 * 将多维数组扁平化到指定层级
 * @param arr - 多维数组
 * @param depth - 扁平化深度，默认 1（仅展开一层）。传 Infinity 可完全扁平化为一维
 * @returns 扁平化后的数组
 */
export const flatten = <T>(arr: any[], depth: number = 1): T[] => {
  return arr.flat(depth);
};

// 查询

/**
 * 在对象数组中按 key-value 查找第一个匹配项
 * @param arr - 对象数组
 * @param key - 要匹配的键名
 * @param value - 要匹配的键值
 * @returns 第一个匹配的对象，无匹配则返回 undefined
 */
export const arrFind = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
  value: T[keyof T],
): T | undefined => {
  return arr.find((item) => item[key] === value);
};

// 分组

/**
 * 将对象数组按指定属性分组
 * @param arr - 对象数组
 * @param key - 用于分组的属性名
 * @returns 以属性值为键、对应数组为值的对象
 */
export const groupBy = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
): Record<string, T[]> => {
  return arr.reduce(
    (acc, item) => {
      const groupKey = String(item[key]);
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
};

// 对象过滤

/**
 * 移除对象中值为空（null / undefined / 空字符串）的属性
 * @param obj - 待过滤的对象
 * @returns 过滤后的新对象
 */
export const filterEmptyValues = <T extends Record<string, any>>(
  obj: T,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== ""),
  ) as Partial<T>;
};

// 快速生成

/**
 * 根据长度和映射函数快速生成数组
 * @param length - 数组长度
 * @param mapFn - 映射函数，接收索引返回元素值，默认为返回索引
 * @returns 生成的数组
 */
export const createRange = <T = number>(
  length: number,
  mapFn?: (index: number) => T,
): T[] => {
  return Array.from({ length }, (_, i) =>
    mapFn ? mapFn(i) : (i as unknown as T),
  );
};
