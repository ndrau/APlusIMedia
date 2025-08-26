<template>
  <n-el class="info-page">
    <!-- Portfolio Navigation -->
    <PortfolioNavigation />

    <!-- Portfolio Navigation Footer -->
    <PortfolioNavFooter />
    
    <div class="container-a">
      <!-- Main Content -->
      <main class="info-content">
        <!-- Top Spacer -->
        <div class="top-spacer"></div>
        
        <!-- Biography Section -->
        <section class="biography">
          <p class="bio-text">
            Wir sind Immanuel und Andy – ein kreatives Duo aus Rottweil. Mit unserem besonderen Stil und unserer eigenen Herangehensweise an die Filmproduktion haben wir uns einen Namen gemacht.
          </p>
          <p class="bio-quote">Wir brauchen keinen Slogan – unsere Arbeit spricht für sich.</p>
        </section>



        <!-- Career Background Section -->
        <section class="career-background-section">
          <p class="career-background-text">
            Bevor wir unsere Leidenschaft für die Videografie entdeckt haben, haben wir beide unterschiedliche Karrierewege eingeschlagen.
            Immanuel arbeitet als Architekt und Andy ist Software-Entwickler. Diese vielfältigen Erfahrungen bereichern unsere Arbeit
            als Videografen und bringen frische Perspektiven in jedes Projekt. Heute widmen wir uns mit voller Hingabe der Filmproduktion
            und erschaffen emotionale Geschichten, die Menschen berühren.
          </p>
        </section>

        <!-- Team CV Component -->
        <TeamCV />

                <!-- Three Column Layout -->
                <div class="content-grid">
          <!-- Experience Section -->
          <section class="content-section">
            <h2 class="section-title">Erfahrung</h2>
            <div class="experience-list">
              <div class="experience-item">
                <h3 class="company">Freelance Videografie</h3>
                <p class="role">Videograf & Editor (2020-Gegenwart)</p>
              </div>
              <div class="experience-item">
                <h3 class="company">Eventproduktion</h3>
                <p class="role">Kamera & Postproduktion (2019-2023)</p>
              </div>
              <div class="experience-item">
                <h3 class="company">Werbeagenturen</h3>
                <p class="role">Videoproduktion für Kunden (2018-2022)</p>
              </div>
              <div class="experience-item">
                <h3 class="company">Dokumentarfilm</h3>
                <p class="role">Kamera & Schnitt (2021-2024)</p>
              </div>
            </div>
          </section>

          <!-- Recognition Section -->
          <section class="content-section">
            <h2 class="section-title">Auszeichnungen</h2>
            <div class="recognition-list">
              <div class="recognition-item">
                <h3 class="award">Filmfestival Baden-Württemberg</h3>
                <p class="project">Nominierung für "Schau Sonntag" (2024)</p>
              </div>
              <div class="recognition-item">
                <h3 class="award">Deutscher Videopreis</h3>
                <p class="project">Finalist in der Kategorie Dokumentation (2023)</p>
              </div>
              <div class="recognition-item">
                <h3 class="award">Lokalpreis Rottweil</h3>
                <p class="project">Beste Dokumentation (2022)</p>
              </div>
              <div class="recognition-item">
                <h3 class="award">Studentenfilmfestival</h3>
                <p class="project">Publikumspreis für "Griechenland" (2021)</p>
              </div>
              <div class="recognition-item">
                <h3 class="award">Kreativpreis Südwest</h3>
                <p class="project">Nominierung für "Jordanien" (2023)</p>
              </div>
            </div>
          </section>

          <!-- Coverage Section -->
          <section class="content-section">
            <h2 class="section-title">Veröffentlichungen</h2>
            <p class="coverage-text">
              Schwarzwälder Bote, Rottweiler Zeitung, SWR Fernsehen, Regio TV, Filmzeit Baden-Württemberg, Videoproduzenten Magazin, Kreativwirtschaft Südwest, Dokumentarfilm.de, Filmemacher.de, Videografie Magazin, Eventproduktion.de, Kamera & Co, Schnitt Online
            </p>
          </section>
        </div>

        <!-- Brands Section -->
        <section class="brands-section">
          <h2 class="section-title">Kunden & Partner</h2>
          <p class="brands-text">
            Öschberghof, Esszeit Weber, Johanniterbad Rottweil, Schwarzwaldküchen, Stadt Rottweil.
          </p>
        </section>

        <!-- Bottom Spacer -->
        <div class="bottom-spacer"></div>
      </main>
    </div>
  </n-el>
</template>

<script setup lang="ts">
import PortfolioNavigation from '@/components/portfolio/PortfolioNavigation.vue'
import PortfolioNavFooter from '@/components/portfolio/PortfolioNavFooter.vue'
import TeamCV from '@/components/portfolio/TeamCV.vue'
</script>

<style scoped lang="scss">
.info-page {
  min-height: 100vh;
  min-width: 320px;
  background-color: #F5F5F5;
  color: #333333;
  font-family: 'Georgia', serif;
  line-height: 1.6;
  position: relative;
  
  // Add gradient overlay at the bottom to fade out content
  &::after {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 15vh;
    background: linear-gradient(to bottom, transparent 0%, white 40%);
    pointer-events: none;
    z-index: 50;
  }
  
  // Add gradient overlay at the top to fade out content
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 15vh;
    background: linear-gradient(to top, transparent 0%, white 40%);
    pointer-events: none;
    z-index: 50;
  }
}

.container-a {
  width: 100%;
  margin: 0;
  padding: 2rem;
  padding-top: 6rem; // Add top padding to account for fixed navigation
}

// Main Content
.info-content {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}

// Biography Section
.biography {
  margin-bottom: 4rem;
}

.bio-text {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 800px;
}

.bio-quote {
  font-size: 1.1rem;
  font-style: italic;
  margin: 0;
  color: #555555;
}

// Content Grid
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.content-section {
  .section-title {
    font-family: 'Georgia', serif;
    font-size: 1.1rem;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 1.5rem;
    color: #333333;
  }
}

// Experience Section
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.experience-item {
  .company {
    font-family: 'Georgia', serif;
    font-size: 1rem;
    font-weight: bold;
    margin: 0 0 0.3rem 0;
    color: #333333;
  }

  .role {
    font-family: 'Georgia', serif;
    font-size: 0.9rem;
    margin: 0 0 0 1rem;
    color: #555555;
  }
}

// Recognition Section
.recognition-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.recognition-item {
  .award {
    font-family: 'Georgia', serif;
    font-size: 1rem;
    font-weight: normal;
    margin: 0 0 0.3rem 0;
    color: #333333;
  }

  .project {
    font-family: 'Georgia', serif;
    font-size: 0.9rem;
    margin: 0 0 0 1rem;
    color: #555555;
  }
}

// Coverage Section
.coverage-text {
  font-family: 'Georgia', serif;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
  color: #555555;
}

// Brands Section
.brands-section {
  margin-top: 2rem;

  .section-title {
    font-family: 'Georgia', serif;
    font-size: 1.1rem;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 1.5rem;
    color: #333333;
  }
}

.brands-text {
  font-family: 'Georgia', serif;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
  color: #555555;
}

// Career Background Section
.career-background-section {
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.career-background-text {
  font-family: 'Georgia', serif;
  font-size: 1rem;
  line-height: 1.7;
  color: #555555;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  font-style: italic;
  position: relative;

  // Add a subtle quote styling
  &::before {
    content: '"';
    font-size: 3rem;
    color: #999;
    position: absolute;
    top: -20px;
    left: -30px;
    font-family: 'Georgia', serif;
  }

  &::after {
    content: '"';
    font-size: 3rem;
    color: #999;
    position: absolute;
    bottom: -40px;
    right: -30px;
    font-family: 'Georgia', serif;
  }
}

// Top Spacer
.top-spacer {
  height: 15vh;
  width: 100%;
}

// Bottom Spacer
.bottom-spacer {
  height: 15vh;
  width: 100%;
}

// Responsive Design
@media (max-width: 768px) {
  .container {
    padding: 3rem;
    padding-top: 5rem; // Adjust top padding for mobile
    
    &::after {
      height: 80px; // Slightly smaller gradient for mobile
    }
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .career-background-section {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  .career-background-text {
    font-size: 0.95rem;
    max-width: 600px;

    &::before,
    &::after {
      display: none; // Hide quote marks on mobile for cleaner look
    }
  }

  .bio-text {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 2rem;
    padding-top: 4rem; // Adjust top padding for smaller screens

    &::after {
      height: 60px; // Even smaller gradient for very small screens
    }
  }

  .career-background-section {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  .career-background-text {
    font-size: 0.9rem;
    max-width: 500px;
  }

  .bio-text {
    font-size: 1rem;
  }
}
</style> 