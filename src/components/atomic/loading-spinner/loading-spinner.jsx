import React from 'react'
import PropTypes from 'prop-types'
import styles from './loading-spinner.module.scss'

// TODO

const LoadingSpinner = ({ message = 'Ładowanie...', size = 'medium' }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={`${styles.spinner} ${styles[size]}`} aria-hidden='true' />
      <p className={styles.loadingMessage}>{message}</p>
    </div>
  )
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
}

export default LoadingSpinner
