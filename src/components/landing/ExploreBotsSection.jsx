
    import React, { useRef } from 'react';
    import { motion, useAnimation } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { ChevronLeft, ChevronRight, UserCircle, Briefcase, MessageSquare } from 'lucide-react';

    const botProfiles = [
      {
        name: 'Laura Martínez',
        title: 'Diseñadora UX/UI Senior',
        avatarText: 'LM',
        description: 'Apasionada por crear interfaces intuitivas y centradas en el usuario. Experiencia en startups y grandes empresas.',
        tags: ['UX Design', 'UI Design', 'Figma', 'Prototyping'],
      },
      {
        name: 'Carlos Rodríguez',
        title: 'Desarrollador Full Stack',
        avatarText: 'CR',
        description: 'Experto en JavaScript, React y Node.js. Me encanta construir aplicaciones web robustas y escalables.',
        tags: ['React', 'Node.js', 'MongoDB', 'GraphQL'],
      },
      {
        name: 'Sofía Gómez',
        title: 'Especialista en Marketing Digital',
        avatarText: 'SG',
        description: 'Estrategias de marketing data-driven para crecimiento. SEO, SEM y Social Media.',
        tags: ['SEO', 'Content Marketing', 'Google Ads', 'Analytics'],
      },
      {
        name: 'Javier Fernández',
        title: 'Project Manager Agile',
        avatarText: 'JF',
        description: 'Liderando equipos para entregar proyectos de alto impacto a tiempo y dentro del presupuesto.',
        tags: ['Agile', 'Scrum', 'Jira', 'Leadership'],
      },
    ];

    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const ExploreBotsSection = () => {
      const scrollContainerRef = useRef(null);
      const controls = useAnimation();

      const scroll = (direction) => {
        if (scrollContainerRef.current) {
          const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8;
          scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
          });
        }
      };
      
      return (
        <section id="buscar" className="bg-white">
          <div className="container mx-auto px-0 md:px-6">
            <motion.h2
              className="section-title px-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Explorá Bots de Profesionales
            </motion.h2>
            <motion.p
              className="section-subtitle px-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              Descubrí perfiles con personalidad y charlá con sus bots antes de una entrevista formal.
            </motion.p>

            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-8 px-6 md:px-0 space-x-6 slider-container"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {botProfiles.map((profile, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="slider-card flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[350px] bg-slate-50 rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-semibold mr-4">
                        {profile.avatarText}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
                        <p className="text-sm text-primary">{profile.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 h-20 overflow-hidden">
                      {profile.description}
                    </p>
                    <div className="mb-5">
                      {profile.tags.map((tag, i) => (
                        <span key={i} className="inline-block bg-primary/10 text-primary text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" /> Charlar con su Bot
                    </Button>
                  </motion.div>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex bg-white/80 hover:bg-white"
                onClick={() => scroll('left')}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex bg-white/80 hover:bg-white"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <motion.div 
              className="text-center mt-12 px-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <Button size="lg" asChild>
                <a href="#registro-empresas">Soy Empresa, Quiero Buscar Talento</a>
              </Button>
            </motion.div>
          </div>
        </section>
      );
    };

    export default ExploreBotsSection;
  