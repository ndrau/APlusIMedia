<template>
  <n-modal
    ref="videoModal"
    v-model:show="showModal"
    :mask-closable="true"
    :closable="false"
    preset="card"
    :class="['video-modal', modalClass]"
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
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NModal } from 'naive-ui'
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

const videoModal = ref<any>(null)

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
