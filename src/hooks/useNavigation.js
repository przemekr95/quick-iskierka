import { useLocation } from 'react-router-dom'

/**
 * Custom hook for navigation utilities
 * @returns {Object} Navigation helper functions
 */
export const useNavigation = () => {
  const location = useLocation()

  /**
   * Check if given path is currently active
   * @param {string} path - Path to check
   * @returns {boolean} Whether the path is active
   */
  const isActiveLink = path => {
    return location.pathname === path
  }

  /**
   * Check if current page is homepage
   * @returns {boolean} Whether current page is homepage
   */
  const isHomePage = () => {
    return location.pathname === '/'
  }

  /**
   * Get current page name for analytics or styling
   * @returns {string} Current page identifier
   */
  const getCurrentPage = () => {
    const path = location.pathname
    if (path === '/') return 'home'
    return path.slice(1) // Remove leading slash
  }

  return {
    isActiveLink,
    isHomePage: isHomePage(),
    getCurrentPage,
    currentPath: location.pathname,
  }
}

export default useNavigation
