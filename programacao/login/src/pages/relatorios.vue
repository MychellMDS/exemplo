<template>
    <div>
        <v-card>
            <v-card-title>Produtos</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="produto.nome" label="Nome do Produto" />
                    <v-text-field v-model="produto.preco" label="Preço" type="number" />
                    <v-text-field v-model="produto.descricao" label="Descrição do produto" />
                    <v-text-field v-model="produto.quantidade" label="Quantidade" type="number" />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="error">Cancelar</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="salvar">Salvar</v-btn>
            </v-card-actions>
        </v-card>
        <v-card class="mt-4">
            <v-card-title>Produtos Cadastrados</v-card-title>
            <v-card-text>
                <v-list>
                    <v-list-item v-for="item in produtos" :key="item.nome">
                        {{ item.nome }} - R${{ item.preco }} - Quantidade: {{ item.quantidade }} - Descrição: {{ item.descricao }}
                        <v-btn color="success" variant="plain" icon="mdi-pencil" @click="editar(item)"></v-btn>
                        <v-btn @click="remover(item)" color="error" variant="plain" icon="mdi-close"></v-btn>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        <v-card class="mt-4">
            <v-card-title>Relatório de Vendas</v-card-title>
            <v-card-text>
                <svg width="300" height="300" viewBox="0 0 32 32">
                    <circle
                        v-for="(slice, index) in pieSlices"
                        :key="index"
                        r="16"
                        cx="16"
                        cy="16"
                        :stroke="slice.color"
                        stroke-width="32"
                        fill="none"
                        :stroke-dasharray="slice.dashArray"
                        :stroke-dashoffset="slice.dashOffset"
                    />
                </svg>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const produto = ref({
    nome: '',
    preco: '',
    quantidade: '',
    descricao: '',
});

const produtos = ref([]);

const salvar = () => {
    if (produto.value.nome && produto.value.preco && produto.value.descricao && produto.value.quantidade) {
        produtos.value.push({ ...produto.value });
        produto.value = {
            nome: '',
            preco: '',
            quantidade: '',
            descricao: '',
        };
    } else {
        alert('Por favor, preencha todos os campos.');
    }
};

const remover = (item) => {
    produtos.value = produtos.value.filter((p) => p !== item);
};

const editar = (item) => {
    produto.value = { ...item };
    produtos.value = produtos.value.filter((p) => p !== item);
};

// Cores para o gráfico
const colors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
];

// Dados para o gráfico de pizza
const pieSlices = computed(() => {
    const total = produtos.value.reduce((sum, p) => sum + Number(p.quantidade), 0);
    let cumulative = 0;

    return produtos.value.map((p, index) => {
        const value = (Number(p.quantidade) / total) * 100;
        const dashArray = `${value} ${100 - value}`;
        const dashOffset = 100 - cumulative;
        cumulative += value;

        return {
            color: colors[index % colors.length],
            dashArray,
            dashOffset,
        };
    });
});
</script>

<style>
.mt-4 {
    margin-top: 16px;
}
svg {
    transform: rotate(-90deg);
}
</style>
