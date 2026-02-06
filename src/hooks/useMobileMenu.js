import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useScrollLock } from './useScrollLock'

/**
 * Custom hook for managing mobile menu state and behavior
 * @returns {Object} Menu state and control functions
 */
export const useMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useScrollLock(isMenuOpen)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (isMenuOpen) {
      const preventTouch = e => {
        const menu = document.getElementById('mobile-navigation')
        if (!menu || !menu.contains(e.target)) {
          e.preventDefault()
        }
      }
      document.addEventListener('touchmove', preventTouch, { passive: false })

      return () => {
        document.removeEventListener('touchmove', preventTouch)
      }
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
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
