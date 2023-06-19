import { createRouter, createWebHashHistory } from 'vue-router'
import main from '@/views/main-page.vue'
import tasksPage from '@/views/tasks-page.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: main
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: tasksPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
