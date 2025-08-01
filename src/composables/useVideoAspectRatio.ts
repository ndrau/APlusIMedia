import { ref, computed } from 'vue'
import type { Video, VideoAspectRatio } from '@/types/video'

export function useVideoAspectRatio() {
  const videoDimensions = ref<Map<string, { width: number; height: number }>>(new Map())

  // Function to detect aspect ratio from video dimensions
  const detectAspectRatio = (width: number, height: number): VideoAspectRatio => {
    const ratio = width / height
    
    if (Math.abs(ratio - 1) < 0.1) {
      return 'square' // 1:1 aspect ratio
    } else if (ratio < 1) {
      return 'vertical' // Portrait/vertical videos (9:16, 4:5, etc.)
    } else {
      return 'horizontal' // Landscape/horizontal videos (16:9, 4:3, etc.)
    }
  }

  // Function to get aspect ratio for a video
  const getVideoAspectRatio = (video: Video): VideoAspectRatio => {
    // If aspect ratio is explicitly set, use it
    if (video.aspectRatio) {
      return video.aspectRatio
    }

    // For YouTube videos, we could fetch dimensions from API
    // For now, use heuristics based on video type and common patterns
    if (video.videoType === 'youtube' && video.videoId) {
      // YouTube Shorts are typically vertical (9:16)
      // Regular YouTube videos are typically horizontal (16:9)
      // This is a simplified heuristic - in production, you'd want to fetch actual dimensions
      
      // Example: If video ID matches known vertical content
      if (video.videoId === '2txU1seXUkM') {
        return 'vertical'
      }
      
      // Default to horizontal for most YouTube content
      return 'horizontal'
    }

    // Default fallback
    return 'horizontal'
  }

  // Function to get CSS class for aspect ratio
  const getAspectRatioClass = (video: Video): string => {
    const aspectRatio = getVideoAspectRatio(video)
    return `video-${aspectRatio}`
  }

  // Function to get modal dimensions based on aspect ratio
  const getModalDimensions = (aspectRatio: VideoAspectRatio) => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    
    if (isMobile) {
      switch (aspectRatio) {
        case 'vertical':
          return {
            width: 'calc(70vh * 9 / 16)',
            height: '70vh',
            maxWidth: '95vw'
          }
        case 'square':
          return {
            width: '70vh',
            height: '70vh',
            maxWidth: '95vw'
          }
        case 'horizontal':
        default:
          return {
            width: '95vw',
            height: 'calc(95vw * 9 / 16)',
            maxHeight: '70vh'
          }
      }
    } else {
      // Desktop dimensions
      switch (aspectRatio) {
        case 'vertical':
          return {
            width: '90vw',
            maxWidth: '405px',
            height: '80vh',
            maxHeight: '720px'
          }
        case 'square':
          return {
            width: '90vw',
            maxWidth: '600px',
            height: '80vh',
            maxHeight: '600px'
          }
        case 'horizontal':
        default:
          return {
            width: '90vw',
            maxWidth: '1200px',
            height: '80vh',
            maxHeight: '675px'
          }
      }
    }
  }

  return {
    videoDimensions,
    detectAspectRatio,
    getVideoAspectRatio,
    getAspectRatioClass,
    getModalDimensions
  }
} 