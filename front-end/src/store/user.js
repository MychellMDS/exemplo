import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    usuario: null,
    erro: null,
    carregando: false
  }),

  actions: {
    async loginComEmailSenha(email, senha) {
      this.carregando = true
      this.erro = null

      try {
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, senha })
        })

        if (!res.ok) {
          const erro = await res.json()
          throw new Error(erro.erro || 'Erro ao fazer login')
        }

        const data = await res.json()
        this.usuario = data
      } catch (err) {
        this.erro = err.message
        this.usuario = null
        console.error('Erro no login:', err.message)
      } finally {
        this.carregando = false
      }
    },

    // Usado no login com Google
    setUsuario(usuario) {
      this.usuario = usuario
      this.erro = null
    },

    logout() {
      this.usuario = null
    }
  }
})
