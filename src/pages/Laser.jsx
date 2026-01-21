import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Scissors, Layers, Box, Check, X, MessageCircle, ArrowRight, Download, PenTool, Layout, Tag, Grid } from 'lucide-react';

// --- DATOS DE CATEGORÍAS ---
const laserCategories = [
  {
    id: 'llaveros',
    title: 'Llaveros Personalizados',
    desc: 'El souvenir perfecto. Grabamos logotipos, nombres o fechas especiales en MDF, acrílico o madera.',
    features: ['Recuerdos para eventos', 'Merchandising económico', 'Diseños calados o grabados'],
    img: '/images/laser-llaveros.png',
    stock: '/images/laser-llaveros.png' 
  },
  {
    id: 'placas',
    title: 'Placas y Letreros',
    desc: 'Señalética corporativa y trofeos. Acabados elegantes en acrílico y bicapa para oficinas y premiaciones.',
    features: ['Señalética de oficinas', 'Reconocimientos y Trofeos', 'Letreros con luz LED (Neón)'],
    img: '/images/laser-placas.png',
    stock: '/images/laser-placas.png'
  },
  {
    id: 'nombres',
    title: 'Nombres y Letras 3D',
    desc: 'Decoración para eventos y habitaciones. Letras volumétricas en MDF o poliestireno pintado.',
    features: ['Nombres para Candy Bar', 'Letras gigantes para bodas', 'Decoración infantil'],
    img: '/images/laser-nombres.png',
    stock: '/images/laser-nombres2.png'
  },
  {
    id: 'decoracion',
    title: 'Decoración y Hogar',
    desc: 'Cuadros calados, lámparas geométricas y organizadores de escritorio con diseño milimétrico.',
    features: ['Mandalas y Cuadros', 'Lámparas modernas', 'Organizadores y Cajas'],
    img: '/images/laser-deco.png',
    stock: '/images/laser-deco2.png'
  },
  {
    id: 'empresas',
    title: 'Producción para Empresas',
    desc: 'Corte masivo para grandes pedidos. Optimizamos material para reducir costos en tu producción.',
    features: ['Maquila de productos', 'Corte de piezas para ensamble', 'Grabado de marca en productos'],
    img: '/images/laser-empresas.png',
    stock: '/images/laser-empresas.png'
  }
];

// --- IMÁGENES EXTRA PARA LA GALERÍA LATERAL ---
const extraGalleryImages = [
  '/images/laser-extra-1.png',
  '/images/laser-extra-2.png',
  '/images/laser-extra-3.png',
  '/images/laser-extra-4.png',
  '/images/laser-extra-5.png',
  '/images/laser-extra-6.png',
];

const Laser = () => {
  const [activeCategory, setActiveCategory] = useState(laserCategories[0]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showGallery, setShowGallery] = useState(false); // Estado para el Panel Lateral

  const openWhatsapp = (topic) => {
    const text = `Hola InnovaLab Center, quiero información sobre Corte Láser: ${topic || 'General'}.`;
    window.open(`https://wa.me/51987564941?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen relative overflow-x-hidden">

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-36 pb-24 bg-[#1a1825] overflow-hidden">
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#E29930 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-900/30 text-orange-400 text-sm font-bold mb-6 border border-orange-500/30 backdrop-blur-md">
              <Zap size={16} /> Precisión Milimétrica
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Corte y Grabado <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Láser</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Desde regalos personalizados únicos hasta producción en serie para empresas. 
              Corte limpio, grabado detallado y acabados profesionales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. MATERIALES --- */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark">Materiales que trabajamos</h2>
            <p className="text-gray-500 mt-2">Nuestras máquinas CO2 pueden cortar y grabar una amplia variedad de superficies.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <MaterialCard icon={<Box />} title="MDF / Madera" desc="Ideal para maquetas, cajas y decoración rústica." color="text-amber-700" bg="bg-amber-50" />
             <MaterialCard icon={<Layers />} title="Acrílico" desc="Corte brillante perfecto para letreros y llaveros." color="text-blue-600" bg="bg-blue-50" />
             <MaterialCard icon={<Tag />} title="Cuero" desc="Grabado de alta calidad para marroquinería." color="text-orange-800" bg="bg-orange-50" />
             <MaterialCard icon={<Layout />} title="Cartón/Papel" desc="Prototipado rápido y papelería creativa." color="text-gray-600" bg="bg-gray-100" />
          </div>
        </div>
      </section>

      {/* --- 3. CATEGORÍAS (SPLIT INTERACTIVO) --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">Soluciones Láser</h2>
            <div className="h-1 w-20 bg-brand-accent mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch min-h-[500px]">
            {/* MENÚ VERTICAL */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {laserCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left p-5 rounded-xl transition-all duration-300 border flex items-center justify-between group ${
                    activeCategory.id === cat.id 
                      ? 'bg-brand-dark text-white border-brand-dark shadow-lg scale-105 z-10' 
                      : 'bg-white text-gray-500 border-gray-200 hover:border-brand-accent hover:text-brand-accent'
                  }`}
                >
                  <span className="font-bold text-lg">{cat.title}</span>
                  {activeCategory.id === cat.id && <Zap size={20} className="text-brand-accent" />}
                </button>
              ))}
              
              <div className="mt-auto pt-6 hidden lg:block">
                <p className="text-sm text-gray-400 mb-2">¿Tienes un diseño especial?</p>
                <button 
                  onClick={() => openWhatsapp('Diseño Personalizado')}
                  className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-bold hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} /> Consultar Diseño
                </button>
              </div>
            </div>

            {/* VISUALIZACIÓN DINÁMICA */}
            <div className="lg:col-span-8">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-2 shadow-2xl h-full flex flex-col md:flex-row overflow-hidden border border-gray-100"
                >
                  <div className="md:w-1/2 h-64 md:h-auto relative rounded-2xl overflow-hidden cursor-pointer group"
                       onClick={() => setSelectedImage(activeCategory.img || activeCategory.stock)}>
                    <img 
                      src={activeCategory.img} 
                      onError={(e) => {e.target.src = activeCategory.stock}}
                      alt={activeCategory.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-brand-dark">
                      Ver detalle
                    </div>
                  </div>

                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-brand-dark mb-4">{activeCategory.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{activeCategory.desc}</p>
                    
                    <div className="bg-orange-50 rounded-xl p-5 mb-8">
                      <h4 className="text-xs font-bold uppercase text-orange-600 mb-3 tracking-wider">Aplicaciones:</h4>
                      <ul className="space-y-2">
                        {activeCategory.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <Check size={16} className="text-orange-500 mt-0.5" /> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => openWhatsapp(activeCategory.title)}
                      className="w-full bg-brand-accent hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Scissors size={20} /> Cotizar {activeCategory.title}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. GALERÍA RÁPIDA (CON BOTÓN DESPLEGABLE) --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-brand-dark">Trabajos Recientes</h2>
            {/* BOTÓN QUE ABRE EL PANEL LATERAL */}
            <button 
              onClick={() => setShowGallery(true)} 
              className="text-brand-accent font-bold hover:underline flex items-center gap-2 group"
            >
              <Grid size={18} />
              Ver más fotos
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {laserCategories.slice(0, 4).map((cat, idx) => (
               <div key={idx} className="rounded-xl overflow-hidden h-48 cursor-pointer group shadow-sm border border-gray-100" onClick={() => setSelectedImage(cat.img || cat.stock)}>
                 <img src={cat.img} onError={(e) => {e.target.src = cat.stock}} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- 5. CATÁLOGO PDF --- */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-orange-900 to-amber-700 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-10 p-10 md:p-16 items-center">
            <div>
              <div className="inline-block bg-white text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                CATÁLOGO DE PRODUCTOS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Regalos & <br/>Merchandising
              </h2>
              <p className="text-orange-100 mb-8 text-lg">
                Descarga nuestro catálogo de productos láser: Llaveros, trofeos, cajas de vino y decoración. Precios al por mayor y menor.
              </p>
              
              <a 
                href="/catalogo_laser.pdf"
                download="Catalogo_Laser_InnovaLab"
                className="inline-flex items-center gap-3 bg-brand-accent text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-white hover:text-brand-accent transition-all transform hover:-translate-y-1"
              >
                <Download size={24} />
                Descargar PDF
              </a>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative w-48 h-64 bg-white rounded-lg shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 flex flex-col items-center justify-center border border-gray-200">
                <PenTool size={48} className="text-brand-accent mb-4" />
                <h3 className="text-brand-dark font-bold text-lg text-center px-4">CORTE LÁSER</h3>
                <p className="text-gray-400 text-xs text-center">Catálogo 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. CONTACTO FINAL --- */}
      <section className="py-24 bg-brand-dark relative overflow-hidden text-center">
         <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Producción Urgente?</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
               Atendemos pedidos corporativos y urgencias. Cuéntanos tu proyecto y te cotizamos al instante.
            </p>
            <a 
              href="https://wa.me/51987564941?text=Hola%20InnovaLab%20Center,%20quiero%20información%20sobre%20Corte%20Láser."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-5 px-12 rounded-full shadow-2xl shadow-green-900/30 transition-all hover:scale-105"
            >
              <MessageCircle size={28} />
              Solicitar Cotización
            </a>
         </div>
      </section>

      {/* --- PANEL LATERAL DE GALERÍA (DRAWER) --- */}
      <AnimatePresence>
        {showGallery && (
          <>
            {/* Backdrop oscuro */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
              onClick={() => setShowGallery(false)}
            />
            {/* Panel Deslizante desde la derecha */}
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-[70] shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-brand-dark">Galería Extendida</h3>
                  <button 
                    onClick={() => setShowGallery(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {extraGalleryImages.map((imgSrc, idx) => (
                    <div 
                      key={idx} 
                      className="rounded-xl overflow-hidden h-40 cursor-pointer shadow-md hover:shadow-lg transition-shadow border border-gray-100 group"
                      onClick={() => { setSelectedImage(imgSrc); setShowGallery(false); }} // Cierra el panel y abre el zoom
                    >
                      <img 
                        src={imgSrc} 
                        alt={`Galería Extra ${idx}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        onError={(e) => {e.target.src = 'https://via.placeholder.com/300?text=Foto'}}
                      />
                    </div>
                  ))}
                </div>
                
                <p className="mt-8 text-center text-sm text-gray-400">
                  Mostrando selección de trabajos recientes. <br/>Para ver más, síguenos en Instagram.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- LIGHTBOX (Zoom) --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
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

// Componente Tarjeta Material Simple
const MaterialCard = ({ icon, title, desc, color, bg }) => (
  <div className={`p-6 rounded-xl border border-gray-100 transition-shadow hover:shadow-lg ${bg}`}>
    <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 ${color} shadow-sm`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

export default Laser;