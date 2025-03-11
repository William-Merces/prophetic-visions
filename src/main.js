// src/main.js

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/main.css'
import './assets/styles/visionAnimations.css' // Importando as novas animações

// Cria a instância do aplicativo Vue
const app = createApp(App)

// Registra os plugins
app.use(router)
app.use(store)

// Monta o aplicativo no elemento #app do HTML
app.mount('#app')

// Tratamento global de erros
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err)
  console.info('Vue Component:', vm)
  console.info('Error Info:', info)
}

// Configuração de desempenho para modo de desenvolvimento
if (import.meta.env.DEV) {
  app.config.performance = true
}
