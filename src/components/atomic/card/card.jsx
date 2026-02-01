import React from 'react'
import PropTypes from 'prop-types'
import styles from './card.scss'

const Card = ({
  children,
  className = '',
  image,
  imageAlt = '',
  subtitle,
  title,
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
  children: PropTypes.node,
  className: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'highlighted', 'compact']),
}

export default Card
