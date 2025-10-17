import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './logo.module.scss'

// TODO

const Logo = ({ variant = 'default', className = '', linkProps = {} }) => {
  const logoClasses = [styles.logo, styles[variant], className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={logoClasses}>
      <Link
        to='/'
        aria-label='Iskierka - strona główna'
        {...linkProps}
        className={styles.logoLink}
      >
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
  )
}

Logo.propTypes = {
  /** Logo variant style */
  variant: PropTypes.oneOf(['default', 'compact', 'mobile']),
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Additional props for Link component */
  linkProps: PropTypes.object,
}

export default Logo
