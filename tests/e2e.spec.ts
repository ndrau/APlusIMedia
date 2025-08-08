import { test, expect } from '@playwright/test'

test.describe('Portfolio E2E', () => {
  test('open modal via thumbnail and close with Esc', async ({ page }) => {
    // Force reduced motion and disable animations for test stability
    await page.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        value: (query: string) => ({
          matches: query.includes('prefers-reduced-motion'),
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }),
      })
      const style = document.createElement('style')
      style.textContent = '@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }'
      document.head.appendChild(style)
    })

    await page.goto('/')
    // Bring portfolio content into view (hero may be pinned initially)
    await page.locator('#portfolio-content').scrollIntoViewIfNeeded()
    const firstThumb = page.locator('.content-block img.is-content').first()
    await firstThumb.scrollIntoViewIfNeeded()
    await expect(firstThumb).toBeVisible()
    await firstThumb.click()
    const modal = page.locator('.video-modal')
    await expect(modal).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(modal).toBeHidden()
  })

  test('scroll-trigger visible state respects reduced motion', async ({ page }) => {
    // Force reduced-motion
    await page.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        value: (query: string) => ({
          matches: query.includes('prefers-reduced-motion'),
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }),
      })
    })

    await page.goto('/')
    const hero = page.locator('.hero-section')
    await expect(hero).toBeVisible()
    // With reduced motion, hero should not be pinned/scaled; assert no transform style applied
    const transform = await hero.evaluate((el) => getComputedStyle(el).transform)
    expect(transform === 'none' || transform === '').toBeTruthy()
  })
})

