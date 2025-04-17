<template>
    <div>
        <h1>Lista de Usuários Cadastrados</h1>
        <ul>
            <li v-for="usuario in usuarios" :key="usuario.id">
                {{ usuario.nome }} - {{ usuario.email }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            usuarios: [
                { id: 1, nome: "João Silva", email: "joao.silva@example.com" },
                { id: 2, nome: "Maria Oliveira", email: "maria.oliveira@example.com" },
                { id: 3, nome: "Carlos Santos", email: "carlos.santos@example.com" },
            ],
        };
    },
};
</script>