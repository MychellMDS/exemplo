<template>
  <div class="login-page">
    <img src="/logo.jpg" alt="Logo da SoloLivre" class="top-banner" />
    <h1>Bem-vindo ao SOLOLIVRE</h1>
    <p class="descricao">A maior variedade de instrumentos musicais:</p>
    <ul class="produtos">
      <li>🎸 Guitarras</li>
      <li>🎶 Violões</li>
      <li>🎹 Pianos</li>
      <li>🥁 Baterias</li>
    </ul>

    <!-- Login com Google -->
    <button class="google-button" @click="loginWithGoogle">
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
        alt="Google"
        class="google-icon"
      />
      Login com Google
    </button>

    <!-- Login com email e senha -->
    <form class="login-form" @submit.prevent="fazerLogin">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="senha" placeholder="Senha" required />
      <button type="submit">Entrar com Email</button>
      <p v-if="erro" class="erro">{{ erro }}</p>
    </form>

    <footer class="copyright">© 2025 SOLOLIVRE. Todos os direitos reservados.</footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, provider, signInWithPopup } from '@/firebase'
import { useUserStore } from '@/store/user'

const email = ref('')
const senha = ref('')
const erro = ref('')
const router = useRouter()
const userStore = useUserStore()

const fazerLogin = async () => {
  erro.value = ''
  try {
    console.log('Tentando login com:', email.value, senha.value)
    
    await userStore.loginComEmailSenha(email.value, senha.value)


    if (userStore.usuario) {
      console.log('Login bem-sucedido:', userStore.usuario)

      if (userStore.usuario.tipo === 'admin') {
        router.push('/admin')
      } else {
        router.push('/')
      }
    } else {
      erro.value = userStore.erro || '❌ Email ou senha inválidos'
    }
  } catch (e) {
    erro.value = '❌ Erro ao tentar login'
    console.error('Erro ao tentar login:', e)
  }
}

const loginWithGoogle = async () => {
  erro.value = ''
  try {
    console.log('Iniciando login com Google...')
    const result = await signInWithPopup(auth, provider)
    const token = await result.user.getIdToken()

    const res = await fetch('http://localhost:3000/api/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })

    if (!res.ok) {
      const erroBackend = await res.json()
      throw new Error(erroBackend.erro || 'Erro no login com Google')
    }

    const data = await res.json()
    userStore.setUsuario(data)

    console.log('Login com Google bem-sucedido:', data)
    router.push('/')
  } catch (error) {
    console.error('Erro ao fazer login com Google:', error)
    erro.value = '❌ Erro ao autenticar com o Google'
  }
}
</script>

<style>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.top-banner {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.descricao {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.produtos {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}

.produtos li {
  margin: 5px 0;
  font-size: 1.1rem;
}

.google-button {
  display: flex;
  align-items: center;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}

.google-button:hover {
  background-color: #218838;
}

.google-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
}

.login-form input {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.login-form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0056b3;
}

.erro {
  color: red;
  margin-top: 10px;
}

.copyright {
  margin-top: 40px;
  font-size: 0.9rem;
  color: var(--text-color);
}
</style>
