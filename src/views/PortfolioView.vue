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
          :id="item.type === 'service' ? item.content.id : undefined"
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
              <div class="column" :data-xl-width="getColumnWidthHelper(item)">
                <div class="content-wrapper">
                  <!-- Video Content -->
                  <PortfolioVideoItem
                    v-if="item.type === 'video'"
                    :video="item.content as Video"
                    @video-play="handleVideoPlay"
                    @mouse-enter="handleMouseEnter"
                    @mouse-leave="handleMouseLeave"
                  />

                  <!-- Service Content -->
                  <PortfolioServiceItem
                    v-else-if="item.type === 'service'"
                    :service="item.content as Service"
                  />
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
    <PortfolioModal
      :show="showVideoPlayer"
      :selected-video="selectedVideo"
      :modal-class="videoAspectClass"
      :modal-styles="modalStyles"
      @update:show="showVideoPlayer = $event"
      @close="handleVideoClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { usePortfolioScroll } from '@/composables/usePortfolioScroll'
import { getColumnWidth } from '@/composables/usePortfolioHelpers'
import { usePortfolioEvents } from '@/composables/usePortfolioEvents'
import PortfolioNavigation from '@/components/portfolio/PortfolioNavigation.vue'
import PortfolioNavFooter from '@/components/portfolio/PortfolioNavFooter.vue'
import PortfolioVideoItem from '@/components/portfolio/PortfolioVideoItem.vue'
import PortfolioServiceItem from '@/components/portfolio/PortfolioServiceItem.vue'
import PortfolioModal from '@/components/portfolio/PortfolioModal.vue'
import VideoHero from '@/components/portfolio/hero/VideoHero.vue'
import PortfolioFooter from '@/components/portfolio/PortfolioFooter.vue'
import { portfolioContent } from '@/data/portfolioVideos'
import { useVideoAspectRatio } from '@/composables/useVideoAspectRatio'
import { useTheme } from '@/composables/useTheme'
import type { PortfolioItem, Video, Service } from '@/types/video'

// Register GSAP plugins
const { init: initScroll, destroy: destroyScroll } = usePortfolioScroll()

// Theme management
const { setTheme, currentTheme } = useTheme()
const previousTheme = ref<string>('')

// Reactive state
const showVideoPlayer = ref(false)
const selectedVideo = ref<Video | null>(null)

// Use extracted composables
const {
  handleVideoPlay,
  handleVideoClose,
  handleEscapeKey,
  handleMouseEnter,
  handleMouseLeave
} = usePortfolioEvents({ showVideoPlayer, selectedVideo })

// Helper function for column width
const getColumnWidthHelper = (item: PortfolioItem): number => {
  return getColumnWidth(item)
}



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

.portfolio-content {
  position: relative;
  z-index: 10;
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
  z-index: 10;
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
    pointer-events: auto;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}







// Portfolio Content
.portfolio-content {
  position: relative;
  z-index: 10;
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
  z-index: 10;
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
    pointer-events: auto;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// Mobile responsive
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
      max-width: calc(100vw - 2rem);
      flex: 0 0 88% !important;
    }

    .content-wrapper {
    pointer-events: auto;
      padding: 0;
      width: 100%;
    }
  }
}
</style>
