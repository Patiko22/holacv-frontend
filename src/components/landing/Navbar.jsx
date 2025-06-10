
    import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Menu, X, Briefcase } from 'lucide-react';
    import { Button } from '@/components/ui/button';

    const navLinks = [
      { href: '#que-es', label: '¿Qué es?' },
      { href: '#como-funciona', label: '¿Cómo funciona?' },
      { href: '#planes', label: 'Planes' },
      { href: '#buscar', label: 'Buscar Bots' },
      { href: '#faq', label: 'FAQ' },
    ];

    const Navbar = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [isScrolled, setIsScrolled] = useState(false);

      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      const toggleMenu = () => setIsOpen(!isOpen);

      const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
        exit: { opacity: 0, y: -20 }
      };

      const mobileLinkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
      };

      return (
        <motion.nav 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-lg backdrop-blur-md py-3' : 'bg-transparent py-5'}`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="container mx-auto px-6 flex justify-between items-center">
            <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-primary">
              <Briefcase size={28} />
              <span>HolaCV</span>
            </a>

            <div className="hidden md:flex space-x-2 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild size="sm" className="ml-2">
                <a href="#registro">Crear mi Bot</a>
              </Button>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
                {isOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6"
              >
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <motion.li key={link.href} variants={mobileLinkVariants}>
                      <a
                        href={link.href}
                        className="block py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li variants={mobileLinkVariants}>
                    <Button asChild className="w-full mt-3">
                      <a href="#registro" onClick={() => setIsOpen(false)}>Crear mi Bot</a>
                    </Button>
                  </motion.li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      );
    };

    export default Navbar;
  