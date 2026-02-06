import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './sponsors-carousel.module.scss'

const SponsorsCarousel = ({ autoPlayDelay = 3000, sponsors = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)
  const itemsPerView = 4
  const maxIndex = Math.max(0, sponsors.length - itemsPerView)

  useEffect(() => {
    if (sponsors.length > itemsPerView) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
      }, autoPlayDelay)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [sponsors.length, autoPlayDelay, maxIndex, itemsPerView])

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }

  if (!sponsors || sponsors.length === 0) return null

  const slideWidth = 100 / itemsPerView

  return (
    <section aria-label='Nasi sponsorzy' className={styles.sponsorsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nasi Sponsorzy</h2>
        <p className={styles.subtitle}>Dziękujemy za wsparcie</p>

        <div className={styles.carouselWrapper}>
          <div
            className={styles.carousel}
            style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
          >
            {sponsors.map(sponsor => {
              const CardWrapper = sponsor.website ? 'a' : 'div'
              const cardProps = sponsor.website
                ? {
                    href: sponsor.website,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': `Odwiedź stronę ${sponsor.name}`,
                  }
                : {}

              return (
                <CardWrapper
                  key={sponsor.id}
                  className={styles.sponsorCard}
                  {...cardProps}
                >
                  <img alt={sponsor.name} loading='lazy' src={sponsor.logo} />
                </CardWrapper>
              )
            })}
          </div>
        </div>

        {sponsors.length > itemsPerView && (
          <div className={styles.navigationButtons}>
            <button
              aria-label='Poprzedni sponsor'
              className={styles.navButton}
              onClick={goToPrevious}
              type='button'
            >
              ‹
            </button>
            <button
              aria-label='Następny sponsor'
              className={styles.navButton}
              onClick={goToNext}
              type='button'
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

SponsorsCarousel.propTypes = {
  autoPlayDelay: PropTypes.number,
  sponsors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      website: PropTypes.string,
    })
  ).isRequired,
}

export default SponsorsCarousel
