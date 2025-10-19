import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import NavLink from '../nav-link/nav-link'
import Logo from '../logo/logo'
import {
  LEFT_NAVIGATION,
  RIGHT_NAVIGATION,
} from '../../../constants/navigation'
import { LOGO_CONFIG } from '../../../constants/header'
import styles from './navigation-desktop.module.scss'

const NavigationDesktop = ({
  isActiveLink,
  getThemeClass,
  showLogo = true,
}) => {
  const logoVariant = useMemo(() => {
    const themeClass = getThemeClass()
    return themeClass && themeClass.includes('transparent')
      ? LOGO_CONFIG.VARIANTS.TRANSPARENT
      : LOGO_CONFIG.VARIANTS.DEFAULT
  }, [getThemeClass])

  const currentTheme = useMemo(() => getThemeClass(), [getThemeClass])

  const renderExternalLink = useCallback(
    item => (
      <NavLink
        key={item.href}
        href={item.href}
        external={true}
        target={item.target}
        className={currentTheme}
        aria-label={`${item.label} - otwiera w nowej karcie`}
        rel='noopener noreferrer'
      >
        <svg
          className={styles.facebookIcon}
          viewBox='0 0 24 24'
          fill='currentColor'
          aria-hidden='true'
          focusable='false'
          role='img'
        >
          <title>{item.label} icon</title>
          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
        </svg>
        <span className='sr-only'>{item.label}</span>
      </NavLink>
    ),
    [currentTheme]
  )

  const renderInternalLink = useCallback(
    item => (
      <NavLink
        key={item.path}
        to={item.path}
        className={currentTheme}
        isActive={isActiveLink(item.path)}
      >
        {item.label}
      </NavLink>
    ),
    [currentTheme, isActiveLink]
  )

  return (
    <div
      className={styles.desktopNav}
      role='navigation'
      aria-label='Nawigacja główna strony'
    >
      <nav
        className={styles.leftNav}
        aria-label='Media społecznościowe'
        role='navigation'
      >
        <ul className={styles.socialList} role='list'>
          {LEFT_NAVIGATION.map(item => (
            <li key={item.href || item.path} role='listitem'>
              {item.type === 'external'
                ? renderExternalLink(item)
                : renderInternalLink(item)}
            </li>
          ))}
        </ul>
      </nav>

      {showLogo && (
        <div className={styles.logoContainer} role='banner'>
          <Logo variant={logoVariant} />
        </div>
      )}

      <nav
        className={styles.rightNav}
        aria-label='Nawigacja główna'
        role='navigation'
      >
        <ul className={styles.mainNavList} role='list'>
          {RIGHT_NAVIGATION.map(({ path, label }) => (
            <li key={path} role='listitem'>
              <NavLink
                to={path}
                className={currentTheme}
                isActive={isActiveLink(path)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

NavigationDesktop.propTypes = {
  isActiveLink: PropTypes.func.isRequired,
  getThemeClass: PropTypes.func.isRequired,
  showLogo: PropTypes.bool,
}

export default NavigationDesktop
