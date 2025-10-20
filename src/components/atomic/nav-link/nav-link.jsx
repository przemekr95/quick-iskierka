import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { HEADER_THEMES } from '../../../constants/header'
import styles from './nav-link.module.scss'

const NavLink = ({
  to,
  href,
  children,
  className = '',
  activeClassName = '',
  theme = '',
  isActive = false,
  external = false,
  target,
  rel,
  ...props
}) => {
  const linkClasses = [
    styles.navLink,
    theme && styles[theme] ? styles[theme] : '',
    className,
    isActive ? styles.active : '',
    isActive && activeClassName ? activeClassName : '',
  ]
    .filter(Boolean)
    .join(' ')

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
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  theme: PropTypes.oneOf(Object.values(HEADER_THEMES)),
  isActive: PropTypes.bool,
  external: PropTypes.bool,
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  rel: PropTypes.string,
}

export default NavLink
