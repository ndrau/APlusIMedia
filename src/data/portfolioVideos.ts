import type { PortfolioItem, Video, Service } from '@/types/video'

export const portfolioContent: PortfolioItem[] = [
  // Video content
  {
    id: 'video-1',
    type: 'video',
    content: {
      id: '1',
      title: 'Wüstenreise Jordanien',
      description: '2023 - Dokumentarfilm über die faszinierende Landschaft Jordaniens',
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
      title: 'Griechenland - Inselhopping',
      description: '2024 - Reise durch die griechischen Inseln und ihre verborgenen Schätze',
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
      title: 'Schausonntag - Küchen Event',
      description: '2025 - Jeden 1. Sonntag im Monat',
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
      aspectRatio: 'horizontal'
    } as Service
  },

  // More video content
  {
    id: 'video-4',
    type: 'video',
    content: {
      id: '11',
      title: 'Rheinfall - Naturgewalt',
      description: '2025 - Die imposante Wassermasse des größten Wasserfalls Europas',
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
      title: 'Johanniterbad',
      description: '2025 - Kulinarischen Highlights aus Rottweil',
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
      title: 'Öschberghof',
      description: '5 Sterne Luxushotel für Wellness',
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
      title: 'Segelturn',
      description: '2024 - Offenes Meer',
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
      title: 'Nitro Alternator 2025',
      description: '2025 - Rider Video für das Nitro Alternator 2025',
      duration: '0:20',
      videoType: 'youtube',
      videoId: '6IFl-6hZBpo',
      posterImage: '/images/portfolio/9.png',
      startTime: 0,
      requireConsent: false,
      aspectRatio: 'horizontal'
    } as Video
  },
    // Service content
    {
      id: 'service-4',
      type: 'service',
      content: {
        id: 'service-4',
        title: 'Hochzeits-Fotografie',
        description: 'Emotionale Hochzeitsfotos für die Ewigkeit',
        content: '<p>Jeder Hochzeitstag ist einzigartig und verdient es, in perfekten Bildern festgehalten zu werden. Wir begleiten Sie von der Vorbereitung über die Zeremonie bis zum letzten Tanz und erschaffen Fotos, die Ihre Liebe und diesen besonderen Tag für immer widerspiegeln.</p><p>Unsere Hochzeitsfotografie verbindet künstlerisches Auge mit technischer Präzision, um authentische und emotionale Momente einzufangen, die Sie noch in Jahren mit Freude betrachten werden.</p>',
        features: [
          'Vollständige Hochzeitsdokumentation',
          'Kreative Porträt-Aufnahmen',
          'Gruppen- und Detailfotos',
          'Natürliche Reportage-Fotografie',
          'Hochwertige Bildbearbeitung',
          'Schnelle Nachbearbeitung'
        ],
        ctaText: 'Termin vereinbaren',
        ctaLink: '#portfolio',
        aspectRatio: 'horizontal'
      } as Service
    },
  {
    id: 'video-9',
    type: 'video',
    content: {
      id: '7',
      title: 'Esszeit Weber - Kräutergarten',
      description: '2024 - Neues aus dem Kräutergarten',
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
      title: 'Portugal',
      description: '2025 - Portugal Drohnen Showreel',
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