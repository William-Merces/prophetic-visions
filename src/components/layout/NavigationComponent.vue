<template>
  <nav class="navigation" :class="{ 'nav-scrolled': isScrolled, 'nav-mobile-open': mobileMenuOpen }">
    <!-- Logo e título do app -->
    <div class="nav-logo">
      <router-link to="/" class="logo-link">
        <span class="logo-icon">✧</span>
        <span class="logo-text">Prophetic Visions</span>
      </router-link>
    </div>

    <!-- Links de navegação principal (versão desktop) -->
    <div class="nav-links" :class="{ 'show': mobileMenuOpen }">
      <router-link to="/" class="nav-item" exact-active-class="active">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">Início</span>
      </router-link>

      <router-link to="/apocalypse" class="nav-item" active-class="active">
        <span class="nav-icon">📖</span>
        <span class="nav-text">Apocalipse</span>
      </router-link>

      <div class="nav-dropdown" @click="toggleDropdown">
        <div class="nav-item dropdown-toggle" :class="{ 'active': dropdownOpen }">
          <span class="nav-icon">🔮</span>
          <span class="nav-text">Outros Profetas</span>
          <span class="dropdown-arrow" :class="{ 'rotated': dropdownOpen }">▾</span>
        </div>

        <div class="dropdown-menu" v-show="dropdownOpen">
          <div class="dropdown-item locked">
            <span class="dropdown-icon">🦁</span>
            <span class="dropdown-text">Daniel</span>
            <span class="lock-icon">🔒</span>
          </div>

          <div class="dropdown-item locked">
            <span class="dropdown-icon">🔥</span>
            <span class="dropdown-text">Ezequiel</span>
            <span class="lock-icon">🔒</span>
          </div>

          <div class="dropdown-item locked">
            <span class="dropdown-icon">👑</span>
            <span class="dropdown-text">Isaías</span>
            <span class="lock-icon">🔒</span>
          </div>

          <div class="dropdown-item locked">
            <span class="dropdown-icon">⛰️</span>
            <span class="dropdown-text">Moisés</span>
            <span class="lock-icon">🔒</span>
          </div>

          <div class="dropdown-item locked">
            <span class="dropdown-icon">✨</span>
            <span class="dropdown-text">Abraão</span>
            <span class="lock-icon">🔒</span>
          </div>

          <div class="dropdown-item locked">
            <span class="dropdown-icon">📜</span>
            <span class="dropdown-text">Néfi</span>
            <span class="lock-icon">🔒</span>
          </div>
        </div>
      </div>

      <router-link to="/about" class="nav-item" active-class="active">
        <span class="nav-icon">ℹ️</span>
        <span class="nav-text">Sobre</span>
      </router-link>
    </div>

    <!-- Botão de menu mobile -->
    <button class="mobile-toggle" @click="toggleMobileMenu" aria-label="Menu">
      <span class="toggle-bar"></span>
      <span class="toggle-bar"></span>
      <span class="toggle-bar"></span>
    </button>

    <!-- Overlay para fechar menu em dispositivos móveis -->
    <div class="mobile-overlay" v-if="mobileMenuOpen" @click="closeMobileMenu"></div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationComponent',
  data() {
    return {
      isScrolled: false,
      mobileMenuOpen: false,
      dropdownOpen: false
    }
  },
  methods: {
    handleScroll() {
      // Detecta quando a página é rolada para aplicar estilos diferentes
      this.isScrolled = window.scrollY > 50;

      // Fecha o dropdown ao rolar a página
      if (this.isScrolled && this.dropdownOpen) {
        this.dropdownOpen = false;
      }
    },

    toggleMobileMenu() {
      // Abre/fecha o menu mobile
      this.mobileMenuOpen = !this.mobileMenuOpen;

      // Bloqueia/desbloqueia rolagem do body quando menu está aberto
      if (this.mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      // Fecha dropdown quando menu mobile é aberto/fechado
      this.dropdownOpen = false;
    },

    closeMobileMenu() {
      // Fecha o menu mobile
      this.mobileMenuOpen = false;
      document.body.style.overflow = '';
      this.dropdownOpen = false;
    },

    toggleDropdown(event) {
      // Prevenir comportamento padrão
      event.stopPropagation();

      // Abre/fecha o dropdown
      this.dropdownOpen = !this.dropdownOpen;
    },

    closeDropdown() {
      // Fecha apenas o dropdown
      this.dropdownOpen = false;
    },

    handleClickOutside(event) {
      // Fecha dropdown quando usuário clica fora dele
      const dropdown = this.$el.querySelector('.nav-dropdown');
      if (dropdown && !dropdown.contains(event.target) && this.dropdownOpen) {
        this.dropdownOpen = false;
      }
    }
  },
  mounted() {
    // Adicionar evento de scroll para detectar rolagem
    window.addEventListener('scroll', this.handleScroll);

    // Verifica posição inicial
    this.handleScroll();

    // Adicionar evento para detectar cliques fora do dropdown
    document.addEventListener('click', this.handleClickOutside);

    // Fechar menu mobile e dropdown quando mudar de rota
    this.$router.afterEach(() => {
      this.closeMobileMenu();
      this.closeDropdown();
    });
  },
  beforeUnmount() {
    // Remover eventos ao desmontar componente
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleClickOutside);

    // Garantir que o overflow do body está restaurado
    document.body.style.overflow = '';
  }
}
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all var(--transition-normal);
  border-bottom: 1px solid rgba(196, 180, 84, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
}

.nav-scrolled {
  background-color: rgba(0, 0, 0, 0.9);
  padding: 0.7rem 2rem;
}

/* Logo e título */
.nav-logo {
  display: flex;
  align-items: center;
  z-index: 1001; /* Acima do overlay mobile */
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-text);
  transition: transform var(--transition-fast);
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
  color: #c4b454;
  animation: glow 3s infinite alternate;
}

.logo-text {
  font-family: var(--font-family-heading);
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  background: linear-gradient(to right, #c4b454, #f5e882, #c4b454);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 10px rgba(196, 180, 84, 0.3);
}

/* Links de navegação */
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.8rem;
  border-radius: var(--radius-md);
  color: var(--color-text);
  text-decoration: none;
  transition: all var(--transition-normal);
  font-weight: 500;
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #c4b454;
  transform: translateX(-50%);
  transition: width var(--transition-normal);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(196, 180, 84, 0.5);
}

.nav-item:hover::after,
.nav-item.active::after {
  width: 70%;
}

.nav-item:hover,
.nav-item.active {
  color: #c4b454;
  background-color: rgba(196, 180, 84, 0.1);
  text-shadow: 0 0 8px rgba(196, 180, 84, 0.3);
}

.nav-icon {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

/* Dropdown */
.nav-dropdown {
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
}

.dropdown-arrow {
  margin-left: 0.5rem;
  font-size: 0.7rem;
  transition: transform var(--transition-normal);
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(10, 10, 10, 0.95);
  border-radius: var(--radius-md);
  padding: 0.5rem;
  min-width: 200px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(196, 180, 84, 0.1);
  border: 1px solid rgba(196, 180, 84, 0.1);
  z-index: 1000;
  animation: fadeInDown 0.3s ease;
}

.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background-color: rgba(10, 10, 10, 0.95);
  border-top: 1px solid rgba(196, 180, 84, 0.1);
  border-left: 1px solid rgba(196, 180, 84, 0.1);
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.7rem;
  color: var(--color-text);
  border-radius: var(--radius-sm);
  margin-bottom: 0.2rem;
  transition: all var(--transition-normal);
  cursor: default;
}

.dropdown-item:last-child {
  margin-bottom: 0;
}

.dropdown-item:hover {
  background-color: rgba(196, 180, 84, 0.1);
}

.dropdown-item.locked {
  opacity: 0.7;
}

.dropdown-icon {
  margin-right: 0.8rem;
  font-size: 1.1rem;
}

.dropdown-text {
  flex: 1;
}

.lock-icon {
  margin-left: auto;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

/* Botão de menu mobile (visível apenas em telas pequenas) */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001; /* Acima do overlay */
}

.toggle-bar {
  width: 100%;
  height: 2px;
  background-color: #c4b454;
  border-radius: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(196, 180, 84, 0.5);
}

/* Overlay para mobile */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 5px rgba(196, 180, 84, 0.5); }
  50% { text-shadow: 0 0 15px rgba(196, 180, 84, 0.8); }
}

/* Responsividade */
@media (max-width: 768px) {
  .navigation {
    padding: 1rem;
  }

  .nav-scrolled {
    padding: 0.7rem 1rem;
  }

  .mobile-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -280px; /* Inicialmente fora da tela */
    width: 280px;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.95);
    background-image: linear-gradient(
      to bottom,
      rgba(196, 180, 84, 0.05),
      rgba(0, 0, 0, 0)
    );
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 5rem 1.5rem 2rem;
    transition: right 0.3s ease;
    z-index: 1000;
    overflow-y: auto;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(196, 180, 84, 0.05);
    border-left: 1px solid rgba(196, 180, 84, 0.1);
  }

  .nav-links.show {
    right: 0;
  }

  .nav-item {
    width: 100%;
    padding: 1rem 0.5rem;
    border-bottom: 1px solid rgba(196, 180, 84, 0.1);
  }

  .nav-item::after {
    display: none;
  }

  .dropdown-menu {
    position: static;
    transform: none;
    margin-top: 0.5rem;
    margin-left: 1.5rem;
    width: calc(100% - 1.5rem);
    padding: 0;
    box-shadow: none;
    border: none;
    background-color: transparent;
    animation: none;
  }

  .dropdown-menu::before {
    display: none;
  }

  .dropdown-item {
    padding: 0.8rem 0.5rem;
    margin-bottom: 0;
    border-bottom: 1px solid rgba(196, 180, 84, 0.1);
  }

  /* Animação das barras do menu hamburguer */
  .nav-mobile-open .toggle-bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .nav-mobile-open .toggle-bar:nth-child(2) {
    opacity: 0;
  }

  .nav-mobile-open .toggle-bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.3rem;
  }

  .logo-icon {
    font-size: 1.3rem;
  }
}
</style>
