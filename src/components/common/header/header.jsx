import React from 'react'
import { Link } from 'react-router-dom'
import { useMobileMenu } from '../../../hooks/useMobileMenu'
import { useNavigation } from '../../../hooks/useNavigation'
import { useScrolled } from '../../../hooks/useScrolled'
import NavLink from '../../atomic/nav-link/nav-link'
import {
  LEFT_NAVIGATION,
  RIGHT_NAVIGATION,
} from '../../../constants/navigation'
import styles from './header.module.scss'

// TODO

const Header = () => {
  const { isMenuOpen, toggleMenu } = useMobileMenu()
  const { isActiveLink, isHomePage } = useNavigation()
  const isScrolled = useScrolled(50)

  const getHeaderClasses = () => {
    let classes = [styles.header]

    if (isHomePage) {
      if (!isScrolled) {
        classes.push(styles.transparent)
      } else {
        classes.push(styles.scrolled)
      }
    }

    return classes.join(' ')
  }

  return (
    <header className={getHeaderClasses()} data-header>
      <div className={styles.container}>
        {/* Left Navigation */}
        <nav className={styles.leftNav} aria-label='Nawigacja lewa'>
          {LEFT_NAVIGATION.map(item => {
            const getThemeClass = () => {
              if (!isScrolled && isHomePage) return styles.transparent
              if (isScrolled) return styles.scrolled
              return ''
            }

            if (item.type === 'external') {
              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  external={true}
                  target={item.target}
                  className={getThemeClass()}
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
                className={getThemeClass()}
                isActive={isActiveLink(item.path)}
              >
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* Logo */}
        <div className={styles.logo}>
          <Link to='/' aria-label='Iskierka - strona główna'>
            <img
              src='/images/logo/iskierkaTarnow_white.png'
              alt='MUKS Iskierka Tarnów - Logo klubu siatkarskiego'
              className={styles.logoImage}
              loading='eager'
            />
            <div className={styles.logoText}>
              <span className={styles.clubName}>MUKS Iskierka</span>
              <span className={styles.cityName}>Tarnów</span>
            </div>
          </Link>
        </div>

        {/* Right Navigation */}
        <nav className={styles.rightNav} aria-label='Nawigacja główna'>
          {RIGHT_NAVIGATION.map(({ path, label }) => {
            const getThemeClass = () => {
              if (!isScrolled && isHomePage) return styles.transparent
              if (isScrolled) return styles.scrolled
              return ''
            }

            return (
              <NavLink
                key={path}
                to={path}
                className={getThemeClass()}
                isActive={isActiveLink(path)}
              >
                {label}
              </NavLink>
            )
          })}
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
      </div>
    </header>
  )
}

// Header component doesn't receive props, but we can add PropTypes for future extensibility
Header.propTypes = {
  // Future props can be added here
  // className: PropTypes.string,
  // variant: PropTypes.oneOf(['default', 'transparent']),
}

Header.defaultProps = {
  // Default props can be added here in the future
}

export default Header
