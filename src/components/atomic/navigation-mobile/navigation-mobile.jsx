import React, { useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import NavLink from '../nav-link/nav-link'
import Logo from '../logo/logo'
import {
  LEFT_NAVIGATION,
  RIGHT_NAVIGATION,
} from '../../../constants/navigation'
import { LOGO_CONFIG } from '../../../constants/header'
import styles from './navigation-mobile.module.scss'

const NavigationMobile = ({
  isActiveLink,
  isMenuOpen,
  toggleMenu,
  showLogo = true,
}) => {
  const menuButtonRef = useRef(null)

  const handleToggleMenu = () => {
    toggleMenu()
  }

  const handleCloseMenu = useCallback(() => {
    toggleMenu()
    setTimeout(() => {
      if (menuButtonRef.current) {
        menuButtonRef.current.focus()
      }
    }, 100)
  }, [toggleMenu])

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Escape' && isMenuOpen) {
        handleCloseMenu()
      }
    },
    [isMenuOpen, handleCloseMenu]
  )

  const handleFocusTrap = useCallback(event => {
    if (event.key === 'Tab') {
      const focusableElements = []

      if (menuButtonRef.current) {
        focusableElements.push(menuButtonRef.current)
      }

      const menuElement = document.getElementById('mobile-navigation')
      if (menuElement) {
        const menuFocusable = menuElement.querySelectorAll(
          'a[href], [tabindex]:not([tabindex="-1"])'
        )
        focusableElements.push(...Array.from(menuFocusable))
      }

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keydown', handleFocusTrap)

      if (menuButtonRef.current) {
        menuButtonRef.current.focus()
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keydown', handleFocusTrap)
      }
    }
  }, [isMenuOpen, handleKeyDown, handleFocusTrap])

  const renderExternalLink = item => (
    <NavLink
      key={item.href}
      href={item.href}
      external={true}
      target={item.target}
      className={styles.mobileNavLink}
      aria-label={`${item.label} - otwiera w nowej karcie`}
      rel='noopener noreferrer'
    >
      <svg
        className={styles.socialIcon}
        viewBox='0 0 24 24'
        fill='currentColor'
        aria-hidden='true'
        focusable='false'
      >
        <title>{item.label} icon</title>
        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
      </svg>
      <span>{item.label}</span>
    </NavLink>
  )

  const renderInternalLink = item => (
    <NavLink
      key={item.path}
      to={item.path}
      className={styles.mobileNavLink}
      isActive={isActiveLink(item.path)}
      aria-current={isActiveLink(item.path) ? 'page' : undefined}
    >
      {item.label}
    </NavLink>
  )

  return (
    <div className={styles.mobileNavContainer}>
      <div aria-live='polite' aria-atomic='true' className={styles.srOnly}>
        {isMenuOpen ? 'Menu mobilne zostało otwarte' : ''}
      </div>

      <div className={styles.mobileHeader}>
        {showLogo && (
          <div className={styles.logoContainer}>
            <Logo variant={LOGO_CONFIG.VARIANTS.MOBILE} />
          </div>
        )}

        <button
          ref={menuButtonRef}
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
          onClick={handleToggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls='mobile-navigation'
          aria-label={
            isMenuOpen ? 'Zamknij menu nawigacji' : 'Otwórz menu nawigacji'
          }
          type='button'
        >
          <span className={styles.hamburgerLine} aria-hidden='true'></span>
          <span className={styles.hamburgerLine} aria-hidden='true'></span>
          <span className={styles.hamburgerLine} aria-hidden='true'></span>
        </button>
      </div>

      <nav
        id='mobile-navigation'
        className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}
        aria-label='Nawigacja mobilna'
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileNavContent}>
          <div className={styles.menuLogoContainer}>
            <Logo variant={LOGO_CONFIG.VARIANTS.MOBILE} />
          </div>
          <section className={styles.socialSection}>
            <ul className={styles.socialList} role='list'>
              {LEFT_NAVIGATION.map(item => (
                <li key={item.href || item.path} role='listitem'>
                  {item.type === 'external'
                    ? renderExternalLink(item)
                    : renderInternalLink(item)}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.mainSection}>
            <ul className={styles.mainNavList} role='list'>
              {RIGHT_NAVIGATION.map(item => (
                <li key={item.path} role='listitem'>
                  <NavLink
                    to={item.path}
                    className={styles.mobileNavLink}
                    isActive={isActiveLink(item.path)}
                    aria-current={isActiveLink(item.path) ? 'page' : undefined}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={handleCloseMenu}
          aria-hidden='true'
        />
      )}
    </div>
  )
}

NavigationMobile.propTypes = {
  isActiveLink: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  showLogo: PropTypes.bool,
}

export default NavigationMobile
