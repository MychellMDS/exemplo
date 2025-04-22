<template>
  <div id="app">
    <MenuBar />
    <SideMenu v-if="user" />
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import MenuBar from './components/MenuBar.vue'
import SideMenu from './components/SideMenu.vue'
import { useTheme } from './composables/useTheme'

useTheme()

const user = ref(null)

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (u) => {
    user.value = u
  })
})
</script>

<style>
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
