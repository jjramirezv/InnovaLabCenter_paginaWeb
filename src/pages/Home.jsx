import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Cpu, Zap, Activity, CheckCircle, MapPin, Instagram, Facebook, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="font-sans bg-gray-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#211F30]">
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#408fc1 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 mb-6 border border-brand-secondary/30 rounded-full bg-brand-secondary/10 backdrop-blur-md">
              <span className="text-brand-secondary text-xs font-mono tracking-widest uppercase">InnovaLab Center</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
              Diseño. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">Prototipado.</span> <br />
              Manufactura.
            </h1>
            
            <p className="text-gray-400 text-lg max-w-lg mb-8 leading-relaxed font-light">
              Tu centro de manufactura digital y desarrollo tecnológico en Huancayo. Transformamos ideas en proyectos de ingeniería tangibles.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#servicios" className="bg-brand-accent hover:bg-brand-accentLight text-white px-8 py-4 rounded-lg font-bold flex items-center gap-3 transition-colors shadow-lg shadow-brand-accent/20">
                Ver Servicios <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/contacto" className="px-8 py-4 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors backdrop-blur-sm">
                Contactar
              </Link>
            </div>
          </motion.div>

          <div className="relative h-[500px] hidden lg:block">
            <motion.div 
              initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="absolute top-10 right-10 w-72 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl z-20"
            >
              <Box className="text-brand-accent mb-4" size={24} />
              <h3 className="text-white font-bold">Prototipado Rápido</h3>
              <p className="text-gray-400 text-sm mt-2">Materializamos tus diseños en tiempo récord.</p>
            </motion.div>
            <motion.div 
              initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="absolute bottom-20 left-10 w-80 bg-gradient-to-br from-brand-darkBlue to-brand-dark p-6 rounded-2xl shadow-2xl border border-white/5 z-30"
            >
              <Cpu className="text-blue-400 mb-4" size={24} />
              <h3 className="text-white font-bold">Soluciones IoT</h3>
              <p className="text-gray-400 text-sm mt-2">Automatización inteligente a medida.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SERVICIOS DESTACADOS */}
      <section id="servicios" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold text-brand-dark">Nuestros Servicios</h2>
          <div className="h-1 w-20 bg-brand-accent mt-4 mx-auto md:mx-0"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
          <Link to="/robotica" className="md:col-span-2 group relative rounded-3xl overflow-hidden bg-brand-dark border border-gray-800 shadow-sm hover:shadow-xl transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10 p-10 flex flex-col justify-end">
              <Cpu className="text-brand-accent mb-4" size={40} />
              <h3 className="text-2xl font-bold text-white mb-2">Robótica</h3>
              <span className="text-white/80 text-sm font-bold flex items-center gap-2 group-hover:text-brand-accent transition-colors">
                Ver Portafolio <ArrowRight size={16} />
              </span>
            </div>
            <img src="/images/uni1.png" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" alt="Robótica" />
          </Link>

          <Link to="/impresion-3d" className="md:row-span-2 group relative rounded-3xl overflow-hidden bg-brand-dark border border-gray-800 shadow-sm hover:shadow-xl transition-all">
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 p-10 flex flex-col justify-end">
              <Box className="text-blue-400 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-white mb-2">Impresión 3D</h3>
              <span className="text-white/80 text-sm font-bold flex items-center gap-2 group-hover:text-brand-accent transition-colors">
                Ver Portafolio <ArrowRight size={16} />
              </span>
            </div>
            <img src="/images/fig1.png" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" alt="3D Printing" />
          </Link>

          <Link to="/corte-laser" className="group relative rounded-3xl overflow-hidden bg-brand-dark border border-gray-800 shadow-sm hover:shadow-xl transition-all">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10 p-8 flex flex-col justify-end">
              <Zap className="text-brand-primary mb-4" size={40} />
              <h3 className="text-xl font-bold text-white mb-1">Corte Láser</h3>
              <span className="text-white/80 text-xs font-bold uppercase tracking-wider group-hover:text-brand-accent transition-colors">Ver Portafolio</span>
            </div>
            <img src="/images/laser-placas2.png" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Corte Láser" />
          </Link>

          <Link to="/proyectos" className="group relative rounded-3xl overflow-hidden bg-brand-dark border border-gray-800 shadow-sm hover:shadow-xl transition-all">
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10 p-8 flex flex-col justify-end">
              <Activity className="text-purple-400 mb-4" size={40} />
              <h3 className="text-xl font-bold text-white mb-1">Proyectos</h3>
              <span className="text-white/80 text-xs font-bold uppercase tracking-wider group-hover:text-brand-accent transition-colors">Ver Proyectos</span>
            </div>
            <img src="/images/proyectos.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Proyectos" />
          </Link>
        </div>
      </section>

      {/* 3. PORTAFOLIO DESTACADO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-brand-primary font-bold tracking-wider text-sm uppercase">Galería Reciente</span>
              <h2 className="text-3xl font-bold text-brand-dark mt-2">Trabajos Destacados</h2>
            </div>
            <Link to="/proyectos" className="hidden md:flex items-center text-brand-dark hover:text-brand-primary font-bold transition">
              Ver todo <ArrowRight size={18} className="ml-2"/>
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
             <PortfolioCard img="/images/per3.png" category="Impresión 3D" title="Prototipo Industrial" />
             <PortfolioCard img="/images/laser-extra-1.png" category="Corte Láser" title="Letreros Corporativos" />
             <PortfolioCard img="/images/robotica.jpg" category="Robótica" title="Brazo Automatizado" />
             <PortfolioCard img="/images/galeria4.jpg" category="Proyectos" title="Sistemas IoT" />
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/proyectos" className="inline-block bg-white border border-gray-300 text-brand-dark px-6 py-3 rounded-full font-bold">Ver todo el portafolio</Link>
          </div>
        </div>
      </section>

      {/* 4. BENEFICIOS */}
      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #217CA3 25%, transparent 25%, transparent 75%, #217CA3 75%, #217CA3), linear-gradient(45deg, #217CA3 25%, transparent 25%, transparent 75%, #217CA3 75%, #217CA3)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">¿Por qué elegir InnovaLab?</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Más que un servicio de impresión, somos tu socio tecnológico en Huancayo.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard icon={<Box />} title="Personalización" desc="Adaptamos cada diseño a tus necesidades específicas." />
            <FeatureCard icon={<CheckCircle />} title="Calidad Garantizada" desc="Acabados profesionales en todos nuestros materiales." />
            <FeatureCard icon={<Zap />} title="Rapidez" desc="Tiempos de entrega optimizados para tus urgencias." />
            <FeatureCard icon={<Activity />} title="Atención a Empresas" desc="Facturación y soporte para proyectos institucionales." />
          </div>
        </div>
      </section>

      {/* 5. MINI BLOQUE DE CONTACTO + MAPA */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
          <div>
            <span className="text-brand-primary font-bold tracking-wider text-sm uppercase">Ubícanos</span>
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Visítanos en Huancayo</h2>
            <p className="text-brand-slate mb-8">
              Estamos ubicados en una zona céntrica. Puedes visitarnos para ver muestras de materiales o coordinar proyectos complejos personalmente.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-primary shrink-0"><MapPin size={24} /></div>
                <div>
                  <h4 className="font-bold text-brand-dark">Dirección Principal</h4>
                  <p className="text-brand-slate text-sm">Jr. Ica Nueva 1585 - Huancayo</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-primary shrink-0"><Phone size={24} /></div>
                <div>
                   <h4 className="font-bold text-brand-dark">Horario de Atención</h4>
                   <p className="text-brand-slate text-sm">Lunes a Sábado: 8:00 am - 7:00 pm</p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                 <Link to="/contacto" className="bg-brand-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-primary transition-colors text-center">
                   Ir a Página de Contacto
                 </Link>
                 
                 <div className="flex gap-4 items-center justify-center sm:justify-start">
                   <SocialBtn icon={<Instagram size={20} />} />
                   <SocialBtn icon={<Facebook size={20} />} />
                 </div>
              </div>
            </div>
          </div>
        
          <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white relative">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.522009457565!2d-75.22105012509128!3d-12.076373742452448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e965b8cee51ed%3A0xd46bad98ad3bf89b!2sJr.%20Ica%20Nueva%201585%2C%20Huancayo%2012003!5e0!3m2!1ses-419!2spe!4v1768951194108!5m2!1ses-419!2spe"
               width="100%"     
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen="" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Mapa Huancayo"
             ></iframe>
          </div>

        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="text-center p-6 rounded-xl hover:bg-white/5 transition-colors">
    <div className="w-16 h-16 mx-auto bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mb-4">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
);

const PortfolioCard = ({ img, category, title }) => (
  <div className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer">
    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
      <span className="text-brand-accent text-xs font-bold uppercase">{category}</span>
      <h4 className="text-white font-bold">{title}</h4>
    </div>
  </div>
);

const SocialBtn = ({ icon }) => (
  <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all">
    {icon}
  </a>
);

export default Home;