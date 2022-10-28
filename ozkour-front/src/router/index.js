import { createRouter, createWebHistory } from 'vue-router'

import { authGuard } from '@auth0/auth0-vue'

import HomeView from '../views/HomeView.vue'
import TalkForm from '../views/TalkForm.vue'
import TrainingForm from '../views/TrainingForm.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/talk',
    name: 'talk-form',
    component: TalkForm,
    beforeEnter: authGuard
  },
  {
    path: '/training',
    name: 'training-form',
    component: TrainingForm,
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
