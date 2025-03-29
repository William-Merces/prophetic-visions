<template>
  <div class="locked-container">
    <div class="locked-content">
      <div class="lock-animation">
        <div class="lock-icon">🔒</div>
        <div class="light-rays"></div>
      </div>

      <h2 class="locked-title">{{ title }}</h2>

      <p class="locked-message">{{ message || 'Este conteúdo está em desenvolvimento e estará disponível em breve.' }}</p>

      <div class="action-buttons">
        <router-link to="/" class="btn-secondary">
          <span class="btn-icon">←</span> Voltar para o Início
        </router-link>

        <router-link v-if="suggestAvailableContent" to="/apocalypse/1" class="btn-primary">
          Explorar Apocalipse <span class="btn-icon">→</span>
        </router-link>
      </div>
    </div>

    <!-- Estrelas de fundo -->
    <div class="locked-stars-background">
      <!-- Estrelas geradas via JavaScript no mounted() -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'LockedContent',
  props: {
    title: {
      type: String,
      default: 'Conteúdo Bloqueado'
    },
    message: {
      type: String,
      default: ''
    },
    suggestAvailableContent: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    createStars() {
      const starsContainer = document.querySelector('.locked-stars-background');
      if (!starsContainer) return;

      const starCount = window.innerWidth <= 768 ? 50 : 100; // Menos estrelas em dispositivos móveis

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
    }
  },
  mounted() {
    this.createStars();
  }
}
</script>

<style scoped>
.locked-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.locked-stars-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}

.locked-content {
  max-width: 500px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: var(--radius-lg);
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: appear 0.8s ease forwards;
  overflow: hidden;
  position: relative;
}

/* Animação de luz no fundo */
.locked-content::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(75, 46, 131, 0.2) 0%,
    rgba(75, 46, 131, 0) 70%
  );
  animation: rotate 120s linear infinite;
  z-index: -1;
}

.lock-animation {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 2rem;
}

.lock-icon {
  font-size: 4rem;
  color: var(--color-secondary);
  animation: pulse 3s infinite alternate;
  position: relative;
  z-index: 2;
}

.light-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(
    circle at center,
    rgba(196, 180, 84, 0.5) 0%,
    rgba(196, 180, 84, 0) 70%
  );
  border-radius: 50%;
  animation: glow 3s infinite alternate;
  z-index: 1;
}

.locked-title {
  font-size: 2rem;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease 0.2s forwards;
  opacity: 0;
}

.locked-message {
  color: var(--color-text);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  animation: fadeInUp 0.8s ease 0.4s forwards;
  opacity: 0;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  animation: fadeInUp 0.8s ease 0.6s forwards;
  opacity: 0;
}

.btn-secondary,
.btn-primary {
  padding: 0.8rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transition-normal);
}

.btn-secondary {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.btn-primary {
  background-color: var(--color-secondary);
  color: var(--color-background);
}

.btn-primary:hover {
  background-color: var(--color-secondary-light);
  transform: translateY(-3px);
}

.btn-icon {
  transition: transform var(--transition-fast);
}

.btn-secondary:hover .btn-icon {
  transform: translateX(-3px);
}

.btn-primary:hover .btn-icon {
  transform: translateX(3px);
}

/* Animações */
@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    text-shadow: 0 0 10px rgba(196, 180, 84, 0.5);
  }
  50% {
    transform: scale(1.1);
    text-shadow: 0 0 20px rgba(196, 180, 84, 0.8);
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(0.9);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .locked-content {
    padding: 2rem 1.5rem;
  }

  .locked-title {
    font-size: 1.8rem;
  }

  .action-buttons {
    flex-direction: column;
    width: 100%;
  }

  .btn-secondary,
  .btn-primary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .locked-container {
    padding: 1rem;
  }

  .locked-content {
    padding: 2rem 1rem;
  }

  .locked-title {
    font-size: 1.5rem;
  }

  .lock-animation {
    width: 80px;
    height: 80px;
    margin-bottom: 1.5rem;
  }

  .lock-icon {
    font-size: 3rem;
  }

  .light-rays {
    width: 100px;
    height: 100px;
  }
}
</style>
