import React from "react";
import Link from "next/link";
import Image from "next/image";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import WhatsappIcon from "../../../public/whatsapp-icon.svg";

const Footer = () => {
  return (
    <footer className="footer border-t border-[#33353F] text-white py-8">
      <div className="container mx-auto px-12 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo y Nombre */}
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-2xl font-bold">123digit@l</span>
        </div>
        
        {/* Texto de Derechos y Descripción */}
        <div className="text-center md:text-left">
          <p className="text-slate-500 mb-1">&copy; 2024 123digit@l. Todos los derechos reservados.</p>
          <p className="text-slate-400">Tu socio en soluciones de software innovadoras.</p>
        </div>
        
        {/* Enlaces de redes sociales */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="https://github.com/123digital" target="_blank" rel="noopener noreferrer">
            <Image src={GithubIcon} alt="Github" width={24} height={24} />
          </Link>
          <Link href="https://linkedin.com/company/123digital" target="_blank" rel="noopener noreferrer">
            <Image src={LinkedinIcon} alt="LinkedIn" width={24} height={24} />
          </Link>
          <Link href="https://wa.me/946552311" target="_blank" rel="noopener noreferrer">
            <Image src={WhatsappIcon} alt="WhatsApp" width={24} height={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
