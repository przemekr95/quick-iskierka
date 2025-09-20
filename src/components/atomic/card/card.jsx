import React from 'react'
import PropTypes from 'prop-types'
import styles from './card.scss'

// TODO

const Card = ({
  children,
  title,
  subtitle,
  image,
  imageAlt = '',
  className = '',
  variant = 'default',
  ...props
}) => {
  const cardClasses = [styles.card, styles[variant], className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cardClasses} {...props}>
      {image && (
        <div className={styles.cardImage}>
          <img src={image} alt={imageAlt} />
        </div>
      )}

      <div className={styles.cardContent}>
        {title && <h3 className={styles.cardTitle}>{title}</h3>}
        {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
        {children && <div className={styles.cardBody}>{children}</div>}
      </div>
    </div>
  )
}

Card.propTypes = {
  /** Card content */
  children: PropTypes.node,
  /** Card title */
  title: PropTypes.string,
  /** Card subtitle */
  subtitle: PropTypes.string,
  /** Image source URL */
  image: PropTypes.string,
  /** Image alt text for accessibility */
  imageAlt: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Card style variant */
  variant: PropTypes.oneOf(['default', 'highlighted', 'compact']),
}

Card.defaultProps = {
  children: null,
  title: '',
  subtitle: '',
  image: '',
  imageAlt: '',
  className: '',
  variant: 'default',
}

export default Card
