
    import React, { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';
    import { motion, AnimatePresence } from 'framer-motion';
    import { UserPlus, Building } from 'lucide-react';

    const RegisterSection = () => {
      const [formType, setFormType] = useState('professional'); 
      
      const [professionalFullName, setProfessionalFullName] = useState('');
      const [professionalEmail, setProfessionalEmail] = useState('');
      const [professionalLinkedin, setProfessionalLinkedin] = useState('');

      const [companyName, setCompanyName] = useState('');
      const [companyEmail, setCompanyEmail] = useState('');
      const [companyWebsite, setCompanyWebsite] = useState('');

      const { toast } = useToast();

      const handleProfessionalSubmit = (e) => {
        e.preventDefault();
        if (!professionalFullName || !professionalEmail) {
          toast({
            title: "Error",
            description: "Nombre completo y Email son requeridos.",
            variant: "destructive",
          });
          return;
        }
        console.log('Professional Register:', { professionalFullName, professionalEmail, professionalLinkedin });
        toast({
          title: "¡Registrado como Profesional!",
          description: "Gracias por registrarte. Pronto tendrás noticias nuestras.",
        });
        setProfessionalFullName('');
        setProfessionalEmail('');
        setProfessionalLinkedin('');
      };

      const handleCompanySubmit = (e) => {
        e.preventDefault();
        if (!companyName || !companyEmail) {
          toast({
            title: "Error",
            description: "Nombre de empresa y Email son requeridos.",
            variant: "destructive",
          });
          return;
        }
        console.log('Company Register:', { companyName, companyEmail, companyWebsite });
        toast({
          title: "¡Empresa Registrada!",
          description: "Gracias por registrar tu empresa. Nos pondremos en contacto.",
        });
        setCompanyName('');
        setCompanyEmail('');
        setCompanyWebsite('');
      };

      const commonFormClasses = "bg-white p-8 md:p-10 rounded-xl shadow-2xl space-y-6 border border-gray-200";

      return (
        <section id="registro" className="bg-gradient-to-br from-primary/5 via-white to-primary/10">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="section-title !mb-4">Unite a la Revolución del CV</h2>
              <p className="section-subtitle !mb-8">
                Ya seas un profesional buscando destacar o una empresa en busca del talento ideal, HolaCV es para vos.
              </p>
            </motion.div>

            <div className="flex justify-center mb-10 space-x-2">
              <Button 
                onClick={() => setFormType('professional')} 
                variant={formType === 'professional' ? 'default' : 'outline'}
                size="lg"
                className="rounded-lg"
              >
                <UserPlus className="mr-2 h-5 w-5" /> Soy Profesional
              </Button>
              <Button 
                onClick={() => setFormType('company')} 
                variant={formType === 'company' ? 'default' : 'outline'}
                size="lg"
                className="rounded-lg"
                id="registro-empresas"
              >
                <Building className="mr-2 h-5 w-5" /> Soy Empresa
              </Button>
            </div>
            
            <AnimatePresence mode="wait">
              {formType === 'professional' && (
                <motion.div
                  key="professional-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="max-w-lg mx-auto text-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Creá tu Bot Profesional</h3>
                    <p className="text-muted-foreground">Es gratis, rápido y podés recibir hasta 50 preguntas como prueba.</p>
                  </div>
                  <form onSubmit={handleProfessionalSubmit} className={commonFormClasses}>
                    <div>
                      <Label htmlFor="professionalFullName" className="text-gray-700 font-medium">Nombre completo</Label>
                      <Input 
                        type="text" 
                        id="professionalFullName" 
                        value={professionalFullName}
                        onChange={(e) => setProfessionalFullName(e.target.value)}
                        placeholder="Ej: Ada Lovelace" 
                        required 
                        className="mt-1.5 py-3 px-4 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="professionalEmail" className="text-gray-700 font-medium">Email</Label>
                      <Input 
                        type="email" 
                        id="professionalEmail" 
                        value={professionalEmail}
                        onChange={(e) => setProfessionalEmail(e.target.value)}
                        placeholder="tu@email.com" 
                        required 
                        className="mt-1.5 py-3 px-4 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="professionalLinkedin" className="text-gray-700 font-medium">LinkedIn (opcional)</Label>
                      <Input 
                        type="url" 
                        id="professionalLinkedin" 
                        value={professionalLinkedin}
                        onChange={(e) => setProfessionalLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/in/tuperfil" 
                        className="mt-1.5 py-3 px-4 text-base"
                      />
                    </div>
                    <Button type="submit" className="w-full rounded-lg shadow-md" size="lg">
                      Quiero crear mi bot
                    </Button>
                  </form>
                </motion.div>
              )}

              {formType === 'company' && (
                <motion.div
                  key="company-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="max-w-lg mx-auto text-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Encontrá Talento Innovador</h3>
                    <p className="text-muted-foreground">Accedé a perfiles únicos y agilizá tu proceso de selección.</p>
                  </div>
                  <form onSubmit={handleCompanySubmit} className={commonFormClasses}>
                    <div>
                      <Label htmlFor="companyName" className="text-gray-700 font-medium">Nombre de la Empresa</Label>
                      <Input 
                        type="text" 
                        id="companyName" 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Ej: Acme Corp" 
                        required 
                        className="mt-1.5 py-3 px-4 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyEmail" className="text-gray-700 font-medium">Email de Contacto</Label>
                      <Input 
                        type="email" 
                        id="companyEmail" 
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        placeholder="rrhh@empresa.com" 
                        required 
                        className="mt-1.5 py-3 px-4 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyWebsite" className="text-gray-700 font-medium">Sitio Web (opcional)</Label>
                      <Input 
                        type="url" 
                        id="companyWebsite" 
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        placeholder="https://www.empresa.com" 
                        className="mt-1.5 py-3 px-4 text-base"
                      />
                    </div>
                    <Button type="submit" className="w-full rounded-lg shadow-md" size="lg">
                      Registrar mi Empresa
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      );
    };

    export default RegisterSection;
  