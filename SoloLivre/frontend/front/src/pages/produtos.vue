<template>
  <div>
    <h1>Cadastro de Produtos</h1>
    <form @submit.prevent="cadastrarProduto">
      <label for="nome">Nome do Produto:</label>
      <input type="text" id="nome" v-model="produto.nome" required>

      <label for="valor">Valor:</label>
      <input type="number" id="valor" v-model="produto.valor" required>

      <label for="quantidade">Quantidade:</label>
      <input type="number" id="quantidade" v-model="produto.quantidade" required>

      <label for="descricao">Descrição:</label>
      <textarea id="descricao" v-model="produto.descricao" required></textarea>

      <button type="submit">Cadastrar</button>
    </form>

    <h2>Produtos Cadastrados</h2>
    <ul>
      <li v-for="(produto, index) in produtos" :key="index">
        {{ produto.nome }} - R$ {{ produto.valor }} - Quantidade: {{ produto.quantidade }} - Descrição: {{ produto.descricao }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "produtos",
};
</script>