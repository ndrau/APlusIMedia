export type VideoType = 'youtube' | 'vimeo' | 'hosted' | 'placeholder'

export type VideoAspectRatio = 'horizontal' | 'vertical' | 'square'

export type ContentType = 'video' | 'service'

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

export interface Service {
  id: string
  title: string
  description: string
  content: string
  icon?: string
  features?: string[]
  ctaText?: string
  ctaLink?: string
  aspectRatio?: VideoAspectRatio
}

export type PortfolioContent = Video | Service

export interface PortfolioItem {
  id: string
  type: ContentType
  content: PortfolioContent
} 