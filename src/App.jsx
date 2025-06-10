
import ChatCentral from "./components/chat/ChatCentral";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import WhatIsSection from '@/components/landing/WhatIsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import PlansSection from '@/components/landing/PlansSection';
import ExploreBotsSection from '@/components/landing/ExploreBotsSection';
import FaqSection from '@/components/landing/FaqSection';
import RegisterSection from '@/components/landing/RegisterSection';
import FooterSection from '@/components/landing/FooterSection';
import { Toaster } from '@/components/ui/toaster';
import { motion, AnimatePresence } from 'framer-motion';
import AsistenteGuia from "./components/guia/AsistenteGuia";
import RegistroPersona from "./components/registro/RegistroPersona";

const SectionWrapper = ({ children, id }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function LandingPage() {
  return (
    <>
      <HeroSection />
      <main className="flex-grow">
        <SectionWrapper id="que-es"><WhatIsSection /></SectionWrapper>
        <SectionWrapper id="como-funciona"><HowItWorksSection /></SectionWrapper>
        <SectionWrapper id="planes"><PlansSection /></SectionWrapper>
        <SectionWrapper id="buscar"><ExploreBotsSection /></SectionWrapper>
        <SectionWrapper id="faq"><FaqSection /></SectionWrapper>
        <SectionWrapper id="registro-wrapper"><RegisterSection /></SectionWrapper>
      </main>
    </>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Más rutas en el futuro */}
          {/* <Route path="/registro-persona" element={<RegistroPersona />} /> */}
          {/* <Route path="/registro-empresa" element={<RegistroEmpresa />} /> */}
          <Route path="/registro-persona" element={<RegistroPersona />} />
          <Route path="/guia" element={<AsistenteGuia />} />
          <Route path="/perfil" element={<ChatCentral />} />
        </Routes>
      </AnimatePresence>
      <FooterSection />
      <Toaster />
    </div>
  );
}

export default App;
