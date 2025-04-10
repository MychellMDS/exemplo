<template>
  <div>
    <h2>Produtos</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - R$ {{ product.price }}
        <button @click="addToCart(product)">Adicionar ao Carrinho</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['addToCart'],
  data() {
    return {
      products: []
    };
  },
  mounted() {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        this.products = data;
      });
  }
}
</script>
