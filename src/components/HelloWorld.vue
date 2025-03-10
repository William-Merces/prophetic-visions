<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h3>{{ msg }}</h3>
    <h4>
      Este projeto foi criado com o script personalizado create-vue-app.ps1
    </h4>
    <p>
      Edite <code>src/views/HomeView.vue</code> ou <code>src/components/HelloWorld.vue</code>
      para começar a personalizar seu aplicativo.
    </p>
  </div>
</template>

<style scoped>
.greetings {
  text-align: center;
  color: #2c3e50;
  margin-top: 2rem;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

h4 {
  font-size: 1rem;
  color: #42b983;
}

code {
  background-color: #f8f8f8;
  padding: 2px 4px;
  border-radius: 4px;
  color: #e83e8c;
}

@media (min-width: 1024px) {
  .greetings {
    padding: 2rem;
  }
}
</style>
