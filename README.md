# MUKS Iskierka Tarnów — Official Club Website

Modern, responsive website for the MUKS Iskierka Tarnów volleyball club built with React.

## Tech Stack

- React 18 + React Router
- SCSS modules + design tokens (@przemekr95/quick-design-tokens)
- ESLint + Prettier

## Requirements

- Node.js 18+ (LTS recommended)
- npm 9+

## Environment

If you need runtime configuration, copy env.example to .env and fill in the values.

## Scripts

- npm start — start development server
- npm run build — create production build in build
- npm run lint — run ESLint
- npm run format — format with Prettier
- npm run analyze — build and serve build locally

## Content Management

Static content is stored in JSON files under public:

- public/club-content.json — club page content
- public/team-content.json — team page content
- public/contact-content.json — contact page content

## SEO & Metadata

Page titles are generated dynamically from routes. Global metadata can be adjusted in public/index.html.

## Deployment

1. Update homepage in package.json to match the target domain.
2. Run npm run build.
3. Upload the build directory to your hosting provider.

### Recommended Hosting

- Static hosting (Netlify, Vercel, Cloudflare Pages)
- Classic FTP hosting (upload build as root)

## Quality & Formatting

- ESLint config: .eslintrc.json
- Prettier config: .prettierrc

## License

MIT
