<template>
  <nav class="menu-bar">
    <label class="theme-switch">
      <input type="checkbox" v-model="isDark" />
      <span class="slider"></span>
    </label>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()

const isDark = computed({
  get: () => theme.value === 'dark',
  set: (val) => {
    if (val && theme.value !== 'dark') toggleTheme()
    else if (!val && theme.value !== 'light') toggleTheme()
  }
})
</script>

<style scoped>
.menu-bar {
  padding: 10px;
  background-color: var(--bg-color);
  color: var(--text-color);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}


.theme-switch {
  position: relative;
  display: inline-block;
  width: 40px; 
  height: 20px; 
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #ccc;
  border-radius: 20px;
  transition: background-color 0.4s ease-in-out;
}

input:checked + .slider {
  background-color: #007bff;
}

.slider::before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.4s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

input:checked + .slider::before {
  transform: translateX(18px); /* Ajustado para corresponder ao novo tamanho */
}
</style>
