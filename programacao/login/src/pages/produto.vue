<!-- eslint-disable -->
<template>
    <v-card>
      <v-card-title>Cadastrar Produtos</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="produto.nome" label="Nome do Produto" />
          <v-text-field v-model="produto.valor" label="Preço" type="number" />
          <v-text-field v-model="produto.quantidade" label="Quantidade" type="number" />
          <v-text-field v-model="produto.descricao" label="Descrição" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary"
          @click="salvar"
         :disabled="desabilitado"
         :loading="desabilitado">Salvar</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mt-4">
      <v-card-title>Produtos Cadastrados</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="item in produtos" :key="item.nome">
            {{ item.nome }} - R${{ item.valor }} - {{ item.quantidade }}un. - {{ item.descricao }}
  
            <v-btn @click="editar(item)" color="success" variant="plain" icon="mdi-pencil"></v-btn>
            <v-btn @click="remover(item)" color="error" variant="plain" icon="mdi-close"></v-btn>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  const desabilitado = ref(false)
  const produto = ref({
    nome: '',
    valor: '',
    quantidade: '',
    descricao: ''
  }); // {} cria um objeto
  
  // Vetor de produtos (armezenar os produtos na memoria)
  const produtos = ref([]); // [] significa vetor (array)
  
  const salvar = async () => {
    desabilitado.value = true;
    let url = '';
    let metodo = '';
    if (produto.value.id) { // editar
      url = 'http://localhost:5000/produtos/' + produto.value.id;
      metodo = 'PUT';
    } else { // cadastrar
      url = 'http://localhost:5000/produtos';
      metodo = 'POST';
    }
    const res = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto.value)
    });
    const data = await res.json();
    if (data.message) alert(data.message)
    produto.value = {} // limpa o produto (atribui um objeto vazio)
    carregarProdutos();
    desabilitado.value = false;
  }
  const remover = async (item) => {
    const id = item.id;
    await fetch('http://localhost:5000/produtos/' + id,
      { method: 'DELETE' })
    carregarProdutos();
  }
  
  const editarIndex = ref(-1); // -1 significa que não tem nada
  const editar = (item) => {  // função editar
    // atribui uma copia do item ao produto para mostrar no formulario
    produto.value = { ...item };
    // atribui o index do item ao editarIndex pra saber qual produto editar
    editarIndex.value = produtos.value.indexOf(item);
  }
  
  const carregarProdutos = async () => {
    const res = await fetch('http://localhost:5000/produtos'); //GET
    produtos.value = await res.json();
  }
  
  onMounted(() => {
    carregarProdutos();
  });
  </script>