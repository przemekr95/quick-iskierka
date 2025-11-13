import React from 'react'
import PropTypes from 'prop-types'
import styles from './button.module.scss'

const Button = ({
  ariaControls,
  ariaExpanded,
  ariaLabel,
  children,
  className = '',
  disabled = false,
  onClick,
  size = 'medium',
  type = 'button',
  variant = 'primary',
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
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  ariaControls: PropTypes.string,
  ariaExpanded: PropTypes.bool,
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
}

Button.defaultProps = {
  ariaControls: undefined,
  ariaExpanded: undefined,
  ariaLabel: undefined,
  className: '',
  disabled: false,
  onClick: undefined,
  size: 'medium',
  type: 'button',
  variant: 'primary',
}

export default Button
