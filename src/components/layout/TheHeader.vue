<template>
  <header class="main-header" :class="{ 'header-scrolled': isScrolled }">
    <div class="header-container">
      <div class="logo-container">
        <router-link to="/" class="logo">
          <span class="logo-icon">✧</span>
          <span class="logo-text">Prophetic Visions</span>
        </router-link>
        <div class="tagline" v-if="!isScrolled">Explorando as Visões Proféticas das Escrituras</div>
      </div>

      <div class="nav-controls">
        <button
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          :aria-expanded="mobileMenuOpen"
          aria-controls="main-navigation"
          aria-label="Menu Principal"
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </div>

    <div
      class="navigation-wrapper"
      :class="{ 'mobile-open': mobileMenuOpen }"
      id="main-navigation"
    >
      <TheNavigation />
    </div>
  </header>
</template>

<script>
import TheNavigation from './TheNavigation.vue'

export default {
  name: 'TheHeader',
  components: {
    TheNavigation
  },
  data() {
    return {
      isScrolled: false,
      mobileMenuOpen: false
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50

      // Fecha o menu móvel ao rolar se estiver aberto
      if (this.mobileMenuOpen && window.scrollY > 100) {
        this.mobileMenuOpen = false
      }
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen

      // Bloqueia o scroll quando o menu está aberto
      if (this.mobileMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    checkScreenSize() {
      // Resetar menu em telas grandes
      if (window.innerWidth > 768 && this.mobileMenuOpen) {
        this.mobileMenuOpen = false
        document.body.style.overflow = ''
      }
    }
  },
  watch: {
    $route() {
      // Fecha o menu móvel quando a rota muda
      if (this.mobileMenuOpen) {
        this.mobileMenuOpen = false
        document.body.style.overflow = ''
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.checkScreenSize)
    this.handleScroll() // Verificar posição inicial
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.checkScreenSize)
    document.body.style.overflow = '' // Garantir que o overflow é restaurado
  }
}
</script>

<style scoped>
.main-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  transition: all var(--transition-normal);
}

.header-scrolled {
  background-color: rgba(0, 0, 0, 0.95);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  max-width: 1400px;
  margin: 0 auto;
}

.logo-container {
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform var(--transition-fast);
}

.logo:hover {
  transform: scale(1.02);
}

.logo-icon {
  color: var(--color-secondary);
  font-size: 1.8rem;
  margin-right: var(--space-sm);
}

.logo-text {
  font-family: var(--font-family-heading);
  font-size: 1.5rem;
  color: var(--color-text);
  font-weight: 700;
  letter-spacing: 0.05em;
}

.tagline {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-style: italic;
  margin-top: 2px;
  max-width: 300px;
  transition: opacity var(--transition-normal);
}

.header-scrolled .tagline {
  opacity: 0;
  height: 0;
  margin: 0;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.mobile-menu-toggle .bar {
  height: 3px;
  width: 100%;
  background-color: var(--color-text);
  border-radius: 3px;
  transition: all 0.3s;
}

.mobile-menu-toggle[aria-expanded="true"] .bar:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.mobile-menu-toggle[aria-expanded="true"] .bar:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle[aria-expanded="true"] .bar:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

@media (max-width: 768px) {
  .logo-text {
    font-size: 1.2rem;
  }

  .tagline {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .navigation-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.95);
    padding-top: 80px;
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
    overflow-y: auto;
    z-index: 5;
  }

  .navigation-wrapper.mobile-open {
    transform: translateY(0);
  }
}
</style>
