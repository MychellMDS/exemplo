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
    const { nome, preco, descricao } = req.body; // Replace with your table columns

    // Validate input
    if (!nome || !preco || !descricao) {
        return res.status(400).send('All fields (nome, preco, descricao) are required');
    }

    const query = 'UPDATE produtos SET nome = ?, preco = ?, descricao = ? WHERE id = ?';
    db.query(query, [nome, preco, descricao, id], (err, results) => {
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

// Redireciona todas as outras rotas para o arquivo index.html do Vue.js
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
