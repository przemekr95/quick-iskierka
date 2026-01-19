import React, { useEffect, useState, useMemo } from 'react'
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

  const fetchContent = async () => {
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

      const message =
        err?.message?.trim() ||
        (typeof err === 'string' ? err.trim() : '') ||
        defaultMessage

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const safeGroupIndex = useMemo(() => {
    if (!content?.trainings?.groups?.length) return 0
    return Math.min(
      Math.max(0, selectedGroupIndex),
      content.trainings.groups.length - 1
    )
  }, [content?.trainings?.groups?.length, selectedGroupIndex])

  const selectedGroup = useMemo(() => {
    return content?.trainings?.groups?.[safeGroupIndex] || null
  }, [content?.trainings?.groups, safeGroupIndex])

  useEffect(() => {
    fetchContent()
  }, [])

  const handleRetry = () => {
    fetchContent()
  }

  if (loading) {
    return <LoadingSpinner message='Ładowanie strony klubu...' />
  }

  if (error) {
    return (
      <ErrorMessage
        message={`Błąd: ${error}`}
        showRetry={true}
        onRetry={handleRetry}
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
                alt={content.about.teamImageAlt || content.hero.title}
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
                key={`${member.name}-${member.role}`}
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
                  {content.trainings.groupLabel}
                </h3>
                <ul className={styles.trainingList}>
                  {content.trainings.groups.map((group, index) => (
                    <TrainingGroupBadge
                      isActive={selectedGroupIndex === index}
                      key={`${group.name}-${index}`}
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
                  {content.trainings.scheduleLabel}
                  {selectedGroup?.name ? `: ${selectedGroup.name}` : ''}
                </h3>
                {selectedGroup?.schedule && selectedGroup.schedule.length > 0 ? (
                  <ul className={styles.scheduleList}>
                    {selectedGroup.schedule.map((session, sessionIndex) => (
                      <ScheduleItem
                        day={session.day}
                        key={`${session.day}-${session.time}-${session.location}-${sessionIndex}`}
                        location={session.location}
                        time={session.time}
                      />
                    ))}
                  </ul>
                ) : (
                  <p className={styles.noSchedule}>
                    {selectedGroup?.details || content.trainings.noScheduleMessage}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className={styles.noSchedule}>{content.trainings.noGroupsMessage}</p>
          )}
        </ClubSection>

        <div className={styles.cardBox}>
          <ClubSection
            subtitle={content.downloads.subtitle}
            title={content.downloads.title}
          >
            <ul className={styles.downloadsList}>
              {content.downloads.items.map((item, index) => (
                <DownloadLink
                  key={`${item.url}-${item.label}-${index}`}
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
