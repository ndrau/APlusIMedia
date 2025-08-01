<template>
  <section 
    class="hero-section"
    data-height="fullscreen"
    data-justify="center"
    data-valign="center"
    data-layout="grid"
    data-force-fullscreen="true"
    data-gutter="yes"
  >
    <!-- Background Video -->
    <VideoPlayer 
      ref="videoPlayerRef"
      :current-video-source="currentVideoSource"
      :is-muted="isMuted"
    />

    <!-- Overlay -->
    <div class="hero-overlay" />

    <!-- Hero Content -->
    <HeroContent 
      :is-playing="isPlaying"
      :is-muted="isMuted"
      @toggle-play="togglePlay"
      @toggle-mute="toggleMute"
    />

    <!-- Video Controls -->
    <!-- <VideoControls 
      :is-playing="isPlaying"
      :is-muted="isMuted"
      @toggle-play="togglePlay"
      @toggle-mute="toggleMute"
      @toggle-fullscreen="toggleFullscreen"
    /> -->
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useResponsive } from '@/composables/useResponsive'
import VideoPlayer from './VideoPlayer.vue'
import VideoControls from './VideoControls.vue'
import HeroContent from './HeroContent.vue'

// Video sources
const videoSources = {
  // wide: '/videos/MBD_CLA_15sec_Design_Clean_Diverse_12x5_small.mp4',
  wide: '/videos/output-720p.mp4',
  // square: '/videos/MBD_CLA_15sec_Design_Clean_Diverse_1x1_small.mp4'
  square: '/videos/output-720p.mp4',
}

// Reactive state
const videoPlayerRef = ref<any>(null)
const isPlaying = ref(true)
const isMuted = ref(true)

// Use responsive composable
const { isMobile } = useResponsive()

// Computed video properties
const currentVideoSource = computed(() => {
  return isMobile.value ? videoSources.square : videoSources.wide
})

// Methods
const getVideoElement = (): HTMLVideoElement | null => {
  return videoPlayerRef.value?.videoElement || null
}

const togglePlay = () => {
  const video = getVideoElement()
  if (video) {
    if (isPlaying.value) {
      video.pause()
      isPlaying.value = false
    } else {
      video.play()
      isPlaying.value = true
    }
  }
}

const toggleMute = () => {
  const video = getVideoElement()
  if (video) {
    isMuted.value = !isMuted.value
    video.muted = isMuted.value
  }
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.3) 0%,
    rgba(118, 75, 162, 0.3) 100%
  );
  z-index: 2;
}
</style> 