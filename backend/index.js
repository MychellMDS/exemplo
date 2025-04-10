import express from 'express';
import produtos from './routes/produtos.js';
import clientes from './routes/clientes.js'; // Avaliação 3
import usuarios from './routes/usuarios.js';
import cors from 'cors';

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors()); // habilita o cors para todas as rotas
app.use('/produtos', produtos); // endpoit
app.use('/clientes', clientes);
app.use('/usuarios', usuarios);

app.listen(port, ()=>{
    console.log('Servidor rodando na port ' + port)
}); // () => {} é uma arrow function