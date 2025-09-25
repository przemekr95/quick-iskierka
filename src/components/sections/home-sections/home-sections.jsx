import React from 'react'
import ContentSection from '../content-section/content-section'
import { HOME_SECTIONS } from '../../../constants/content'
import { HERO_IMAGE } from '../../../constants/images'
import styles from './home-sections.module.scss'

// TODO

const HomeSections = () => {
  return (
    <div className={styles.homeSections}>
      {HOME_SECTIONS.map((section, index) => {
        // Określ pozycję obrazu: prawo, lewo, prawo
        const imagePosition = index % 2 === 0 ? 'right' : 'left'

        return (
          <ContentSection
            key={section.id}
            id={section.id}
            title={section.title}
            subtitle={section.subtitle}
            content={section.content}
            buttonText={section.buttonText}
            buttonLink={section.buttonLink}
            imageUrl={HERO_IMAGE}
            imageAlt={section.imageAlt}
            imagePosition={imagePosition}
          />
        )
      })}
    </div>
  )
}

export default HomeSections
