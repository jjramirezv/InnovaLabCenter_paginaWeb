import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Box, Zap, Check, X, MessageCircle, Download, Layers, Eye, Printer, Scan, ChevronDown, FileText, Maximize2, ExternalLink } from 'lucide-react';

// --- FIREBASE ---
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

// --- DATOS BASE (IMÁGENES VACÍAS PARA QUE SOLO SALGA LO TUYO) ---
const initialCategoriesData = [
  {
    id: 'personalizado',
    title: 'Objetos Personalizados',
    desc: 'Materializa tus ideas más creativas. Ideal para regalos únicos, merchandising de empresas o accesorios de moda exclusivos.',
    features: ['Personajes y Mascotas', 'Llaveros y Logos', 'Accesorios Cosplay'],
    images: [] // Vacio: Se llenará desde el Admin
  },
  {
    id: 'figuras',
    title: 'Figuras de Colección',
    desc: 'Alta resolución para coleccionistas. Utilizamos impresoras de Resina 8K para capturar hasta el más mínimo detalle.',
    features: ['Anime y Videojuegos', 'Bustos y Estatuillas', 'Art Toys'],
    images: []
  },
  {
    id: 'moldes',
    title: 'Moldes Industriales',
    desc: 'Herramientas precisas para replicar tus productos. Diseñamos el negativo perfecto para tu producción en serie.',
    features: ['Moldes para Jabones', 'Matrices Chocolatería', 'Moldes para Concreto'],
    images: []
  },
  {
    id: 'repuestos',
    title: 'Repuestos Técnicos',
    desc: 'No tires tus equipos por una pieza rota. Diseñamos y fabricamos repuestos descontinuados de alta resistencia.',
    features: ['Engranajes', 'Soportes', 'Piezas Automotrices'],
    images: []
  },
  {
    id: 'prototipos',
    title: 'Prototipos de Ingeniería',
    desc: 'Valida forma, ajuste y función. Acelera tu proceso de desarrollo de producto con iteraciones rápidas.',
    features: ['Validación Diseño', 'Carcasas IoT', 'Mecanismos'],
    images: []
  },
  {
    id: 'salud',
    title: 'Sector Biomédico',
    desc: 'Soluciones biomédicas personalizadas. Apoyo tecnológico para médicos y pacientes.',
    features: ['Prótesis Mecánicas', 'Guías Quirúrgicas', 'Modelos Anatómicos'],
    images: []
  }
];

const Print3D = () => {
  // ESTADOS
  const [categoriesData, setCategoriesData] = useState(initialCategoriesData);
  const [activeCategoryId, setActiveCategoryId] = useState(initialCategoriesData[0].id);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Derivamos la categoría activa
  const activeCategory = categoriesData.find(c => c.id === activeCategoryId) || categoriesData[0];

  // --- CARGAR Y FUSIONAR DATOS ---
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // 1. Obtener Categorías del Admin
        const qCats = query(collection(db, "servicios_categorias"), where("serviceId", "==", "print3d"));
        const snapCats = await getDocs(qCats);
        
        // 2. Obtener Imágenes del Admin (Sin orderBy para evitar error)
        const qImgs = query(collection(db, "servicios_galeria"), where("serviceId", "==", "print3d"));
        const snapImgs = await getDocs(qImgs);
        
        // --- PROCESAMIENTO ---
        
        // A. Mapear imágenes por CategoryID
        const newImagesMap = {};
        snapImgs.docs.forEach(doc => {
            const data = doc.data();
            if (!newImagesMap[data.categoryId]) newImagesMap[data.categoryId] = [];
            newImagesMap[data.categoryId].push({
                url: data.image,
                date: data.createdAt?.seconds || 0
            });
        });

        // B. Extraer datos de categorías de Firebase
        const fbCats = snapCats.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // C. FUSIÓN INTELIGENTE (Anti-Duplicados)
        const mergedData = initialCategoriesData.map(staticCat => {
            // Buscamos coincidencia por TÍTULO
            const match = fbCats.find(fb => fb.title.trim().toLowerCase() === staticCat.title.trim().toLowerCase());
            
            if (match) {
                match._isMerged = true; // Marcamos para no duplicar luego
                
                // Usamos el ID de Firebase para conectar con las fotos
                return {
                    ...staticCat,
                    id: match.id, 
                    title: match.title,
                    desc: match.desc,
                    features: match.features || staticCat.features,
                    // Usamos SOLO las fotos de Firebase (ordenadas por fecha)
                    images: newImagesMap[match.id] ? newImagesMap[match.id].sort((a,b)=>b.date-a.date).map(i=>i.url) : []
                };
            }
            return staticCat;
        });

        // D. Agregar categorías NUEVAS (creadas en Admin que no existen en estático)
        const newCats = fbCats.filter(fb => !fb._isMerged).map(fb => ({
            id: fb.id,
            title: fb.title,
            desc: fb.desc,
            features: fb.features || [],
            images: newImagesMap[fb.id] ? newImagesMap[fb.id].sort((a,b)=>b.date-a.date).map(i=>i.url) : []
        }));

        const finalData = [...mergedData, ...newCats];
        setCategoriesData(finalData);
        
        // Asegurar que haya una categoría activa válida
        if (!finalData.find(c => c.id === activeCategoryId)) {
            setActiveCategoryId(finalData[0].id);
        }

      } catch (error) {
        console.error("Error cargando 3D:", error);
      } finally {
        setLoading(false);
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
  const backgroundCheck = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.15), transparent 80%)`;
  const openWhatsapp = (topic) => window.open(`https://wa.me/51987564941?text=Hola InnovaLab, info sobre: ${topic}`, '_blank');

  return (
    <div className="font-sans bg-gray-50 min-h-screen relative overflow-x-hidden selection:bg-cyan-600 selection:text-white">
      
      <style>{`
        @keyframes scan-laser { 0%, 100% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan { animation: scan-laser 4s linear infinite; }
        .iso-grid { background-image: linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px); background-size: 40px 40px; transform: perspective(500px) rotateX(60deg); transform-origin: center top; opacity: 0.3; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>

      {/* HERO SECTION */}
      <section ref={heroRef} onMouseMove={handleMouseMove} className="relative min-h-screen flex flex-col justify-center items-center bg-[#0B0F19] overflow-hidden pt-20">
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden"><div className="iso-grid w-[200vw] h-[200vh] absolute top-1/2 -left-1/2"></div></div>
        <motion.div className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-100" style={{ background: backgroundCheck }} />
        <div className="absolute inset-0 z-0 pointer-events-none"><div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-[2px] animate-scan absolute shadow-[0_0_20px_#22d3ee]"></div></div>
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex justify-center items-center gap-4 mb-8">
             <div className="h-[1px] w-12 bg-gray-700"></div><div className="px-3 py-1 rounded border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold tracking-widest uppercase">Manufactura Digital</div><div className="h-[1px] w-12 bg-gray-700"></div>
          </motion.div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative inline-block py-10 px-8 md:px-16 border-x border-white/10">
             <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500"></div><div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500"></div><div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500"></div><div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500"></div>
             <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-none tracking-tight mb-4">IMPRESIÓN <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-600">3D</span></h1>
             <p className="text-gray-400 text-sm md:text-lg font-bold tracking-widest uppercase">Prototipado • Manufactura • Escaneado</p>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">Materializamos tus ideas capa por capa. Desde prototipos de ingeniería hasta producción final con la máxima precisión del mercado.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-10 flex flex-wrap justify-center gap-4">
             <button onClick={() => openWhatsapp('Cotización 3D')} className="group px-8 py-4 bg-cyan-600 text-white font-bold text-lg rounded-xl hover:bg-white hover:text-[#0B0F19] transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"><Printer size={20} /> Cotizar Modelo</button>
             <a href="#galeria" className="group px-8 py-4 border border-gray-600 text-white font-medium text-lg rounded-xl hover:border-cyan-500 hover:text-cyan-400 transition-all backdrop-blur-sm">Ver Trabajos</a>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"><span className="text-[10px] uppercase tracking-widest font-bold">Desliza</span><ChevronDown size={20} /></motion.div>
      </section>

      {/* 2. MATERIALES */}
      <section className="py-24 bg-[#0F1420] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Ingeniería de Materiales</h2><p className="text-gray-400">Seleccionamos el polímero exacto para tu necesidad.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MaterialCard title="PLA / PLA+" code="Standard" color="text-green-400" desc="Ecológico y rígido. Ideal para prototipos visuales y maquetas." />
            <MaterialCard title="ABS / PETG" code="Técnico" color="text-blue-400" desc="Alta resistencia térmica y al impacto. Piezas mecánicas funcionales." />
            <MaterialCard title="TPU Flexible" code="Flexible" color="text-orange-400" desc="Elastomero flexible similar a la goma. Juntas y amortiguadores." />
            <MaterialCard title="Resina 8K" code="Precisión" color="text-purple-400" desc="Acabado superficial perfecto. Joyería, dental y miniaturas." />
          </div>
        </div>
      </section>

      {/* 3. GALERÍA SCROLLABLE */}
      <section id="galeria" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-800 mb-4">Explora nuestros Servicios</h2><div className="h-1 w-20 bg-cyan-600 mx-auto rounded-full"></div></div>
          
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* MENU IZQUIERDO */}
            <div className="lg:col-span-4 sticky top-24 z-10">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 space-y-2">
                {loading ? <p className="text-center text-gray-400 p-4">Cargando...</p> : categoriesData.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategoryId(cat.id)} className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center justify-between group ${activeCategory?.id === cat.id ? 'bg-[#0B0F19] text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}>
                    <span className="font-bold">{cat.title}</span>{activeCategory?.id === cat.id && <Box size={18} className="text-cyan-400" />}
                  </button>
                ))}
              </div>
              <div className="mt-6 bg-blue-50/80 backdrop-blur-md rounded-2xl p-6 border border-blue-100 hidden lg:block">
                <h4 className="font-bold text-cyan-700 mb-2 flex items-center gap-2"><Scan size={18}/> ¿Tienes un modelo 3D?</h4>
                <p className="text-sm text-cyan-600/80 mb-4">Si tienes tu archivo .STL o .OBJ, lo cotizamos al instante.</p>
                <button onClick={() => openWhatsapp('Tengo archivo STL')} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg text-sm transition-colors shadow-lg shadow-cyan-200">Enviar Archivo</button>
              </div>
            </div>

            {/* CONTENIDO DERECHO */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-[700px] flex flex-col">
                  {activeCategory ? (
                    <>
                      <div className="mb-6 border-b border-gray-100 pb-6 shrink-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div><h3 className="text-3xl font-bold text-gray-800 mb-2">{activeCategory.title}</h3><p className="text-gray-600 text-sm">{activeCategory.desc}</p></div>
                            <button onClick={() => openWhatsapp(activeCategory.title)} className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 shrink-0"><MessageCircle size={18} /> Cotizar</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {activeCategory.features && activeCategory.features.map((feat, idx) => (<span key={idx} className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold"><Check size={12} className="text-cyan-600" /> {feat}</span>))}
                        </div>
                      </div>
                      
                      {/* GRID DE IMÁGENES */}
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
                                    <img src={imgSrc} alt="3D Work" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e)=>{e.target.src='https://via.placeholder.com/300x300?text=Foto'}}/>
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

      {/* 4. SECCIÓN PDF */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto bg-[#1a1825] rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 shadow-lg shadow-orange-500/20">RECURSO GRATUITO</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Catálogo Técnico & <br/> <span className="text-orange-500">Lista de Precios</span></h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">Descarga nuestro documento oficial con especificaciones técnicas, guía de colores de filamentos y ejemplos de precios.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/catalogo3d.pdf" download="Catalogo_InnovaLab_3D" className="flex items-center justify-center gap-3 bg-white text-[#0B0F19] font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1"><Download size={22} className="text-cyan-600" /> Descargar PDF</a>
                <a href="/catalogo3d.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 border border-gray-600 text-gray-300 font-bold py-4 px-8 rounded-xl hover:border-white hover:text-white transition-all"><ExternalLink size={22} /> Ver Online</a>
              </div>
            </div>
            <div className="relative group">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-gray-700 transform group-hover:scale-[1.02] transition-transform duration-500">
                <div className="bg-gray-900 rounded-t-xl px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
                  <div className="ml-4 bg-gray-800 px-3 py-1 rounded text-xs text-gray-400 flex items-center gap-2 w-full max-w-[200px]"><FileText size={10} /> catalogo_3d_2026.pdf</div>
                </div>
                <div className="bg-white h-[400px] w-full rounded-b-xl overflow-hidden relative">
                   <iframe src="/catalogo3d.pdf#toolbar=0" title="Visor Catálogo" className="w-full h-full"><div className="flex flex-col items-center justify-center h-full text-gray-500"><FileText size={48} className="mb-2" /><p>Tu navegador no soporta la previsualización.</p></div></iframe>
                   <a href="/catalogo3d.pdf" target="_blank" className="absolute bottom-4 right-4 bg-black/80 text-white p-2 rounded-lg hover:bg-cyan-600 transition-colors backdrop-blur-sm" title="Ver pantalla completa"><Maximize2 size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 5. CONTACTO FINAL */}
      <section className="py-24 bg-[#1a1825] relative overflow-hidden text-center border-t border-gray-800">
         <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
         <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Tienes una idea en mente?</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">Si no encontraste lo que buscabas en el catálogo, escríbenos. Diseñamos desde cero cualquier pieza que necesites.</p>
            <a href="https://wa.me/51987564941?text=Hola%20InnovaLab%20Center,%20quiero%20información%20sobre%20Impresión%203D." target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-5 px-12 rounded-full shadow-2xl shadow-green-900/30 transition-all hover:scale-105"><MessageCircle size={28} /> Solicitar Cotización</a>
         </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>{selectedImage && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md" onClick={() => setSelectedImage(null)}><div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}><button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2 bg-white/10 rounded-full"><X size={24} /></button><img src={selectedImage} alt="Zoom" className="max-h-[85vh] rounded-lg shadow-2xl border border-white/10" onError={(e)=>{e.target.src='https://via.placeholder.com/800x600?text=No+Image'}} /></div></motion.div>)}</AnimatePresence>
    </div>
  );
};

// Componente MaterialCard
const MaterialCard = ({ title, desc, badge, color }) => (
  <div className="bg-[#151b2b] border border-white/5 p-6 rounded-xl hover:border-cyan-500/30 transition-all group">
    <div className="flex justify-between items-start mb-4"><div className={`p-2 rounded bg-white/5 ${color}`}><Layers size={24}/></div><span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{badge}</span></div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3><p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
  </div>
); 

export default Print3D;