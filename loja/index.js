import { serve } from 'bun';
import connection from './db.js';

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // GET /produtos
    if (req.method === 'GET' && url.pathname === '/produtos') {
      const [rows] = await connection.execute('SELECT * FROM sololivre');
      return new Response(JSON.stringify(rows), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // POST /produtos
    if (req.method === 'POST' && url.pathname === '/produtos') {
      const body = await req.json();
      const { nome, preco, quantidade, descricao } = body;

      const [result] = await connection.execute(
        'INSERT INTO sololivre (nome, preco, quantidade, descricao) VALUES (?, ?, ?, ?)',
        [nome, preco, quantidade, descricao]
      );

      return new Response(JSON.stringify({ id: result.insertId }), {
        headers: { 'Content-Type': 'application/json' },
        status: 201,
      });
    }

    return new Response('Rota não encontrada', { status: 404 });
  },
});

// Inserir um produto
export async function inserirProduto(nome, preco, quantidade, descricao) {
  const [result] = await connection.execute(
    'INSERT INTO sololivre (nome, preco, quantidade, descricao) VALUES (?, ?, ?, ?)',
    [nome, preco, quantidade, descricao]
  );
  console.log('✅ Produto inserido com ID:', result.insertId);
  return result.insertId;
}

// Buscar todos os produtos
export async function listarProdutos() {
  const [rows] = await connection.execute('SELECT * FROM sololivre');
  console.log('📦 Produtos encontrados:', rows);
  return rows;
}

// Teste de inserção e leitura
(async () => {
  await inserirProduto('Camiseta Azul', 59.90, 10, 'Tecido 100% algodão');
  const produtos = await listarProdutos();
  console.log(produtos);
})();
