import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useResponsive() {
  const screenWidth = ref(window.innerWidth)

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
    screenWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
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