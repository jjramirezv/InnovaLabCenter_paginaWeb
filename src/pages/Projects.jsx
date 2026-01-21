import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Settings, Monitor, Database, Activity, PenTool, CheckCircle, Clock, ArrowRight, MessageCircle, X, ChevronRight } from 'lucide-react';

// --- DATOS DE ESPECIALIDADES (Las 3 Líneas) ---
const specialties = [
  {
    id: 'mecatronica',
    title: 'Mecatrónica',
    icon: <Cpu size={32} />,
    desc: 'Fusión de mecánica y electrónica para sistemas inteligentes.',
    details: ['Automatización Industrial', 'Integración de Sensores/Actuadores', 'Control de Sistemas (PID/PLC)'],
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    img: '/images/eng-mecatronica.jpg'
  },
  {
    id: 'mecanica',
    title: 'Mecánica',
    icon: <Settings size={32} />,
    desc: 'Diseño y manufactura de estructuras funcionales.',
    details: ['Diseño CAD Avanzado (SolidWorks)', 'Cálculo de Piezas y Estructuras', 'Fabricación de Prototipos'],
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    img: '/images/eng-mecanica.jpg'
  },
  {
    id: 'sistemas',
    title: 'Sistemas',
    icon: <Monitor size={32} />,
    desc: 'Software a medida y conectividad total.',
    details: ['Desarrollo de Sistemas Web', 'Paneles de Control (Dashboards)', 'Integración IoT y Monitoreo Remoto'],
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    img: '/images/eng-sistemas.jpg'
  }
];

// --- PORTAFOLIO DE PROYECTOS ---
const projectsData = [
  {
    id: 1,
    title: 'Brazo Clasificador con IA',
    category: 'Mecatrónica',
    status: 'Terminado',
    desc: 'Sistema automatizado que separa residuos utilizando visión artificial y servomotores industriales.',
    img: '/images/proy-1.jpg'
  },
  {
    id: 'dashboard',
    title: 'Dashboard de Riego IoT',
    category: 'Sistemas',
    status: 'Terminado',
    desc: 'Plataforma web para monitorear humedad y temperatura de cultivos en tiempo real desde el celular.',
    img: '/images/proy-2.jpg'
  },
  {
    id: 'chasis',
    title: 'Chasis Robot Explorador',
    category: 'Mecánica',
    status: 'En Desarrollo',
    desc: 'Diseño CAD y fabricación en aluminio de un rover todo terreno para exploración minera.',
    img: '/images/proy-3.jpg'
  },
  {
    id: 'faja',
    title: 'Faja Transportadora',
    category: 'Mecatrónica',
    status: 'Terminado',
    desc: 'Sistema de transporte con control de velocidad variable y sensores de conteo de objetos.',
    img: '/images/proy-4.jpg'
  },
  {
    id: 'app',
    title: 'App de Control Domótico',
    category: 'Sistemas',
    status: 'En Desarrollo',
    desc: 'Aplicación móvil para control de iluminación y seguridad en el hogar mediante ESP32.',
    img: '/images/proy-5.jpg'
  },
  {
    id: 'molino',
    title: 'Rediseño de Molino',
    category: 'Mecánica',
    status: 'Terminado',
    desc: 'Optimización de engranajes y estructura para reducir vibraciones en maquinaria de molienda.',
    img: '/images/proy-6.jpg'
  }
];

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openWhatsapp = (text) => {
    window.open(`https://wa.me/51987564941?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">

      {/* --- 1. HERO SECTION (Estilo Ingeniería Premium) --- */}
      <section className="relative pt-36 pb-24 bg-[#0B0F19] overflow-hidden">
        {/* Fondo Blueprint (Planos) */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
        </div>
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/40 text-indigo-300 text-sm font-bold mb-6 border border-indigo-500/30 backdrop-blur-md">
              <Activity size={16} /> Soluciones Integrales
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Proyectos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Ingeniería</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Desarrollamos soluciones tecnológicas complejas en Mecatrónica, Sistemas y Mecánica. 
              Del diseño conceptual a la implementación funcional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. ESPECIALIDADES (Las 3 Líneas - Diseño Tarjetas Interactivas) --- */}
      <section className="py-24 bg-[#111827] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Nuestras Áreas de Ingeniería</h2>
            <div className="h-1 w-20 bg-indigo-500 mt-4 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {specialties.map((spec) => (
              <div key={spec.id} className={`group relative p-8 rounded-3xl border ${spec.border} ${spec.bg} hover:bg-opacity-20 transition-all duration-300 overflow-hidden`}>
                
                {/* Icono Flotante */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 ${spec.color}`}>
                  {spec.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{spec.title}</h3>
                <p className="text-gray-400 mb-8 min-h-[50px]">{spec.desc}</p>

                {/* Lista de Servicios (Glassmorphism) */}
                <div className="space-y-3 bg-black/20 p-5 rounded-xl border border-white/5 backdrop-blur-sm">
                  {spec.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <ChevronRight size={16} className={spec.color} />
                      <span className="text-gray-300 text-sm font-medium">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Imagen de fondo sutil al hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10">
                   <img src={spec.img} alt={spec.title} className="w-full h-full object-cover grayscale" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. PORTAFOLIO DE PROYECTOS (Grid Masonry) --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-4">Proyectos Realizados</h2>
              <p className="text-gray-500 text-lg max-w-xl">
                Una selección de nuestros desarrollos más recientes, tanto finalizados como en etapa de prototipado.
              </p>
            </div>
            {/* Leyenda de Estados */}
            <div className="flex gap-4 text-sm font-medium">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Terminado</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> En Desarrollo</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 cursor-pointer"
                onClick={() => setSelectedImage(project.img)}
              >
                {/* Imagen con Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/600x400?text=Proyecto+Ingenieria'}} // Fallback
                  />
                  {/* Badge de Estado */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${
                    project.status === 'Terminado' ? 'bg-green-500' : 'bg-amber-500'
                  }`}>
                    {project.status === 'Terminado' ? <CheckCircle size={12} className="inline mr-1"/> : <Clock size={12} className="inline mr-1"/>}
                    {project.status}
                  </div>
                  {/* Overlay Hover */}
                  <div className="absolute inset-0 bg-indigo-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold border border-white px-4 py-2 rounded-full">Ver Detalles</span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-indigo-700 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {project.desc}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Evita abrir la imagen al dar clic al botón
                      openWhatsapp(`Hola, me interesa el proyecto: ${project.title}`);
                    }}
                    className="text-brand-dark font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Consultar similar <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. CTA CONTACTO (Estilo Ingeniería Full Width) --- */}
      <section className="py-24 bg-[#0B0F19] relative overflow-hidden text-center">
         {/* Decoración Circuito */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
         <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Desafíos Complejos, Soluciones Reales</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
               ¿Tienes un requerimiento de ingeniería específico? Cuéntanos tu problema y diseñaremos la solución técnica a medida.
            </p>
            <a 
              href="https://wa.me/51987564941?text=Hola%20InnovaLab%20Center,%20quiero%20información%20sobre%20Proyectos%20de%20Ingeniería."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 px-12 rounded-full shadow-2xl shadow-indigo-900/50 transition-all hover:scale-105"
            >
              <MessageCircle size={28} />
              Solicitar Información
            </a>
         </div>
      </section>

      {/* --- LIGHTBOX (Zoom de Imagen) --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2 bg-white/10 rounded-full"
              >
                <X size={24} />
              </button>
              <img 
                src={selectedImage} 
                alt="Zoom" 
                className="max-h-[85vh] rounded-lg shadow-2xl border border-white/10" 
                onError={(e) => {e.target.src = 'https://via.placeholder.com/800x600?text=Imagen+No+Encontrada'}}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Projects;