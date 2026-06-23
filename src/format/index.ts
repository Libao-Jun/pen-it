// 日期时间格式化

/**
 * 完整日期时间（年/月/日 时分秒）_ 斜杠
 * @param date - Date 对象
 * @returns 格式化后的完整日期时间字符串，如 "2026/06/03 14:30:45"
 */
export const formatFull = (date: Date): string => {
  const fun = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return fun.format(date);
};

/**
 * 完整日期时间（年-月-日 时分秒）_ 短横线
 * @param date - Date 对象
 * @returns 格式化后的完整日期时间字符串，如 "2026-06-03 14:30:45"
 */
export const formatFullReplace = (date: Date): string => {
  return formatFull(date).replace(/\//g, "-");
};

/**
 * 中文年月日
 * @param date - Date 对象
 * @returns 格式化后的中文日期字符串，如 "2026年6月3日"
 */
export const formatYMD = (date: Date): string => {
  const fun = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return fun.format(date);
};

/**
 * 星期几
 * @param date - Date 对象
 * @returns 中文星期字符串，如 "星期三"
 */
export const formatWeek = (date: Date): string => {
  const fun = new Intl.DateTimeFormat("zh-CN", {
    weekday: "long",
  });
  return fun.format(date);
};

// 数字与货币格式化

/**
 * 货币格式化
 * @param value - 数值
 * @param options - 格式化选项
 * @returns 格式化后的货币字符串
 */
export const formatRmb = (
  value: number,
  options: { type: "zh-CN"; currency: "CNY" },
): string => {
  const moneyCN = new Intl.NumberFormat(options.type, {
    style: "currency",
    currency: options.currency,
  });
  return moneyCN.format(value);
};

/**
 * 千位分隔符（数字格式化），中文（逗号分隔）
 * @param value - 数值
 * @returns 格式化后的千位分隔数字字符串
 */
export const formatNum = (value: number): string => {
  const numCN = new Intl.NumberFormat("zh-CN");
  return numCN.format(value);
};

/**
 * 百分比格式化
 * @param value - 百分比数值
 * @param digit - 保留的小数位数，默认为 0
 * @returns 格式化后的百分比字符串
 */
export const percentCN = (value: number, digit: number = 0): string => {
  const percent = new Intl.NumberFormat("zh-CN", {
    style: "percent",
    minimumFractionDigits: digit,
  });
  return percent.format(value);
};

/**
 * 紧凑计数法（大数简化）_ 英文缩写
 * @param value - 数值
 * @returns 格式化后的紧凑数字字符串（英文缩写）
 */
export const compactEN = (value: number): string => {
  const compact_en = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });
  return compact_en.format(value);
};

/**
 * 紧凑计数法（大数简化）_ 中文缩写
 * @param value - 数值
 * @returns 格式化后的紧凑数字字符串（中文缩写）
 */
export const compactCN = (value: number): string => {
  const compact_cn = new Intl.NumberFormat("zh-CN", {
    notation: "compact",
    compactDisplay: "short",
  });
  return compact_cn.format(value);
};

/**
 * 带符号的正负数显示
 * @param value - 数值
 * @param digit - 保留的小数位数，默认为 0
 * @returns 格式化后的带正负号的数值显示
 */
export const signed = (value: number, digit = 0): string => {
  const num_mark = new Intl.NumberFormat("en-US", {
    signDisplay: "always", // 始终显示正负号
    minimumFractionDigits: digit, // 保留小数位数
  });
  return num_mark.format(value);
};

// 字符串格式化

/**
 * 手机号格式化脱敏 _ 隐藏中间 4 位数
 * @param phone - 手机号码
 * @returns 手机号格式化脱敏后的手机号
 */
export const maskPhone = (phone: string): string => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
};

/**
 * 手机号格式化 _ 空格分隔
 * @param phone - 手机号
 * @returns 手机号空格格式化的手机号
 */
export const spacePhone = (phone: string): string => {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
};

/**
 * 每个单词首字母大写
 * @param str - 字符串
 * @returns 每个单词首字母大写后的字符串
 */
export const capitalize = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * 短横线连接转小驼峰（kebab-case → camelCase）
 * @param str - 字符串
 * @returns 转换后的小驼峰字符串
 */
export const kebabToCamel = (str: string): string => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * 大驼峰或小驼峰 _ 转为 ‘-’ 短横线连接
 * @param str - 字符串
 * @returns 大驼峰或小驼峰命名格式化的字符串
 */
export const camelToKebab = (str: string): string => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};

/**
 * 超长文本截断
 * @param str - 内容
 * @param maxLength - 截断位置
 * @param suffix - 自定义的替换截断后的内容
 * @returns 超长文本截断后内容
 */
export const truncate = (str: string, maxLength: number, suffix = "..."): string => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * 按字数截断（中文友好）
 * @param str - 内容
 * @param maxWords - 截断位置
 * @param suffix - 自定义的替换截断后的内容
 * @returns 超长文本截断后内容
 */
export const truncateByWords = (
  str: string,
  maxWords: number,
  suffix = "...",
): string => {
  const chars = str.split("");
  if (chars.length <= maxWords) return str;
  return chars.slice(0, maxWords).join("") + suffix;
};

/**
 * 去除所有空格 _ 前后中间
 * @param str - 内容
 * @returns 去除空格后的内容
 */
export const trimAll = (str: string): string => str.replace(/\s+/g, "");

/**
 * 下划线转驼峰（snake_case → camelCase）
 * @param str - 字符串
 * @returns 转换后的驼峰字符串
 */
export const toCamel = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * 首字母大写
 * @param str - 字符串
 * @returns 首字母大写后的字符串
 */
export const firstUpper = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 首字母小写
 * @param str - 字符串
 * @returns 首字母小写后的字符串
 */
export const firstLower = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

/**
 * 反转字符串
 * @param str - 字符串
 * @returns 反转后的字符串
 */
export const reverse = (str: string): string => {
  return str.split("").reverse().join("");
};
