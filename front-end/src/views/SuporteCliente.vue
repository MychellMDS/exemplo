<template>
    <div class="suporte">
      <h1>Suporte</h1>
      <p>Como podemos ajudar você?</p>
      <form @submit.prevent="enviarMensagem">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="form.nome" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label for="mensagem">Mensagem:</label>
          <textarea id="mensagem" v-model="form.mensagem" required></textarea>
        </div>
        <button type="submit" class="submit-button">Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  name: 'SuporteCliente',
  data() {
    return {
      form: {
        nome: '',
        email: '',
        mensagem: ''
      }
    };
  },
  methods: {
    async enviarMensagem() {
      try {
        const response = await axios.post('http://localhost:3000/api/suporte', this.form);
        alert("✅ Sua mensagem foi enviada com sucesso!");
        console.log("Resposta do servidor:", response.data);

        // Limpar formulário
        this.form.nome = '';
        this.form.email = '';
        this.form.mensagem = '';
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        alert("❌ Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
      }
    }
  }
};
</script>
  
  <style scoped>
  .suporte {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: var(--bg-color, #f9f9f9); /* Mantendo o mesmo fundo */
    color: var(--text-color, #333); /* Garantir a cor do texto */
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px; /* Ajustando padding para que os campos fiquem proporcionais */
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box; /* Para garantir que o padding não cause overflow */
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
  