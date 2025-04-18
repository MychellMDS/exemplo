// src/composables/useTheme.js
import { ref, watch } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

// Função pra aplicar a classe no <html>
function applyTheme() {
  document.documentElement.className = theme.value
  localStorage.setItem('theme', theme.value)
}

// Aplica no início
applyTheme()

// Se o tema mudar, reaplica
watch(theme, applyTheme)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

export function useTheme() {
  return { theme, toggleTheme }
}

