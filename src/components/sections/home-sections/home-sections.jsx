import React from 'react'
import ContentSection from '../content-section/content-section'
import { HOME_SECTIONS } from '../../../constants/content'
import styles from './home-sections.module.scss'

const HomeSections = () => {
  return (
    <div className={styles.homeSections}>
      {HOME_SECTIONS.map((section, index) => {
        const imagePosition = index % 2 === 0 ? 'right' : 'left'

        return (
          <ContentSection
            key={section.id}
            buttonLink={section.buttonLink}
            buttonText={section.buttonText}
            content={section.content}
            id={section.id}
            imageAlt={section.imageAlt}
            imagePosition={imagePosition}
            imageUrl={section.imageUrl}
            subtitle={section.subtitle}
            title={section.title}
          />
        )
      })}
    </div>
  )
}

export default HomeSections
