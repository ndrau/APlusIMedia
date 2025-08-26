<template>
  <div class="service-card" :class="`service-${service.aspectRatio || 'horizontal'}`">
    <div class="service-content" :class="`service-content-${service.aspectRatio || 'horizontal'}`">
      <div class="service-header">
        <div v-if="service.icon" class="service-icon">
          <component :is="service.icon" size="48" />
        </div>
        <h3 class="service-title">{{ service.title }}</h3>
        <p class="service-description">{{ service.description }}</p>
      </div>

      <div class="service-body">
        <div class="service-text" v-html="service.content"></div>

        <div v-if="service.features && service.features.length" class="service-features">
          <h4>Key Features:</h4>
          <ul>
            <li v-for="feature in service.features" :key="feature">{{ feature }}</li>
          </ul>
        </div>
      </div>

      <div v-if="service.ctaText && service.ctaLink" class="service-footer">
        <a :href="service.ctaLink" class="service-cta" :target="service.ctaLink.startsWith('http') ? '_blank' : '_self'">
          {{ service.ctaText }}
          <svg v-if="service.ctaLink.startsWith('http')" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="15,18 21,18 21,12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Service } from '@/types/video'

interface ServiceCardProps {
  service: Service
}

const props = defineProps<ServiceCardProps>()
</script>

<style scoped lang="scss">
.service-card {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);

  .service-content {
    max-width: 600px;
    width: 100%;
    text-align: center;
    color: #1a1a1a;

    .service-header {
      margin-bottom: 2rem;

      .service-icon {
        margin-bottom: 1.5rem;
        opacity: 0.8;

        :deep(svg) {
          color: #1a1a1a;
        }
      }

      .service-title {
        font-family: 'IvyOra', serif;
        font-size: clamp(1.5rem, 3vw, 2.5rem);
        font-weight: 400;
        margin: 0 0 1rem 0;
        line-height: 1.2;
      }

      .service-description {
        font-family: 'IvyOra', serif;
        font-size: clamp(1rem, 1.5vw, 1.25rem);
        margin: 0;
        opacity: 0.8;
        line-height: 1.4;
      }
    }

    .service-body {
      margin-bottom: 2rem;

      .service-text {
        font-family: 'IvyOra', serif;
        font-size: clamp(0.9rem, 1.2vw, 1.1rem);
        line-height: 1.6;
        margin-bottom: 2rem;
        opacity: 0.9;

        :deep(p) {
          margin: 0 0 1rem 0;

          &:last-child {
            margin-bottom: 0;
          }
        }

        :deep(strong) {
          font-weight: 500;
          opacity: 1;
        }

        :deep(em) {
          font-style: italic;
          opacity: 0.9;
        }
      }

      .service-features {
        text-align: left;
        max-width: 400px;
        margin: 0 auto;

        h4 {
          font-family: 'IvyOra', serif;
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          font-weight: 500;
          margin: 0 0 1rem 0;
          opacity: 0.9;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            font-family: 'IvyOra', serif;
            font-size: clamp(0.85rem, 1.1vw, 1rem);
            line-height: 1.5;
            padding: 0.5rem 0;
            position: relative;
            padding-left: 1.5rem;
            opacity: 0.8;

            &::before {
              content: "✓";
              position: absolute;
              left: 0;
              color: #1a1a1a;
              font-weight: bold;
              opacity: 0.7;
            }
          }
        }
      }
    }

    .service-footer {
      .service-cta {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'IvyOra', serif;
        font-size: clamp(0.9rem, 1.3vw, 1.1rem);
        font-weight: 500;
        text-decoration: none;
        color: #1a1a1a;
        background: rgba(0, 0, 0, 0.05);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.1);

        &:hover {
          background: rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
          border-color: rgba(0, 0, 0, 0.2);
        }

        svg {
          transition: transform 0.3s ease;
        }

        &:hover svg {
          transform: translate(2px, -2px);
        }
      }
    }
  }
}

// Different aspect ratios
.service-horizontal {
  .service-content-horizontal {
    max-width: 700px;
  }
}

.service-vertical {
  .service-content-vertical {
    max-width: 500px;
  }
}

.service-square {
  .service-content-square {
    max-width: 550px;
  }
}

// Mobile responsive
@media (max-width: 768px) {
  .service-card {
    padding: 1.5rem;

    .service-content {
      .service-header {
        margin-bottom: 1.5rem;

        .service-title {
          font-size: clamp(1.2rem, 6vw, 1.8rem);
        }

        .service-description {
          font-size: clamp(0.9rem, 4vw, 1.1rem);
        }
      }

      .service-body {
        margin-bottom: 1.5rem;

        .service-text {
          font-size: clamp(0.8rem, 3.5vw, 1rem);
        }

        .service-features {
          ul li {
            font-size: clamp(0.8rem, 3vw, 0.9rem);
          }
        }
      }
    }
  }
}
</style>
