/**
 * 获取 localStorage
 * @param key - 存储键名
 * @returns 解析后的值，解析失败则返回原始字符串，键不存在返回 null
 */
export const localGet = <T = any>(key: string): T | null => {
  const value = localStorage.getItem(key);
  if (value === null) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return value as any;
  }
};

/**
 * 设置 localStorage
 * @param key - 存储键名
 * @param value - 存储值（会自动 JSON 序列化）
 */
export const localSet = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 移除指定 localStorage
 * @param key - 存储键名
 */
export const localRm = (key: string): void => {
  localStorage.removeItem(key);
};

/**
 * 清除所有 localStorage
 */
export const localClear = (): void => {
  localStorage.clear();
};
