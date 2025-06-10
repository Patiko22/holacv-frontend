// src/components/landing/HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-background text-center py-20 px-6 md:px-10">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
        Tu perfil profesional ahora puede conversar por vos
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Dale vida a tu experiencia laboral con un chat personalizado. Ideal para entrevistas previas, descubrimiento de talentos y cultura organizacional.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={() => navigate('/registro-persona')}
          className="bg-primary text-white font-semibold px-6 py-3 rounded-lg btn-primary-hover"
        >
          Quiero crear el chat con mi CV
        </button>
        <button
          onClick={() => navigate('/registro-empresa')}
          className="border border-primary text-primary font-semibold px-6 py-3 rounded-lg btn-outline-hover"
        >
          Quiero que conversen con mi empresa
        </button>
      </div>
    </section>
  );
}
