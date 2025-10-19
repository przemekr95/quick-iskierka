import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LOGO_CONFIG } from '../../../constants/header'
import styles from './logo.module.scss'

const Logo = ({
  variant = LOGO_CONFIG.DEFAULT_VARIANT,
  className = '',
  linkProps = {},
}) => {
  const logoClasses = useMemo(
    () => [styles.logo, styles[variant], className].filter(Boolean).join(' '),
    [variant, className]
  )

  return (
    <div className={logoClasses}>
      <Link
        to={LOGO_CONFIG.HOME_PATH}
        aria-label={LOGO_CONFIG.ARIA_LABELS.LINK}
        {...linkProps}
        className={styles.logoLink}
      >
        <img
          src={LOGO_CONFIG.IMAGE_PATH}
          alt={LOGO_CONFIG.ARIA_LABELS.IMAGE}
          className={styles.logoImage}
          loading='eager'
          width='50'
          height='50'
          decoding='sync'
        />
        <div className={styles.logoText} aria-hidden='true'>
          <span className={styles.clubName}>{LOGO_CONFIG.CLUB_INFO.NAME}</span>
          <span className={styles.cityName}>{LOGO_CONFIG.CLUB_INFO.CITY}</span>
        </div>
      </Link>
    </div>
  )
}

Logo.propTypes = {
  variant: PropTypes.oneOf(Object.values(LOGO_CONFIG.VARIANTS)),
  className: PropTypes.string,
  linkProps: PropTypes.object,
}

export default Logo
