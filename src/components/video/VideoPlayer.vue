<template>
  <n-el class="video-player-container">
    <div ref="playerContainer" class="plyr-container"></div>
    <!-- Overlay to hide YouTube branding -->
    <div class="youtube-overlay"></div>
    <button @click="$emit('close')" class="close-button" aria-label="Close video player">
      <n-icon size="24" color="white">
        <CloseIcon />
      </n-icon>
    </button>
  </n-el>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { NIcon, NEl } from 'naive-ui'
import { Close as CloseIcon } from '@vicons/ionicons5'
import { usePlayer } from '@/composables/usePlayer'
import type { Video } from '@/types/video'

type VideoPlayerProps = Pick<
  Video,
  'videoType' | 'videoId' | 'videoUrl' | 'posterImage' | 'startTime' | 'requireConsent'
>

const props = defineProps<VideoPlayerProps>()
const emit = defineEmits<{
  close: []
}>()

const playerContainer = ref<HTMLElement>()

const { initializePlayer, destroyPlayer } = usePlayer(props, playerContainer)

onMounted(() => {
  initializePlayer()
})

onUnmounted(() => {
  destroyPlayer()
})
</script>

<style scoped lang="scss">
.video-player-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--modal-color);

  .plyr-container {
    width: 100%;
    height: 100%;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.9);
    }
  }

  // Overlay to hide YouTube branding that appears on top
  .youtube-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px; // Cover the top branding area
    background: transparent;
    z-index: 5;
    pointer-events: none;
  }




}

// YouTube iframe styling
:deep(iframe) {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
}

// Fallback for older browsers that don't support aspect-ratio
@supports not (aspect-ratio: 16 / 9) {
  .video-player-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}


</style> 