import express from 'express';
const router = express.Router();
import { supabase } from '../db.js';
/*
    GET  / - Listar todos os produtos
    POST / - Criar um novo produto
    PUT /:id - Atualizar um produto específico
    DELETE /:id - Deletar um produto específico
*/
router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) {
        res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
});

router.post('/', async (req, res) => {
    const { nome, valor, quantidade, descricao } = req.body;

    const { data, error } = await supabase
        .from('produtos')
        .insert([{ nome, valor, quantidade, descricao }]);

    if (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: 'Produto salvo com sucesso!', produto: data });
});

router.put('/:id', async (req, res) => {
    const id = req.params.id; // o id de quem vou atualizar no banco de dados
    const dados = req.body;
    const { data, error } = await supabase
        .from('produtos')
        .update(dados)
        .eq('id', id);

    if (error) return res.status(500).json({ error: error.message }); // erro ao atualizar o produto

    res.status(200).json({ message: 'Produto atualizado com sucesso!' }); // dados a serem atualizados do id informado
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const { data, error } = await supabase
        .from('produtos')
        .delete()
        .eq('id', id);
    if (error) return res.status(500);

    res.status(200).json({ message: 'Produto deletado com sucesso!' });
});

export default router;
