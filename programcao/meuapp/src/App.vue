<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" color="purple-accent-3">
      
      <v-container> <v-list v-if="logado == true">  
        <v-list-item to="/">INCIO</v-list-item>
        <v-list-item to="/produto">Produto</v-list-item>
        <v-list-item to="/relatorios">Relatorios</v-list-item>
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
     
      <!-- 
            INSIRA UM CAMPO PARA EMAIL E SENHA.
            SE O EMAIL FOR usuario@unemat.br E A SENHA 123456
            ENTÃO ELE ESTA LOGADO.
            SENÃO NÃO ESTÁ LOGADO
          -->

   
    <v-btn color="blue-lighten-5" @click="login" block>Logar</v-btn>
  </div>
  <v-btn color="red" block @click="loginWithGoogle" prepend-icon="mdi-google">
    Logar com Google
  </v-btn>
    
    
    <!-- v-on insere-->
      
      
       </v-container>
    
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>{{ Application }}- Tema Escuro : {{ temaescuro }}</v-app-bar-title>
      <v-switch  label='Modo Escuro' v-model="temaescuro"></v-switch>
      
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
const vuetify = useTheme();


const drawer = ref(null)
const Application = ref('Controle de Estoque');
const temaescuro = ref(true);

const logado = ref(false);

watch(temaescuro, ()=>{
  if (temaescuro.value == true){
    vuetify.name.value = "dark"


} else{
  vuetify.name.value = "light"
}
}
)
const email = ref('');
const senha = ref('');

const login = () => {
  if (email.value === 'usuario@unemat.br' && senha.value === '123456') {
    logado.value = true;
  } else {
    logado.value = false;
    alert('Credenciais inválidas!');
  }
};

const Logout = () => {
  logado.value = false;
  drawer.value = false;
};
const logout = () => {
  logado.value = false;
  email.value = '';
  senha.value = '';
  alert('Você saiu com sucesso!');
};
</script>