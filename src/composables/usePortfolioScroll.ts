import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { portfolioVideos } from '@/data/portfolioVideos'

export function usePortfolioScroll() {
  let initialized = false

  const init = (): void => {
    if (initialized) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    // Hero section
    const heroSection = document.querySelector('.hero-section') as Element | null
    if (heroSection) {
      const totalScrollDistance = `+=${300 + portfolioVideos.length * 300}%`

      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: totalScrollDistance,
            pin: true,
            pinSpacing: false,
            scrub: true,
            anticipatePin: 0.2,
          },
        })
        .to(heroSection, { scale: 0.15, duration: 3 })
        .to(heroSection, { scale: 0.15, duration: portfolioVideos.length * 2 }, 3)
        .to(heroSection, { zIndex: 100, duration: 0 }, 0)
    }

    // Portfolio items
    const elements = gsap.utils.toArray('.scroll-away') as Element[]
    elements.forEach((element, index) => {
      const startTrigger = index === 0 ? 'top-=150% top' : 'top top'

      gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start: startTrigger,
            end: '+=300%',
            pin: true,
            pinSpacing: false,
            scrub: true,
            anticipatePin: 0.2,
          },
        })
        .to(element, { scale: 0.75, duration: 3 })
        .to(element, { opacity: 0, duration: 1 }, '-=1')
        .to(element, { zIndex: 1000 - index, duration: 0 }, 0)
        .to(element, { pointerEvents: 'none', duration: 0 }, 0)
        .to(element, { pointerEvents: 'auto', duration: 0 }, 1)
    })

    initialized = true
  }

  const destroy = (): void => {
    ScrollTrigger.getAll().forEach((t) => t.kill())
    initialized = false
  }

  return { init, destroy }
}

