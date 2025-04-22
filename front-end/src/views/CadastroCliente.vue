<template>
  <div class="cliente-cadastro">
    <h1>Cadastro</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="CadastroCliente.nome" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="CadastroCliente.email" required />
      </div>
      <div class="form-group">
        <label for="telefone">Telefone:</label>
        <input type="tel" id="telefone" v-model="CadastroCliente.telefone" />
      </div>
      <div class="form-group">
        <label for="endereco">Endereço:</label>
        <input type="text" id="endereco" v-model="CadastroCliente.endereco" required />
      </div>
      <button type="submit" class="submit-button">Enviar</button>
    </form>

    <!-- Mensagem de sucesso -->
    <div v-if="mensagemSucesso" class="mensagem-sucesso">
      {{ mensagemSucesso }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CadastroCliente',
  data() {
    return {
      CadastroCliente: {
        nome: '',
        email: '',
        telefone: '',
        endereco: ''
      },
      mensagemSucesso: '' // Nova variável para exibir feedback
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:3000/api/clientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.CadastroCliente)
        })

        if (!response.ok) throw new Error('Erro ao cadastrar cliente.')

        const data = await response.json()
        console.log('✅ Cliente cadastrado:', data)

        this.mensagemSucesso = '✅ Cadastro efetuado com sucesso!'
        this.resetForm()

        // Esconde a mensagem depois de 5 segundos
        setTimeout(() => {
          this.mensagemSucesso = ''
        }, 5000)

      } catch (error) {
        console.error('❌ Erro ao enviar cadastro:', error)
        alert('Erro ao cadastrar cliente. Verifique o console.')
      }
    },
    resetForm() {
      this.CadastroCliente = {
        nome: '',
        email: '',
        telefone: '',
        endereco: ''
      }
    }
  }
}
</script>

<style scoped>
.cliente-cadastro {
  max-width: 400px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.submit-button {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}
.submit-button:hover {
  background-color: #0056b3;
}
.mensagem-sucesso {
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  text-align: center;
}
</style>
