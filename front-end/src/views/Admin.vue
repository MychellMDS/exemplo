<template>
    <div class="admin-container">
      <h1>Painel do Administrador</h1>
  
      <form @submit.prevent="adicionarProduto">
        <input v-model="novoProduto.nome" placeholder="Nome do produto" required />
        <input v-model="novoProduto.preco" type="number" placeholder="Preço" required />
        <button type="submit">Adicionar Produto</button>
      </form>
  
      <ul class="lista-produtos">
        <li v-for="produto in produtos" :key="produto.id">
          <span>{{ produto.nome }} - R$ {{ produto.preco }}</span>
          <button @click="editarProduto(produto)">✏️</button>
          <button @click="removerProduto(produto.id)">🗑️</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const produtos = ref([])
  const novoProduto = ref({ nome: '', preco: 0 })
  
  const carregarProdutos = async () => {
    const { data } = await axios.get('http://localhost:3000/api/produtos')
    produtos.value = data
  }
  
  const adicionarProduto = async () => {
    const { data } = await axios.post('http://localhost:3000/api/produtos', novoProduto.value)
    produtos.value.push(data)
    novoProduto.value = { nome: '', preco: 0 }
  }
  
  const removerProduto = async (id) => {
    await axios.delete(`http://localhost:3000/api/produtos/${id}`)
    produtos.value = produtos.value.filter(p => p.id !== id)
  }
  
  const editarProduto = async (produto) => {
    const novoNome = prompt('Novo nome:', produto.nome)
    const novoPreco = prompt('Novo preço:', produto.preco)
    if (novoNome && novoPreco) {
      await axios.put(`http://localhost:3000/api/produtos/${produto.id}`, {
        nome: novoNome,
        preco: parseFloat(novoPreco)
      })
      await carregarProdutos()
    }
  }
  
  onMounted(() => {
    carregarProdutos()
  })
  </script>
  
  <style scoped>
  .admin-container {
    max-width: 600px;
    margin: auto;
    padding: 2rem;
  }
  
  form {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .lista-produtos li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  </style>
  