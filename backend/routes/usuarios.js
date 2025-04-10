import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Rota de usuários');
});
router.post('/', (req, res) => {
    res.send('Criar usuários');
});
router.put('/', (req, res) => {
    res.send('Atualizar usuários');
});
router.delete('/', (req, res) => {
    res.send('Deletar usuários');
});
export default router;
