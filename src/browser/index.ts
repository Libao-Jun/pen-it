/**
 * 获取 URL 参数对象
 * @param url - URL 字符串，默认使用当前页面地址
 * @returns 参数键值对对象
 */
export const getUrlParams = (url?: string): Record<string, string> => {
  const params: Record<string, string> = {};
  new URL(url || window.location.href).searchParams.forEach((val, key) => {
    params[key] = val;
  });
  return params;
};

/**
 * 获取单个 URL 参数
 * @param key - 参数名
 * @param url - URL 字符串，默认使用当前页面地址
 * @returns 参数值，不存在则返回 null
 */
export const getUrlParam = (key: string, url?: string): string | null => {
  return new URL(url || window.location.href).searchParams.get(key);
};

/**
 * 对象转 URL 参数字符串
 * @param params - 参数键值对对象，值为 null/undefined 的项会被过滤
 * @returns URL 参数字符串（不含 ? 前缀）
 */
export const toQueryString = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
};

/**
 * 复制文本到剪贴板
 * 优先使用 Clipboard API，失败时降级为 execCommand
 * @param text - 要复制的文本
 * @returns 复制成功返回 true，失败返回 false
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  // 优先使用 Clipboard API
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  // 降级方案：execCommand 虽已弃用，但是唯一兼容旧浏览器和 HTTP 环境的方案
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const result = document.execCommand("copy");
  document.body.removeChild(textarea);
  return result;
};

/**
 * 下载文件（Blob）
 * @param content - 文件内容
 * @param filename - 文件名
 * @param mimeType - MIME 类型，默认 "text/plain"
 */
export const downloadFile = (
  content: string | BlobPart,
  filename: string,
  mimeType = "text/plain",
): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * 导出 JSON 为文件
 * @param data - 要导出的数据
 * @param filename - 文件名，默认 "data.json"
 */
export const exportJSON = (data: any, filename = "data.json"): void => {
  downloadFile(JSON.stringify(data, null, 2), filename, "application/json");
};

/**
 * 滚动到顶部
 * @param behavior - 滚动行为，"smooth" 平滑 / "auto" 瞬间，默认 "smooth"
 */
export const scrollToTop = (behavior: ScrollBehavior = "smooth"): void => {
  window.scrollTo({ top: 0, behavior });
};

/**
 * 滚动到底部
 * @param behavior - 滚动行为，"smooth" 平滑 / "auto" 瞬间，默认 "smooth"
 */
export const scrollToBottom = (behavior: ScrollBehavior = "smooth"): void => {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
};

/**
 * 监听页面滚动（requestAnimationFrame 节流）
 * @param callback - 滚动回调，接收当前 scrollY 值
 * @returns 清理函数，调用后移除事件监听
 */
export const onScroll = (callback: (scrollY: number) => void): () => void => {
  let ticking = false;
  const handler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback(window.scrollY);
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener("scroll", handler);
  return () => window.removeEventListener("scroll", handler);
};

/**
 * 监听目标元素是否进入/离开可视区域
 * @param target - 目标 DOM 元素
 * @param onEnter - 元素进入可视区域时的回调
 * @param onLeave - 元素离开可视区域时的回调（可选）
 * @param options - IntersectionObserver 配置项
 * @returns 清理函数，调用后停止观察
 */
export const observeIntersection = (
  target: Element,
  onEnter: (entry: IntersectionObserverEntry) => void,
  onLeave?: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit,
): () => void => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onEnter(entry);
      } else if (onLeave) {
        onLeave(entry);
      }
    });
  }, options);
  observer.observe(target);
  return () => observer.disconnect();
};
