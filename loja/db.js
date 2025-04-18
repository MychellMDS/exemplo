import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  console.log("🟢 Conectado ao banco de dados MySQL");
  return connection;
}

const connection = await createConnection();
export default connection;
