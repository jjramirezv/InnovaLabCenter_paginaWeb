import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Play, X, Cpu, Settings, Monitor, Zap, Database, ChevronDown, Award } from 'lucide-react';

// --- IMPORTS DE FIREBASE ---
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Quitamos orderBy para evitar errores de índice

// --- BASE DE DATOS ESTÁTICA (SOLO TEXTOS Y RECURSOS DE DISEÑO) ---
const contentDB = {
  mecatronica: {
    theme: 'purple',
    accentHex: '#a855f7',
    icon: <Cpu size={40} />,
    title: 'Ingeniería Mecatrónica',
    subtitle: 'Sinergia entre mecánica, electrónica y control inteligente.',
    desc: 'El corazón de la automatización. Desarrollamos sistemas autónomos, brazos robóticos industriales y soluciones de control avanzado.',
    stats: ['15+ Proyectos', '100% Automatizado', 'IA Integrada'],
    // Datos de respaldo por si Firebase está vacío
    fallbackProjects: [
      { id: 'f1', title: 'Brazo Clasificador IA', desc: 'Visión artificial para selección de frutos.', video: 'https://cdn.pixabay.com/video/2020/05/25/40139-424930032_large.mp4', tech: ['Python', 'Arduino', 'OpenCV'] },
    ],
    fallbackStudents: [
      { id: 's1', name: 'Juan Perez', role: 'Programación', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    ]
  },
  mecanica: {
    theme: 'blue',
    accentHex: '#3b82f6',
    icon: <Settings size={40} />,
    title: 'Ingeniería Mecánica',
    subtitle: 'Diseño, simulación y manufactura de maquinaria pesada.',
    desc: 'Donde la física se encuentra con la creación. Expertos en CAD/CAM, análisis de elementos finitos y construcción de estructuras.',
    stats: ['20+ Prototipos', 'Materiales Av.', 'Diseño CAD'],
    fallbackProjects: [
      { id: 'f3', title: 'Rover Todo Terreno', desc: 'Suspensión Rocker-Bogie en aluminio.', video: 'https://cdn.pixabay.com/video/2022/10/05/133606-757685603_large.mp4', tech: ['SolidWorks', 'CNC'] },
    ],
    fallbackStudents: [
      { id: 's3', name: 'Carlos Ruiz', role: 'Diseñador CAD', image: 'https://randomuser.me/api/portraits/men/22.jpg' },
    ]
  },
  sistemas: {
    theme: 'green',
    accentHex: '#10b981',
    icon: <Monitor size={40} />,
    title: 'Ingeniería de Sistemas',
    subtitle: 'Arquitectura de software, nube e Internet de las Cosas.',
    desc: 'El cerebro digital. Creamos ecosistemas conectados, desde aplicaciones móviles hasta dashboards industriales en tiempo real.',
    stats: ['Cloud Native', 'Seguridad', 'Big Data'],
    fallbackProjects: [
      { id: 'f5', title: 'Dashboard IoT', desc: 'Monitoreo de sensores en tiempo real.', video: 'https://cdn.pixabay.com/video/2020/04/18/36465-409633830_large.mp4', tech: ['React', 'NodeJS', 'MQTT'] },
    ],
    fallbackStudents: [
      { id: 's5', name: 'Luis Torres', role: 'Full Stack', image: 'https://randomuser.me/api/portraits/men/86.jpg' },
    ]
  }
};

const ProjectCategory = ({ type }) => {
  // Datos estáticos base (Textos, colores)
  const baseData = contentDB[type] || contentDB.mecatronica;
  
  // --- ESTADOS DINÁMICOS ---
  const [projects, setProjects] = useState(baseData.fallbackProjects);
  const [students, setStudents] = useState(baseData.fallbackStudents);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- FETCH FIREBASE ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Cargar Proyectos (Solo filtramos, ordenamos en JS después)
        const qProj = query(
            collection(db, "proyectos"), 
            where("category", "==", type)
        );
        const projSnap = await getDocs(qProj);
        
        // Convertimos y ordenamos manualmente por fecha (más reciente primero)
        const firebaseProjects = projSnap.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

        // 2. Cargar Estudiantes
        const qStud = query(
            collection(db, "estudiantes_area"), 
            where("category", "==", type)
        );
        const studSnap = await getDocs(qStud);
        
        // Convertimos y ordenamos manualmente
        const firebaseStudents = studSnap.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

        // LÓGICA DE REEMPLAZO: Si hay datos reales, úsalos.
        if (firebaseProjects.length > 0) setProjects(firebaseProjects);
        else setProjects(baseData.fallbackProjects);

        if (firebaseStudents.length > 0) setStudents(firebaseStudents);
        else setStudents(baseData.fallbackStudents);

      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]); 

  // --- LÓGICA SPOTLIGHT ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const backgroundCheck = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${baseData.accentHex}20, transparent 80%)`;

  return (
    <div className="font-sans bg-[#0B0F19] min-h-screen text-white">
      
      {/* --- 1. HERO --- */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative pt-40 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[85vh] group"
      >
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/90 via-[#0B0F19]/50 to-[#0B0F19] z-10"></div>
            <div className={`w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]`} style={{ backgroundColor: baseData.accentHex }}></div>
        </div>

        <motion.div className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-100" style={{ background: backgroundCheck }} />

        <div className="relative z-20 text-center px-6 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border bg-opacity-10 backdrop-blur-md mb-8 shadow-2xl" 
                     style={{ borderColor: `${baseData.accentHex}40`, backgroundColor: `${baseData.accentHex}10` }}>
                    <span style={{ color: baseData.accentHex }}>{baseData.icon}</span>
                    <span className="text-sm font-mono font-bold tracking-widest uppercase" style={{ color: baseData.accentHex }}>
                      Departamento de {type}
                    </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight mb-6 drop-shadow-2xl">
                    {baseData.title.replace('Ingeniería ', '')}
                </h1>
                
                <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-12">
                    {baseData.subtitle}
                </p>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/10 pt-8">
                    {baseData.stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <span className="text-2xl md:text-3xl font-bold" style={{ color: baseData.accentHex }}>{stat.split(' ')[0]}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-widest">{stat.split(' ').slice(1).join(' ')}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
        
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 text-gray-500">
           <ChevronDown />
        </motion.div>
      </section>

      {/* --- 2. DESCRIPCIÓN --- */}
      <section className="py-20 px-6 border-y border-white/5 bg-[#0f1420]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <div>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 rounded-full" style={{ backgroundColor: baseData.accentHex }}></span>
                    Enfoque del Área
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                      {baseData.desc}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <div className="mt-1" style={{ color: baseData.accentHex }}><Zap /></div>
                          <div>
                              <h4 className="font-bold text-white">Innovación Constante</h4>
                              <p className="text-sm text-gray-500">Investigación y desarrollo.</p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <div className="mt-1" style={{ color: baseData.accentHex }}><Database /></div>
                          <div>
                              <h4 className="font-bold text-white">Documentación Técnica</h4>
                              <p className="text-sm text-gray-500">Estándares industriales.</p>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <img 
                    src={`/images/${type}-main.jpg`} 
                    alt={type} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070'} 
                   />
                  <div className="absolute bottom-8 left-8 z-20">
                      <div className="text-5xl font-bold text-white/10 mb-2">01</div>
                      <h3 className="text-2xl font-bold text-white">Laboratorio Especializado</h3>
                  </div>
              </div>
          </div>
      </section>

      {/* --- 3. GALERÍA DE PROYECTOS --- */}
      <section className="py-24 px-6 bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                  <span className="font-mono text-sm tracking-widest uppercase" style={{ color: baseData.accentHex }}>Showcase</span>
                  <h2 className="text-4xl font-bold text-white mt-2">Proyectos Realizados</h2>
              </div>

              {loading ? (
                 <div className="text-center text-gray-500">Cargando proyectos...</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <motion.div 
                            key={project.id}
                            whileHover={{ y: -10 }}
                            className="group bg-[#161b22] border border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
                            onClick={() => setSelectedVideo(project.video)} // Abre el lightbox
                            style={{ borderColor: `${baseData.accentHex}20` }}
                        >
                            {/* --- DETECCIÓN DE VIDEO/IMAGEN --- */}
                            <div className="relative h-56 overflow-hidden bg-black">
                                {project.video && (project.video.includes('.mp4') || project.video.includes('video')) ? (
                                    <>
                                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 scale-75 group-hover:scale-100 transition-transform">
                                                <Play fill="white" size={20} className="ml-1"/>
                                            </div>
                                        </div>
                                        <video 
                                            src={project.video} 
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" 
                                            muted
                                            onMouseOver={e => e.target.play()}
                                            onMouseOut={e => e.target.pause()}
                                        />
                                        <div className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded text-white z-20 font-mono">VIDEO</div>
                                    </>
                                ) : (
                                    <>
                                        <img 
                                            src={project.video || 'https://via.placeholder.com/400x300'} 
                                            alt={project.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        />
                                    </>
                                )}
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.desc}</p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {project.tech && project.tech.map((t, i) => (
                                        <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 rounded border bg-opacity-10"
                                                style={{ borderColor: `${baseData.accentHex}40`, color: baseData.accentHex, backgroundColor: `${baseData.accentHex}10` }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
              )}
          </div>
      </section>

      {/* --- 4. EQUIPO DE ESTUDIANTES --- */}
      <section className="py-20 px-6 bg-[#0f1420] border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(${baseData.accentHex} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Talento InnovaLab <span style={{ color: baseData.accentHex }}>{type}</span></h2>
              
              <div className="flex flex-wrap justify-center gap-8">
                  {students.map((student, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-4 bg-[#161b22] p-4 pr-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors shadow-lg min-w-[280px]"
                      >
                          <div className="relative">
                            <img src={student.image} alt={student.name} className="w-16 h-16 rounded-full object-cover border-2" 
                                 style={{ borderColor: baseData.accentHex }}
                                 onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=User'}/>
                            <div className="absolute -bottom-1 -right-1 bg-[#0B0F19] rounded-full p-1 border border-white/10">
                                <Award size={12} style={{ color: baseData.accentHex }} />
                            </div>
                          </div>
                          <div>
                              <h4 className="text-white font-bold">{student.name}</h4>
                              <p className="text-xs font-mono uppercase tracking-wide opacity-70" style={{ color: baseData.accentHex }}>{student.role}</p>
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
              
              {selectedVideo.includes('.mp4') || selectedVideo.includes('video') ? (
                  <video src={selectedVideo} controls autoPlay className="w-full h-full object-contain" />
              ) : (
                  <img src={selectedVideo} className="w-full h-full object-contain" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProjectCategory; 