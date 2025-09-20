import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Custom hook for managing mobile menu state and behavior
 * @returns {Object} Menu state and control functions
 */
export const useMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      // Only check if menu is open and click is outside header
      if (isMenuOpen && !event.target.closest('[data-header]')) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen])

  // Prevent scrolling when menu is open on mobile
  useEffect(() => {
    const body = document.body
    const originalOverflow = body.style.overflow

    if (isMenuOpen) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = originalOverflow || 'unset'
    }

    return () => {
      body.style.overflow = originalOverflow || 'unset'
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
