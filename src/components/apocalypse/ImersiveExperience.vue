<template>
  <div class="immersive-experience" :class="{ 'fullscreen-mode': isFullscreen }">
    <!-- Fundo estrelado com animação -->
    <div class="stars-background">
      <!-- As estrelas serão geradas via JavaScript no mounted() -->
    </div>

    <!-- Container principal que contém todas as etapas -->
    <div class="experience-container">
      <!-- Navegação de progresso -->
      <div class="progress-nav" v-if="!isIntroActive">
        <div
          v-for="(stage, index) in stages"
          :key="index"
          class="progress-item"
          :class="{
            'active': currentStageIndex >= index,
            'current': currentStageIndex === index
          }"
          @click="navigateToStage(index)"
        >
          <div class="progress-indicator">
            <span class="progress-number">{{ index + 1 }}</span>
          </div>
          <span class="progress-label">{{ stage.title }}</span>
        </div>
      </div>

      <!-- Tela de introdução -->
      <div v-if="isIntroActive" class="intro-screen">
        <div class="intro-content">
          <h1 class="experience-title">{{ experienceTitle }}</h1>
          <p class="experience-subtitle">{{ experienceSubtitle }}</p>
          <div class="intro-description" v-html="introText"></div>
          <button class="btn btn-primary start-button" @click="startExperience">
            Iniciar Jornada
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>

      <!-- Telas de capa para cada estágio -->
      <transition name="fade" mode="out-in">
        <div
          v-if="showingStageCover"
          class="stage-cover"
          :style="currentStage.coverStyle"
        >
          <div class="cover-content">
            <div class="cover-icon" v-if="currentStage.icon">{{ currentStage.icon }}</div>
            <h2 class="cover-title">{{ currentStage.title }}</h2>
            <p class="cover-tagline">{{ currentStage.tagline }}</p>
            <button class="btn btn-secondary continue-button" @click="hideStageCover">
              Continuar
              <span class="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </transition>

      <!-- Conteúdo do estágio atual -->
      <transition name="fade" mode="out-in">
        <div v-if="!isIntroActive && !showingStageCover" class="stage-content">
          <!-- Renderização dinâmica do componente de conteúdo do estágio atual -->
          <component
            :is="currentStage.component"
            @complete="completeStage"
            :key="currentStageIndex"
          ></component>
        </div>
      </transition>
    </div>

    <!-- Controles fixos -->
    <div class="fixed-controls" v-if="!isIntroActive">
      <button class="control-btn back-btn" @click="goBack" v-if="canGoBack">
        <span class="btn-icon">←</span> Voltar
      </button>
      <button class="control-btn fullscreen-btn" @click="toggleFullscreen">
        <span class="btn-icon">{{ isFullscreen ? '⟲' : '⟱' }}</span>
        {{ isFullscreen ? 'Sair da tela cheia' : 'Modo tela cheia' }}
      </button>
    </div>

    <!-- Botão de conclusão (visível apenas no último estágio) -->
    <div class="completion-controls" v-if="currentStageIndex === stages.length - 1 && !showingStageCover && !isIntroActive">
      <button class="btn btn-primary complete-btn" @click="completeExperience">
        Concluir Jornada
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImersiveExperience',
  props: {
    experienceTitle: {
      type: String,
      required: true
    },
    experienceSubtitle: {
      type: String,
      required: true
    },
    introText: {
      type: String,
      required: true
    },
    stages: {
      type: Array,
      required: true
      // Cada estágio deve ter: {
      //   title: String,
      //   tagline: String,
      //   icon: String (emoji),
      //   component: Component,
      //   coverStyle: Object (estilos CSS para o fundo da capa)
      // }
    }
  },
  data() {
    return {
      isIntroActive: true,
      currentStageIndex: 0,
      showingStageCover: false,
      isFullscreen: false,
      stagesCompleted: []
    }
  },
  computed: {
    currentStage() {
      return this.stages[this.currentStageIndex] || {}
    },
    canGoBack() {
      return !this.isIntroActive && !this.showingStageCover && this.currentStageIndex > 0
    }
  },
  methods: {
    startExperience() {
      this.isIntroActive = false
      this.showingStageCover = true
    },

    hideStageCover() {
      this.showingStageCover = false
    },

    navigateToStage(index) {
      // Só permite navegar para estágios já visitados ou o próximo
      if (index <= Math.max(...this.stagesCompleted, 0) + 1) {
        this.currentStageIndex = index
        this.showingStageCover = true
      }
    },

    completeStage() {
      if (!this.stagesCompleted.includes(this.currentStageIndex)) {
        this.stagesCompleted.push(this.currentStageIndex)
      }

      // Se não é o último estágio, avança para o próximo
      if (this.currentStageIndex < this.stages.length - 1) {
        this.currentStageIndex++
        this.showingStageCover = true
      }
    },

    completeExperience() {
      this.$emit('complete', this.stagesCompleted)
    },

    goBack() {
      if (this.currentStageIndex > 0) {
        this.currentStageIndex--
        this.showingStageCover = true
      }
    },

    toggleFullscreen() {
      if (!this.isFullscreen) {
        this.enterFullscreen()
      } else {
        this.exitFullscreen()
      }
    },

    enterFullscreen() {
      const elem = this.$el

      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen()
      }
    },

    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    },

    handleFullscreenChange() {
      this.isFullscreen = !!(document.fullscreenElement ||
                            document.webkitFullscreenElement ||
                            document.mozFullScreenElement ||
                            document.msFullscreenElement)
    },

    createStars() {
      const starsContainer = this.$el.querySelector('.stars-background')
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
    // Criar animação de estrelas
    this.createStars()

    // Adicionar event listeners para mudança de fullscreen
    document.addEventListener('fullscreenchange', this.handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange)
  },
  beforeUnmount() {
    // Remover event listeners
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange)

    // Garantir que saímos do fullscreen ao desmontar
    if (this.isFullscreen) {
      this.exitFullscreen()
    }
  }
}
</script>

<style scoped>
.immersive-experience {
  position: relative;
  width: 100%;
  min-height: 90vh;
  background-color: var(--color-background);
  color: var(--color-text);
  overflow: hidden;
}

.fullscreen-mode {
  min-height: 100vh;
}

/* Fundo de estrelas */
.stars-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
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

/* Container principal */
.experience-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Navegação de progresso */
.progress-nav {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 2rem;
}

.progress-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  opacity: 0.5;
  transition: all var(--transition-normal);
}

.progress-item.active {
  opacity: 1;
}

.progress-item.current {
  transform: scale(1.05);
}

.progress-indicator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.progress-item.active .progress-indicator {
  background-color: var(--color-secondary);
  border-color: var(--color-secondary-light);
}

.progress-number {
  font-family: var(--font-family-heading);
  font-weight: bold;
  color: var(--color-text-muted);
}

.progress-item.active .progress-number {
  color: var(--color-background);
}

.progress-label {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-family: var(--font-family-heading);
}

.progress-item.active .progress-label {
  color: var(--color-secondary);
}

/* Tela de introdução */
.intro-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  animation: fadeIn 1s ease;
}

.intro-content {
  max-width: 800px;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.experience-title {
  font-size: 3.5rem;
  color: var(--color-secondary);
  margin-bottom: 1rem;
  text-shadow: 0 0 15px rgba(196, 180, 84, 0.5);
  letter-spacing: 0.1em;
  animation: glow 3s infinite alternate;
}

@keyframes glow {
  0% { text-shadow: 0 0 10px rgba(196, 180, 84, 0.5); }
  100% { text-shadow: 0 0 25px rgba(196, 180, 84, 0.8); }
}

.experience-subtitle {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: 2rem;
  font-family: var(--font-family-quote);
  font-style: italic;
}

.intro-description {
  margin-bottom: 2rem;
  line-height: 1.8;
}

.start-button {
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  animation: pulse 2s infinite;
  background-color: var(--color-secondary);
  color: var(--color-background);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.btn-arrow {
  display: inline-block;
  margin-left: 0.5rem;
  transition: transform var(--transition-fast);
}

.start-button:hover .btn-arrow,
.continue-button:hover .btn-arrow {
  transform: translateX(5px);
}

/* Tela de capa para cada estágio */
.stage-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background-size: cover;
  background-position: center;
  position: relative;
  text-align: center;
  animation: fadeIn 1s ease;
}

.stage-cover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%);
  z-index: 1;
}

.cover-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 2rem;
}

.cover-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease;
}

.cover-title {
  font-size: 3rem;
  color: var(--color-secondary);
  margin-bottom: 1rem;
  text-shadow: 0 0 15px rgba(196, 180, 84, 0.5);
  animation: fadeInUp 1s ease 0.2s both;
}

.cover-tagline {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: 2rem;
  font-family: var(--font-family-quote);
  font-style: italic;
  animation: fadeInUp 1s ease 0.4s both;
}

.continue-button {
  animation: fadeInUp 1s ease 0.6s both;
}

/* Conteúdo do estágio */
.stage-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Controles fixos */
.fixed-controls {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 100;
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-btn:hover {
  background-color: rgba(75, 46, 131, 0.7);
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 1.1rem;
}

/* Controles de conclusão */
.completion-controls {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
}

.complete-btn {
  background-color: var(--color-secondary);
  color: var(--color-background);
  font-size: 1.1rem;
  padding: 0.8rem 1.5rem;
  animation: pulse 2s infinite;
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transições entre páginas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsividade */
@media (max-width: 768px) {
  .experience-container {
    padding: 1rem;
  }

  .progress-nav {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .progress-item {
    flex-direction: row;
    gap: 1rem;
    width: 100%;
    max-width: 250px;
  }

  .experience-title {
    font-size: 2.5rem;
  }

  .experience-subtitle,
  .cover-tagline {
    font-size: 1.2rem;
  }

  .cover-title {
    font-size: 2.2rem;
  }

  .fixed-controls {
    top: auto;
    bottom: 1rem;
    left: 1rem;
  }

  .completion-controls {
    bottom: 1rem;
    right: 1rem;
  }
}

@media (max-width: 480px) {
  .progress-nav {
    display: none;
  }

  .experience-title {
    font-size: 2rem;
  }

  .cover-title {
    font-size: 1.8rem;
  }

  .fixed-controls {
    flex-direction: column;
  }
}
</style>
