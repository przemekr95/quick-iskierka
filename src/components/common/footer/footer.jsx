import React from 'react'
import styles from './footer.module.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.bottom}>
          © {currentYear} MUKS Iskierka Tarnów. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}

export default Footer
