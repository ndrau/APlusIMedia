<template>
  <nav class="portfolio-nav">
    <!-- Top Left -->
    <div class="nav-top-left">
      <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
      <!-- <router-link to="/" class="nav-link">Film</router-link> -->
      <!-- <router-link to="/" class="nav-link">Gallery</router-link> -->
      <!-- <router-link to="/" class="nav-link">Index</router-link> -->
    </div>

    <!-- Top Center -->
    <div class="nav-top-center">
      <span class="brand-name">A + I Media</span>
    </div>

    <!-- Top Right -->
    <div class="nav-top-right">
      <router-link to="/info" class="nav-link">Info</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
// No props or logic needed for this component
</script>

<style scoped lang="scss">
// Navigation Elements
.portfolio-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 100;
  mix-blend-mode: difference;
  // max-width: 1200px;
  margin: 0 auto;
  
  .nav-top-left,
  .nav-top-right {
    position: absolute;
    pointer-events: auto;
    padding: 0.5rem;
    border-radius: 4px;
  }
  
  .nav-top-left {
    top: 2rem;
    left: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nav-top-center {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: auto;
  }
  
  .nav-top-right {
    top: 2rem;
    right: 2rem;
  }
  

  
  .nav-link {
    color: #ffffff;
    text-decoration: none;
    font-family: 'IvyOra', serif;
    font-size: 0.875rem;
    font-weight: 300;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-color);
      opacity: 1;
    }
  }
  
  .brand-name {
    font-family: 'IvyOra', serif;
    font-size: 2rem;
    font-weight: 300;
    color: #ffffff;
  }
  

}

// Mobile Styles
@media (max-width: 768px) {
  .portfolio-nav {
    .nav-top-left,
    .nav-top-right {
      position: fixed;
      pointer-events: auto;
      padding: 0.5rem;
      border-radius: 4px;
      z-index: 100;
    }
    
    .nav-top-left {
      top: 1rem;
      left: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .nav-top-center {
      position: fixed;
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 200;
    }
    
    .nav-top-right {
      top: 1rem;
      right: 1rem;
    }
    
    .nav-link {
      font-size: 0.75rem;
    }
    
    .brand-name {
      font-size: 1rem;
    }
  }
}
</style> 