// src/app/api/delete.js
import pool from './db';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id_usuario } = req.body;

    // Verificar que se proporcionó un id de usuario
    if (!id_usuario) {
      return res.status(400).json({ error: 'Se requiere un id de usuario' });
    }

    try {
      // Intentar eliminar el usuario
      const result = await pool.query(
        'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *',
        [id_usuario]
      );

      // Verificar si el usuario fue encontrado y eliminado
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario eliminado exitosamente', user: result.rows[0] });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
