import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

//console.log("PG_PASSWORD lido:", process.env.PG_PASSWORD);

const { Pool } = pg;

const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
});


pool.connect()
  .then(() => console.log('\nConectado ao Banco de Dados!\n'))
  .catch(err => console.error('\nErro na conexão com o banco:\n', err));

export default pool;