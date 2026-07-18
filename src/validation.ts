/**
 * 校验身份证号码
 * @param value - 要校验的值
 * @returns 如果是有效身份证号码返回 true
 */
export const checkCardNo = (value: string): boolean => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}([\dX])$)/i
  return reg.test(value)
}

/**
 * 校验是否为邮箱地址
 * @param value - 要校验的邮箱字符串
 * @returns 如果是有效邮箱返回 true
 */
export const isEmail = (value: string): boolean => {
  return /^[\w-]+@[\w-]+(\.[\w-]+)+$/.test(value)
}

/**
 * 校验是否为国内手机号
 * @param value - 要校验的手机号
 * @returns 如果是有效手机号返回 true
 */
export const isTel = (value: string | number): boolean => {
  return /^1[3-9,]\d{9}$/.test(value.toString())
}
