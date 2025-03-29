// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ApocalypseExperienceView from '../views/ApocalypseExperienceView.vue'
import ApocalypseChapterView from '../views/ApocalypseChapterView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/apocalypse',
    name: 'apocalypse',
    component: ApocalypseExperienceView
  },
  {
    path: '/apocalypse/:chapter',
    name: 'apocalypse-chapter',
    component: ApocalypseChapterView,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
