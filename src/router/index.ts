import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // @ts-ignore
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/peoples',
      name: 'peoples',
      // @ts-ignore
      component: () => import('../views/PeoplesView.vue')
    },
    {
      path: "/peoples/:id",
      name: "person",
      // @ts-ignore
      component: () => import('../views/PersonView.vue'),
    },
    {
      path: "/favorites",
      name: "favorites",
      // @ts-ignore
      component: () => import('../views/FavoritesView.vue'),
    }
  ]
})

export default router
