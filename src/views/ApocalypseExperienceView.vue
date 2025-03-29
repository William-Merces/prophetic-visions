<template>
  <div class="apocalypse-experience">
    <div class="stars-background">
      <!-- Estrelas geradas via JavaScript no mounted() -->
    </div>

    <!-- Overlay para efeitos visuais divinos -->
    <div class="visual-effects">
      <div class="celestial-rays"></div>
      <div class="divine-presence"></div>
    </div>

    <!-- Cabeçalho com estilo elegante -->
    <div class="experience-header">
      <h1 class="experience-title">APOCALIPSE</h1>
      <p class="experience-subtitle">Uma Jornada Visual pela Revelação</p>
    </div>

    <!-- Seletor de capítulos com design inspirado no site antigo -->
    <div class="chapter-selection">
      <h2 class="selection-heading">Escolha um capítulo:</h2>

      <div class="chapters-grid">
        <!-- Capítulo 1 - Disponível -->
        <div class="chapter-card available" @click="navigateToChapter(1)">
          <div class="chapter-number-container">
            <span class="chapter-number">1</span>
          </div>
          <h3 class="chapter-title">A Visão do Filho do Homem</h3>
          <div class="chapter-status">Disponível</div>
          <div class="card-overlay">
            <span class="explore-text">EXPLORAR CAPÍTULO</span>
          </div>
        </div>

        <!-- Capítulo 2 - Bloqueado -->
        <div class="chapter-card locked">
          <div class="chapter-number-container">
            <span class="chapter-number">2</span>
          </div>
          <h3 class="chapter-title">Mensagens às Igrejas de Éfeso e Esmirna</h3>
          <div class="chapter-status">
            <span class="lock-icon">🔒</span> Em breve
          </div>
        </div>

        <!-- Capítulo 3 - Bloqueado -->
        <div class="chapter-card locked">
          <div class="chapter-number-container">
            <span class="chapter-number">3</span>
          </div>
          <h3 class="chapter-title">Mensagens às Igrejas de Pérgamo, Tiatira, Sardes, Filadélfia e Laodiceia</h3>
          <div class="chapter-status">
            <span class="lock-icon">🔒</span> Em breve
          </div>
        </div>

        <!-- Capítulo 4 - Bloqueado -->
        <div class="chapter-card locked">
          <div class="chapter-number-container">
            <span class="chapter-number">4</span>
          </div>
          <h3 class="chapter-title">O Trono no Céu</h3>
          <div class="chapter-status">
            <span class="lock-icon">🔒</span> Em breve
          </div>
        </div>

        <!-- Capítulo 5 - Bloqueado -->
        <div class="chapter-card locked">
          <div class="chapter-number-container">
            <span class="chapter-number">5</span>
          </div>
          <h3 class="chapter-title">O Cordeiro e o Livro Selado</h3>
          <div class="chapter-status">
            <span class="lock-icon">🔒</span> Em breve
          </div>
        </div>

        <!-- Capítulo 6 - Bloqueado -->
        <div class="chapter-card locked">
          <div class="chapter-number-container">
            <span class="chapter-number">6</span>
          </div>
          <h3 class="chapter-title">Os Seis Primeiros Selos</h3>
          <div class="chapter-status">
            <span class="lock-icon">🔒</span> Em breve
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de informações sobre o Apocalipse -->
    <div class="apocalypse-info">
      <div class="info-content">
        <h2 class="info-title">Sobre o Apocalipse</h2>

        <div class="info-columns">
          <div class="info-column">
            <h3>Contexto Histórico</h3>
            <p>O Apocalipse foi escrito pelo apóstolo João durante seu exílio na ilha de Patmos, por volta do ano 95 d.C., durante o reinado do imperador Domiciano. Neste período, os cristãos enfrentavam intensa perseguição por se recusarem a adorar o imperador como deus.</p>
          </div>

          <div class="info-column">
            <h3>Propósito</h3>
            <p>O livro foi escrito para fortalecer e consolar os cristãos perseguidos, assegurando-lhes que, apesar das tribulações, Cristo já havia conquistado a vitória final. Suas visões revelam um Deus soberano no controle da história e prometem a restauração completa de todas as coisas.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApocalypseExperienceView',
  data() {
    return {
      availableChapters: [1]
    }
  },
  methods: {
    navigateToChapter(chapterNum) {
      if (this.availableChapters.includes(chapterNum)) {
        this.$router.push(`/apocalypse/${chapterNum}`);
      }
    },

    createStars() {
      const starsContainer = document.querySelector('.stars-background');
      if (!starsContainer) return;

      const starCount = 200;

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Posição aleatória
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Tamanho aleatório
        const size = Math.random() * 2 + 1;

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

    // Rolagem para o topo da página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
</script>

<style scoped>
.apocalypse-experience {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  background-color: #000000;
  color: #ffffff;
  padding-bottom: 4rem;
}

/* Fundo estrelado */
.stars-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: twinkle var(--transition-slow) infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.2; }
  100% { opacity: 0.8; }
}

/* Efeitos visuais */
.visual-effects {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.celestial-rays {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    rgba(196, 180, 84, 0.03) 10%,
    transparent 20%,
    rgba(196, 180, 84, 0.03) 30%,
    transparent 40%,
    rgba(196, 180, 84, 0.03) 50%,
    transparent 60%,
    rgba(196, 180, 84, 0.03) 70%,
    transparent 80%,
    rgba(196, 180, 84, 0.03) 90%,
    transparent 100%
  );
  animation: rotate 120s linear infinite;
}

.divine-presence {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(196, 180, 84, 0.1) 0%, transparent 70%);
  animation: pulse 10s infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

/* Cabeçalho */
.experience-header {
  text-align: center;
  margin: 6rem 0 4rem;
  position: relative;
  z-index: 2;
}

.experience-title {
  font-size: 5rem;
  color: #c4b454; /* Dourado */
  margin-bottom: 1rem;
  font-family: var(--font-family-heading);
  letter-spacing: 0.2em;
  text-shadow: 0 0 20px rgba(196, 180, 84, 0.6);
  animation: glow 3s infinite alternate;
}

.experience-subtitle {
  font-size: 1.5rem;
  color: #ffffff;
  font-family: var(--font-family-quote);
  font-style: italic;
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 15px rgba(196, 180, 84, 0.6); }
  50% { text-shadow: 0 0 25px rgba(196, 180, 84, 0.9), 0 0 40px rgba(196, 180, 84, 0.3); }
}

/* Seleção de capítulos */
.chapter-selection {
  width: 100%;
  max-width: 1200px;
  padding: 0 2rem;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.selection-heading {
  text-align: center;
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 3rem;
  font-family: var(--font-family-heading);
}

.chapters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.chapter-card {
  background-color: rgba(18, 14, 36, 0.8);
  border: 1px solid rgba(196, 180, 84, 0.2);
  border-radius: 4px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.chapter-card.available {
  background-color: rgba(30, 20, 0, 0.8);
  border-color: #c4b454;
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.2);
  cursor: pointer;
}

.chapter-card.available:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(196, 180, 84, 0.3);
}

.chapter-number-container {
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #c4b454;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.chapter-number {
  font-size: 2rem;
  color: #c4b454;
  font-family: var(--font-family-heading);
  font-weight: bold;
}

.chapter-title {
  font-size: 1.3rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  min-height: 3.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chapter-card.available .chapter-title {
  color: #c4b454;
}

.chapter-status {
  font-size: 0.9rem;
  color: #c4b454;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chapter-card.locked .chapter-status {
  color: #999999;
}

.lock-icon {
  font-size: 1rem;
}

/* Overlay que aparece no hover */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(30, 20, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.chapter-card.available:hover .card-overlay {
  opacity: 1;
}

.explore-text {
  color: #ffffff;
  font-size: 1.1rem;
  font-family: var(--font-family-heading);
  letter-spacing: 0.1em;
  padding: 0.8rem 1.5rem;
  border: 2px solid #c4b454;
  border-radius: 4px;
  background-color: rgba(196, 180, 84, 0.1);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Informações do Apocalipse */
.apocalypse-info {
  width: 100%;
  margin-top: 6rem;
  padding: 3rem 0;
  background-color: rgba(30, 20, 0, 0.3);
  position: relative;
  z-index: 2;
}

.info-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.info-title {
  text-align: center;
  font-size: 2.2rem;
  color: #c4b454;
  margin-bottom: 3rem;
  font-family: var(--font-family-heading);
}

.info-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.info-column h3 {
  font-size: 1.5rem;
  color: #c4b454;
  margin-bottom: 1.5rem;
  font-family: var(--font-family-heading);
}

.info-column p {
  line-height: 1.8;
  color: #dddddd;
}

/* Responsividade */
@media (max-width: 992px) {
  .experience-title {
    font-size: 4rem;
  }

  .info-columns {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .experience-title {
    font-size: 3rem;
  }

  .experience-subtitle {
    font-size: 1.2rem;
  }

  .chapters-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .info-columns {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .chapter-number-container {
    width: 50px;
    height: 50px;
  }

  .chapter-number {
    font-size: 1.7rem;
  }
}

@media (max-width: 480px) {
  .experience-header {
    margin: 4rem 0 3rem;
  }

  .experience-title {
    font-size: 2.5rem;
  }

  .selection-heading {
    font-size: 1.6rem;
  }

  .chapters-grid {
    grid-template-columns: 1fr;
  }
}
</style>
