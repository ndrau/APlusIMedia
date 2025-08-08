<template>
  <div class="portfolio">
    <!-- Portfolio Navigation -->
    <PortfolioNavigation class="entrance-animation" />

    <!-- Portfolio Navigation Footer -->
    <PortfolioNavFooter />

    <!-- Hero Section -->
    <VideoHero />

    <!-- Portfolio Videos Container -->
    <main id="portfolio-content" class="portfolio-content">
      <div class="videos-stack">
        <section 
          v-for="(video, index) in portfolioVideos" 
          :key="video.id"
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
              <div class="column" :data-xl-width="getColumnWidth(video)">
                <div class="content-wrapper">
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
                          loading="lazy"
                          decoding="async"
                          :width="getImageWidth(video)"
                          :height="getImageHeight(video)"
                          data-width="original" 
                          data-scaling="no"
                          @click="handleVideoPlay(video)"
                           @keydown.enter.prevent="handleVideoPlay(video)"
                           @keydown.space.prevent="handleVideoPlay(video)"
                          @mouseenter="handleMouseEnter"
                          @mouseleave="handleMouseLeave"
                        />
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Portfolio Footer -->
    <PortfolioFooter />

    <!-- Custom Cursor -->
    <div 
      v-show="showCustomCursor" 
      class="custom-cursor"
      :style="cursorStyle"
    >
      Play
    </div>

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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import VideoPlayer from '@/components/video/VideoPlayer.vue'
import PortfolioFooter from '@/components/portfolio/PortfolioFooter.vue'
import PortfolioNavigation from '@/components/portfolio/PortfolioNavigation.vue'
import PortfolioNavFooter from '@/components/portfolio/PortfolioNavFooter.vue'
import VideoHero from '@/components/portfolio/hero/VideoHero.vue'
import { portfolioVideos } from '@/data/portfolioVideos'
import { useVideoAspectRatio } from '@/composables/useVideoAspectRatio'
import { useTheme } from '@/composables/useTheme'
import type { Video } from '@/types/video'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Theme management
const { setTheme, currentTheme } = useTheme()
const previousTheme = ref<string>('')

// Reactive state
const showVideoPlayer = ref(false)
const selectedVideo = ref<Video | null>(null)
const videoModal = ref<any>(null)

// Custom cursor state
const showCustomCursor = ref(false)
const cursorStyle = ref({
  left: '0px',
  top: '0px'
})

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
const getColumnWidth = (video: Video): number => {
  // Return 7 for horizontal videos, 5 for vertical videos
  return video.aspectRatio === 'vertical' ? 5 : 7
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

// Custom cursor methods
let rafPending = false
let lastMouseX = 0
let lastMouseY = 0

const updateCursor = () => {
  cursorStyle.value = {
    left: `${lastMouseX}px`,
    top: `${lastMouseY}px`
  }
  rafPending = false
}

const handleMouseMove = (event: MouseEvent) => {
  lastMouseX = event.clientX
  lastMouseY = event.clientY
  if (!rafPending) {
    rafPending = true
    requestAnimationFrame(updateCursor)
  }
}

const handleMouseEnter = () => {
  showCustomCursor.value = true
}

const handleMouseLeave = () => {
  showCustomCursor.value = false
}

// GSAP ScrollTrigger setup
const setupScrollTrigger = () => {
  // Setup hero section animation
  const heroSection = document.querySelector('.hero-section') as Element
  if (heroSection) {
    // Calculate total scroll distance based on number of portfolio items
    const totalScrollDistance = `+=${300 + (portfolioVideos.length * 300)}%`
    
    gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: totalScrollDistance,
        pin: true,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 0.2
      }
    })
    .to(heroSection, { 
      scale: 0.15, 
      duration: 3
    })
    .to(heroSection, { 
      scale: 0.15, 
      duration: portfolioVideos.length * 2 // Continue scaling down as more items are added
    }, 3)
    .to(heroSection, {
      zIndex: 100, // Lowest z-index - behind all portfolio items
      duration: 0
    }, 0)
  }

  // Apply the exact same logic as the reference website for portfolio items
  const elements = gsap.utils.toArray('.scroll-away') as Element[]
  elements.forEach((element, index) => {
    // Calculate start trigger based on index
    // First item starts when hero is halfway through (150% scroll)
    const startTrigger = index === 0 ? "top-=150% top" : "top top"
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: startTrigger,
        end: "+=300%",
        pin: true,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 0.2
      }
    })
    .to(element, { 
      scale: 0.75, 
      duration: 3
    })
    .to(element, { 
      opacity: 0, 
      duration: 1
    }, "-=1")
    .to(element, {
      zIndex: 1000 - index, // Higher z-index than hero (which is 100)
      duration: 0
    }, 0)
    .to(element, {
      pointerEvents: "none", // Disable pointer events on container when overlaying
      duration: 0
    }, 0)
    .to(element, {
      pointerEvents: "auto", // Re-enable pointer events when active
      duration: 0
    }, 1) // Re-enable when opacity is still high
  })
}

// Lifecycle
onMounted(() => {
  // Store current theme and set to light
  previousTheme.value = currentTheme.value
  setTheme('light')
  
  document.addEventListener('keydown', handleEscapeKey)
  document.addEventListener('mousemove', handleMouseMove)
  
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
  document.removeEventListener('mousemove', handleMouseMove)
  
  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
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

// Custom Cursor
.custom-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  font-family: 'IvyOra', serif;
  font-size: 3rem;
  font-weight: 300;
  color: #ffffff;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s ease;
  
  // Hide on mobile devices
  @media (max-width: 768px) {
    display: none;
  }
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
      }
      
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        object-fit: contain;
        object-position: center;
        cursor: none; /* Hide default cursor on desktop */
        transition: transform 0.3s ease, filter 0.3s ease;
        pointer-events: auto; /* Always enable pointer events on images */
        
        &:hover {
          transform: scale(1.02);
        }
        
        // Show default cursor on mobile
        @media (max-width: 768px) {
          cursor: pointer;
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