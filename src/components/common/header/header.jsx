import React from 'react'
import { Link } from 'react-router-dom'
import { useMobileMenu } from '../../../hooks/useMobileMenu'
import { useNavigation } from '../../../hooks/useNavigation'
import NavLink from '../../atomic/nav-link/nav-link'
import { NAVIGATION_ITEMS } from '../../../constants/navigation'
import styles from './header.module.scss'

// TODO

const Header = () => {
  const { isMenuOpen, toggleMenu } = useMobileMenu()
  const { isActiveLink, isHomePage } = useNavigation()

  return (
    <header
      className={`${styles.header} ${isHomePage ? styles.transparent : ''}`}
      data-header
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to='/' aria-label='Iskierka - strona główna'>
            <span className={styles.logoText}>Iskierka</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label='Nawigacja główna'>
          {NAVIGATION_ITEMS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={styles.navLink}
              activeClassName={styles.active}
              isActive={isActiveLink(path)}
            >
              {label}
            </NavLink>
          ))}
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
            {NAVIGATION_ITEMS.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={styles.mobileNavLink}
                activeClassName={styles.active}
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
