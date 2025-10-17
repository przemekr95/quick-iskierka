import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import NavLink from '../nav-link/nav-link'
import {
  LEFT_NAVIGATION,
  RIGHT_NAVIGATION,
} from '../../../constants/navigation'
import styles from './navigation-mobile.module.scss'

// TODO

const NavigationMobile = ({ isActiveLink, isMenuOpen, toggleMenu }) => {
  // Accessibility: Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape' && isMenuOpen) {
        toggleMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen, toggleMenu])

  return (
    <>
      {/* Screen reader announcements for mobile menu */}
      <div aria-live='polite' aria-atomic='true' className={styles.srOnly}>
        {isMenuOpen ? 'Menu mobilne jest otwarte' : ''}
      </div>

      {/* Mobile Menu Button */}
      <button
        className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls='mobile-menu'
        aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>

      {/* Mobile Navigation */}
      <nav
        id='mobile-menu'
        className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}
        aria-label='Nawigacja mobilna'
      >
        <div className={styles.mobileNavContent}>
          {LEFT_NAVIGATION.map(item => {
            if (item.type === 'external') {
              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  external={true}
                  target={item.target}
                  className={styles.mobile}
                  aria-label={`${item.label} - otwiera w nowej karcie`}
                >
                  <svg
                    className={styles.facebookIcon}
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    aria-hidden='true'
                    focusable='false'
                  >
                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                  </svg>
                  {item.label}
                </NavLink>
              )
            }
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={styles.mobile}
                isActive={isActiveLink(item.path)}
              >
                {item.label}
              </NavLink>
            )
          })}

          {RIGHT_NAVIGATION.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={styles.mobile}
              isActive={isActiveLink(path)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={toggleMenu}
          aria-hidden='true'
        />
      )}
    </>
  )
}

NavigationMobile.propTypes = {
  /** Function to check if link is active */
  isActiveLink: PropTypes.func.isRequired,
  /** Mobile menu open state */
  isMenuOpen: PropTypes.bool.isRequired,
  /** Function to toggle mobile menu */
  toggleMenu: PropTypes.func.isRequired,
}

export default NavigationMobile
