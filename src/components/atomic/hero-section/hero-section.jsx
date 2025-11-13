import React from 'react'
import PropTypes from 'prop-types'
import { HERO_CONFIG } from '../../../constants/hero'
import Button from '../button/button'
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
      />

      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
          {(primaryButton || secondaryButton) && (
            <div
              className={styles.heroActions}
              aria-label={HERO_CONFIG.ARIA_LABELS.ACTIONS}
              role='group'
            >
              {primaryButton && (
                <Button
                  ariaLabel={primaryButton.ariaLabel}
                  disabled={primaryButton.disabled}
                  onClick={handlePrimaryAction}
                  size='large'
                  type={primaryButton.type || 'button'}
                  variant='primary'
                >
                  {primaryButton.text}
                </Button>
              )}
              {secondaryButton && (
                <Button
                  ariaLabel={secondaryButton.ariaLabel}
                  disabled={secondaryButton.disabled}
                  onClick={handleSecondaryAction}
                  size='large'
                  type={secondaryButton.type || 'button'}
                  variant='outline'
                >
                  {secondaryButton.text}
                </Button>
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
  className: PropTypes.string,
  primaryButton: PropTypes.shape({
    ariaLabel: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
  }),
  secondaryButton: PropTypes.shape({
    ariaLabel: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
  }),
  subtitle: PropTypes.string,
  title: PropTypes.string,
}

HeroSection.defaultProps = {
  backgroundImage: HERO_CONFIG.DEFAULT_BACKGROUND_IMAGE,
  className: '',
  primaryButton: null,
  secondaryButton: null,
  subtitle: HERO_CONFIG.CONTENT.SUBTITLE,
  title: HERO_CONFIG.CONTENT.TITLE,
}

export default HeroSection
