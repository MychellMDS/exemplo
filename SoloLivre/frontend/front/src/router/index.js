import Home from '../pages/index.vue'
import Produtos from '../pages/produtos.vue'
import Clientes from '../pages/clientes.vue';
import Usuarios from '../pages/usuarios.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/produtos', component: Produtos },
  { path: '/clientes', component: Clientes },
  { path: '/usuarios', component: Usuarios },
];