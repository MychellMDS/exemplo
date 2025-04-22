import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Produtos from '../views/Produtos.vue'
import CadastroCliente from '../views/CadastroCliente.vue'
import SuporteCliente from '../views/SuporteCliente.vue'
import Login from '../views/Login.vue'

import { useUserStore } from '@/store/user'

const routes = [
  { path: '/login', component: Login, name: 'Login' },
  { path: '/', component: Home, name: 'Home', meta: { requiresAuth: true } },
  { path: '/produtos', component: Produtos, name: 'Produtos', meta: { requiresAuth: true } },
  { path: '/cadastrocliente', component: CadastroCliente, name: 'CadastroCliente', meta: { requiresAuth: true, requiresCliente: true } },
  { path: '/suportecliente', component: SuporteCliente, name: 'SuporteCliente', meta: { requiresAuth: true, requiresCliente: true } },
  { path: '/admin', component: () => import('../views/Admin.vue'), name: 'Admin', meta: { requiresAuth: true, requiresAdmin: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const usuario = userStore.usuario

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const requiresCliente = to.matched.some(record => record.meta.requiresCliente)

  if (requiresAuth && !usuario) {
    return next('/login')
  }

  if (requiresAdmin && usuario?.tipo !== 'admin') {
    return next('/')
  }

  if (requiresCliente && usuario?.tipo !== 'cliente') {
    return next('/')
  }

  if (to.path === '/login' && usuario) {
    return next('/')
  }

  next()
})

export default router
