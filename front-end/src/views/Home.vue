<template>
  <div class="home-container">
    <h2 class="welcome-text">
      Olá, seja bem-vindo à SoloLivre! Aqui você encontrará diversos instrumentos com os melhores preços!
    </h2>
    <button class="login-btn google" @click="loginGoogle">Login com Google</button>
    <button class="login-btn facebook" @click="loginFacebook">Login com Facebook</button>
    <router-link to="/SuporteCliente" class="support-link">
      <i class="fas fa-headset"></i> Suporte
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    loginGoogle() {
      // Lógica de login com Google
      console.log('Login com Google');
    },
    loginFacebook() {
      // Lógica de login com Facebook
      console.log('Login com Facebook');
    }
  }
}
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 40px 20px;
}

.welcome-text {
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: var(--text-color);
}

.login-btn {
  padding: 12px 24px;
  font-size: 1rem;
  margin: 10px;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;
}

.login-btn:hover {
  transform: scale(1.05);
}

.google {
  background-color: #db4437; /* Vermelho Google */
}

.google:hover {
  background-color: #c1351d;
}

.facebook {
  background-color: #3b5998; /* Azul Facebook */
}

.facebook:hover {
  background-color: #2d4373;
}

.support-link {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 1.2rem;
  color: var(--text-color);
  text-decoration: none;
  display: flex;
  align-items: center;
}

.support-link i {
  margin-right: 8px;
  font-size: 1.2rem;
}

.support-link:hover {
  text-decoration: underline;
}
</style>