<template>
  <div class="immersive-narrative" :class="{ 'fullscreen': isFullscreen }">
    <!-- Camada de background com imagem -->
    <div class="narrative-background">
      <transition name="fade" mode="out-in">
        <img
          :src="currentSlide.backgroundImage"
          :alt="currentSlide.title"
          :key="currentSlide.backgroundImage"
          class="background-image"
          @load="imageLoaded = true"
        >
      </transition>
      <div class="overlay" :class="currentSlide.overlayClass"></div>
    </div>

    <!-- Container de conteúdo narrativo -->
    <div
      class="narrative-content"
      v-touch:swipe.left="nextSlide"
      v-touch:swipe.right="previousSlide"
    >
      <!-- Cabeçalho e título do bloco narrativo -->
      <div class="narrative-header">
        <h2 v-if="blockTitle" class="block-title">{{ blockTitle }}</h2>
        <div class="progress-indicator">
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="progress-dot"
            :class="{ 'active': currentIndex >= index, 'current': currentIndex === index }"
            @click="goToSlide(index)"
          ></div>
        </div>
      </div>

      <!-- Conteúdo do slide atual -->
      <div
        class="slide-container"
        v-touch:tap="isTypingComplete ? null : completeTyping"
      >
        <transition name="fade" mode="out-in">
          <div :key="currentIndex" class="slide-content">
            <h3 v-if="currentSlide.title" class="slide-title">{{ currentSlide.title }}</h3>

            <!-- Renderiza texto narrativo com efeito de digitação -->
            <div class="narrative-text">
              <span
                v-for="(line, lineIndex) in formattedText"
                :key="lineIndex"
                class="text-line"
              >
                <template v-if="isTypingComplete || typingLineIndex > lineIndex">
                  {{ line }}
                </template>
                <template v-else-if="typingLineIndex === lineIndex">
                  {{ line.substring(0, typingCharIndex) }}
                  <span class="typing-cursor">|</span>
                </template>
              </span>
            </div>
          </div>
        </transition>
      </div>

      <!-- Controles de navegação -->
      <div class="narrative-controls">
        <button
          v-if="currentIndex > 0"
          class="nav-btn prev-btn"
          @click="previousSlide"
          :disabled="isTyping && !isTypingComplete"
        >
          <span class="nav-arrow">←</span> Anterior
        </button>

        <button
          v-if="isTyping && !isTypingComplete"
          class="nav-btn skip-btn"
          @click="completeTyping"
        >
          Pular Digitação
        </button>

        <button
          v-if="currentIndex < slides.length - 1"
          class="nav-btn next-btn"
          @click="nextSlide"
          :disabled="isTyping && !isTypingComplete"
        >
          Próximo <span class="nav-arrow">→</span>
        </button>

        <button
          v-else
          class="nav-btn complete-btn"
          @click="completeBlock"
          :disabled="isTyping && !isTypingComplete"
        >
          Continuar <span class="nav-arrow">→</span>
        </button>
      </div>
    </div>

    <!-- Controle de tela cheia -->
    <button
      class="fullscreen-btn"
      @click="exitFullscreenAndReturn"
      :aria-label="isFullscreen ? 'Sair da tela cheia' : 'Modo tela cheia'"
    >
      <span class="fullscreen-icon">{{ isFullscreen ? '⟲' : '⟱' }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ImersiveNarrative',
  props: {
    blockTitle: {
      type: String,
      default: ''
    },
    slides: {
      type: Array,
      required: true
      // Cada slide deve ter: { title, text, backgroundImage, overlayClass }
      // text pode ser uma string ou um array de strings para linhas separadas
    },
    typingSpeed: {
      type: Number,
      default: 40 // ms por caractere
    },
    autoStartTyping: {
      type: Boolean,
      default: true
    },
    autoFullscreen: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      isFullscreen: false,
      imageLoaded: false,
      // Controle do efeito de digitação
      isTyping: false,
      isTypingComplete: false,
      typingLineIndex: 0,
      typingCharIndex: 0,
      typingTimeout: null,
      // Controle de zoom
      scale: 1,
      startDistance: 0,
      isPinching: false,
      // Controle de gestos
      touchStartX: 0,
      touchEndX: 0
    }
  },
  computed: {
    currentSlide() {
      return this.slides[this.currentIndex] || {}
    },
    formattedText() {
      // Garante que o texto seja um array de linhas
      const text = this.currentSlide.text || ''
      return Array.isArray(text) ? text : [text]
    }
  },
  watch: {
    currentIndex() {
      // Resetar estado de digitação quando muda de slide
      this.resetTyping()
      if (this.autoStartTyping) {
        this.startTyping()
      }
    }
  },
  methods: {
    previousSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    nextSlide() {
      if (this.currentIndex < this.slides.length - 1) {
        this.currentIndex++
      }
    },
    goToSlide(index) {
      if (index >= 0 && index < this.slides.length) {
        this.currentIndex = index
      }
    },
    completeBlock() {
      // Emite evento quando o usuário termina este bloco narrativo
      // Agora inclui um parâmetro para indicar que deve ir para o próximo
      this.$emit('complete', 'next')
    },
    enterFullscreen() {
      const container = this.$el

      this.isFullscreen = true

      if (container.requestFullscreen) {
        container.requestFullscreen()
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen()
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen()
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen()
      }
    },
    exitFullscreen() {
      this.isFullscreen = false

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
    exitFullscreenAndReturn() {
      this.exitFullscreen();
      // Emite evento para retornar à seleção de blocos
      this.$emit('exit-fullscreen');
    },
    toggleFullscreen() {
      if (this.isFullscreen) {
        this.exitFullscreen()
      } else {
        this.enterFullscreen()
      }
    },
    handleFullscreenChange() {
      // Detectar quando o usuário sai do modo tela cheia usando Esc
      this.isFullscreen = !!document.fullscreenElement
    },
    // Métodos para o efeito de digitação
    startTyping() {
      // Inicia o efeito de digitação
      this.isTyping = true
      this.isTypingComplete = false
      this.typingLineIndex = 0
      this.typingCharIndex = 0
      this.typeNextChar()
    },
    typeNextChar() {
      if (!this.isTyping) return

      const currentText = this.formattedText[this.typingLineIndex] || ''

      if (this.typingCharIndex < currentText.length) {
        // Continua digitando caracteres na linha atual
        this.typingCharIndex++
        this.typingTimeout = setTimeout(this.typeNextChar, this.typingSpeed)
      } else if (this.typingLineIndex < this.formattedText.length - 1) {
        // Move para a próxima linha
        this.typingLineIndex++
        this.typingCharIndex = 0
        this.typingTimeout = setTimeout(this.typeNextChar, this.typingSpeed * 3) // Pausa maior entre linhas
      } else {
        // Completou a digitação de todas as linhas
        this.isTypingComplete = true
        this.isTyping = false
      }
    },
    completeTyping() {
      // Parar a animação de digitação e mostrar o texto completo
      clearTimeout(this.typingTimeout)
      this.isTypingComplete = true
      this.isTyping = false
    },
    resetTyping() {
      // Resetar o estado de digitação
      clearTimeout(this.typingTimeout)
      this.isTyping = false
      this.isTypingComplete = false
      this.typingLineIndex = 0
      this.typingCharIndex = 0
    },

    // Métodos para controlar gestos
    handleTouchStart(event) {
      if (event.touches.length === 1) {
        // Armazenar posição inicial para detectar deslize horizontal
        this.touchStartX = event.touches[0].clientX;
      } else if (event.touches.length === 2) {
        // Iniciar gesto de pinça para zoom
        this.isPinching = true;
        this.startDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY
        );
      }
    },

    handleTouchMove(event) {
      if (event.touches.length === 2 && this.isPinching) {
        // Calcular nova distância para zoom
        const currentDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY
        );

        // Calcular novo fator de escala
        let newScale = this.scale * (currentDistance / this.startDistance);

        // Limitar o zoom entre 0.8 e 3
        newScale = Math.min(Math.max(newScale, 0.8), 3);

        // Aplicar zoom na imagem
        const backgroundImage = this.$el.querySelector('.background-image');
        if (backgroundImage) {
          backgroundImage.style.transform = `scale(${newScale})`;
          this.scale = newScale;
        }

        // Atualizar distância inicial para o próximo cálculo
        this.startDistance = currentDistance;

        // Prevenir comportamento padrão para evitar rolagem ou zoom do navegador
        event.preventDefault();
      }
    },

    handleTouchEnd(event) {
      if (event.touches.length < 2) {
        this.isPinching = false;
      }

      if (event.changedTouches.length > 0 && !this.isPinching) {
        this.touchEndX = event.changedTouches[0].clientX;

        // Detectar direção do deslize
        const diffX = this.touchEndX - this.touchStartX;
        const threshold = 50; // Distância mínima para considerar como deslize

        if (diffX > threshold) {
          // Deslize para a direita
          this.previousSlide();
        } else if (diffX < -threshold) {
          // Deslize para a esquerda
          this.nextSlide();
        }
      }
    }
  },
  mounted() {
    // Adicionar listeners para eventos de mudança no modo tela cheia
    document.addEventListener('fullscreenchange', this.handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange)

    // Iniciar digitação automática se habilitada
    if (this.autoStartTyping) {
      this.startTyping()
    }

    // Entrar automaticamente em modo tela cheia
    if (this.autoFullscreen) {
      // Pequeno atraso para garantir que o DOM esteja pronto
      setTimeout(() => {
        this.enterFullscreen()
      }, 300)
    }

    // Adicionar eventos de touch para gestos de zoom e swipe
    this.$el.addEventListener('touchstart', this.handleTouchStart, { passive: false })
    this.$el.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    this.$el.addEventListener('touchend', this.handleTouchEnd, { passive: false })
  },
  beforeUnmount() {
    // Limpar timeouts e remover event listeners
    clearTimeout(this.typingTimeout)
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange)

    // Remover eventos de touch
    this.$el.removeEventListener('touchstart', this.handleTouchStart)
    this.$el.removeEventListener('touchmove', this.handleTouchMove)
    this.$el.removeEventListener('touchend', this.handleTouchEnd)

    // Sair do modo tela cheia ao desmontar
    if (this.isFullscreen) {
      this.exitFullscreen()
    }
  }
}
</script>

<style scoped>
.immersive-narrative {
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 500px;
  overflow: hidden;
  background-color: var(--color-background);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  touch-action: pan-x pan-y;
}

.fullscreen {
  height: 100vh;
  border-radius: 0;
  z-index: 9999;
}

/* Background e imagem */
.narrative-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
  transform-origin: center center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4));
  z-index: 2;
  pointer-events: none;
}

/* Variações de overlay */
.overlay.dark {
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6));
}

.overlay.light {
  background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2));
}

.overlay.dramatic {
  background: radial-gradient(circle at center, rgba(0,0,0,0.5), rgba(0,0,0,0.8));
}

/* Container de conteúdo */
.narrative-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 2rem;
  touch-action: manipulation; /* Melhorar comportamento de toque */
}

/* Cabeçalho e título */
.narrative-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.block-title {
  font-family: var(--font-family-heading);
  font-size: 2rem;
  color: var(--color-secondary);
  margin-bottom: 1rem;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  letter-spacing: 0.05em;
  text-align: center;
}

.progress-indicator {
  display: flex;
  gap: 0.5rem;
}

.progress-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  /* Aumentar a área clicável */
  padding: 5px;
  margin: -5px;
}

.progress-dot.active {
  background-color: var(--color-secondary);
}

.progress-dot.current {
  transform: scale(1.3);
}

/* Conteúdo do slide */
.slide-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  margin: 2rem 0;
  touch-action: pan-y; /* Permitir rolagem vertical */
}

.slide-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.slide-title {
  font-family: var(--font-family-heading);
  font-size: 1.8rem;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
}

.narrative-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-family-quote);
  font-size: 1.4rem;
  line-height: 1.6;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}

.text-line {
  display: block;
}

.typing-cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

/* Controles de navegação */
.narrative-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: auto;
}

.nav-btn {
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.8rem 1.5rem; /* Botões maiores para facilitar toque */
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: var(--font-family-heading);
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 100px; /* Garantir área mínima de toque */
  justify-content: center;
}

.nav-btn:hover:not(:disabled), .nav-btn:active:not(:disabled) {
  background-color: rgba(75, 46, 131, 0.7);
  transform: translateY(-2px);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow {
  font-size: 1.2rem;
}

.complete-btn {
  background-color: var(--color-secondary);
  color: var(--color-background);
}

.complete-btn:hover:not(:disabled), .complete-btn:active:not(:disabled) {
  background-color: var(--color-secondary-light);
}

/* Botão de tela cheia */
.fullscreen-btn {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text);
  width: 50px; /* Botão maior para facilitar toque */
  height: 50px; /* Botão maior para facilitar toque */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.fullscreen-btn:hover, .fullscreen-btn:active {
  background-color: rgba(75, 46, 131, 0.7);
  transform: translateY(-2px);
}

.fullscreen-icon {
  font-size: 1.4rem;
}

/* Transições */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Feedback visual para toques */
@media (hover: hover) {
  .nav-btn:hover {
    transform: translateY(-2px);
  }
}

@media (hover: none) {
  .nav-btn:active {
    transform: translateY(-2px);
    background-color: rgba(75, 46, 131, 0.7);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .immersive-narrative {
    height: 100vh; /* Sempre altura total em mobile */
    border-radius: 0; /* Sem bordas arredondadas em mobile */
  }

  .narrative-content {
    padding: 1rem;
  }

  .block-title {
    font-size: 1.6rem;
  }

  .slide-title {
    font-size: 1.4rem;
  }

  .narrative-text {
    font-size: 1.1rem;
  }

  .narrative-controls {
    flex-direction: row; /* Manter botões lado a lado em mobile */
    flex-wrap: wrap; /* Permitir quebra de linha se necessário */
    gap: 0.5rem;
  }

  .nav-btn {
    flex: 1;
    min-width: 0; /* Permitir que os botões se ajustem ao espaço disponível */
    font-size: 0.9rem;
    padding: 0.7rem 1rem;
  }

  /* Melhoria para a área de toque nos pontos de progresso */
  .progress-dot {
    width: 14px;
    height: 14px;
    padding: 7px;
    margin: -7px;
  }
}

/* Especificamente para telas muito pequenas */
@media (max-width: 375px) {
  .narrative-controls {
    flex-direction: column; /* Empilhar botões em telas muito pequenas */
    width: 100%;
  }

  .nav-btn {
    width: 100%;
  }
}
</style>
