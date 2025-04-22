const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sololivre',
    port: 3306,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit the process if the database connection fails
    }
    console.log('Connected to the database.');
});

// API endpoint to fetch products
app.get('/api/produtos', (_, res) => {
    const query = 'SELECT * FROM produtos'; // Replace 'produtos' with your table name
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching products');
        } else {
            res.json(results);
        }
    });
});

// API endpoint to update a product
app.put('/api/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, valor, descricao } = req.body; // Replace with your table columns

    // Validate input
    if (!nome || !valor || !descricao) {
        return res.status(400).send('All fields (nome, valor, descricao) are required');
    }

    const query = 'UPDATE produtos SET nome = ?, valor = ?, descricao = ? WHERE id = ?';
    db.query(query, [nome, valor, descricao, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating product');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Product not found');
        } else {
            res.send('Product updated successfully');
        }
    });
});

// API endpoint to register a client
app.post('/api/clientes', (req, res) => {
    const { nome, email, telefone, endereco } = req.body; // Dados do cliente a serem cadastrados

    // Validação simples dos campos
    if (!nome || !email || !telefone || !endereco) {
        return res.status(400).send('Todos os campos (nome, email, telefone, endereco) são obrigatórios');
    }

    // Query para inserir cliente no banco de dados
    const query = 'INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, email, telefone, endereco], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao cadastrar cliente');
        }
        res.status(201).json({ message: 'Cliente cadastrado com sucesso', id: result.insertId });
    });
});

app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    const query = 'SELECT * FROM clientes WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
        }

        if (results.length === 0) {
            return res.status(401).json({ erro: 'Email não encontrado' });
        }

        const user = results[0];

        // Comparando a senha fornecida com a senha armazenada
        if (senha === user.senha) {
            // Senha correta, login bem-sucedido
            res.json({ email: user.email, tipo: 'cliente' }); // Ou 'admin' dependendo do tipo
        } else {
            // Senha incorreta
            res.status(401).json({ erro: 'Credenciais inválidas' });
        }
    });
});

  
  
app.post('/api/google-login', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    // Aqui você pode validar o token do Google e autenticar o usuário
    // Exemplo básico:
    console.log('Google token recebido:', token);

    // Retorne uma resposta de sucesso
    res.status(200).json({ message: 'Login com Google bem-sucedido!' });
});

// API endpoint to register a support request
app.post('/api/suporte', (req, res) => {
    const { nome, email, mensagem } = req.body;

    // Verificação simples para garantir que todos os campos foram preenchidos
    if (!nome || !email || !mensagem) {
        return res.status(400).send('Todos os campos (nome, email, mensagem) são obrigatórios');
    }

    // Query para inserir a mensagem no banco de dados
    const query = 'INSERT INTO suporte (nome, email, mensagem) VALUES (?, ?, ?)';
    db.query(query, [nome, email, mensagem], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao enviar mensagem de suporte');
        }
        res.status(201).json({ message: 'Mensagem de suporte enviada com sucesso', id: result.insertId });
    });
});

// Redireciona todas as outras rotas para o arquivo index.html do Vue.js
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
