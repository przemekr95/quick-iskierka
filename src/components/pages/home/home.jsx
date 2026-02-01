import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HERO_IMAGE } from '../../../constants/images'
import { SPONSORS_DATA } from '../../../constants/sponsors'
import HeroSection from '../../atomic/hero-section/hero-section'
import HomeSections from '../../sections/home-sections/home-sections'
import SponsorsCarousel from '../../sections/sponsors-carousel/sponsors-carousel'
import styles from './home.module.scss'

const Home = () => {
  const navigate = useNavigate()

  const handleLearnMore = () => {
    navigate('/klub')
  }

  const handleViewTeam = () => {
    navigate('/druzyna')
  }

  return (
    <div className={styles.homePage}>
      <HeroSection
        backgroundImage={HERO_IMAGE}
        primaryButton={{
          text: 'Poznaj Klub',
          onClick: handleLearnMore,
        }}
        secondaryButton={{
          text: 'Zobacz Drużynę',
          onClick: handleViewTeam,
        }}
      />

      <HomeSections />

      <SponsorsCarousel sponsors={SPONSORS_DATA} />
    </div>
  )
}

export default Home
