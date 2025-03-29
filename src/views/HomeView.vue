<template>
  <div class="home">
    <!-- Camada de fundo com estrelas -->
    <div class="stars-background">
      <!-- Estrelas geradas via JavaScript no mounted() -->
    </div>

    <!-- Seção do herói com faixa roxa horizontal -->
    <section class="hero-section">
      <div class="dark-band"></div>

      <div class="hero-content">
        <h1 class="hero-title">PRONTO PARA VER COM OS OLHOS DOS PROFETAS?</h1>
        <p class="hero-description">
          Embarque nesta jornada visual pelas revelações divinas e descubra um novo nível
          de compreensão profética.
        </p>

        <router-link to="/apocalypse/1" class="btn-hero">
          COMEÇAR AGORA →
        </router-link>
      </div>
    </section>

    <!-- Seção de profetas com faixa roxa horizontal -->
    <section class="prophets-section">
      <div class="dark-band"></div>

      <div class="section-content">
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
              <span class="explore-text">EXPLORAR</span>
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
              <span class="overlay-text">EM BREVE</span>
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
              <span class="overlay-text">EM BREVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção sobre a experiência com faixa roxa horizontal -->
    <section class="about-section">
      <div class="dark-band"></div>

      <div class="section-content">
        <h2 class="section-title">Uma Experiência Imersiva</h2>
        <p class="section-description">Conheça as visões proféticas como nunca antes, através de uma jornada interativa e imersiva que vai te levar ao cenário, contexto e conteúdo destas revelações divinas.</p>

        <div class="features">
          <div class="feature">
            <div class="feature-icon">🎬</div>
            <h3 class="feature-title">Narrativa Visual</h3>
            <p>Veja as visões se desenrolarem como se você estivesse lá, através de uma experiência imersiva.</p>
          </div>

          <div class="feature">
            <div class="feature-icon">🔍</div>
            <h3 class="feature-title">Contexto Histórico</h3>
            <p>Entenda o cenário e as circunstâncias em que as visões ocorreram para uma compreensão mais profunda.</p>
          </div>

          <div class="feature">
            <div class="feature-icon">📝</div>
            <h3 class="feature-title">Interpretação</h3>
            <p>Descubra o significado dos símbolos e imagens proféticas e sua relevância para os dias atuais.</p>
          </div>
        </div>

        <div class="about-actions">
          <router-link to="/about" class="btn-secondary">
            Saiba mais
            <span class="btn-icon">→</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    createStars() {
      const starsContainer = document.querySelector('.stars-background');
      if (!starsContainer) return;

      const starCount = window.innerWidth <= 768 ? 100 : 200;

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Posição aleatória
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Tamanho aleatório
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
    }
  },
  mounted() {
    this.createStars();
  }
}
</script>

<style scoped>
.home {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #000000;
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
  background-color: #000000;
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: twinkle 3s infinite alternate;
}

/* Faixas roxas horizontais para cada seção */
.dark-band {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 300px;
  background: linear-gradient(
    to bottom,
    rgba(20, 10, 40, 0) 0%,
    rgba(20, 10, 40, 0.7) 30%,
    rgba(20, 10, 40, 0.8) 50%,
    rgba(20, 10, 40, 0.7) 70%,
    rgba(20, 10, 40, 0) 100%
  );
  transform: translateY(-50%);
  z-index: 1;
}

/* Estilos de seção comuns */
section {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 1rem;
}

.section-content {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  color: #c4b454;
  margin-bottom: 2rem;
  text-shadow: 0 0 15px rgba(196, 180, 84, 0.5);
  font-family: var(--font-family-heading);
}

.section-description {
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #ffffff;
}

/* Seção do herói */
.hero-section {
  min-height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 900px;
  padding: 2rem;
}

.hero-title {
  font-size: 3.5rem;
  color: #c4b454;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(196, 180, 84, 0.7);
  font-family: var(--font-family-heading);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.3rem;
  color: #ffffff;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.btn-hero {
  background-color: #c4b454;
  color: #000000;
  padding: 1rem 2.5rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: var(--font-family-heading);
  text-decoration: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.3);
  display: inline-block;
}

.btn-hero:hover {
  background-color: #d9cf82;
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(196, 180, 84, 0.4);
}

/* Seção de profetas */
.prophets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.prophet-card {
  border-radius: 4px;
  overflow: hidden;
  background: linear-gradient(145deg, rgba(30, 30, 30, 0.8), rgba(10, 10, 10, 0.8));
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: default;
  text-decoration: none;
}

.prophet-card.available {
  background: linear-gradient(145deg, rgba(30, 20, 0, 0.8), rgba(20, 10, 0, 0.9));
  border-color: #c4b454;
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
  transition: all 0.3s ease;
}

.prophet-card.available .prophet-icon {
  background-color: rgba(196, 180, 84, 0.2);
  border-color: #c4b454;
  box-shadow: 0 0 15px rgba(196, 180, 84, 0.3);
}

.prophet-card:hover .prophet-icon {
  transform: scale(1.1);
}

.prophet-name {
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  font-family: var(--font-family-heading);
}

.prophet-card.available .prophet-name {
  color: #c4b454;
}

.prophet-desc {
  color: #cccccc;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.availability-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-top: auto;
}

.availability-badge.available {
  background-color: rgba(196, 180, 84, 0.2);
  color: #c4b454;
  border: 1px solid rgba(196, 180, 84, 0.3);
}

.availability-badge.locked {
  background-color: rgba(255, 255, 255, 0.05);
  color: #cccccc;
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
  background-color: rgba(30, 20, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;
}

.card-overlay.locked {
  background-color: rgba(0, 0, 0, 0.7);
}

.prophet-card:hover .card-overlay {
  opacity: 1;
}

.explore-text {
  color: #c4b454;
  font-size: 1.2rem;
  font-family: var(--font-family-heading);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.7rem 2.5rem;
  border: 2px solid #c4b454;
  border-radius: 4px;
}

.overlay-text {
  color: #ffffff;
  font-size: 1.2rem;
  font-family: var(--font-family-heading);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.5rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

/* Seção de recursos */
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
  border-radius: 4px;
  border: 1px solid rgba(196, 180, 84, 0.1);
  transition: all 0.3s ease;
}

.feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: #c4b454;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.3rem;
  color: #c4b454;
  margin-bottom: 1rem;
  font-family: var(--font-family-heading);
}

.about-actions {
  margin-top: 3rem;
}

.btn-secondary {
  padding: 0.8rem 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #c4b454;
  color: #000000;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: 500;
  text-decoration: none;
  font-family: var(--font-family-heading);
}

.btn-secondary:hover {
  background-color: #d9cf82;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-icon {
  transition: transform 0.15s ease;
}

.btn-secondary:hover .btn-icon {
  transform: translateX(3px);
}

/* Animações */
@keyframes twinkle {
  0% { opacity: 0.2; }
  100% { opacity: 0.8; }
}

/* Responsividade */
@media (max-width: 992px) {
  .hero-title {
    font-size: 3rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .dark-band {
    height: 250px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-description {
    font-size: 1rem;
  }

  .prophets-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .features {
    flex-direction: column;
    align-items: center;
  }

  .feature {
    width: 100%;
  }

  .dark-band {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .btn-hero {
    font-size: 1rem;
    padding: 0.8rem 1.8rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
