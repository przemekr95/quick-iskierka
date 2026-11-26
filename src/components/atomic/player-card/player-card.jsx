import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getInitials } from '../../../lib/utils'
import styles from './player-card.module.scss'

const PlayerCard = ({ name, position, photo }) => {
  const [photoFailed, setPhotoFailed] = useState(false)
  const initials = getInitials(name)
  const hasPosition = Boolean(position?.trim())
  const showPhoto = Boolean(photo) && !photoFailed

  return (
    <div className={styles.card}>
      <div className={styles.media}>
        {showPhoto ? (
          <img
            alt={name}
            className={styles.photo}
            decoding='async'
            loading='lazy'
            src={photo}
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <div aria-hidden='true' className={styles.placeholder}>
            {initials}
          </div>
        )}
      </div>
      <div className={styles.info}>
        {hasPosition && <p className={styles.position}>{position}</p>}
        <p className={styles.name}>{name}</p>
      </div>
    </div>
  )
}

PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string,
  position: PropTypes.string,
}

export default PlayerCard
