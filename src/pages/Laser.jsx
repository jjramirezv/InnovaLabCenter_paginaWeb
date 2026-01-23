import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Zap, Box, Layers, Tag, Layout, Scissors, MessageCircle, Download, Check, X, Eye, FileText, Maximize2, ExternalLink, ChevronDown } from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

// --- DATOS BASE (VACÍOS DE IMÁGENES) ---
const initialLaserCategories = [
  {
    id: 'llaveros',
    title: 'Llaveros Personalizados',
    desc: 'El souvenir perfecto. Grabamos logotipos, nombres o fechas especiales en MDF, acrílico o madera.',
    features: ['Recuerdos para eventos', 'Merchandising económico', 'Diseños calados o grabados'],
    images: [] 
  },
  {
    id: 'placas',
    title: 'Placas y Letreros',
    desc: 'Señalética corporativa y trofeos. Acabados elegantes en acrílico y bicapa para oficinas y premiaciones.',
    features: ['Señalética de oficinas', 'Reconocimientos y Trofeos', 'Letreros con luz LED (Neón)'],
    images: []
  },
  {
    id: 'nombres',
    title: 'Nombres y Letras 3D',
    desc: 'Decoración para eventos y habitaciones. Letras volumétricas en MDF o poliestireno pintado.',
    features: ['Nombres para Candy Bar', 'Letras gigantes para bodas', 'Decoración infantil'],
    images: []
  },
  {
    id: 'decoracion',
    title: 'Decoración y Hogar',
    desc: 'Cuadros calados, lámparas geométricas y organizadores de escritorio con diseño milimétrico.',
    features: ['Mandalas y Cuadros', 'Lámparas modernas', 'Organizadores y Cajas'],
    images: []
  },
  {
    id: 'empresas',
    title: 'Producción para Empresas', 
    desc: 'Corte masivo para grandes pedidos. Optimizamos material para reducir costos en tu producción.',
    features: ['Maquila de productos', 'Corte de piezas para ensamble', 'Grabado de marca en productos'],
    images: []
  }
];

const Laser = () => {
  const [categoriesData, setCategoriesData] = useState(initialLaserCategories);
  const [activeCategoryId, setActiveCategoryId] = useState(initialLaserCategories[0].id);
  const [selectedImage, setSelectedImage] = useState(null);

  const activeCategory = categoriesData.find(c => c.id === activeCategoryId) || categoriesData[0];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const qCats = query(collection(db, "servicios_categorias"), where("serviceId", "==", "laser"));
        const snapCats = await getDocs(qCats);
        const qImgs = query(collection(db, "servicios_galeria"), where("serviceId", "==", "laser"));
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

        // --- FUSIÓN ROBUSTA ---
        const mergedData = initialLaserCategories.map(staticCat => {
            const match = fbCats.find(fb => {
                const t1 = fb.title.toLowerCase().replace('para ', '').trim();
                const t2 = staticCat.title.toLowerCase().replace('para ', '').trim();
                return t1 === t2;
            });
            
            if (match) {
                match._isMerged = true;
                return {
                    ...staticCat,
                    id: match.id, 
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

        setCategoriesData([...mergedData, ...newCats]);

      } catch (error) {
        console.error("Error cargando Laser:", error);
      }
    };

    fetchGallery();
  }, []);

  // --- LÓGICA VISUAL ---
  const heroRef = useRef(null);
  
  // Usamos Spring para que el láser tenga un ligero retraso "mecánico" y se sienta más real
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // El brillo de fondo que pediste mantener
  const backgroundCheck = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(249, 116, 22, 0.30), transparent 80%)`;
  
  const openWhatsapp = (topic) => window.open(`https://wa.me/51987564941?text=Info Laser: ${topic}`, '_blank');

  return (
    <div className="font-sans bg-gray-50 min-h-screen relative overflow-x-hidden selection:bg-orange-500 selection:text-white">
      <style>{`
        /* Animación para la "chispa" alrededor del cursor láser */
        @keyframes spark-spin { 
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); opacity: 0.8; } 
          50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.2); opacity: 0.4; } 
          100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); opacity: 0.8; } 
        }
        
        .iso-grid-orange { background-image: linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px); background-size: 40px 40px; transform: perspective(500px) rotateX(60deg); transform-origin: center top; opacity: 0.2; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>
      
      {/* HERO SECTION - AQUÍ ESTÁ EL CAMBIO DEL CURSOR LÁSER */}
      <section 
        ref={heroRef} 
        onMouseMove={handleMouseMove} 
        className="relative min-h-screen flex flex-col justify-center items-center bg-[#0B0F19] overflow-hidden pt-20 cursor-none" // <-- cursor-none oculta el mouse normal
      >
        {/* EL CURSOR LÁSER PERSONALIZADO */}
        <motion.div 
            className="pointer-events-none fixed z-50 mix-blend-screen hidden lg:block"
            style={{ left: smoothX, top: smoothY, position: 'absolute' }}
        >
            {/* Núcleo del láser (punto blanco brillante) */}
            <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_3px_#f97316] absolute -translate-x-1/2 -translate-y-1/2"></div>
            {/* Anillo de energía/chispa rotatoria */}
            <div className="w-8 h-8 border-2 border-dashed border-orange-500 rounded-full absolute -translate-x-1/2 -translate-y-1/2 animate-[spark-spin_2s_linear_infinite]"></div>
            {/* Haz de luz vertical (opcional, para efecto de cabezal) */}
            <div className="w-[1px] h-[1000px] bg-gradient-to-t from-orange-500/0 via-orange-500/20 to-orange-500/0 absolute bottom-0 left-0 -translate-x-1/2 pointer-events-none"></div>
        </motion.div>

        <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden"><div className="iso-grid-orange w-[200vw] h-[200vh] absolute top-1/2 -left-1/2"></div></div>
        
        {/* Tu brillo de fondo original */}
        <motion.div className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-100" style={{ background: backgroundCheck }} />
        
        <div className="absolute top-1/4 left-[10%] w-32 h-32 border border-dashed border-orange-500/20 rounded-full hidden lg:block animate-spin-slow"></div>
        <div className="absolute bottom-1/4 right-[10%] w-24 h-24 border border-red-500/20 rotate-45 hidden lg:block"></div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex justify-center items-center gap-4 mb-8">
             <div className="h-[1px] w-12 bg-gray-700"></div><div className="px-3 py-1 rounded border border-orange-500/30 bg-orange-500/5 text-orange-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2"><Zap size={14} /> Corte CNC & Grabado</div><div className="h-[1px] w-12 bg-gray-700"></div>
          </motion.div>
          
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative inline-block py-10 px-8 md:px-16">
             {/* Eliminada la animación cuadrada laser-head antigua */}
             <div className="absolute inset-0 border border-white/5 bg-[#0B0F19]/50 backdrop-blur-sm -z-10"></div>
             <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-none tracking-tight mb-4 drop-shadow-2xl">CORTE <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-red-600">LÁSER</span></h1>
             <p className="text-gray-300 font-bold text-sm md:text-lg tracking-[0.2em] uppercase">MDF • Acrílico • Cuero</p>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">Tecnología CO2 para cortes limpios y grabados detallados. Transformamos tus vectores digitales en productos físicos al instante.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-10 flex flex-wrap justify-center gap-4">
             {/* Botones con cursor-pointer explicito para reactivar interaccion visual */}
             <button onClick={() => openWhatsapp('Cotización Láser')} className="cursor-pointer group px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-xl hover:bg-white hover:text-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20 relative z-30"><Scissors size={20} /> Cotizar Corte</button>
             <a href="#galeria" className="cursor-pointer group px-8 py-4 border border-gray-600 text-white font-medium text-lg rounded-xl hover:border-orange-500 hover:text-orange-500 transition-all backdrop-blur-sm relative z-30">Ver Galería</a>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"><span className="text-[10px] uppercase tracking-widest font-bold">Explorar</span><ChevronDown size={20} /></motion.div>
      </section>

      {/* MATERIALES */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10"><h2 className="text-2xl font-bold text-brand-dark">Materiales Aptos</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <MaterialCard icon={<Box />} title="MDF / Madera" desc="Maquetas y decoración." color="text-amber-700" bg="bg-amber-50" />
             <MaterialCard icon={<Layers />} title="Acrílico" desc="Letreros y llaveros brillantes." color="text-blue-600" bg="bg-blue-50" />
             <MaterialCard icon={<Tag />} title="Cuero" desc="Grabado para marroquinería." color="text-orange-800" bg="bg-orange-50" />
             <MaterialCard icon={<Layout />} title="Cartón/Papel" desc="Prototipado rápido." color="text-gray-600" bg="bg-gray-100" />
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-4xl font-bold text-brand-dark mb-4">Nuestros Productos</h2><div className="h-1 w-20 bg-brand-accent mx-auto"></div></div>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 sticky top-24 z-10">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 space-y-2">
                {categoriesData.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategoryId(cat.id)} className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center justify-between group ${activeCategory?.id === cat.id ? 'bg-brand-dark text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}>
                    <span className="font-bold">{cat.title}</span>{activeCategory?.id === cat.id && <Zap size={18} className="text-brand-accent" />}
                  </button>
                ))}
              </div>
              <div className="mt-6 bg-orange-50 rounded-2xl p-6 border border-orange-100 hidden lg:block">
                <h4 className="font-bold text-orange-800 mb-2">¿Diseño Propio?</h4>
                <p className="text-sm text-orange-700/80 mb-4">Si tienes tu archivo vectorial (.dxf, .ai, .cdr), lo cotizamos al instante.</p>
                <button onClick={() => openWhatsapp('Tengo archivo vectorial')} className="w-full bg-orange-200 hover:bg-orange-300 text-orange-900 font-bold py-2 rounded-lg text-sm transition-colors">Enviar Archivo</button>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-[700px] flex flex-col">
                  {activeCategory ? (
                    <>
                      <div className="mb-6 border-b border-gray-100 pb-6 shrink-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div><h3 className="text-3xl font-bold text-brand-dark mb-2">{activeCategory.title}</h3><p className="text-gray-600 text-sm">{activeCategory.desc}</p></div>
                            <button onClick={() => openWhatsapp(activeCategory.title)} className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 shrink-0"><Scissors size={18} /> Cotizar</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {activeCategory.features && activeCategory.features.map((feat, idx) => (<span key={idx} className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold"><Check size={12} className="text-brand-accent" /> {feat}</span>))}
                        </div>
                      </div>
                      <div className="overflow-y-auto custom-scrollbar pr-2 flex-grow">
                        {activeCategory.images.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                                <Layers size={48} className="mb-2"/>
                                <p>Galería vacía. El admin agregará fotos pronto.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
                                {activeCategory.images.map((imgSrc, idx) => (
                                <div key={idx} className="relative group rounded-xl overflow-hidden cursor-pointer h-40 md:h-48 shadow-sm border border-gray-100" onClick={() => setSelectedImage(imgSrc)}>
                                    <img src={imgSrc} alt="Laser Work" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e)=>{e.target.src='https://via.placeholder.com/300x300?text=InnovaLab'}}/>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Eye className="text-white" size={32} /></div>
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
        <div className="max-w-7xl mx-auto bg-[#1a1825] rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 shadow-lg shadow-orange-500/20">RECURSO GRATUITO</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Catálogo de Productos <br/> <span className="text-orange-500">Láser 2025</span></h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">Descubre nuestra colección completa de merchandising, trofeos y decoración.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/catalogo_laser.pdf" download="Catalogo_Laser_InnovaLab" className="flex items-center justify-center gap-3 bg-white text-brand-dark font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1"><Download size={22} className="text-orange-600" /> Descargar PDF</a>
                <a href="/catalogo_laser.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 border border-gray-600 text-gray-300 font-bold py-4 px-8 rounded-xl hover:border-white hover:text-white transition-all"><ExternalLink size={22} /> Ver Online</a>
              </div>
            </div>
            <div className="relative group">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-gray-700 transform group-hover:scale-[1.02] transition-transform duration-500">
                <div className="bg-gray-900 rounded-t-xl px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
                  <div className="ml-4 bg-gray-800 px-3 py-1 rounded text-xs text-gray-400 flex items-center gap-2 w-full max-w-[200px]"><FileText size={10} /> catalogo_laser_2025.pdf</div>
                </div>
                <div className="bg-white h-[400px] w-full rounded-b-xl overflow-hidden relative">
                   <iframe src="/catalogo_laser.pdf#toolbar=0" title="Visor Catálogo" className="w-full h-full"><div className="flex flex-col items-center justify-center h-full text-gray-500"><FileText size={48} className="mb-2" /><p>Tu navegador no soporta la previsualización.</p></div></iframe>
                   <a href="/catalogo_laser.pdf" target="_blank" className="absolute bottom-4 right-4 bg-black/80 text-white p-2 rounded-lg hover:bg-orange-500 transition-colors backdrop-blur-sm" title="Ver pantalla completa"><Maximize2 size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="py-24 bg-[#1a1825] relative overflow-hidden text-center border-t border-gray-800">
         <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
         <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Producción Urgente?</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">Atendemos pedidos corporativos y urgencias. Cuéntanos tu proyecto y te cotizamos al instante.</p>
            <a href="https://wa.me/51987564941?text=Hola%20InnovaLab%20Center,%20quiero%20información%20sobre%20Corte%20Láser." target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-5 px-12 rounded-full shadow-2xl shadow-green-900/30 transition-all hover:scale-105"><MessageCircle size={28} /> Solicitar Cotización</a>
         </div>
      </section>
      <AnimatePresence>{selectedImage && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md" onClick={() => setSelectedImage(null)}><div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}><button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2 bg-white/10 rounded-full"><X size={24} /></button><img src={selectedImage} alt="Zoom" className="max-h-[85vh] rounded-lg shadow-2xl border border-white/10" onError={(e)=>{e.target.src='https://via.placeholder.com/800x600?text=No+Image'}} /></div></motion.div>)}</AnimatePresence>
    </div>
  );
};
const MaterialCard = ({ icon, title, desc, color, bg }) => (
  <div className={`p-6 rounded-xl border border-gray-100 transition-shadow hover:shadow-lg ${bg}`}>
    <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 ${color} shadow-sm`}>{icon}</div>
    <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

export default Laser;