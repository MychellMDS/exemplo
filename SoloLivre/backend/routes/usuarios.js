const express = require('express');

const router = express.Router();

// Exemplo de controlador de usuários
const usuariosController = {
    listar: (req, res) => {
        res.send('Listando todos os usuários');
    },
    criar: (req, res) => {
        res.send('Criando um novo usuário');
    },
    atualizar: (req, res) => {
        res.send(`Atualizando o usuário com ID ${req.params.id}`);
    },
    deletar: (req, res) => {
        res.send(`Deletando o usuário com ID ${req.params.id}`);
    }
};

// Rotas de usuários
router.get('/', usuariosController.listar);
router.post('/', usuariosController.criar);
router.put('/:id', usuariosController.atualizar);
router.delete('/:id', usuariosController.deletar);

module.exports = router;