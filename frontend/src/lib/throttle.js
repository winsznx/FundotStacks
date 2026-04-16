export function throttle(fn, wait = 200) {
  let last = 0
  let timer = null
  let pendingArgs = null

  const invoke = () => {
    last = Date.now()
    timer = null
    if (pendingArgs) {
      const args = pendingArgs
      pendingArgs = null
      fn(...args)
    }
  }

  const throttled = (...args) => {
    const now = Date.now()
    const remaining = wait - (now - last)
    if (remaining <= 0) {
      last = now
      fn(...args)
      return
    }
    pendingArgs = args
    if (timer === null) {
      timer = setTimeout(invoke, remaining)
    }
  }

  throttled.cancel = () => {
    if (timer !== null) clearTimeout(timer)
    timer = null
    pendingArgs = null
    last = 0
  }

  return throttled
}
