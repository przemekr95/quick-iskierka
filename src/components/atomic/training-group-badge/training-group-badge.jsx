import React from 'react'
import PropTypes from 'prop-types'
import styles from './training-group-badge.module.scss'

const TrainingGroupBadge = ({ name, isActive, onClick, onKeyDown }) => {
  return (
    <button
      aria-pressed={isActive}
      className={`${styles.badge} ${isActive ? styles.badgeActive : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      type='button'
    >
      <p className={styles.name}>{name}</p>
    </button>
  )
}

TrainingGroupBadge.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
}

export default TrainingGroupBadge
