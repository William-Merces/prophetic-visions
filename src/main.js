import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Importar estilos globais
import './assets/styles/main.css'
import './assets/styles/variables.css'
import './assets/styles/immersiveAnimations.css'

// Criar e montar a aplicação
const app = createApp(App)

// Registrar plugins
app.use(router)
app.use(store)

// Montar a aplicação no elemento #app
app.mount('#app')
