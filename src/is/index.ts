// 类型判断

/**
 * 判断一个值是否为数组
 * @param value - 要判断的值
 * @returns 如果是数组返回 true，否则返回 false
 */
export const isArray = (value: any): boolean => {
  return Array.isArray(value);
};

/**
 * 判断一个值是否为对象（但不是数组）
 * @param value - 要判断的值
 * @returns 如果是对象且不是数组返回 true，否则返回 false
 */
export const isObject = (value: any): boolean => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

/**
 * 判断数据类型（内部工具函数）
 * @param val - 要判断的数据
 * @param type - 数据类型字符串，如 "Array"、"Function"
 * @returns 如果数据是指定类型返回 true
 */
export const is = (val: unknown, type: string): boolean => {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
};

/**
 * 判断一个值是否为函数
 * @param val - 要判断的数据
 * @returns 如果是函数返回 true
 */
export const isFunction = (val: any): val is Function => {
  return is(val, "Function") || !!(val && val.constructor && val.call && val.apply);
};

/**
 * 判断一个值是否为 Date 对象
 * @param val - 要判断的数据
 * @returns 如果是 Date 对象返回 true
 */
export const isDate = (val: any): val is Date => {
  return is(val, "Date") || (!!val && val.constructor === Date);
};

/**
 * 判断一个值是否为数字（NaN 和 Infinity 也视为数字）
 * @param val - 要判断的数据
 * @returns 如果是数字返回 true
 */
export const isNumber = (val: any): val is number => {
  return Number(val) === val;
};

/**
 * 判断一个值是否为整数
 * @param val - 要判断的数据
 * @returns 如果是整数返回 true
 */
export const isInt = (val: any): val is number => {
  return isNumber(val) && Number.isFinite(val) && val % 1 === 0;
};

/**
 * 判断一个值是否为浮点数（有限小数）
 * @param val - 要判断的数据
 * @returns 如果是浮点数返回 true
 */
export const isFloat = (val: any): val is number => {
  return isNumber(val) && Number.isFinite(val) && val % 1 !== 0;
};

/**
 * 判断一个值是否为异步函数
 * @param val - 要判断的数据
 * @returns 如果是异步函数返回 true
 */
export const isAsyncFunction = (val: unknown): val is (...args: any[]) => Promise<any> => {
  return is(val, "AsyncFunction");
};

/**
 * 判断一个值是否为 Promise
 * @param value - 要判断的数据
 * @returns 如果是 Promise 返回 true
 */
export const isPromise = (value: any): value is Promise<any> => {
  if (!value) return false;
  if (!value.then) return false;
  if (!isFunction(value.then)) return false;
  return true;
};

/**
 * 判断一个值是否为字符串
 * @param val - 要判断的数据
 * @returns 如果是字符串返回 true
 */
export const isString = (val: unknown): val is string => {
  return is(val, "String") || typeof val === "string" || val instanceof String;
};

/**
 * 判断一个值是否为布尔值
 * @param val - 要判断的数据
 * @returns 如果是布尔值返回 true
 */
export const isBoolean = (val: unknown): val is boolean => {
  return typeof val === "boolean" || is(val, "Boolean");
};

/**
 * 判断是否为 PC 端（浏览器环境）
 * @returns 如果在浏览器环境中返回 true
 */
export const isPC = (): boolean => {
  return typeof window !== "undefined";
};

/**
 * 判断一个值是否为 window 对象
 * @param val - 要判断的数据
 * @returns 如果是 window 对象返回 true
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== "undefined" && is(val, "Window");
};

/**
 * 判断一个值是否为 DOM 元素
 * @param val - 要判断的数据
 * @returns 如果是 DOM 元素返回 true
 */
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!(val as Element).tagName;
};

/**
 * 判断一个值是否为 null
 * @param val - 要判断的数据
 * @returns 如果是 null 返回 true
 */
export const isNull = (val: unknown): val is null => {
  return val === null;
};

/**
 * 判断一个值是否为十六进制颜色
 * @param str - 要判断的字符串
 * @returns 如果是有效的十六进制颜色值返回 true
 */
export const isHexColor = (str: string): boolean => {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};

/**
 * 判断设备是否为 iOS
 * @returns 如果是 iOS 设备返回 true
 */
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

/**
 * 判断一个值是否为有效的电子邮件
 * @param email - 要判断的字符串
 * @returns 如果是有效的电子邮件地址返回 true
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * 判断一个值是否已定义（不是 undefined）
 * @param val - 要判断的数据
 * @returns 如果不是 undefined 返回 true
 */
export const isDef = <T>(val: T | undefined): val is T => {
  return typeof val !== "undefined";
};

/**
 * 判断一个值是否为 undefined
 * @param val - 要判断的数据
 * @returns 如果是 undefined 返回 true
 */
export const isUnDef = <T>(val: T | undefined): val is undefined => {
  return typeof val === "undefined";
};

/**
 * 判断一个值是否为 null 或 undefined
 * @param val - 要判断的数据
 * @returns 如果是 null 或 undefined 返回 true
 */
export const isNullOrUnDef = <T>(val: T | null | undefined): val is null | undefined => {
  return isUnDef(val) || isNull(val);
};

/**
 * 判断一个值是否为 symbol
 * @param value - 要判断的数据
 * @returns 如果是 symbol 返回 true
 */
export const isSymbol = (value: any): value is symbol => {
  return !!value && value.constructor === Symbol;
};

/**
 * 判断一个值是否为原始类型
 * 原始类型包括：number、string、boolean、symbol、bigint、undefined、null
 * @param value - 要判断的值
 * @returns 如果是原始类型返回 true
 */
export const isPrimitive = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    (typeof value !== "object" && typeof value !== "function")
  );
};

/**
 * 判断一个值是否为空
 * 空值包括：null、undefined、空字符串、空数组、空对象、空 Map/Set、无效 Date
 * @param value - 要判断的数据
 * @returns 如果为空返回 true
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (isDate(value)) return isNaN(value.getTime());
  if (isFunction(value) || isSymbol(value)) return false;
  if (isNumber(value)) return false;
  const length = (value as any).length;
  if (isNumber(length)) return length === 0;
  const size = (value as any).size;
  if (isNumber(size)) return size === 0;
  const keys = Object.keys(value).length;
  return keys === 0;
};

/**
 * 判断一个值是否为空（简化版）
 * 支持：字符串、数组、对象、Map、Set、类型化数组
 * @param value - 要检查的值
 * @returns 如果为空返回 true
 */
export function isEmptySv(value: string | object | null | undefined): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" || Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (ArrayBuffer.isView(value)) return value.byteLength === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * 判断两个值是否深度相等
 * @param x - 要比较的第一个值
 * @param y - 要比较的第二个值
 * @returns 如果值深度相等返回 true
 */
export const isEqual = <T>(x: T, y: T): boolean => {
  if (Object.is(x, y)) return true;
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime();
  }
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.toString() === y.toString();
  }
  if (typeof x !== "object" || x === null || typeof y !== "object" || y === null) {
    return false;
  }
  const keysX = Reflect.ownKeys(x as unknown as object) as (keyof typeof x)[];
  const keysY = Reflect.ownKeys(y as unknown as object);
  if (keysX.length !== keysY.length) return false;
  for (let i = 0; i < keysX.length; i++) {
    if (!Reflect.has(y as unknown as object, keysX[i])) return false;
    if (!isEqual(x[keysX[i]], y[keysX[i]])) return false;
  }
  return true;
};
