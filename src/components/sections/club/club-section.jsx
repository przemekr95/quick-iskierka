import React from 'react'
import PropTypes from 'prop-types'
import styles from './club-section.module.scss'

const ClubSection = ({ title, subtitle, children }) => {
  const ariaLabel = subtitle ? `${title} - ${subtitle}` : title
  
  return (
    <section aria-label={ariaLabel}>
      <div className={styles.header}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  )
}

ClubSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
}

ClubSection.defaultProps = {
  subtitle: '',
}

export default ClubSection
