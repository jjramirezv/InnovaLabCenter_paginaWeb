import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Settings, Smile, Zap, Check, X, MessageCircle, ArrowRight, Download, Layers, Heart, Cpu, FileText } from 'lucide-react';

// --- DATOS (Rutas locales) ---
const categoriesData = [
  {
    id: 'personalizado',
    title: 'Objetos Personalizados',
    icon: <Smile size={24} />,
    desc: 'Materializa tus ideas más creativas. Ideal para regalos únicos, merchandising de empresas o accesorios de moda exclusivos.',
    features: ['Personajes y Mascotas a medida', 'Llaveros y Logos corporativos', 'Accesorios de cosplay / moda'],
    images: ['/images/per1.png', '/images/per2.png', '/images/per3.png']
  },
  {
    id: 'figuras',
    title: 'Figuras y Coleccionables',
    icon: <Zap size={24} />,
    desc: 'Alta resolución para coleccionistas. Utilizamos impresoras de Resina 8K para capturar hasta el más mínimo detalle.',
    features: ['Figuras de Anime / Videojuegos', 'Bustos y Estatuillas', 'Art Toys de diseñador'],
    images: ['/images/fig1.png', '/images/fig2.png', '/images/fig3.png']
  },
  {
    id: 'moldes',
    title: 'Moldes Industriales',
    icon: <Layers size={24} />,
    desc: 'Herramientas precisas para replicar tus productos. Diseñamos el negativo perfecto para tu producción en serie.',
    features: ['Moldes para Jabones / Velas', 'Matrices para Chocolatería', 'Moldes para concreto y yeso'],
    images: ['/images/mol1.png', '/images/mol2.png', '/images/mol3.png']
  },
  {
    id: 'repuestos',
    title: 'Repuestos y Piezas',
    icon: <Settings size={24} />,
    desc: 'No tires tus equipos por una pieza rota. Diseñamos y fabricamos repuestos descontinuados de alta resistencia.',
    features: ['Engranajes y Piñones', 'Soportes y Carcasas', 'Piezas automotrices plásticas'],
    images: ['/images/rep1.png', '/images/rep2.png', '/images/rep3.png']
  },
  {
    id: 'prototipos',
    title: 'Prototipos de Ingeniería',
    icon: <Cpu size={24} />,
    desc: 'Valida forma, ajuste y función. Acelera tu proceso de desarrollo de producto con iteraciones rápidas.',
    features: ['Validación de diseño industrial', 'Carcasas para electrónica (IoT)', 'Mecanismos funcionales'],
    images: ['/images/pro1.png', '/images/pro2.png', '/images/pro3.png']
  },
  {
    id: 'salud',
    title: 'Sector Salud',
    icon: <Heart size={24} />,
    desc: 'Soluciones biomédicas personalizadas. Apoyo tecnológico para médicos y pacientes.',
    features: ['Prótesis mecánicas funcionales', 'Guías quirúrgicas', 'Modelos anatómicos'],
    images: ['/images/sal1.png', '/images/sal2.png', '/images/sal3.png']
  }
];

const Print3D = () => {
  const [activeTab, setActiveTab] = useState(categoriesData[0].id);
  const [selectedImage, setSelectedImage] = useState(null);

  // Obtener datos de la categoría activa
  const activeContent = categoriesData.find(cat => cat.id === activeTab);

  const openWhatsapp = (category) => {
    const text = `Hola InnovaLab Center, quiero información sobre Impresión 3D: ${category}.`;
    window.open(`https://wa.me/51987564941?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-36 pb-24 bg-[#1a1825] overflow-hidden">
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#408fc1 1px, transparent 1px), linear-gradient(90deg, #408fc1 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/20 text-brand-secondary text-sm font-bold mb-6 border border-brand-primary/30 backdrop-blur-md">
              <Box size={16} /> Centro de Manufactura Digital
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Impresión 3D <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">Industrial</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Transformamos tus archivos digitales en objetos físicos de alta calidad. 
              Soluciones para ingeniería, medicina, publicidad y hobbistas en Huancayo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. MATERIALES --- */}
      <section className="py-20 bg-brand-dark border-t border-white/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-brand-primary/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <div>
               <h2 className="text-3xl font-bold text-white">Tecnología & Materiales</h2>
               <p className="text-gray-400 mt-2 max-w-lg">No solo imprimimos, seleccionamos la ingeniería de materiales adecuada para que tu pieza dure.</p>
             </div>
             <div className="text-brand-accent font-bold text-sm uppercase tracking-widest">
               Calidad Garantizada
             </div>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <MaterialCard title="PLA / PLA+" desc="Económico, rígido y ecológico. Ideal para prototipos visuales." badge="Estándar" color="text-green-400" bg="bg-green-400/10" />
            <MaterialCard title="ABS / PETG" desc="Soporta impactos y temperatura. Para piezas mecánicas." badge="Industrial" color="text-blue-400" bg="bg-blue-400/10" />
            <MaterialCard title="TPU Flexible" desc="Material similar a la goma. Amortiguación y juntas." badge="Flexible" color="text-orange-400" bg="bg-orange-400/10" />
            <MaterialCard title="Resina 8K" desc="Acabado liso microscópico. Joyería y Dental." badge="Precisión" color="text-purple-400" bg="bg-purple-400/10" />
          </div>
        </div>
      </section>

      {/* --- 3. GALERÍA INTERACTIVA --- */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">Explora nuestros Servicios</h2>
            <p className="text-gray-500 text-lg">Selecciona una categoría para ver ejemplos reales de nuestro taller.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12 sticky top-20 z-30 py-4 bg-[#F8FAFC]/90 backdrop-blur-sm">
            {categoriesData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-300 border shadow-sm ${
                  activeTab === cat.id 
                    ? 'bg-brand-dark text-white border-brand-dark ring-2 ring-brand-primary/50 transform scale-105' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-brand-primary hover:text-brand-primary'
                }`}
              >
                {React.cloneElement(cat.icon, { size: 18, className: activeTab === cat.id ? 'text-brand-accent' : 'text-gray-400' })}
                {cat.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
            >
              <div className="grid lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 shadow-inner">
                      {React.cloneElement(activeContent.icon, { size: 36, className: 'text-brand-primary' })}
                    </div>
                    <h3 className="text-3xl font-bold text-brand-dark leading-tight">{activeContent.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                    {activeContent.desc}
                  </p>
                  <div className="bg-blue-50/50 rounded-xl p-6 mb-8 border border-blue-100">
                    <h4 className="text-xs font-bold uppercase text-brand-primary mb-4 tracking-wider flex items-center gap-2">
                      <Layers size={14} /> Incluye:
                    </h4>
                    <ul className="space-y-4">
                      {activeContent.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-brand-dark">
                          <Check size={20} className="text-green-500 mt-0.5 shrink-0" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-6">
                    <button 
                        onClick={() => openWhatsapp(activeContent.title)}
                        className="w-full flex items-center justify-center gap-3 bg-brand-dark text-white px-8 py-5 rounded-xl font-bold hover:bg-brand-primary transition-all shadow-lg hover:shadow-brand-primary/30"
                    >
                        <MessageCircle size={22} />
                        Cotizar {activeContent.title}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
                  <div 
                    className="col-span-2 row-span-2 md:col-span-1 md:row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group shadow-md"
                    onClick={() => setSelectedImage(activeContent.images[0])}
                  >
                    <img 
                      src={activeContent.images[0]} 
                      alt="Principal" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {e.target.src = 'https://via.placeholder.com/600x800?text=Sin+Imagen'}}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                         <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold text-brand-dark shadow-lg inline-block">
                             Ver Proyecto
                         </div>
                    </div>
                  </div>
                  <div 
                    className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hidden md:block"
                    onClick={() => setSelectedImage(activeContent.images[1])}
                  >
                    <img 
                      src={activeContent.images[1]} 
                      alt="Detalle 1" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=Sin+Imagen'}}
                    />
                  </div>
                  <div 
                    className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hidden md:block"
                    onClick={() => setSelectedImage(activeContent.images[2])}
                  >
                    <img 
                       src={activeContent.images[2]} 
                       alt="Detalle 2" 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                       onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=Sin+Imagen'}}
                    />
                    <div className="absolute inset-0 bg-brand-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold gap-2">
                      <Zap size={24} /> Zoom
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- 4. CATÁLOGO PDF --- */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-brand-dark via-brand-darkBlue to-brand-primary rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-10 p-10 md:p-16 items-center">
            <div>
              <div className="inline-block bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                PDF ACTUALIZADO 2025
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Catálogo Técnico & <br/>Lista de Precios
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Descarga nuestro documento oficial con especificaciones técnicas, guía de colores de filamentos y ejemplos de precios.
              </p>
              <a 
                href="/catalogo3d.pdf"
                download="Catalogo_InnovaLab_3D"
                className="inline-flex items-center gap-3 bg-white text-brand-dark font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1"
              >
                <Download size={24} className="text-brand-accent" />
                Descargar Ahora
              </a>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative w-48 h-64 bg-white rounded-r-2xl rounded-l-md shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col items-center justify-center border-l-4 border-gray-300">
                <FileText size={48} className="text-brand-primary mb-4" />
                <h3 className="text-brand-dark font-bold text-lg">CATÁLOGO</h3>
                <p className="text-gray-400 text-xs">InnovaLab Center</p>
                <div className="absolute top-1 right-1 w-full h-full bg-white rounded-r-2xl rounded-l-md border-l-4 border-gray-200 -z-10 transform rotate-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. CONTACTO FINAL (FULL WIDTH / ANCHO COMPLETO) --- */}
      <section className="py-24 bg-brand-dark relative overflow-hidden text-center">
         {/* Decoración de Fondo para que no sea plano */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Tienes una idea en mente?</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
               Si no encontraste lo que buscabas en el catálogo, escríbenos. Diseñamos desde cero cualquier pieza que necesites.
            </p>
            <a 
              href="https://wa.me/51987564941?text=Hola%20InnovaLab%20Center,%20quiero%20información%20sobre%20Impresión%203D."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-5 px-12 rounded-full shadow-2xl shadow-green-900/30 transition-all hover:scale-105"
            >
              <MessageCircle size={28} />
              Contáctanos 
            </a>
         </div>
      </section>

      {/* --- LIGHTBOX --- */}
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

// Componente Tarjeta Material (Dark Theme)
const MaterialCard = ({ title, desc, badge, color, bg }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${bg} ${color}`}>
      <Layers size={24} />
    </div>
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-current ${color} opacity-80`}>{badge}</span>
    </div>
    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{desc}</p>
  </div>
);

export default Print3D;