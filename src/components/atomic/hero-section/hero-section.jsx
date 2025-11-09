import React from 'react'
import PropTypes from 'prop-types'
import { HERO_CONFIG } from '../../../constants/hero'
import styles from './hero-section.module.scss'

const HeroSection = ({
  backgroundImage = HERO_CONFIG.DEFAULT_BACKGROUND_IMAGE,
  title = HERO_CONFIG.CONTENT.TITLE,
  subtitle = HERO_CONFIG.CONTENT.SUBTITLE,
  primaryButton,
  secondaryButton,
  className = '',
  ...props
}) => {
  const handlePrimaryAction = event => {
    if (primaryButton?.onClick) {
      primaryButton.onClick(event)
    }
  }

  const handleSecondaryAction = event => {
    if (secondaryButton?.onClick) {
      secondaryButton.onClick(event)
    }
  }

  const heroClasses = [styles.heroSection, className].filter(Boolean).join(' ')

  return (
    <section
      className={heroClasses}
      aria-label={HERO_CONFIG.ARIA_LABELS.SECTION}
      {...props}
    >
      <div
        className={styles.heroBackground}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden='true'
        role='img'
        aria-label={HERO_CONFIG.ARIA_LABELS.BACKGROUND}
      />

      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p
            className={styles.heroSubtitle}
            aria-label={HERO_CONFIG.ARIA_LABELS.SUBTITLE}
          >
            {subtitle}
          </p>
          {(primaryButton || secondaryButton) && (
            <div
              className={styles.heroActions}
              aria-label={HERO_CONFIG.ARIA_LABELS.ACTIONS}
              role='group'
            >
              {primaryButton && (
                <button
                  className={styles.primaryButton}
                  onClick={handlePrimaryAction}
                  type={primaryButton.type || 'button'}
                  disabled={primaryButton.disabled}
                  aria-label={
                    primaryButton.ariaLabel ||
                    `${HERO_CONFIG.ARIA_LABELS.PRIMARY_BUTTON}: ${primaryButton.text}`
                  }
                >
                  {primaryButton.text}
                </button>
              )}
              {secondaryButton && (
                <button
                  className={styles.secondaryButton}
                  onClick={handleSecondaryAction}
                  type={secondaryButton.type || 'button'}
                  disabled={secondaryButton.disabled}
                  aria-label={
                    secondaryButton.ariaLabel ||
                    `${HERO_CONFIG.ARIA_LABELS.SECONDARY_BUTTON}: ${secondaryButton.text}`
                  }
                >
                  {secondaryButton.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

HeroSection.propTypes = {
  backgroundImage: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  primaryButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    ariaLabel: PropTypes.string,
  }),
  secondaryButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    ariaLabel: PropTypes.string,
  }),
  className: PropTypes.string,
}

HeroSection.defaultProps = {
  backgroundImage: HERO_CONFIG.DEFAULT_BACKGROUND_IMAGE,
  title: HERO_CONFIG.CONTENT.TITLE,
  subtitle: HERO_CONFIG.CONTENT.SUBTITLE,
  primaryButton: null,
  secondaryButton: null,
  className: '',
}

export default HeroSection
