import React from 'react'
import PropTypes from 'prop-types'
import styles from './schedule-item.module.scss'

const ScheduleItem = ({ day, time, location }) => {
  return (
    <li className={styles.item}>
      <div className={styles.day}>{day}</div>
      <div className={styles.details}>
        <p className={styles.time}>
          <span className={styles.icon}>🕐</span>
          {time}
        </p>
        <p className={styles.location}>
          <span className={styles.icon}>📍</span>
          {location}
        </p>
      </div>
    </li>
  )
}

ScheduleItem.propTypes = {
  day: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
}

export default ScheduleItem
