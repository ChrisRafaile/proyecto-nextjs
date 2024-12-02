import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres', // Tu usuario de PostgreSQL
  host: 'localhost', // Tu host
  database: 'dbproyecto_dwi', // Tu base de datos
  password: 'julio*2008', // Tu contraseña
  port: 5432, // Puerto por defecto de PostgreSQL
});

export default pool;
