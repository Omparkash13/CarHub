import { useEffect } from 'react'

export default function useDebounce(callback, delay, deps = []) {
  useEffect(() => {
    if (typeof callback !== 'function') return

    const handler = setTimeout(() => {
      callback()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [...deps, delay])
}
