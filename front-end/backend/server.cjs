const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require('./sololivre-d4c3d-firebase-adminsdk-fbsvc-6b7e236338.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Adicionando cabeçalhos de segurança
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Configuração do CORS
app.use(cors());
app.use(express.json());

// Serve arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Conexão com o banco de dados
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
    process.exit(1);
  }
  console.log('Connected to the database.');
});

// Buscar produtos
app.get('/api/produtos', (_, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) return res.status(500).send('Error fetching products');
    console.log('Produtos retornados:', results); // Log para ver os resultados
    res.json(results);
  });
});

// Atualizar produto
app.put('/api/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, valor, descricao } = req.body;

  if (!nome || !valor || !descricao) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  const query = 'UPDATE produtos SET nome = ?, valor = ?, descricao = ? WHERE id = ?';
  db.query(query, [nome, valor, descricao, id], (err, results) => {
    if (err) return res.status(500).send('Erro ao atualizar produto');
    if (results.affectedRows === 0) return res.status(404).send('Produto não encontrado');
    res.send('Produto atualizado com sucesso');
  });
});

// Cadastrar cliente
app.post('/api/clientes', (req, res) => {
  const { nome, email, telefone, endereco } = req.body;

  if (!nome || !email || !telefone || !endereco) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  const query = 'INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, email, telefone, endereco], (err, result) => {
    if (err) return res.status(500).send('Erro ao cadastrar cliente');
    console.log('Cliente cadastrado com sucesso:', result);
    res.status(201).json({ message: 'Cliente cadastrado com sucesso', id: result.insertId });
  });
});

// Login com email e senha
// Login com email e senha
// Login com email e senha
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    console.log('Requisição de login recebida:', { email, senha });
  
    const checkUser = (table, tipo) => {
      return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ?? WHERE email = ?`;
        db.query(query, [table, email], (err, results) => {
          if (err) {
            console.error(`Erro ao consultar a tabela ${table}:`, err);
            return reject(err);
          }
  
          if (results.length === 0) return resolve(null);
  
          const user = results[0];
          if (user.senha && user.senha === senha) {
            // Incluindo o campo nome aqui
            return resolve({ nome: user.nome, email: user.email, tipo });
          }
  
          return resolve(null);
        });
      });
    };
  
    Promise.all([
      checkUser('clientes', 'cliente'),
      checkUser('admins', 'admin')
    ])
      .then(([cliente, admin]) => {
        const user = admin || cliente;
        if (!user) {
          console.log('Credenciais inválidas para o email:', email);
          return res.status(401).json({ erro: 'Credenciais inválidas' });
        }
  
        console.log('Usuário logado com sucesso:', user);
        res.json(user); // Responde agora com nome, email e tipo
      })
      .catch((err) => {
        console.error('Erro ao verificar credenciais:', err);
        res.status(500).json({ erro: 'Erro interno do servidor' });
      });
  });
  
// Login com Google
app.post('/api/google-login', async (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(400).json({ error: 'Token é obrigatório' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log('Decoded Token:', decodedToken); // Verifique se o token é válido
      const { email, name } = decodedToken;
  
      // Verifica se o usuário já está cadastrado como cliente
      db.query('SELECT * FROM clientes WHERE email = ?', [email], (err, results) => {
        if (err) {
          console.error('Erro ao buscar cliente:', err);
          return res.status(500).json({ error: 'Erro ao verificar usuário' });
        }
  
        if (results.length === 0) {
          // Se não estiver, insere como novo cliente
          db.query(
            'INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, "", "")',
            [name || 'Usuário Google', email],
            (err, result) => {
              if (err) {
                console.error('Erro ao inserir cliente:', err);
                return res.status(500).json({ error: 'Erro ao criar conta' });
              }
  
              // Responde com o nome, tipo e email após inserção do novo cliente
              res.status(200).json({ nome: name || 'Usuário Google', tipo: 'cliente', email });
            }
          );
        } else {
          // Já está cadastrado, retorna os dados do cliente
          res.status(200).json({ nome: results[0].nome, tipo: 'cliente', email });
        }
      });
    } catch (error) {
      console.error('Erro ao verificar token do Google:', error);
      res.status(401).json({ error: 'Token inválido ou expirado' });
    }
  });
  

// Enviar mensagem de suporte
app.post('/api/suporte', (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  db.query('INSERT INTO suporte (nome, email, mensagem) VALUES (?, ?, ?)', [nome, email, mensagem], (err, result) => {
    if (err) return res.status(500).send('Erro ao enviar mensagem');
    res.status(201).json({ message: 'Mensagem enviada com sucesso', id: result.insertId });
  });
});

// Redireciona qualquer outra rota para o frontend
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
