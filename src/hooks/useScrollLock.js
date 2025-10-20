import { useEffect, useRef } from 'react'

/**
 * Custom hook for managing scroll lock with preserved scroll position
 * @param {boolean} isLocked - Whether scroll should be locked
 */
export const useScrollLock = isLocked => {
  const scrollYRef = useRef(0)
  const originalBodyOverflowRef = useRef('')
  const originalHtmlOverflowRef = useRef('')
  const wasLockedRef = useRef(false)

  useEffect(() => {
    const body = document.body
    const html = document.documentElement

    if (isLocked && !wasLockedRef.current) {
      originalBodyOverflowRef.current = body.style.overflow
      originalHtmlOverflowRef.current = html.style.overflow
      scrollYRef.current = window.scrollY

      body.classList.add('scroll-lock')
      html.classList.add('scroll-lock')
      body.style.top = `-${scrollYRef.current}px`
    } else if (!isLocked && wasLockedRef.current) {
      body.classList.remove('scroll-lock')
      html.classList.remove('scroll-lock')
      body.style.overflow = originalBodyOverflowRef.current
      html.style.overflow = originalHtmlOverflowRef.current
      body.style.removeProperty('top')

      window.scrollTo(0, scrollYRef.current)
    }

    const currentlyLocked = isLocked

    wasLockedRef.current = isLocked

    return () => {
      if (currentlyLocked && body.classList.contains('scroll-lock')) {
        body.classList.remove('scroll-lock')
        html.classList.remove('scroll-lock')
        body.style.overflow = originalBodyOverflowRef.current
        html.style.overflow = originalHtmlOverflowRef.current
        body.style.removeProperty('top')
        window.scrollTo(0, scrollYRef.current)
      }
    }
  }, [isLocked])
}

export default useScrollLock
