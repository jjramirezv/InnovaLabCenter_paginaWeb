import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Cpu, Zap, Activity, CheckCircle, MapPin, Instagram, Facebook, Phone, Layers, Code } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const Home = () => {
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const backgroundCheck = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(56, 189, 248, 0.30), 
    transparent 80%
  )`;

  return (
    <div className="font-sans bg-gray-50 selection:bg-brand-primary selection:text-white">
      
      {/* 1. Hero section con efecto spotlight*/}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0B0F19] group"
      >
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ 
               backgroundImage: `linear-gradient(#217CA3 1px, transparent 1px), linear-gradient(90deg, #217CA3 1px, transparent 1px)`, 
               backgroundSize: '50px 50px' 
             }}>
        </div>

        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{ background: backgroundCheck }}
        />

        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-brand-primary/30 rounded-full bg-brand-primary/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              <span className="text-brand-primary text-xs font-mono tracking-widest uppercase">InnovaLab Center</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Ingeniería <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-primary to-blue-400 animate-gradient-x">
                Sin Límites.
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg lg:text-xl max-w-lg mb-10 leading-relaxed font-light border-l-2 border-brand-primary/50 pl-6">
              Fusionamos la creatividad digital con la manufactura industrial. 
              Desarrollo de Software, IoT y Prototipado 3D en el corazón de Huancayo.
            </p>

            <div className="flex flex-wrap gap-5">
              <a href="#servicios" className="group relative px-8 py-4 bg-brand-primary text-white font-bold rounded-xl overflow-hidden shadow-lg shadow-brand-primary/25 transition-all hover:scale-105">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <span className="relative flex items-center gap-2">Explorar Servicios <ArrowRight className="w-5 h-5" /></span>
              </a>
              <Link to="/contacto" className="px-8 py-4 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 hover:border-white/30 transition-all backdrop-blur-sm">
                Iniciar Proyecto
              </Link>
            </div>
          </motion.div>

          <div className="relative h-[500px] hidden lg:flex items-center justify-center perspective-1000">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-72 bg-[#161b22]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl z-20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-brand-secondary/20 rounded-lg text-brand-secondary"><Box size={24} /></div>
                <div>
                  <h3 className="text-white font-bold">Prototipado</h3>
                  <p className="text-xs text-gray-500 font-mono">STATUS: ACTIVE</p>
                </div>
              </div>
              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-brand-secondary w-3/4"></div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 left-0 w-80 bg-[#161b22]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl z-30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Cpu size={24} /></div>
                <div>
                  <h3 className="text-white font-bold">IoT Systems</h3>
                  <p className="text-xs text-gray-500 font-mono">CONECTADO: 12ms</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1,2,3,4].map(i => <div key={i} className="h-8 bg-blue-500/10 rounded border border-blue-500/20 animate-pulse"></div>)}
              </div>
            </motion.div>

            <div className="w-[400px] h-[400px] rounded-full border border-white/5 flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border border-dashed border-brand-primary/20 animate-spin-slow"></div>
               <div className="w-[300px] h-[300px] bg-gradient-to-tr from-brand-primary/20 to-transparent rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Servicios (Estilo Bento Grid) */}
      <section id="servicios" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <span className="text-brand-primary font-mono text-sm tracking-wider uppercase">Nuestro Stack</span>
          <h2 className="text-4xl font-extrabold text-brand-dark mt-2">Ecosistema de Servicios</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-brand-secondary to-brand-primary mt-4 mx-auto md:mx-0 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
          <Link to="/robotica" className="md:col-span-2 group relative rounded-3xl overflow-hidden bg-[#0B0F19] border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10 p-10 flex flex-col justify-between">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 text-brand-accent group-hover:scale-110 transition-transform">
                <Cpu size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Robótica Avanzada</h3>
                <p className="text-gray-400 mb-4 max-w-md">Kits educativos y soluciones industriales con Arduino/ESP32.</p>
                <span className="inline-flex items-center gap-2 text-brand-accent font-bold group-hover:translate-x-2 transition-transform">
                  Ver Proyectos <ArrowRight size={18} />
                </span>
              </div>
            </div>
            <img src="/images/uni1.png" className="absolute right-0 top-0 w-3/4 h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 mask-image-gradient" alt="Robótica" />
          </Link>

          <Link to="/impresion-3d" className="md:row-span-2 group relative rounded-3xl overflow-hidden bg-[#0B0F19] border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 p-10 flex flex-col justify-between">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 text-blue-400 group-hover:scale-110 transition-transform">
                <Box size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Impresión 3D</h3>
                <p className="text-gray-400 mb-4">Resina 8K y Filamento de alta resistencia.</p>
                <span className="inline-flex items-center gap-2 text-blue-400 font-bold group-hover:translate-x-2 transition-transform">
                  Ver Materiales <ArrowRight size={18} />
                </span>
              </div>
            </div>
            <img src="/images/fig1.png" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-700" alt="3D Printing" />
          </Link>

          <Link to="/corte-laser" className="group relative rounded-3xl overflow-hidden bg-[#0B0F19] border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10 p-8 flex flex-col justify-end">
              <Zap className="text-brand-secondary mb-4 group-hover:text-white transition-colors" size={32} />
              <h3 className="text-2xl font-bold text-white mb-1">Corte Láser</h3>
              <span className="text-gray-300 text-sm group-hover:text-white transition-colors">Precisión milimétrica →</span>
            </div>
            <img src="/images/laser-placas2.png" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt="Corte Láser" />
          </Link>

          <Link to="/proyectos" className="group relative rounded-3xl overflow-hidden bg-brand-primary border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
             <div className="absolute inset-0 bg-[#0B0F19] m-[2px] rounded-[22px] flex items-center justify-center group-hover:bg-opacity-90 transition-all overflow-hidden">
                <div className="text-center z-10 p-6">
                  <Activity className="text-white mx-auto mb-3" size={40} />
                  <h3 className="text-xl font-bold text-white">Ingeniería</h3>
                  <p className="text-gray-400 text-xs mt-2">Soluciones Integrales</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </div>
          </Link>
        </div>
      </section>

      {/* 3. GALERÍA RECIENTE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-brand-slate font-bold tracking-wider text-xs uppercase bg-gray-100 px-3 py-1 rounded-full">Portafolio 2025</span>
              <h2 className="text-4xl font-bold text-brand-dark mt-4">Resultados Tangibles</h2>
            </div>
            <Link to="/proyectos" className="group flex items-center gap-2 text-brand-dark font-bold hover:text-brand-primary transition-colors">
              Ver galería completa <div className="bg-gray-100 p-2 rounded-full group-hover:bg-brand-primary group-hover:text-white transition-colors"><ArrowRight size={16}/></div>
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
             <PortfolioCard img="/images/per3.png" category="Impresión 3D" title="Prototipado Rápido" />
             <PortfolioCard img="/images/laser-extra-1.png" category="Láser" title="Merchandising" />
             <PortfolioCard img="/images/robotica.jpg" category="Robótica" title="Automatización" />
             <PortfolioCard img="/images/galeria4.jpg" category="IoT" title="Smart Home" />
          </div>
        </div>
      </section>

      {/* 4. ¿Por qué InnovaLab?*/}
      <section className="py-24 bg-[#0B0F19] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#408fc1 1px, transparent 1px), linear-gradient(90deg, #408fc1 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué InnovaLab?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Más que proveedores, somos tu departamento de ingeniería externo.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard icon={<Code />} title="Desarrollo a Medida" desc="Software y hardware diseñado específicamente para tu necesidad." />
            <FeatureCard icon={<CheckCircle />} title="Calidad Industrial" desc="Estándares de manufactura profesional en cada pieza." />
            <FeatureCard icon={<Zap />} title="Entrega Ágil" desc="Procesos optimizados para cumplir plazos ajustados." />
            <FeatureCard icon={<Layers />} title="Soluciones 360°" desc="Desde el diseño CAD hasta el producto final empaquetado." />
          </div>
        </div>
      </section>

      {/* 5. Contacto y mapa */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
          <div>
            <div className="inline-flex items-center gap-2 text-brand-primary font-bold mb-4">
              <MapPin size={20} />
              <span className="tracking-widest text-sm uppercase">Ubicación Estratégica</span>
            </div>
            <h2 className="text-4xl font-extrabold text-brand-dark mb-6">Visítanos en Huancayo</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Nuestro taller está abierto para que veas materiales, toques prototipos y hables con nuestros ingenieros. 
              <br/><br/>
              <strong>Jr. Ica Nueva 1585</strong> — Zona céntrica y accesible.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <Phone className="text-brand-secondary mb-3" size={24} />
                <h4 className="font-bold text-brand-dark">Contacto Directo</h4>
                <p className="text-gray-500 text-sm mt-1">+51 987 654 321</p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <Activity className="text-brand-primary mb-3" size={24} />
                <h4 className="font-bold text-brand-dark">Horario</h4>
                <p className="text-gray-500 text-sm mt-1">Lun-Sáb: 8am - 7pm</p>
              </div>
            </div>

            <div className="flex gap-4">
               <Link to="/contacto" className="flex-1 bg-brand-dark text-white py-4 rounded-xl font-bold text-center hover:bg-brand-primary transition-colors shadow-lg">
                 Agendar Cita
               </Link>
               <div className="flex gap-2">
                 <SocialBtn icon={<Instagram size={20} />} />
                 <SocialBtn icon={<Facebook size={20} />} />
               </div>
            </div>
          </div>
        
          <div className="h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.668761136456!2d-75.215!3d-12.065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAzJzU0LjAiUyA3NcKwMTInNTQuMCJX!5e0!3m2!1ses!2spe!4v1625000000000!5m2!1ses!2spe" // Coordenadas aproximadas de Huancayo, actualiza con las reales
               width="100%"     
               height="100%" 
               style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }} 
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
  <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-primary/30 hover:bg-white/10 transition-all duration-300 group">
    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brand-primary/20 to-transparent text-brand-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const PortfolioCard = ({ img, category, title }) => (
  <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer shadow-md hover:shadow-xl transition-all">
    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
      <span className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{category}</span>
      <h4 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{title}</h4>
    </div>
  </div>
);

const SocialBtn = ({ icon }) => (
  <a href="#" className="w-14 h-14 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-brand-dark hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:-translate-y-1 transition-all shadow-sm">
    {icon}
  </a>
);

export default Home;