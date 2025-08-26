<template>
  <nav class="portfolio-nav">
    <!-- Top Left -->
    <div class="nav-top-left">
      <router-link :to="{ name: 'portfolio' }" class="nav-link nav-link-1">Portfolio</router-link>
      <router-link :to="{ name: 'wedding' }" class="nav-link nav-link-2">Hochzeitsfotografie</router-link>
      <!-- <router-link to="/" class="nav-link">Film</router-link> -->
      <!-- <router-link to="/" class="nav-link">Gallery</router-link> -->
      <!-- <router-link to="/" class="nav-link">Index</router-link> -->
    </div>

    <!-- Top Center -->
    <div class="nav-top-center">
      <router-link :to="{ name: 'portfolio' }" class="brand-name" aria-label="A plus I Media – Home">A + I Media</router-link>
    </div>

    <!-- Top Right -->
    <div class="nav-top-right">
      <router-link to="/info" class="nav-link">Info</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
// No additional logic needed for basic navigation
</script>

<style scoped lang="scss">
// Navigation styles

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
    transition: color 0.3s ease, transform 0.6s ease;
    transform: translateY(30px);
    opacity: 0;
    animation: navEaseIn 0.8s ease-out forwards;

    &:hover {
      color: var(--primary-color);
    }
  }

  // Staggered animation delays for nav items
  .nav-link-1 {
    animation-delay: 0.2s;
  }

  .nav-link-2 {
    animation-delay: 0.4s;
  }

  // Navigation ease-in animation
  @keyframes navEaseIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
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
      transform: translateY(20px); // Slightly less movement on mobile
      animation: navEaseIn 0.6s ease-out forwards;
    }

    // Mobile animation delays
    .nav-link-1 {
      animation-delay: 0.1s;
    }

    .nav-link-2 {
      animation-delay: 0.25s;
    }

    .brand-name {
      font-size: 1rem;
    }
  }
}
</style> 