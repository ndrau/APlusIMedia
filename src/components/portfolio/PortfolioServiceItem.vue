<template>
  <div class="column-content" data-module="service">
    <ServiceCard :service="service" />
  </div>
</template>

<script setup lang="ts">
import ServiceCard from '@/components/portfolio/ServiceCard.vue'
import type { Service } from '@/types/video'

interface PortfolioServiceItemProps {
  service: Service
}

defineProps<PortfolioServiceItemProps>()
</script>

<style scoped lang="scss">
.column-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
