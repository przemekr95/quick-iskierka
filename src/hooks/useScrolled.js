import { useState, useEffect } from 'react'

/**
 * Custom hook for detecting scroll state
 * @param {number} threshold - Scroll threshold in pixels (default: 50)
 * @returns {boolean} Whether page is scrolled beyond threshold
 */
export const useScrolled = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsScrolled(scrollTop > threshold)
    }

    // Set initial state
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return isScrolled
}

export default useScrolled
