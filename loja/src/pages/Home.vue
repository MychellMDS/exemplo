<template>
    <div class="home">
        <header class="header">
            <h1>SOLOLIVRE</h1>
            <nav class="menu">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#produtos">Produtos</a></li>
                    <li><a href="#sobre">Sobre</a></li>
                    <li><a href="#contato">Contato</a></li>
                </ul>
            </nav>
        </header>

        <main class="main-content">
            <section id="home" class="banner">
                <h2>Bem-vindo à SOLOLIVRE</h2>
                <p>Explore os melhores instrumentos musicais para sua jornada musical.</p>
            </section>

            <section id="produtos" class="produtos">
                <h2>Nossos Produtos</h2>
                <p v-if="loading">Carregando produtos...</p>
                <p v-if="error">{{ error }}</p>
                <ul v-if="produtos.length">
                    <li v-for="produto in produtos" :key="produto.id">
                        <h3>{{ produto.nome }}</h3>
                        <p>{{ produto.descricao }}</p>
                        <p>Preço: R$ {{ produto.preco }}</p>
                    </li>
                </ul>
            </section>

            <section id="sobre" class="sobre">
                <h2>Sobre Nós</h2>
                <p>Na SOLOLIVRE, somos apaixonados por música e qualidade.</p>
            </section>

            <section id="contato" class="contato">
                <h2>Contato</h2>
                <p>Entre em contato conosco para mais informações.</p>
            </section>
        </main>

        <footer class="footer">
            <p>&copy; 2023 SOLOLIVRE. Todos os direitos reservados.</p>
        </footer>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Home",
    data() {
        return {
            produtos: [],
            loading: true,
            error: null,
        };
    },
    mounted() {
        this.fetchProdutos();
    },
    methods: {
        async fetchProdutos() {
            try {
                const response = await axios.get("http://localhost:3000/api/produtos");
                this.produtos = response.data;
            } catch (err) {
                this.error = "Erro ao carregar os produtos. Tente novamente mais tarde.";
                console.error(err);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.home {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

.header {
    background: #222;
    color: #fff;
    padding: 1rem;
    text-align: center;
}

.header h1 {
    margin: 0;
}

.menu ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.menu a {
    color: #fff;
    text-decoration: none;
}

.menu a:hover {
    text-decoration: underline;
}

.main-content {
    padding: 2rem;
}

.banner {
    text-align: center;
    margin-bottom: 2rem;
}

.produtos ul {
    list-style: none;
    padding: 0;
}

.produtos li {
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 5px;
}

.produtos h3 {
    margin: 0 0 0.5rem;
}

.produtos p {
    margin: 0.5rem 0;
}

.footer {
    background: #222;
    color: #fff;
    text-align: center;
    padding: 1rem;
}
</style>