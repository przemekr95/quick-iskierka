import React from 'react'
import PropTypes from 'prop-types'
import styles from './error-message.module.scss'

// TODO

const ErrorMessage = ({
  message,
  type = 'error',
  showRetry = false,
  onRetry = null,
}) => {
  return (
    <div className={`${styles.errorContainer} ${styles[type]}`} role='alert'>
      <div className={styles.errorIcon} aria-hidden='true'>
        {type === 'error' ? '⚠️' : 'ℹ️'}
      </div>
      <div className={styles.errorContent}>
        <p className={styles.errorMessage}>{message}</p>
        {showRetry && onRetry && (
          <button
            className={styles.retryButton}
            onClick={onRetry}
            type='button'
          >
            Spróbuj ponownie
          </button>
        )}
      </div>
    </div>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'warning', 'info']),
  showRetry: PropTypes.bool,
  onRetry: PropTypes.func,
}

export default ErrorMessage
