<template>
  <div>
    <h1>Cadastro de Clientes</h1>
    <form @submit.prevent="cadastrarCliente">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" v-model="cliente.nome" required>

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="cliente.email" required>

      <label for="telefone">Telefone:</label>
      <input type="tel" id="telefone" v-model="cliente.telefone" required>

      <label for="endereco">Endereço:</label>
      <input type="text" id="endereco" v-model="cliente.endereco" required>

      <button type="submit">Cadastrar</button>
    </form>

    <h2>Clientes Cadastrados</h2>
    <ul>
      <li v-for="(cliente, index) in clientes" :key="index">
        <div>
            <div>{{ cliente.nome }}</div>
            <div>{{ cliente.email }}</div>
            <div>{{ cliente.telefone }}</div>
            <div>{{ cliente.endereco }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      cliente: {
        nome: '',
        email: '',
        telefone: '',
        endereco: ''
      },
      clientes: []
    }
  },
  methods: {
    async cliente() {
      try {
        const response = await axios.post('http://localhost:5000/clientes', this.cliente);
        this.clientes.push(response.data);
        this.cliente = {
          nome: '',
          email: '',
          telefone: '',
          endereco: ''
        };
      } catch (error) {
        console.error('Erro ao cadastrar cliente:', error.response ? error.response.data : error.message);
      }
    },
    async clientes() {
      try {
        const response = await axios.get('http://localhost:5000/clientes');
        this.clientes = response.data;
      } catch (error) {
        console.error('Erro ao carregar clientes:', error.response ? error.response.data : error.message);
      }
    }
  },
  mounted() {
    this.clientes();
  }
}
</script>