// Cookie 操作

/**
 * 设置 Cookie
 * @param name - Cookie 名称
 * @param value - Cookie 值
 * @param days - 有效天数，默认 7 天
 */
export const setCookie = (name: string, value: string, days = 0): void => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days); 
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
};

/**
 * 获取 Cookie
 * @param name - Cookie 名称
 * @returns Cookie 值，不存在则返回 null
 */
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(
    new RegExp("(^| )" + encodeURIComponent(name) + "=([^;]+)"),
  );
  return match ? decodeURIComponent(match[2]) : null;
};

/**
 * 删除 Cookie
 * @param name - Cookie 名称
 */
export const delCookie = (name: string): void => {
  setCookie(name, "", -1);
};
