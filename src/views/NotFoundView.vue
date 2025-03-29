<template>
  <div class="not-found">
    <div class="stars-background">
      <!-- Estrelas geradas via JavaScript no mounted() -->
    </div>

    <div class="not-found-content">
      <h1>404</h1>
      <p class="error-message">Página não encontrada</p>
      <p class="help-message">A página que você está procurando não existe ou foi movida.</p>

      <div class="actions">
        <router-link to="/" class="btn">Voltar ao Início</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  methods: {
    createStars() {
      const starsContainer = document.querySelector('.stars-background')
      if (!starsContainer) return

      const starCount = 200

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.classList.add('star')

        // Posição aleatória
        const x = Math.random() * 100
        const y = Math.random() * 100

        // Tamanho aleatório
        const size = Math.random() * 2 + 1

        // Duração da animação aleatória
        const duration = Math.random() * 3 + 2

        star.style.left = `${x}%`
        star.style.top = `${y}%`
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.animationDuration = `${duration}s`

        starsContainer.appendChild(star)
      }
    }
  },
  mounted() {
    this.createStars()
  }
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.stars-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}

.not-found-content {
  max-width: 500px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 3rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
  animation: fadeIn 1s ease;
}

.not-found-content h1 {
  font-size: 6rem;
  color: var(--color-secondary);
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(196, 180, 84, 0.7);
}

.error-message {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  font-family: var(--font-family-heading);
}

.help-message {
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.actions {
  margin-top: 2rem;
}

.btn {
  background-color: var(--color-secondary);
  color: var(--color-background);
  padding: 0.8rem 2rem;
  border-radius: var(--radius-md);
  display: inline-block;
  transition: all var(--transition-normal);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 15px rgba(196, 180, 84, 0.3);
  background-color: var(--color-secondary-light);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .not-found-content {
    padding: 2rem;
  }

  .not-found-content h1 {
    font-size: 4rem;
  }

  .error-message {
    font-size: 1.2rem;
  }
}
</style>
