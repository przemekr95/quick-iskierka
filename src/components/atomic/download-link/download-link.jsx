import React from 'react'
import PropTypes from 'prop-types'
import styles from './download-link.module.scss'

const DownloadLink = ({ label, url }) => {
  return (
    <li className={styles.item}>
      <a
        className={styles.link}
        download
        href={url}
        rel='noopener noreferrer'
        target='_blank'
      >
        {label}
      </a>
      <span aria-hidden='true' className={styles.icon}>
        ↗
      </span>
    </li>
  )
}

DownloadLink.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default DownloadLink
