export interface VideoItem {
  id: string
  title: string
  description: string
  duration: string
  videoType: 'youtube' | 'vimeo' | 'hosted' | 'placeholder'
  videoId?: string
  videoUrl?: string
  posterImage: string
  startTime?: number // Start time in seconds
}

export const videoPortfolio: VideoItem[] = [
  // {
  //   id: '2',
  //   title: 'Schausonntag',
  //   description: 'Schwarzwaldküchen',
  //   duration: '17s',
  //   videoType: 'hosted',
  //   videoUrl: '/videos/schausonntag.mp4',
  //   startTime: 15,
  //   posterImage: '/videos/thumbnails/schausonntag.png'
  // },
  {
    id: '3',
    title: 'Youtube Short Example',
    description: 'A cool video from youtube shorts',
    duration: '10s', // Please update the duration
    videoType: 'youtube',
    videoId: '2txU1seXUkM',
    startTime: 29,
    posterImage: '/videos/thumbnails/schausonntag.png'
  }
] 