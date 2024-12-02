// src/app/login/page.js
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar la visibilidad de la contraseña
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    
    if (!result.error) {
      router.push('/'); // Redirige al inicio u otra página después de iniciar sesión
    } else {
      alert('Error de autenticación');
    }
  };

  return (
    <section className="flex flex-col items-center min-h-screen py-16 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-gray-200"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-2">Contraseña:</label>
          <input
            type={showPassword ? 'text' : 'password'} // Cambia el tipo de input según el estado
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-gray-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Cambia el estado para alternar visibilidad
            className="absolute right-3 top-10 text-gray-400 hover:text-white"
          >
            {showPassword ? '🙈' : '👁️'} {/* Uso emojis o íconos */}
          </button>
        </div>
        <button type="submit" className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md mt-6">
          Iniciar Sesión
        </button>
      </form>
    </section>
  );
}
