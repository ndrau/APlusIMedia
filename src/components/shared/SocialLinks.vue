<template>
  <n-el class="social-links" :class="{ 'centered': centered }">
    <a 
      v-if="showInstagram"
      :href="socialLinks.instagram" 
      target="_blank" 
      rel="noopener noreferrer"
      class="social-link"
      :class="linkClass"
      title="Instagram"
      @click="() => handleSocialClick('instagram')"
    >
      <n-icon :size="iconSize">
        <SocialIcon type="instagram" />
      </n-icon>
    </a>
    <a 
      v-if="showYoutube"
      :href="socialLinks.youtube" 
      target="_blank" 
      rel="noopener noreferrer"
      class="social-link"
      :class="linkClass"
      title="YouTube"
      @click="() => handleSocialClick('youtube')"
    >
      <n-icon :size="iconSize">
        <SocialIcon type="youtube" />
      </n-icon>
    </a>
    <a 
      v-if="showTiktok"
      :href="socialLinks.tiktok" 
      target="_blank" 
      rel="noopener noreferrer"
      class="social-link"
      :class="linkClass"
      title="TikTok"
      @click="() => handleSocialClick('tiktok')"
    >
      <n-icon :size="iconSize">
        <SocialIcon type="tiktok" />
      </n-icon>
    </a>
    <a 
      v-if="showLinkedin"
      :href="socialLinks.linkedin" 
      target="_blank" 
      rel="noopener noreferrer"
      class="social-link"
      :class="linkClass"
      title="LinkedIn"
      @click="() => handleSocialClick('linkedin')"
    >
      <n-icon :size="iconSize">
        <SocialIcon type="linkedin" />
      </n-icon>
    </a>
    <a 
      v-if="showGoogle"
      :href="socialLinks.google" 
      target="_blank" 
      rel="noopener noreferrer"
      class="social-link"
      :class="linkClass"
      title="Google"
      @click="() => handleSocialClick('google')"
    >
      <n-icon :size="iconSize">
        <SocialIcon type="location" />
      </n-icon>
    </a>
  </n-el>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NIcon, NEl } from 'naive-ui'
import SocialIcon from '@/components/shared/SocialIcon.vue'

interface Props {
  showInstagram?: boolean
  showYoutube?: boolean
  showTiktok?: boolean
  showLinkedin?: boolean
  showGoogle?: boolean
  iconSize?: number | string
  centered?: boolean
  linkClass?: string
  trackClicks?: boolean
  location?: string
}

const props = withDefaults(defineProps<Props>(), {
  showInstagram: true,
  showYoutube: true,
  showTiktok: true,
  showLinkedin: true,
  showGoogle: true,
  iconSize: 24,
  centered: true,
  linkClass: '',
  trackClicks: true,
  location: ''
})

// Environment variables for social media links
const socialLinks = computed(() => ({
  instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || 'https://instagram.com/andyrau',
  youtube: import.meta.env.VITE_SOCIAL_YOUTUBE || 'https://youtube.com/@andyrau',
  tiktok: import.meta.env.VITE_SOCIAL_TIKTOK || 'https://tiktok.com/@andyrau',
  linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || 'https://linkedin.com/in/andyrau',
  google: import.meta.env.VITE_SOCIAL_GOOGLE || 'https://maps.app.goo.gl/xurnrMdWGN5FdEVP7'
}))

const handleSocialClick = (platform: string) => {
  // Track social link clicks with Umami if enabled
  if (props.trackClicks && window.umami) {
    const prefix = props.location ? `${props.location}_` : ''
    window.umami.track(`${prefix}social_${platform}_click`)
  }
}
</script>

<style scoped lang="scss">
.social-links {
  display: flex;
  gap: 1rem;

  &.centered {
    justify-content: center;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: var(--text-color-2);
    transition: all 0.3s ease;

    &:hover {
      color: var(--primary-color-hover);
      transform: translateY(-2px);
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .social-links {
    &.centered {
      justify-content: center;
    }
  }
}
</style> 