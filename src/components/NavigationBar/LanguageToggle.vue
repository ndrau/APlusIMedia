<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { NIcon, NEl, NTooltip } from 'naive-ui'
import { Language as LanguageIcon } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'

interface Props {
  iconSize?: number | string
  showTooltip?: boolean
  showLanguageCode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  iconSize: 20,
  showTooltip: true,
  showLanguageCode: true
})

const { t, locale } = useI18n()

const currentLanguage = computed(() => locale.value)

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'de' : 'en'
  document.documentElement.lang = locale.value
}

onMounted(() => {
  document.documentElement.lang = locale.value
})
</script>

<template>
  <n-el class="language-toggle">
    <n-tooltip v-if="showTooltip" :show-arrow="false">
      <template #trigger>
        <a 
          @click="toggleLanguage"
          class="language-link"
          :title="t('nav.toggleLanguage')"
        >
          <n-icon :size="iconSize">
            <LanguageIcon />
          </n-icon>
          <span v-if="showLanguageCode" class="language-code">{{ currentLanguage.toUpperCase() }}</span>
        </a>
      </template>
      {{ t('nav.toggleLanguage') }}
    </n-tooltip>
    <a 
      v-else
      @click="toggleLanguage"
      class="language-link"
      :title="t('nav.toggleLanguage')"
    >
      <n-icon :size="iconSize">
        <LanguageIcon />
      </n-icon>
      <span v-if="showLanguageCode" class="language-code">{{ currentLanguage.toUpperCase() }}</span>
    </a>
  </n-el>
</template>

<style scoped lang="scss">
.language-toggle {
  display: flex;

  .language-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: var(--text-color-2);
    transition: all 0.3s ease;
    cursor: pointer;
    gap: 4px;

    &:hover {
      color: var(--primary-color-hover);
      transform: translateY(-2px);
    }

    .language-code {
      font-size: 10px;
      font-weight: 600;
    }
  }
}
</style> 