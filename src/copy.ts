/**
 * 递归深拷贝
 * 支持 Date、RegExp、Map、Set、Array、Object 以及循环引用
 * @param obj - 要拷贝的值
 * @param hash - 内部 WeakMap 用于处理循环引用，调用方无需传入
 * @returns 深拷贝后的值
 */
export function deepClone<T>(obj: T, hash = new WeakMap<any, any>()): T {
  // null 或非对象类型直接返回
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // Date
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  // RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as any;
  }

  // Map
  if (obj instanceof Map) {
    const clone = new Map();
    hash.set(obj, clone);
    obj.forEach((value, key) => {
      clone.set(key, deepClone(value, hash));
    });
    return clone as any;
  }

  // Set
  if (obj instanceof Set) {
    const clone = new Set();
    hash.set(obj, clone);
    obj.forEach((value) => {
      clone.add(deepClone(value, hash));
    });
    return clone as any;
  }

  // Array
  if (Array.isArray(obj)) {
    const clone: any[] = [];
    hash.set(obj, clone);
    obj.forEach((item, index) => {
      clone[index] = deepClone(item, hash);
    });
    return clone as any;
  }

  // Object
  const clone: Record<string, any> = {};
  hash.set(obj, clone);
  Object.keys(obj).forEach((key) => {
    clone[key] = deepClone((obj as any)[key], hash);
  });
  return clone as any;
}

/**
 * JSON 深拷贝
 * 使用 JSON 序列化与反序列化实现，仅支持 JSON 安全的数据类型
 * （不支持函数、undefined、Date、RegExp、Map、Set 等）
 * @param obj - 要拷贝的 JSON 安全值
 * @returns 深拷贝后的值
 */
export function deepCloneWithJSON<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * structuredClone 深拷贝
 * 不支持函数、Symbol，传入会抛出 DataCloneError
 * @param obj - 要拷贝的值
 * @param options - 可选配置（如 transfer 转移数组）
 * @returns 深拷贝后的值
 */
export function structClone<T>(obj: T, options?: StructuredSerializeOptions): T {
  return structuredClone(obj, options);
}

/**
 * 浅拷贝
 * 仅拷贝第一层属性，嵌套对象仍共享引用
 * @param obj - 要拷贝的对象或数组
 * @returns 浅拷贝后的值
 */
export function shallowClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return [...obj] as any;
  }
  return { ...obj } as any;
}
