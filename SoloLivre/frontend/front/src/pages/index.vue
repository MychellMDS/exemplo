<template>
    <div id="app">
      <nav class="navbar">
        <ul class="menu">
          <h1>Olá seja bem vindo a SoloLivre o melhor site para compra de instrumentos musicais!!!</h1>
          <li><router-link to="/produtos">Produtos</router-link></li>
          <li><router-link to="/clientes">Clientes</router-link></li>
          <li><router-link to="/usuarios">Usuários</router-link></li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: "App",
  };
  </script>