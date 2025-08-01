<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import {
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NLoadingBarProvider
} from 'naive-ui'
import { useTheme } from './composables/useTheme'

const { naiveTheme, isDark } = useTheme()
const isLoaded = ref(false)

// Watch theme changes and apply to body with RAF to prevent forced layout
watch(isDark, (dark) => {
  // Use requestAnimationFrame to defer style changes until the next paint
  requestAnimationFrame(() => {
    if (dark) {
      document.body.style.backgroundColor = '#101014'
      document.body.style.color = 'rgba(255, 255, 255, 0.82)'
      document.documentElement.style.backgroundColor = '#101014'
    } else {
      document.body.style.backgroundColor = '#ffffff'
      document.body.style.color = 'rgb(51, 54, 57)'
      document.documentElement.style.backgroundColor = '#ffffff'
    }
  })
}, { immediate: true })

onMounted(() => {
  // Mark as loaded after component is mounted and styles are applied
  requestAnimationFrame(() => {
    isLoaded.value = true
  })
})
</script>

<template>
  <n-config-provider :theme="naiveTheme">
    <div class="app-wrapper" :class="{ loaded: isLoaded }">
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <n-loading-bar-provider>
              <router-view />
            </n-loading-bar-provider>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </div>
  </n-config-provider>
</template>

<style lang="scss">
// Global styles are imported through main.scss
#app {
  min-height: 100vh;
}

.app-wrapper {
  min-height: 100vh;
  background-color: var(--body-color);
  color: var(--text-color-base);
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
