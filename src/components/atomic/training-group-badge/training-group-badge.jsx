import React from 'react'
import PropTypes from 'prop-types'
import styles from './training-group-badge.module.scss'

const TrainingGroupBadge = ({ name, isActive, onClick, onKeyDown }) => {
  return (
    <li
      className={`${styles.badge} ${isActive ? styles.badgeActive : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role='button'
      tabIndex={0}
    >
      <p className={styles.name}>{name}</p>
    </li>
  )
}

TrainingGroupBadge.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
}

export default TrainingGroupBadge
