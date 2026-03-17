import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './sponsors-carousel.module.scss'

const getItemsPerView = () => {
  if (typeof window === 'undefined') return 4

  if (window.matchMedia('(max-width: 480px)').matches) return 1
  if (window.matchMedia('(max-width: 768px)').matches) return 2
  if (window.matchMedia('(max-width: 1024px)').matches) return 3

  return 4
}

const SponsorsCarousel = ({ autoPlayDelay = 3000, sponsors = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView)
  const [isAutoplayPausedByUser, setIsAutoplayPausedByUser] = useState(false)
  const intervalRef = useRef(null)
  const resumeTimeoutRef = useRef(null)
  const maxIndex = Math.max(0, sponsors.length - itemsPerView)

  const pauseAutoplayTemporarily = () => {
    setIsAutoplayPausedByUser(true)

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoplayPausedByUser(false)
      resumeTimeoutRef.current = null
    }, autoPlayDelay * 2)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQueries = [
      window.matchMedia('(max-width: 480px)'),
      window.matchMedia('(max-width: 768px)'),
      window.matchMedia('(max-width: 1024px)'),
    ]

    const handleMediaChange = () => {
      setItemsPerView(getItemsPerView())
    }

    mediaQueries.forEach(mediaQuery => {
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleMediaChange)
        return
      }

      mediaQuery.addListener(handleMediaChange)
    })

    return () => {
      mediaQueries.forEach(mediaQuery => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleMediaChange)
          return
        }

        mediaQuery.removeListener(handleMediaChange)
      })
    }
  }, [])

  useEffect(() => {
    setCurrentIndex(previousIndex => Math.min(previousIndex, maxIndex))
  }, [maxIndex])

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    if (sponsors.length > itemsPerView && !isAutoplayPausedByUser) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
      }, autoPlayDelay)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [
    sponsors.length,
    autoPlayDelay,
    maxIndex,
    itemsPerView,
    isAutoplayPausedByUser,
  ])

  useEffect(
    () => () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
    },
    []
  )

  const goToPrevious = () => {
    pauseAutoplayTemporarily()
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1))
  }

  const goToNext = () => {
    pauseAutoplayTemporarily()
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
