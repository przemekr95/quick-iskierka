import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button/button'
import styles from './error-message.module.scss'

const ErrorMessage = ({
  className = '',
  message,
  onRetry = null,
  showRetry = false,
  type = 'error',
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return (
          <svg
            className={styles.icon}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
        )
      case 'warning':
        return (
          <svg
            className={styles.icon}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        )
      case 'info':
        return (
          <svg
            className={styles.icon}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        )
      default:
        return null
    }
  }

  const contentClasses = [styles.content, styles[type]]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={[styles.container, className].filter(Boolean).join(' ')}>
      <div className={contentClasses} role='alert' aria-live='assertive'>
        <div className={styles.iconWrapper}>{getIcon()}</div>
        <div className={styles.textContent}>
          <p className={styles.message}>{message}</p>
          {showRetry && onRetry && (
            <Button
              className={styles.retryButton}
              onClick={onRetry}
              size='small'
              variant='outline'
              ariaLabel='Spróbuj ponownie załadować dane'
            >
              Spróbuj ponownie
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

ErrorMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
  showRetry: PropTypes.bool,
  type: PropTypes.oneOf(['error', 'warning', 'info']),
}

export default ErrorMessage
