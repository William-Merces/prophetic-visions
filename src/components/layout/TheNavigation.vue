<template>
  <nav class="main-navigation" :class="{ 'nav-scrolled': isScrolled }">
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/" class="nav-link" exact-active-class="active">Início</router-link>
      </li>

      <li class="nav-item dropdown">
        <button
          class="nav-link dropdown-toggle"
          @click="toggleVisionsList"
          @blur="hideVisionsList"
          aria-haspopup="true"
          :aria-expanded="visionsListOpen"
        >
          Visões Proféticas <span class="dropdown-arrow">▼</span>
        </button>
        <transition name="fade">
          <ul class="dropdown-menu" v-if="visionsListOpen">
            <li v-for="book in availableBooks" :key="book.id">
              <router-link
                :to="`/${book.id}`"
                class="dropdown-item"
                :class="{ 'disabled': !book.available }"
              >
                {{ book.name }}
                <span v-if="book.available" class="badge">{{ book.totalChapters }} capítulos</span>
                <span v-else class="badge coming-soon">Em breve</span>
              </router-link>
            </li>
          </ul>
        </transition>
      </li>

      <li class="nav-item">
        <router-link to="/about" class="nav-link" active-class="active">Sobre</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheNavigation',
  data() {
    return {
      visionsListOpen: false,
      isScrolled: false
    }
  },
  computed: {
    ...mapGetters(['getAvailableBooks']),
    availableBooks() {
      return this.getAvailableBooks
    }
  },
  methods: {
    toggleVisionsList() {
      this.visionsListOpen = !this.visionsListOpen
    },
    hideVisionsList(event) {
      // Verifica se o clique foi fora do dropdown
      if (!event.relatedTarget || !event.relatedTarget.closest('.dropdown-menu')) {
        this.visionsListOpen = false
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 30
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // Verifica posição inicial
    this.handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
.main-navigation {
  background-color: rgba(0, 0, 0, 0.5);
  padding: var(--space-md) 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(5px);
  transition: all var(--transition-normal);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-scrolled {
  background-color: rgba(30, 30, 30, 0.95);
  box-shadow: var(--shadow-md);
  padding: var(--space-sm) 0;
}

.nav-list {
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 var(--space-md);
  position: relative;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-family: var(--font-family-heading);
  font-size: 1.1rem;
  padding: var(--space-xs) var(--space-sm);
  position: relative;
  display: inline-block;
  transition: color var(--transition-fast);
  cursor: pointer;
  background: none;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 50%;
  background-color: var(--color-secondary);
  transition: all var(--transition-normal);
  transform: translateX(-50%);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-secondary);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
}

.dropdown-arrow {
  font-size: 0.7rem;
  margin-left: var(--space-xs);
  transition: transform var(--transition-fast);
}

.dropdown-toggle[aria-expanded="true"] .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
  margin-top: var(--space-xs);
  padding: var(--space-xs) 0;
  list-style: none;
}

.dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  color: var(--color-text);
  text-decoration: none;
  transition: background-color var(--transition-fast);
  font-size: 0.95rem;
}

.dropdown-item:hover {
  background-color: rgba(75, 46, 131, 0.2);
  color: var(--color-secondary);
}

.dropdown-item.disabled {
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.dropdown-item.disabled:hover {
  background-color: transparent;
  color: var(--color-text-muted);
}

.badge {
  background-color: var(--color-primary-dark);
  color: var(--color-text);
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.badge.coming-soon {
  background-color: var(--color-accent);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) translateX(-50%);
}

@media (max-width: 768px) {
  .nav-list {
    flex-direction: column;
    align-items: center;
  }

  .nav-item {
    margin: var(--space-xs) 0;
  }

  .dropdown-menu {
    position: static;
    transform: none;
    margin-top: var(--space-xs);
    width: 100%;
    box-shadow: none;
    border: none;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .dropdown-item {
    justify-content: space-between;
  }
}
</style>
