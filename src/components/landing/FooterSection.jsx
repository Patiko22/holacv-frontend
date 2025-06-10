
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Briefcase, Linkedin, Twitter, Instagram } from 'lucide-react';

    const FooterSection = () => {
      return (
        <motion.footer 
          className="bg-gray-900 text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex items-center space-x-2 text-xl font-bold text-white">
                <Briefcase size={24} className="text-primary" />
                <span>HolaCV</span>
              </div>
              
              <div className="text-center md:text-left">
                <p>&copy; {new Date().getFullYear()} HolaCV – Todos los derechos reservados.</p>
                <p className="text-sm">Innovando la forma de conectar talento.</p>
              </div>

              <div className="flex justify-center md:justify-end space-x-4">
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-primary transition-colors"><Linkedin size={22}/></a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={22}/></a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={22}/></a>
              </div>
            </div>
          </div>
        </motion.footer>
      );
    };

    export default FooterSection;
  