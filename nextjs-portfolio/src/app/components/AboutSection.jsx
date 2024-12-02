"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Habilidades",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Desarrollo Web Full Stack (React, Node.js, Express)</li>
        <li>Administración de Bases de Datos (PostgreSQL, MySQL)</li>
        <li>Integración de APIs y Servicios en la Nube (AWS, Google Cloud)</li>
        <li>Automatización y Optimización de Procesos</li>
        <li>Diseño UI/UX Orientado al Usuario</li>
      </ul>
    ),
  },
  {
    title: "Equipo y Experiencia",
    id: "experience",
    content: (
      <ul className="list-disc pl-2">
        <li>Equipo multidisciplinario con experiencia en proyectos digitales</li>
        <li>Especialización en desarrollo de software a medida</li>
        <li>Experiencia en proyectos de transformación digital</li>
      </ul>
    ),
  },
  {
    title: "Certificaciones y Acreditaciones",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>AWS Certified Solutions Architect</li>
        <li>Google Professional Cloud Developer</li>
        <li>Certificación en Metodologías Ágiles (Scrum, Kanban)</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about-image.png"
          alt="123digit@l - equipo de soporte digital"
          width={500}
          height={500}
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">Sobre 123digit@l</h2>
          <p className="text-base lg:text-lg">
            En 123digit@l, somos un equipo especializado en soluciones digitales,
            comprometidos en transformar los procesos empresariales a través de
            tecnología innovadora y adaptada a las necesidades de nuestros clientes.
            Nos apasiona la tecnología y estamos aquí para ser tu socio en innovación.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Habilidades{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("experience")}
              active={tab === "experience"}
            >
              {" "}
              Equipo y Experiencia{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certificaciones{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
