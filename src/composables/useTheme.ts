import { ref, computed, watch } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'

type Theme = 'light' | 'dark'

const isDark = ref<boolean>(true)

// Initialize theme from localStorage or system preference
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') as Theme | null
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    // Default to dark theme if no preference is saved
    isDark.value = true
  }
}

// Watch for theme changes and update localStorage
watch(isDark, (newValue) => {
  localStorage.setItem('theme', newValue ? 'dark' : 'light')
}, { immediate: false })

export const useTheme = () => {
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  const setTheme = (theme: Theme) => {
    isDark.value = theme === 'dark'
  }

  const currentTheme = computed(() => isDark.value ? 'dark' : 'light')
  
  const naiveTheme = computed(() => isDark.value ? darkTheme : lightTheme)

  // Initialize on first use
  if (typeof window !== 'undefined') {
    initializeTheme()
  }

  return {
    isDark: computed(() => isDark.value),
    currentTheme,
    naiveTheme,
    toggleTheme,
    setTheme
  }
} 