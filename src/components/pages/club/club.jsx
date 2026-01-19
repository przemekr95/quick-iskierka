import React, { useCallback, useEffect, useState } from 'react'
import LoadingSpinner from '../../atomic/loading-spinner/loading-spinner'
import ErrorMessage from '../../atomic/error-message/error-message'
import ClubSection from '../../sections/club/club-section'
import BoardMemberCard from '../../atomic/board-member-card/board-member-card'
import TrainingGroupBadge from '../../atomic/training-group-badge/training-group-badge'
import ScheduleItem from '../../atomic/schedule-item/schedule-item'
import DownloadLink from '../../atomic/download-link/download-link'
import styles from './club.module.scss'

const Club = () => {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/club-content.json')

      if (!response.ok) {
        throw new Error('Nie udało się pobrać treści strony')
      }

      const data = await response.json()
      setContent(data)
    } catch (err) {
      const defaultMessage =
        'Wystąpił nieoczekiwany błąd podczas ładowania treści strony.'
      let message = defaultMessage
      if (err instanceof Error && err.message) {
        message = err.message
      } else if (typeof err === 'string' && err.trim()) {
        message = err
      }
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  if (loading) {
    return <LoadingSpinner message='Ładowanie strony klubu...' />
  }

  if (error) {
    return (
      <ErrorMessage
        message={`Błąd: ${error}`}
        showRetry={true}
        onRetry={fetchContent}
      />
    )
  }

  if (!content) {
    return null
  }

  return (
    <div className={styles.clubPage}>
      <div className={styles.container}>
        <section aria-label={content.hero.title}>
          <div className={styles.aboutHeader}>
            <h1 className={styles.aboutTitle}>{content.hero.title}</h1>
            <p className={styles.aboutSubtitle}>{content.hero.subtitle}</p>
          </div>

          <div className={styles.aboutContent}>
            <p className={styles.paragraph}>{content.about.description}</p>
          </div>

          {content.about.teamImageUrl && (
            <div className={styles.aboutImageWrapper}>
              <img
                alt='Drużyna MUKS Iskierka'
                className={styles.aboutImage}
                loading='lazy'
                src={content.about.teamImageUrl}
              />
            </div>
          )}
        </section>

        <ClubSection
          subtitle={content.board.subtitle}
          title={content.board.title}
        >
          <div className={styles.boardGrid}>
            {content.board.members.map(member => (
              <BoardMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
              />
            ))}
          </div>
        </ClubSection>

        <ClubSection
          subtitle={content.trainings.subtitle}
          title={content.trainings.title}
        >
          {content.trainings.groups && content.trainings.groups.length > 0 ? (
            <div className={styles.trainingsWrapper}>
              <div className={styles.trainingsSection}>
                <h3 className={styles.trainingsSectionTitle}>
                  Grupy treningowe
                </h3>
                <ul className={styles.trainingList}>
                  {content.trainings.groups.map((group, index) => (
                    <TrainingGroupBadge
                      isActive={selectedGroupIndex === index}
                      key={group.name}
                      name={group.name}
                      onClick={() => setSelectedGroupIndex(index)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedGroupIndex(index)
                        }
                      }}
                    />
                  ))}
                </ul>
              </div>

              <div className={styles.trainingsSection}>
                <h3 className={styles.trainingsSectionTitle}>
                  Harmonogram:{' '}
                  {content.trainings.groups[
                    Math.min(
                      selectedGroupIndex,
                      content.trainings.groups.length - 1
                    )
                  ]?.name || ''}
                </h3>
                {(() => {
                  const safeIndex = Math.min(
                    Math.max(0, selectedGroupIndex),
                    content.trainings.groups.length - 1
                  )
                  const selectedGroup = content.trainings.groups[safeIndex]

                  return selectedGroup?.schedule &&
                    selectedGroup.schedule.length > 0 ? (
                    <ul className={styles.scheduleList}>
                      {selectedGroup.schedule.map(session => (
                        <ScheduleItem
                          day={session.day}
                          key={session.day}
                          location={session.location}
                          time={session.time}
                        />
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.noSchedule}>
                      {selectedGroup?.details || 'Brak dostępnych terminów'}
                    </p>
                  )
                })()}
              </div>
            </div>
          ) : (
            <p className={styles.noSchedule}>Brak grup treningowych</p>
          )}
        </ClubSection>

        <div className={styles.cardBox}>
          <ClubSection
            subtitle='Dokumenty i materiały klubowe'
            title={content.downloads.title}
          >
            <ul className={styles.downloadsList}>
              {content.downloads.items.map(item => (
                <DownloadLink
                  key={item.url}
                  label={item.label}
                  url={item.url}
                />
              ))}
            </ul>
          </ClubSection>
        </div>
      </div>
    </div>
  )
}

export default Club
