# Portfolio Feature

This directory contains the portfolio page components that display full-width video thumbnails similar to the reference design.

## Components

### PortfolioVideoThumbnail.vue
A full-width video thumbnail component specifically designed for the portfolio page. Features:

- Full-width layout with responsive height (60vh on desktop, 50vh on tablet, 40vh on mobile)
- Text overlay with title and subtitle positioned at bottom-left
- Hover effects with play button overlay
- Accessibility features (keyboard navigation, ARIA labels)
- Responsive design with mobile optimizations
- Reduced motion support for accessibility

## Features

### Design
- **Full-width thumbnails**: Videos span the entire content width
- **Text overlay**: Title and subtitle overlaid on thumbnail with gradient background
- **Minimalist design**: Clean, modern aesthetic with focus on content
- **Responsive**: Optimized for desktop, tablet, and mobile devices

### Functionality
- **YouTube integration**: Supports YouTube video links
- **Modal player**: Videos open in a modal overlay using existing VideoPlayer component
- **Aspect ratio detection**: Modal automatically adjusts to video dimensions (horizontal, vertical, square)
- **Navigation**: Integrated with existing navigation system
- **Internationalization**: Supports both English and German languages

### Accessibility
- **Keyboard navigation**: Full keyboard support for video selection
- **Screen reader support**: Proper ARIA labels and semantic HTML
- **Focus management**: Clear focus indicators
- **Reduced motion**: Respects user's motion preferences

## Usage

The portfolio page is accessible via:
- Navigation menu: "Portfolio" link
- Direct URL: `/portfolio`

## Data Structure

Portfolio videos are defined in `src/data/portfolioVideos.ts` with the following structure:

```typescript
interface Video {
  id: string
  title: string
  description: string
  duration: string
  videoType: 'youtube' | 'vimeo' | 'hosted' | 'placeholder'
  videoId?: string
  videoUrl?: string
  posterImage: string
  startTime?: number
  requireConsent?: boolean
  aspectRatio?: 'horizontal' | 'vertical' | 'square'
}
```

### Aspect Ratio Support

The portfolio supports three video aspect ratios:

- **Horizontal** (`horizontal`): Traditional landscape videos (16:9, 4:3, etc.)
- **Vertical** (`vertical`): Portrait videos (9:16, 4:5, etc.) - perfect for mobile-first content
- **Square** (`square`): Square videos (1:1, etc.)

The modal automatically adjusts its dimensions based on the video's aspect ratio to provide optimal viewing experience.

## Customization

### Adding New Videos
1. Add video data to `src/data/portfolioVideos.ts`
2. Set the `aspectRatio` property based on your video's dimensions:
   - `'horizontal'` for landscape videos (16:9, 4:3, etc.)
   - `'vertical'` for portrait videos (9:16, 4:5, etc.)
   - `'square'` for square videos (1:1, etc.)
3. Add corresponding thumbnail image to `public/images/portfolio/`
4. Update YouTube video IDs with actual video URLs

### Styling
- Modify `PortfolioVideoThumbnail.vue` styles for visual changes
- Update `PortfolioView.vue` for layout modifications
- Adjust responsive breakpoints as needed

### Thumbnail Images
- Recommended size: 1920x1080px (16:9 aspect ratio)
- Format: JPG or PNG
- Location: `public/images/portfolio/`
- Naming convention: `{video-name}-thumbnail.jpg`

## Dependencies

- Uses existing `VideoPlayer.vue` component for video playback
- Integrates with existing navigation and theme system
- Leverages existing video management composables
- Uses Naive UI components for modal and icons 