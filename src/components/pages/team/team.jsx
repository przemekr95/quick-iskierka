import React, { useEffect, useState, useCallback, useMemo } from 'react'
import LoadingSpinner from '../../atomic/loading-spinner/loading-spinner'
import ErrorMessage from '../../atomic/error-message/error-message'
import ClubSection from '../../sections/club/club-section'
import PlayerCard from '../../atomic/player-card/player-card'
import BoardMemberCard from '../../atomic/board-member-card/board-member-card'
import TrainingGroupBadge from '../../atomic/training-group-badge/training-group-badge'
import styles from './team.module.scss'

const Team = () => {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/team-content.json')

      if (!response.ok) {
        throw new Error('Nie udało się pobrać treści strony')
      }

      const data = await response.json()
      setContent(data)
    } catch (err) {
      const defaultMessage =
        'Wystąpił nieoczekiwany błąd podczas ładowania treści strony.'

      const message =
        err && typeof err.message === 'string' && err.message?.trim()
          ? err.message.trim()
          : defaultMessage

      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const filteredPlayers = useMemo(() => {
    if (!content?.players?.items) return []
    if (selectedCategory === 'all') return content.players.items
    return content.players.items.filter(
      player => player.category === selectedCategory
    )
  }, [content?.players?.items, selectedCategory])

  const handleRetry = fetchContent

  if (loading) {
    return <LoadingSpinner message='Ładowanie strony drużyny...' />
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
    <div className={styles.teamPage}>
      <div className={styles.container}>
        <section aria-label={content.hero.title}>
          <div className={styles.header}>
            <h1 className={styles.title}>{content.hero.title}</h1>
            <p className={styles.subtitle}>{content.hero.subtitle}</p>
          </div>
        </section>

        <ClubSection title={content.coach.title}>
          <div className={styles.coachCard}>
            <BoardMemberCard
              name={content.coach.name}
              role={content.coach.role}
            />
          </div>
        </ClubSection>

        <ClubSection title={content.categories.label}>
          <div className={styles.categoriesWrapper}>
            <ul className={styles.categoryList}>
              <li>
                <TrainingGroupBadge
                  isActive={selectedCategory === 'all'}
                  name={content.categories.all}
                  onClick={() => setSelectedCategory('all')}
                />
              </li>
              {content.categories.groups.map(category => (
                <li key={category.id}>
                  <TrainingGroupBadge
                    isActive={selectedCategory === category.id}
                    name={category.name}
                    onClick={() => setSelectedCategory(category.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </ClubSection>

        <ClubSection subtitle={content.players?.subtitle} title={content.players?.title}>
          <div className={styles.playersGrid}>
            {filteredPlayers.length === 0 ? (
              <p className={styles.noPlayersMessage}>
                Brak zawodników dla wybranej kategorii.
              </p>
            ) : (
              filteredPlayers.map((player, index) => (
                <PlayerCard
                  key={`${player.name}-${player.category}-${index}`}
                  name={player.name}
                  position={player.position}
                />
              ))
            )}
          </div>
        </ClubSection>
      </div>
    </div>
  )
}

export default Team
