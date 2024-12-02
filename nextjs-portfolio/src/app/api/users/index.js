// src/app/api/users/index.js
import pool from '../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM usuarios');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  } else if (req.method === 'POST') {
    const { nombre_usuario, correo, contrasena } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO usuarios (nombre_usuario, correo, contrasena) VALUES ($1, $2, $3) RETURNING *',
        [nombre_usuario, correo, contrasena]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
