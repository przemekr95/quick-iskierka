import { useState, useEffect } from 'react'
import {
  HERO_IMAGES,
  RESPONSIVE_BREAKPOINTS,
  FALLBACK_GRADIENT,
} from '../constants/images'

/**
 * Custom hook for managing responsive background images
 * @returns {Object} backgroundImage URL and fallback gradient
 */
export const useResponsiveBackground = () => {
  const [backgroundImage, setBackgroundImage] = useState('')

  useEffect(() => {
    const updateBackgroundImage = () => {
      const width = window.innerWidth

      if (width <= RESPONSIVE_BREAKPOINTS.mobile) {
        setBackgroundImage(HERO_IMAGES.mobile)
      } else if (width <= RESPONSIVE_BREAKPOINTS.tablet) {
        setBackgroundImage(HERO_IMAGES.tablet)
      } else {
        setBackgroundImage(HERO_IMAGES.desktop)
      }
    }

    // Set initial image
    updateBackgroundImage()

    // Update on window resize with debounce
    let timeoutId = null
    const debouncedUpdate = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateBackgroundImage, 150)
    }

    window.addEventListener('resize', debouncedUpdate)

    return () => {
      window.removeEventListener('resize', debouncedUpdate)
      clearTimeout(timeoutId)
    }
  }, [])

  return {
    backgroundImage,
    fallbackGradient: FALLBACK_GRADIENT,
  }
}
