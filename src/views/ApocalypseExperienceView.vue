<template>
  <div class="apocalypse-experience">
    <div class="stars-container">
      <!-- Animação de estrelas via JavaScript no mounted() -->
    </div>

    <!-- Cabeçalho da experiência -->
    <div class="experience-header">
      <h1>Experiência Imersiva</h1>
      <h2 class="experience-subtitle">Apocalipse: Uma Jornada Visual</h2>
    </div>

    <!-- Seletor de capítulos -->
    <div class="chapter-selector">
      <div class="selector-label">Selecione um capítulo:</div>
      <div class="chapter-cards">
        <div
          v-for="chapter in availableChapters"
          :key="chapter.id"
          class="chapter-card"
          :class="{ 'active': currentChapter === chapter.id }"
          @click="selectChapter(chapter.id)"
        >
          <div class="chapter-number">{{ chapter.id }}</div>
          <div class="chapter-info">
            <h3 class="chapter-title">{{ chapter.title }}</h3>
            <p class="chapter-desc">{{ chapter.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo do capítulo atual -->
    <div v-if="currentChapter" class="chapter-content">
      <ApocalypseChapter1 v-if="currentChapter === 1" />

      <!-- Placeholder para capítulos futuros -->
      <div v-else class="chapter-placeholder">
        <h3>Capítulo {{ currentChapter }} - {{ getCurrentChapterTitle }}</h3>
        <p>Este capítulo está em desenvolvimento e estará disponível em breve.</p>
        <button class="btn" @click="currentChapter = 1">Voltar para Capítulo 1</button>
      </div>
    </div>

    <!-- Rodapé da experiência -->
    <div class="experience-footer">
      <p>
        Explore a revelação dada a João através desta experiência imersiva.
        Cada capítulo é organizado em quatro blocos para proporcionar uma compreensão
        mais profunda das visões apocalípticas.
      </p>
      <div class="footer-actions">
        <router-link to="/" class="btn">Voltar para o Início</router-link>
      </div>
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
      currentChapter: 1,
      availableChapters: [
        {
          id: 1,
          title: "A Visão do Filho do Homem",
          description: "João vê Cristo glorificado entre sete candeeiros de ouro."
        },
        {
          id: 4,
          title: "O Trono Celestial",
          description: "Uma porta aberta no céu revela o trono de Deus e os 24 anciãos."
        },
        {
          id: 5,
          title: "O Cordeiro e o Livro Selado",
          description: "Apenas o Cordeiro que foi morto é digno de abrir o livro selado."
        },
        {
          id: 6,
          title: "Os Seis Primeiros Selos",
          description: "A abertura dos selos revela os quatro cavaleiros e julgamentos divinos."
        }
      ]
    }
  },
  computed: {
    getCurrentChapterTitle() {
      const chapter = this.availableChapters.find(ch => ch.id === this.currentChapter)
      return chapter ? chapter.title : ""
    }
  },
  methods: {
    selectChapter(chapterId) {
      this.currentChapter = chapterId
      // Rolar para o topo quando mudar de capítulo
      window.scrollTo(0, 0)
    },

    createStars() {
      const starsContainer = document.querySelector('.stars-container')
      if (!starsContainer) return

      const starCount = 100

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.classList.add('star')

        // Posicionar aleatoriamente
        const x = Math.random() * 100
        const y = Math.random() * 100

        // Tamanho aleatório
        const size = Math.random() * 2 + 1

        // Tempo de animação aleatório
        const duration = Math.random() * 3 + 2

        star.style.left = `${x}%`
        star.style.top = `${y}%`
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.animationDuration = `${duration}s`

        starsContainer.appendChild(star)
      }
    }
  },
  mounted() {
    this.createStars()

    // Verificar se há um parâmetro na URL para o capítulo
    const chapterId = parseInt(this.$route.params.chapter)
    if (chapterId && this.availableChapters.some(ch => ch.id === chapterId)) {
      this.selectChapter(chapterId)
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
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.8;
  }
}

.experience-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.experience-header h1 {
  font-size: 2.5rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 15px rgba(196, 180, 84, 0.5);
}

.experience-subtitle {
  color: var(--color-text);
  font-size: 1.5rem;
  font-family: var(--font-family-quote);
  font-weight: 400;
}

.selector-label {
  text-align: center;
  margin-bottom: var(--space-md);
  font-size: 1.2rem;
  color: var(--color-text-muted);
}

.chapter-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-xxl);
}

.chapter-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-md);
}

.chapter-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  background-color: rgba(75, 46, 131, 0.3);
}

.chapter-card.active {
  border-color: var(--color-secondary);
  box-shadow: 0 0 15px rgba(196, 180, 84, 0.3);
  background-color: rgba(75, 46, 131, 0.4);
}

.chapter-number {
  font-size: 2.5rem;
  font-family: var(--font-family-heading);
  color: var(--color-secondary);
  margin-right: var(--space-lg);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: var(--shadow-sm);
}

.chapter-info {
  flex: 1;
}

.chapter-title {
  margin-bottom: var(--space-xs);
  color: var(--color-secondary-light);
  font-size: 1.2rem;
}

.chapter-desc {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
}

.chapter-content {
  margin-bottom: var(--space-xxl);
}

.chapter-placeholder {
  text-align: center;
  padding: var(--space-xxl) var(--space-xl);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
  margin-bottom: var(--space-xxl);
}

.chapter-placeholder h3 {
  color: var(--color-secondary);
  margin-bottom: var(--space-lg);
  font-size: 1.8rem;
}

.chapter-placeholder p {
  margin-bottom: var(--space-lg);
  color: var(--color-text-muted);
}

.experience-footer {
  text-align: center;
  padding: var(--space-lg);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.experience-footer p {
  margin-bottom: var(--space-lg);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.footer-actions {
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .experience-header h1 {
    font-size: 2rem;
  }

  .experience-subtitle {
    font-size: 1.2rem;
  }

  .chapter-cards {
    grid-template-columns: 1fr;
  }

  .chapter-card {
    padding: var(--space-md);
  }

  .chapter-placeholder {
    padding: var(--space-xl) var(--space-md);
  }

  .chapter-placeholder h3 {
    font-size: 1.5rem;
  }
}
</style>
