
    import React from 'react';
    import { motion } from 'framer-motion';
    import { UserPlus, MessageCircle, Link, Users, PhoneCall } from 'lucide-react';

    const steps = [
      { number: 1, icon: <UserPlus className="w-7 h-7 text-primary" />, title: 'Completá tu Perfil', text: 'Añadí tu experiencia, habilidades y logros.' },
      { number: 2, icon: <MessageCircle className="w-7 h-7 text-primary" />, title: 'Elegí el Tono', text: 'Personalizá cómo queres que tu bot se comunique.' },
      { number: 3, icon: <Link className="w-7 h-7 text-primary" />, title: 'Obtené tu Link', text: 'Compartí tu bot único con quien quieras.' },
      { number: 4, icon: <Users className="w-7 h-7 text-primary" />, title: 'Recibí Entrevistas', text: 'Las empresas interactúan con tu bot para conocerte.' },
      { number: 5, icon: <PhoneCall className="w-7 h-7 text-primary" />, title: 'Coordiná por WhatsApp', text: 'Si hay interés, conectan directamente con vos (Plan Pro).' },
    ];

    const listItemVariants = {
      hidden: { opacity: 0, x: -30 },
      visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: i * 0.2,
          duration: 0.5,
          ease: "easeOut"
        }
      })
    };

    const HowItWorksSection = () => {
      return (
        <section id="como-funciona" className="bg-white">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              ¿Cómo Funciona?
            </motion.h2>
            <div className="max-w-3xl mx-auto">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.number} 
                  custom={index}
                  variants={listItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex items-start space-x-6 p-6 mb-6 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xl">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-muted-foreground">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default HowItWorksSection;
  