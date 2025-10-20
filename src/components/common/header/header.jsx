import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import NavigationDesktop from '../../atomic/navigation-desktop/navigation-desktop'
import NavigationMobile from '../../atomic/navigation-mobile/navigation-mobile'
import { useMobileMenu } from '../../../hooks/useMobileMenu'
import { useNavigation } from '../../../hooks/useNavigation'
import { useScrolled } from '../../../hooks/useScrolled'
import { HEADER_CONFIG } from '../../../constants/header'
import styles from './header.module.scss'

const Header = ({
  scrollThreshold = HEADER_CONFIG.DEFAULT_SCROLL_THRESHOLD,
}) => {
  const { isMenuOpen, toggleMenu } = useMobileMenu()
  const { isActiveLink, isHomePage } = useNavigation()
  const isScrolled = useScrolled(scrollThreshold)

  const headerClasses = useMemo(() => {
    const baseClass = styles.header

    const themeClass = !isHomePage
      ? styles.filled
      : isScrolled
        ? styles.scrolled
        : styles.transparent

    return `${baseClass} ${themeClass}`
  }, [isHomePage, isScrolled])

  const getThemeClass = useCallback(
    () => (!isHomePage || isScrolled ? styles.scrolled : styles.transparent),
    [isScrolled, isHomePage]
  )

  const getThemeToken = useCallback(
    () => (!isHomePage || isScrolled ? 'scrolled' : 'transparent'),
    [isScrolled, isHomePage]
  )

  return (
    <>
      <a
        href={HEADER_CONFIG.SKIP_LINK_TARGET}
        className={styles.skipLink}
        aria-label={HEADER_CONFIG.ARIA_LABELS.SKIP_LINK}
      >
        {HEADER_CONFIG.ARIA_LABELS.SKIP_LINK}
      </a>

      <header
        className={headerClasses}
        role='banner'
        aria-label={HEADER_CONFIG.ARIA_LABELS.BANNER}
        data-header
      >
        <div className={styles.container}>
          <NavigationDesktop
            isActiveLink={isActiveLink}
            getThemeToken={getThemeToken}
            showLogo={true}
          />
          <NavigationMobile
            isActiveLink={isActiveLink}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            getThemeClass={getThemeClass}
            showLogo={true}
          />
        </div>
      </header>
    </>
  )
}

Header.propTypes = {
  scrollThreshold: PropTypes.number,
}

export default Header
