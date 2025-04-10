import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Rota de clientes');
});
router.post('/', (req, res) => {
    res.send('de clientes');
});
router.put('/', (req, res) => {
    res.send('atualizar clientes');
});
router.delete('/', (req, res) => {
    res.send('deletar clientes');
});
export default router;
