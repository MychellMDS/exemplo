<template>
   <v-row>
      <v-col>
         <h2>Formulario</h2>
         <v-form>
            <v-text-field v-model="clientes.nome" label="Nome Completo" prepend-inner-icon="mdi-account"></v-text-field>
  
     
         <h2>Email</h2>
     
            <v-text-field v-model="clientes.email" label="exemplo@gmail.com" prepend-inner-icon="mdi-email"></v-text-field>
     
         <h2>Telefone</h2>
            <v-text-field v-model="clientes.telefone" label="+55 (DDD) 999..."prepend-inner-icon="mdi-phone"></v-text-field>
         <h2>Idade</h2>
            <v-text-field type="number " v-model="clientes.anoNascimento" label="Ano de Nascimento"prepend-inner-icon="mdi-calendar"></v-text-field>
            <v-btn @click="verificar">Verificar dados</v-btn>
         </v-form>
    
      
      </v-col>
      
 

      <v-col>
         Mostrar os dados
      </v-col>
     
      
      <v-col>
         <v-card>
            <v-card v-if="maioridade == true" ></v-card>
         <v-card-title class="d-flex justify-space-between align-center">
            <span>Lista de Clientes</span>
            <v-icon color="primary">mdi-account</v-icon>
         </v-card-title>
         <v-card-text>
            <v-list dense>
            <v-list-item>
               <v-list-item-icon>
               <v-icon color="blue">mdi-account</v-icon>
               </v-list-item-icon>
               <v-list-item-content>
               <v-list-item-title>Nome: {{ clientes.nome }}</v-list-item-title>
               </v-list-item-content>
            </v-list-item>
            <v-list-item>
               <v-list-item-icon>
               <v-icon color="green">mdi-email</v-icon>
               </v-list-item-icon>
               <v-list-item-content>
               <v-list-item-title>Email: {{ clientes.email }}</v-list-item-title>
               </v-list-item-content>
            </v-list-item>
            <v-list-item>
               <v-list-item-icon>
               <v-icon color="orange">mdi-phone</v-icon>
               </v-list-item-icon>
               <v-list-item-content>
               <v-list-item-title>Telefone: {{ clientes.telefone }}</v-list-item-title>
               </v-list-item-content>
            </v-list-item>
            <v-list-item>
               <v-list-item-icon>
               <v-icon color="black">mdi-calendar</v-icon>
               </v-list-item-icon>
               <v-list-item-content>
               <v-list-item-title>Data de Nascimento: {{ clientes.anoNascimento }}</v-list-item-title>
               </v-list-item-content>
            </v-list-item>
            </v-list>
            <v-btn color="success" v-if="maioridade == true">Acessar</v-btn>
         </v-card-text>
         </v-card>
      </v-col>

      
   </v-row>
</template>
<script setup>
import { ref } from 'vue'
const clientes = ref({
   nome: '',
   email: '',
   telefone: '',
   anoNascimento: '',
});
const maioridade = ref(false)

const verificar = () => {
  const anoAtual = new Date().getFullYear();
  const idade = anoAtual - clientes.value.anoNascimento;
  if(idade >= 18){
    maioridade.value = true; // é de maior
  }else{
    maioridade.value = false; // é de menor
  }
}

</script>