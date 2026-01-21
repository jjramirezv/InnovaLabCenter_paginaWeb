import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, Smartphone, Instagram, Facebook, Linkedin, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    celular: '',
    email: '',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const accessUrl = "https://formsubmit.co/ajax/innovalabcenter@innovalabcenter.org"; 

    try {
      const response = await fetch(accessUrl, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.nombre,
            phone: formData.celular,
            email: formData.email,
            message: formData.mensaje,
            _subject: "Nuevo Lead desde Web InnovaLab"
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ nombre: '', celular: '', email: '', mensaje: '' }); 
      } else {
        alert("Hubo un error al enviar. Por favor intenta contactarnos por WhatsApp.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <section className="relative pt-40 pb-32 bg-[#211F30] overflow-hidden">
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#408fc1 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Conectemos tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">Idea</span> con la Realidad
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Solicita una cotización formal o agenda una consultoría técnica. Nuestro equipo de ingeniería responderá vía correo electrónico.
          </motion.p>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto -mt-20 relative z-20 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-5 min-h-[600px]">
          
          {/* COLUMNA IZQUIERDA: Información */}
          <div className="lg:col-span-2 bg-brand-dark text-white p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl"></div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              <p className="text-gray-400 mb-10 text-sm">
                Completa el formulario para recibir una cotización formal en tu bandeja de entrada.
              </p>
              
              <div className="space-y-8">
                <ContactItem icon={<Phone className="text-brand-accent" />} title="Llámanos" detail="+51 987 564 941" />
                <ContactItem icon={<Mail className="text-brand-accent" />} title="Escríbenos" detail="innovalabcenter@innovalab.org" />
                <ContactItem icon={<MapPin className="text-brand-accent" />} title="Visítanos" detail="Jr. Ica Nueva 1585 - Huancayo" />
              </div>
            </div>

            <div className="mt-12">
              <p className="text-sm text-gray-400 mb-4">Síguenos en redes:</p>
              <div className="flex gap-4">
                <SocialIcon icon={<Instagram size={20}/>} />
                <SocialIcon icon={<Facebook size={20}/>} />
                <SocialIcon icon={<Linkedin size={20}/>} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white p-10 lg:p-16 relative">
            
            {isSuccess ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-10 text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-bold text-brand-dark mb-2">¡Mensaje Enviado!</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                  Hemos recibido tu consulta correctamente. Uno de nuestros ingenieros te responderá al correo proporcionado en breve.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-dark transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-brand-dark mb-8">Cotización / Consulta</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400 group-focus-within:text-brand-primary transition-colors" size={20} />
                        <input 
                          type="text" name="nombre" required value={formData.nombre} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                          placeholder="Ej. Juan Pérez"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Celular</label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-3 text-gray-400 group-focus-within:text-brand-primary transition-colors" size={20} />
                        <input 
                          type="tel" name="celular" required value={formData.celular} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                          placeholder="+51 999 999 999"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400 group-focus-within:text-brand-primary transition-colors" size={20} />
                      <input 
                        type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                        placeholder="ejemplo@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Detalle de la consulta</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-400 group-focus-within:text-brand-primary transition-colors" size={20} />
                      <textarea 
                        name="mensaje" required value={formData.mensaje} onChange={handleChange} rows="4"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all resize-none"
                        placeholder="Describe tu proyecto..."
                      ></textarea>
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 ${
                      isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-dark hover:bg-brand-primary text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <>Enviando... <Loader2 className="animate-spin" size={20} /></>
                    ) : (
                      <>Enviar Consulta <Send size={20} /></>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="pb-20 px-6 max-w-7xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-lg h-[400px] border border-gray-200 relative group">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.522009457565!2d-75.22105012509128!3d-12.076373742452448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e965b8cee51ed%3A0xd46bad98ad3bf89b!2sJr.%20Ica%20Nueva%201585%2C%20Huancayo%2012003!5e0!3m2!1ses-419!2spe!4v1768951194108!5m2!1ses-419!2spe"
             width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" 
             className="grayscale hover:grayscale-0 transition-all duration-700"
             title="Mapa Ubicación"
           ></iframe>
        </div>
      </section>

    </div>
  );
};

const ContactItem = ({ icon, title, detail }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">{title}</p>
      <p className="text-white font-medium">{detail}</p>
    </div>
  </div>
);

const SocialIcon = ({ icon }) => (
  <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-brand-dark transition-all">
    {icon}
  </a>
);

export default Contact;