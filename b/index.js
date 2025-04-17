import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

console.log("🟢 Conectado ao banco com sucesso!");

export default connection;

// Inserir um produto
export async function inserirProduto(nome, preco, quantidade, descricao) {
  const [result] = await connection.execute(
    'INSERT INTO produtos (nome, preco, quantidade, descricao) VALUES (?, ?, ?, ?)',
    [nome, preco, quantidade, descricao]
  );
  console.log('✅ Produto inserido com ID:', result.insertId);
  return result.insertId;
}

// Buscar todos os produtos
export async function listarProdutos() {
  const [rows] = await connection.execute('SELECT * FROM produtos');
  console.log('📦 Produtos encontrados:', rows);
  return rows;
}

// Teste de inserção e leitura
(async () => {
  await inserirProduto('Camiseta Azul', 59.90, 10, 'Tecido 100% algodão');
  const produtos = await listarProdutos();
  console.log(produtos);
})();
