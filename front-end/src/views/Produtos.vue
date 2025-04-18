<template>
  <div class="produtos-container">
    <div class="filtros">
      <input
        v-model="search"
        class="search-bar"
        placeholder="Buscar produto por nome..."
      />

      <div class="categoria-switch">
        <label v-for="cat in categorias" :key="cat" class="categoria-item">
          <input
            type="radio"
            name="categoria"
            :value="cat"
            v-model="categoriaSelecionada"
          />
          {{ cat }}
        </label>
      </div>
    </div>

    <div class="carrinho-button" @click="abrirCarrinho">
      🛒 Carrinho ({{ totalItensCarrinho }})
    </div>

    <div class="lista-produtos">
      <div
        class="produto"
        v-for="produto in produtosFiltrados"
        :key="produto.id"
      >
        <h3>{{ produto.nome }}</h3>
        <p>{{ produto.descricao }}</p>
        <p><strong>Preço:</strong> R$ {{ produto.valor.toFixed(2) }}</p>
        <p><strong>Disponível:</strong> {{ produto.quantidade }}</p>
        <button @click="adicionarAoCarrinho(produto)">Adicionar ao carrinho</button>
      </div>
    </div>

    <!-- Modal do carrinho -->
    <div v-if="mostrarCarrinho" class="carrinho-modal">
      <div class="carrinho-conteudo">
        <span class="fechar" @click="fecharCarrinho">✕</span>
        <h2>Carrinho de Compras</h2>
        <ul>
          <li v-for="item in carrinho" :key="item.id">
            {{ item.nome }} - R$ {{ item.valor.toFixed(2) }} (x{{ item.qtd }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const produtos = ref([
  { id: 1, nome: 'Violão Clássico', valor: 450, quantidade: 10, descricao: 'Violão acústico ideal para iniciantes.', categoria: 'Violão' },
  { id: 2, nome: 'Guitarra Stratocaster', valor: 1200, quantidade: 5, descricao: 'Guitarra elétrica com timbre versátil.', categoria: 'Guitarra' },
  { id: 3, nome: 'Piano Digital', valor: 3000, quantidade: 3, descricao: 'Piano digital com teclas sensíveis ao toque.', categoria: 'Piano' },
  { id: 4, nome: 'Bateria Acústica', valor: 2500, quantidade: 2, descricao: 'Bateria completa com pratos e ferragens.', categoria: 'Bateria' },
  { id: 5, nome: 'Ukulele Soprano', valor: 180, quantidade: 15, descricao: 'Ukulele leve e fácil de tocar.', categoria: 'Ukulele' },
])

const search = ref('')
const categoriaSelecionada = ref('')
const carrinho = ref([])
const mostrarCarrinho = ref(false)

const categorias = ['Violão', 'Guitarra', 'Piano', 'Bateria', 'Ukulele']

const produtosFiltrados = computed(() => {
  return produtos.value.filter(p => {
    const nomeMatch = p.nome.toLowerCase().includes(search.value.toLowerCase())
    const categoriaMatch = categoriaSelecionada.value ? p.categoria === categoriaSelecionada.value : true
    return nomeMatch && categoriaMatch
  })
})

const totalItensCarrinho = computed(() =>
  carrinho.value.reduce((total, item) => total + item.qtd, 0)
)

function adicionarAoCarrinho(produto) {
  const item = carrinho.value.find(i => i.id === produto.id)
  if (item) {
    item.qtd++
  } else {
    carrinho.value.push({ ...produto, qtd: 1 })
  }
}

function abrirCarrinho() {
  mostrarCarrinho.value = true
}

function fecharCarrinho() {
  mostrarCarrinho.value = false
}
</script>

<script>
export default {
  name: 'PaginaProdutos'
}
</script>

<style scoped>
/* Variáveis de tema */
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
  --card-bg: #f9f9f9;
}
html.dark {
  --bg-color: #121212;
  --text-color: #f0f0f0;
  --card-bg: #1e1e1e;
}

.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.filtros {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.search-bar {
  width: 60%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: var(--card-bg);
  color: var(--text-color);
}

.search-bar::placeholder {
  color: #aaa;
}

.categoria-switch {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.categoria-item {
  cursor: pointer;
}

.lista-produtos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.produto {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  background-color: var(--card-bg);
  color: var(--text-color);
}

.produto button {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.produto button:hover {
  background-color: #0056b3;
}

.carrinho-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  margin: 20px auto;
  text-align: center;
  width: fit-content;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carrinho-button:hover {
  background-color: #218838;
}

/* Modal do carrinho */
.carrinho-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.carrinho-conteudo {
  background-color: var(--card-bg);
  color: var(--text-color);
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  position: relative;
}

.fechar {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>