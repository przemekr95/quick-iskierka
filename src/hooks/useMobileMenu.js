import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Custom hook for managing mobile menu state and behavior
 * @returns {Object} Menu state and control functions
 */
export const useMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  useEffect(() => {
    const body = document.body
    const html = document.documentElement

    if (isMenuOpen) {
      const originalBodyOverflow = body.style.overflow
      const originalHtmlOverflow = html.style.overflow

      body.classList.add('scroll-lock')
      html.classList.add('scroll-lock')

      body.style.setProperty('overflow', 'hidden', 'important')
      html.style.setProperty('overflow', 'hidden', 'important')

      const preventTouch = e => {
        e.preventDefault()
      }
      document.addEventListener('touchmove', preventTouch, { passive: false })

      return () => {
        body.classList.remove('scroll-lock')
        html.classList.remove('scroll-lock')
        body.style.overflow = originalBodyOverflow
        html.style.overflow = originalHtmlOverflow
        document.removeEventListener('touchmove', preventTouch)
      }
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const openMenu = () => {
    setIsMenuOpen(true)
  }

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    openMenu,
  }
}

export default useMobileMenu
