// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ApocalypseExperienceView from '../views/ApocalypseExperienceView.vue'
import NotFoundView from '../views/NotFoundView.vue'

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
  // Única rota para a experiência do Apocalipse
  {
    path: '/apocalypse',
    name: 'apocalypse',
    component: ApocalypseExperienceView,
    meta: { title: 'Apocalipse - Uma Jornada Visual' }
  },
  {
    path: '/apocalypse/:chapter',
    name: 'apocalypse-chapter',
    component: ApocalypseExperienceView,
    props: true,
    meta: { title: 'Apocalipse - Uma Jornada Visual' }
  },
  // Rota para capturar URLs inválidas
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
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
