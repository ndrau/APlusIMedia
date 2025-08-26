<template>
  <!-- Custom Modal Overlay -->
  <teleport to="body">
    <transition name="video-modal" appear>
      <div
        v-if="showModal"
        class="custom-video-modal-overlay"
        @click.self="handleClose"
      >
        <div
          class="custom-video-modal"
          :class="modalClass"
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
            @close="handleClose"
          />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VideoPlayer from '@/components/video/VideoPlayer.vue'
import type { Video } from '@/types/video'

interface PortfolioModalProps {
  show: boolean
  selectedVideo: Video | null
  modalClass: string
  modalStyles: Record<string, any>
}

interface PortfolioModalEmits {
  'update:show': [value: boolean]
  close: []
}

const props = defineProps<PortfolioModalProps>()
const emit = defineEmits<PortfolioModalEmits>()

// Computed properties for modal state
const showModal = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

// Event handlers
const handleClose = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
// Modal Overlay
.custom-video-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  box-sizing: border-box;
}

// Modal Container
.custom-video-modal {
  position: relative;
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  // Ensure no padding on the container
  padding: 0;
  margin: 0;
}

// Video Modal Sizes
.custom-video-modal.video-horizontal {
  width: 90vw;
  max-width: 1200px;
  height: 80vh;
  max-height: 675px;
}

.custom-video-modal.video-vertical {
  width: 90vw;
  max-width: 405px;
  height: 80vh;
  max-height: 720px;
}

.custom-video-modal.video-square {
  width: 90vw;
  max-width: 600px;
  height: 80vh;
  max-height: 600px;
}

// Modal Transitions
.video-modal-enter-active,
.video-modal-leave-active {
  transition: all 0.3s ease;
}

.video-modal-enter-from,
.video-modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.video-modal-enter-to,
.video-modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

// Mobile Styles
@media (max-width: 768px) {
  .custom-video-modal-overlay {
    padding: 1rem;
  }

  .custom-video-modal.video-horizontal {
    width: 95vw;
    height: calc(95vw * 9 / 16);
    max-width: none;
    max-height: 70vh;
  }

  .custom-video-modal.video-vertical {
    width: calc(70vh * 9 / 16);
    height: 70vh;
    max-width: 95vw;
    max-height: none;
  }

  .custom-video-modal.video-square {
    width: 70vh;
    height: 70vh;
    max-width: 95vw;
    max-height: none;
  }
}

// High Contrast Mode Support
@media (prefers-contrast: high) {
  .custom-video-modal-overlay {
    background: rgba(0, 0, 0, 0.95);
  }
}

// Reduced Motion Support
@media (prefers-reduced-motion: reduce) {
  .video-modal-enter-active,
  .video-modal-leave-active {
    transition: none;
  }

  .video-modal-enter-from,
  .video-modal-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
