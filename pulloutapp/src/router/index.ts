import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import MenuPage from '../components/MenuPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/',
    component: MenuPage,
    children: [
      {
        path: '',
        redirect: HomePage
      },
      {
        path: '/home',
        component: HomePage
      },
      {
        path: '/saved',
        component: import('../views/SavedPage.vue')
      },
      {
        path: '/account',
        component: import('../views/ProfilePage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
