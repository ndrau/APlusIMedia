import { ref, nextTick, onUnmounted, type Ref } from 'vue'
import { useDebugger } from '@/composables/useDebugger'
import type { Video } from '@/types/video'

// A small subset of the props from Video, only what is needed for the player
type VideoPlayerProps = Pick<
  Video,
  'videoType' | 'videoId' | 'videoUrl' | 'posterImage' | 'startTime'
>

export function usePlayer(props: VideoPlayerProps, playerContainer: Ref<HTMLElement | undefined>) {
  const { log, error: logError } = useDebugger()
  let iframe: HTMLIFrameElement | null = null

  const initializePlayer = async (): Promise<void> => {
    log('🎥 Initializing simple YouTube player', { ...props })

    await nextTick()

    if (!playerContainer.value) {
      logError('❌ Player container not found.')
      return
    }

    if (iframe) {
      log('⚠️ Iframe already exists. Removing old instance.')
      iframe.remove()
    }

    try {
      if (props.videoType === 'youtube' && props.videoId) {
        // Create simple YouTube iframe
        iframe = document.createElement('iframe')
        iframe.width = '100%'
        iframe.height = '100%'
        iframe.frameBorder = '0'
        iframe.allowFullscreen = true
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        
        // Build YouTube URL with parameters
        const params = new URLSearchParams({
          autoplay: '0', // Start paused
          rel: '0', // Don't show related videos
          modestbranding: '1', // Hide YouTube logo
          iv_load_policy: '3', // Hide annotations
          controls: '1', // Show YouTube controls
          fs: '1', // Enable fullscreen
          showinfo: '0', // Hide video info
          playsinline: '1', // Important for iOS
          loop: '1', // Loop video
          playlist: props.videoId, // Required for loop
          mute: '0', // Start unmuted
          ...(props.startTime && { start: props.startTime.toString() })
        })
        
        iframe.src = `https://www.youtube.com/embed/${props.videoId}?${params.toString()}`
        
        // Add iframe to container
        playerContainer.value.appendChild(iframe)
        
        log('✅ YouTube iframe created successfully.')
      } else {
        logError('❌ Only YouTube videos are supported in simple mode.')
      }
    } catch (error) {
      logError('❌ Error initializing YouTube player:', error)
    }
  }

  const destroyPlayer = (): void => {
    if (iframe) {
      log('⏹️ Destroying iframe.')
      iframe.remove()
      iframe = null
    }
    if (playerContainer.value) {
      playerContainer.value.innerHTML = ''
    }
  }

  onUnmounted(destroyPlayer)

  return {
    initializePlayer,
    destroyPlayer
  }
} 