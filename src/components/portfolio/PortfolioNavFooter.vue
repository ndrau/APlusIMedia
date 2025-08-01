<template>
  <div class="portfolio-nav-footer">
    <!-- Bottom Left -->
    <div class="nav-bottom-left">
      <span class="nav-text">Videography made in</span>
      <span class="nav-text sub">Rottweil, Germany</span>
    </div>

    <!-- Bottom Right -->
    <div class="nav-bottom-right">
      <span class="nav-text">©2025</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or logic needed for this component
</script>

<style scoped lang="scss">
// Footer Elements
.portfolio-nav-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 100;
  mix-blend-mode: difference;
  
  .nav-bottom-left,
  .nav-bottom-right {
    position: absolute;
    pointer-events: auto;
    padding: 0.5rem;
    border-radius: 4px;
  }
  
  .nav-bottom-left {
    bottom: 2rem;
    left: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .nav-bottom-right {
    bottom: 2rem;
    right: 2rem;
  }
  
  .nav-text {
    font-family: 'IvyOra', serif;
    font-size: 0.75rem;
    font-weight: 300;
    color: #ffffff;
    opacity: 0.8;

    &.sub {
      font-style: italic;
    }
  }
}

// Mobile Styles
@media (max-width: 768px) {
  .portfolio-nav-footer {
    .nav-bottom-left,
    .nav-bottom-right {
      position: fixed;
      pointer-events: auto;
      padding: 0.5rem;
      border-radius: 4px;
      z-index: 100;
    }
    
    .nav-bottom-left {
      bottom: 1rem;
      left: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .nav-bottom-right {
      bottom: 1rem;
      right: 1rem;
    }
    
    .nav-text {
      font-size: 0.625rem;
    }
  }
}
</style> 