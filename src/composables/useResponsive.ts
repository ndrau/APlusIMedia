import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useResponsive() {
  const initialWidth = typeof window !== 'undefined' ? window.innerWidth : 1024
  const screenWidth = ref(initialWidth)

  const screenSize = computed(() => {
    if (screenWidth.value <= 480) return 'Mobile (XS)'
    if (screenWidth.value <= 768) return 'Mobile (SM)'
    if (screenWidth.value <= 1024) return 'Tablet (MD)'
    if (screenWidth.value <= 1200) return 'Desktop (LG)'
    return 'Desktop (XL)'
  })

  const isMobile = computed(() => screenWidth.value <= 768)
  const isTablet = computed(() => screenWidth.value > 768 && screenWidth.value <= 1024)
  const isDesktop = computed(() => screenWidth.value > 1024)

  const handleResize = () => {
    if (typeof window === 'undefined') return
    screenWidth.value = window.innerWidth
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', handleResize)
  })

  return {
    screenWidth,
    screenSize,
    isMobile,
    isTablet,
    isDesktop
  }
} 