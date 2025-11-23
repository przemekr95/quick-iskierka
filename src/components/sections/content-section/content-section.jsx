import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Button from '../../atomic/button/button'
import styles from './content-section.module.scss'

const ContentSection = ({
  buttonLink,
  buttonText,
  className = '',
  content,
  id,
  imageAlt,
  imagePosition = 'right',
  imageUrl,
  subtitle,
  title,
  ...props
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
    <section aria-label={title} className={sectionClasses} id={id} {...props}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <div className={styles.textWrapper}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <p className={styles.content}>{content}</p>
            <Button
              onClick={handleButtonClick}
              size='large'
              variant='secondary'
            >
              {buttonText}
            </Button>
          </div>
        </div>
        <div className={styles.imageContent}>
          <img alt={imageAlt} className={styles.imageWrapper} src={imageUrl} />
        </div>
      </div>
    </section>
  )
}

ContentSection.propTypes = {
  buttonLink: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  imagePosition: PropTypes.oneOf(['left', 'right']).isRequired,
  imageUrl: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ContentSection
