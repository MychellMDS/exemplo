<template>
  <div id="app">
    <MenuBar />
    <SideMenu/>
    <router-view />
  </div>
</template>

<script setup>

import MenuBar from './components/MenuBar.vue'
import SideMenu from './components/SideMenu.vue'
import { useTheme } from './composables/useTheme'
useTheme()

</script>

<style>
/* Tema claro */
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
}

.dark {
  --bg-color: #121212;
  --text-color: #ffffff;
}
body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  margin: 0;
  padding: 0;
}
</style>
