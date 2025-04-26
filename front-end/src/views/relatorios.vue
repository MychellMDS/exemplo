<template>
    <div class="relatorios-container">
      <h1>📊 Relatório de Produtos</h1>
      <p>Veja abaixo o resumo de todos os produtos cadastrados.</p>
  
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor (R$)</th>
            <th>Quantidade</th>
            <th>Total em Estoque (R$)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto in produtos" :key="produto.id">
            <td>{{ produto.nome }}</td>
            <td>{{ produto.valor.toFixed(2) }}</td>
            <td>{{ produto.quantidade }}</td>
            <td>{{ (produto.valor * produto.quantidade).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="totais">
        <p><strong>Total de Produtos:</strong> {{ produtos.length }}</p>
        <p><strong>Valor Total Estimado:</strong> R$ {{ totalGeral.toFixed(2) }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../services/api'
  
  export default {
    name: 'Relatorios',
    data() {
      return {
        produtos: []
      }
    },
    mounted() {
      api.get('/api/produtos')
        .then(res => {
          this.produtos = res.data
        })
        .catch(err => {
          console.error('Erro ao carregar relatório de produtos:', err)
        })
    },
    computed: {
      totalGeral() {
        return this.produtos.reduce((total, p) => total + p.valor * p.quantidade, 0)
      }
    }
  }
  </script>
  
  <style scoped>
  .relatorios-container {
    padding: 30px;
    background-color: var(--fundo-principal);
    color: var(--texto-principal);
  }
  
  h1 {
    margin-bottom: 10px;
    color: #333;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  
  th {
    background-color: #f5f5f5;
  }
  
  tr:hover {
    background-color: #f9f9f9;
  }
  
  .totais {
    margin-top: 30px;
    font-size: 16px;
  }
  </style>
  