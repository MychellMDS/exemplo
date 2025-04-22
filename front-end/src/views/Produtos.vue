<template>
  <div class="produtos-container">
    <div class="topo">
      <a href="https://example.com" target="_blank" class="logo-faixa">
        <img src="c:\Users\cex\Documents\Imagem do WhatsApp de 2025-04-20 à(s) 20.10.13_d373e182.jpg" alt="Logo SOLOLIVRE" />
      </a>
      <h1>Bem-vindo à SOLOLIVRE!</h1>
      <p>Explore nossos produtos e faça suas compras online.</p>
    </div>

    <router-link to="/SuporteCliente" class="support-button">
      <i class="fas fa-headset"></i> Suporte
    </router-link>

    <h2>Produtos da SOLOLIVRE 🎸</h2>
    <div class="card-list">
      <div class="produto-card" v-for="produto in produtos" :key="produto.id">
        <img :src="produto.imagem || 'https://via.placeholder.com/100'" alt="Imagem do produto" class="produto-imagem" />
        <div class="produto-info">
          <h3>{{ produto.nome }}</h3>
          <p><strong>R$ {{ produto.valor }}</strong></p>
          <p><strong>Disponível:</strong> {{ produto.quantidade }}</p>
          <p class="descricao"><strong>Descrição:</strong>{{ produto.descricao }}</p>
          <button @click="adicionarAoCarrinho(produto)">Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>

    <div class="carrinho-container">
      <h3>Carrinho de Compras 🛒</h3>
      <ul>
        <li v-for="(item, index) in carrinho" :key="index">
          {{ item.nome }} - R$ {{ item.valor }} (Quantidade: {{ item.quantidade }})
          <br />
          <button class="btn-remover" @click="removerDoCarrinho(index)">Remover</button>
        </li>
      </ul>
      <p v-if="carrinho.length === 0">O carrinho está vazio.</p>
      <p v-else><strong>Total: R$ {{ totalCarrinho }}</strong></p>
      <button v-if="carrinho.length > 0" class="btn-comprar" @click="comprarItens">Comprar</button>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'Produtos',
  data() {
    return {
      produtos: [],
      carrinho: []
    }
  },
  mounted() {
    api.get('/api/produtos')
      .then(res => {
        this.produtos = res.data
      })
      .catch(err => {
        console.error('Erro ao buscar produtos:', err)
      })
  },
  computed: {
    totalCarrinho() {
      return this.carrinho.reduce((total, item) => total + item.valor * item.quantidade, 0);
    }
  },
  methods: {
    adicionarAoCarrinho(produto) {
      const itemExistente = this.carrinho.find(item => item.id === produto.id);
      if (itemExistente) {
        itemExistente.quantidade++;
      } else {
        this.carrinho.push({ ...produto, quantidade: 1 });
      }
    },
    removerDoCarrinho(index) {
      this.carrinho.splice(index, 1);
    },
    comprarItens() {
      alert(`Compra realizada com sucesso! Total: R$ ${this.totalCarrinho}`);
      this.carrinho = [];
    }
  }
}
</script>

<style scoped>
.topo {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.topo img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 8px;
}

.logo-faixa {
  width: 100%;
  height: 120px;
  background-color: var(--card-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 20px;
}

.logo-faixa img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  display: block;
}

.produtos-container {
  padding: 20px;
  position: relative;
  color: var(--texto-principal);
  background-color: var(--fundo-principal);
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.produto-card {
  background-color: var(--card-bg);
  border: 1px solid var(--texto-principal);
  border-radius: 12px;
  padding: 15px;
  width: 260px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--texto-principal);
}

.produto-imagem {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 8px;
}

.produto-info h3,
.produto-info p {
  margin: 3px 0;
  color: var(--texto-principal);
}

.produto-info .descricao {
  font-size: 0.9em;
  color: var(--texto-principal);
  margin-bottom: 10px;
}

.produto-info button {
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.produto-info button:hover {
  background-color: #36966e;
}

/* Carrinho */
.carrinho-container {
  position: absolute;
  top: 140px;
  right: 20px;
  background-color: var(--card-bg);
  border: 1px solid var(--texto-principal);
  border-radius: 10px;
  padding: 15px;
  width: 280px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: left;
  color: var(--texto-principal);
}

.carrinho-container h3 {
  margin-top: 0;
  font-size: 18px;
}

.carrinho-container ul {
  padding-left: 0;
  list-style: none;
}

.carrinho-container button {
  margin-top: 5px;
  padding: 5px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.btn-remover {
  background-color: #e74c3c;
  color: white;
}

.btn-remover:hover {
  background-color: #c0392b;
}

.btn-comprar {
  background-color: #2ecc71;
  color: white;
  margin-top: 10px;
  width: 100%;
}

.btn-comprar:hover {
  background-color: #27ae60;
}

/* Suporte botão fixo */
.support-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #42b983;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  z-index: 1000;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;
}

.support-button:hover {
  background-color: #36966e;
}
</style>
