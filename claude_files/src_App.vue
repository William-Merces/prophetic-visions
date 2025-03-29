<template>
  <div class="app">
    <!-- Navegação principal -->
    <NavigationComponent />

    <!-- Background imersivo (estrelas + efeitos) compartilhado -->
    <div class="global-background">
      <div class="stars-background">
        <!-- Estrelas geradas via JavaScript no mounted() -->
      </div>
      <div class="visual-effects">
        <div class="celestial-rays"></div>
      </div>
    </div>

    <!-- Conteúdo principal com transições -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Botão voltar ao topo -->
    <button
      v-if="showScrollTop"
      @click="scrollToTop"
      class="scroll-top-btn"
      aria-label="Voltar ao topo"
    >
      <span class="scroll-icon">↑</span>
    </button>
  </div>
</template>

<script>
import NavigationComponent from '@/components/layout/NavigationComponent.vue';

export default {
  name: 'App',
  components: {
    NavigationComponent
  },
  data() {
    return {
      showScrollTop: false
    }
  },
  methods: {
    handleScroll() {
      // Mostrar/ocultar botão de voltar ao topo
      this.showScrollTop = window.scrollY > 500;
    },

    scrollToTop() {
      // Rolagem suave para o topo
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    createStars() {
      const starsContainer = document.querySelector('.stars-background');
      if (!starsContainer) return;

      const starCount = window.innerWidth <= 768 ? 100 : 200; // Menos estrelas em dispositivos móveis

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Posição aleatória
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Tamanho aleatório (menor em dispositivos móveis)
        const size = Math.random() * (window.innerWidth <= 768 ? 1.5 : 2) + 1;

        // Duração da animação aleatória
        const duration = Math.random() * 3 + 2;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;

        starsContainer.appendChild(star);
      }
    },

    checkDeviceOrientation() {
      // Adiciona classe ao body para detecção de orientação
      const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      document.body.classList.remove('portrait', 'landscape');
      document.body.classList.add(orientation);
    }
  },
  mounted() {
    // Adicionar listeners
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.checkDeviceOrientation);

    // Inicializar estado
    this.handleScroll();
    this.checkDeviceOrientation();

    // Criar animação de estrelas no background
    this.createStars();

    // Adicionar classe à página para animações de entrada
    document.body.classList.add('app-loaded');
  },
  beforeUnmount() {
    // Remover listeners
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.checkDeviceOrientation);
  }
}
</script>

<style>
/* Estilos globais aplicados a todo o aplicativo */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Background global compartilhado entre todas as páginas */
.global-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}

.stars-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  background-color: var(--color-background);
}

.visual-effects {
  position: absolute;
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
  background: radial-gradient(
    ellipse at center,
    rgba(75, 46, 131, 0.2) 0%,
    rgba(75, 46, 131, 0) 70%
  );
  animation: rotate 120s linear infinite;
}

/* Conteúdo principal */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 70px; /* Espaço para a navegação fixa */
}

/* Botão voltar ao topo */
.scroll-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: var(--color-secondary);
  color: var(--color-background);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  opacity: 0.8;
  transition: all var(--transition-normal);
}

.scroll-top-btn:hover {
  opacity: 1;
  transform: translateY(-5px);
}

.scroll-icon {
  font-size: 1.5rem;
}

/* Animações para transições de página */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Animações compartilhadas */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Classes de utilidade */
.text-center {
  text-align: center;
}

/* Responsividade */
@media (max-width: 768px) {
  .main-content {
    padding-top: 60px; /* Menor espaço para a navegação em mobile */
  }

  .scroll-top-btn {
    width: 40px;
    height: 40px;
    bottom: 1.5rem;
    right: 1.5rem;
  }

  .scroll-icon {
    font-size: 1.2rem;
  }
}

/* Animação de entrada do aplicativo */
body.app-loaded .main-content {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Customização de scrollbar para navegadores compatíveis */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb {
  background: rgba(75, 46, 131, 0.5);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 46, 131, 0.7);
}
</style>
