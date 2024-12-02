"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { title: "Inicio", path: "/" },
  { title: "Nosotros", path: "/#about" },
  { title: "Proyecto", path: "/#projects" },
  { title: "Contacto", path: "/#contact" },
];

const Navbar = () => {
  const { data: session } = useSession(); // Obteniendo el estado de sesión del usuario
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleLogout = () => {
    signOut(); // Función de cierre de sesión proporcionada por next-auth
  };

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        
        {/* Logo y Nombre de la Empresa */}
        <Link href="/" className="flex items-center text-white font-semibold">
          <Image
            src="/images/logo_empresa.png"
            alt="Logo Empresa"
            width={48}
            height={48}
            className="mr-2"
          />
          <span className="text-2xl md:text-4xl">123digit@l</span>
        </Link>
        
        {/* Botón de menú móvil */}
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>
        
        {/* Menú para escritorio */}
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            {/* Enlaces según el estado de sesión */}
            {!session ? (
              <>
                <li>
                  <NavLink href="/register" title="Registro" />
                </li>
                <li>
                  <NavLink href="/login" title="Login" />
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink href="/gestion-solicitudes" title="Gestión de Solicitudes" />
                </li>
                <li>
                  <NavLink href="/gestion-actividades" title="Gestión de Actividades" />
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-purple-500"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      
      {/* Menú de superposición para móvil */}
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
