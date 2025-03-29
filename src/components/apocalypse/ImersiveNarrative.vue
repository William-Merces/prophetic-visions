<template>
  <div class="immersive-narrative" :class="{ 'fullscreen-mode': isFullscreen }">
    <!-- Camada de background com imagem -->
    <div class="narrative-background">
      <transition name="fade" mode="out-in">
        <img
          :src="currentSlide.backgroundImage"
          :alt="currentSlide.title"
          :key="currentSlide.backgroundImage"
          class="background-image"
          @load="handleImageLoad"
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
      <div class="slide-container">
        <transition name="fade" mode="out-in">
          <div :key="currentIndex" class="slide-content">
            <h3 v-if="currentSlide.title" class="slide-title">{{ currentSlide.title }}</h3>

            <!-- Texto narrativo com legenda clara -->
            <div class="narrative-text">
              <div class="text-container">
                <p
                  v-for="(line, lineIndex) in formattedText"
                  :key="lineIndex"
                  class="text-line"
                >
                  {{ line }}
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Controles de áudio (visíveis apenas se o áudio estiver disponível) -->
      <div v-if="hasAudio" class="audio-controls">
        <button
          class="audio-btn"
          @click="toggleAudio"
          :aria-label="isAudioPlaying ? 'Pausar narração' : 'Reproduzir narração'"
        >
          <span class="audio-icon">{{ isAudioPlaying ? '⏸' : '▶️' }}</span>
          {{ isAudioPlaying ? 'Pausar narração' : 'Reproduzir narração' }}
        </button>
      </div>

      <!-- Controles de navegação -->
      <div class="narrative-controls">
        <button
          v-if="currentIndex > 0"
          class="nav-btn prev-btn"
          @click="previousSlide"
        >
          <span class="nav-arrow">←</span> Anterior
        </button>

        <button
          v-if="currentIndex < slides.length - 1"
          class="nav-btn next-btn"
          @click="nextSlide"
        >
          Próximo <span class="nav-arrow">→</span>
        </button>

        <button
          v-else
          class="nav-btn complete-btn"
          @click="completeBlock"
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
      default: 0 // Definido como 0 para desativar o efeito de digitação
    },
    autoStartTyping: {
      type: Boolean,
      default: false // Desativado por padrão
    },
    autoFullscreen: {
      type: Boolean,
      default: false // Desativado por padrão
    },
    audioSrc: {
      type: String,
      default: '' // Caminho para o arquivo de áudio, se disponível
    }
  },
  data() {
    return {
      currentIndex: 0,
      isFullscreen: false,
      imageLoaded: false,
      isAudioPlaying: false,
      audioPlayer: null,

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
    },
    hasAudio() {
      // Verifica se o slide atual tem um arquivo de áudio associado
      return !!this.audioSrc || (this.currentSlide.audioSrc && this.currentSlide.audioSrc.length > 0)
    },
    currentAudioSrc() {
      // Prioriza o áudio específico do slide, senão usa o áudio geral
      return (this.currentSlide.audioSrc) || this.audioSrc
    }
  },
  watch: {
    currentIndex() {
      // Ao mudar de slide, pausar o áudio atual se estiver tocando
      this.pauseAudio();

      // Se houver áudio para o novo slide e a reprodução automática estiver ativada, iniciar
      if (this.hasAudio && this.autoPlayAudio) {
        this.playAudio();
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

    // Controle de áudio
    initializeAudio() {
      if (this.hasAudio) {
        this.audioPlayer = new Audio(this.currentAudioSrc);
        this.audioPlayer.addEventListener('ended', this.handleAudioEnded);
      }
    },

    playAudio() {
      if (this.audioPlayer && !this.isAudioPlaying) {
        this.audioPlayer.play()
          .then(() => {
            this.isAudioPlaying = true;
          })
          .catch(error => {
            console.error('Erro ao reproduzir áudio:', error);
          });
      }
    },

    pauseAudio() {
      if (this.audioPlayer && this.isAudioPlaying) {
        this.audioPlayer.pause();
        this.isAudioPlaying = false;
      }
    },

    toggleAudio() {
      if (this.isAudioPlaying) {
        this.pauseAudio();
      } else {
        this.playAudio();
      }
    },

    handleAudioEnded() {
      this.isAudioPlaying = false;
    },

    // Método para tratar o carregamento de imagem
    handleImageLoad() {
      this.imageLoaded = true;
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
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);

    // Inicializar áudio se disponível
    this.initializeAudio();

    // Entrar automaticamente em modo tela cheia se configurado
    if (this.autoFullscreen) {
      // Pequeno atraso para garantir que o DOM esteja pronto
      setTimeout(() => {
        this.enterFullscreen();
      }, 300);
    }

    // Adicionar eventos de touch para gestos de zoom e swipe
    this.$el.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    this.$el.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    this.$el.addEventListener('touchend', this.handleTouchEnd, { passive: false });
  },
  beforeUnmount() {
    // Limpar e remover event listeners
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);

    // Remover eventos de touch
    this.$el.removeEventListener('touchstart', this.handleTouchStart);
    this.$el.removeEventListener('touchmove', this.handleTouchMove);
    this.$el.removeEventListener('touchend', this.handleTouchEnd);

    // Parar e limpar reprodução de áudio
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer.removeEventListener('ended', this.handleAudioEnded);
      this.audioPlayer = null;
    }

    // Sair do modo tela cheia ao desmontar
    if (this.isFullscreen) {
      this.exitFullscreen();
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

.fullscreen-mode {
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

/* Estilo melhorado para o texto narrativo */
.narrative-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.text-container {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  max-width: 90%;
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.text-line {
  font-family: var(--font-family-quote);
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  color: var(--color-text);
}

.text-line:last-child {
  margin-bottom: 0;
}

/* Controles de áudio */
.audio-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.audio-btn {
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.audio-btn:hover {
  background-color: rgba(75, 46, 131, 0.7);
  transform: translateY(-2px);
}

.audio-icon {
  font-size: 1.2rem;
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
  min-width: 120px; /* Garantir área mínima de toque */
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

  .text-line {
    font-size: 1.1rem;
  }

  .narrative-controls {
    flex-direction: column; /* Empilhar botões em mobile */
    gap: 0.5rem;
  }

  .nav-btn {
    width: 100%; /* Botões ocupam toda a largura */
    min-width: 0; /* Reset do min-width */
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

  .text-container {
    max-width: 95%;
  }
}

/* Especificamente para telas muito pequenas */
@media (max-width: 375px) {
  .narrative-content {
    padding: 0.8rem;
  }

  .block-title {
    font-size: 1.4rem;
  }

  .text-line {
    font-size: 1rem;
  }

  .slide-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
}
</style>
