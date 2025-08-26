<template>
  <div class="column-content" data-module="image">
    <div class="ce-image" data-align="left">
      <div class="image-container">
        <img
          class="is-content"
          :src="video.posterImage"
          :alt="getAltText(video)"
          :aria-label="`Play video: ${video.title || 'Video'}`"
          role="button"
          tabindex="0"
          :srcset="getSrcSet(video)"
          :sizes="'(max-width: 768px) 88vw, 58vw'"
          loading="lazy"
          decoding="async"
          :width="getImageWidth(video)"
          :height="getImageHeight(video)"
          data-width="original"
          data-scaling="no"
          @click="handleVideoPlay"
          @keydown.enter.prevent="handleVideoPlay"
          @keydown.space.prevent="handleVideoPlay"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        />
        <!-- Title & Description Overlay -->
        <div
          class="image-caption"
          :class="`caption-${video.aspectRatio || 'horizontal'}`"
          aria-hidden="false"
        >
          <h3 class="video-title">{{ video.title }}</h3>
          <p class="video-description">{{ video.description }}</p>
        </div>
        <!-- Desktop Play Button Overlay -->
        <div class="desktop-play-button">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(0, 0, 0, 0.1)" stroke-width="2"/>
            <path d="M32 26L56 40L32 54V26Z" fill="rgba(0, 0, 0, 0.8)"/>
          </svg>
        </div>

        <!-- Mobile Play Button Overlay -->
        <div class="mobile-play-button">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="rgba(0, 0, 0, 0.7)"/>
            <path d="M25 20L40 30L25 40V20Z" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Video } from '@/types/video'

interface PortfolioVideoItemProps {
  video: Video
}

const props = defineProps<PortfolioVideoItemProps>()

const emit = defineEmits<{
  videoPlay: [video: Video]
  mouseEnter: []
  mouseLeave: []
}>()

// Helper functions
const getImageWidth = (video: Video): number => {
  return video.aspectRatio === 'vertical' ? 1440 : 2560
}

const getImageHeight = (video: Video): number => {
  return video.aspectRatio === 'vertical' ? 1920 : 1707
}

const getAltText = (video: Video): string => {
  return video.title ? `${video.title} – Preview image` : 'Portfolio video preview image'
}

const getSrcSet = (video: Video): string => {
  const base = video.posterImage.replace(/\.(png|jpg|jpeg)$/i, '')
  const widths = [480, 960, 1440, 1920]
  const webpCandidates = widths.map(w => `${base}-${w}.webp ${w}w`)
  const fallback = `${video.posterImage} ${getImageWidth(video)}w`
  return [...webpCandidates, fallback].join(', ')
}

// Event handlers
const handleVideoPlay = () => {
  emit('videoPlay', props.video)
}

const handleMouseEnter = () => {
  emit('mouseEnter')
}

const handleMouseLeave = () => {
  emit('mouseLeave')
}
</script>

<style scoped lang="scss">
.column-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .ce-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .image-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
      overflow: hidden; // Ensure caption doesn't overflow container

      // Scale the entire container on hover for perfect alignment
      @media (min-width: 769px) {
        &:hover {
          transform: scale(1.02);
        }
      }
    }

    img {
      width: auto;
      height: auto;
      max-width: 100%;
      object-fit: contain;
      object-position: center;
      cursor: pointer;
      transition: transform 0.3s ease, filter 0.3s ease;
      pointer-events: auto;

      // Show default cursor on mobile
      @media (max-width: 768px) {
        cursor: pointer;
      }
    }

    .image-caption {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      width: auto;
      max-width: 100%;
      color: #fff;
      pointer-events: none;
      z-index: 3;
      padding: 1rem clamp(0.75rem, 4%, 1.25rem);
      background: rgba(81, 81, 81, 0.8);
      backdrop-filter: blur(8px);
      opacity: 0;
      transform: translateY(100%);
      transition: opacity 300ms ease, transform 300ms ease;
      transform-origin: center center;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 1rem;
      box-sizing: border-box;

      // Default height (fallback)
      height: 25%;

      // Aspect ratio specific heights
      &.caption-horizontal {
        height: 30%; // Medium caption for landscape images
      }

      &.caption-vertical {
        height: 13%; // Smaller caption for portrait images
      }

      &.caption-square {
        height: 35%; // Larger caption for square images
      }

      .video-title {
        font-family: 'IvyOra', serif;
        font-size: clamp(0.95rem, 2vw, 1.15rem);
        font-weight: 400;
        letter-spacing: 0.01em;
        line-height: 1.25;
        margin: 0 0 0.15rem 0;
      }

      .video-description {
        font-family: 'IvyOra', serif;
        font-size: clamp(0.8rem, 1.4vw, 0.95rem);
        margin: 0;
        font-weight: 300;
        color: rgba(255,255,255,0.85);
      }

      @media (max-width: 768px) {
        padding: 0.75rem clamp(0.5rem, 3%, 1rem);

        // Mobile aspect ratio heights
        height: 30%; // Default
        &.caption-horizontal {
          height: 32%;
        }
        &.caption-vertical {
          height: 28%;
        }
        &.caption-square {
          height: 34%;
        }

        .video-description {
          display: none;
        }
      }
    }

    // Reveal on hover (desktop) or keyboard focus
    @media (hover: hover) and (pointer: fine) {
      .image-container:hover .image-caption {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .image-container:focus-within .image-caption {
      opacity: 1;
      transform: translateY(0);
    }

    .desktop-play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.4s ease, transform 0.4s ease;
      transform-origin: center center;
      z-index: 5;

      // Hide on mobile
      @media (max-width: 768px) {
        display: none;
      }

      svg {
        filter: drop-shadow(0 6px 20px rgba(0, 0, 0, 0.4));
        transition: transform 0.3s ease;
      }
    }

    // Show play button on desktop hover
    @media (min-width: 769px) {
      .image-container:hover .desktop-play-button {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }

    .mobile-play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;

      // Show on mobile only
      @media (max-width: 768px) {
        opacity: 1;
      }
    }

    // When hovering over this image, keep it normal
    &:hover {
      img {
        filter: grayscale(0) brightness(1);
      }
    }
  }
}

// Mobile responsive
@media (max-width: 768px) {
  .column-content {
    .ce-image {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: auto;
        height: auto;
        max-width: 100%;
        object-fit: contain;
        object-position: center;
      }
    }
  }
}

// Desktop hover effects only
@media (min-width: 769px) {
  // Grey out all images by default when any image is hovered
  .portfolio:has(.ce-image img:hover) .content-block .ce-image img {
    filter: grayscale(1) brightness(0.6);
  }

  // Keep the hovered image normal
  .portfolio:has(.ce-image img:hover) .ce-image img:hover {
    filter: grayscale(0) brightness(1);
  }
}
</style>
