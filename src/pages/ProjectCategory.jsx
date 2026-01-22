import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Play, X, Cpu, Settings, Monitor, Zap, Database, Globe, ChevronDown, Award } from 'lucide-react';

// --- BASE DE DATOS DE CONTENIDO ---
// Aquí configuras todo el contenido de las 3 páginas
const contentDB = {
  mecatronica: {
    theme: 'purple',
    accentHex: '#a855f7', // Color para estilos inline
    icon: <Cpu size={40} />,
    title: 'Ingeniería Mecatrónica',
    subtitle: 'Sinergia entre mecánica, electrónica y control inteligente.',
    desc: 'El corazón de la automatización. Desarrollamos sistemas autónomos, brazos robóticos industriales y soluciones de control avanzado.',
    heroVideo: '/videos/hero-mecatronica.mp4', 
    stats: ['15+ Proyectos', '100% Automatizado', 'IA Integrada'],
    projects: [
      { id: 1, title: 'Brazo Clasificador IA', desc: 'Visión artificial para selección de frutos.', video: '/videos/proy-brazo.mp4', tech: ['Python', 'Arduino', 'OpenCV'] },
      { id: 2, title: 'Robot Sumo Autónomo', desc: 'Algoritmos de ataque y evasión.', video: '/videos/proy-sumo.mp4', tech: ['C++', 'Sensores IR'] },
      { id: 3, title: 'Faja Transportadora', desc: 'Control PID de velocidad variable.', video: '/videos/proy-faja.mp4', tech: ['PLC', 'HMI'] },
    ],
    students: [
      { name: 'Juan Perez', role: 'Programación', img: '/images/student1.jpg' },
      { name: 'Maria Lopez', role: 'Diseño Electrónico', img: '/images/student2.jpg' },
      { name: 'Pedro Díaz', role: 'Control', img: '/images/student3.jpg' },
    ]
  },
  mecanica: {
    theme: 'blue',
    accentHex: '#3b82f6',
    icon: <Settings size={40} />,
    title: 'Ingeniería Mecánica',
    subtitle: 'Diseño, simulación y manufactura de maquinaria pesada.',
    desc: 'Donde la física se encuentra con la creación. Expertos en CAD/CAM, análisis de elementos finitos y construcción de estructuras.',
    heroVideo: '/videos/hero-mecanica.mp4',
    stats: ['20+ Prototipos', 'Materiales Av.', 'Diseño CAD'],
    projects: [
      { id: 1, title: 'Rover Todo Terreno', desc: 'Suspensión Rocker-Bogie en aluminio.', video: '/videos/proy-rover.mp4', tech: ['SolidWorks', 'CNC'] },
      { id: 2, title: 'Molino Automatizado', desc: 'Rediseño de transmisión de potencia.', video: '/videos/proy-molino.mp4', tech: ['Torneado', 'Soldadura'] },
      { id: 3, title: 'Chasis de Competición', desc: 'Aerodinámica y reducción de peso.', video: '/videos/proy-chasis.mp4', tech: ['Fibra de Carbono'] },
    ],
    students: [
      { name: 'Carlos Ruiz', role: 'Diseñador CAD', img: '/images/student4.jpg' },
      { name: 'Ana Soria', role: 'Jefa de Taller', img: '/images/student5.jpg' },
      { name: 'Miguel Torres', role: 'Simulación', img: '/images/student6.jpg' },
    ]
  },
  sistemas: {
    theme: 'green',
    accentHex: '#10b981', // Emerald
    icon: <Monitor size={40} />,
    title: 'Ingeniería de Sistemas',
    subtitle: 'Arquitectura de software, nube e Internet de las Cosas.',
    desc: 'El cerebro digital. Creamos ecosistemas conectados, desde aplicaciones móviles hasta dashboards industriales en tiempo real.',
    heroVideo: '/videos/hero-sistemas.mp4',
    stats: ['Cloud Native', 'Seguridad', 'Big Data'],
    projects: [
      { id: 1, title: 'Dashboard IoT', desc: 'Monitoreo de sensores en tiempo real.', video: '/videos/proy-dashboard.mp4', tech: ['React', 'NodeJS', 'MQTT'] },
      { id: 2, title: 'App de Domótica', desc: 'Control de hogar inteligente.', video: '/videos/proy-app.mp4', tech: ['Flutter', 'Firebase'] },
      { id: 3, title: 'Sistema de Ventas', desc: 'ERP completo con facturación.', video: '/videos/proy-erp.mp4', tech: ['Python', 'PostgreSQL'] },
    ],
    students: [
      { name: 'Luis Torres', role: 'Full Stack', img: '/images/student7.jpg' },
      { name: 'Sofia M.', role: 'DevOps', img: '/images/student8.jpg' },
      { name: 'Jorge L.', role: 'Backend', img: '/images/student9.jpg' },
    ]
  }
};

const ProjectCategory = ({ type }) => {
  const data = contentDB[type] || contentDB.mecatronica; // Fallback por seguridad
  const [selectedVideo, setSelectedVideo] = useState(null);

  // --- LÓGICA SPOTLIGHT ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const backgroundCheck = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${data.accentHex}20, transparent 80%)`;

  return (
    <div className="font-sans bg-[#0B0F19] min-h-screen text-white">
      
      {/* --- 1. HERO CINEMATOGRÁFICO --- */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative pt-40 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[85vh] group"
      >
        {/* Video de Fondo */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/90 via-[#0B0F19]/50 to-[#0B0F19] z-10"></div>
            {/* Placeholder si no hay video real */}
            <div className="w-full h-full bg-gray-900 object-cover opacity-40">
               {/* <video src={data.heroVideo} autoPlay loop muted className="w-full h-full object-cover" /> */}
               {/* Simulación visual para el ejemplo: */}
               <div className={`w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]`} style={{ backgroundColor: data.accentHex }}></div>
            </div>
        </div>

        {/* Spotlight */}
        <motion.div className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-100" style={{ background: backgroundCheck }} />

        <div className="relative z-20 text-center px-6 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                
                {/* Badge del Departamento */}
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border bg-opacity-10 backdrop-blur-md mb-8 shadow-2xl" 
                     style={{ borderColor: `${data.accentHex}40`, backgroundColor: `${data.accentHex}10` }}>
                    <span style={{ color: data.accentHex }}>{data.icon}</span>
                    <span className="text-sm font-mono font-bold tracking-widest uppercase" style={{ color: data.accentHex }}>
                      Departamento de {type}
                    </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight mb-6 drop-shadow-2xl">
                    {data.title.replace('Ingeniería ', '')}
                </h1>
                
                <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-12">
                    {data.subtitle}
                </p>

                {/* Estadísticas Rápidas */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/10 pt-8">
                    {data.stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <span className="text-2xl md:text-3xl font-bold" style={{ color: data.accentHex }}>{stat.split(' ')[0]}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-widest">{stat.split(' ').slice(1).join(' ')}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 text-gray-500">
           <ChevronDown />
        </motion.div>
      </section>

      {/* --- 2. DESCRIPCIÓN & DETALLES --- */}
      <section className="py-20 px-6 border-y border-white/5 bg-[#0f1420]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <div>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 rounded-full" style={{ backgroundColor: data.accentHex }}></span>
                    Enfoque del Área
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                      {data.desc} En InnovaLab Center, nuestros estudiantes de {type} no solo aprenden teoría; 
                      construyen el futuro. Utilizamos herramientas de última generación y metodologías ágiles para resolver problemas reales.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <div className="mt-1" style={{ color: data.accentHex }}><Zap /></div>
                          <div>
                              <h4 className="font-bold text-white">Innovación Constante</h4>
                              <p className="text-sm text-gray-500">Investigación y desarrollo de nuevas tecnologías.</p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <div className="mt-1" style={{ color: data.accentHex }}><Database /></div>
                          <div>
                              <h4 className="font-bold text-white">Documentación Técnica</h4>
                              <p className="text-sm text-gray-500">Estándares industriales en cada proyecto.</p>
                          </div>
                      </div>
                  </div>
              </div>
              
              {/* Imagen Decorativa */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <img src={`/images/${type}-main.jpg`} alt={type} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                       onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070'} />
                  
                  <div className="absolute bottom-8 left-8 z-20">
                      <div className="text-5xl font-bold text-white/10 mb-2">01</div>
                      <h3 className="text-2xl font-bold text-white">Laboratorio Especializado</h3>
                  </div>
              </div>
          </div>
      </section>

      {/* --- 3. GALERÍA DE PROYECTOS (VIDEOS) --- */}
      <section className="py-24 px-6 bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                  <span className="font-mono text-sm tracking-widest uppercase" style={{ color: data.accentHex }}>Showcase</span>
                  <h2 className="text-4xl font-bold text-white mt-2">Proyectos Realizados</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data.projects.map((project) => (
                      <motion.div 
                          key={project.id}
                          whileHover={{ y: -10 }}
                          className="group bg-[#161b22] border border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
                          onClick={() => setSelectedVideo(project.video)}
                          style={{ borderColor: `${data.accentHex}20` }}
                      >
                          {/* Video Thumbnail */}
                          <div className="relative h-56 overflow-hidden bg-black">
                              {/* Overlay de Play */}
                              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 scale-75 group-hover:scale-100 transition-transform">
                                      <Play fill="white" size={20} className="ml-1"/>
                                  </div>
                              </div>
                              
                              <img src="/images/video-placeholder.jpg" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" 
                                   onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=Video+Preview'}} />
                              
                              <div className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded text-white z-20 font-mono">DEMO</div>
                          </div>
                          
                          <div className="p-6">
                              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                {project.title}
                              </h3>
                              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.desc}</p>
                              
                              <div className="flex flex-wrap gap-2">
                                  {project.tech.map((t, i) => (
                                      <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 rounded border bg-opacity-10"
                                            style={{ borderColor: `${data.accentHex}40`, color: data.accentHex, backgroundColor: `${data.accentHex}10` }}>
                                          {t}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- 4. EQUIPO DE ESTUDIANTES --- */}
      <section className="py-20 px-6 bg-[#0f1420] border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(${data.accentHex} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Talento InnovaLab <span style={{ color: data.accentHex }}>{type}</span></h2>
              
              <div className="flex flex-wrap justify-center gap-8">
                  {data.students.map((student, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-4 bg-[#161b22] p-4 pr-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors shadow-lg min-w-[280px]"
                      >
                          <div className="relative">
                            <img src={student.img} alt={student.name} className="w-16 h-16 rounded-full object-cover border-2" 
                                 style={{ borderColor: data.accentHex }}
                                 onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=User'}/>
                            <div className="absolute -bottom-1 -right-1 bg-[#0B0F19] rounded-full p-1 border border-white/10">
                                <Award size={12} style={{ color: data.accentHex }} />
                            </div>
                          </div>
                          <div>
                              <h4 className="text-white font-bold">{student.name}</h4>
                              <p className="text-xs font-mono uppercase tracking-wide opacity-70" style={{ color: data.accentHex }}>{student.role}</p>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- LIGHTBOX VIDEO --- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md" onClick={() => setSelectedVideo(null)}>
            <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-10 text-white bg-black/50 p-2 rounded-full hover:bg-white/20"><X size={24} /></button>
              {/* Aquí va el video real */}
              <video src={selectedVideo} controls autoPlay className="w-full h-full object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProjectCategory;