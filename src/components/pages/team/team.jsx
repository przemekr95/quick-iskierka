import React, { useEffect, useState, useCallback, useMemo } from 'react'
import LoadingSpinner from '../../atomic/loading-spinner/loading-spinner'
import ErrorMessage from '../../atomic/error-message/error-message'
import { fetchJson, normalizeError } from '../../../lib/http'
import ClubSection from '../../sections/club/club-section'
import PlayerCard from '../../atomic/player-card/player-card'
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

      const data = await fetchJson('/team-content.json', {
        defaultErrorMessage: 'Nie udało się pobrać treści strony',
      })
      setContent(data)
    } catch (err) {
      const message = normalizeError(err, {
        defaultMessage:
          'Wystąpił nieoczekiwany błąd podczas ładowania treści strony.',
      })
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
    return content.players.items.filter(player =>
      player.categories?.includes(selectedCategory)
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

  const selectedGroup = content.categories.groups?.find(
    group => group.id === selectedCategory
  )

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
            <PlayerCard
              name={content.coach.name}
              photo={content.coach.photo}
              position={content.coach.role}
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
              {content.categories.groups?.map(category => (
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

        <ClubSection
          subtitle={content.players?.subtitle}
          title={content.players?.title}
        >
          {selectedGroup?.photo && (
            <figure className={styles.groupPhoto}>
              <img
                alt={`Drużyna: ${selectedGroup.name}`}
                decoding='async'
                src={selectedGroup.photo}
              />
            </figure>
          )}
          <div className={styles.playersGrid}>
            {filteredPlayers.length === 0 ? (
              <p className={styles.noPlayersMessage}>
                Brak zawodników dla wybranej kategorii.
              </p>
            ) : (
              filteredPlayers.map((player, index) => (
                <PlayerCard
                  key={`${player.name}-${index}`}
                  name={player.name}
                  photo={player.photo}
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
