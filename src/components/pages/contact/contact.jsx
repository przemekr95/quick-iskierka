import React, { useCallback, useEffect, useState } from 'react'
import LoadingSpinner from '../../atomic/loading-spinner/loading-spinner'
import ErrorMessage from '../../atomic/error-message/error-message'
import { fetchJson, normalizeError } from '../../../lib/http'
import styles from './contact.module.scss'

const Contact = () => {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await fetchJson('/contact-content.json', {
        defaultErrorMessage: 'Nie udało się pobrać danych kontaktowych',
      })
      setContent(data)
    } catch (err) {
      const message = normalizeError(err, {
        defaultMessage:
          'Wystąpił nieoczekiwany błąd podczas ładowania treści strony.',
      })
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const handleRetry = fetchContent

  if (loading) {
    return <LoadingSpinner message='Ładowanie danych kontaktowych...' />
  }

  if (error) {
    return (
      <ErrorMessage
        message={`Błąd: ${error}`}
        showRetry={true}
        onRetry={handleRetry}
      />
    )
  }

  if (!content) {
    return null
  }

  const { hero, address, contact, data } = content

  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        <section
          aria-label={hero?.title || 'Kontakt z klubem MUKS Iskierka Tarnów'}
        >
          <div className={styles.header}>
            <h1 className={styles.title}>
              {hero?.title || 'Skontaktuj się z nami'}
            </h1>
            <p className={styles.subtitle}>
              {hero?.subtitle ||
                'Masz pytania? Chcesz dołączyć do naszego klubu? Skontaktuj się z nami!'}
            </p>
          </div>

          <div className={styles.contentGrid}>
            <article
              className={styles.contactCard}
              aria-labelledby='contact-address'
            >
              <div className={styles.iconWrapper}>
                <svg
                  className={styles.icon}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
                  <circle cx='12' cy='10' r='3' />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h2 id='contact-address' className={styles.cardTitle}>
                  {address?.title || 'Adres'}
                </h2>
                <p className={styles.cardSubtitle}>
                  {address?.subtitle || 'Nasza siedziba'}
                </p>
                <div className={styles.infoGroup}>
                  {(address?.lines || []).map((line, index) => (
                    <p key={index} className={styles.infoText}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </article>

            <article
              className={styles.contactCard}
              aria-labelledby='contact-info'
            >
              <div className={styles.iconWrapper}>
                <svg
                  className={styles.icon}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h2 id='contact-info' className={styles.cardTitle}>
                  {contact?.title || 'Kontakt'}
                </h2>
                <p className={styles.cardSubtitle}>
                  {contact?.subtitle || 'Zadzwoń lub napisz'}
                </p>
                <div className={styles.infoGroup}>
                  <div className={styles.contactItem}>
                    <span className={styles.label}>Telefon</span>
                    <a
                      href={contact?.phoneHref || 'tel:+48605721423'}
                      className={styles.link}
                    >
                      {contact?.phone || '605 721 423'}
                    </a>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.label}>
                      <svg
                        className={styles.smallIcon}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'
                      >
                        <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                        <polyline points='22,6 12,13 2,6' />
                      </svg>
                      Email
                    </span>
                    <a
                      href={contact?.emailHref || 'mailto:andlos@tlen.pl'}
                      className={styles.link}
                    >
                      {contact?.email || 'andlos@tlen.pl'}
                    </a>
                  </div>
                </div>
              </div>
            </article>

            <article
              className={styles.contactCard}
              aria-labelledby='contact-data'
            >
              <div className={styles.iconWrapper}>
                <svg
                  className={styles.icon}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                  <polyline points='14,2 14,8 20,8' />
                  <line x1='16' y1='13' x2='8' y2='13' />
                  <line x1='16' y1='17' x2='8' y2='17' />
                  <polyline points='10,9 9,9 8,9' />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h2 id='contact-data' className={styles.cardTitle}>
                  {data?.title || 'Dane'}
                </h2>
                <p className={styles.cardSubtitle}>
                  {data?.subtitle || 'Informacje organizacyjne'}
                </p>
                <div className={styles.infoGroup}>
                  <div className={styles.dataItem}>
                    <span className={styles.label}>NIP</span>
                    <span className={styles.value}>
                      {data?.nip || '873-26-11-598'}
                    </span>
                  </div>
                  <div className={styles.dataItem}>
                    <span className={styles.label}>REGON</span>
                    <span className={styles.value}>
                      {data?.regon || '850509910'}
                    </span>
                  </div>
                  <div className={styles.dataItem}>
                    <span className={styles.label}>
                      <svg
                        className={styles.smallIcon}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'
                      >
                        <rect
                          x='1'
                          y='4'
                          width='22'
                          height='16'
                          rx='2'
                          ry='2'
                        />
                        <line x1='1' y1='10' x2='23' y2='10' />
                      </svg>
                      Konto bankowe
                    </span>
                    <span className={styles.value}>
                      {data?.bank || '96 1160 2202 0000 0000 2839 6311'}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Contact
