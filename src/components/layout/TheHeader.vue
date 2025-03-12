<template>
  <header class="main-header" :class="{ 'header-scrolled': isScrolled }">
    <div class="header-container">
      <!-- Seção 1: Logo e tagline -->
      <div class="logo-section">
        <router-link to="/" class="logo">
          <span class="logo-icon">✧</span>
          <span class="logo-text">Prophetic Visions</span>
        </router-link>
        <div class="tagline" v-if="!isScrolled">Explorando as Visões Proféticas das Escrituras</div>
      </div>

      <!-- Seção 2: Navegação principal -->
      <div class="main-nav-wrapper">
        <nav id="main-nav" class="main-nav" :class="{ 'open': mobileMenuOpen }">
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/" class="nav-link" exact-active-class="active">
                <span class="nav-icon">🏠</span>
                <span class="nav-text">Início</span>
              </router-link>
            </li>

            <li class="nav-item">
              <router-link to="/apocalypse" class="nav-link" active-class="active">
                <span class="nav-icon">📖</span>
                <span class="nav-text">Apocalipse</span>
              </router-link>
            </li>

            <li class="nav-item locked">
              <span class="nav-link disabled">
                <span class="nav-icon">🦁</span>
                <span class="nav-text">Daniel</span>
                <span class="lock-icon">🔒</span>
              </span>
            </li>

            <li class="nav-item locked">
              <span class="nav-link disabled">
                <span class="nav-icon">🔥</span>
                <span class="nav-text">Ezequiel</span>
                <span class="lock-icon">🔒</span>
              </span>
            </li>

            <li class="nav-item dropdown">
              <button class="nav-link dropdown-toggle" @click.stop="toggleDropdown">
                <span class="nav-icon">🌍</span>
                <span class="nav-text">Outros</span>
                <span class="dropdown-arrow" :class="{ 'active': dropdownOpen }">▾</span>
              </button>
              <div class="dropdown-menu" v-show="dropdownOpen">
                <ul class="dropdown-list">
                  <li class="dropdown-item locked">
                    <span class="dropdown-link disabled">
                      <span class="dropdown-icon">⛰️</span>
                      <span class="dropdown-text">Moisés</span>
                      <span class="lock-icon">🔒</span>
                    </span>
                  </li>
                  <li class="dropdown-item locked">
                    <span class="dropdown-link disabled">
                      <span class="dropdown-icon">👁️</span>
                      <span class="dropdown-text">Néfi</span>
                      <span class="lock-icon">🔒</span>
                    </span>
                  </li>
                  <li class="dropdown-item locked">
                    <span class="dropdown-link disabled">
                      <span class="dropdown-icon">✨</span>
                      <span class="dropdown-text">Abraão</span>
                      <span class="lock-icon">🔒</span>
                    </span>
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <router-link to="/about" class="nav-link" active-class="active">
                <span class="nav-icon">ℹ️</span>
                <span class="nav-text">Sobre</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Seção 3: Autenticação do usuário -->
      <div class="auth-section">
        <button class="search-btn" aria-label="Pesquisar">
          <span class="search-icon">🔍</span>
        </button>
        <div class="user-profile">
          <div class="avatar">
            <span class="avatar-placeholder">👤</span>
          </div>
          <div class="auth-options">
            <button class="auth-btn login-btn">Entrar</button>
            <button class="auth-btn register-btn">Registrar</button>
          </div>
        </div>
      </div>

      <!-- Botão de menu móvel -->
      <button
        class="mobile-menu-toggle"
        @click="toggleMobileMenu"
        :aria-expanded="mobileMenuOpen"
        aria-controls="main-nav"
        aria-label="Menu Principal"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <!-- Menu móvel overlay - colocado fora do .header-container para evitar problemas de nesting -->
    <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu"></div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      isScrolled: false,
      mobileMenuOpen: false,
      dropdownOpen: false
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;

      // Fecha o menu móvel ao rolar se estiver aberto
      if (this.mobileMenuOpen && window.scrollY > 100) {
        this.closeMobileMenu();
      }
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      console.log("Menu mobile toggled:", this.mobileMenuOpen);

      // Bloqueia o scroll quando o menu está aberto
      if (this.mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeMobileMenu() {
      if (this.mobileMenuOpen) {
        this.mobileMenuOpen = false;
        document.body.style.overflow = '';
        this.dropdownOpen = false;
      }
    },
    toggleDropdown(event) {
      if (event) event.stopPropagation();
      this.dropdownOpen = !this.dropdownOpen;
    },
    checkScreenSize() {
      // Resetar menu em telas grandes
      if (window.innerWidth > 992 && this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    },
    handleClickOutside(event) {
      // Verifica se o clique foi fora do menu mobile ou do dropdown
      const mainNav = document.getElementById('main-nav');
      const dropdownToggle = this.$el.querySelector('.dropdown-toggle');
      const dropdownMenu = this.$el.querySelector('.dropdown-menu');
      const mobileMenuToggle = this.$el.querySelector('.mobile-menu-toggle');

      // Se o clique foi fora do menu e do botão de toggle e o menu está aberto, fecha-o
      if (mainNav &&
          mobileMenuToggle &&
          !mainNav.contains(event.target) &&
          !mobileMenuToggle.contains(event.target) &&
          this.mobileMenuOpen) {
        this.closeMobileMenu();
      }

      // Se o clique foi fora do dropdown e do botão de toggle do dropdown e o dropdown está aberto, fecha-o
      if (dropdownMenu &&
          dropdownToggle &&
          !dropdownMenu.contains(event.target) &&
          !dropdownToggle.contains(event.target) &&
          this.dropdownOpen) {
        this.dropdownOpen = false;
      }
    }
  },
  watch: {
    $route() {
      // Fecha o menu móvel quando a rota muda
      if (this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    }
  },
  mounted() {
    // Usar uma pequena pausa para garantir que o DOM esteja totalmente renderizado
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.checkScreenSize);
      document.addEventListener('click', this.handleClickOutside);

      // Verificar posição inicial
      this.handleScroll();
    });
  },
  beforeUnmount() {
    // Garantir que os event listeners sejam removidos corretamente
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.checkScreenSize);
    document.removeEventListener('click', this.handleClickOutside);

    // Garantir que o overflow é restaurado
    document.body.style.overflow = '';
  }
}
</script>

<style scoped>
.main-header {
  position: sticky;
  top: 0;
  z-index: 1500;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  transition: all var(--transition-normal);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-scrolled {
  background-color: rgba(0, 0, 0, 0.95);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  max-width: 1400px;
  margin: 0 auto;
}

/* Seção 1: Logo e tagline */
.logo-section {
  display: flex;
  flex-direction: column;
  min-width: 200px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform var(--transition-fast);
}

.logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  color: var(--color-secondary);
  font-size: 1.8rem;
  margin-right: var(--space-sm);
  animation: pulse-glow 3s infinite alternate;
}

@keyframes pulse-glow {
  0% { text-shadow: 0 0 5px rgba(196, 180, 84, 0.5); }
  100% { text-shadow: 0 0 15px rgba(196, 180, 84, 0.9); }
}

.logo-text {
  font-family: var(--font-family-heading);
  font-size: 1.8rem;
  color: var(--color-text);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

.tagline {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-style: italic;
  margin-top: 2px;
  transition: opacity var(--transition-normal);
}

.header-scrolled .tagline {
  opacity: 0;
  height: 0;
  margin: 0;
}

/* Seção 2: Navegação principal */
.main-nav-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
}

.main-nav {
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: var(--space-md);
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-text);
  font-family: var(--font-family-heading);
  font-size: 1.1rem;
  font-weight: 500;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  background: none;
  border: none;
  cursor: pointer;
}

.nav-link:hover:not(.disabled) {
  color: var(--color-secondary);
  background-color: rgba(196, 180, 84, 0.1);
}

.nav-link.active {
  color: var(--color-secondary);
  background-color: rgba(196, 180, 84, 0.1);
  position: relative;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background-color: var(--color-secondary);
  border-radius: 3px;
}

.nav-icon {
  margin-right: var(--space-xs);
  font-size: 1.2rem;
}

.nav-item.locked .nav-link {
  opacity: 0.7;
  cursor: not-allowed;
}

.lock-icon {
  margin-left: var(--space-xs);
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

/* Dropdown styling */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
  outline: none;
}

.dropdown-arrow {
  margin-left: var(--space-xs);
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.dropdown-arrow.active {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  background-color: rgba(20, 20, 20, 0.95);
  border-radius: var(--radius-md);
  min-width: 200px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10000;
  animation: dropdown-appear 0.3s forwards;
}

@keyframes dropdown-appear {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background-color: rgba(20, 20, 20, 0.95);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.dropdown-list {
  list-style: none;
  padding: var(--space-sm) 0;
  margin: 0;
}

.dropdown-item {
  padding: 0;
}

.dropdown-link {
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  color: var(--color-text);
  text-decoration: none;
  transition: all var(--transition-normal);
  cursor: pointer;
}

.dropdown-link:hover:not(.disabled) {
  background-color: rgba(75, 46, 131, 0.3);
  color: var(--color-secondary);
}

.dropdown-icon {
  margin-right: var(--space-sm);
  font-size: 1.1rem;
}

.dropdown-link.disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Seção 3: Autenticação */
.auth-section {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  min-width: 200px;
  justify-content: flex-end;
}

.search-btn {
  background-color: rgba(0, 0, 0, 0.3);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.search-btn:hover {
  background-color: rgba(75, 46, 131, 0.3);
  transform: translateY(-2px);
  border-color: rgba(196, 180, 84, 0.3);
}

.search-icon {
  font-size: 1.1rem;
}

.user-profile {
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(75, 46, 131, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(196, 180, 84, 0.3);
  transition: all var(--transition-normal);
  position: relative;
}

.avatar:hover {
  box-shadow: 0 0 15px rgba(196, 180, 84, 0.3);
  transform: scale(1.05);
}

.avatar-placeholder {
  font-size: 1.2rem;
  color: var(--color-text);
}

.auth-options {
  position: absolute;
  top: 120%;
  right: 0;
  background-color: rgba(20, 20, 20, 0.95);
  border-radius: var(--radius-md);
  min-width: 150px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-md);
  z-index: 100;
  display: none;
}

.user-profile:hover .auth-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  animation: dropdown-appear 0.3s forwards;
}

.auth-btn {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-family: var(--font-family-heading);
  font-size: 0.9rem;
}

.login-btn:hover {
  background-color: var(--color-primary);
  border-color: var(--color-primary-light);
  color: var(--color-text);
}

.register-btn {
  background-color: var(--color-secondary);
  color: var(--color-background);
  border-color: var(--color-secondary);
}

.register-btn:hover {
  background-color: var(--color-secondary-light);
  border-color: var(--color-secondary-light);
}

/* Mobile menu toggle */
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
  z-index: 9999; /* Super alto z-index para garantir que esteja visível */
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

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 8888; /* Um pouco abaixo do menu */
  animation: fade-in 0.3s forwards;
  backdrop-filter: blur(3px);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsividade */
@media (max-width: 1200px) {
  .header-container {
    padding: var(--space-md) var(--space-md);
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .nav-list {
    gap: var(--space-sm);
  }

  .nav-link {
    font-size: 1rem;
  }
}

@media (max-width: 992px) {
  .mobile-menu-toggle {
    display: flex;
  }

  /* IMPORTANTE: A parte crucial foi corrigida aqui */
  .main-nav {
    /* Estilos padrão para desktop */
    display: flex;
    justify-content: center;
  }

  /* VERSÃO MOBILE */
  @media (max-width: 992px) {
    .main-nav {
      position: fixed;
      top: 0;
      right: -100%; /* Posição inicial fora da tela à direita */
      height: 100vh; /* Altura total da viewport */
      width: 280px;
      background-color: rgba(0, 0, 0, 0.95);
      padding: 80px var(--space-md) var(--space-md);
      z-index: 9000; /* Extremamente alto para garantir que fique acima de tudo */
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.8);
      transition: right 0.3s ease; /* Transição suave */
      overflow-y: auto;
    }

    .main-nav.open {
      right: 0; /* Quando aberto, move para dentro da tela */
    }

    .nav-list {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-md);
      width: 100%;
    }

    .nav-item {
      width: 100%;
    }

    .nav-link {
      width: 100%;
      justify-content: flex-start;
      padding: var(--space-sm) 0;
      font-size: 1.1rem;
    }

    .dropdown-menu {
      position: static;
      transform: none;
      margin-top: var(--space-sm);
      margin-left: var(--space-lg);
      width: calc(100% - var(--space-lg));
      box-shadow: none;
      animation: none;
      border: none;
      background-color: transparent;
    }

    .dropdown-menu::before {
      display: none;
    }

    .dropdown-list {
      padding: 0;
    }

    .dropdown-link {
      padding: var(--space-xs) var(--space-sm);
    }
  }

  .auth-section {
    min-width: auto;
  }

  .tagline {
    display: none;
  }
}

@media (max-width: 576px) {
  .header-container {
    padding: var(--space-sm) var(--space-md);
  }

  .logo-section {
    min-width: auto;
  }

  .logo-text {
    font-size: 1.2rem;
  }

  .logo-icon {
    font-size: 1.5rem;
  }

  .search-btn {
    width: 32px;
    height: 32px;
  }

  .avatar {
    width: 32px;
    height: 32px;
  }

  .avatar-placeholder {
    font-size: 1rem;
  }
}
</style>
