// 防抖与节流
// 参考：https://kettanaito.com/blog/debounce-vs-throttle

// 防抖

/**
 * 防抖 —— 在事件被触发 n 秒后再执行，如果 n 秒内再次触发则重新计时
 * @param fn - 需要防抖的函数
 * @param delay - 延迟时间（毫秒），默认 300
 * @param options.leading - 首次调用是否立即执行，默认 false
 * @param options.trailing - 停止调用后是否延迟执行，默认 true
 * @returns 防抖后的函数，附带 cancel 方法
 * @example
 * const fn = debounce((val: string) => console.log(val), 500)
 * fn("a"); fn("b"); fn("c")
 * // => "c"
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
  { leading = false, trailing = true }: { leading?: boolean; trailing?: boolean } = {},
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let shouldTrail = trailing;

  const debounced = (...args: Parameters<T>): void => {
    lastArgs = args;
    if (timer !== null) {
      clearTimeout(timer);
      shouldTrail = trailing; // subsequent call — trailing should fire
    } else if (leading) {
      fn(...args);
      shouldTrail = false; // leading already handled it
    }
    timer = setTimeout(() => {
      if (shouldTrail && lastArgs) fn(...lastArgs);
      timer = lastArgs = null;
      shouldTrail = trailing;
    }, delay);
  };

  debounced.cancel = (): void => {
    if (timer) { clearTimeout(timer); timer = lastArgs = null; }
    shouldTrail = trailing;
  };

  return debounced;
};

// 节流

/**
 * 节流 —— 固定间隔内最多执行一次，超出频率的调用被忽略
 * @param fn - 需要节流的函数
 * @param interval - 间隔时间（毫秒），默认 300
 * @param options.leading - 首次调用是否立即执行，默认 true
 * @param options.trailing - 最后一次调用后是否尾部执行，默认 true
 * @returns 节流后的函数，附带 cancel 方法
 * @example
 * const fn = throttle((val: string) => console.log(val), 500)
 * fn("a"); fn("b"); fn("c")
 * // => "a"，500ms 后输出 "c"
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  interval = 300,
  { leading = true, trailing = true }: { leading?: boolean; trailing?: boolean } = {},
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastTime = 0;
  let pendingArgs: Parameters<T> | null = null;

  const throttled = (...args: Parameters<T>): void => {
    const now = Date.now();
    // 首次调用且不需要 leading 时，仅记录时间不执行
    if (!lastTime && !leading) lastTime = now;

    const remaining = interval - (now - lastTime);
    pendingArgs = args;

    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = null; }
      fn(...args);
      lastTime = now;
      pendingArgs = null;
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        timer = null;
        // leading=false 时重置 lastTime，让下一轮 leading 判定不受 trailing 影响
        lastTime = leading ? Date.now() : 0;
        if (pendingArgs) fn(...pendingArgs);
        pendingArgs = null;
      }, remaining);
    }
  };

  throttled.cancel = (): void => {
    if (timer) { clearTimeout(timer); timer = pendingArgs = null; }
  };

  return throttled;
};
