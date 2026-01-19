import React from 'react'
import PropTypes from 'prop-types'
import styles from './download-link.module.scss'

const DownloadLink = ({ label, url }) => {
  const getDownloadFilename = () => {
    if (!label) return 'download'
    const trimmed = label.trim()
    const sanitized = trimmed
      .replace(/[/\\?%*:|"<>]/g, '')
      .replace(/\s+/g, '_')
    return sanitized || 'download'
  }

  return (
    <li className={styles.item}>
      <a
        className={styles.link}
        download={getDownloadFilename()}
        href={url}
        rel='noopener noreferrer'
      >
        {label}
      </a>
      <span aria-hidden='true' className={styles.icon}>
        ↓
      </span>
    </li>
  )
}

DownloadLink.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default DownloadLink
