import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Llamar al backend de NetBeans
      const response = await axios.get(
        "http://localhost:8080/Proyecto_DWI/api/usuarios"
      );

      // Enviar la respuesta del backend al cliente
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error en listarUsuarios API:", error);
      res
        .status(error.response?.status || 500)
        .json({ message: "Error al obtener los usuarios." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
