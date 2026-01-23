import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Bot, Cpu, Wifi, Radio, BatteryCharging, Check, X, MessageCircle, Download, ExternalLink, Maximize2, FileText, Eye, Settings, ChevronDown, Terminal, Binary, Radar } from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

// --- DATOS BASE (IMÁGENES VACÍAS) ---
const initialRoboticsCategories = [
  {
    id: 'kits',
    title: 'Kits Educativos',
    desc: 'Aprende haciendo. Nuestros kits están diseñados para introducir a niños y jóvenes en el mundo de la programación y la mecánica.',
    features: ['Robot Seguidor de Línea', 'Brazo Robótico Armable', 'Carro Evasor de Obstáculos'],
    images: []
  },
  {
    id: 'escolar',
    title: 'Proyectos Escolares',
    desc: 'Asesoría y desarrollo para ferias de ciencias. Proyectos funcionales, explicativos y visualmente impactantes.',
    features: ['Generadores de Energía', 'Maquetas Automatizadas', 'Sistemas Hidráulicos'],
    images: []
  },
  {
    id: 'universitario',
    title: 'Nivel Universitario',
    desc: 'Ingeniería avanzada. Desarrollamos prototipos complejos con lógica de control, visión artificial y mecánica de precisión.',
    features: ['Robot Sumo y Minisumo', 'Control PID y Lógica Difusa', 'Visión Artificial (Python)'],
    images: []
  },
  {
    id: 'iot',
    title: 'IoT y Automatización',
    desc: 'Internet de las Cosas. Controla dispositivos desde tu celular o crea sistemas de monitoreo con sensores avanzados.',
    features: ['Domótica con ESP32', 'Dashboards Web y App', 'Lectura de Sensores'],
    images: []
  }
];

const Robotics = () => {
  const [categoriesData, setCategoriesData] = useState(initialRoboticsCategories);
  const [activeCategoryId, setActiveCategoryId] = useState(initialRoboticsCategories[0].id);
  const [selectedImage, setSelectedImage] = useState(null);

  const activeCategory = categoriesData.find(c => c.id === activeCategoryId) || categoriesData[0];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const qCats = query(collection(db, "servicios_categorias"), where("serviceId", "==", "robotica"));
        const snapCats = await getDocs(qCats);
        const qImgs = query(collection(db, "servicios_galeria"), where("serviceId", "==", "robotica"));
        const snapImgs = await getDocs(qImgs);
        
        const newImagesMap = {};
        snapImgs.docs.forEach(doc => {
            const data = doc.data();
            if (!newImagesMap[data.categoryId]) newImagesMap[data.categoryId] = [];
            newImagesMap[data.categoryId].push({
                url: data.image,
                date: data.createdAt?.seconds || 0
            });
        });

        const fbCats = snapCats.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const mergedData = initialRoboticsCategories.map(staticCat => {
            // FUSIÓN INTELIGENTE POR TÍTULO
            const match = fbCats.find(fb => fb.title.trim().toLowerCase() === staticCat.title.trim().toLowerCase());
            
            if (match) {
                match._isMerged = true;
                return {
                    ...staticCat,
                    id: match.id, // REEMPLAZAR ID
                    title: match.title,
                    desc: match.desc,
                    features: match.features || staticCat.features,
                    images: newImagesMap[match.id] ? newImagesMap[match.id].sort((a,b)=>b.date-a.date).map(i=>i.url) : []
                };
            }
            return staticCat;
        });

        const newCats = fbCats.filter(fb => !fb._isMerged).map(fb => ({
            id: fb.id,
            title: fb.title,
            desc: fb.desc,
            features: fb.features || [],
            images: newImagesMap[fb.id] ? newImagesMap[fb.id].sort((a,b)=>b.date-a.date).map(i=>i.url) : []
        }));

        const finalData = [...mergedData, ...newCats];
        setCategoriesData(finalData);
        if (finalData.length > 0) setActiveCategoryId(finalData[0].id);

      } catch (error) {
        console.error("Error cargando robótica:", error);
      }
    };

    fetchGallery();
  }, []);

  // --- LÓGICA VISUAL ---
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const backgroundCheck = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.37), transparent 80%)`;
  const openWhatsapp = (topic) => window.open(`https://wa.me/51987564941?text=Hola InnovaLab, info sobre: ${topic}`, '_blank');

  return (
    <div className="font-sans bg-gray-50 min-h-screen relative overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      <style>{`
        @keyframes radar-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-radar { animation: radar-spin 8s linear infinite; }
        @keyframes glitch { 0% { text-shadow: 2px 2px 0px #0ea5e9, -2px -2px 0px #10b981; } 2% { text-shadow: -2px 2px 0px #0ea5e9, 2px -2px 0px #10b981; } 4% { text-shadow: 2px -2px 0px #0ea5e9, -2px 2px 0px #10b981; } 6% { text-shadow: none; } 100% { text-shadow: none; } }
        .glitch-text:hover { animation: glitch 2s infinite; }
        .dot-grid { background-image: radial-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px); background-size: 30px 30px; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>

      {/* HERO */}
      <section ref={heroRef} onMouseMove={handleMouseMove} className="relative min-h-screen flex flex-col justify-center items-center bg-[#020617] overflow-hidden pt-20 group">
        <div className="absolute inset-0 z-0 dot-grid opacity-30"></div>
        <motion.div className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-100" style={{ background: backgroundCheck }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-emerald-500/10 pointer-events-none z-0">
           <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-emerald-500/10 to-transparent animate-radar" style={{ maskImage: 'conic-gradient(from 0deg, transparent 0deg, black 360deg)' }}></div>
           <div className="absolute inset-20 border border-emerald-500/10 rounded-full"></div>
           <div className="absolute inset-40 border border-emerald-500/10 rounded-full border-dashed"></div>
           <div className="absolute inset-60 border border-emerald-500/20 rounded-full"></div>
        </div>
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex justify-center items-center gap-4 mb-8">
             <div className="h-[2px] w-8 bg-emerald-600"></div><div className="px-4 py-1.5 rounded border border-emerald-500/30 bg-[#020617]/80 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2 backdrop-blur-md"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> SYSTEM: ONLINE</div><div className="h-[2px] w-8 bg-emerald-600"></div>
          </motion.div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative inline-block py-6 px-10">
             <h1 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tight mb-4 glitch-text cursor-default"><span className="text-emerald-500 opacity-50 text-4xl md:text-7xl align-top mr-2">[</span>ROBÓTICA<span className="text-emerald-500 opacity-50 text-4xl md:text-7xl align-top ml-2">]</span></h1>
             <div className="flex items-center justify-center gap-4 mt-6"><span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500"></span><p className="text-cyan-400 font-mono text-sm md:text-lg tracking-[0.2em] uppercase">Automación • IoT • Inteligencia Artificial</p><span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500"></span></div>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">Donde el hardware se encuentra con la inteligencia. Desarrollamos la tecnología del futuro hoy.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 flex flex-wrap justify-center gap-5">
             <button onClick={() => openWhatsapp('Cotización Robótica')} className="group px-8 py-4 bg-emerald-600 text-white font-bold text-lg rounded-full hover:bg-emerald-500 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)]"><Terminal size={20} /> Iniciar Proyecto</button>
             <a href="#galeria" className="group px-8 py-4 border border-gray-700 text-gray-300 font-medium text-lg rounded-full hover:border-emerald-500 hover:text-emerald-400 transition-all backdrop-blur-sm flex items-center gap-2"><Settings size={20} className="group-hover:rotate-90 transition-transform duration-700"/> Ver Kits</a>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-emerald-500/50 flex flex-col items-center gap-2"><ChevronDown size={24} /></motion.div>
      </section>

      {/* TECNOLOGÍAS */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-900">Stack Tecnológico</h2><div className="w-16 h-1 bg-emerald-500 mx-auto mt-2"></div></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <TechCard icon={<Bot />} title="Arduino" desc="Microcontroladores para educación." color="text-teal-600" bg="bg-teal-50" border="border-teal-100" />
             <TechCard icon={<Wifi />} title="ESP32 / IoT" desc="Conectividad WiFi y Bluetooth." color="text-emerald-600" bg="bg-emerald-50" border="border-emerald-100" />
             <TechCard icon={<Radio />} title="Sensores" desc="Ultrasonido, temperatura, gas." color="text-yellow-600" bg="bg-yellow-50" border="border-yellow-100" />
             <TechCard icon={<Binary />} title="Python / C++" desc="Lógica de programación y control." color="text-slate-600" bg="bg-slate-100" border="border-slate-200" />
          </div>
        </div>
      </section>

      {/* GALERÍA DINÁMICA */}
      <section id="galeria" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-4xl font-bold text-brand-dark mb-4">Nuestras Áreas</h2><div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div></div>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 sticky top-24 z-10">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 space-y-2">
                {categoriesData.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategoryId(cat.id)} className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center justify-between group ${activeCategory?.id === cat.id ? 'bg-[#020617] text-white shadow-md border-l-4 border-emerald-500' : 'hover:bg-gray-100 text-gray-600'}`}>
                    <span className="font-bold">{cat.title}</span>{activeCategory?.id === cat.id && <Bot size={18} className="text-emerald-400" />}
                  </button>
                ))}
              </div>
              <div className="mt-6 bg-emerald-50/80 p-6 rounded-2xl border border-emerald-100 backdrop-blur-md">
                <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2"><BatteryCharging size={18}/> ¿Proyecto de Tesis?</h4>
                <p className="text-sm text-emerald-800/80 mb-4">Asesoramos tu proyecto universitario desde el diseño del circuito hasta la programación.</p>
                <button onClick={() => openWhatsapp('Asesoría Tesis')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg text-sm transition-colors shadow-lg shadow-emerald-200">Consultar Ahora</button>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-[700px] flex flex-col">
                  {activeCategory ? (
                    <>
                      <div className="mb-6 border-b border-gray-100 pb-6 shrink-0 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                          <div><h3 className="text-2xl font-bold text-gray-900 mb-1">{activeCategory.title}</h3><p className="text-gray-500 text-sm">{activeCategory.desc}</p></div>
                          <div className="flex gap-2 flex-wrap">
                            {activeCategory.features && activeCategory.features.map((feat, idx) => (<span key={idx} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Check size={10}/> {feat}</span>))}
                          </div>
                      </div>
                      <div className="overflow-y-auto custom-scrollbar pr-2 flex-grow">
                        {activeCategory.images.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                                <Bot size={48} className="mb-2"/>
                                <p>Galería vacía. El admin agregará fotos pronto.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
                                {activeCategory.images.map((imgSrc, idx) => (
                                <div key={idx} className="relative group rounded-xl overflow-hidden cursor-pointer h-40 md:h-48 bg-gray-100 border border-gray-200" onClick={() => setSelectedImage(imgSrc)}>
                                    <img src={imgSrc} alt="Proyecto" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e)=>{e.target.src='https://via.placeholder.com/300x300?text=InnovaLab'}}/>
                                    <div className="absolute inset-0 bg-emerald-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"><Eye /></div>
                                </div>
                                ))}
                            </div>
                        )}
                      </div>
                    </>
                  ) : <div className="h-full flex items-center justify-center text-gray-400">Selecciona una categoría</div>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF SECTION */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto bg-[#020617] rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 shadow-lg shadow-emerald-500/20">PORTAFOLIO 2025</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Catálogo de Kits & <br/> <span className="text-emerald-400">Proyectos</span></h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">Descarga el brochure completo con la lista de componentes, precios de kits educativos y temario de cursos.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/portafolio_robotica.pdf" download className="flex items-center justify-center gap-3 bg-white text-brand-dark font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1"><Download size={22} className="text-emerald-600" /> Descargar PDF</a>
                <a href="/portafolio_robotica.pdf" target="_blank" className="flex items-center justify-center gap-3 border border-gray-600 text-gray-300 font-bold py-4 px-8 rounded-xl hover:border-white hover:text-white transition-all"><ExternalLink size={22} /> Ver Online</a>
              </div>
            </div>
            <div className="relative group">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-gray-700 transform group-hover:scale-[1.02] transition-transform duration-500">
                <div className="bg-gray-900 rounded-t-xl px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
                  <div className="ml-4 bg-gray-800 px-3 py-1 rounded text-xs text-gray-400 flex items-center gap-2 w-full max-w-[200px]"><FileText size={10} /> portafolio_robotica.pdf</div>
                </div>
                <div className="bg-white h-[400px] w-full rounded-b-xl overflow-hidden relative">
                   <iframe src="/portafolio_robotica.pdf#toolbar=0" className="w-full h-full"><p>PDF no disponible</p></iframe>
                   <a href="/portafolio_robotica.pdf" target="_blank" className="absolute bottom-4 right-4 bg-black/80 text-white p-2 rounded-lg hover:bg-emerald-500 transition-colors backdrop-blur-sm"><Maximize2 size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="py-24 bg-[#020617] text-center relative overflow-hidden border-t border-gray-800">
         <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
         <div className="relative z-10 max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Tienes una idea en mente?</h2>
            <p className="text-gray-400 text-lg mb-10">Desde un robot seguidor de línea hasta un sistema de automatización industrial. Lo hacemos realidad.</p>
            <a href="https://wa.me/51987564941" target="_blank" className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"><MessageCircle size={24} /> Contactar Ingeniero</a>
         </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>{selectedImage && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md" onClick={() => setSelectedImage(null)}><div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}><button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2 bg-white/10 rounded-full"><X size={24} /></button><img src={selectedImage} alt="Zoom" className="max-h-[85vh] rounded shadow-2xl border border-white/10" onError={(e)=>{e.target.src='https://via.placeholder.com/800x600?text=No+Image'}} /></div></motion.div>)}</AnimatePresence>
    </div>
  );
};

const TechCard = ({ icon, title, desc, color, bg, border }) => (
  <div className={`p-6 rounded-xl border transition-all hover:shadow-lg hover:-translate-y-1 ${bg} ${border}`}>
    <div className={`w-12 h-12 rounded-lg bg-white flex items-center justify-center mb-4 ${color} shadow-sm`}>{icon}</div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default Robotics;