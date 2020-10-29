import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/NotFound.vue'
import Verification from '../views/Verification.vue'
import Api from '../api'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/verification',
    name: 'Verification',
    component: Verification
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(async (to, _from, next) => {
  const isAuthenticated = Api.isAuthenticated()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const hideForAuth = to.matched.some(record => record.meta.hideForAuth)

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (hideForAuth && isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
