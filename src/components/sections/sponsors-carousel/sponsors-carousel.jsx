import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './sponsors-carousel.module.scss'

// TODO

const SponsorsCarousel = ({
  sponsors,
  autoPlay = true,
  autoPlayDelay = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const intervalRef = useRef(null)
  const carouselRef = useRef(null)

  // Calculate max index (showing 3 at a time, so max is length - 3)
  const maxIndex = Math.max(0, sponsors.length - 3)

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && sponsors.length > 3) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex =>
          prevIndex >= maxIndex ? 0 : prevIndex + 1
        )
      }, autoPlayDelay)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, sponsors.length, autoPlayDelay, maxIndex])

  // Navigation functions
  const goToSlide = index => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? maxIndex : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  // Pause/resume on mouse interaction
  const handleMouseEnter = () => {
    setIsPlaying(false)
  }

  const handleMouseLeave = () => {
    if (autoPlay) {
      setIsPlaying(true)
    }
  }

  // Keyboard navigation
  const handleKeyDown = event => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        goToPrevious()
        break
      case 'ArrowRight':
        event.preventDefault()
        goToNext()
        break
      case ' ':
      case 'Enter':
        event.preventDefault()
        setIsPlaying(!isPlaying)
        break
      default:
        break
    }
  }

  if (!sponsors || sponsors.length === 0) {
    return null
  }

  return (
    <section className={styles.sponsorsSection} aria-label='Nasi sponsorzy'>
      <div className={styles.container}>
        <h2 className={styles.title}>Nasi Sponsorzy</h2>
        <p className={styles.subtitle}>Dziękujemy za wsparcie</p>

        <div
          className={styles.carousel}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex='0'
          role='region'
          aria-label='Karuzela sponsorów'
          aria-live='polite'
          ref={carouselRef}
        >
          {/* Slides container */}
          <div
            className={styles.slidesContainer}
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {sponsors.map((sponsor, index) => (
              <div
                key={sponsor.id || index}
                className={styles.slide}
                aria-hidden={index < currentIndex || index >= currentIndex + 3}
              >
                <div className={styles.sponsorCard}>
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className={styles.sponsorLogo}
                    loading='lazy'
                  />
                  <h3 className={styles.sponsorName}>{sponsor.name}</h3>
                  {sponsor.website && (
                    <a
                      href={sponsor.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={styles.sponsorLink}
                      aria-label={`Odwiedź stronę ${sponsor.name}`}
                    >
                      Odwiedź stronę
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          {sponsors.length > 3 && (
            <>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={goToPrevious}
                aria-label='Poprzednia grupa sponsorów'
                type='button'
              >
                <span className={styles.navIcon} aria-hidden='true'>
                  ‹
                </span>
              </button>

              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={goToNext}
                aria-label='Następna grupa sponsorów'
                type='button'
              >
                <span className={styles.navIcon} aria-hidden='true'>
                  ›
                </span>
              </button>
            </>
          )}

          {/* Play/Pause button */}
          {sponsors.length > 3 && autoPlay && (
            <button
              className={styles.playPauseButton}
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={
                isPlaying
                  ? 'Zatrzymaj automatyczne przewijanie'
                  : 'Włącz automatyczne przewijanie'
              }
              type='button'
            >
              <span className={styles.playPauseIcon} aria-hidden='true'>
                {isPlaying ? '⏸' : '▶'}
              </span>
            </button>
          )}

          {/* Dots indicators */}
          {sponsors.length > 3 && (
            <div
              className={styles.dotsContainer}
              role='tablist'
              aria-label='Nawigacja sponsorów'
            >
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Przejdź do pozycji ${index + 1}`}
                  aria-selected={index === currentIndex}
                  role='tab'
                  type='button'
                />
              ))}
            </div>
          )}
        </div>

        {/* Screen reader announcements */}
        <div className={styles.srOnly} aria-live='polite' aria-atomic='true'>
          Wyświetlane sponsorzy od pozycji {currentIndex + 1}
        </div>
      </div>
    </section>
  )
}

SponsorsCarousel.propTypes = {
  sponsors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      website: PropTypes.string,
    })
  ).isRequired,
  autoPlay: PropTypes.bool,
  autoPlayDelay: PropTypes.number,
}

SponsorsCarousel.defaultProps = {
  autoPlay: true,
  autoPlayDelay: 3000,
}

export default SponsorsCarousel
