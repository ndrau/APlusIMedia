<template>
  <video 
    ref="videoRef"
    class="video-hero"
    :src="currentVideoSource" 
    :muted="isMuted"
    :loop="true"
    :autoplay="true"
    preload="metadata"
    playsinline
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  currentVideoSource: string
  isMuted: boolean
}

const props = defineProps<Props>()

const videoRef = ref<HTMLVideoElement | null>(null)

// Expose the video element to parent
defineExpose({
  videoElement: videoRef
})

onMounted(() => {
  // Auto-initialize video when mounted
  if (videoRef.value) {
    videoRef.value.play().catch(() => {
      console.log('Autoplay prevented by browser')
    })
  }
})
</script>

<style scoped>
.video-hero {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}
</style> 