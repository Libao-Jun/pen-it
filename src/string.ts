/**
 * 生成指定长度的随机字符串（字母 + 数字）
 * @param length - 字符串长度
 * @returns 随机字符串
 */
export const randomString = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 生成 UUID v4
 * @returns UUID v4 字符串
 */
export const uuid = (): string => {
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return template.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 转义 HTML 特殊字符
 * @param str - 待转义的字符串
 * @returns 转义后的字符串
 */
export const escapeHtml = (str: string): string => {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return str.replace(/[&<>"']/g, (char) => escapeMap[char])
}

/**
 * 反转义 HTML 实体
 * @param str - 含 HTML 实体的字符串
 * @returns 反转义后的字符串
 */
export const unescapeHtml = (str: string): string => {
  const unescapeMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  }
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (entity) => unescapeMap[entity])
}

/**
 * 去除字符串中的 HTML 标签
 * @param str - 待处理的字符串
 * @returns 去除标签后的纯文本
 */
export const stripHtml = (str: string): string => {
  return str.replace(/<[^>]*>/g, '')
}

/**
 * 确保字符串以指定前缀开头（若没有则添加）
 * @param str - 原字符串
 * @param prefix - 期望的前缀
 * @returns 处理后的字符串
 */
export const ensurePrefix = (str: string, prefix: string): string => {
  return str.startsWith(prefix) ? str : prefix + str
}

/**
 * 确保字符串以指定后缀结尾（若没有则添加）
 * @param str - 原字符串
 * @param suffix - 期望的后缀
 * @returns 处理后的字符串
 */
export const ensureSuffix = (str: string, suffix: string): string => {
  return str.endsWith(suffix) ? str : str + suffix
}

/**
 * 移除字符串的前缀（若存在）
 * @param str - 原字符串
 * @param prefix - 要移除的前缀
 * @returns 处理后的字符串
 */
export const removePrefix = (str: string, prefix: string): string => {
  if (!prefix) return str
  return str.startsWith(prefix) ? str.slice(prefix.length) : str
}

/**
 * 移除字符串的后缀（若存在）
 * @param str - 原字符串
 * @param suffix - 要移除的后缀
 * @returns 处理后的字符串
 */
export const removeSuffix = (str: string, suffix: string): string => {
  if (!suffix) return str
  return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str
}

/**
 * 获取字符串的 UTF-8 字节长度（中文约 3 字节/字）
 * @param str - 字符串
 * @returns 字节长度
 */
export const byteSize = (str: string): number => {
  return new TextEncoder().encode(str).length
}

/**
 * 姓名脱敏
 * @param name - 姓名
 * @returns 脱敏后的姓名
 */
export const maskName = (name: unknown): string => {
  const str = String(name ?? '')
  if (!str.trim()) return ''
  const chars = [...str]
  if (chars.length === 1) return str
  return chars[0] + '*'.repeat(chars.length - 1)
}
