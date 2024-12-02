"use client";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import { registrarUsuario } from "../../../services/usuarios";




const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    confirmacion: "",
    telefono: "",
    direccion: "",
    fecha_nacimiento: "",
    departamento: "",
    dni: "",
    cargo: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!formData.correo || !emailRegex.test(formData.correo)) {
      newErrors.correo = "Correo electrónico inválido";
    }
    if (!passwordRegex.test(formData.contrasena)) {
      newErrors.contrasena =
        "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.";
    }
    if (formData.contrasena !== formData.confirmacion) {
      newErrors.confirmacion = "Las contraseñas no coinciden";
    }
    if (!formData.cargo) {
      newErrors.cargo = "Debe seleccionar un cargo";
    }
    if (!/^\d{9}$/.test(formData.telefono)) {
      newErrors.telefono = "El número de teléfono debe tener 9 dígitos";
    }
    if (!/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = "El DNI debe tener 8 dígitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        await registrarUsuario(formData);
        alert("Registro exitoso");
        window.location.href = "/login"; // Redirigir al login después del registro exitoso
      } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        alert("Error al registrar usuario");
      } finally {
        setIsLoading(false);
      }
    }
  };
    

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("El archivo es demasiado grande (máximo 5MB)");
        return;
      }
      const validFormats = ["image/jpeg", "image/png", "image/jpg"];
      if (!validFormats.includes(file.type)) {
        alert("Formato de archivo no válido (solo JPG, PNG)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="flex flex-col items-center min-h-screen py-16 bg-[#121212] text-white">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Registro de Usuario
      </motion.h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-lg shadow-lg">
        {/* Nombre de Usuario */}
        <motion.div className="mb-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-medium mb-2">Nombre:</label>
          <input
            type="text"
            name="nombre_usuario"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
            placeholder="Nombre completo"
          />
        </motion.div>

        {/* Apellidos */}
        <motion.div className="mb-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-medium mb-2">Apellidos:</label>
          <input
            type="text"
            name="apellidos"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
            placeholder="Apellidos completos"
          />
        </motion.div>

        {/* Correo */}
        <motion.div className="mb-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-medium mb-2">Correo:</label>
          <input
            type="email"
            name="correo"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
            placeholder="example@correo.com"
          />
          {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
        </motion.div>

        {/* Contraseña */}
        <motion.div className="mb-4 relative" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-medium mb-2">Contraseña:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="contrasena"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
            placeholder="********"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400"
          >
            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
          {errors.contrasena && <p className="text-red-500 text-sm">{errors.contrasena}</p>}
        </motion.div>

        {/* Confirmación de Contraseña */}
        <motion.div className="mb-4 relative" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-medium mb-2">Confirmar Contraseña:</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmacion"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
            placeholder="********"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-400"
          >
            {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
          {errors.confirmacion && <p className="text-red-500 text-sm">{errors.confirmacion}</p>}
        </motion.div>

        {/* Número de Teléfono */}
        <motion.div className="mb-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-medium mb-2">Número de Teléfono:</label>
          <input
            type="text"
            name="telefono"
            maxLength="9"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
            placeholder="Número de teléfono"
          />
          {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
        </motion.div>

        {/* Dirección */}
        <motion.div className="mb-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-medium mb-2">Dirección:</label>
          <input
            type="text"
            name="direccion"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
            placeholder="Dirección completa"
          />
        </motion.div>

        {/* Fecha de Nacimiento */}
        <motion.div className="mb-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-medium mb-2">Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fecha_nacimiento"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
          />
        </motion.div>

        {/* DNI */}
        <motion.div className="mb-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-medium mb-2">DNI:</label>
          <input
            type="text"
            name="dni"
            maxLength="8"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
            placeholder="DNI o Identificación"
          />
          {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}
        </motion.div>

        {/* Departamento */}
        <motion.div className="mb-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-medium mb-2">Departamento:</label>
          <input
            type="text"
            name="departamento"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
            placeholder="Departamento o Área"
          />
        </motion.div>

        {/* Foto de Perfil */}
        <motion.div className="mb-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-medium mb-2">Foto de Perfil:</label>
          <input
            type="file"
            onChange={handleImagePreview}
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
          />
          {previewImage && (
            <motion.img
              src={previewImage}
              alt="Previsualización de foto de perfil"
              className="w-24 h-24 object-cover rounded-full mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </motion.div>

        {/* Cargo */}
        <motion.div className="mb-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-medium mb-2">Cargo:</label>
          <select
            name="cargo"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-[#1a1a1a] text-gray-200"
          >
            <option value="">Seleccione un cargo</option>
            <option value="Jefe de Área">Jefe de Área</option>
            <option value="Analista Senior">Analista Senior</option>
            <option value="Programador Junior">Programador Junior</option>
            <option value="Coordinador">Coordinador</option>
            <option value="Cargo por Defecto">Cargo por Defecto</option>
          </select>
          {errors.cargo && <p className="text-red-500 text-sm">{errors.cargo}</p>}
        </motion.div>

          {/* Botón de registro */}
        <motion.button
          type="submit"
          className={`w-full py-2 ${
            isLoading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
          } text-white rounded-md mt-6`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </motion.button>
      </form>

      <motion.p
        className="mt-4 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="text-purple-500 hover:underline">
          Inicia sesión
        </Link>
      </motion.p>
    </section>
  );
};

export default RegisterPage;
       

