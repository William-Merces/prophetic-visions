<template>
  <div class="home">
    <div class="stars-container">
      <!-- Animação de estrelas via JavaScript no mounted() -->
    </div>

    <div class="hero-section">
      <h1 class="hero-title">Prophetic Visions</h1>
      <p class="hero-subtitle">Explore as visões proféticas das escrituras através de imagens interativas</p>
      <router-link to="/revelation" class="btn btn-hero">Começar a Jornada</router-link>
    </div>

    <div class="vision-books">
      <h2>Livros Proféticos</h2>

      <div class="books-container">
        <div
          v-for="book in availableBooks"
          :key="book.id"
          class="book-card"
          :class="{ 'locked': !book.available }"
        >
          <div class="book-card-content">
            <h3>{{ book.name }}</h3>
            <p v-if="book.available">{{ book.totalChapters }} capítulos</p>
            <p v-else class="coming-soon">Em breve</p>

            <div class="book-actions">
              <router-link
                v-if="book.available"
                :to="'/' + book.id"
                class="btn"
              >
                Explorar
              </router-link>
              <span v-else class="locked-badge">
                <span class="lock-icon">🔒</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="about-section">
      <h2>Sobre Prophetic Visions</h2>
      <div class="about-content">
        <div class="about-text">
          <p>Prophetic Visions é uma experiência interativa que combina imagens detalhadas geradas por inteligência artificial com narrativas épicas e interpretações baseadas nas escrituras.</p>
          <p>Explore as visões dos profetas através de uma jornada visual e educativa, começando pelo Livro do Apocalipse.</p>

          <ScriptureQuote reference="Apocalipse 1:3">
            Bem-aventurado aquele que lê, e os que ouvem as palavras desta profecia, e guardam as coisas que nela estão escritas; porque o tempo está próximo.
          </ScriptureQuote>

          <router-link to="/about" class="btn btn-secondary">Saiba Mais</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ScriptureQuote from '@/components/common/ScriptureQuote.vue'

export default {
  name: 'HomeView',
  components: {
    ScriptureQuote
  },
  computed: {
    ...mapGetters(['getAvailableBooks']),
    availableBooks() {
      return this.getAvailableBooks
    }
  },
  mounted() {
    // Criar animação de estrelas no fundo
    this.createStars()
  },
  methods: {
    createStars() {
      const starsContainer = document.querySelector('.stars-container')
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
  }
}
</script>

<style scoped>
.home {
  position: relative;
}

.hero-section {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--space-xl);
  background-image: radial-gradient(circle at center, rgba(75, 46, 131, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: var(--space-md);
  text-shadow: 0 0 20px rgba(196, 180, 84, 0.7);
  letter-spacing: 0.1em;
}

.hero-subtitle {
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: var(--space-xl);
  color: var(--color-text-muted);
}

.btn-hero {
  font-size: 1.1rem;
  padding: var(--space-md) var(--space-xl);
}

.vision-books,
.about-section {
  padding: var(--space-xxl) var(--space-xl);
}

.vision-books h2,
.about-section h2 {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.books-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-lg);
}

.book-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  background-color: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.book-card.locked {
  opacity: 0.7;
}

.book-card-content {
  padding: var(--space-lg);
  text-align: center;
}

.book-card h3 {
  margin-bottom: var(--space-sm);
}

.coming-soon {
  color: var(--color-text-muted);
  font-style: italic;
  margin-bottom: var(--space-md);
}

.book-actions {
  margin-top: var(--space-lg);
}

.locked-badge {
  display: inline-block;
  padding: var(--space-sm) var(--space-lg);
  color: var(--color-text-muted);
}

.about-content {
  display: flex;
  justify-content: center;
}

.about-text {
  max-width: 800px;
  line-height: 1.8;
}

.about-text p {
  margin-bottom: var(--space-md);
}

.about-text .btn {
  margin-top: var(--space-lg);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .vision-books,
  .about-section {
    padding: var(--space-xl) var(--space-md);
  }
}
</style>
