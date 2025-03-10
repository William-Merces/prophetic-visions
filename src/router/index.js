import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RevelationView from '../views/RevelationView.vue'
import DanielView from '../views/DanielView.vue'
import EzekielView from '../views/EzekielView.vue'
import MosesView from '../views/MosesView.vue'
import NephiView from '../views/NephiView.vue'
import AbrahamView from '../views/AbrahamView.vue'

// Definição das rotas do aplicativo
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Prophetic Visions - Início' }
  },
  {
    path: '/about',
    name: 'about',
    // Carregamento preguiçoso para melhor performance
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'Prophetic Visions - Sobre' }
  },
  {
    path: '/revelation',
    name: 'revelation',
    component: RevelationView,
    meta: { title: 'Prophetic Visions - Apocalipse' }
  },
  {
    path: '/revelation/:chapter',
    name: 'revelation-chapter',
    component: RevelationView,
    props: true,
    meta: { title: 'Prophetic Visions - Apocalipse' }
  },
  {
    path: '/daniel',
    name: 'daniel',
    component: DanielView,
    meta: { title: 'Prophetic Visions - Daniel' }
  },
  {
    path: '/ezekiel',
    name: 'ezekiel',
    component: EzekielView,
    meta: { title: 'Prophetic Visions - Ezequiel' }
  },
  {
    path: '/moses',
    name: 'moses',
    component: MosesView,
    meta: { title: 'Prophetic Visions - Moisés' }
  },
  {
    path: '/nephi',
    name: 'nephi',
    component: NephiView,
    meta: { title: 'Prophetic Visions - Néfi' }
  },
  {
    path: '/abraham',
    name: 'abraham',
    component: AbrahamView,
    meta: { title: 'Prophetic Visions - Abraão' }
  },
  // Rota para capturar URLs inválidas
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Página não encontrada' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Comportamento de rolagem para navegação
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Mudança dinâmica do título da página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Prophetic Visions'
  next()
})

export default router
