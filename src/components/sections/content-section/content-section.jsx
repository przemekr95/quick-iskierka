import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import styles from './content-section.module.scss'

// TODO

const ContentSection = ({
  id,
  title,
  subtitle,
  content,
  buttonText,
  buttonLink,
  imageUrl,
  imageAlt,
  imagePosition = 'right',
  className = '',
}) => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate(buttonLink)
  }

  const sectionClasses = [
    styles.contentSection,
    styles[`image-${imagePosition}`],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={sectionClasses} id={id}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <div className={styles.textWrapper}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <p className={styles.content}>{content}</p>
            <button
              className={styles.ctaButton}
              onClick={handleButtonClick}
              type='button'
            >
              {buttonText}
            </button>
          </div>
        </div>
        <div className={styles.imageContent}>
          <div
            className={styles.imageWrapper}
            style={{ backgroundImage: `url(${imageUrl})` }}
            role='img'
            aria-label={imageAlt}
          />
        </div>
      </div>
    </section>
  )
}

ContentSection.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  imagePosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
}

ContentSection.defaultProps = {
  imagePosition: 'right',
  className: '',
}

export default ContentSection
