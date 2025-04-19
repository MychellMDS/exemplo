import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Sobre from '../views/About.vue'
import Produtos from '../views/Produtos.vue'
import CadastroCliente from '../views/CadastroCliente.vue'
import SuporteCliente from '../views/SuporteCliente.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/about', component: Sobre, name: 'Sobre' },
  { path: '/produtos', component: Produtos, name: 'Produtos' },
  { path: '/cadastrocliente', component: CadastroCliente, name: 'CadastroCliente' },
  { path: '/suportecliente', component: SuporteCliente, name: 'SuporteCliente' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

let firstLoad = true

router.beforeEach((to, from, next) => {
  if (firstLoad && to.path !== '/') {
    firstLoad = false
    next('/')
  } else {
    firstLoad = false
    next()
  }
})

export default router
