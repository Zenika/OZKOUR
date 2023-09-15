import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TalkForm from '../views/TalkForm.vue'
import TrainingForm from '../views/TrainingForm.vue'
import { useAuth0 } from '@auth0/auth0-vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/talk',
    name: 'talk-form',
    component: TalkForm
  },
  {
    path: '/training',
    name: 'training-form',
    component: TrainingForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  const { isAuthenticated } = useAuth0()
  if (to.name !== 'home' && !isAuthenticated.value) {
    return { name: 'home' }
  }
})

export default router
