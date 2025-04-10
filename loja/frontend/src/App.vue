<template>
  <div>
    <h1>Loja Online</h1>
    <ProductList :addToCart="addToCart" />
    <Cart :cart="cart" />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';
import Cart from './components/Cart.vue';

export default {
  components: {
    ProductList,
    Cart
  },
  data() {
    return {
      cart: []
    };
  },
  methods: {
    addToCart(product) {
      this.cart.push(product);
    }
  }
}
</script>
