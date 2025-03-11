<template>
  <div class="apocalypse-experience">
    <div class="stars-container">
      <!-- Animação de estrelas via JavaScript no mounted() -->
    </div>

    <!-- Cabeçalho da experiência -->
    <div class="experience-header">
      <h1>Apocalipse</h1>
      <h2 class="experience-subtitle">Uma Jornada Visual pela Revelação</h2>
    </div>

    <!-- Lista de capítulos -->
    <div v-if="!currentChapter" class="chapters-container">
      <h3 class="chapters-title">Escolha um capítulo:</h3>

      <div class="chapters-grid">
        <div
          v-for="chapterNum in 22"
          :key="chapterNum"
          class="chapter-card"
          :class="{ 'available': isChapterAvailable(chapterNum) }"
        >
          <div class="chapter-content">
            <div class="chapter-number">{{ chapterNum }}</div>
            <h4 class="chapter-title">{{ getChapterTitle(chapterNum) }}</h4>

            <div v-if="isChapterAvailable(chapterNum)" class="chapter-status available">
              Disponível
            </div>
            <div v-else class="chapter-status locked">
              <span class="lock-icon">🔒</span> Em breve
            </div>

            <button
              v-if="isChapterAvailable(chapterNum)"
              @click="selectChapter(chapterNum)"
              class="btn chapter-btn"
            >
              Explorar Capítulo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo do capítulo atual -->
    <div v-if="currentChapter" class="chapter-content-view">
      <div class="chapter-header">
        <button class="btn back-btn" @click="returnToChapters">
          <span class="back-arrow">←</span> Voltar para capítulos
        </button>
        <h3 class="current-chapter-title">
          Capítulo {{ currentChapter }}: {{ getChapterTitle(currentChapter) }}
        </h3>
      </div>

      <div class="chapter-intro">
        <h2 class="chapter-intro-title">A Visão do Filho do Homem</h2>
        <p class="chapter-intro-description">
          Explore a primeira visão do Apocalipse, onde João vê Cristo glorificado caminhando entre sete candeeiros de ouro.
        </p>
      </div>

      <!-- Renderiza o capítulo 1 usando o componente específico -->
      <ApocalypseChapter1 v-if="currentChapter === 1" @complete="chapterCompleted" />

      <!-- Placeholder para outros capítulos -->
      <div v-else class="chapter-placeholder">
        <div class="placeholder-content">
          <div class="placeholder-icon">🔒</div>
          <h3>Capítulo {{ currentChapter }}</h3>
          <p>Este capítulo estará disponível em breve.</p>
          <p class="placeholder-message">Comece sua jornada pelo Capítulo 1 para desbloquear o conteúdo posterior.</p>
          <button class="btn" @click="selectChapter(1)">Ir para o Capítulo 1</button>
        </div>
      </div>
    </div>

    <!-- Rodapé informativo -->
    <div class="experience-footer" v-if="!currentChapter">
      <p>
        "Bem-aventurado aquele que lê, e os que ouvem as palavras desta profecia, e guardam as coisas que nela estão escritas; porque o tempo está próximo."
        <span class="verse-ref">Apocalipse 1:3</span>
      </p>
    </div>
  </div>
</template>

<script>
import ApocalypseChapter1 from '@/components/apocalypse/ApocalypseChapter1.vue'

export default {
  name: 'ApocalypseExperienceView',
  components: {
    ApocalypseChapter1
  },
  data() {
    return {
      currentChapter: null,
      chapterTitles: {
        1: "A Visão do Filho do Homem",
        2: "Mensagens às Igrejas de Éfeso e Esmirna",
        3: "Mensagens às Igrejas de Pérgamo, Tiatira, Sardes, Filadélfia e Laodiceia",
        4: "O Trono de Deus",
        5: "O Cordeiro e o Livro Selado",
        6: "Os Seis Primeiros Selos",
        7: "Os 144.000 Selados",
        8: "O Sétimo Selo e as Quatro Primeiras Trombetas",
        9: "A Quinta e Sexta Trombetas",
        10: "O Anjo e o Livrinho",
        11: "As Duas Testemunhas e a Sétima Trombeta",
        12: "A Mulher e o Dragão",
        13: "As Duas Bestas",
        14: "O Cordeiro e os 144.000",
        15: "Os Sete Anjos com as Últimas Pragas",
        16: "As Sete Taças da Ira de Deus",
        17: "A Grande Prostituta e a Besta",
        18: "A Queda da Babilônia",
        19: "A Volta de Cristo",
        20: "O Milênio e o Juízo Final",
        21: "A Nova Jerusalém",
        22: "O Rio da Vida e a Última Mensagem"
      }
    }
  },
  methods: {
    isChapterAvailable(chapterNum) {
      // Apenas o capítulo 1 está disponível inicialmente
      return chapterNum === 1;
    },

    getChapterTitle(chapterNum) {
      return this.chapterTitles[chapterNum] || `Capítulo ${chapterNum}`;
    },

    selectChapter(chapterNum) {
      if (this.isChapterAvailable(chapterNum)) {
        this.currentChapter = chapterNum;

        // Rolagem suave para o topo da página
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    },

    returnToChapters() {
      this.currentChapter = null;

      // Rolagem suave para o topo da página
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    chapterCompleted() {
      alert('Capítulo concluído! Em breve mais capítulos serão liberados.');
      this.returnToChapters();
    },

    createStars() {
      const starsContainer = document.querySelector('.stars-container');
      if (!starsContainer) return;

      const starCount = 100;

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Posicionar aleatoriamente
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Tamanho aleatório
        const size = Math.random() * 2 + 1;

        // Tempo de animação aleatório
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

    // Verificar se há um parâmetro na URL para o capítulo
    const chapterParam = parseInt(this.$route.params.chapter);
    if (chapterParam && this.isChapterAvailable(chapterParam)) {
      this.selectChapter(chapterParam);
    }
  }
}
</script>

<style scoped>
.apocalypse-experience {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  min-height: 100vh;
}

.stars-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
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

/* Header styling */
.experience-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.experience-header h1 {
  font-size: 3.5rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 15px rgba(196, 180, 84, 0.5);
  letter-spacing: 0.05em;
}

.experience-subtitle {
  color: var(--color-secondary-light);
  font-size: 1.5rem;
  font-family: var(--font-family-quote);
  font-weight: 400;
  font-style: italic;
}

/* Chapters container */
.chapters-container {
  width: 100%;
}

.chapters-title {
  text-align: center;
  margin-bottom: var(--space-xl);
  color: var(--color-text);
  font-weight: normal;
  font-size: 1.6rem;
  font-family: var(--font-family-quote);
}

.chapters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.chapter-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  position: relative;
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.7), rgba(20, 20, 20, 0.9));
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.6;
}

.chapter-card.available {
  opacity: 1;
  background: linear-gradient(145deg, rgba(75, 46, 131, 0.3), rgba(20, 20, 20, 0.9));
  border: 1px solid var(--color-secondary);
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.2);
}

.chapter-card.available:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 0 30px rgba(196, 180, 84, 0.3);
}

.chapter-content {
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}

.chapter-number {
  font-size: 2.5rem;
  font-family: var(--font-family-heading);
  font-weight: bold;
  color: var(--color-text-muted);
  margin-bottom: var(--space-sm);
  background-color: rgba(0, 0, 0, 0.3);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.chapter-card.available .chapter-number {
  color: var(--color-secondary);
  border-color: var(--color-secondary);
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 10px rgba(196, 180, 84, 0.3);
}

.chapter-title {
  margin-bottom: var(--space-md);
  font-size: 1.2rem;
  color: var(--color-text);
  height: 2.8em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chapter-card.available .chapter-title {
  color: var(--color-secondary-light);
}

.chapter-status {
  margin-bottom: var(--space-lg);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.chapter-status.available {
  color: var(--color-secondary);
  font-weight: 500;
}

.chapter-status.locked {
  color: var(--color-text-muted);
}

.lock-icon {
  font-size: 1.1rem;
  color: #FFC107;
}

.chapter-btn {
  background-color: var(--color-secondary);
  color: var(--color-background);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  border: none;
  font-weight: 500;
  transition: all var(--transition-normal);
  font-family: var(--font-family-heading);
  cursor: pointer;
  letter-spacing: 0.05em;
  width: 100%;
}

.chapter-btn:hover {
  background-color: var(--color-secondary-light);
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(196, 180, 84, 0.3);
}

/* Current chapter view */
.chapter-content-view {
  width: 100%;
  animation: fadeIn 0.5s ease;
}

.chapter-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
  gap: var(--space-md);
}

.current-chapter-title {
  font-size: 1.5rem;
  color: var(--color-secondary);
  flex-grow: 1;
  text-align: center;
  margin: 0;
}

.back-btn {
  background-color: var(--color-secondary);
  color: var(--color-background);
  border: none;
  padding: var(--space-xs) var(--space-lg);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: var(--font-family-heading);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  transition: all var(--transition-normal);
  font-weight: 500;
  letter-spacing: 0.05em;
}

.back-btn:hover {
  background-color: var(--color-secondary-light);
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(196, 180, 84, 0.3);
}

.back-arrow {
  font-size: 1.2rem;
}

/* Chapter intro */
.chapter-intro {
  text-align: center;
  margin-bottom: var(--space-xl);
  padding: var(--space-xl);
  background: linear-gradient(145deg, rgba(75, 46, 131, 0.2), rgba(0, 0, 0, 0.5));
  border-radius: var(--radius-md);
  border: 1px solid var(--color-secondary);
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.1);
}

.chapter-intro-title {
  font-size: 2.2rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-md);
  text-shadow: 0 0 10px rgba(196, 180, 84, 0.3);
}

.chapter-intro-description {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
  font-size: 1.1rem;
  color: var(--color-text);
}

/* Placeholder for unavailable chapters */
.chapter-placeholder {
  padding: var(--space-xxl) var(--space-lg);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  margin-bottom: var(--space-xl);
}

.placeholder-content {
  max-width: 600px;
  margin: 0 auto;
}

.placeholder-icon {
  font-size: 3rem;
  color: #FFC107;
  margin-bottom: var(--space-lg);
}

.placeholder-message {
  color: var(--color-text-muted);
  font-style: italic;
  margin: var(--space-lg) 0;
}

/* Footer */
.experience-footer {
  margin-top: var(--space-xxl);
  text-align: center;
  padding: var(--space-lg);
  font-family: var(--font-family-quote);
  font-style: italic;
  color: var(--color-text-muted);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.verse-ref {
  display: block;
  margin-top: var(--space-xs);
  color: var(--color-secondary);
  font-weight: 500;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsiveness */
@media (max-width: 768px) {
  .experience-header h1 {
    font-size: 2.5rem;
  }

  .experience-subtitle {
    font-size: 1.2rem;
  }

  .chapters-grid {
    grid-template-columns: 1fr;
  }

  .chapter-header {
    flex-direction: column;
  }

  .back-btn {
    width: 100%;
    justify-content: center;
  }

  .current-chapter-title {
    width: 100%;
    order: -1;
    font-size: 1.3rem;
  }

  .chapter-intro-title {
    font-size: 1.8rem;
  }
}
</style>
