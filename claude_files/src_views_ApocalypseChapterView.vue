<template>
  <div class="apocalypse-chapter-view">
    <div class="stars-background">
      <!-- Estrelas geradas via JavaScript no mounted() -->
    </div>

    <ApocalypseExperience
      v-if="chapter === '1'"
      @complete="handleExperienceComplete"
    />

    <div v-else class="chapter-not-available">
      <h2>Capítulo em Desenvolvimento</h2>
      <p>O capítulo {{ chapter }} do Apocalipse está em desenvolvimento e será disponibilizado em breve.</p>
      <router-link to="/apocalypse/1" class="btn btn-primary">Explorar Capítulo 1</router-link>
    </div>
  </div>
</template>

<script>
import ApocalypseExperience from '@/components/apocalypse/ApocalypseExperience.vue'

export default {
  name: 'ApocalypseChapterView',
  components: {
    ApocalypseExperience
  },
  props: {
    chapter: {
      type: String,
      default: '1'
    }
  },
  methods: {
    handleExperienceComplete(result) {
      // Salvar progresso no localStorage
      try {
        const progress = JSON.parse(localStorage.getItem('apocalypse-progress') || '{}')
        progress[`chapter-${this.chapter}`] = {
          completed: true,
          timestamp: new Date().toISOString(),
          stages: result.completedStages
        }
        localStorage.setItem('apocalypse-progress', JSON.stringify(progress))
      } catch (error) {
        console.error('Erro ao salvar progresso:', error)
      }

      // Emitir evento para possivelmente atualizar UI
      this.$emit('chapter-completed', {
        chapter: this.chapter,
        result
      })

      // Mostrar mensagem de parabéns ou redirecionar
      this.$router.push('/apocalypse')
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

    // Rolagem para o topo da página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
.apocalypse-chapter-view {
  position: relative;
  min-height: 100vh;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
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

.chapter-not-available {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 3rem auto;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-md);
  animation: fadeIn 1s ease;
}

.chapter-not-available h2 {
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.chapter-not-available p {
  margin-bottom: 2rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.btn {
  animation: pulse 2s infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@media (max-width: 768px) {
  .apocalypse-chapter-view {
    padding: 1rem;
  }

  .chapter-not-available {
    padding: 2rem 1rem;
    margin: 2rem auto;
  }

  .chapter-not-available h2 {
    font-size: 1.5rem;
  }
}
</style>
