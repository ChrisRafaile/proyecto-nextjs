import axiosClient from "../src/app/api/axiosClient"; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Registrar un usuario
export const registrarUsuario = async (datos) => {
  try {
    const response = await axiosClient.post(`${API_BASE_URL}/usuarios/registrar`, datos);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};

// Obtener usuarios
export const obtenerUsuarios = async () => {
  try {
    const response = await axiosClient.get(`${API_BASE_URL}/usuarios`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};

// Iniciar sesión
export const loginUsuario = async (credenciales) => {
  try {
    const response = await axiosClient.post(`${API_BASE_URL}/usuarios/login`, credenciales);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};

// Obtener usuario autenticado
export const obtenerUsuarioAutenticado = async (token) => {
  try {
    const response = await axiosClient.get(`${API_BASE_URL}/usuarios/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario autenticado:", error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};

// Eliminar usuario
export const eliminarUsuario = async (id, token) => {
  try {
    const response = await axiosClient.delete(`${API_BASE_URL}/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};
