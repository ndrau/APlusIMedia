<template>
  <div 
    class="portfolio-scroll-hint" 
    @click="scrollToTarget"
  >
    <p class="scroll-text">{{ text }}</p>
    <div class="scroll-arrow">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  targetId?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Scroll to Explore Portfolio',
  targetId: 'portfolio-content'
})

const scrollToTarget = () => {
  const targetElement = document.getElementById(props.targetId)
  if (targetElement) {
    // Our navigation uses the class `.portfolio-nav` and is fixed
    const navBar = document.querySelector('.portfolio-nav') as HTMLElement | null
    const navHeight = navBar ? navBar.getBoundingClientRect().height : 70
    const elementPosition = targetElement.offsetTop - navHeight
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped lang="scss">
.portfolio-scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.3s ease;
  color: white;
  
  &:hover {
    opacity: 0.8;
  }

  .scroll-text {
    font-size: 0.875rem;
    color: white;
    margin: 0 0 0.5rem 0;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
    font-weight: 300;
    letter-spacing: 0.5px;
  }

  .scroll-arrow {
    animation: bounce 2s infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      color: white;
      filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.7));
    }
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-8px);
  }
  70% {
    transform: translateY(-4px);
  }
  90% {
    transform: translateY(-2px);
  }
}

// Mobile responsive
@media (max-width: 768px) {
  .portfolio-scroll-hint {
    .scroll-text {
      font-size: 0.75rem;
    }
    
    .scroll-arrow svg {
      width: 20px;
      height: 20px;
    }
  }
}

@media (max-width: 480px) {
  .portfolio-scroll-hint {
    .scroll-text {
      font-size: 0.7rem;
    }
    
    .scroll-arrow svg {
      width: 18px;
      height: 18px;
    }
  }
}
</style> 