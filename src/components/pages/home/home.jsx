import React from 'react'
import { useSchedule } from '../../../hooks/useSchedule'
import styles from './home.module.scss'

const Home = () => {
  const { schedule, loading, error } = useSchedule()

  if (loading) {
    return <div>Ładowanie terminarz...</div>
  }

  if (error) {
    return <div>Błąd: {error}</div>
  }
  //eslint-disable-next-line no-console
  console.log('Pobrany terminarz:', schedule)

  return (
    <div>
      <h1 className={styles.heading_text}>Home - MUKS Iskierka Tarnów</h1>
      <p className='font-size-3xl'>Strona główna działa!</p>
    </div>
  )
}

export default Home
