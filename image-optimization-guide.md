# Optymalizacja heroImage.jpg

## Obecne parametry:
- Rozmiar: 1339x893px
- Wielkość: 141KB
- Format: JPEG (progressive)

## Rekomendowane usprawnienia:

### 1. Zwiększ rozdzielczość do Full HD:
```bash
# Skalowanie do 1920x1080 (zachowując proporcje)
ffmpeg -i heroImage.jpg -vf scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080 heroImage-desktop.jpg
```

### 2. Stwórz wersje responsive:
```bash
# Mobile (400x600)
ffmpeg -i heroImage.jpg -vf scale=400:600:force_original_aspect_ratio=increase,crop=400:600 heroImage-mobile.jpg

# Tablet (768x432)
ffmpeg -i heroImage.jpg -vf scale=768:432:force_original_aspect_ratio=increase,crop=768:432 heroImage-tablet.jpg

# Desktop (1920x1080)
ffmpeg -i heroImage.jpg -vf scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080 heroImage-desktop.jpg
```

### 3. Optymalizacja jakości:
```bash
# Kompresja z zachowaniem jakości
ffmpeg -i heroImage.jpg -q:v 85 heroImage-optimized.jpg
```

### 4. Konwersja do WebP (nowoczesny format):
```bash
# WebP - lepsze kompresja
ffmpeg -i heroImage.jpg heroImage.webp
```

## Użycie w kodzie:

### HTML z responsive images:
```html
<picture>
  <source media="(max-width: 480px)" srcset="/images/backgrounds/heroImage-mobile.webp" type="image/webp">
  <source media="(max-width: 480px)" srcset="/images/backgrounds/heroImage-mobile.jpg">
  <source media="(max-width: 768px)" srcset="/images/backgrounds/heroImage-tablet.webp" type="image/webp">
  <source media="(max-width: 768px)" srcset="/images/backgrounds/heroImage-tablet.jpg">
  <source srcset="/images/backgrounds/heroImage-desktop.webp" type="image/webp">
  <img src="/images/backgrounds/heroImage-desktop.jpg" alt="Hero image" loading="lazy">
</picture>
```

### CSS z responsive backgrounds:
```scss
.hero {
  background-image: url('/images/backgrounds/heroImage-mobile.jpg');
  
  @media (min-width: 768px) {
    background-image: url('/images/backgrounds/heroImage-tablet.jpg');
  }
  
  @media (min-width: 1200px) {
    background-image: url('/images/backgrounds/heroImage-desktop.jpg');
  }
}

// WebP support
.webp .hero {
  background-image: url('/images/backgrounds/heroImage-mobile.webp');
  
  @media (min-width: 768px) {
    background-image: url('/images/backgrounds/heroImage-tablet.webp');
  }
  
  @media (min-width: 1200px) {
    background-image: url('/images/backgrounds/heroImage-desktop.webp');
  }
}
```
