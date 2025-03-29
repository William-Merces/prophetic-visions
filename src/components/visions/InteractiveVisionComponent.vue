<template>
  <div class="interactive-vision" ref="container">
    <!-- Container da imagem com pontos interativos -->
    <div
      class="vision-image-container"
      :class="{ 'exploring': isExploringHotspot }"
    >
      <!-- Imagem principal da visão -->
      <img
        :src="currentImage.src"
        :alt="currentImage.alt || 'Visão profética'"
        class="vision-image"
        ref="mainImage"
        @load="handleImageLoaded"
      />

      <!-- Overlay escuro quando explorando um hotspot -->
      <div class="image-overlay" :class="{ 'active': isExploringHotspot }"></div>

      <!-- Pontos de interação (hotspots) -->
      <div
        v-for="(hotspot, index) in currentImage.hotspots"
        :key="index"
        class="hotspot"
        :class="{ 'active': selectedHotspotIndex === index }"
        :style="getHotspotStyle(hotspot)"
        @click="selectHotspot(index)"
      >
        <div class="hotspot-pulse"></div>
        <div class="hotspot-center"></div>
      </div>
    </div>

    <!-- Informações sobre a visão -->
    <div class="vision-info" :class="{ 'exploring': isExploringHotspot }">
      <div
        class="info-main"
        :class="{ 'hidden': isExploringHotspot }"
      >
        <h2 class="vision-title">{{ currentImage.title }}</h2>
        <p class="vision-narrative">{{ currentImage.narrative }}</p>

        <div class="navigation-hint">
          <span class="hint-icon">👆</span>
          <span class="hint-text">Toque nos pontos destacados para explorar elementos da visão</span>
        </div>
      </div>

      <!-- Detalhes do hotspot selecionado -->
      <div
        v-if="isExploringHotspot"
        class="hotspot-details"
        :class="{ 'active': isExploringHotspot }"
      >
        <button class="close-hotspot-btn" @click="closeHotspot">
          <span class="close-icon">←</span> Voltar
        </button>

        <h3 class="hotspot-title">{{ selectedHotspot.title }}</h3>
        <p class="hotspot-description">{{ selectedHotspot.description }}</p>

        <div class="scripture-reference">
          <p class="scripture-text">"{{ selectedHotspot.scriptureText }}"</p>
          <span class="scripture-ref">{{ selectedHotspot.scriptureRef }}</span>
        </div>
      </div>
    </div>

    <!-- Navegação entre imagens da visão (quando há múltiplas) -->
    <div class="vision-navigation" v-if="images.length > 1">
      <button
        class="nav-arrow prev-arrow"
        @click="prevImage"
        :disabled="currentImageIndex === 0"
      >
        <span class="arrow-icon">←</span>
      </button>

      <!-- Indicadores de imagens -->
      <div class="vision-indicators">
        <button
          v-for="(_, index) in images"
          :key="index"
          class="indicator"
          :class="{ 'active': currentImageIndex === index }"
          @click="goToImage(index)"
        ></button>
      </div>

      <button
        class="nav-arrow next-arrow"
        @click="nextImage"
        :disabled="currentImageIndex === images.length - 1"
      >
        <span class="arrow-icon">→</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InteractiveVisionComponent',
  props: {
    images: {
      type: Array,
      required: true,
      // Formato esperado:
      // [
      //   {
      //     src: '/path/to/image.jpg',
      //     alt: 'Descrição da imagem',
      //     title: 'Título da visão',
      //     narrative: 'Descrição narrativa da visão',
      //     hotspots: [
      //       {
      //         x: 50, // posição percentual X
      //         y: 30, // posição percentual Y
      //         title: 'Título do ponto',
      //         description: 'Descrição detalhada',
      //         scriptureRef: 'Apocalipse 1:16',
      //         scriptureText: 'Texto bíblico relacionado'
      //       }
      //     ]
      //   }
      // ]
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentImageIndex: this.initialIndex,
      selectedHotspotIndex: null,
      isImageLoaded: false,
      imageWidth: 0,
      imageHeight: 0,
      isMobile: false
    }
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex] || {};
    },
    selectedHotspot() {
      if (this.selectedHotspotIndex === null || !this.currentImage.hotspots) {
        return null;
      }
      return this.currentImage.hotspots[this.selectedHotspotIndex] || null;
    },
    isExploringHotspot() {
      return this.selectedHotspotIndex !== null;
    }
  },
  watch: {
    initialIndex(newIndex) {
      this.goToImage(newIndex);
    }
  },
  methods: {
    // Navegação
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.closeHotspot(); // Fechar hotspot ativo ao mudar de imagem
        this.currentImageIndex--;
        this.isImageLoaded = false; // Resetar status de carregamento
        this.handleImageChange();
      }
    },

    nextImage() {
      if (this.currentImageIndex < this.images.length - 1) {
        this.closeHotspot(); // Fechar hotspot ativo ao mudar de imagem
        this.currentImageIndex++;
        this.isImageLoaded = false; // Resetar status de carregamento
        this.handleImageChange();
      }
    },

    goToImage(index) {
      if (index >= 0 && index < this.images.length && index !== this.currentImageIndex) {
        this.closeHotspot(); // Fechar hotspot ativo ao mudar de imagem
        this.currentImageIndex = index;
        this.isImageLoaded = false; // Resetar status de carregamento
        this.handleImageChange();
      }
    },

    // Gerencia mudanças de imagem
    handleImageChange() {
      this.$emit('image-change', this.currentImageIndex);

      // Rolar para o topo do componente quando a imagem mudar
      if (this.$refs.container) {
        this.$refs.container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    // Interação com hotspots
    selectHotspot(index) {
      this.selectedHotspotIndex = index;

      // Emitir evento
      this.$emit('hotspot-selected', {
        imageIndex: this.currentImageIndex,
        hotspotIndex: index,
        hotspot: this.currentImage.hotspots[index]
      });

      // Em modo mobile, rolar para mostrar os detalhes
      if (this.isMobile) {
        setTimeout(() => {
          const detailsEl = document.querySelector('.hotspot-details');
          if (detailsEl) {
            detailsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    },

    closeHotspot() {
      this.selectedHotspotIndex = null;
      this.$emit('hotspot-closed');
    },

    // Calcula estilo CSS para posicionar o hotspot
    getHotspotStyle(hotspot) {
      return {
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`
      };
    },

    // Manipula o carregamento da imagem
    handleImageLoaded() {
      this.isImageLoaded = true;

      // Obter dimensões da imagem para cálculos de posicionamento
      if (this.$refs.mainImage) {
        this.imageWidth = this.$refs.mainImage.offsetWidth;
        this.imageHeight = this.$refs.mainImage.offsetHeight;
      }
    },

    // Detecta tipo de dispositivo
    checkDeviceType() {
      this.isMobile = window.innerWidth <= 768;
    },

    // Gerencia teclas de navegação
    handleKeydown(event) {
      if (this.isExploringHotspot && event.key === 'Escape') {
        this.closeHotspot();
        return;
      }

      if (!this.isExploringHotspot) {
        if (event.key === 'ArrowLeft') {
          this.prevImage();
        } else if (event.key === 'ArrowRight') {
          this.nextImage();
        }
      }
    },

    // Detecta orientação de dispositivos móveis
    handleOrientationChange() {
      setTimeout(() => {
        this.checkDeviceType();

        // Recalcular dimensões da imagem
        if (this.$refs.mainImage) {
          this.imageWidth = this.$refs.mainImage.offsetWidth;
          this.imageHeight = this.$refs.mainImage.offsetHeight;
        }
      }, 300);
    }
  },
  mounted() {
    // Verificar tipo de dispositivo
    this.checkDeviceType();

    // Adicionar event listeners
    window.addEventListener('resize', this.checkDeviceType);
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('orientationchange', this.handleOrientationChange);
  },
  beforeUnmount() {
    // Remover event listeners
    window.removeEventListener('resize', this.checkDeviceType);
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('orientationchange', this.handleOrientationChange);
  }
}
</script>

<style scoped>
.interactive-vision {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 1200px;
  margin: 0 auto;
  transition: all var(--transition-normal);
}

/* Container da imagem */
.vision-image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: all var(--transition-normal);
}

.vision-image {
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.5s ease;
}

.vision-image-container.exploring .vision-image {
  filter: brightness(0.6) blur(2px);
}

/* Overlay para quando um hotspot está sendo explorado */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none;
}

.image-overlay.active {
  opacity: 1;
}

/* Pontos de interação (hotspots) */
.hotspot {
  position: absolute;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
}

.hotspot-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background-color: var(--color-secondary);
  border-radius: 50%;
  z-index: 2;
  transition: all var(--transition-normal);
}

.hotspot-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background-color: rgba(196, 180, 84, 0.5);
  border-radius: 50%;
  z-index: 1;
  animation: pulse 2s infinite;
}

.hotspot:hover .hotspot-center,
.hotspot.active .hotspot-center {
  width: 16px;
  height: 16px;
  background-color: var(--color-secondary-light);
}

.hotspot.active .hotspot-pulse {
  animation: none;
  width: 40px;
  height: 40px;
  background-color: rgba(196, 180, 84, 0.2);
}

/* Informações sobre a visão */
.vision-info {
  padding: 2rem;
  transition: all var(--transition-normal);
  background-color: rgba(0, 0, 0, 0.4);
}

.vision-title {
  color: var(--color-secondary);
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.vision-narrative {
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.navigation-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: rgba(75, 46, 131, 0.2);
  border-radius: var(--radius-md);
  margin-top: 1rem;
}

.hint-icon {
  font-size: 1.2rem;
}

.hint-text {
  font-style: italic;
  color: var(--color-text-muted);
}

/* Detalhes do hotspot selecionado */
.hotspot-details {
  padding: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all var(--transition-normal);
}

.hotspot-details.active {
  opacity: 1;
  transform: translateY(0);
}

.close-hotspot-btn {
  background-color: rgba(0, 0, 0, 0.3);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transition-fast);
}

.close-hotspot-btn:hover {
  background-color: rgba(75, 46, 131, 0.3);
  transform: translateX(-3px);
}

.close-icon {
  font-size: 1.1rem;
}

.hotspot-title {
  color: var(--color-secondary);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.hotspot-description {
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.scripture-reference {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  border-left: 3px solid var(--color-secondary);
}

.scripture-text {
  font-family: var(--font-family-quote);
  font-style: italic;
  margin-bottom: 0.5rem;
  line-height: 1.7;
}

.scripture-ref {
  display: block;
  text-align: right;
  color: var(--color-secondary);
  font-weight: 500;
}

/* Navegação entre imagens */
.vision-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
}

.nav-arrow {
  background-color: rgba(0, 0, 0, 0.3);
  color: var(--color-text);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.nav-arrow:hover:not(:disabled) {
  background-color: rgba(75, 46, 131, 0.3);
  transform: translateY(-3px);
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.arrow-icon {
  font-size: 1.2rem;
}

.vision-indicators {
  display: flex;
  gap: 0.5rem;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.indicator.active {
  background-color: var(--color-secondary);
  transform: scale(1.2);
}

.indicator:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.5);
}

/* Animações */
@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.7;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.3;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.7;
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .vision-info {
    padding: 1.5rem;
  }

  .vision-title {
    font-size: 1.5rem;
  }

  .hotspot {
    width: 40px; /* Maior área de toque para mobile */
    height: 40px;
  }

  .vision-info.exploring .info-main.hidden {
    display: none;
  }

  .hotspot-title {
    font-size: 1.3rem;
  }

  .nav-arrow {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .vision-info {
    padding: 1rem;
  }

  .vision-title {
    font-size: 1.3rem;
  }

  .hotspot {
    width: 50px; /* Ainda maior para telas pequenas */
    height: 50px;
  }

  .hotspot-center {
    width: 14px;
    height: 14px;
  }

  .scripture-reference {
    padding: 1rem;
  }
}
</style>
