import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TalkForm from '../views/TalkForm.vue'

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: HomeView
  },
  { 
    path: '/talkform', 
    name: 'talk-form',
    component: TalkForm
  },
]

const router = createRouter({
  history:createWebHistory(),
  routes,
})

export default router