export type VideoType = 'youtube' | 'vimeo' | 'hosted' | 'placeholder'

export type VideoAspectRatio = 'horizontal' | 'vertical' | 'square'

export interface Video {
  id: string
  title: string
  description: string
  duration: string
  videoType: VideoType
  videoId?: string
  videoUrl?: string
  posterImage: string
  startTime?: number
  requireConsent?: boolean
  aspectRatio?: VideoAspectRatio
} 