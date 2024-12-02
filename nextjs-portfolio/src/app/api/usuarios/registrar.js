import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { nombre, correo, contrasena } = req.body; // Datos enviados desde el cliente

      // Llamar al backend de NetBeans
      const response = await axios.post(
        "http://localhost:8080/Proyecto_DWI/api/usuarios/registrar",
        {
          nombre,
          correo,
          contrasena,
        }
      );

      // Enviar la respuesta del backend al cliente
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error en registrarUsuario API:", error);
      res
        .status(error.response?.status || 500)
        .json({ message: "Error al registrar el usuario." });
    }
  } else {
    // Manejar otros métodos HTTP
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
