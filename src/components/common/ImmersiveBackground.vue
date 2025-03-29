<template>
  <div
    class="immersive-background"
    :class="[theme, { 'animated': animated, 'interactive': interactive }]"
    ref="backgroundContainer"
  >
    <!-- Camada de estrelas -->
    <div class="stars-layer" :class="{ 'parallax': parallaxEnabled }">
      <!-- Estrelas geradas via JavaScript no mounted() -->
    </div>

    <!-- Camada de nebulosa -->
    <div class="nebula-layer" :style="nebulaStyle"></div>

    <!-- Camada de raios celestiais -->
    <div class="celestial-rays" :style="celestialStyle"></div>

    <!-- Efeito de brilho divino -->
    <div class="divine-glow" :style="divineGlowStyle"></div>

    <!-- Partículas flutuantes -->
    <div class="particles-layer" v-if="hasParticles"></div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ImmersiveBackground',
  props: {
    theme: {
      type: String,
      default: 'celestial',
      validator: value => ['celestial', 'divine', 'prophetic', 'dark', 'revelation'].includes(value)
    },
    animated: {
      type: Boolean,
      default: true
    },
    interactive: {
      type: Boolean,
      default: true
    },
    intensity: {
      type: Number,
      default: 1,
      validator: value => value >= 0 && value <= 2
    },
    color: {
      type: String,
      default: null
    },
    parallax: {
      type: Boolean,
      default: true
    },
    hasParticles: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      isMouseMoving: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      parallaxEnabled: this.parallax && !this.isMobileDevice()
    }
  },
  computed: {
    // Estilo dinâmico para a camada de nebulosa
    nebulaStyle() {
      const themeColors = {
        celestial: 'rgba(196, 180, 84, 0.15)', // Dourado para celestial (alterado de roxo)
        divine: 'rgba(196, 180, 84, 0.15)',    // Dourado para divine
        prophetic: 'rgba(183, 65, 14, 0.1)',
        dark: 'rgba(20, 20, 20, 0.2)',
        revelation: 'rgba(196, 180, 84, 0.15)' // Dourado para revelation
      };

      const baseColor = this.color ? this.color : themeColors[this.theme];
      const opacity = 0.1 + (this.intensity * 0.1);

      return {
        background: `radial-gradient(ellipse at ${this.getGradientPosition()}, ${baseColor} 0%, rgba(0, 0, 0, 0) 70%)`,
        opacity: this.animated ? opacity : opacity + 0.05
      };
    },

    // Estilo para os raios celestiais
    celestialStyle() {
      const rotation = this.interactive && this.isMouseMoving
        ? `rotate(${this.calculateRotation()}deg)`
        : 'rotate(0deg)';

      return {
        transform: rotation,
        opacity: 0.2 + (this.intensity * 0.2)
      };
    },

    // Estilo para o brilho divino
    divineGlowStyle() {
      const position = this.interactive && this.isMouseMoving
        ? `${this.mouseX}px ${this.mouseY}px`
        : 'center';

      return {
        backgroundPosition: position,
        opacity: 0.1 + (this.intensity * 0.15)
      };
    }
  },
  methods: {
    // Cria as estrelas dinamicamente
    createStars() {
      const starsLayer = this.$el.querySelector('.stars-layer');
      if (!starsLayer) return;

      // Limpar estrelas existentes
      starsLayer.innerHTML = '';

      // Definir quantidade baseada no tamanho da tela e desempenho do dispositivo
      const isMobile = this.isMobileDevice();
      const starCount = isMobile ? 70 : 150;

      // Gerar estrelas
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Tamanho variado - pequeno para mobile
        const size = Math.random() * (isMobile ? 1.5 : 2.5) + 0.5;

        // Posicionamento aleatório
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Profundidade para efeito paralaxe (z-index 1-3)
        const depth = Math.ceil(Math.random() * 3);
        star.classList.add(`depth-${depth}`);

        // Atraso e duração aleatórios para animação
        const delay = Math.random() * 5;
        const duration = 2 + Math.random() * 3;

        // Aplicar estilos
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;

        // Adicionar a estrela ao container
        starsLayer.appendChild(star);
      }
    },

    // Cria partículas flutuantes
    createParticles() {
      if (!this.hasParticles) return;

      const particlesLayer = this.$el.querySelector('.particles-layer');
      if (!particlesLayer) return;

      // Limpar partículas existentes
      particlesLayer.innerHTML = '';

      // Menos partículas em dispositivos móveis
      const isMobile = this.isMobileDevice();
      const particleCount = isMobile ? 15 : 30;

      // Gerar partículas
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Tamanho variado
        const size = Math.random() * 6 + 2;

        // Posicionamento aleatório
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Duração e atraso aleatórios para animação
        const duration = 15 + Math.random() * 30;
        const delay = Math.random() * 5;

        // Cor aleatória com tendência para dourado
        const isGold = Math.random() > 0.3; // Aumentando a chance de partículas douradas
        if (isGold) {
          particle.classList.add('gold-particle');
        }

        // Aplicar estilos
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = 0.1 + Math.random() * 0.3;

        // Adicionar a partícula ao container
        particlesLayer.appendChild(particle);
      }
    },

    // Detecta movimento do mouse e atualiza posição
    handleMouseMove(event) {
      if (!this.interactive) return;

      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      this.isMouseMoving = true;

      // Desativa a flag após 2 segundos de inatividade
      clearTimeout(this.mouseTimeout);
      this.mouseTimeout = setTimeout(() => {
        this.isMouseMoving = false;
      }, 2000);
    },

    // Calcula rotação baseada na posição do mouse
    calculateRotation() {
      const centerX = this.windowWidth / 2;
      const centerY = this.windowHeight / 2;
      const deltaX = this.mouseX - centerX;
      const deltaY = this.mouseY - centerY;

      // Calcula ângulo em radianos e converte para graus
      return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    },

    // Define posição do gradiente baseado no mouse
    getGradientPosition() {
      if (!this.isMouseMoving || !this.interactive) {
        return 'center';
      }

      // Converte posição do mouse para porcentagens
      const x = (this.mouseX / this.windowWidth) * 100;
      const y = (this.mouseY / this.windowHeight) * 100;

      return `${x}% ${y}%`;
    },

    // Atualiza dimensões da janela quando redimensionada
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;

      // Recria elementos visuais para otimizar
      this.createStars();
      if (this.hasParticles) {
        this.createParticles();
      }

      // Atualiza status de paralaxe
      this.parallaxEnabled = this.parallax && !this.isMobileDevice();
    },

    // Verifica se é dispositivo móvel
    isMobileDevice() {
      return window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Ativa efeito de paralaxe ao rolar a página (se habilitado)
    handleScroll() {
      if (!this.parallaxEnabled) return;

      const scrollY = window.scrollY;
      const starsLayer = this.$el.querySelector('.stars-layer');

      if (starsLayer) {
        // Diferentes velocidades para diferentes profundidades
        const stars1 = starsLayer.querySelectorAll('.depth-1');
        const stars2 = starsLayer.querySelectorAll('.depth-2');
        const stars3 = starsLayer.querySelectorAll('.depth-3');

        stars1.forEach(star => {
          star.style.transform = `translateY(${scrollY * 0.2}px)`;
        });

        stars2.forEach(star => {
          star.style.transform = `translateY(${scrollY * 0.1}px)`;
        });

        stars3.forEach(star => {
          star.style.transform = `translateY(${scrollY * 0.05}px)`;
        });
      }
    }
  },
  mounted() {
    // Inicializa elementos visuais
    this.createStars();
    this.createParticles();

    // Adiciona event listeners
    if (this.interactive) {
      window.addEventListener('mousemove', this.handleMouseMove);
    }

    window.addEventListener('resize', this.handleResize);

    if (this.parallaxEnabled) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  beforeUnmount() {
    // Remove event listeners
    if (this.interactive) {
      window.removeEventListener('mousemove', this.handleMouseMove);
    }

    window.removeEventListener('resize', this.handleResize);

    if (this.parallaxEnabled) {
      window.removeEventListener('scroll', this.handleScroll);
    }

    clearTimeout(this.mouseTimeout);
  }
}
</script>

<style scoped>
.immersive-background {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

/* Camada de estrelas */
.stars-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  animation: twinkle var(--transition-slow) infinite alternate;
}

/* Diferentes profundidades para paralaxe */
.depth-1 {
  z-index: 1;
  opacity: 1;
}

.depth-2 {
  z-index: 2;
  opacity: 0.8;
}

.depth-3 {
  z-index: 3;
  opacity: 0.6;
}

/* Camada de nebulosa */
.nebula-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  opacity: 0.15;
  transition: background 1s ease-out, opacity 1s ease-out;
}

/* Raios celestiais */
.celestial-rays {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    rgba(196, 180, 84, 0.03) 10%, /* Dourado com transparência */
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
  transition: transform 2s ease-out, opacity 1s ease;
}

.animated .celestial-rays {
  animation: rotate 120s linear infinite;
}

/* Efeito de brilho divino */
.divine-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  background: radial-gradient(
    circle at center,
    rgba(196, 180, 84, 0.05) 0%, /* Dourado com transparência */
    transparent 70%
  );
  transition: background-position 3s ease-out;
}

/* Partículas flutuantes */
.particles-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
}

.particle {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  filter: blur(2px);
  animation: float linear infinite;
}

.gold-particle {
  background-color: rgba(196, 180, 84, 0.3); /* Partículas douradas */
  box-shadow: 0 0 5px rgba(196, 180, 84, 0.5);
}

/* Variantes de temas */
.theme-celestial .nebula-layer {
  background: radial-gradient(ellipse at center, rgba(196, 180, 84, 0.2) 0%, rgba(0, 0, 0, 0) 70%);
}

.theme-divine .nebula-layer {
  background: radial-gradient(ellipse at center, rgba(196, 180, 84, 0.2) 0%, rgba(0, 0, 0, 0) 70%);
}

.theme-prophetic .nebula-layer {
  background: radial-gradient(ellipse at center, rgba(183, 65, 14, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
}

.theme-revelation .nebula-layer {
  background: radial-gradient(ellipse at center, rgba(196, 180, 84, 0.2) 0%, rgba(0, 0, 0, 0) 70%);
}

/* Animações */
@keyframes twinkle {
  0% { opacity: 0.2; }
  100% { opacity: 1; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.2;
  }
  90% {
    opacity: 0.2;
  }
  100% {
    transform: translateY(-100vh) translateX(100px) rotate(360deg);
    opacity: 0;
  }
}

/* Resplandor especial para estrelas ocasionais */
.star:nth-child(5n) {
  box-shadow: 0 0 3px rgba(196, 180, 84, 0.7);
  background-color: rgba(255, 253, 228, 0.9);
}

.star:nth-child(7n) {
  animation: twinkleGold var(--transition-slow) infinite alternate;
}

@keyframes twinkleGold {
  0% {
    opacity: 0.2;
    box-shadow: 0 0 2px rgba(196, 180, 84, 0.5);
  }
  100% {
    opacity: 1;
    box-shadow: 0 0 5px rgba(196, 180, 84, 0.8);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .celestial-rays,
  .divine-glow {
    opacity: 0.1 !important; /* Reduzir intensidade em dispositivos móveis */
  }

  .star {
    animation-duration: 3s !important; /* Animações mais lentas para poupar bateria */
  }

  .particle {
    animation-duration: 30s !important; /* Partículas mais lentas */
  }
}
</style>
