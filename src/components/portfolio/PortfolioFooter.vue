<template>
  <footer class="portfolio-footer scroll-away">
    <div class="footer-content">
      <div class="footer-text">
        <h2 class="footer-heading">Andy + Immanuel Media</h2>
        <h3 class="footer-subheading">Portfolio</h3>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No props or logic needed for this component
</script>

<style scoped lang="scss">
// Portfolio Footer
.portfolio-footer {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; /* High z-index to ensure it's above all content */
  pointer-events: auto; /* Enable pointer events to block interactions */
  
  .footer-content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    pointer-events: auto; /* Ensure content can capture events */
  }
  
  .footer-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: .5rem; /* Match navigation left padding */
    pointer-events: auto; /* Ensure text can capture events */
  }
  
  .footer-heading {
    font-family: 'IvyOra', serif;
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 400;
    line-height: 1.1;
    margin: 0 0 0.5rem 0;
    color: #fff;
  }
  
  .footer-subheading {
    font-family: 'IvyOra', serif;
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 400;
    line-height: 1.1;
    margin: 0 0 2rem 0;
    color: #fff;
  }
  
  .footer-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .footer-role,
  .footer-location {
    font-family: 'IvyOra', serif;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.4;
    margin: 0;
    color: #fff;
    opacity: 0.9;
  }
  
  .footer-copyright {
    align-self: flex-end;
    margin-bottom: 2rem;
    
    span {
      font-family: 'IvyOra', serif;
      font-size: 0.875rem;
      font-weight: 300;
      color: #fff;
      opacity: 0.8;
    }
  }
}

// Mobile Styles
@media (max-width: 768px) {
  .portfolio-footer {
    .footer-content {
      padding: 0 0.5rem;
    }
    
    .footer-text {
      padding-left: 1rem; /* Match mobile navigation left padding */
    }
    
    .footer-heading {
      font-size: clamp(1.5rem, 8vw, 2.5rem);
    }
    
    .footer-subheading {
      font-size: clamp(1.25rem, 6vw, 2rem);
    }
    
    .footer-info {
      margin-top: 0.5rem;
    }
    
    .footer-role,
    .footer-location {
      font-size: 0.75rem;
    }
  }
}
</style> 