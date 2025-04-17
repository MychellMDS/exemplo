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
      <button type="submit" class="submit-button">Enviar</button>
    </form>
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
        telefone: ''
      }
    }
  },
  methods: {
    submitForm() {
      const cadastro = { ...this.CadastroCliente }
      console.log('✅ Cadastro efetuado com sucesso:', cadastro)
      alert('✅ Cadastro efetuado com sucesso!')

      this.resetForm()
    },
    resetForm() {
  this.CadastroCliente = {
    nome: '',
    email: '',
    telefone: ''
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
</style>

  