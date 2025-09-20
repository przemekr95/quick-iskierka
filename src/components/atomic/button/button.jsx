import React from 'react'
import PropTypes from 'prop-types'
import {
  childrenPropType,
  buttonVariantPropType,
  sizePropType,
  classNamePropType,
} from '../../../utils/propTypes'
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
  /** Button content */
  children: childrenPropType.isRequired,
  /** Click handler function */
  onClick: PropTypes.func,
  /** Button style variant */
  variant: buttonVariantPropType,
  /** Button size */
  size: sizePropType,
  /** Whether button is disabled */
  disabled: PropTypes.bool,
  /** HTML button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Additional CSS classes */
  className: classNamePropType,
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
