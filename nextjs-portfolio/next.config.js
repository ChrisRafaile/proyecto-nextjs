/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: 'postgres://postgres:julio*2008@localhost:5432/dbproyecto_dwi', // Ajusta con tus credenciales
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:8080/Proyecto_DWI/', // URL de tu backend
  },
};

module.exports = nextConfig;
