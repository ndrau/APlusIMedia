<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import BurgerIcon from './BurgerIcon.vue'

interface Props {
  size?: 'tiny' | 'small' | 'medium' | 'large'
  quaternary?: boolean
}

interface Emits {
  (e: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  quaternary: true
})

const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <n-button 
    :quaternary="quaternary"
    :size="size"
    @click="handleClick"
    class="mobile-menu-button"
  >
    <template #icon>
      <n-icon>
        <BurgerIcon />
      </n-icon>
    </template>
  </n-button>
</template>

<style scoped lang="scss">
.mobile-menu-button {
  display: flex;

  @media (min-width: 1050px) {
    display: none !important;
  }
}
</style> 