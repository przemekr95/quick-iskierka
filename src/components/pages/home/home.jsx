import React, { useState, useEffect } from 'react'
import { useSchedule } from '../../../hooks/useSchedule'
import styles from './home.module.scss'

const Home = () => {
  const { schedule, loading, error } = useSchedule()
  const [backgroundImage, setBackgroundImage] = useState('')

  // Set responsive background image based on screen size
  useEffect(() => {
    const updateBackgroundImage = () => {
      const width = window.innerWidth
      let imagePath = ''

      if (width <= 768) {
        imagePath = '/images/backgrounds/heroImage-mobile.jpg'
      } else if (width <= 1024) {
        imagePath = '/images/backgrounds/heroImage-tablet.jpg'
      } else {
        imagePath = '/images/backgrounds/heroImage-desktop.jpg'
      }

      setBackgroundImage(imagePath)
    }

    // Set initial image
    updateBackgroundImage()

    // Update on window resize
    window.addEventListener('resize', updateBackgroundImage)

    return () => window.removeEventListener('resize', updateBackgroundImage)
  }, [])

  if (loading) {
    return <div>Ładowanie terminarz...</div>
  }

  if (error) {
    return <div>Błąd: {error}</div>
  }

  return (
    <div className={styles.homePage}>
      {/* Hero Section - Full Screen */}
      <section className={styles.heroSection}>
        <div
          className={styles.heroBackground}
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : 'linear-gradient(135deg, #0066cc, #004499)',
          }}
        ></div>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>MUKS Iskierka Tarnów</h1>
            <p className={styles.heroSubtitle}>
              Pasja • Determinacja • Siatkówka
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.ctaButton}>Poznaj Klub</button>
              <button className={styles.secondaryButton}>Zobacz Drużynę</button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <h2>Aktualności</h2>
          <p>Tutaj będą najnowsze informacje o klubie...</p>
          {schedule && schedule.length > 0 && (
            <div>
              <h3>Najbliższe mecze:</h3>
              {schedule.slice(0, 3).map((match, index) => (
                <div key={index} className={styles.matchItem}>
                  <p>{match.title || 'Mecz'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
