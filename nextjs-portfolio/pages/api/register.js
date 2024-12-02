import bcrypt from 'bcrypt'; // Importa bcrypt para encriptar contraseñas
import pool from './db'; // Conexión a PostgreSQL

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      nombre_usuario,
      correo,
      contrasena,
      direccion,
      telefono,
      apellidos,
      fecha_nacimiento,
      foto_perfil,
      fecha_ingreso,
      departamento,
      dni,
    } = req.body;

    try {
      // Verificar si el usuario ya existe por correo o dni
      const userCheck = await pool.query(
        'SELECT * FROM usuarios WHERE correo = $1 OR dni = $2',
        [correo, dni]
      );

      if (userCheck.rows.length > 0) {
        return res.status(400).json({ error: 'El usuario ya está registrado' });
      }

      // Encriptar la contraseña
      const salt = await bcrypt.genSalt(10); // Generar salt
      const hashedPassword = await bcrypt.hash(contrasena, salt); // Hash de la contraseña

      // Insertar el nuevo usuario en la base de datos
      const result = await pool.query(
        `INSERT INTO usuarios (
          nombre_usuario, correo, contrasena, direccion, telefono, apellidos,
          fecha_nacimiento, foto_perfil, fecha_ingreso, departamento, dni, salt
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [
          nombre_usuario,
          correo,
          hashedPassword, // Guardar la contraseña encriptada
          direccion,
          telefono,
          apellidos,
          fecha_nacimiento,
          foto_perfil,
          fecha_ingreso,
          departamento,
          dni,
          salt, // Guardar el salt (opcional, pero útil para debugging)
        ]
      );

      // Responder con los datos del usuario registrado
      res.status(200).json({ user: result.rows[0] });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
