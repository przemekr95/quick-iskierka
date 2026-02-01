import React from 'react'
import PropTypes from 'prop-types'
import styles from './loading-spinner.module.scss'

const LoadingSpinner = ({
  className = '',
  message = 'Ładowanie...',
  size = 'medium',
}) => {
  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses} role='status' aria-live='polite'>
      <div className={`${styles.spinner} ${styles[size]}`} aria-hidden='true' />
      <p className={styles.message}>{message}</p>
    </div>
  )
}

LoadingSpinner.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
}

export default LoadingSpinner
