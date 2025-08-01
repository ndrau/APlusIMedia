<template>
  <div class="video-controls">
    <button 
      class="control-btn" 
      @click="togglePlay"
      :title="isPlaying ? 'Pause' : 'Play'"
    >
      {{ isPlaying ? '⏸️' : '▶️' }}
    </button>
    <button 
      class="control-btn" 
      @click="toggleMute"
      :title="isMuted ? 'Unmute' : 'Mute'"
    >
      {{ isMuted ? '🔇' : '🔊' }}
    </button>
    <button 
      class="control-btn" 
      @click="toggleFullscreen"
      title="Toggle Fullscreen"
    >
      ⛶
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isPlaying: boolean
  isMuted: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  togglePlay: []
  toggleMute: []
  toggleFullscreen: []
}>()

const togglePlay = () => emit('togglePlay')
const toggleMute = () => emit('toggleMute')
const toggleFullscreen = () => emit('toggleFullscreen')
</script>

<style scoped>
.video-controls {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 4;
  display: flex;
  gap: 1rem;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
  border-color: rgba(255, 255, 255, 0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
  .video-controls {
    bottom: 1rem;
    right: 1rem;
    gap: 0.5rem;
  }
  
  .control-btn {
    width: 45px;
    height: 45px;
    font-size: 16px;
  }
}
</style> 