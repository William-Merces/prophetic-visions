<script setup lang="ts">
import { ref, computed } from 'vue'
import HelloWorld from '../components/HelloWorld.vue'
import { useCounterStore } from '../stores/counter'
import { titleCase } from '../utils/textUtils'

// Usando a store Pinia
const counterStore = useCounterStore()
const count = ref(0)

// Usando computed property em vez de filtro global
const formattedTitle = computed(() => titleCase('Prophetic Visions'))

function incrementCount() {
  count.value++
  counterStore.increment() // Também incrementa o contador na store
}
</script>

<template>
  <main>
    <div class="home">
      <h1>{{ formattedTitle }}</h1>
      <HelloWorld msg="Bem-vindo ao seu novo projeto Vue!" />

      <div class="counter-section">
        <p>Contador local: {{ count }}</p>
        <p>Contador global: {{ counterStore.count }}</p>
        <p>Contador dobrado: {{ counterStore.doubleCount }}</p>
        <button class="btn" @click="incrementCount">Incrementar</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
