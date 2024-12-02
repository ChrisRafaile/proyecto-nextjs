import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/Proyecto_DWI/api',
  timeout: 30000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error en la solicitud:', error.message);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`Error en la respuesta: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      console.error('Error en la solicitud: No se recibió respuesta del servidor');
    } else {
      console.error('Error desconocido:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
