import React from 'react'
import PropTypes from 'prop-types'
import styles from './download-link.module.scss'

const DownloadLink = ({ label, url }) => {
  const getDownloadFilename = () => {
    if (!url) return 'download'
    const urlObj = new URL(url, window.location.origin)
    const pathname = urlObj.pathname
    const filename = pathname.split('/').pop()
    return filename || label?.trim() || 'download'
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
