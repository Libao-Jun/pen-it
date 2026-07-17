# 更新日志

## v2.0.0

### 目录结构重构

- 扁平化 `src/` 目录：移除每类工具函数的文件夹目录（`array/`、`browser/`、`control/`、`cookie/`、`copy/`、`format/`、`is/`、`storage/`），将各文件夹中的 `index.ts` 上移并重命名为对应的 `.ts` 文件

### 时间戳模块

- 新增
  - `timestamp` — 获取当前时间戳（毫秒）

## v1.0.10

### 拷贝模块

- 新增
  - `structClone` — structuredClone 深拷贝

### 重构 README.md

- 重构 `README.md` 文档排版
- 移除 `更新日志` 内容

### 新增 CHANGELOG.md

- 新增 `CHANGELOG.md` 更新日志文档

## v1.0.9

### 构建优化

- rolldown 开启 `minify: true`压缩 JS/CJS（注释/空白移除 + 变量名缩短）

### 类型声明优化

- 移除 `.d.ts` 中冗余的 JSDoc 注释

## v1.0.7 & v1.0.8

### 体积优化

- 移除JSDoc `@example` 示例注释（共 294 行），减少包体积

### 文档

- `README` 底部新增更新日志模块

## v1.0.6

### 数组模块

- 新增
  - `mergeArrays` — 合并多个数组
  - `flatten` — 将多维数组扁平化到指定层级
  - `arrFind` — 在对象数组中按 key-value 查找第一个匹配项
  - `groupBy` — 将对象数组按指定属性分组
  - `filterEmptyValues` — 移除对象中值为空（null / undefined / 空字符串）的属性
  - `createRange` — 根据长度和映射函数快速生成数组

### 浏览器模块

- 新增
  - `observeIntersection` — 监听目标元素是否进入/离开可视区域

## v1.0.5

### 控制模块

- 新增
  - `debounce` — 防抖：在事件被触发 n 秒后再执行，如果 n 秒内再次触发则重新计时
  - `throttle` — 节流：固定间隔内最多执行一次，超出频率的调用被忽略

## v1.0.4

### 类型判断

- `isArray` — 判断一个值是否为数组
- `isObject` — 判断一个值是否为对象（但不是数组）
- `is` — 判断数据类型（内部工具函数）
- `isFunction` — 判断一个值是否为函数
- `isAsyncFunction` — 判断一个值是否为异步函数
- `isPromise` — 判断一个值是否为 Promise
- `isDate` — 判断一个值是否为 Date 对象
- `isNumber` — 判断一个值是否为数字（NaN 和 Infinity 也视为数字）
- `isInt` — 判断一个值是否为整数
- `isFloat` — 判断一个值是否为浮点数（有限小数）
- `isString` — 判断一个值是否为字符串
- `isBoolean` — 判断一个值是否为布尔值
- `isSymbol` — 判断一个值是否为 symbol
- `isPrimitive` — 判断一个值是否为原始类型
- `isNull` — 判断一个值是否为 null
- `isDef` — 判断一个值是否已定义（不是 undefined）
- `isUnDef` — 判断一个值是否为 undefined
- `isNullOrUnDef` — 判断一个值是否为 null 或 undefined
- `isEmpty` — 判断一个值是否为空
- `isEmptySv` — 判断一个值是否为空（简化版）
- `isEqual` — 判断两个值是否深度相等
- `isHexColor` — 判断一个值是否为十六进制颜色
- `isValidEmail` — 判断一个值是否为有效的电子邮件
- `isPC` — 判断是否为 PC 端（浏览器环境）
- `isWindow` — 判断一个值是否为 window 对象
- `isElement` — 判断一个值是否为 DOM 元素
- `isIOS` — 判断设备是否为 iOS

### 日期时间格式化

- `formatFull` — 完整日期时间（年/月/日 时分秒）斜杠分隔
- `formatFullReplace` — 完整日期时间（年-月-日 时分秒）短横线分隔
- `formatYMD` — 中文年月日
- `formatWeek` — 星期几

### 数字与货币格式化

- `formatRmb` — 货币格式化
- `formatNum` — 千位分隔符（逗号分隔）
- `percentCN` — 百分比格式化
- `compactEN` — 大数简化（英文缩写）
- `compactCN` — 大数简化（中文缩写）
- `signed` — 带正负号显示

### 字符串处理

- `maskPhone` — 手机号脱敏（隐藏中间 4 位）
- `spacePhone` — 手机号空格分隔
- `capitalize` — 每个单词首字母大写
- `kebabToCamel` — 短横线转小驼峰
- `camelToKebab` — 驼峰转短横线
- `toCamel` — 下划线转驼峰
- `firstUpper` — 首字母大写
- `firstLower` — 首字母小写
- `reverse` — 反转字符串
- `trimAll` — 去除所有空格
- `truncate` — 超长文本截断
- `truncateByWords` — 按字数截断（中文友好）

### 存储

- `localGet` — 获取 localStorage（自动 JSON 解析）
- `localSet` — 设置 localStorage（自动 JSON 序列化）
- `localRm` — 移除指定 localStorage
- `localClear` — 清除所有 localStorage

### 拷贝

- `deepClone` — 递归深拷贝（支持 Date/RegExp/Map/Set/循环引用）
- `deepCloneWithJSON` — JSON 深拷贝（仅 JSON 安全类型）
- `shallowClone` — 浅拷贝（仅第一层）

### 数组

- `unique` — Set 去重
- `uniqueByKey` — 对象数组按 key 去重
- `sortNumAsc` — 数值升序
- `sortNumDesc` — 数值降序
- `sortByKey` — 按对象属性排序
- `toArray` — 类数组转数组

### Cookie

- `setCookie` — 设置 Cookie
- `getCookie` — 获取 Cookie
- `delCookie` — 删除 Cookie

### 浏览器

- `getUrlParams` — 获取 URL 参数对象
- `getUrlParam` — 获取单个 URL 参数
- `toQueryString` — 对象转 URL 参数字符串
- `copyToClipboard` — 复制文本到剪贴板
- `downloadFile` — 下载文件（Blob）
- `exportJSON` — 导出 JSON 为文件
- `scrollToTop` — 滚动到顶部
- `scrollToBottom` — 滚动到底部
- `onScroll` — 监听页面滚动（rAF 节流）
