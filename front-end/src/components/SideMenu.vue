<template>
  <div>
    <!-- Ícone ☰ com transição de fade -->
    <transition name="fade">
      <div v-if="!isOpen" class="menu-icon" @click="toggleMenu">
        ☰
      </div>
    </transition>

    <!-- Menu lateral -->
    <div :class="['side-menu', { 'side-menu-open': isOpen }]">
      <!-- Botão de fechar ✕ -->
      <div class="close-icon" @click="toggleMenu">
        ✕
      </div>

      <ul>
        <li>
          <router-link to="/" @click="isOpen = false">Início</router-link>
        </li>
        <li>
          <router-link to="/CadastroCliente" @click="isOpen = false">Cadastrar-se</router-link>
        </li>
        <li>
          <router-link to="/Produtos" @click="isOpen = false">Produtos</router-link>
        </li>
        <li>
          <router-link to="/SuporteCliente" @click="isOpen = false">Suporte</router-link>
        </li>
        <li>
          <button class="logout-button" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const isOpen = ref(false)
const router = useRouter()

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function logout() {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      isOpen.value = false
      router.push('/login') // redireciona para Login.vue
    })
    .catch((error) => {
      console.error('Erro ao fazer logout:', error)
      alert('Erro ao sair. Tente novamente.')
    })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.menu-icon {
  font-size: 30px;
  cursor: pointer;
  padding: 10px;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1001;
}

.close-icon {
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1001;
}

.side-menu {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: left 0.3s ease-in-out, background-color 0.3s ease, color 0.3s ease;
  padding-top: 60px;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.side-menu-open {
  left: 0;
}

.side-menu ul {
  list-style: none;
  padding: 0;
  margin-top: 60px;
}

.side-menu li {
  padding: 10px 20px;
}

.side-menu li:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.side-menu a {
  color: var(--text-color);
  text-decoration: none;
  display: block;
}

.logout-button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font: inherit;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>
