import { MutableRefObject, RefObject, useEffect } from 'react'

type AnyEvent = MouseEvent | TouchEvent

// Got from https://usehooks.com/useLockBodyScroll/
export function useLockBodyScroll(): void {
  useEffect((): (() => void) => {
    // Get original body overflow
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow

    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden'

    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle)
  }, []) // Empty array ensures effect is only run on mount and unmount
}

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | MutableRefObject<undefined>,
  handler: (event: AnyEvent) => void
): void {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = ref?.current
      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
    // Reload only if ref or handler changes
  }, [ref, handler])
}
