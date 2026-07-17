# pen-it

用“笔”锚定记忆，一个轻量级前端工具库，覆盖类型检查、日期格式化、数字处理、深克隆、本地存储、Cookie 及浏览器 API。零依赖，支持 Tree-shaking，让常用函数信手拈来。

## 安装

```bash
pnpm add pen-it
```

## 使用

```ts
import { isArray, formatFull, deepClone, unique } from "pen-it";
```

## API

### 类型判断

---

#### isArray(value)

> — 判断是否为数组。

```ts
isArray([1, 2, 3]); // true
```

#### isObject(value)

> — 判断是否为对象（不含数组）。

```ts
isObject({ a: 1 }); // true
```

#### is(val, type)

> — 通用类型判断（内部工具）。

```ts
is([], "Array"); // true
```

#### isFunction(val)

> — 判断是否为函数。

```ts
isFunction(() => {}); // true
```

#### isAsyncFunction(val)

> — 判断是否为异步函数。

```ts
isAsyncFunction(async () => {}); // true
```

#### isPromise(value)

> — 判断是否为 Promise。

```ts
isPromise(Promise.resolve()); // true
```

#### isDate(val)

> — 判断是否为 Date 对象。

```ts
isDate(new Date()); // true
```

#### isNumber(val)

> — 判断是否为数字（含 NaN/Infinity）。

```ts
isNumber(42); // true
```

#### isInt(val)

> — 判断是否为整数。

```ts
isInt(42); // true
```

#### isFloat(val)

> — 判断是否为浮点数。

```ts
isFloat(3.14); // true
```

#### isString(val)

> — 判断是否为字符串。

```ts
isString("hello"); // true
```

#### isBoolean(val)

> — 判断是否为布尔值。

```ts
isBoolean(true); // true
```

#### isSymbol(value)

> — 判断是否为 Symbol。

```ts
isSymbol(Symbol("foo")); // true
```

#### isPrimitive(value)

> — 判断是否为原始类型。

```ts
isPrimitive(42); // true
```

#### isNull(val)

> — 判断是否为 null。

```ts
isNull(null); // true
```

#### isDef(val)

> — 判断是否不是 undefined。

```ts
isDef("hello"); // true
```

#### isUnDef(val)

> — 判断是否为 undefined。

```ts
isUnDef(undefined); // true
```

#### isNullOrUnDef(val)

> — 判断是否为 null 或 undefined。

```ts
isNullOrUnDef(null); // true
```

#### isEmpty(value)

> — 判断是否为空（完备版：支持 Date/Map/Set 等）。

```ts
isEmpty(""); // true
isEmpty([]); // true
isEmpty({}); // true
```

#### isEmptySv(value)

> — 判断是否为空（简化版）。

```ts
isEmptySv([]); // true
```

#### isEqual(x, y)

> — 深度相等比较（支持 Date/RegExp）。

```ts
isEqual({ a: 1 }, { a: 1 }); // true
```

#### isHexColor(str)

> — 判断是否为十六进制颜色。

```ts
isHexColor("#fff"); // true
```

#### isValidEmail(email)

> — 判断是否为有效邮箱。

```ts
isValidEmail("a@b.com"); // true
```

#### isPC()

> — 判断是否为浏览器环境。

```ts
isPC(); // true
```

#### isWindow(val)

> — 判断是否为 window 对象。

```ts
isWindow(window); // true
```

#### isElement(val)

> — 判断是否为 DOM 元素。

```ts
isElement(document.body); // true
```

#### isIOS()

> — 判断设备是否为 iOS。

```ts
isIOS(); // true
```

### 时间戳

---

#### timestamp()

> — 获取当前时间戳（毫秒），等价于 `Date.now()`。

```ts
timestamp(); // 1752772800000
```

### 时间日期格式化

---

#### formatFull(date)

> — 完整日期时间（斜杠分隔）。

```ts
formatFull(new Date()); // "2026/06/03 14:30:45"
```

#### formatFullReplace(date)

> — 完整日期时间（短横线分隔）。

```ts
formatFullReplace(new Date()); // "2026-06-03 14:30:45"
```

#### formatYMD(date)

> — 中文年月日。

```ts
formatYMD(new Date()); // "2026年6月3日"
```

#### formatWeek(date)

> — 星期几。

```ts
formatWeek(new Date()); // "星期三"
```

### 数字与货币格式化

---

#### formatRmb(value, options)

> — 货币格式化（人民币）。

```ts
formatRmb(1234.56, { type: "zh-CN", currency: "CNY" }); // "¥1,234.56"
```

#### formatNum(value)

> — 千位分隔符。

```ts
formatNum(1234567); // "1,234,567"
```

#### percentCN(value, digit)

> — 百分比格式化。

```ts
percentCN(0.1234, 2); // "12.34%"
```

#### compactEN(value)

> — 大数简化（英文缩写）。

```ts
compactEN(12345); // "12K"
```

#### compactCN(value)

> — 大数简化（中文缩写）。

```ts
compactCN(12345); // "1.2万"
```

#### signed(value, digit)

> — 带正负号显示。

```ts
signed(42, 1); // "+42.0"
```

### 字符串处理

---

#### maskPhone(phone)

> — 手机号脱敏（隐藏中间4位）。

```ts
maskPhone("13812345678"); // "138****5678"
```

#### spacePhone(phone)

> — 手机号空格分隔。

```ts
spacePhone("13812345678"); // "138 1234 5678"
```

#### capitalize(str)

> — 每个单词首字母大写。

```ts
capitalize("hello world"); // "Hello World"
```

#### kebabToCamel(str)

> — 短横线转小驼峰。

```ts
kebabToCamel("hello-world"); // "helloWorld"
```

#### camelToKebab(str)

> — 驼峰转短横线。

```ts
camelToKebab("helloWorld"); // "hello-world"
```

#### toCamel(str)

> — 下划线转驼峰。

```ts
toCamel("hello_world"); // "helloWorld"
```

#### firstUpper(str)

> — 首字母大写。

```ts
firstUpper("hello"); // "Hello"
```

#### firstLower(str)

> — 首字母小写。

```ts
firstLower("Hello"); // "hello"
```

#### reverse(str)

> — 反转字符串。

```ts
reverse("hello"); // "olleh"
```

#### trimAll(str)

> — 去除所有空格。

```ts
trimAll(" h e l lo "); // "hello"
```

#### truncate(str, max, suffix?)

> — 超长文本截断。

```ts
truncate("Hello World", 8); // "Hello..."
```

#### truncateByWords(str, max, suffix?)

> — 按字数截断（中文友好）。

```ts
truncateByWords("你好世界欢迎你", 4); // "你好世界..."
```

### 存储

---

#### localGet&lt;T&gt;(key)

> — 获取 localStorage（自动 JSON 解析）。

```ts
localGet("user"); // { name: '张三' }
```

#### localSet(key, value)

> — 设置 localStorage（自动 JSON 序列化）。

```ts
localSet("user", { name: "张三" });
```

#### localRm(key)

> — 移除指定 localStorage。

```ts
localRm("user");
```

#### localClear()

> — 清除所有 localStorage。

```ts
localClear();
```

### 拷贝

---

#### deepClone(obj)

> — 递归深拷贝（支持 Date/RegExp/Map/Set/循环引用）。

```ts
deepClone({ a: 1, b: { c: 2 } });
```

#### deepCloneWithJSON(obj)

> — JSON 深拷贝（仅 JSON 安全类型）。

```ts
deepCloneWithJSON({ a: 1 });
```

#### structClone(obj, options?)

> — structuredClone 深拷贝（不支持函数/Symbol）。

```ts
structClone({ a: 1, b: { c: 2 } });
```

#### shallowClone(obj)

> — 浅拷贝（仅第一层）。

```ts
shallowClone({ a: 1, b: { c: 2 } });
```

### 数组

---

#### unique(arr)

> — Set 去重。

```ts
unique([1, 2, 2, 3]); // [1, 2, 3]
```

#### uniqueByKey(arr, key)

> — 对象数组按 key 去重。

```ts
uniqueByKey([{ id: 1 }, { id: 1 }], "id");
```

#### sortNumAsc(arr)

> — 数值升序。

```ts
sortNumAsc([3, 1, 2]); // [1, 2, 3]
```

#### sortNumDesc(arr)

> — 数值降序。

```ts
sortNumDesc([1, 3, 2]); // [3, 2, 1]
```

#### sortByKey(arr, key, order?)

> — 按对象属性排序。

```ts
sortByKey([{ age: 30 }, { age: 20 }], "age");
```

#### toArray(arrayLike)

> — 类数组转数组。

```ts
toArray(document.querySelectorAll("div"));
```

#### mergeArrays(...arrays)

> — 合并多个数组。

```ts
mergeArrays([1, 2], [3, 4], [5]); // [1, 2, 3, 4, 5]
```

#### flatten(arr, depth?)

> — 多维数组扁平化到指定层级（默认 1 层，传 `Infinity` 完全展开）。

```ts
flatten([1, [2, [3, 4]], 5]); // [1, 2, [3, 4], 5]
flatten([1, [2, [3, 4]], 5], Infinity); // [1, 2, 3, 4, 5]
```

#### arrFind(arr, key, value)

> — 对象数组中按 key-value 查找第一个匹配项。

```ts
arrFind([{ id: 1 }, { id: 2 }], "id", 2); // { id: 2 }
```

#### groupBy(arr, key)

> — 对象数组按指定属性分组。

```ts
groupBy([{ type: "fruit" }, { type: "vegetable" }], "type");
// => { fruit: [...], vegetable: [...] }
```

#### filterEmptyValues(obj)

> — 移除对象中值为空（null / undefined / 空字符串）的属性。

```ts
filterEmptyValues({ a: 1, b: "", c: null }); // { a: 1 }
```

#### createRange(length, mapFn?)

> — 快速生成范围数组。

```ts
createRange(5); // [0, 1, 2, 3, 4]
createRange(3, (i) => i * 2); // [0, 2, 4]
```

### Cookie

---

#### setCookie(name, value, days?)

> — 设置 Cookie（默认7天）。

```ts
setCookie("token", "abc123", 30);
```

#### getCookie(name)

> — 获取 Cookie。

```ts
getCookie("token"); // "abc123"
```

#### delCookie(name)

> — 删除 Cookie。

```ts
delCookie("token");
```

### 浏览器

---

#### getUrlParams(url?)

> — 获取 URL 参数对象。

```ts
getUrlParams("?a=1&b=2"); // { a: '1', b: '2' }
```

#### getUrlParam(key, url?)

> — 获取单个 URL 参数。

```ts
getUrlParam("a"); // "1"
```

#### toQueryString(params)

> — 对象转 URL 参数字符串。

```ts
toQueryString({ a: 1, b: "hello" }); // "a=1&b=hello"
```

#### copyToClipboard(text)

> — 复制文本到剪贴板（支持降级）。

```ts
await copyToClipboard("Hello");
```

#### downloadFile(content, filename, mimeType?)

> — 下载文件（Blob）。

```ts
downloadFile("Hello", "hello.txt");
```

#### exportJSON(data, filename?)

> — 导出 JSON 为文件。

```ts
exportJSON({ name: "张三" });
```

#### scrollToTop(behavior?)

> — 滚动到顶部（默认平滑）。

```ts
scrollToTop();
```

#### scrollToBottom(behavior?)

> — 滚动到底部（默认平滑）。

```ts
scrollToBottom();
```

#### onScroll(callback)

> — 监听滚动（rAF 节流），返回清理函数。

```ts
const off = onScroll((y) => console.log(y));
```

#### observeIntersection(target, onEnter, onLeave?, options?)

> — 监听元素进入/离开可视区域，返回清理函数。

```ts
const cleanup = observeIntersection(document.querySelector(".footer")!, () =>
  loadMore(10),
);
```

### 防抖与节流

---

#### debounce(fn, delay?, options?)

> — 防抖，停止调用 delay 毫秒后才执行。

```ts
const fn = debounce((val: string) => console.log(val), 500);
fn("a");
fn("b");
fn("c");
// => 'c'
```

#### throttle(fn, interval?, options?)

> — 节流，固定间隔内最多执行一次。

```ts
const fn = throttle((val: string) => console.log(val), 500);
fn("a");
fn("b");
fn("c");
// => 'a'，500ms 后输出 'c'
```
