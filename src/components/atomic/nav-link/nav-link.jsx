import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './nav-link.module.scss'

// TODO

const NavLink = ({
  to,
  href,
  children,
  className = '',
  activeClassName = '',
  isActive = false,
  external = false,
  target,
  rel,
  ...props
}) => {
  const linkClasses = [
    styles.navLink,
    className,
    isActive ? styles.active : '',
    isActive && activeClassName ? activeClassName : '',
  ]
    .filter(Boolean)
    .join(' ')

  // External link with enhanced security
  if (external || href) {
    const linkUrl = href || to
    const isExternalUrl =
      linkUrl && (linkUrl.startsWith('http') || linkUrl.startsWith('//'))
    const linkTarget = target || (isExternalUrl ? '_blank' : undefined)
    const linkRel =
      rel || (linkTarget === '_blank' ? 'noopener noreferrer' : undefined)

    return (
      <a
        href={linkUrl}
        target={linkTarget}
        rel={linkRel}
        className={linkClasses}
        {...props}
      >
        {children}
      </a>
    )
  }

  // Internal React Router Link
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
  /** Destination path for internal links */
  to: PropTypes.string,
  /** External URL */
  href: PropTypes.string,
  /** Link content */
  children: PropTypes.node.isRequired,
  /** Base CSS class */
  className: PropTypes.string,
  /** CSS class when link is active */
  activeClassName: PropTypes.string,
  /** Whether link is currently active */
  isActive: PropTypes.bool,
  /** Whether this is an external link */
  external: PropTypes.bool,
  /** Link target (_blank, _self, etc.) */
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  /** Link rel attribute for security */
  rel: PropTypes.string,
}

NavLink.defaultProps = {
  to: null,
  href: null,
  className: '',
  activeClassName: '',
  isActive: false,
  external: false,
  target: null,
  rel: null,
}

export default NavLink
