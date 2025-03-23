<template>
  <div class="immersive-vision-container" :class="{ 'fullscreen-mode': isFullscreen }">
    <!-- Cortina de entrada com texto narrativo -->
    <transition name="fade">
      <div v-if="showIntro" class="vision-intro" @click="startVisionJourney">
        <div class="intro-content">
          <h2 class="intro-title">{{ visionData.title }}</h2>
          <p class="intro-quote">"{{ visionData.introQuote }}"</p>
          <p class="intro-source">{{ visionData.introSource }}</p>
          <div class="intro-instruction">Toque para iniciar a jornada</div>
        </div>
      </div>
    </transition>

    <!-- Navegação de sequência -->
    <div v-if="!showIntro" class="sequence-navigation">
      <div class="sequence-indicators">
        <span
          v-for="(image, index) in visionData.images"
          :key="index"
          :class="{ 'active': currentImageIndex === index }"
          class="sequence-dot"
          @click="navigateToImage(index)"
        ></span>
      </div>
      <div class="sequence-title">{{ currentImage.title }}</div>
    </div>

    <!-- Container da imagem principal -->
    <div class="vision-image-wrapper" :class="{ 'active': !showIntro }">
      <transition name="image-fade" mode="out-in">
        <!-- Imagem principal -->
        <img
          v-if="!activeHotspot || !currentHotspotData.individualImage"
          :key="currentImageIndex"
          :src="currentImage.src"
          :alt="currentImage.alt || currentImage.title"
          class="vision-image"
          @load="imageLoaded"
        >
        <!-- Imagem individual quando um hotspot está ativo e tem imagem individual -->
        <img
          v-else
          :key="`hotspot-image-${activeHotspot}`"
          :src="currentHotspotData.individualImage"
          :alt="currentHotspotData.title"
          class="vision-image hotspot-individual-image"
          @load="imageLoaded"
        >
      </transition>

      <!-- Hotspots interativos -->
      <transition-group name="hotspot-fade">
        <div
          v-for="(hotspot, index) in currentImage.hotspots"
          :key="`hotspot-${currentImageIndex}-${index}`"
          class="vision-hotspot"
          :class="{
            'pulsating': !activeHotspot,
            'active': activeHotspot === index,
            'hidden': activeHotspot !== null && activeHotspot !== index
          }"
          :style="{
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
            transform: 'translate(-50%, -50%)'
          }"
          @click="toggleHotspot(index)"
        >
          <div class="hotspot-indicator"></div>
        </div>
      </transition-group>

      <!-- Overlay narrativo -->
      <div
        v-if="!activeHotspot && currentImage.narrative"
        class="narrative-overlay"
        @click="dismissNarrative"
      >
        <div class="narrative-content">
          <p>{{ currentImage.narrative }}</p>
          <div class="narrative-hint">Toque nos pontos brilhantes para explorar</div>
        </div>
      </div>

      <!-- Informação detalhada do hotspot -->
      <transition name="detail-fade">
        <div
          v-if="activeHotspot !== null"
          class="hotspot-detail"
          @click.self="closeHotspot"
        >
          <div class="detail-panel" @click.stop>
            <div class="detail-header">
              <h3>{{ currentHotspotData.title }}</h3>
              <button class="close-btn" @click="closeHotspot">×</button>
            </div>
            <div class="detail-content">
              <p v-html="currentHotspotData.description"></p>

              <div v-if="currentHotspotData.scriptureRef" class="scripture-reference">
                <p class="scripture-text">{{ currentHotspotData.scriptureText }}</p>
                <span class="reference-source">{{ currentHotspotData.scriptureRef }}</span>
              </div>

              <!-- Botões de navegação entre hotspots -->
              <div v-if="currentImage.hotspots.length > 1" class="hotspot-navigation">
                <button
                  class="hotspot-nav-btn"
                  @click="navigateToHotspot('prev')"
                  :disabled="activeHotspot === 0"
                >
                  ← Anterior
                </button>
                <button
                  class="hotspot-nav-btn"
                  @click="navigateToHotspot('next')"
                  :disabled="activeHotspot === currentImage.hotspots.length - 1"
                >
                  Próximo →
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Controles de navegação -->
    <div v-if="!showIntro" class="vision-controls">
      <button
        v-if="currentImageIndex > 0"
        class="nav-btn prev-btn"
        @click="previousImage"
        aria-label="Imagem anterior"
      >
        <span class="nav-arrow">←</span>
      </button>

      <button
        class="fullscreen-btn"
        @click="toggleFullscreen"
        :aria-label="isFullscreen ? 'Sair da tela cheia' : 'Modo tela cheia'"
      >
        <span class="fullscreen-icon">{{ isFullscreen ? '⟲' : '⟱' }}</span>
      </button>

      <button
        v-if="currentImageIndex < visionData.images.length - 1"
        class="nav-btn next-btn"
        @click="nextImage"
        aria-label="Próxima imagem"
      >
        <span class="nav-arrow">→</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImersiveVision',
  props: {
    visionData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showIntro: true,
      currentImageIndex: 0,
      activeHotspot: null,
      isImageLoaded: false,
      isFullscreen: false
    }
  },
  computed: {
    currentImage() {
      return this.visionData.images[this.currentImageIndex] || {}
    },
    currentHotspotData() {
      if (this.activeHotspot === null) return {}
      return this.currentImage.hotspots[this.activeHotspot] || {}
    }
  },
  methods: {
    startVisionJourney() {
      this.showIntro = false
    },

    imageLoaded() {
      this.isImageLoaded = true
    },

    navigateToImage(index) {
      if (index >= 0 && index < this.visionData.images.length) {
        this.closeHotspot()
        this.currentImageIndex = index
      }
    },

    previousImage() {
      if (this.currentImageIndex > 0) {
        this.navigateToImage(this.currentImageIndex - 1)
      }
    },

    nextImage() {
      if (this.currentImageIndex < this.visionData.images.length - 1) {
        this.navigateToImage(this.currentImageIndex + 1)
      }
    },

    toggleHotspot(index) {
      if (this.activeHotspot === index) {
        this.closeHotspot()
      } else {
        this.activeHotspot = index
      }
    },

    closeHotspot() {
      this.activeHotspot = null
    },

    dismissNarrative() {
      // Poderia definir um flag para não mostrar mais a narrativa desta imagem
      // Por enquanto apenas um método para futura implementação
    },

    navigateToHotspot(direction) {
      if (this.activeHotspot === null) return

      if (direction === 'prev' && this.activeHotspot > 0) {
        this.activeHotspot--
      } else if (direction === 'next' && this.activeHotspot < this.currentImage.hotspots.length - 1) {
        this.activeHotspot++
      }
    },

    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen

      // Implementação do modo tela cheia usando a API Fullscreen
      const container = this.$el

      if (this.isFullscreen) {
        if (container.requestFullscreen) {
          container.requestFullscreen()
        } else if (container.mozRequestFullScreen) {
          container.mozRequestFullScreen()
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen()
        } else if (container.msRequestFullscreen) {
          container.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
    },

    // Detectar quando o usuário sai do modo tela cheia usando Esc
    handleFullscreenChange() {
      if (document.fullscreenElement === null) {
        this.isFullscreen = false
      }
    }
  },
  mounted() {
    // Adicionar listener para eventos de mudança no modo tela cheia
    document.addEventListener('fullscreenchange', this.handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange)
  },
  beforeUnmount() {
    // Remover listeners antes de destruir o componente
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange)
  }
}
</script>

<style scoped>
.immersive-vision-container {
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 500px;
  overflow: hidden;
  background-color: var(--color-background);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  transition: all 0.5s ease;
}

.fullscreen-mode {
  height: 100vh;
  border-radius: 0;
}

/* Cortina de entrada */
.vision-intro {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.7)),
              url('/images/texture-stars.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;
  text-align: center;
}

.intro-content {
  max-width: 90%;
  animation: fadeInUp 1.2s ease-out;
}

.intro-title {
  font-size: 2.5rem;
  color: var(--color-secondary);
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-shadow: 0 0 15px rgba(196, 180, 84, 0.7);
}

.intro-quote {
  font-family: var(--font-family-quote);
  font-size: 1.5rem;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.intro-source {
  color: var(--color-secondary);
  font-weight: 500;
  margin-bottom: 2.5rem;
}

.intro-instruction {
  opacity: 0.7;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: pulse 2s infinite;
}

/* Container da imagem principal */
.vision-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
  overflow: hidden;
}

.vision-image-wrapper.active {
  opacity: 1;
}

.vision-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 1.5s ease;
}

.hotspot-individual-image {
  object-fit: contain;
  background-color: rgba(0, 0, 0, 0.8);
}

/* Hotspots interativos */
.vision-hotspot {
  position: absolute;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  cursor: pointer;
  transition: all 0.3s ease;
}

.vision-hotspot.hidden {
  opacity: 0;
  pointer-events: none;
}

.hotspot-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--color-secondary);
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.4), 0 0 20px rgba(196, 180, 84, 0.7);
  transition: all 0.3s ease;
}

.vision-hotspot.pulsating .hotspot-indicator {
  animation: pulse 2s infinite;
}

.vision-hotspot.active .hotspot-indicator {
  background-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.6), 0 0 25px var(--color-primary);
  transform: scale(1.2);
}

.vision-hotspot:hover .hotspot-indicator {
  transform: scale(1.3);
}

/* Overlay narrativo */
.narrative-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5) 70%, transparent);
  color: var(--color-text);
  z-index: 3;
  transition: opacity 0.5s ease;
}

.narrative-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.narrative-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-family: var(--font-family-quote);
  font-style: italic;
}

.narrative-hint {
  font-size: 0.85rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  animation: fadeInOut 2s infinite;
}

/* Painel de detalhes do hotspot */
.hotspot-detail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.detail-panel {
  width: 90%;
  max-width: 500px;
  max-height: 80%;
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  animation: panelSlideUp 0.4s ease-out;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--color-primary-dark);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-secondary);
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.detail-content {
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 60vh;
}

.detail-content p {
  line-height: 1.7;
  margin-bottom: 1rem;
}

.scripture-reference {
  font-family: var(--font-family-quote);
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-left: 3px solid var(--color-secondary);
  margin-top: 1.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

.scripture-text {
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.reference-source {
  display: block;
  font-weight: 500;
  color: var(--color-secondary);
  text-align: right;
}

/* Navegação de hotspots */
.hotspot-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
}

.hotspot-nav-btn {
  background-color: var(--color-primary-dark);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
}

.hotspot-nav-btn:hover:not(:disabled) {
  background-color: var(--color-primary);
  transform: translateY(-2px);
}

.hotspot-nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Navegação de sequência */
.sequence-navigation {
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 8;
  transition: all 0.3s ease;
}

.sequence-indicators {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.sequence-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.sequence-dot.active {
  background-color: var(--color-secondary);
  transform: scale(1.2);
}

.sequence-title {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-secondary);
  max-width: 80%;
  text-align: center;
}

/* Controles de navegação */
.vision-controls {
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
  z-index: 8;
}

.nav-btn, .fullscreen-btn {
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.nav-btn:hover, .fullscreen-btn:hover {
  background-color: rgba(75, 46, 131, 0.7);
  transform: translateY(-3px);
}

.nav-arrow {
  font-size: 1.5rem;
}

.fullscreen-icon {
  font-size: 1.2rem;
}

/* Animações */
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInOut {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

@keyframes panelSlideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Transições */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.image-fade-enter-active, .image-fade-leave-active {
  transition: opacity 0.8s ease;
}
.image-fade-enter-from, .image-fade-leave-to {
  opacity: 0;
}

.hotspot-fade-enter-active, .hotspot-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.hotspot-fade-enter-from, .hotspot-fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.detail-fade-enter-active, .detail-fade-leave-active {
  transition: opacity 0.3s ease;
}
.detail-fade-enter-from, .detail-fade-leave-to {
  opacity: 0;
}

/* Responsividade */
@media (max-width: 768px) {
  .immersive-vision-container {
    height: 85vh;
  }

  .intro-title {
    font-size: 1.8rem;
  }

  .intro-quote {
    font-size: 1.2rem;
  }

  .detail-panel {
    width: 95%;
  }

  .vision-controls {
    bottom: 1rem;
  }

  .nav-btn, .fullscreen-btn {
    width: 40px;
    height: 40px;
  }
}
</style>
