<template>
  <!-- CV Sections -->
  <section class="cv-sections">
    <div class="cv-grid">
      <!-- Immanuel CV -->
      <div class="cv-card">
        <div class="cv-image-container">
          <img
            src="/images/Immanuel.webp"
            alt="Andy - Editor & Produzent"
            class="cv-image"
          />
        </div>
        <div class="cv-content">
          <h3 class="cv-name">Immanuel</h3>
          <p class="cv-title">Videograf & Architekt</p>
          <div class="cv-summary">
            <p>Als Architekt und Videograf kombiniert Immanuel seine Expertise in räumlichem Denken und Design mit kreativer Filmproduktion. Mit über 8 Jahren Erfahrung in der Filmbranche realisiert er Dokumentarfilme, Werbespots und Eventproduktionen.</p>
            <p>Sein architektonischer Hintergrund verleiht seinen Videos eine einzigartige Ästhetik und präzise Bildkomposition.</p>
          </div>

          <!-- Werdegang -->
          <div class="cv-career">
            <h4 class="career-title">Werdegang</h4>
            <ul class="career-list">
              <li><strong>2020-heute:</strong> Freelance Videograf & Filmemacher</li>
              <li><strong>2018-heute:</strong> Architekt bei verschiedenen Büros in Rottweil</li>
              <li><strong>2012-2018:</strong> Architekturstudium, Hochschule Biberach</li>
              <li><strong>Aufgaben:</strong> 3D-Visualisierung, Bauleitung, Filmproduktion</li>
            </ul>
          </div>

          <div class="cv-highlights">
            <span class="highlight-tag">Architektur</span>
            <span class="highlight-tag">Dokumentarfilm</span>
            <span class="highlight-tag">Bildkomposition</span>
          </div>
        </div>
      </div>

      <!-- Andy CV -->
      <div class="cv-card">
        <div class="cv-image-container">
          <img
            src="/images/social-profile.png"
            alt="Andy - Editor & Produzent"
            class="cv-image"
          />
        </div>
        <div class="cv-content">
          <h3 class="cv-name">Andy</h3>
          <p class="cv-title">Videograf & Software Entwickler</p>
          <div class="cv-summary">
            <p>Andy ist Software-Entwickler und kreativer Kopf hinter der Postproduktion. Mit 7 Jahren Erfahrung in Filmschnitt und Videoproduktion übernimmt er die gesamte technische Umsetzung und digitale Nachbearbeitung.</p>
            <p>Sein Hintergrund in Software-Entwicklung ermöglicht innovative technische Lösungen und präzise visuelle Konzepte, die den Zuschauer emotional berühren.</p>
          </div>

          <!-- Werdegang -->
          <div class="cv-career">
            <h4 class="career-title">Werdegang</h4>
            <ul class="career-list">
              <li><strong>2019-heute:</strong> Freelance Editor & Postproduktion</li>
              <li><strong>2014-2018:</strong> Software-Entwickler bei verschiedenen IT-Unternehmen</li>
              <li><strong>2010-2014:</strong> Studium Medieninformatik, Hochschule Furtwangen</li>
              <li><strong>Aufgaben:</strong> Web-Entwicklung, Datenbanken, Videobearbeitung</li>
            </ul>
          </div>

          <div class="cv-highlights">
            <span class="highlight-tag">Software-Entwicklung</span>
            <span class="highlight-tag">Filmschnitt</span>
            <span class="highlight-tag">Digitale Postproduktion</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No additional logic needed for this component
</script>

<style scoped lang="scss">
// CV Sections
.cv-sections {
  margin-top: 4rem;
}

.cv-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.cv-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cv-image-container {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.cv-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.cv-card:hover .cv-image {
  transform: scale(1.05);
}

.cv-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cv-name {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 0.5rem;
}

.cv-title {
  font-family: 'Georgia', serif;
  font-size: 1rem;
  color: #555555;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.cv-summary {
  flex: 1;
  margin-bottom: 1.5rem;

  p {
    font-family: 'Georgia', serif;
    font-size: 0.9rem;
    line-height: 1.6;
    color: #555555;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

// Werdegang
.cv-career {
  margin-bottom: 1.5rem;

  .career-title {
    font-family: 'Georgia', serif;
    font-size: 1rem;
    font-weight: bold;
    color: #333333;
    margin-bottom: 0.75rem;
    font-style: italic;
  }

  .career-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-family: 'Georgia', serif;
      font-size: 0.85rem;
      line-height: 1.5;
      color: #555555;
      margin-bottom: 0.5rem;
      position: relative;
      padding-left: 1rem;

      &:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #999;
        font-weight: bold;
      }

      strong {
        color: #333333;
        font-weight: normal;
        font-style: italic;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.cv-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.highlight-tag {
  background: #f0f0f0;
  color: #666666;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-family: 'Georgia', serif;
  font-size: 0.8rem;
  font-weight: normal;
}

// Mobile responsive
@media (max-width: 768px) {
  .cv-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .cv-content {
    padding: 1.5rem;
  }

  .cv-image-container {
    height: 200px;
  }

  .cv-career {
    .career-list {
      li {
        font-size: 0.8rem;
        padding-left: 0.75rem;

        strong {
          display: block;
          margin-bottom: 0.25rem;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .cv-content {
    padding: 1rem;
  }

  .cv-name {
    font-size: 1.3rem;
  }

  .cv-career {
    .career-title {
      font-size: 0.9rem;
    }

    .career-list {
      li {
        font-size: 0.75rem;
        padding-left: 0.5rem;
      }
    }
  }
}
</style>
