import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// TODO

const NavLink = ({
  to,
  children,
  className = '',
  activeClassName = '',
  isActive = false,
  ...props
}) => {
  const linkClasses = [className, isActive ? activeClassName : '']
    .filter(Boolean)
    .join(' ')

  return (
    <Link
      to={to}
      className={linkClasses}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  )
}

NavLink.propTypes = {
  /** Destination path */
  to: PropTypes.string.isRequired,
  /** Link content */
  children: PropTypes.node.isRequired,
  /** Base CSS class */
  className: PropTypes.string,
  /** CSS class when link is active */
  activeClassName: PropTypes.string,
  /** Whether link is currently active */
  isActive: PropTypes.bool,
}

NavLink.defaultProps = {
  className: '',
  activeClassName: '',
  isActive: false,
}

export default NavLink
