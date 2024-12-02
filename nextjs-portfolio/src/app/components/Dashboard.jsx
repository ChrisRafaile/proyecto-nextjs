import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext"; // Ruta al contexto

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      // Si no hay usuario y no estamos cargando, redirigimos al login
      window.location.href = "/login";
    }
  }, [user, loading]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Bienvenido al Dashboard, {user?.nombreUsuario}</h1>
    </div>
  );
};

export default Dashboard;
