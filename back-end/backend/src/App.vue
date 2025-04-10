<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" color="purple-accent-3">
      <v-container>
        <v-list v-if="isAuthenticated">
          <v-list-item to="/">INÍCIO</v-list-item>
          <v-list-item to="/produto">Produto</v-list-item>
          <v-list-item to="/relatorios">Relatórios</v-list-item>
          <v-list-item to="/contato">Contato</v-list-item>
          <v-list-item to="/sobre">Sobre</v-list-item>
          <v-list-item to="/ajuda">Ajuda</v-list-item>
          <v-list-item @click="logout">
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
        </div>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ application }} - Tema Escuro : {{ temaescuro }}</v-app-bar-title>
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
import { ref, watch } from 'vue';

const drawer = ref(false);
const application = ref('Controle de Estoque');
const temaescuro = ref(true);
const isAuthenticated = ref(false);

const email = ref('');
const senha = ref('');

watch(temaescuro, () => {
  console.log(temaescuro.value ? 'Dark mode enabled' : 'Light mode enabled');
});

const login = () => {
  if (email.value === 'usuario@unemat.br' && senha.value === '123456') {
    isAuthenticated.value = true;
  } else {
    isAuthenticated.value = false;
    alert('Credenciais inválidas!');
  }
};

const logout = () => {
  isAuthenticated.value = false;
};
</script>

<style>
/* Adicione estilos personalizados, se necessário */
</style>
