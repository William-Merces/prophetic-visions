<template>
  <div class="locked-container">
    <div class="lock-icon">🔒</div>
    <h2>{{ title }}</h2>
    <p>{{ message || 'Este conteúdo está em desenvolvimento e estará disponível em breve.' }}</p>
    <router-link to="/" class="btn">Voltar para o Início</router-link>
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
    }
  }
}
</script>

<style scoped>
.locked-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: var(--space-xl);
  border: 1px solid rgba(196, 180, 84, 0.3);
  border-radius: var(--radius-md);
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.lock-icon {
  font-size: 4rem;
  margin-bottom: var(--space-lg);
  color: var(--color-secondary);
}

.locked-container h2 {
  margin-bottom: var(--space-md);
}

.locked-container p {
  margin-bottom: var(--space-lg);
  color: var(--color-text-muted);
}

.btn {
  margin-top: var(--space-md);
}
</style>
