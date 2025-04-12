<template>
    <div>
      <h2>Carrinho</h2>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} - R$ {{ item.price }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['cart']
  }
  </script>
  