<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import {
  NButton,
  NIcon,
  NMenu,
  NSpace,
  NLayoutHeader
} from 'naive-ui'
import SocialLinks from '@/components/shared/SocialLinks.vue'
import { ThemeToggle, LanguageToggle, MobileDrawer, MobileMenuButton } from '@/components/NavigationBar'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)
const showMobileMenu = ref(false)

const menuOptions = [
  {
    label: () => t('nav.work'),
    key: 'work',
    href: '#work'
  },
  {
    label: () => t('nav.benefits'),
    key: 'benefits',
    href: '#benefits'
  },
  {
    label: () => t('nav.about'),
    key: 'about',
    href: '#about'
  },
  {
    label: () => t('nav.testimonials'),
    key: 'testimonials',
    href: '#testimonials'
  },
  // {
  //   label: () => t('nav.packages'),
  //   key: 'packages',
  //   href: '#packages'
  // },
  {
    label: () => t('nav.contact'),
    key: 'contact',
    href: '#contact'
  },
  {
    label: () => t('nav.info'),
    key: 'info',
    href: '/info'
  }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleMenuSelect = (key: string) => {
  const option = menuOptions.find(opt => opt.key === key)
  if (option?.href) {
    if (option.href.startsWith('#')) {
      // If we're not on the homepage, navigate there first, then scroll to section
      if (route.path !== '/') {
        router.push('/').then(() => {
          // Wait for the page to load, then scroll to section
          setTimeout(() => {
            const element = document.querySelector(option.href) as HTMLElement
            if (element) {
              const navBar = document.querySelector('.nav') as HTMLElement
              const navHeight = navBar ? navBar.offsetHeight : 70
              const elementPosition = element.offsetTop - navHeight
              window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
              })
            }
          }, 100)
        })
      } else {
        // We're already on homepage, just scroll to section
        const element = document.querySelector(option.href) as HTMLElement
        if (element) {
          const navBar = document.querySelector('.nav') as HTMLElement
          const navHeight = navBar ? navBar.offsetHeight : 70
          const elementPosition = element.offsetTop - navHeight
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })
        }
      }
    } else {
      // Navigate to route using Vue Router
      router.push(option.href)
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <n-layout-header class="nav" :class="{ scrolled: isScrolled }" bordered>
      <div class="nav-container">
        <!-- Spacer to balance burger menu on mobile -->
        <div class="nav-spacer"></div>
        
        <router-link to="/" class="nav-brand">
          <span class="nav-brand-text">{{ $t('nav.brand') }}</span>
        </router-link>
        
        <!-- Desktop Menu -->
        <div class="nav-menu">
          <n-menu
            mode="horizontal"
            :options="menuOptions"
            @update:value="handleMenuSelect"
            :root-indent="12"
          />
        </div>
        
        <!-- Desktop Controls -->
        <n-space class="nav-controls-desktop">
          <!-- Social Media Links for Desktop -->
          <SocialLinks 
            :show-tiktok="false"
            :show-linkedin="false"
            :show-youtube="false"
            :icon-size="20"
            :centered="false"
            :track-clicks="true"
            location="nav"
          />
          <!-- Spacer -->
          <div class="nav-controls-spacer"></div>
          <ThemeToggle 
            :icon-size="20"
            :show-tooltip="false"
          />
          <LanguageToggle 
            :icon-size="20"
            :show-tooltip="false"
            :show-language-code="false"
          />
        </n-space>

        <!-- Mobile Menu Button -->
        <MobileMenuButton @click="showMobileMenu = true" />
      </div>

    <!-- Mobile Menu Drawer -->
    <MobileDrawer
      v-model:show="showMobileMenu"
      :menu-options="menuOptions"
      @menu-select="handleMenuSelect"
    />
  </n-layout-header>
</template>

<style scoped lang="scss">
// Navigation Styles using Naive UI Layout Header
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &.scrolled {
    box-shadow: var(--box-shadow-2);
  }
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  gap: 3rem; // Add space between nav elements
}

.nav-brand {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }

  .nav-brand-text {
    // Keep name visible on all screen sizes
    display: block;
  }
}

// Desktop Menu
.nav-menu {
  display: none;

  @media (min-width: 1050px) {
    display: flex;
    flex: 1;
    justify-content: center;
    margin-left: 2rem; // Additional space from brand name
  }
}

// Desktop Controls - completely hidden on mobile
.nav-controls-desktop {
  display: none !important;

  @media (min-width: 1050px) {
    display: flex !important;
    align-items: center;
    gap: 1rem;
  }

  .nav-controls-spacer {
    width: 1px;
    height: 24px;
    background: var(--border-color);
    margin: 0 0.5rem;
  }
}

// Mobile Drawer styles are now in MobileDrawer.vue component
// Mobile menu button styles are now in MobileMenuButton.vue component

// Spacer element - only visible on mobile to balance the burger menu
.nav-spacer {
  display: none;

  @media (max-width: 1049px) {
    display: block;
    width: 40px; // Same width as mobile menu button
    flex-shrink: 0;
  }
}

@media (max-width: 1049px) {
  .nav-container {
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-brand {
    // Center the brand name on mobile using flexbox
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .mobile-menu-button {
    // Position burger menu on the right using flexbox
    flex-shrink: 0;
    width: 40px; // Fixed width to match spacer
  }
}
</style>

 