// src/app/api/users/[id].js
import pool from '../../db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario eliminado exitosamente', user: result.rows[0] });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  } else if (req.method === 'PUT') {
    const { nombre_usuario, correo, contrasena } = req.body;
    try {
      const result = await pool.query(
        'UPDATE usuarios SET nombre_usuario = $1, correo = $2, contrasena = $3 WHERE id_usuario = $4 RETURNING *',
        [nombre_usuario, correo, contrasena, id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
