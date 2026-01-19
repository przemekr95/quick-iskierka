import React from 'react'
import PropTypes from 'prop-types'
import styles from './training-group-badge.module.scss'

const TrainingGroupBadge = ({ name, isActive, onClick, onKeyDown }) => {
  return (
    <button
      aria-label={`Wybierz grupę ${name}`}
      aria-pressed={isActive}
      className={`${styles.badge} ${isActive ? styles.badgeActive : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
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
  onKeyDown: PropTypes.func,
}

TrainingGroupBadge.defaultProps = {
  onKeyDown: () => {},
}

export default TrainingGroupBadge
