<template>
  <div class="not-found">
    <h1>404 - Página Não Encontrada</h1>
    <p>A página que você está procurando não existe ou foi movida.</p>
    <router-link to="/" class="btn">Voltar para o Início</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: var(--space-xl) 0;
  max-width: 600px;
  margin: 0 auto;
}

.not-found h1 {
  margin-bottom: var(--space-lg);
}

.not-found p {
  margin-bottom: var(--space-xl);
  color: var(--color-text-muted);
}
</style>
