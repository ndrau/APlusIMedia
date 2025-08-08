<template>
  <div class="portfolio">
    <!-- Portfolio Navigation -->
    <PortfolioNavigation class="entrance-animation" />

    <!-- Portfolio Navigation Footer -->
    <PortfolioNavFooter />

    <!-- Hero Section -->
    <VideoHero />

    <!-- Portfolio Videos Container: Mosaic grid that the hero shrinks into -->
    <main id="portfolio-content" class="portfolio-content">
      <div ref="gridRef" class="mosaic-grid">
        <template v-for="(item, idx) in gridItems" :key="item.key">
          <div
            v-if="item.kind === 'video'"
            class="grid-item"
            :class="item.video.aspectRatio === 'vertical' ? 'is-vertical' : 'is-horizontal'"
          >
            <div class="tile-content">
              <img
                class="tile-image"
                :src="item.video.posterImage"
                :alt="item.video.title"
                loading="lazy"
                decoding="async"
                draggable="false"
                @load="onTileImageLoad"
                @click="handleVideoPlay(item.video)"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
              />
            </div>
          </div>
          <div
            v-else
            class="grid-item hero-slot"
            ref="heroSlotRef"
          >
            <div class="tile-content hero-slot-placeholder" />
          </div>
        </template>
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
const gridRef = ref<HTMLElement | null>(null)
const heroSlotRef = ref<HTMLElement | null>(null)

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
  return video.aspectRatio === 'vertical' ? 5 : 7
}

const getImageWidth = (video: Video): number => {
  return video.aspectRatio === 'vertical' ? 1440 : 2560
}

const getImageHeight = (video: Video): number => {
  return video.aspectRatio === 'vertical' ? 1920 : 1707
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
const handleMouseMove = (event: MouseEvent) => {
  cursorStyle.value = {
    left: `${event.clientX}px`,
    top: `${event.clientY}px`
  }
}

const handleMouseEnter = () => {
  showCustomCursor.value = true
}

const handleMouseLeave = () => {
  showCustomCursor.value = false
}

// Build grid items: interleave hero-slot near the top like Sora
type GridItem = { kind: 'video'; key: string; video: Video } | { kind: 'hero'; key: string }
const gridItems = computed<GridItem[]>(() => {
  const items: GridItem[] = []
  portfolioVideos.forEach((v, i) => {
    if (i === 1) items.push({ kind: 'hero', key: 'hero-slot' })
    items.push({ kind: 'video', key: `v-${v.id}`, video: v })
  })
  return items
})

// Masonry sizing: compute row spans based on content height
const recalcMasonry = () => {
  const grid = gridRef.value
  if (!grid) return
  const gap = parseFloat(getComputedStyle(grid).getPropertyValue('--gap')) || 16
  const rowHeight = 10

  const items = Array.from(grid.children) as HTMLElement[]
  items.forEach((item) => {
    const content = item.querySelector('.tile-content') as HTMLElement | null
    if (!content) return
    content.style.gridRowEnd = ''
    const height = content.getBoundingClientRect().height
    const span = Math.ceil((height + gap) / (rowHeight + gap))
    ;(item.style as any).gridRowEnd = `span ${span}`
  })
}

const onTileImageLoad = () => {
  recalcMasonry()
}

// GSAP ScrollTrigger + FLIP-style transform of hero into grid slot
const setupScrollTrigger = () => {
    const heroSection = document.querySelector('.hero-section') as HTMLElement | null
    const grid = gridRef.value

    if (!heroSection || !grid) return

    const slotEl = heroSlotRef.value

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        endTrigger: slotEl || undefined,
        end: 'center center',
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 0.25,
        invalidateOnRefresh: true
      }
    })

    tl.set(heroSection, { zIndex: 2000, transformOrigin: '50% 50%' }, 0)
      .to(heroSection, {
        scale: () => {
          const sb = slotEl!.getBoundingClientRect()
          const hb = heroSection.getBoundingClientRect()
          return sb.width / hb.width
        }
      })
      .to(heroSection, { autoAlpha: 0, pointerEvents: 'none', zIndex: 2, duration: 0.01 })
}

// Lifecycle
onMounted(() => {
  previousTheme.value = currentTheme.value
  setTheme('light')
  document.addEventListener('keydown', handleEscapeKey)
  document.addEventListener('mousemove', handleMouseMove)
  nextTick(() => {
    setupScrollTrigger()
    recalcMasonry()
    ScrollTrigger.refresh()
  })

  const resizeHandler = () => {
    recalcMasonry()
    ScrollTrigger.refresh()
  }
  ScrollTrigger.addEventListener('refreshInit', () => {
    heroSlotRef.value?.getBoundingClientRect()
  })
  window.addEventListener('resize', resizeHandler)
  window.addEventListener('orientationchange', resizeHandler)
  ;(window as any).__portfolioResizeHandler = resizeHandler
})

onUnmounted(() => {
  if (previousTheme.value) {
    setTheme(previousTheme.value as 'light' | 'dark')
  }
  document.removeEventListener('keydown', handleEscapeKey)
  document.removeEventListener('mousemove', handleMouseMove)
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  const rh = (window as any).__portfolioResizeHandler
  if (rh) {
    window.removeEventListener('resize', rh)
    window.removeEventListener('orientationchange', rh)
    ;(window as any).__portfolioResizeHandler = undefined
  }
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
  contain: paint layout style;
}

@keyframes entranceEaseIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.entrance-animation { animation: entranceEaseIn 0.8s ease-out forwards; }

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
  @media (max-width: 768px) { display: none; }
}

.portfolio-content { position: relative; z-index: 1; }

.mosaic-grid {
  --gap: 16px;
  --row: 10px;
  width: 100%;
  max-width: 1400px;
  margin: 10vh auto 20vh;
  padding: 0 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: var(--row);
  gap: var(--gap);
}

.grid-item { position: relative; overflow: hidden; border-radius: 10px; background: #111; }
.grid-item.is-horizontal { aspect-ratio: 16 / 9; }
.grid-item.is-vertical { aspect-ratio: 9 / 16; }

.tile-content { width: 100%; height: 100%; }
.tile-image { width: 100%; height: 100%; object-fit: cover; display: block; }

.hero-slot { outline: 1px solid transparent; }
.hero-slot-placeholder { width: 100%; height: 100%; background: #ffffff; }

:global(.pin-spacer) { pointer-events: none !important; }

@media (min-width: 769px) {
  .portfolio:has(.tile-image:hover) .tile-image { filter: grayscale(1) brightness(0.6); }
  .portfolio:has(.tile-image:hover) .tile-image:hover { filter: grayscale(0) brightness(1); }
}

.video-modal { background: transparent; border: none; box-shadow: none; }
.video-modal :deep(.n-card__content) { padding: 0; height: 100%; }
.video-modal :deep(.n-card) { background: transparent; border: none; box-shadow: none; }

.video-modal.video-horizontal { width: 90vw; max-width: 1200px; height: 80vh; max-height: 675px; }
.video-modal.video-vertical { width: 90vw; max-width: 405px; height: 80vh; max-height: 720px; }
.video-modal.video-square { width: 90vw; max-width: 600px; height: 80vh; max-height: 600px; }

@media (max-width: 768px) {
  .mosaic-grid { grid-template-columns: 1fr; gap: 12px; padding: 0 8px; margin: 6vh auto 10vh; }
  .video-modal.video-horizontal { width: 96vw; height: calc(96vw * 9 / 16); max-width: none; max-height: 70vh; }
  .video-modal.video-vertical { width: calc(70vh * 9 / 16); height: 70vh; max-width: 95vw; max-height: none; }
  .video-modal.video-square { width: 70vh; height: 70vh; max-width: 95vw; max-height: none; }
}
</style>
