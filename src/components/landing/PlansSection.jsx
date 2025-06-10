
    import React from 'react';
    import { motion } from 'framer-motion';
    import { CheckCircle, XCircle, Zap } from 'lucide-react';
    import { Button } from '@/components/ui/button';

    const plansData = {
      intro: 'Probá gratis creando tu bot. Si querés potenciarlo, activá el Plan Pro 🚀.',
      features: [
        { name: 'Crear tu bot', gratis: true, pro: true },
        { name: 'Personalizar el tono', gratis: true, pro: true },
        { name: 'Límite de interacciones', gratis: '⛔ Hasta 50 preguntas', pro: '✅ Ilimitado' },
        { name: 'Aparecer en búsquedas', gratis: false, pro: true },
        { name: 'Análisis de interés avanzado', gratis: false, pro: true },
        { name: 'Botón directo a WhatsApp', gratis: false, pro: true },
      ],
    };

    const TickOrCross = ({ value, isPro }) => {
      const iconClass = isPro ? "text-primary" : "text-gray-500";
      if (typeof value === 'boolean') {
        return value ? <CheckCircle className={`w-6 h-6 ${isPro ? 'text-green-500' : 'text-green-400'}`} /> : <XCircle className={`w-6 h-6 ${isPro ? 'text-red-500' : 'text-red-400'}`} />;
      }
      if (value.startsWith('✅') || value.startsWith('⛔')) {
        const text = value.substring(2);
        return (
          <div className="flex items-center justify-center sm:justify-start">
            {value.startsWith('✅') ? <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${isPro ? 'text-green-500' : 'text-green-400'}`} /> : <XCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${isPro ? 'text-red-500' : 'text-red-400'}`} />}
            <span className={isPro ? "text-gray-800" : "text-gray-600"}>{text}</span>
          </div>
        );
      }
      return <span className={isPro ? "text-gray-800" : "text-gray-600"}>{value}</span>;
    };

    const cardVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
          ease: "easeOut"
        }
      })
    };

    const PlansSection = () => {
      return (
        <section id="planes" className="bg-secondary">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Planes Flexibles para Vos
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              {plansData.intro}
            </motion.p>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                custom={0}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Gratis</h3>
                <p className="text-muted-foreground mb-6">Para empezar y probar la plataforma.</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plansData.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <TickOrCross value={feature.gratis} isPro={false} />
                      <span className="ml-3 text-gray-700">{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="lg" className="w-full mt-auto">Comenzar Gratis</Button>
              </motion.div>

              <motion.div
                custom={1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-primary/5 p-8 rounded-xl shadow-xl border-2 border-primary flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-white text-xs font-semibold rounded-bl-lg">MÁS POPULAR</div>
                <Zap className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-2xl font-semibold text-primary mb-2">Pro 🚀</h3>
                <p className="text-primary/80 mb-6">Para profesionales que buscan máximo impacto.</p>
                 <ul className="space-y-3 mb-8 flex-grow">
                  {plansData.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <TickOrCross value={feature.pro} isPro={true} />
                      <span className="ml-3 text-gray-800">{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="w-full mt-auto shadow-md">Activar Plan Pro</Button>
              </motion.div>
            </div>
          </div>
        </section>
      );
    };

    export default PlansSection;
  