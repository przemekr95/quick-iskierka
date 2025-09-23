import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSchedule } from '../../../hooks/useSchedule'
import { HERO_IMAGE } from '../../../constants/images'
import HeroSection from '../../atomic/hero-section/hero-section'
import LoadingSpinner from '../../atomic/loading-spinner/loading-spinner'
import ErrorMessage from '../../atomic/error-message/error-message'
import styles from './home.module.scss'

const Home = () => {
  const { schedule, loading, error } = useSchedule()
  const navigate = useNavigate()

  const handleLearnMore = () => {
    navigate('/klub')
  }

  const handleViewTeam = () => {
    navigate('/druzyna')
  }

  if (loading) {
    return <LoadingSpinner message='Ładowanie terminarz...' />
  }

  if (error) {
    return <ErrorMessage message={`Błąd: ${error}`} showRetry={true} />
  }

  return (
    <div className={styles.homePage}>
      <HeroSection
        backgroundImage={HERO_IMAGE}
        title='MUKS Iskierka Tarnów'
        subtitle='Pasja • Determinacja • Siatkówka'
        primaryButton={{
          text: 'Poznaj Klub',
          onClick: handleLearnMore,
        }}
        secondaryButton={{
          text: 'Zobacz Drużynę',
          onClick: handleViewTeam,
        }}
      />

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

// Home component doesn't receive props but we add PropTypes for future extensibility
Home.propTypes = {
  // Future props can be added here
  // initialData: PropTypes.object,
  // theme: PropTypes.oneOf(['light', 'dark']),
}

Home.defaultProps = {
  // Default props can be added here in the future
}

export default Home
