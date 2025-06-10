
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Bot, Search, Target, BarChartBig, MessageSquare as MessageSquareText } from 'lucide-react';

    const features = [
      { icon: <Bot size={36} className="text-primary"/>, title: "Bots Inteligentes", text: 'Entrenados para destacar tu perfil profesional de forma única.' },
      { icon: <MessageSquareText size={36} className="text-primary"/>, title: "Entrevistas Previas", text: 'Empresas pueden conocerte chateando con tu bot antes de agendar.' },
      { icon: <Target size={36} className="text-primary"/>, title: "Tu Voz, Tu Estilo", text: 'Tu bot responde como vos, reflejando tu personalidad y logros.' },
      { icon: <BarChartBig size={36} className="text-primary"/>, title: "Análisis de Interés", text: 'Descubrí el interés real de las empresas en tu perfil con métricas claras.' },
    ];

    const cardVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.15,
          duration: 0.5,
          ease: "easeOut"
        }
      })
    };

    const WhatIsSection = () => {
      return (
        <section id="que-es" className="bg-secondary">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              ¿Qué es HolaCV?
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex flex-col items-start text-left p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mb-5 p-3 rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default WhatIsSection;
  