
    import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { ChevronDown, HelpCircle } from 'lucide-react';

    const faqData = [
      {
        question: '¿Quién puede crear un bot?',
        answer: 'Cualquier profesional que quiera mostrar su perfil de forma innovadora y recibir entrevistas de manera automatizada.',
      },
      {
        question: '¿Es seguro compartir mis datos?',
        answer: 'Sí. Los datos que cargás son utilizados únicamente para el funcionamiento del bot y no se comparten sin tu autorización. Priorizamos tu privacidad.',
      },
      {
        question: '¿Qué pasa si una empresa me quiere contactar?',
        answer: 'Si usás el plan Pro, verán un botón para contactarte por WhatsApp directamente. En el plan gratuito, recibirás una notificación con la opción de avanzar y compartir tu contacto.',
      },
      {
        question: '¿Puedo borrar mi bot?',
        answer: 'Sí, podés eliminar tu bot y toda tu información asociada en cualquier momento desde tu panel de control de forma sencilla.',
      },
      {
        question: '¿Cómo se entrena mi bot?',
        answer: 'Tu bot se entrena con la información que proporcionas en tu perfil. Cuanto más completo sea tu perfil, mejor responderá tu bot. También puedes personalizar su tono y estilo.',
      }
    ];

    const FaqItem = ({ item, isOpen, onClick }) => {
      return (
        <motion.div 
          className="border-b border-gray-200 last:border-b-0"
          initial={false}
        >
          <button
            onClick={onClick}
            className="flex justify-between items-center w-full py-5 px-6 text-left text-gray-800 hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md transition-colors duration-150"
          >
            <span className="font-medium text-lg">{item.question}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown size={24} className={`text-primary transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}/>
            </motion.div>
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, paddingTop:0, paddingBottom:0 }}
                animate={{ height: 'auto', opacity: 1, paddingTop: '1rem', paddingBottom: '1.5rem' }}
                exit={{ height: 0, opacity: 0, paddingTop:0, paddingBottom:0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 text-muted-foreground">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    };
    
    const FaqSection = () => {
      const [openIndex, setOpenIndex] = useState(null);

      const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };

      return (
        <section id="faq" className="bg-secondary">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }} 
              className="flex flex-col items-center text-center mb-12 md:mb-16"
            >
              <HelpCircle className="w-12 h-12 text-primary mb-4" />
              <h2 className="section-title !mb-4">
                Preguntas Frecuentes
              </h2>
              <p className="section-subtitle !mb-0">
                Resolvemos tus dudas para que empieces con confianza.
              </p>
            </motion.div>
            <motion.div 
              className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay:0.1, ease: "easeOut" }}
            >
              {faqData.map((item, index) => (
                <FaqItem 
                  key={index} 
                  item={item}
                  isOpen={openIndex === index}
                  onClick={() => handleClick(index)}
                />
              ))}
            </motion.div>
          </div>
        </section>
      );
    };

    export default FaqSection;
  