import React from 'react'
import PropTypes from 'prop-types'
import { getInitials } from '../../../lib/utils'
import styles from './player-card.module.scss'

const PlayerCard = ({ name, position }) => {
  const initials = getInitials(name)

  return (
    <div className={styles.card}>
      <div aria-label={name} className={styles.avatar} title={name}>
        {initials}
      </div>
      <div className={styles.info}>
        <p className={styles.position}>{position}</p>
        <p className={styles.name}>{name}</p>
      </div>
    </div>
  )
}

PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
}

export default PlayerCard
