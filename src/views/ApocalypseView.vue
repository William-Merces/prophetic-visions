<template>
  <div class="apocalypse-view">
    <div class="stars-background">
      <!-- Estrelas geradas via JavaScript no mounted() -->
    </div>

    <div class="header-section">
      <h1>Apocalipse</h1>
      <p class="subtitle">As Visões de João em Patmos</p>
    </div>

    <div class="chapters-grid">
      <div
        v-for="chapterNum in 22"
        :key="chapterNum"
        class="chapter-card"
        :class="{ 'available': isChapterAvailable(chapterNum) }"
        @click="isChapterAvailable(chapterNum) && navigateToChapter(chapterNum)"
      >
        <div class="card-content">
          <div class="chapter-number">{{ chapterNum }}</div>
          <h3 class="chapter-title">{{ getChapterTitle(chapterNum) }}</h3>

          <div v-if="isChapterAvailable(chapterNum)" class="chapter-status available">
            <span class="availability-icon">✓</span> Disponível
          </div>
          <div v-else class="chapter-status locked">
            <span class="lock-icon">🔒</span> Em breve
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ApocalypseView',
  computed: {
    ...mapGetters(['isChapterAvailable'])
  },
  methods: {
    navigateToChapter(chapterNum) {
      this.$router.push(`/apocalypse/${chapterNum}`)
    },

    getChapterTitle(chapterNum) {
      const titles = {
        1: "A Visão do Filho do Homem",
        2: "Cartas às Igrejas (Parte 1)",
        3: "Cartas às Igrejas (Parte 2)",
        4: "O Trono no Céu",
        5: "O Cordeiro e o Livro Selado",
        6: "Os Seis Primeiros Selos",
        7: "Os 144.000 Selados",
        8: "O Sétimo Selo e as Trombetas",
        9: "A Quinta e Sexta Trombetas",
        10: "O Anjo e o Livrinho",
        11: "As Duas Testemunhas",
        12: "A Mulher e o Dragão",
        13: "As Duas Bestas",
        14: "O Cordeiro e os 144.000",
        15: "As Sete Taças",
        16: "As Sete Pragas",
        17: "A Queda da Grande Babilônia",
        18: "Lamentação Sobre Babilônia",
        19: "As Bodas do Cordeiro",
        20: "O Milênio e o Juízo Final",
        21: "A Nova Jerusalém",
        22: "O Rio da Vida"
      }

      return titles[chapterNum] || `Capítulo ${chapterNum}`
    },

    createStars() {
      const starsContainer = document.querySelector('.stars-background')
      if (!starsContainer) return

      const starCount = 200

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.classList.add('star')

        // Posição aleatória
        const x = Math.random() * 100
        const y = Math.random() * 100

        // Tamanho aleatório
        const size = Math.random() * 2 + 1

        // Duração da animação aleatória
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
  }
}
</script>

<style scoped>
.apocalypse-view {
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stars-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.header-section h1 {
  font-size: 3.5rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
  animation: glow 3s infinite alternate;
}

.subtitle {
  font-size: 1.5rem;
  font-family: var(--font-family-quote);
  font-style: italic;
  color: var(--color-text-muted);
}

.chapters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.chapter-card {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all var(--transition-normal);
  opacity: 0.6;
  cursor: default;
}

.chapter-card.available {
  opacity: 1;
  background-color: rgba(75, 46, 131, 0.3);
  border: 1px solid var(--color-secondary);
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.2);
  cursor: pointer;
}

.chapter-card.available:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 30px rgba(196, 180, 84, 0.3);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}

.chapter-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.chapter-card.available .chapter-number {
  color: var(--color-secondary);
  border-color: var(--color-secondary);
  background-color: rgba(0, 0, 0, 0.5);
}

.chapter-title {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: var(--color-text);
  min-height: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chapter-card.available .chapter-title {
  color: var(--color-secondary-light);
}

.chapter-status {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chapter-status.available {
  background-color: rgba(76, 175, 80, 0.2);
  color: var(--color-success);
}

.chapter-status.locked {
  background-color: rgba(0, 0, 0, 0.3);
  color: var(--color-text-muted);
}

.availability-icon {
  font-size: 1rem;
}

.lock-icon {
  font-size: 1rem;
}

@keyframes glow {
  0% { text-shadow: 0 0 10px rgba(196, 180, 84, 0.5); }
  100% { text-shadow: 0 0 20px rgba(196, 180, 84, 0.8); }
}

@media (max-width: 768px) {
  .apocalypse-view {
    padding: 1rem;
  }

  .header-section h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .chapters-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .chapter-title {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .chapters-grid {
    grid-template-columns: 1fr;
  }
}
</style>
