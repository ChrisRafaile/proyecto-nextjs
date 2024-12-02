import { createContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient"; // Ajusta la ruta según tu estructura

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Obtener datos del usuario con el token
      axiosClient
        .get("/usuarios/me") // Asegúrate de tener este endpoint en tu backend para devolver los datos del usuario
        .then((response) => {
          setUser(response.data.usuario);
        })
        .catch((err) => {
          console.error("Error al cargar usuario:", err);
          localStorage.removeItem("token"); // Si el token no es válido, lo eliminamos
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login"; // Redirige al login
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
