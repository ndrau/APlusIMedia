<template>
  <div class="hero-content">
    <h1 class="hero-title fade-in-up">{{ title }}</h1>
    <p class="hero-subtitle fade-in-up-delayed">{{ subtitle }}</p>
    
    <!-- Scroll Hint -->
    <div class="hero-scroll-hint fade-in-up-more-delayed">
      <PortfolioScrollHint 
        text="Scroll to Explore Portfolio"
        target-id="portfolio-content"
      />
    </div>
    
    <!-- <div class="hero-cta fade-in-up-more-delayed">
      <button class="cta-button" @click="$emit('togglePlay')">
        {{ isPlaying ? 'Pause Experience' : 'Play Experience' }}
      </button>
      <button class="cta-button" @click="$emit('toggleMute')">
        {{ isMuted ? 'Enable Sound' : 'Disable Sound' }}
      </button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import PortfolioScrollHint from '@/components/portfolio/PortfolioScrollHint.vue'

interface Props {
  title?: string
  subtitle?: string
  isPlaying: boolean
  isMuted: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Portfolio',
  subtitle: 'Creative work and visual storytelling'
})

defineEmits<{
  togglePlay: []
  toggleMute: []
}>()
</script>

<style scoped>
.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 2rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  line-height: 1.6;
  font-weight: 300;
}

.hero-scroll-hint {
  margin-top: 2rem;
  position: relative;
}

.hero-cta {
  /* No additional styles needed - using animation class */
}

.cta-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  margin: 0 0.5rem;
}

.cta-button:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  
  .hero-content {
    padding: 0.5rem;
  }
  
  .cta-button {
    padding: 0.8rem 2rem;
    font-size: 1rem;
    margin: 0.25rem;
  }
  
  .hero-scroll-hint {
    margin-top: 1rem; /* Comfortable spacing on mobile */
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 1rem; /* Further reduced for very small screens */
  }
  
  .hero-scroll-hint {
    margin-top: 0.75rem; /* Slightly less spacing on very small screens */
  }
}


</style> 