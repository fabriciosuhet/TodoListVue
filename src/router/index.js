import { createRouter, createWebHistory } from 'vue-router'
import List from '../views/List.vue'
import Form from '../views/Form.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: List,
    },
    {
      path: '/form',
      name: 'form',
      component: Form,
    },

  ],
})

export default router
