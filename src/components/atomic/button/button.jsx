import React from 'react'
import PropTypes from 'prop-types'
import styles from './button.module.scss'

// TODO

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'outline',
    'ghost',
    'danger',
    'success',
    'warning',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
}

Button.defaultProps = {
  onClick: undefined,
  variant: 'primary',
  size: 'medium',
  disabled: false,
  type: 'button',
  className: '',
}

export default Button
