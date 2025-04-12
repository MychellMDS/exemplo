import express from 'express';

const router = express.Router();

let clientes = [];

// Obter todos os clientes
router.get('/', (req, res) => {
  res.json(clientes);
});

// Adicionar um novo cliente
router.post('/', (req, res) => {
  const cliente = req.body;
  clientes.push(cliente);
  res.status(201).json(cliente);
});

export default router;
