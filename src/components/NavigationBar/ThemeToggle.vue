<script setup lang="ts">
import { NIcon, NEl, NTooltip } from 'naive-ui'
import { Moon as MoonIcon, Sunny as SunnyIcon } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'

interface Props {
  iconSize?: number | string
  showTooltip?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  iconSize: 20,
  showTooltip: true
})

const { t } = useI18n()
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <n-el class="theme-toggle">
    <n-tooltip v-if="showTooltip" :show-arrow="false">
      <template #trigger>
        <a 
          @click="toggleTheme"
          class="theme-link"
          :title="t('nav.toggleTheme')"
        >
          <n-icon :size="iconSize">
            <component :is="isDark ? SunnyIcon : MoonIcon" />
          </n-icon>
        </a>
      </template>
      {{ t('nav.toggleTheme') }}
    </n-tooltip>
    <a 
      v-else
      @click="toggleTheme"
      class="theme-link"
      :title="t('nav.toggleTheme')"
    >
      <n-icon :size="iconSize">
        <component :is="isDark ? SunnyIcon : MoonIcon" />
      </n-icon>
    </a>
  </n-el>
</template>

<style scoped lang="scss">
.theme-toggle {
  display: flex;

  .theme-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: var(--text-color-2);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      color: var(--primary-color-hover);
      transform: translateY(-2px);
    }
  }
}
</style> 