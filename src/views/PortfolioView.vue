<template>
  <div class="portfolio">
    <!-- Portfolio Navigation -->
    <PortfolioNavigation class="entrance-animation" />

    <!-- Portfolio Navigation Footer -->
    <PortfolioNavFooter />

    <!-- Hero Section -->
    <VideoHero />

        <!-- Portfolio Content Container -->
    <main id="portfolio-content" class="portfolio-content">
      <div class="videos-stack">
        <section
          v-for="(item, index) in portfolioContent"
          :key="item.id"
          class="content-block scroll-away"
          :data-height="'fullscreen'"
          :data-justify="'center'"
          :data-valign="'center'"
          :data-layout="'grid'"
          :data-force-fullscreen="'true'"
          :data-gutter="'yes'"
        >
          <div class="container">
            <div class="row">
              <div class="column" :data-xl-width="getColumnWidth(item)">
                <div class="content-wrapper">
                  <!-- Video Content -->
                  <div v-if="item.type === 'video'" class="column-content" data-module="image">
                    <div class="ce-image" data-align="left">
                      <div class="image-container">
                        <img
                          class="is-content"
                          :src="(item.content as Video).posterImage"
                          :alt="getAltText(item.content as Video)"
                          :aria-label="`Play video: ${(item.content as Video).title || 'Video'}`"
                          role="button"
                          tabindex="0"
                          :srcset="getSrcSet(item.content as Video)"
                          :sizes="'(max-width: 768px) 88vw, 58vw'"
                          loading="lazy"
                          decoding="async"
                          :width="getImageWidth(item.content as Video)"
                          :height="getImageHeight(item.content as Video)"
                          data-width="original"
                          data-scaling="no"
                          @click="handleVideoPlay(item.content as Video)"
                          @keydown.enter.prevent="handleVideoPlay(item.content as Video)"
                          @keydown.space.prevent="handleVideoPlay(item.content as Video)"
                          @mouseenter="handleMouseEnter"
                          @mouseleave="handleMouseLeave"
                        />
                        <!-- Title & Description Overlay -->
                        <div
                          class="image-caption"
                          :class="`caption-${(item.content as Video).aspectRatio || 'horizontal'}`"
                          aria-hidden="false"
                        >
                          <h3 class="video-title">{{ (item.content as Video).title }}</h3>
                          <p class="video-description">{{ (item.content as Video).description }}</p>
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

                  <!-- Service Content -->
                  <div v-else-if="item.type === 'service'" class="column-content" data-module="service">
                    <ServiceCard :service="item.content as Service" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Portfolio Footer -->
    <PortfolioFooter />



    <!-- Video Player Modal -->
    <n-modal
      ref="videoModal"
      v-model:show="showVideoPlayer"
      :mask-closable="true"
      :closable="false"
      preset="card"
      :class="['video-modal', videoAspectClass]"
      :style="modalStyles"
    >
      <VideoPlayer
        v-if="selectedVideo"
        :video-type="selectedVideo.videoType"
        :video-id="selectedVideo.videoId"
        :video-url="selectedVideo.videoUrl"
        :poster-image="selectedVideo.posterImage"
        :start-time="selectedVideo.startTime"
        :require-consent="selectedVideo.requireConsent"
        @close="handleVideoClose"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { NModal } from 'naive-ui'
import { usePortfolioScroll } from '@/composables/usePortfolioScroll'
import VideoPlayer from '@/components/video/VideoPlayer.vue'
import PortfolioFooter from '@/components/portfolio/PortfolioFooter.vue'
import PortfolioNavigation from '@/components/portfolio/PortfolioNavigation.vue'
import PortfolioNavFooter from '@/components/portfolio/PortfolioNavFooter.vue'
import VideoHero from '@/components/portfolio/hero/VideoHero.vue'
import { portfolioContent } from '@/data/portfolioVideos'
import { useVideoAspectRatio } from '@/composables/useVideoAspectRatio'
import { useTheme } from '@/composables/useTheme'
import ServiceCard from '@/components/portfolio/ServiceCard.vue'
import type { PortfolioItem, Video, Service } from '@/types/video'

// Register GSAP plugins
const { init: initScroll, destroy: destroyScroll } = usePortfolioScroll()

// Theme management
const { setTheme, currentTheme } = useTheme()
const previousTheme = ref<string>('')

// Reactive state
const showVideoPlayer = ref(false)
const selectedVideo = ref<Video | null>(null)
const videoModal = ref<any>(null)



// Video aspect ratio handling
const { getAspectRatioClass, getModalDimensions } = useVideoAspectRatio()

// Video aspect ratio detection
const videoAspectClass = computed(() => {
  if (!selectedVideo.value) return 'video-horizontal'
  return getAspectRatioClass(selectedVideo.value)
})

// Modal styles based on aspect ratio
const modalStyles = computed(() => {
  if (!selectedVideo.value) {
    return getModalDimensions('horizontal')
  }
  
  const aspectRatio = selectedVideo.value.aspectRatio || 'horizontal'
  const dimensions = getModalDimensions(aspectRatio)
  
  return dimensions
})

// Helper functions for column and image sizing
const getColumnWidth = (item: PortfolioItem): number => {
  if (item.type === 'video') {
    const video = item.content as Video
    // Return 7 for horizontal videos, 5 for vertical videos
    return video.aspectRatio === 'vertical' ? 5 : 7
  } else if (item.type === 'service') {
    const service = item.content as Service
    // Return 7 for horizontal services, 5 for vertical services
    return service.aspectRatio === 'vertical' ? 5 : 7
  }
  // Default fallback
  return 7
}

const getImageWidth = (video: Video): number => {
  // Return appropriate width based on aspect ratio
  return video.aspectRatio === 'vertical' ? 1440 : 2560
}

const getImageHeight = (video: Video): number => {
  // Return appropriate height based on aspect ratio
  return video.aspectRatio === 'vertical' ? 1920 : 1707
}

const getAltText = (video: Video): string => {
  return video.title ? `${video.title} – Preview image` : 'Portfolio video preview image'
}

// Build a srcset for responsive WebP if variants exist; fall back to original.
const getSrcSet = (video: Video): string => {
  const base = video.posterImage.replace(/\.(png|jpg|jpeg)$/i, '')
  const widths = [480, 960, 1440, 1920]
  // Prefer webp variants generated by script, but include original as last resort
  const webpCandidates = widths.map(w => `${base}-${w}.webp ${w}w`)
  const fallback = `${video.posterImage} ${getImageWidth(video)}w`
  return [...webpCandidates, fallback].join(', ')
}

// Event handlers
const handleVideoPlay = (video: Video) => {
  selectedVideo.value = video
  showVideoPlayer.value = true
}

const handleVideoClose = () => {
  showVideoPlayer.value = false
  selectedVideo.value = null
}

// Handle escape key to close video modal
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showVideoPlayer.value) {
    handleVideoClose()
  }
}

// Mouse event handlers for normal cursor behavior
const handleMouseEnter = () => {
  // Normal cursor behavior - no special effects needed
}

const handleMouseLeave = () => {
  // Normal cursor behavior - no special effects needed
}

// GSAP ScrollTrigger setup
const setupScrollTrigger = () => {
  initScroll()
}

// Lifecycle
onMounted(() => {
  // Store current theme and set to light
  previousTheme.value = currentTheme.value
  setTheme('light')
  
  document.addEventListener('keydown', handleEscapeKey)
  
  // Setup GSAP ScrollTrigger after DOM is ready
  nextTick(() => {
    setupScrollTrigger()
  })
})

onUnmounted(() => {
  // Restore previous theme
  if (previousTheme.value) {
    setTheme(previousTheme.value as 'light' | 'dark')
  }
  
  document.removeEventListener('keydown', handleEscapeKey)
  
  // Kill all ScrollTriggers
  destroyScroll()
})
</script>

<style scoped lang="scss">
.portfolio {
  min-height: 100vh;
  min-width: 320px;
  background: var(--base-color);
  color: var(--text-color);
  position: relative;
  font-family: 'IvyOra', serif;
}

// Entrance Animation
@keyframes entranceEaseIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.entrance-animation {
  animation: entranceEaseIn 0.8s ease-out forwards;
}







// Portfolio Content
.portfolio-content {
  position: relative;
  z-index: 1;
}

.videos-stack {
  position: relative;
  width: 100%;
}

:global(.pin-spacer) {
  pointer-events: none !important;
}

// Content block styles (matching the reference website)
.content-block {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;

  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .row {
    display: flex;
    margin: 0 -1rem;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .column {
    padding: 0 1rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &[data-xl-width="5"] {
      flex: 0 0 41.666667%;
    }
    
    &[data-xl-width="7"] {
      flex: 0 0 58.333333%;
    }
  }
  
  .content-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
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
        cursor: pointer; /* Use pointer cursor on desktop */
        transition: transform 0.3s ease, filter 0.3s ease;
        pointer-events: auto; /* Always enable pointer events on images */
        

        
        // Show default cursor on mobile
        @media (max-width: 768px) {
          cursor: pointer;
        }
      }

      .image-caption {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        color: #fff;
        pointer-events: none; // allow clicks to pass through to image
        z-index: 3;
        padding: 1rem 1.5rem;
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
          padding: 1rem 1rem 0.75rem 1rem;

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
        z-index: 5; // Increased z-index to ensure it's visible

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

// Video Modal Styles
.video-modal {
  background: transparent;
  border: none;
  box-shadow: none;

  :deep(.n-card__content) {
    padding: 0;
    height: 100%;
  }

  :deep(.n-card) {
    background: transparent;
    border: none;
    box-shadow: none;
  }
}

// Horizontal videos (16:9, 4:3, etc.)
.video-modal.video-horizontal {
  width: 90vw;
  max-width: 1200px;
  height: 80vh;
  max-height: 675px;
}

// Vertical videos (9:16, 4:5, etc.)
.video-modal.video-vertical {
  width: 90vw;
  max-width: 405px;
  height: 80vh;
  max-height: 720px;
}

// Square videos (1:1, etc.)
.video-modal.video-square {
  width: 90vw;
  max-width: 600px;
  height: 80vh;
  max-height: 600px;
}



// Mobile Styles
@media (max-width: 768px) {

  
  .content-block {
    .container {
      padding: 0;
      width: 100vw;
      max-width: none;
    }
    
    .row {
      margin: 0;
      width: 100%;
      justify-content: center;
      max-width: none;
    }
    
    .column {
      padding: 0;
      width: 100%;
      max-width: calc(100vw - 2rem); /* Adjusted for wider thumbnails on mobile */
      flex: 0 0 88% !important; /* Override the data-xl-width flex values */
    }
    
    .content-wrapper {
      padding: 0;
      width: 100%;
    }
    
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
  

  
  .video-modal.video-horizontal {
    width: 95vw;
    height: calc(95vw * 9 / 16);
    max-width: none;
    max-height: 70vh;
  }

  .video-modal.video-vertical {
    width: calc(70vh * 9 / 16);
    height: 70vh;
    max-width: 95vw;
    max-height: none;
  }

  .video-modal.video-square {
    width: 70vh;
    height: 70vh;
    max-width: 95vw;
    max-height: none;
  }
}
</style> 