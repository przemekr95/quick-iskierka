import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './header.module.scss'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (isMenuOpen && !event.target.closest(`.${styles.header}`)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  // Prevent scrolling when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActiveLink = path => {
    return location.pathname === path
  }

  const isHomePage = location.pathname === '/'

  return (
    <header className={`${styles.header} ${isHomePage ? styles.transparent : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to='/' aria-label='Iskierka - strona główna'>
            <span className={styles.logoText}>Iskierka</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label='Nawigacja główna'>
          <Link
            to='/'
            className={`${styles.navLink} ${isActiveLink('/') ? styles.active : ''}`}
            aria-current={isActiveLink('/') ? 'page' : undefined}
          >
            Home
          </Link>
          <Link
            to='/klub'
            className={`${styles.navLink} ${isActiveLink('/klub') ? styles.active : ''}`}
            aria-current={isActiveLink('/klub') ? 'page' : undefined}
          >
            Klub
          </Link>
          <Link
            to='/druzyna'
            className={`${styles.navLink} ${isActiveLink('/druzyna') ? styles.active : ''}`}
            aria-current={isActiveLink('/druzyna') ? 'page' : undefined}
          >
            Drużyna
          </Link>
          <Link
            to='/kontakt'
            className={`${styles.navLink} ${isActiveLink('/kontakt') ? styles.active : ''}`}
            aria-current={isActiveLink('/kontakt') ? 'page' : undefined}
          >
            Kontakt
          </Link>
        </nav>

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
            <Link
              to='/'
              className={`${styles.mobileNavLink} ${isActiveLink('/') ? styles.active : ''}`}
              aria-current={isActiveLink('/') ? 'page' : undefined}
            >
              Home
            </Link>
            <Link
              to='/klub'
              className={`${styles.mobileNavLink} ${isActiveLink('/klub') ? styles.active : ''}`}
              aria-current={isActiveLink('/klub') ? 'page' : undefined}
            >
              Klub
            </Link>
            <Link
              to='/druzyna'
              className={`${styles.mobileNavLink} ${isActiveLink('/druzyna') ? styles.active : ''}`}
              aria-current={isActiveLink('/druzyna') ? 'page' : undefined}
            >
              Drużyna
            </Link>
            <Link
              to='/kontakt'
              className={`${styles.mobileNavLink} ${isActiveLink('/kontakt') ? styles.active : ''}`}
              aria-current={isActiveLink('/kontakt') ? 'page' : undefined}
            >
              Kontakt
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className={styles.overlay}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden='true'
          />
        )}
      </div>
    </header>
  )
}

export default Header
