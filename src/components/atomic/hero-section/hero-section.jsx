import React from 'react'
import PropTypes from 'prop-types'
import styles from './hero-section.module.scss'

// TODO

const HeroSection = ({
  backgroundImage,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <section className={styles.heroSection}>
      <div
        className={styles.heroBackground}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-label='Hero background image'
      />
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
          <div className={styles.heroButtons}>
            {primaryButton && (
              <button
                className={styles.ctaButton}
                onClick={primaryButton.onClick}
                type='button'
              >
                {primaryButton.text}
              </button>
            )}
            {secondaryButton && (
              <button
                className={styles.secondaryButton}
                onClick={secondaryButton.onClick}
                type='button'
              >
                {secondaryButton.text}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

HeroSection.propTypes = {
  backgroundImage: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  primaryButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  secondaryButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
}

HeroSection.defaultProps = {
  backgroundImage: '',
  primaryButton: null,
  secondaryButton: null,
}

export default HeroSection
