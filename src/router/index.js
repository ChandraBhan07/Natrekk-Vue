import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import TrekView from '../views/TrekView.vue'
import ProfileView from '../views/ProfileView.vue'
import MapC from '../components/TrekMap.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: { requiresGuest: true }
    },
    {
      path: '/',
      alias: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/trek/:slug',
      name: 'Trek',
      component: TrekView
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/map',
      name: 'map',
      component: MapC
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return {
        savedPosition,
        behavior: 'smooth'
      }
    } else {
      return {
        top: 0,
        behavior: 'smooth'
      }
    }
  },
})

export default router
