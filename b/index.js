const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const products = [
  { id: 1, name: 'Camisa', price: 50 },
  { id: 2, name: 'Calça Jeans', price: 120 },
  { id: 3, name: 'Tênis', price: 200 }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
