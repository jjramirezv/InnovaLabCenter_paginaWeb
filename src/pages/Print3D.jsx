import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Settings, Smile, Zap, Check, X, MessageCircle, Download, Layers, Heart, Cpu, FileText, Maximize2, ExternalLink, Eye } from 'lucide-react';

const categoriesData = [
  {
    id: 'personalizado',
    title: 'Objetos Personalizados',
    desc: 'Materializa tus ideas más creativas. Ideal para regalos únicos, merchandising de empresas o accesorios de moda exclusivos.',
    features: ['Personajes y Mascotas a medida', 'Llaveros y Logos corporativos', 'Accesorios de cosplay / moda'],
    images: ['/images/per1.png', 
      '/images/per2.png', 
      '/images/per3.png', 
      '/images/per1.png', 
      '/images/per2.png', 
      '/images/per3.png']
  },
  {
    id: 'figuras',
    title: 'Figuras y Coleccionables',
    desc: 'Alta resolución para coleccionistas. Utilizamos impresoras de Resina 8K para capturar hasta el más mínimo detalle.',
    features: ['Figuras de Anime / Videojuegos', 'Bustos y Estatuillas', 'Art Toys de diseñador'],
    images: ['/images/fig1.png', 
      '/images/fig2.png', 
      '/images/fig3.png', 
      '/images/fig1.png', 
      '/images/fig2.png', 
      '/images/fig3.png']
  },
  {
    id: 'moldes',
    title: 'Moldes Industriales',
    desc: 'Herramientas precisas para replicar tus productos. Diseñamos el negativo perfecto para tu producción en serie.',
    features: ['Moldes para Jabones / Velas', 'Matrices para Chocolatería', 'Moldes para concreto y yeso'],
    images: ['/images/mol1.png', 
      '/images/mol2.png', 
      '/images/mol3.png']
  },
  {
    id: 'repuestos',
    title: 'Repuestos y Piezas',
    desc: 'No tires tus equipos por una pieza rota. Diseñamos y fabricamos repuestos descontinuados de alta resistencia.',
    features: ['Engranajes y Piñones', 'Soportes y Carcasas', 'Piezas automotrices plásticas'],
    images: ['/images/rep1.png', 
      '/images/rep2.png', 
      '/images/rep3.png']
  },
  {
    id: 'prototipos',
    title: 'Prototipos de Ingeniería',
    desc: 'Valida forma, ajuste y función. Acelera tu proceso de desarrollo de producto con iteraciones rápidas.',
    features: ['Validación de diseño industrial', 'Carcasas para electrónica (IoT)', 'Mecanismos funcionales'],
    images: ['/images/pro1.png', 
      '/images/pro2.png', 
      '/images/pro3.png']
  },
  {
    id: 'salud',
    title: 'Sector Salud',
    desc: 'Soluciones biomédicas personalizadas. Apoyo tecnológico para médicos y pacientes.',
    features: ['Prótesis mecánicas funcionales', 'Guías quirúrgicas', 'Modelos anatómicos'],
    images: ['/images/sal1.png', 
      '/images/sal2.png', 
      '/images/sal3.png']
  }
];

const Print3D = () => {
  const [activeCategory, setActiveCategory] = useState(categoriesData[0]);
  const [selectedImage, setSelectedImage] = useState(null);

  const openWhatsapp = (topic) => {
    const text = `Hola InnovaLab Center, quiero información sobre Impresión 3D: ${topic || 'General'}.`;
    window.open(`https://wa.me/51987564941?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen relative overflow-x-hidden">
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-36 pb-24 bg-[#1a1825] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#408fc1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/20 text-brand-secondary text-sm font-bold mb-6 border border-brand-primary/30 backdrop-blur-md">
              <Box size={16} /> Centro de Manufactura Digital
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Impresión 3D <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">Industrial</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-light">Transformamos tus archivos digitales en objetos físicos de alta calidad.</p>
          </div>
        </div>
      </section>

      {/* --- 2. MATERIALES --- */}
      <section className="py-20 bg-brand-dark border-t border-white/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-brand-primary/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <div><h2 className="text-3xl font-bold text-white">Tecnología & Materiales</h2></div>
             <div className="text-brand-accent font-bold text-sm uppercase tracking-widest">Calidad Garantizada</div>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <MaterialCard title="PLA / PLA+" desc="Económico, rígido y ecológico." badge="Estándar" color="text-green-400" bg="bg-green-400/10" />
            <MaterialCard title="ABS / PETG" desc="Soporta impactos y temperatura." badge="Industrial" color="text-blue-400" bg="bg-blue-400/10" />
            <MaterialCard title="TPU Flexible" desc="Material similar a la goma." badge="Flexible" color="text-orange-400" bg="bg-orange-400/10" />
            <MaterialCard title="Resina 8K" desc="Acabado liso microscópico." badge="Precisión" color="text-purple-400" bg="bg-purple-400/10" />
          </div>
        </div>
      </section>

      {/* --- 3. GALERÍA SCROLLABLE --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">Explora nuestros Servicios</h2>
            <div className="h-1 w-20 bg-brand-accent mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 sticky top-24 z-10">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 space-y-2">
                {categoriesData.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat)} className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center justify-between group ${activeCategory.id === cat.id ? 'bg-brand-dark text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}>
                    <span className="font-bold">{cat.title}</span>
                    {activeCategory.id === cat.id && <Box size={18} className="text-brand-accent" />}
                  </button>
                ))}
              </div>
              <div className="mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-100 hidden lg:block">
                <h4 className="font-bold text-brand-primary mb-2">¿Tienes un modelo 3D?</h4>
                <p className="text-sm text-brand-primary/80 mb-4">Si tienes tu archivo .STL o .OBJ, lo cotizamos al instante.</p>
                <button onClick={() => openWhatsapp('Tengo archivo STL')} className="w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-2 rounded-lg text-sm transition-colors">Enviar Archivo</button>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-[700px] flex flex-col">
                  {/* Encabezado Fijo */}
                  <div className="mb-6 border-b border-gray-100 pb-6 shrink-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-3xl font-bold text-brand-dark mb-2">{activeCategory.title}</h3>
                            <p className="text-gray-600 text-sm">{activeCategory.desc}</p>
                        </div>
                        <button onClick={() => openWhatsapp(activeCategory.title)} className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 shrink-0">
                        <MessageCircle size={18} /> Cotizar
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {activeCategory.features.map((feat, idx) => (
                        <span key={idx} className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold"><Check size={12} className="text-brand-accent" /> {feat}</span>
                      ))}
                    </div>
                  </div>

                  {/* Grid Scrollable */}
                  <div className="overflow-y-auto custom-scrollbar pr-2 flex-grow">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
                        {activeCategory.images.map((imgSrc, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden cursor-pointer h-40 md:h-48 shadow-sm border border-gray-100" onClick={() => setSelectedImage(imgSrc)}>
                            <img src={imgSrc} alt={`${activeCategory.title} ${idx}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => {e.target.src = 'https://via.placeholder.com/400x400?text=Foto+Referencia'}} />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Eye className="text-white" size={32} /></div>
                        </div>
                        ))}
                    </div>
                    <p className="text-center text-gray-400 text-xs mt-2">Mostrando {activeCategory.images.length} imágenes.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. SECCIÓN PDF --- */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto bg-[#1a1825] rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-block bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-6">RECURSO GRATUITO</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Catálogo Técnico & <br/> <span className="text-brand-accent">Lista de Precios</span></h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">Descarga nuestro documento oficial con especificaciones técnicas y guía de materiales.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/catalogo3d.pdf" download="Catalogo_InnovaLab_3D" className="flex items-center justify-center gap-3 bg-white text-brand-dark font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1"><Download size={22} className="text-brand-primary" /> Descargar PDF</a>
                <a href="/catalogo3d.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 border border-gray-600 text-gray-300 font-bold py-4 px-8 rounded-xl hover:border-white hover:text-white transition-all"><ExternalLink size={22} /> Ver Online</a>
              </div>
            </div>
            <div className="relative group">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-gray-700 transform group-hover:scale-[1.02] transition-transform duration-500">
                <div className="bg-gray-900 rounded-t-xl px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
                  <div className="ml-4 bg-gray-800 px-3 py-1 rounded text-xs text-gray-400 flex items-center gap-2 w-full max-w-[200px]"><FileText size={10} /> catalogo_3d_2025.pdf</div>
                </div>
                <div className="bg-white h-[400px] w-full rounded-b-xl overflow-hidden relative">
                   <iframe src="/catalogo3d.pdf#toolbar=0" title="Visor Catálogo" className="w-full h-full"></iframe>
                   <a href="/catalogo3d.pdf" target="_blank" className="absolute bottom-4 right-4 bg-black/80 text-white p-2 rounded-lg hover:bg-brand-primary transition-colors backdrop-blur-sm" title="Ver pantalla completa"><Maximize2 size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. CONTACTO FINAL (FULL WIDTH) --- */}
      <section className="py-24 bg-[#1a1825] relative overflow-hidden text-center border-t border-gray-800">
         <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
         <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Tienes una idea en mente?</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">Si no encontraste lo que buscabas en el catálogo, escríbenos. Diseñamos desde cero cualquier pieza que necesites.</p>
            <a href="https://wa.me/51987564941?text=Hola%20InnovaLab%20Center,%20quiero%20información%20sobre%20Impresión%203D." target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-5 px-12 rounded-full shadow-2xl shadow-green-900/30 transition-all hover:scale-105">
              <MessageCircle size={28} /> Solicitar Cotización
            </a>
         </div>
      </section>

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2 bg-white/10 rounded-full"><X size={24} /></button>
              <img src={selectedImage} alt="Zoom" className="max-h-[85vh] rounded-lg shadow-2xl border border-white/10" onError={(e) => {e.target.src = 'https://via.placeholder.com/800x600?text=Imagen+No+Encontrada'}} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Componente Tarjeta Material
const MaterialCard = ({ title, desc, badge, color, bg }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${bg} ${color}`}><Layers size={24} /></div>
    <div className="flex justify-between items-start mb-2"><h3 className="text-lg font-bold text-white">{title}</h3><span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-current ${color} opacity-80`}>{badge}</span></div>
    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{desc}</p>
  </div>
);

export default Print3D;