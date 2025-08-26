import type { Ref } from 'vue'
import type { Video } from '@/types/video'

interface UsePortfolioEventsProps {
  showVideoPlayer: Ref<boolean>
  selectedVideo: Ref<Video | null>
}

export const usePortfolioEvents = ({ showVideoPlayer, selectedVideo }: UsePortfolioEventsProps) => {
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

  // Mouse event handlers for normal cursor behavior
  const handleMouseEnter = () => {
    // Normal cursor behavior - no special effects needed
  }

  const handleMouseLeave = () => {
    // Normal cursor behavior - no special effects needed
  }

  return {
    handleVideoPlay,
    handleVideoClose,
    handleEscapeKey,
    handleMouseEnter,
    handleMouseLeave
  }
}
