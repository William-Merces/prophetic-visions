<template>
  <div class="home">
    <!-- Camada de fundo com animação de estrelas -->
    <div class="stars-background">
      <!-- Estrelas geradas via JavaScript no mounted() -->
    </div>

    <!-- Camada de efeitos visuais -->
    <div class="visual-effects">
      <div class="celestial-rays"></div>
      <div class="divine-presence"></div>
    </div>

    <!-- Seção do herói / introdução -->
    <div class="hero-section">
      <h1 class="hero-title">Visões Proféticas</h1>
      <p class="hero-subtitle">Uma jornada imersiva pelas visões divinas reveladas aos profetas</p>

      <div class="hero-actions">
        <router-link to="/apocalypse/1" class="btn-primary btn-hero">
          Iniciar Jornada
          <span class="btn-icon">→</span>
        </router-link>
      </div>
    </div>

    <!-- Seção de profetas -->
    <div class="prophets-section">
      <h2 class="section-title">Explore as Visões dos Profetas</h2>

      <div class="prophets-grid">
        <!-- Apocalipse - disponível -->
        <router-link to="/apocalypse" class="prophet-card available">
          <div class="card-content">
            <div class="prophet-icon">📖</div>
            <h3 class="prophet-name">Apocalipse</h3>
            <p class="prophet-desc">As visões de João em Patmos</p>
            <div class="availability-badge available">
              <span class="badge-icon">✓</span>
              <span class="badge-text">Disponível</span>
            </div>
          </div>
          <div class="card-overlay">
            <span class="overlay-text">Explorar</span>
          </div>
        </router-link>

        <!-- Daniel - bloqueado -->
        <div class="prophet-card locked">
          <div class="card-content">
            <div class="prophet-icon">🦁</div>
            <h3 class="prophet-name">Daniel</h3>
            <p class="prophet-desc">As visões na Babilônia</p>
            <div class="availability-badge locked">
              <span class="badge-icon">🔒</span>
              <span class="badge-text">Em breve</span>
            </div>
          </div>
          <div class="card-overlay locked">
            <span class="overlay-text">Em desenvolvimento</span>
          </div>
        </div>

        <!-- Ezequiel - bloqueado -->
        <div class="prophet-card locked">
          <div class="card-content">
            <div class="prophet-icon">🔥</div>
            <h3 class="prophet-name">Ezequiel</h3>
            <p class="prophet-desc">A visão do trono e do templo</p>
            <div class="availability-badge locked">
              <span class="badge-icon">🔒</span>
              <span class="badge-text">Em breve</span>
            </div>
          </div>
          <div class="card-overlay locked">
            <span class="overlay-text">Em desenvolvimento</span>
          </div>
        </div>

        <!-- Isaías - bloqueado -->
        <div class="prophet-card locked">
          <div class="card-content">
            <div class="prophet-icon">👑</div>
            <h3 class="prophet-name">Isaías</h3>
            <p class="prophet-desc">A visão do Senhor no templo</p>
            <div class="availability-badge locked">
              <span class="badge-icon">🔒</span>
              <span class="badge-text">Em breve</span>
            </div>
          </div>
          <div class="card-overlay locked">
            <span class="overlay-text">Em desenvolvimento</span>
          </div>
        </div>

        <!-- Moisés - bloqueado -->
        <div class="prophet-card locked">
          <div class="card-content">
            <div class="prophet-icon">⛰️</div>
            <h3 class="prophet-name">Moisés</h3>
            <p class="prophet-desc">A visão da criação</p>
            <div class="availability-badge locked">
              <span class="badge-icon">🔒</span>
              <span class="badge-text">Em breve</span>
            </div>
          </div>
          <div class="card-overlay locked">
            <span class="overlay-text">Em desenvolvimento</span>
          </div>
        </div>

        <!-- Abraão - bloqueado -->
        <div class="prophet-card locked">
          <div class="card-content">
            <div class="prophet-icon">✨</div>
            <h3 class="prophet-name">Abraão</h3>
            <p class="prophet-desc">A visão das inteligências</p>
            <div class="availability-badge locked">
              <span class="badge-icon">🔒</span>
              <span class="badge-text">Em breve</span>
            </div>
          </div>
          <div class="card-overlay locked">
            <span class="overlay-text">Em desenvolvimento</span>
          </div>
        </div>

        <!-- Néfi - bloqueado -->
        <div class="prophet-card locked">
          <div class="card-content">
            <div class="prophet-icon">📜</div>
            <h3 class="prophet-name">Néfi</h3>
            <p class="prophet-desc">A visão da árvore da vida</p>
            <div class="availability-badge locked">
              <span class="badge-icon">🔒</span>
              <span class="badge-text">Em breve</span>
            </div>
          </div>
          <div class="card-overlay locked">
            <span class="overlay-text">Em desenvolvimento</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção sobre a experiência -->
    <div class="about-section">
      <div class="about-content">
        <h2 class="section-title">Uma Experiência Imersiva</h2>
        <p>Venha conhecer as visões proféticas como nunca antes, através de uma jornada interativa e imersiva que vai te levar ao cenário, contexto e conteúdo destas revelações divinas.</p>

        <div class="features">
          <div class="feature">
            <div class="feature-icon">🎬</div>
            <h3 class="feature-title">Narrativa Visual</h3>
            <p>Veja as visões se desenrolarem como se você estivesse lá.</p>
          </div>

          <div class="feature">
            <div class="feature-icon">🔍</div>
            <h3 class="feature-title">Contexto Histórico</h3>
            <p>Entenda o cenário e as circunstâncias em que as visões ocorreram.</p>
          </div>

          <div class="feature">
            <div class="feature-icon">📝</div>
            <h3 class="feature-title">Interpretação</h3>
            <p>Descubra o significado dos símbolos e imagens proféticas.</p>
          </div>
        </div>

        <div class="about-actions">
          <router-link to="/about" class="btn-secondary">
            Saiba mais
            <span class="btn-icon">→</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    createStars() {
      const starsContainer = document.querySelector('.stars-background');
      if (!starsContainer) return;

      const starCount = window.innerWidth <= 768 ? 100 : 200; // Menos estrelas em dispositivos móveis

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Posição aleatória
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Tamanho aleatório (menor em dispositivos móveis)
        const size = Math.random() * (window.innerWidth <= 768 ? 1.5 : 2) + 1;

        // Duração da animação aleatória
        const duration = Math.random() * 3 + 2;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;

        starsContainer.appendChild(star);
      }
    },

    // Método para otimização mobile - detecta se o dispositivo é móvel
    isMobile() {
      return window.innerWidth <= 768;
    },

    // Método para adaptar a interface com base no tipo de dispositivo
    adjustForDevice() {
      const htmlElement = document.documentElement;

      if (this.isMobile()) {
        htmlElement.classList.add('mobile-device');
      } else {
        htmlElement.classList.remove('mobile-device');
      }
    }
  },
  mounted() {
    // Criar animação de estrelas
    this.createStars();

    // Ajustar interface para o dispositivo
    this.adjustForDevice();

    // Adicionar listener para redimensionamento da janela
    window.addEventListener('resize', () => {
      this.adjustForDevice();
    });
  },
  beforeUnmount() {
    // Remover listener para evitar memory leaks
    window.removeEventListener('resize', this.adjustForDevice);
  }
}
</script>

<style scoped>
.home {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Fundo com estrelas */
.stars-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  overflow: hidden;
  background-color: var(--color-background);
}

.visual-effects {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
}

/* Seção do herói */
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.hero-title {
  font-size: 4.5rem;
  color: var(--color-secondary);
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(196, 180, 84, 0.7);
  animation: glow 3s infinite alternate;
  letter-spacing: 0.1em;
  line-height: 1.2;
  background: linear-gradient(to right, #c4b454, #f5e882, #c4b454);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
  font-family: var(--font-family-heading);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: 3rem;
  max-width: 800px;
  font-family: var(--font-family-quote);
  font-style: italic;
  animation: fadeInUp 1.2s ease 0.3s both;
}

.hero-actions {
  margin-top: 2rem;
  animation: fadeInUp 1.2s ease 0.6s both;
}

.btn-hero {
  font-size: 1.2rem;
  padding: 1rem 2.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.3);
  animation: pulse 2s infinite;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
}

.btn-hero:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-5px);
  box-shadow: 0 0 30px rgba(196, 180, 84, 0.5);
}

.btn-icon {
  transition: transform var(--transition-fast);
}

.btn-hero:hover .btn-icon {
  transform: translateX(5px);
}

/* Seção de profetas */
.prophets-section {
  padding: 5rem 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  position: relative;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 3rem;
  position: relative;
  letter-spacing: 0.05em;
  text-shadow: 0 0 15px rgba(196, 180, 84, 0.5);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(196, 180, 84, 0.7);
}

.prophets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.prophet-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: linear-gradient(145deg, rgba(30, 30, 30, 0.8), rgba(10, 10, 10, 0.8));
  transition: all var(--transition-normal);
  position: relative;
  box-shadow: var(--shadow-md);
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: default;
}

.prophet-card.available {
  background: linear-gradient(145deg, rgba(75, 46, 131, 0.3), rgba(20, 20, 20, 0.9));
  border-color: var(--color-primary);
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.2);
  cursor: pointer;
}

.prophet-card.locked:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.prophet-card.available:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 30px rgba(196, 180, 84, 0.3);
}

.card-content {
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.prophet-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-normal);
}

.prophet-card.available .prophet-icon {
  background-color: rgba(75, 46, 131, 0.3);
  border-color: var(--color-primary);
  box-shadow: 0 0 15px rgba(196, 180, 84, 0.3);
}

.prophet-card:hover .prophet-icon {
  transform: scale(1.1);
}

.prophet-name {
  font-size: 1.8rem;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  transition: color var(--transition-normal);
}

.prophet-card.available .prophet-name {
  color: var(--color-primary);
}

.prophet-desc {
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.availability-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  margin-top: auto;
}

.availability-badge.available {
  background-color: rgba(76, 175, 80, 0.2);
  color: var(--color-success);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.availability-badge.locked {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text-muted);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.badge-icon {
  font-size: 1rem;
}

/* Overlay que aparece no hover */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(75, 46, 131, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all var(--transition-normal);
  pointer-events: none;
}

.card-overlay.locked {
  background-color: rgba(0, 0, 0, 0.7);
}

.prophet-card:hover .card-overlay {
  opacity: 1;
}

.overlay-text {
  color: var(--color-text);
  font-size: 1.2rem;
  font-family: var(--font-family-heading);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.5rem 2rem;
  border: 2px solid var(--color-text);
  border-radius: var(--radius-md);
}

/* Seção sobre */
.about-section {
  padding: 5rem 1rem;
  background-color: rgba(75, 46, 131, 0.1);
  position: relative;
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.about-content p {
  max-width: 800px;
  margin: 0 auto 2rem;
  font-size: 1.2rem;
  color: var(--color-text);
  line-height: 1.8;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 3rem 0;
}

.feature {
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all var(--transition-normal);
}

.feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.3rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.about-actions {
  margin-top: 3rem;
}

.btn-secondary {
  padding: 0.8rem 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  font-weight: 500;
  text-decoration: none;
}

.btn-secondary:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-secondary:hover .btn-icon {
  transform: translateX(3px);
}

/* Animações */
@keyframes glow {
  0%, 100% { text-shadow: 0 0 15px rgba(196, 180, 84, 0.7); }
  50% { text-shadow: 0 0 25px rgba(196, 180, 84, 0.9), 0 0 40px rgba(196, 180, 84, 0.3); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(196, 180, 84, 0.3); }
  50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(196, 180, 84, 0.5); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsividade para tablets */
@media (max-width: 992px) {
  .hero-title {
    font-size: 3.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .prophets-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .features {
    gap: 1.5rem;
  }
}

/* Responsividade para celulares */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-section {
    padding: 1rem;
  }

  .btn-hero {
    font-size: 1rem;
    padding: 0.8rem 1.8rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .prophets-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }

  .prophet-icon {
    width: 70px;
    height: 70px;
    font-size: 2.5rem;
  }

  .prophet-name {
    font-size: 1.5rem;
  }

  .features {
    flex-direction: column;
    align-items: center;
  }

  .feature {
    width: 100%;
  }

  .about-section, .prophets-section {
    padding: 3rem 1rem;
  }

  .about-content p {
    font-size: 1rem;
  }
}

/* Telas muito pequenas */
@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .card-content {
    padding: 1.5rem 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-title::after {
    width: 80px;
  }
}

/* Efeitos celestiais */
.celestial-rays {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    rgba(196, 180, 84, 0.05) 10%,
    transparent 20%,
    rgba(196, 180, 84, 0.05) 30%,
    transparent 40%,
    rgba(196, 180, 84, 0.05) 50%,
    transparent 60%,
    rgba(196, 180, 84, 0.05) 70%,
    transparent 80%,
    rgba(196, 180, 84, 0.05) 90%,
    transparent 100%
  );
  animation: rotate 120s linear infinite;
  opacity: 0.7;
}

.divine-presence {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(196, 180, 84, 0.1) 0%, transparent 70%);
  animation: pulse-presence 10s infinite alternate;
  opacity: 0.5;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-presence {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
</style>
