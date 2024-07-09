import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from '@/config/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.HOME.path,
      name: ROUTES.HOME.name,
      component: () => import('@/views/HomeView.vue')
    }
  ]
})

export default router
