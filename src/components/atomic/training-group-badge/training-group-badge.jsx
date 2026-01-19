import React from 'react'
import PropTypes from 'prop-types'
import styles from './training-group-badge.module.scss'

const TrainingGroupBadge = ({ name, isActive, onClick }) => {
  return (
    <button
      aria-label={`Wybierz grupę ${name}`}
      aria-pressed={isActive}
      className={`${styles.badge} ${isActive ? styles.badgeActive : ''}`}
      onClick={onClick}
      type='button'
    >
      <span className={styles.name}>{name}</span>
    </button>
  )
}

TrainingGroupBadge.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TrainingGroupBadge
