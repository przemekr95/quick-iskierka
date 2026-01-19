import React from 'react'
import PropTypes from 'prop-types'
import styles from './board-member-card.module.scss'

const BoardMemberCard = ({ name, role }) => {
  const initials =
    typeof name === 'string'
      ? name
          .split(' ')
          .filter(word => word && word.length > 0)
          .slice(0, 2)
          .map(word => word[0])
          .join('')
          .toUpperCase()
      : ''

  return (
    <div className={styles.card}>
      <div className={styles.avatar} title={name}>
        {initials}
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.role}>{role}</p>
      </div>
    </div>
  )
}

BoardMemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
}

export default BoardMemberCard
