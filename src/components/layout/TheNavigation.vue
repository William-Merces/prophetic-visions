<template>
  <nav class="main-navigation" :class="{ 'nav-scrolled': isScrolled }">
    <div class="nav-container">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/" class="nav-link" exact-active-class="active">
            <span class="nav-icon">🏠</span>
            <span class="nav-text">Início</span>
            <span class="nav-hover-indicator"></span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/apocalypse" class="nav-link" active-class="active">
            <span class="nav-icon">📖</span>
            <span class="nav-text">Apocalipse</span>
            <span class="nav-hover-indicator"></span>
          </router-link>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" @click.prevent="toggleDropdown('prophecies')">
            <span class="nav-icon">🔮</span>
            <span class="nav-text">Outras Profecias</span>
            <span class="dropdown-arrow" :class="{ 'active': activeDropdown === 'prophecies' }">▾</span>
            <span class="nav-hover-indicator"></span>
          </a>
          <transition name="dropdown-fade">
            <ul v-show="activeDropdown === 'prophecies'" class="dropdown-menu">
              <li class="dropdown-item locked">
                <span class="dropdown-link disabled">
                  <span class="dropdown-icon">🦁</span>
                  <span class="dropdown-text">Daniel</span>
                  <span class="lock-icon">🔒</span>
                </span>
              </li>
              <li class="dropdown-item locked">
                <span class="dropdown-link disabled">
                  <span class="dropdown-icon">🔥</span>
                  <span class="dropdown-text">Ezequiel</span>
                  <span class="lock-icon">🔒</span>
                </span>
              </li>
              <li class="dropdown-item locked">
                <span class="dropdown-link disabled">
                  <span class="dropdown-icon">👑</span>
                  <span class="dropdown-text">Isaías</span>
                  <span class="lock-icon">🔒</span>
                </span>
              </li>
              <li class="dropdown-item locked">
                <span class="dropdown-link disabled">
                  <span class="dropdown-icon">⛰️</span>
                  <span class="dropdown-text">Moisés</span>
                  <span class="lock-icon">🔒</span>
                </span>
              </li>
            </ul>
          </transition>
        </li>

        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">
            <span class="nav-icon">ℹ️</span>
            <span class="nav-text">Sobre</span>
            <span class="nav-hover-indicator"></span>
          </router-link>
        </li>
      </ul>

      <div class="nav-actions">
        <div class="theme-toggle" @click="toggleTheme" title="Alternar tema claro/escuro">
          <span class="theme-icon">{{ isDarkMode ? '☀️' : '🌙' }}</span>
        </div>

        <div class="search-button" @click="toggleSearch" title="Pesquisar">
          <span class="search-icon">🔍</span>
        </div>
      </div>
    </div>

    <!-- Overlay de pesquisa -->
    <transition name="search-fade">
      <div v-if="isSearchOpen" class="search-overlay">
        <div class="search-container">
          <div class="search-header">
            <h3>Pesquisar</h3>
            <button class="close-search" @click="toggleSearch">×</button>
          </div>
          <div class="search-form">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Digite uma palavra-chave ou símbolo..."
              class="search-input"
              @keyup.enter="performSearch"
              ref="searchInput"
            >
            <button class="search-submit" @click="performSearch">Buscar</button>
          </div>
          <div class="search-suggestions">
            <h4>Sugestões rápidas:</h4>
            <div class="suggestion-tags">
              <span class="suggestion-tag" @click="setSearchQuery('trono')">Trono</span>
              <span class="suggestion-tag" @click="setSearchQuery('selos')">Selos</span>
              <span class="suggestion-tag" @click="setSearchQuery('cordeiro')">Cordeiro</span>
              <span class="suggestion-tag" @click="setSearchQuery('cavaleiros')">Cavaleiros</span>
              <span class="suggestion-tag" @click="setSearchQuery('patmos')">Patmos</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'TheNavigation',
  data() {
    return {
      isScrolled: false,
      activeDropdown: null,
      isDarkMode: true,  // Por padrão começamos com o tema escuro
      isSearchOpen: false,
      searchQuery: ''
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 30;

      // Fechar dropdown ao rolar
      if (this.isScrolled && this.activeDropdown) {
        this.activeDropdown = null;
      }
    },

    toggleDropdown(dropdownId) {
      if (this.activeDropdown === dropdownId) {
        this.activeDropdown = null;
      } else {
        this.activeDropdown = dropdownId;
      }
    },

    closeDropdowns() {
      this.activeDropdown = null;
    },

    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;

      // Adiciona ou remove uma classe no <body> para alternar os temas
      if (this.isDarkMode) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
      }

      // Opcional: salva a preferência do usuário
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    },

    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;

      if (this.isSearchOpen) {
        // Fecha qualquer dropdown aberto
        this.activeDropdown = null;

        // Foca no campo de pesquisa após a animação de abertura
        setTimeout(() => {
          if (this.$refs.searchInput) {
            this.$refs.searchInput.focus();
          }
        }, 300);
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query;
      this.performSearch();
    },

    performSearch() {
      if (!this.searchQuery.trim()) return;

      // Fechar o overlay de busca
      this.isSearchOpen = false;

      // Aqui você implementaria a lógica real de busca
      // Por enquanto, apenas faz a navegação para uma página de resultados fictícia
      this.$router.push({
        path: '/apocalypse',
        query: { search: this.searchQuery }
      });

      // Limpa a busca para futuras pesquisas
      this.searchQuery = '';
    },

    // Método para lidar com cliques fora dos dropdowns para fechá-los
    handleOutsideClick(event) {
      const dropdownElements = document.querySelectorAll('.dropdown');
      let clickedOutside = true;

      dropdownElements.forEach(element => {
        if (element.contains(event.target)) {
          clickedOutside = false;
        }
      });

      if (clickedOutside && this.activeDropdown) {
        this.activeDropdown = null;
      }
    },

    // Método para inicializar o tema com base na preferência salva
    initializeTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark';
      } else {
        // Verifica a preferência do sistema se não houver uma salva
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode = prefersDark;
      }

      // Aplica o tema inicial
      document.body.classList.add(this.isDarkMode ? 'dark-theme' : 'light-theme');
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    document.addEventListener('click', this.handleOutsideClick);

    // Verificar posição inicial
    this.handleScroll();

    // Inicializar o tema
    this.initializeTheme();

    // Fechar dropdown quando a rota mudar
    this.$router.afterEach(() => {
      this.activeDropdown = null;
      this.isSearchOpen = false;
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleOutsideClick);
  }
}
</script>

<style scoped>
.main-navigation {
  width: 100%;
  padding: var(--space-sm) 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all var(--transition-normal);
  backdrop-filter: blur(5px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-scrolled {
  background-color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  padding: var(--space-xs) 0;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--space-lg);
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: var(--space-lg);
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
  position: relative;
  z-index: 1;
}

.nav-link:hover {
  color: var(--color-secondary);
  text-decoration: none;
}

.nav-hover-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--color-secondary);
  transition: all var(--transition-normal);
  transform: translateX(-50%);
  opacity: 0;
  border-radius: 2px;
}

.nav-link:hover .nav-hover-indicator,
.nav-link.active .nav-hover-indicator {
  width: 100%;
  opacity: 1;
}

.nav-link.active {
  color: var(--color-secondary);
  background-color: rgba(196, 180, 84, 0.1);
}

.nav-icon {
  margin-right: var(--space-xs);
  font-size: 1.2rem;
}

/* Dropdown styling */
.dropdown {
  position: relative;
  z-index: 10;
}

.dropdown-toggle {
  cursor: pointer;
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
  left: 0;
  background-color: rgba(20, 20, 20, 0.95);
  min-width: 200px;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  padding: var(--space-sm) 0;
  list-style: none;
  margin-top: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  z-index: 5;
}

.dropdown-item {
  width: 100%;
}

.dropdown-link {
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  color: var(--color-text);
  text-decoration: none;
  transition: all var(--transition-normal);
  font-size: 1rem;
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

.dropdown-item.locked .dropdown-link {
  opacity: 0.7;
  cursor: not-allowed;
}

.lock-icon {
  margin-left: auto;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

/* Nav actions (theme toggle, search) */
.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.theme-toggle, .search-button {
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

.theme-toggle:hover, .search-button:hover {
  background-color: rgba(75, 46, 131, 0.3);
  transform: translateY(-2px);
  border-color: rgba(196, 180, 84, 0.3);
}

.theme-icon, .search-icon {
  font-size: 1.1rem;
}

/* Search overlay */
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-lg);
}

.search-container {
  width: 100%;
  max-width: 600px;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  animation: searchAppear 0.3s forwards;
}

@keyframes searchAppear {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.search-header h3 {
  margin: 0;
  color: var(--color-secondary);
  font-size: 1.3rem;
}

.close-search {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.close-search:hover {
  color: var(--color-secondary);
  transform: rotate(90deg);
}

.search-form {
  padding: var(--space-lg);
  display: flex;
  gap: var(--space-sm);
}

.search-input {
  flex: 1;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: all var(--transition-normal);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-secondary);
  box-shadow: 0 0 10px rgba(196, 180, 84, 0.3);
}

.search-submit {
  background-color: var(--color-secondary);
  color: var(--color-background);
  border: none;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.search-submit:hover {
  background-color: var(--color-secondary-light);
  transform: translateY(-2px);
}

.search-suggestions {
  padding: 0 var(--space-lg) var(--space-lg);
}

.search-suggestions h4 {
  font-size: 1rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-sm);
}

.suggestion-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.suggestion-tag {
  background-color: rgba(75, 46, 131, 0.3);
  color: var(--color-text);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 1px solid rgba(196, 180, 84, 0.2);
}

.suggestion-tag:hover {
  background-color: rgba(75, 46, 131, 0.5);
  transform: translateY(-2px);
  color: var(--color-secondary);
  border-color: var(--color-secondary);
}

/* Transitions */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.3s;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.search-fade-enter-active,
.search-fade-leave-active {
  transition: opacity 0.3s;
}

.search-fade-enter-from,
.search-fade-leave-to {
  opacity: 0;
}

/* Responsiveness */
@media (max-width: 1024px) {
  .nav-list {
    gap: var(--space-md);
  }

  .nav-link {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 var(--space-md);
    justify-content: center;
  }

  .nav-list {
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  .nav-link {
    padding: var(--space-xs) var(--space-sm);
    font-size: 0.9rem;
  }

  .nav-icon {
    font-size: 1rem;
  }

  .dropdown-menu {
    min-width: 180px;
  }

  .nav-actions {
    gap: var(--space-sm);
  }

  .theme-toggle, .search-button {
    width: 32px;
    height: 32px;
  }

  .search-container {
    width: 90%;
  }
}

@media (max-width: 480px) {
  .nav-list {
    gap: var(--space-xs);
  }

  .nav-text {
    display: none; /* Oculta o texto em telas muito pequenas, mostra apenas ícones */
  }

  .nav-link {
    padding: var(--space-xs);
  }

  .nav-icon {
    margin-right: 0;
  }

  .search-form {
    flex-direction: column;
  }

  .search-submit {
    width: 100%;
  }
}
</style>
