<template>
  <div class="apocalypse-chapter-view">
    <div class="stars-container">
      <!-- Animação de estrelas via JavaScript no mounted() -->
    </div>

    <!-- Efeitos visuais dourados -->
    <div class="visual-effects">
      <div class="celestial-rays"></div>
      <div class="divine-presence"></div>
    </div>

    <ApocalypseExperience
      v-if="chapter === '1'"
      @complete="handleExperienceComplete"
    />

    <div v-else class="chapter-not-available">
      <div class="chapter-card">
        <div class="chapter-number-container">
          <span class="chapter-number">{{ chapter }}</span>
        </div>
        <h2>Capítulo em Desenvolvimento</h2>
        <p>O capítulo {{ chapter }} do Apocalipse está em desenvolvimento e será disponibilizado em breve.</p>
        <div class="chapter-actions">
          <router-link to="/apocalypse/1" class="golden-btn">Explorar Capítulo 1</router-link>
          <router-link to="/apocalypse" class="outline-btn">Voltar à Seleção</router-link>
        </div>
      </div>
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
          stages: result?.completedStages || []
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
      const starsContainer = document.querySelector('.stars-container')
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
  overflow-x: hidden;
}

.stars-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  overflow: hidden;
  background-color: #000000;
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

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: twinkle 3s infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.2; }
  100% { opacity: 0.8; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-presence {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

.chapter-not-available {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 2rem;
}

.chapter-card {
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(196, 180, 84, 0.3);
  border-radius: 4px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(196, 180, 84, 0.1);
  animation: fadeIn 1s ease;
}

.chapter-number-container {
  width: 80px;
  height: 80px;
  background-color: rgba(30, 20, 0, 0.7);
  border: 2px solid #c4b454;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.3);
}

.chapter-number {
  font-size: 2.5rem;
  color: #c4b454;
  font-family: var(--font-family-heading);
  font-weight: bold;
  text-shadow: 0 0 10px rgba(196, 180, 84, 0.5);
}

.chapter-not-available h2 {
  color: #c4b454;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  text-shadow: 0 0 15px rgba(196, 180, 84, 0.5);
  font-family: var(--font-family-heading);
}

.chapter-not-available p {
  margin-bottom: 2rem;
  color: #ffffff;
  line-height: 1.6;
  font-size: 1.1rem;
}

.chapter-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.golden-btn {
  background-color: #c4b454;
  color: #000000;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-family: var(--font-family-heading);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 0 15px rgba(196, 180, 84, 0.3);
  animation: pulse 2s infinite;
}

.golden-btn:hover {
  background-color: #d9cf82;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(196, 180, 84, 0.4);
}

.outline-btn {
  background-color: transparent;
  color: #c4b454;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-family: var(--font-family-heading);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid #c4b454;
}

.outline-btn:hover {
  background-color: rgba(196, 180, 84, 0.1);
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(196, 180, 84, 0.2);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(196, 180, 84, 0.3); }
  50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(196, 180, 84, 0.5); }
}

@media (max-width: 768px) {
  .apocalypse-chapter-view {
    padding: 1rem;
  }

  .chapter-card {
    padding: 2rem 1rem;
  }

  .chapter-number-container {
    width: 70px;
    height: 70px;
    margin-bottom: 1.5rem;
  }

  .chapter-number {
    font-size: 2rem;
  }

  .chapter-not-available h2 {
    font-size: 1.8rem;
  }

  .chapter-not-available p {
    font-size: 1rem;
  }

  .chapter-actions {
    flex-direction: column;
    width: 100%;
  }

  .golden-btn, .outline-btn {
    width: 100%;
    text-align: center;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .chapter-not-available h2 {
    font-size: 1.5rem;
  }

  .chapter-number-container {
    width: 60px;
    height: 60px;
  }

  .chapter-number {
    font-size: 1.8rem;
  }
}
</style>
