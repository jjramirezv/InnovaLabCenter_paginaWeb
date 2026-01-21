import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Box, Layers, Tag, Layout, Scissors, MessageCircle, Download, Check, X, Eye, FileText, Maximize2, ExternalLink } from 'lucide-react';

// --- DATOS DE CATEGORÍAS ---
const laserCategories = [
  {
    id: 'llaveros',
    title: 'Llaveros Personalizados',
    desc: 'El souvenir perfecto. Grabamos logotipos, nombres o fechas especiales en MDF, acrílico o madera.',
    features: ['Recuerdos para eventos', 'Merchandising económico', 'Diseños calados o grabados'],
    // Puedes agregar MUCHAS imágenes aquí, el diseño ya no se romperá.
    images: [
      '/images/laser-llaveros.png', 
      '/images/laser-extra-1.png', 
      '/images/laser-extra-2.png',
      '/images/laser-llaveros2.png', 
      '/images/laser-extra-4.png',
      '/images/laser-extra-3.png'
    ]
  },
  {
    id: 'placas',
    title: 'Placas y Letreros',
    desc: 'Señalética corporativa y trofeos. Acabados elegantes en acrílico y bicapa para oficinas y premiaciones.',
    features: ['Señalética de oficinas', 'Reconocimientos y Trofeos', 'Letreros con luz LED (Neón)'],
    images: [
      '/images/laser-placas.png', 
      '/images/laser-extra-5.png', 
      '/images/laser-placas2.png', 
      '/images/laser-extra-6.png']
  },
  {
    id: 'nombres',
    title: 'Nombres y Letras 3D',
    desc: 'Decoración para eventos y habitaciones. Letras volumétricas en MDF o poliestireno pintado.',
    features: ['Nombres para Candy Bar', 'Letras gigantes para bodas', 'Decoración infantil'],
    images: [
      '/images/laser-nombres.png', 
      '/images/laser-extra-4.png', 
      '/images/laser-nombres.png', 
      '/images/laser-extra-4.png']
  },
  {
    id: 'decoracion',
    title: 'Decoración y Hogar',
    desc: 'Cuadros calados, lámparas geométricas y organizadores de escritorio con diseño milimétrico.',
    features: ['Mandalas y Cuadros', 'Lámparas modernas', 'Organizadores y Cajas'],
    images: [
      '/images/laser-deco.png',
      '/images/laser-extra-5.png',
      '/images/laser-deco.png',
      '/images/laser-extra-5.png',
      '/images/laser-deco.png',
      '/images/laser-extra-5.png',
      '/images/laser-deco.png',
      '/images/laser-extra-5.png']

  },
  {
    id: 'empresas',
    title: 'Producción para Empresas',
    desc: 'Corte masivo para grandes pedidos. Optimizamos material para reducir costos en tu producción.',
    features: ['Maquila de productos', 'Corte de piezas para ensamble', 'Grabado de marca en productos'],
    images: [
      '/images/laser-empresas.png', 
      '/images/laser-extra-6.png', 
      '/images/laser-empresas.png', 
      '/images/laser-extra-6.png']
  }
];

const Laser = () => {
  const [activeCategory, setActiveCategory] = useState(laserCategories[0]);
  const [selectedImage, setSelectedImage] = useState(null);

  const openWhatsapp = (topic) => {
    const text = `Hola InnovaLab Center, quiero información sobre Corte Láser: ${topic || 'General'}.`;
    window.open(`https://wa.me/51987564941?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      
      {/* Estilos para el Scrollbar personalizado */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-36 pb-24 bg-[#1a1825] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#E29930 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-900/30 text-orange-400 text-sm font-bold mb-6 border border-orange-500/30 backdrop-blur-md">
              <Zap size={16} /> Precisión Milimétrica
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Corte y Grabado <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Láser</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Desde regalos personalizados hasta producción industrial. Corte limpio y acabados profesionales.
            </p>
          </div>
        </div>
      </section>

      {/* --- 2. MATERIALES --- */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-brand-dark">Materiales Aptos</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <MaterialCard icon={<Box />} title="MDF / Madera" desc="Maquetas y decoración." color="text-amber-700" bg="bg-amber-50" />
             <MaterialCard icon={<Layers />} title="Acrílico" desc="Letreros y llaveros brillantes." color="text-blue-600" bg="bg-blue-50" />
             <MaterialCard icon={<Tag />} title="Cuero" desc="Grabado para marroquinería." color="text-orange-800" bg="bg-orange-50" />
             <MaterialCard icon={<Layout />} title="Cartón/Papel" desc="Prototipado rápido." color="text-gray-600" bg="bg-gray-100" />
          </div>
        </div>
      </section>

      {/* --- 3. GALERÍA PRINCIPAL (FIX: SCROLLABLE) --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">Nuestros Productos</h2>
            <div className="h-1 w-20 bg-brand-accent mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUMNA IZQUIERDA: MENÚ (Sticky) */}
            <div className="lg:col-span-4 sticky top-24 z-10">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 space-y-2">
                {laserCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                      activeCategory.id === cat.id 
                        ? 'bg-brand-dark text-white shadow-md' 
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span className="font-bold">{cat.title}</span>
                    {activeCategory.id === cat.id && <Zap size={18} className="text-brand-accent" />}
                  </button>
                ))}
              </div>
              <div className="mt-6 bg-orange-50 rounded-2xl p-6 border border-orange-100 hidden lg:block">
                <h4 className="font-bold text-orange-800 mb-2">¿Diseño Propio?</h4>
                <p className="text-sm text-orange-700/80 mb-4">Si tienes tu archivo vectorial (.dxf, .ai, .cdr), lo cotizamos al instante.</p>
                <button 
                  onClick={() => openWhatsapp('Tengo archivo vectorial')}
                  className="w-full bg-orange-200 hover:bg-orange-300 text-orange-900 font-bold py-2 rounded-lg text-sm transition-colors"
                >
                  Enviar Archivo
                </button>
              </div>
            </div>

            {/* COLUMNA DERECHA: CONTENIDO Y GALERÍA (FIXED HEIGHT + SCROLL) */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-[700px] flex flex-col">
                  
                  {/* Encabezado de Categoría (Fijo) */}
                  <div className="mb-6 border-b border-gray-100 pb-6 shrink-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-3xl font-bold text-brand-dark mb-2">{activeCategory.title}</h3>
                            <p className="text-gray-600 text-sm">{activeCategory.desc}</p>
                        </div>
                        <button 
                        onClick={() => openWhatsapp(activeCategory.title)}
                        className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 shrink-0"
                        >
                        <Scissors size={18} /> Cotizar
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {activeCategory.features.map((feat, idx) => (
                        <span key={idx} className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
                          <Check size={12} className="text-brand-accent" /> {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* GRID DE IMÁGENES (SCROLLABLE) */}
                  {/* Aquí está el cambio: overflow-y-auto y height completa restante */}
                  <div className="overflow-y-auto custom-scrollbar pr-2 flex-grow">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
                        {activeCategory.images.map((imgSrc, idx) => (
                        <div 
                            key={idx}
                            className="relative group rounded-xl overflow-hidden cursor-pointer h-40 md:h-48 shadow-sm border border-gray-100"
                            onClick={() => setSelectedImage(imgSrc)}
                        >
                            <img 
                            src={imgSrc} 
                            alt={`${activeCategory.title} ${idx}`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {e.target.src = 'https://via.placeholder.com/400x400?text=Foto+Referencia'}}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="text-white" size={32} />
                            </div>
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

      {/* --- 4. SECCIÓN PDF PREMIUM --- */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto bg-[#1a1825] rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6">RECURSO GRATUITO</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Catálogo de Productos <br/> <span className="text-orange-500">Láser 2025</span></h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">Descubre nuestra colección completa de merchandising, trofeos y decoración.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/catalogo_laser.pdf" download="Catalogo_Laser_InnovaLab" className="flex items-center justify-center gap-3 bg-white text-brand-dark font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1">
                  <Download size={22} className="text-orange-600" /> Descargar PDF
                </a>
                <a href="/catalogo_laser.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 border border-gray-600 text-gray-300 font-bold py-4 px-8 rounded-xl hover:border-white hover:text-white transition-all">
                  <ExternalLink size={22} /> Ver Online
                </a>
              </div>
            </div>
            <div className="relative group">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-gray-700 transform group-hover:scale-[1.02] transition-transform duration-500">
                <div className="bg-gray-900 rounded-t-xl px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
                  <div className="ml-4 bg-gray-800 px-3 py-1 rounded text-xs text-gray-400 flex items-center gap-2 w-full max-w-[200px]"><FileText size={10} /> catalogo_laser_2025.pdf</div>
                </div>
                <div className="bg-white h-[400px] w-full rounded-b-xl overflow-hidden relative">
                   <iframe src="/catalogo_laser.pdf#toolbar=0" title="Visor Catálogo" className="w-full h-full">
                      <div className="flex flex-col items-center justify-center h-full text-gray-500"><FileText size={48} className="mb-2" /><p>Tu navegador no soporta la previsualización.</p></div>
                   </iframe>
                   <a href="/catalogo_laser.pdf" target="_blank" className="absolute bottom-4 right-4 bg-black/80 text-white p-2 rounded-lg hover:bg-orange-500 transition-colors backdrop-blur-sm" title="Ver pantalla completa"><Maximize2 size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. CONTACTO FINAL (FULL WIDTH) --- */}
      <section className="py-24 bg-[#1a1825] relative overflow-hidden text-center border-t border-gray-800">
         <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
         <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Producción Urgente?</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">Atendemos pedidos corporativos y urgencias. Cuéntanos tu proyecto y te cotizamos al instante.</p>
            <a href="https://wa.me/51987564941?text=Hola%20InnovaLab%20Center,%20quiero%20información%20sobre%20Corte%20Láser." target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-5 px-12 rounded-full shadow-2xl shadow-green-900/30 transition-all hover:scale-105">
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

const MaterialCard = ({ icon, title, desc, color, bg }) => (
  <div className={`p-6 rounded-xl border border-gray-100 transition-shadow hover:shadow-lg ${bg}`}>
    <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 ${color} shadow-sm`}>{icon}</div>
    <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

export default Laser;