// 去重

/**
 * Set 去重
 * @param arr - 数组
 * @returns 去重后的数组
 * @example
 * unique([1, 2, 2, 3])
 * // => [1, 2, 3]
 */
export const unique = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

/**
 * 对象数组按 key 去重
 * @param arr - 对象数组
 * @param key - 用于去重判定的键名
 * @returns 去重后的数组
 * @example
 * uniqueByKey([{ id: 1, name: "a" }, { id: 1, name: "b" }], "id")
 * // => [{ id: 1, name: "a" }]
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
 * @example
 * sortNumAsc([3, 1, 2])
 * // => [1, 2, 3]
 */
export const sortNumAsc = (arr: number[]): number[] => {
  return [...arr].sort((a, b) => a - b);
};

/**
 * 数值降序
 * @param arr - 数值数组
 * @returns 降序排序后的新数组
 * @example
 * sortNumDesc([1, 3, 2])
 * // => [3, 2, 1]
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
 * @example
 * sortByKey([{ age: 30 }, { age: 20 }], "age", "asc")
 * // => [{ age: 20 }, { age: 30 }]
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
 * @example
 * toArray(document.querySelectorAll("div"))
 * // => [div, div, ...]
 */
export const toArray = <T>(arrayLike: ArrayLike<T>): T[] => {
  return Array.from(arrayLike);
};
