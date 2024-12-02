"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import axiosClient from "../api/axiosClient"; // Ajusta la ruta según tu estructura de archivos

const LoginPage = () => {
  const [formData, setFormData] = useState({
    correo: "", // Cambiado de "email" a "correo" para alinearlo con tu backend
    contrasena: "", // Cambiado de "password" a "contrasena"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.correo || !/^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/.test(formData.correo)) {
      newErrors.correo = "Correo electrónico inválido";
    }
    if (formData.contrasena.length < 8) {
      newErrors.contrasena = "La contraseña debe tener al menos 8 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(""); // Reinicia el error en cada intento de inicio de sesión
  
    if (validate()) {
      try {
        const response = await axiosClient.post("/usuarios/login", formData);
  
        if (response.status === 200) {
          const { token, usuario } = response.data; // Asegúrate de que el backend envíe estos campos
          console.log("Inicio de sesión exitoso:", usuario);
  
          // Guardar token en localStorage o cookies
          localStorage.setItem("token", token);
  
          // Redirigir según el rol del usuario
          switch (usuario.colaborador?.cargo) {
            case "Jefe de Área":
              window.location.href = "/dashboard/area";
              break;
            case "Coordinador":
              window.location.href = "/dashboard/coordinador";
              break;
            case "Analista Senior":
              window.location.href = "/dashboard/analista";
              break;
            case "Programador Junior":
              window.location.href = "/dashboard/programador";
              break;
            default:
              window.location.href = "/";
          }
        } else {
          setLoginError(response.data.error || "Credenciales inválidas");
        }
      } catch (error) {
        console.error("Error de conexión:", error.message);
        setLoginError("No se pudo conectar al servidor");
      }
    }
  };
  
  return (
    <section className="flex flex-col items-center min-h-screen py-16 bg-[#121212] text-white">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Iniciar Sesión
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-lg shadow-lg"
      >
        <div className="mb-6">
          <label htmlFor="correo" className="block text-sm font-medium mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
          />
          {errors.correo && (
            <p className="text-red-500 text-sm">{errors.correo}</p>
          )}
        </div>

        <div className="mb-6 relative">
          <label htmlFor="contrasena" className="block text-sm font-medium mb-2">
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="contrasena"
            name="contrasena"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
          {errors.contrasena && (
            <p className="text-red-500 text-sm">{errors.contrasena}</p>
          )}
        </div>

        {loginError && (
          <p className="text-red-500 text-sm text-center">{loginError}</p>
        )}

        <motion.button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Iniciar Sesión
        </motion.button>
      </form>

      <p className="mt-4 text-sm text-gray-400">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className="text-purple-500 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </section>
  );
};

export default LoginPage;
