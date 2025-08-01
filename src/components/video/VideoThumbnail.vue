<template>
  <n-el 
    tag="article"
    class="video-thumbnail" 
    @click="handlePlay"
    @keydown.enter="handlePlay"
    @keydown.space.prevent="handlePlay"
    tabindex="0"
    role="button"
    :aria-label="accessibilityLabel"
  >
    <!-- Thumbnail Image -->
    <div class="thumbnail-container">
      <img 
        :src="posterImage" 
        :alt="imageAltText"
        class="thumbnail-image"
        loading="lazy"
      />
      
      <!-- Play Overlay -->
      <div class="play-overlay">
        <n-icon :size="playIconSize" color="white">
          <PlayIcon />
        </n-icon>
      </div>
    </div>
  </n-el>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NIcon, NEl } from 'naive-ui'
import { Play as PlayIcon } from '@vicons/ionicons5'

// Types
interface VideoThumbnailProps {
  posterImage: string
  title: string
}

// Props & Emits
const props = defineProps<VideoThumbnailProps>()
const emit = defineEmits<{
  play: []
}>()

// Constants
const PLAY_ICON_SIZE = {
  DESKTOP: 48,
  MOBILE: 40
} as const

// Computed Properties
const playIconSize = computed((): number => {
  // Could be enhanced with responsive breakpoint detection
  return PLAY_ICON_SIZE.DESKTOP
})

const imageAltText = computed((): string => 
  `Video thumbnail for: ${props.title}`
)

const accessibilityLabel = computed((): string => 
  `Play video: ${props.title}`
)

// Event Handlers
const handlePlay = (): void => {
  emit('play')
}
</script>

<style scoped lang="scss">
// Constants
$overlay-size-desktop: 80px;
$overlay-size-mobile: 64px;
$border-radius: 50%;
$transition-duration: 0.3s;
$transition-easing: ease;

.video-thumbnail {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: var(--base-color);
  transition: transform $transition-duration $transition-easing;
  outline: none;

  // Focus states for accessibility
  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .thumbnail-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .thumbnail-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform $transition-duration $transition-easing;
      background: var(--base-color);
    }

    .play-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: $border-radius;
      width: $overlay-size-desktop;
      height: $overlay-size-desktop;
      background-color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all $transition-duration $transition-easing;
      box-shadow: 
        0 4px 16px rgba(0, 0, 0, 0.2),
        0 2px 8px rgba(0, 0, 0, 0.1);
      opacity: 0.95;
      backdrop-filter: blur(2px);

      &:hover {
        opacity: 1;
        background-color: var(--primary-color-hover);
        transform: translate(-50%, -50%) scale(1.1);
        box-shadow: 
          0 6px 20px rgba(0, 0, 0, 0.3),
          0 3px 12px rgba(0, 0, 0, 0.15);
      }
    }
  }

  // Hover effect for devices that support hover
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      .thumbnail-image {
        transform: scale(1.05);
      }
    }
  }
}

// Mobile Optimizations
@media (max-width: 768px) {
  .video-thumbnail {
    .thumbnail-container {
      .play-overlay {
        width: $overlay-size-mobile;
        height: $overlay-size-mobile;
        box-shadow: 
          0 4px 12px rgba(0, 0, 0, 0.2),
          0 2px 6px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

// High Contrast Mode Support
@media (prefers-contrast: high) {
  .video-thumbnail {
    .play-overlay {
      border: 2px solid white;
    }
  }
}

// Reduced Motion Support
@media (prefers-reduced-motion: reduce) {
  .video-thumbnail {
    .thumbnail-image,
    .play-overlay {
      transition: none;
    }

    &:hover .thumbnail-image {
      transform: none;
    }
  }
}

// Fallback for older browsers that don't support aspect-ratio
@supports not (aspect-ratio: 16 / 9) {
  .video-thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style> 