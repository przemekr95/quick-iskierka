import React from 'react'
import PropTypes from 'prop-types'
import NavLink from '../nav-link/nav-link'
import Logo from '../logo/logo'
import {
  LEFT_NAVIGATION,
  RIGHT_NAVIGATION,
} from '../../../constants/navigation'
import styles from './navigation-desktop.module.scss'

// TODO

const NavigationDesktop = ({
  isActiveLink,
  getThemeClass,
  showLogo = true,
}) => {
  // Determine logo variant based on theme
  const getLogoVariant = () => {
    const themeClass = getThemeClass()
    if (themeClass && themeClass.includes('transparent')) {
      return 'transparent'
    }
    return 'default'
  }

  return (
    <div className={styles.desktopNav}>
      {/* Left Navigation */}
      <nav className={styles.leftNav} aria-label='Nawigacja lewa'>
        {LEFT_NAVIGATION.map(item => {
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

      {/* Logo - Center */}
      {showLogo && <Logo variant={getLogoVariant()} />}

      {/* Right Navigation */}
      <nav className={styles.rightNav} aria-label='Nawigacja główna'>
        {RIGHT_NAVIGATION.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={getThemeClass()}
            isActive={isActiveLink(path)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

NavigationDesktop.propTypes = {
  /** Function to check if link is active */
  isActiveLink: PropTypes.func.isRequired,
  /** Function to get theme class based on scroll state */
  getThemeClass: PropTypes.func.isRequired,
  /** Whether to show logo in center */
  showLogo: PropTypes.bool,
}

export default NavigationDesktop
