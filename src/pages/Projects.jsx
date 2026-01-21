import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Settings, Monitor, Activity, ChevronRight, Play, X, MessageCircle, ArrowRight, CheckCircle, Clock, Database, PenTool } from 'lucide-react';

// --- DATOS DE ESPECIALIDADES ---
const specialties = [
  {
    id: 'mecatronica',
    title: 'Colocar texto',
    icon: <Cpu size={32} />,
    desc: 'Colocar descripción',
    details: ['Automatización PLC/HMI', 'Robótica Industrial', 'Sistemas Embebidos'],
    color: 'text-purple-400',
    border: 'group-hover:border-purple-500/50',
    glow: 'group-hover:shadow-purple-500/20'
  },
  {
    id: 'mecanica',
    title: 'Colocar texto',
    icon: <Settings size={32} />,
    desc: 'Colocar descripción',
    details: ['Diseño CAD / CAE', 'Análisis de Elementos Finitos', 'Prototipado CNC/3D'],
    color: 'text-blue-400',
    border: 'group-hover:border-blue-500/50',
    glow: 'group-hover:shadow-blue-500/20'
  },
  {
    id: 'sistemas',
    title: 'Colocar texto',
    icon: <Monitor size={32} />,
    desc: 'Colocar descripción',
    details: ['Dashboards en Tiempo Real', 'Integración Cloud (AWS/Azure)', 'Apps de Control Industrial'],
    color: 'text-cyan-400',
    border: 'group-hover:border-cyan-500/50',
    glow: 'group-hover:shadow-cyan-500/20'
  }
];

const projectsData = [
  {
    id: 1,
    title: 'Colocar texto',
    category: 'Mecatrónica',
    status: 'Terminado',
    desc: 'Colocar descripción',
    video: '/videos/proy-brazo.mp4' 
  },
  {
    id: 2,
    title: 'Colocar texto',
    category: 'Sistemas',
    status: 'Terminado',
    desc: 'Colocar descripción',
    video: '/videos/proy-riego.mp4' 
  },
  {
    id: 3,
    title: 'Colocar texto',
    category: 'Mecánica',
    status: 'En Desarrollo',
    desc: 'Colocar descripción',
    video: '/videos/proy-rover.mp4'
  },
  {
    id: 4,
    title: 'Colocar texto',
    category: 'Mecatrónica',
    status: 'Terminado',
    desc: 'Colocar descripción',
    video: '/videos/proy-faja.mp4'
  },
  {
    id: 5,
    title: 'Colocar texto',
    category: 'Sistemas',
    status: 'Terminado',
    desc: 'Colocar descripción',
    video: '/videos/proy-scada.mp4'
  },
  {
    id: 6,
    title: 'Colocar texto',
    category: 'Mecánica',
    status: 'Terminado',
    desc: 'Colocar descripción',
    video: '/videos/proy-molino.mp4'
  }
];

const Projects = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openWhatsapp = (text) => {
    window.open(`https://wa.me/51987564941?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="font-sans bg-[#0B0F19] min-h-screen text-white selection:bg-indigo-500 selection:text-white">

      {/* --- 1. HERO SECTION (Impacto Visual) --- */}
      <section className="relative pt-40 pb-28 overflow-hidden">
        {/* Fondo animado sutil */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
        </div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-bold mb-8 border border-indigo-500/20 backdrop-blur-md">
              <Activity size={16} className="animate-pulse" /> Ingeniería de Alto Nivel
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Soluciones Complejas <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">Resultados Reales</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-light mb-10">
              Transformamos desafíos técnicos en sistemas funcionales. 
              Especialistas en Mecatrónica, Desarrollo de Software Industrial y Diseño Mecánico.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. ESPECIALIDADES (Tarjetas Tech) --- */}
      <section className="py-20 bg-[#0F1420]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {specialties.map((spec, idx) => (
              <motion.div 
                key={spec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group p-8 rounded-3xl bg-[#151b2b] border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${spec.border} ${spec.glow}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 ${spec.color}`}>
                  {spec.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{spec.title}</h3>
                <p className="text-gray-400 mb-6">{spec.desc}</p>
                <ul className="space-y-3">
                  {spec.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                      <div className={`w-1.5 h-1.5 rounded-full ${spec.color.replace('text-', 'bg-')}`}></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. PORTAFOLIO DE VIDEOS (Interfaz Principal) --- */}
      <section className="py-28 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Proyectos Destacados</h2>
              <p className="text-gray-400 text-lg max-w-xl">
                Visualiza el funcionamiento real de nuestros desarrollos. Ingeniería en movimiento.
              </p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Finalizado
               </div>
               <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                 <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div> En Proceso
               </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative bg-[#151b2b] rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedVideo(project.video)}
              >
                {/* VIDEO CONTAINER */}
                <div className="relative h-64 w-full overflow-hidden">
                  {/* El video se reproduce solo y en bucle */}
                  <video 
                    src={project.video}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Overlay Gradiente para texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-90"></div>
                  
                  {/* Botón Play Flotante (Aparece en hover) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                      <Play fill="white" className="text-white ml-1" />
                    </div>
                  </div>

                  {/* Badge Categoría */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* INFO DEL PROYECTO */}
                <div className="p-6 relative">
                  {/* Línea decorativa */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                    {project.status === 'Terminado' 
                      ? <CheckCircle size={16} className="text-green-500" />
                      : <Clock size={16} className="text-amber-500" />
                    }
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {project.desc}
                  </p>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openWhatsapp(`Hola InnovaLab, me interesa saber más sobre el proyecto: ${project.title}`);
                    }}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-indigo-600 border border-white/10 hover:border-indigo-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                  >
                    Consultar Tecnología <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 4. CTA CONTACTO (Full Width - Dark Theme) --- */}
      <section className="py-24 bg-gradient-to-b from-[#0B0F19] to-indigo-950/20 relative overflow-hidden text-center border-t border-white/5">
         <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
         
         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">¿Tienes un reto de ingeniería?</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
               Desde la automatización de una línea de producción hasta el desarrollo de un nuevo producto IoT. 
               Nosotros lo hacemos realidad.
            </p>
            <a 
              href="https://wa.me/51987564941?text=Hola%20InnovaLab%20Center,%20quiero%20información%20sobre%20Proyectos%20de%20Ingeniería."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 px-12 rounded-full shadow-2xl shadow-indigo-900/50 transition-all hover:scale-105 hover:shadow-indigo-500/40"
            >
              <MessageCircle size={24} />
              Agendar Reunión Técnica
            </a>
         </div>
      </section>

      {/* --- LIGHTBOX DE VIDEO (Player Real) --- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 text-white hover:text-indigo-400 bg-black/50 hover:bg-black/80 p-2 rounded-full transition-colors backdrop-blur-md"
              >
                <X size={32} />
              </button>
              
              {/* Reproductor con Controles */}
              <video 
                src={selectedVideo} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              >
                Tu navegador no soporta videos HTML5.
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Projects;