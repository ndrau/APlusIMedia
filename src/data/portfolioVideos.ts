import type { PortfolioItem, Video, Service } from '@/types/video'

export const portfolioContent: PortfolioItem[] = [
  // Video content
  {
    id: 'video-1',
    type: 'video',
    content: {
      id: '1',
      title: 'Jordanien',
      description: '2023 - Short Film',
      duration: '15:30',
      videoType: 'youtube',
      videoId: '_o_NHVeq830',
      posterImage: '/images/portfolio/jordanien.png',
      startTime: 0,
      requireConsent: false,
      aspectRatio: 'horizontal'
    } as Video
  },
  {
    id: 'video-2',
    type: 'video',
    content: {
      id: '2',
      title: 'Greece',
      description: '2024 - Travel',
      duration: '22:15',
      videoType: 'youtube',
      videoId: 'eXbeGrkhghg',
      posterImage: '/images/portfolio/greece.png',
      startTime: 0,
      requireConsent: false,
      aspectRatio: 'horizontal'
    } as Video
  },

  // Service content
  {
    id: 'service-1',
    type: 'service',
    content: {
      id: 'service-1',
      title: 'Videoproduktion',
      description: 'Professionelle Filmproduktionsdienstleistungen',
      content: '<p>Wir erschaffen fesselnde visuelle Geschichten, die das Publikum begeistern und Ergebnisse erzielen. Von der Konzeption bis zum finalen Schnitt übernimmt unser erfahrenes Team jeden Aspekt der Videoproduktion mit größter Sorgfalt.</p><p>Unser Ansatz verbindet kreatives Storytelling mit technischer Exzellenz, um Videos zu liefern, die nicht nur atemberaubend aussehen, sondern auch Ihre Geschäftsziele erreichen.</p>',
      features: [
        'Vollständige Videoproduktion',
        'Professionelle Cinematografie',
        'Erweiterte Postproduktion',
        'Multi-Plattform-Optimierung',
        'Strategisches Storytelling',
        'Markenkonforme Inhalte'
      ],
      ctaText: 'Projekt besprechen',
      ctaLink: '#contact',
      aspectRatio: 'horizontal'
    } as Service
  },

  // More video content
  {
    id: 'video-3',
    type: 'video',
    content: {
      id: '3',
      title: 'Schausonntag',
      description: '2025 - Schwarzwald Küchen',
      duration: '0:47',
      videoType: 'youtube',
      videoId: '2txU1seXUkM',
      posterImage: '/images/portfolio/schausonntag.jpg',
      startTime: 29,
      requireConsent: false,
      aspectRatio: 'vertical'
    } as Video
  },

  // Service content
  {
    id: 'service-2',
    type: 'service',
    content: {
      id: 'service-2',
      title: 'Marken-Storytelling',
      description: 'Authentische Markennarrative entwickeln',
      content: '<p>Jede Marke hat eine einzigartige Geschichte zu erzählen. Wir helfen Ihnen, diese Geschichte zu entdecken, zu entwickeln und durch fesselnde visuelle Inhalte zu vermitteln, die bei Ihrem Publikum Anklang finden und Ihre Markenidentität stärken.</p><p>Unsere Marken-Storytelling-Dienstleistungen verbinden tiefe Marktkenntnisse mit kreativer Exzellenz, um authentische, einprägsame Inhalte zu schaffen, die Engagement und Loyalität fördern.</p>',
      features: [
        'Markenstrategie-Entwicklung',
        'Narrative Architektur',
        'Visuelle Identitätsschöpfung',
        'Content-Strategie',
        'Zielgruppen-Einsichten',
        'Leistungsmessung'
      ],
      ctaText: 'Branding erkunden',
      ctaLink: '#services',
      aspectRatio: 'vertical'
    } as Service
  },

  // More video content
  {
    id: 'video-4',
    type: 'video',
    content: {
      id: '11',
      title: 'Mercedes-Benz CLA',
      description: '2024 - Social Cut',
      duration: '0:15',
      videoType: 'youtube',
      videoId: 'ILsfMUmgoVo',
      posterImage: '/images/portfolio/11.png',
      startTime: 0,
      requireConsent: false,
      aspectRatio: 'horizontal'
    } as Video
  },
  {
    id: 'video-5',
    type: 'video',
    content: {
      id: '4',
      title: 'Kitchen Show Sunday',
      description: '2025 - Schwarzwald Küchen Campaign',
      duration: '0:47',
      videoType: 'youtube',
      videoId: 'MN7gOq4u3DE',
      posterImage: '/images/portfolio/4.png',
      startTime: 0,
      requireConsent: false,
      aspectRatio: 'vertical'
    } as Video
  },

  // Service content
  {
    id: 'service-3',
    type: 'service',
    content: {
      id: 'service-3',
      title: 'Social Media Content',
      description: 'Ansprechende Inhalte für digitale Plattformen',
      content: '<p>In der heutigen schnelllebigen digitalen Welt sind fesselnde Social-Media-Inhalte entscheidend für Markensichtbarkeit und Engagement. Wir erstellen Content, der zum Scrollen einlädt, Interaktion fördert und bedeutungsvolle Verbindungen zu Ihrem Publikum aufbaut.</p><p>Von Short-Form-Videos bis hin zu Karussell-Beiträgen optimieren wir jeden Content für maximale Wirkung auf allen Social-Media-Plattformen.</p>',
      features: [
        'Plattformoptimierte Inhalte',
        'Short-Form-Video-Erstellung',
        'Social-Strategie',
        'Community-Management',
        'Leistungsanalytik',
        'Trend-Integration'
      ],
      ctaText: 'Unsere Arbeit ansehen',
      ctaLink: '#portfolio',
      aspectRatio: 'horizontal'
    } as Service
  },

  // More video content
  {
    id: 'video-6',
    type: 'video',
    content: {
      id: '5',
      title: 'Cityscapes',
      description: '2023 - Urban Visuals',
      duration: '0:30',
      videoType: 'youtube',
      videoId: 'hpkXolxiN_o',
      posterImage: '/images/portfolio/5.png',
      startTime: 0,
      requireConsent: false,
      aspectRatio: 'horizontal'
    } as Video
  },
  {
    id: 'video-7',
    type: 'video',
    content: {
      id: '6',
      title: 'Behind the Scenes',
      description: '2024 - Production Snippets',
      duration: '0:25',
      videoType: 'youtube',
      videoId: '2c5bqaCspQo',
      posterImage: '/images/portfolio/6.png',
      startTime: 0,
      requireConsent: false,
      aspectRatio: 'vertical'
    } as Video
  },
  {
    id: 'video-8',
    type: 'video',
    content: {
      id: '9',
      title: 'Brand Teaser',
      description: '2023 - Short Promo',
      duration: '0:20',
      videoType: 'youtube',
      videoId: '6IFl-6hZBpo',
      posterImage: '/images/portfolio/9.png',
      startTime: 0,
      requireConsent: false,
      aspectRatio: 'horizontal'
    } as Video
  },
  {
    id: 'video-9',
    type: 'video',
    content: {
      id: '7',
      title: 'Motion Portrait',
      description: '2024 - Vertical Reel',
      duration: '0:18',
      videoType: 'youtube',
      videoId: 'na-8fGTJWtU',
      posterImage: '/images/portfolio/7.png',
      startTime: 0,
      requireConsent: false,
      aspectRatio: 'vertical'
    } as Video
  },
  {
    id: 'video-10',
    type: 'video',
    content: {
      id: '8',
      title: 'Outdoor Journey',
      description: '2022 - Travel Moments',
      duration: '0:35',
      videoType: 'youtube',
      videoId: '4IvYBwYgFo8',
      posterImage: '/images/portfolio/8.png',
      startTime: 0,
      requireConsent: false,
      aspectRatio: 'horizontal'
    } as Video
  }
]

// Keep the old export for backward compatibility
export const portfolioVideos: Video[] = portfolioContent
  .filter(item => item.type === 'video')
  .map(item => item.content as Video) 