<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" color="purple-accent-3">
      <v-container>
        <v-list v-if="authStore.isAuthenticated">
          <v-list-item to="/">INCIO</v-list-item>
          <v-list-item to="/produto">Produto</v-list-item>
          <v-list-item to="/relatorios">Relatorios</v-list-item>
          <v-list-item to="/contato">Contato</v-list-item>
          <v-list-item to="/sobre">Sobre</v-list-item>
          <v-list-item to="/ajuda">Ajuda</v-list-item>
          <v-list-item @click="authStore.logout">
            <v-btn color="error" block prepend-icon="mdi-logout">Sair</v-btn>
          </v-list-item>
        </v-list>
        <div v-else>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="senha"
            label="Senha"
            type="password"
            outlined
          ></v-text-field>
          <v-btn color="blue-lighten-5" @click="login" block>Logar</v-btn>
          <v-btn color="red" block @click="authStore.login" prepend-icon="mdi-google">
            Logar com Google
          </v-btn>
        </div>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ Application }} - Tema Escuro : {{ temaescuro }}</v-app-bar-title>
      <v-switch label="Modo Escuro" v-model="temaescuro"></v-switch>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>


const vuetify = useTheme();
const authStore = useAuthStore();

const drawer = ref(null);
const Application = ref('Controle de Estoque');
const temaescuro = ref(true);

const email = ref('');
const senha = ref('');

watch(temaescuro, () => {
  vuetify.name.value = temaescuro.value ? 'dark' : 'light';
});

const login = () => {
  if (email.value === 'usuario@unemat.br' && senha.value === '123456') {
    authStore.isAuthenticated = true;
  } else {
    authStore.isAuthenticated = false;
    alert('Credenciais inválidas!');
  }
};
</script>
npm run build