<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <h3>Prophetic Visions</h3>
        <p class="footer-tagline">Explorando as visões proféticas através da história</p>
      </div>

      <div class="footer-links">
        <div class="footer-section">
          <h4>Navegação</h4>
          <ul>
            <li><router-link to="/">Início</router-link></li>
            <li><router-link to="/about">Sobre</router-link></li>
            <li v-for="book in availableBooks.filter(b => b.available)" :key="book.id">
              <router-link :to="`/${book.id}`">{{ book.name }}</router-link>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Recursos</h4>
          <ul>
            <li><a href="#" @click.prevent="openResourcesDialog">Referências Bíblicas</a></li>
            <li><a href="#" @click.prevent="openResourcesDialog">Material de Estudo</a></li>
            <li><a href="#" @click.prevent="openResourcesDialog">Galeria de Imagens</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} Prophetic Visions. Todos os direitos reservados.</p>
      <p class="scripture-ref">
        "Bem-aventurado aquele que lê as palavras desta profecia." — Apocalipse 1:3
      </p>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheFooter',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  computed: {
    ...mapGetters(['getAvailableBooks']),
    availableBooks() {
      return this.getAvailableBooks
    }
  },
  methods: {
    openResourcesDialog() {
      alert("Esta funcionalidade estará disponível em breve!")
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: var(--color-background-alt);
  color: var(--color-text);
  padding: var(--space-lg) var(--space-lg) var(--space-md);
  margin-top: var(--space-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: var(--space-xl);
}

.footer-logo {
  flex: 1;
  min-width: 250px;
}

.footer-logo h3 {
  color: var(--color-secondary);
  margin-bottom: var(--space-xs);
  font-size: 1.5rem;
}

.footer-tagline {
  color: var(--color-text-muted);
  font-style: italic;
  margin-bottom: var(--space-md);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xl);
}

.footer-section {
  min-width: 150px;
}

.footer-section h4 {
  color: var(--color-secondary-light);
  margin-bottom: var(--space-sm);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  margin-bottom: var(--space-xs);
}

.footer-section a {
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-section a:hover {
  color: var(--color-secondary);
  text-decoration: none;
}

.footer-bottom {
  margin-top: var(--space-lg);
  padding-top: var(--space-md);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.scripture-ref {
  margin-top: var(--space-xs);
  font-style: italic;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: var(--space-lg);
  }

  .footer-links {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
