# Portfolio SPA

This is a standalone Single Page Application (SPA) that contains only the portfolio and info views extracted from the main freelancer website.

## Features

- **Portfolio View**: Immersive video hero with portfolio gallery and scroll animations
- **Info View**: Information page with navigation
- **Responsive Design**: Optimized for all device sizes
- **Video Hero**: Interactive video background with responsive aspect ratios
- **Smooth Animations**: GSAP-powered scroll animations and transitions
- **Theme Support**: Light/dark theme switching
- **Internationalization**: Multi-language support (EN/DE)

## Tech Stack

- **Vue 3** with Composition API and TypeScript
- **Vite** for fast development and building
- **Vue Router** for navigation
- **Naive UI** for UI components
- **GSAP** for animations
- **SCSS** for styling

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Preview production build
npm run preview
```

## Project Structure

```
portfolio-spa/
├── src/
│   ├── components/
│   │   ├── portfolio/         # Portfolio-specific components
│   │   │   ├── hero/          # Video hero components
│   │   │   └── ...
│   │   ├── NavigationBar/     # Navigation components
│   │   ├── video/             # Video player components
│   │   └── shared/            # Shared utility components
│   ├── composables/           # Vue composables
│   ├── views/                 # Main view components
│   │   ├── PortfolioView.vue  # Main portfolio page
│   │   └── InfoView.vue       # Info page
│   ├── data/                  # Static data
│   ├── locales/              # Internationalization
│   ├── assets/               # Static assets
│   ├── styles/               # Global styles
│   └── types/                # TypeScript definitions
├── public/                    # Public assets
│   ├── videos/               # Video files
│   ├── images/               # Image assets
│   └── fonts/                # Font files
└── ...
```

## Routes

- `/` - Portfolio view (default)
- `/info` - Information page

## Deployment

The SPA can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

For Vercel deployment, the `vercel.json` configuration is already included.

## Video Assets

The portfolio uses responsive video backgrounds:
- Wide format (12:5 aspect ratio) for desktop
- Square format (1:1 aspect ratio) for mobile devices

Video files are located in `public/videos/`:
- `MBD_CLA_15sec_Design_Clean_Diverse_12x5_small.mp4` (desktop)
- `MBD_CLA_15sec_Design_Clean_Diverse_1x1_small.mp4` (mobile)

## Customization

### Portfolio Content
Edit `src/data/portfolioVideos.ts` to modify portfolio items.

### Styling
- Global styles: `src/assets/main.scss`
- Component-specific styles: Individual `.vue` files
- Utility classes: `src/styles/`

### Internationalization
Add or modify translations in `src/locales/en.json` and `src/locales/de.json`.

## Performance

The SPA is optimized for performance with:
- Code splitting
- Lazy loading of routes
- Optimized video assets
- Efficient animations with GSAP
- Tree-shaking for unused code 