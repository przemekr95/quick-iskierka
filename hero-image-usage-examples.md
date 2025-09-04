// Przykład użycia zoptymalizowanych zdjęć

// 1. W React komponencie z responsive image:
const HeroImage = () => (
  <picture>
    <source 
      media="(max-width: 480px)" 
      srcSet="/images/backgrounds/heroImage-mobile.jpg"
    />
    <source 
      media="(max-width: 768px)" 
      srcSet="/images/backgrounds/heroImage-tablet.jpg"
    />
    <img 
      src="/images/backgrounds/heroImage-desktop.jpg"
      alt="Hero image"
      loading="lazy"
      style={{ width: '100%', height: 'auto' }}
    />
  </picture>
);

// 2. W CSS jako background:
.hero {
  background-image: url('/images/backgrounds/heroImage-mobile.jpg');
  background-size: cover;
  background-position: center;
  
  @media (min-width: 481px) {
    background-image: url('/images/backgrounds/heroImage-tablet.jpg');
  }
  
  @media (min-width: 769px) {
    background-image: url('/images/backgrounds/heroImage-desktop.jpg');
  }
}

// 3. W SCSS z mixinami:
@mixin hero-background {
  background-image: url('/images/backgrounds/heroImage-mobile.jpg');
  
  @media (min-width: 481px) {
    background-image: url('/images/backgrounds/heroImage-tablet.jpg');
  }
  
  @media (min-width: 769px) {
    background-image: url('/images/backgrounds/heroImage-desktop.jpg');
  }
}
