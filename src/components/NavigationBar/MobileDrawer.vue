<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import {
  NButton,
  NIcon,
  NMenu,
  NSpace,
  NDrawer,
  NDrawerContent
} from 'naive-ui'
import { Close as CloseIcon } from '@vicons/ionicons5'
import SocialLinks from '@/components/shared/SocialLinks.vue'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'

interface Props {
  show: boolean
  menuOptions: any[]
}

interface Emits {
  (e: 'update:show', value: boolean): void
  (e: 'menu-select', key: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()
const { isDark } = useTheme()

const drawerStyle = computed(() => ({
  backgroundColor: isDark.value ? 'rgba(20, 20, 20, 0.7)' : 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(5px)'
}))

const drawerContentStyle = computed(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center'
}))

const handleMenuSelect = (key: string) => {
  emit('menu-select', key)
  emit('update:show', false)
}

const handleClose = () => {
  emit('update:show', false)
}
</script>

<template>
  <n-drawer
    :show="show"
    @update:show="emit('update:show', $event)"
    placement="right"
    width="100%"
    :style="drawerStyle"
    :content-style="drawerContentStyle"
  >
    <n-drawer-content>
      <n-button
        quaternary
        size="large"
        @click="handleClose"
        style="position: absolute; top: 1.25rem; right: 1.25rem; z-index: 1"
      >
        <template #icon>
          <n-icon size="28"><CloseIcon /></n-icon>
        </template>
      </n-button>
      
      <n-space vertical size="large" style="padding: 5rem 0 0 0;">
        <!-- Mobile Navigation -->
        <div class="mobile-nav-section">
          <n-menu
            mode="vertical"
            :options="menuOptions"
            @update:value="handleMenuSelect"
          />
        </div>
        
        <!-- Mobile Controls -->
        <div class="mobile-controls-section">
          <n-space size="large" justify="center">
            <ThemeToggle 
              :icon-size="28"
              :show-tooltip="false"
            />
            
            <LanguageToggle 
              :icon-size="28"
              :show-tooltip="false"
              :show-language-code="true"
            />
          </n-space>
        </div>
        
        <!-- Social Media Links -->
        <div class="mobile-social-section">
          <SocialLinks 
            :show-tiktok="false"
            :icon-size="28"
            :centered="true"
            :track-clicks="true"
            location="nav"
          />
        </div>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang="scss">
.mobile-nav-section {
  :deep(.n-menu-item) {
    height: 64px;
    
    .n-menu-item-content {
      display: flex;
      height: 100%;
      align-items: center;
      font-size: 1.75rem;
      justify-content: center;
      padding: 0 1rem !important;

      &::before {
        left: 0;
        right: 0;
        border-radius: 0;
      }
    }
  }
}

.mobile-controls-section {
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  :deep(.n-space) {
    align-items: center;
  }
}

.mobile-social-section {
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;

  :deep(.social-links) {
    .social-link {
      border: none;
      
      &:hover {
        border: none;
      }
    }
  }
}
</style> 