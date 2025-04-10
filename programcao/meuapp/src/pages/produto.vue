<!-- eslint-disable -->
<template>
    <v-card>
      <v-card-title>Produtos</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model= "produto.nome"label="Nome do Produto" />
          <v-text-field v-model= "produto.preco"label="Preço" type="number" />
          <v-text-field v-model= "produto.descricao"label="Descrição do produto" />
          <v-text-field v-model= "produto.quantidade"label="quantidade" type="number" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="salvar">Salvar</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="'mt-4'">
    <v-card-title>Produtos Cadastrados</v-card-title>
    <v-card-text>
        <v-list>
            <v-list-item v-for="item in produtos" :key="item.nome">
                {{ item.nome }} - R${{ item.preco }} - Quantidade: {{ item.quantidade }} - Descrição: {{ item.descricao }}
                <v-btn color="success" variant="plain" icon="mdi-pencil" @click="editar(item)"></v-btn>
                <v-btn @click="remover(item)"color="error" variant="plain" icon="mdi-close"></v-btn>
            </v-list-item>
        </v-list>
       
    </v-card-text>
    </v-card>
  </template>

<script setup>
import { ref } from 'vue'
const produto = ref({
    nome: '',
    preco: '',
    quantidade: '',
    descricao: '',
});

const produtos = ref([]);
const salvar = () => {
    if (produto.value.nome && produto.value.preco && produto.value.descricao && produto.value.quantidade) {
        produtos.value.push({ ...produto.value });
        produto.value = {
            nome: '',
            preco: '',
            quantidade: '',
            descricao: '',
        };
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}
const remover = (item) => {
    produtos.value = produtos.value.filter(
        (p) => p !== item
    )
}
const editar = (item) => {
    produto.value = { ...item };
    produtos.value = produtos.value.filter(
        (p) => p !== item
    );
};

</script>