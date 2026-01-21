import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Iconos específicos para Robótica
import { Cpu, Bot, Wifi, Code, Check, X, MessageCircle, Download, ExternalLink, Maximize2, FileText, Eye, Zap, GraduationCap, Radio, Settings } from 'lucide-react';

const roboticsCategories = [
  {
    id: 'kits',
    title: 'Kits Educativos',
    desc: 'Aprende haciendo. Nuestros kits están diseñados para introducir a niños y jóvenes en el mundo de la programación y la mecánica de forma divertida.',
    features: ['Robot Seguidor de Línea', 'Brazo Robótico Armable', 'Carro Evasor de Obstáculos'],
    images: [
      '/images/kit1.png', 
      '/images/kit2.png', 
      '/images/kit1.png', 
      '/images/kit1.png', 
      '/images/kit2.png', 
      '/images/kit1.png']
  },
  {
    id: 'escolar',
    title: 'Proyectos Escolares',
    desc: 'Asesoría y desarrollo para ferias de ciencias. Proyectos funcionales, explicativos y visualmente impactantes para asegurar esa buena calificación.',
    features: ['Generadores de Energía', 'Maquetas Automatizadas', 'Sistemas Hidráulicos'],
    images: [
      '/images/esc1.png', 
      '/images/esc2.png', 
      '/images/esc3.png']
  },
  {
    id: 'universitario',
    title: 'Nivel Universitario',
    desc: 'Ingeniería avanzada. Desarrollamos prototipos complejos con lógica de control, visión artificial y mecánica de precisión.',
    features: ['Robot Sumo y Minisumo', 'Control PID y Lógica Difusa', 'Visión Artificial (Python)'],
    images: [
      '/images/uni1.png', 
      '/images/uni2.png', 
      '/images/uni3.png']
  },
  {
    id: 'iot',
    title: 'IoT y Automatización',
    desc: 'Internet de las Cosas. Controla dispositivos desde tu celular o crea sistemas de monitoreo con sensores avanzados.',
    features: ['Domótica con ESP32', 'Dashboards Web y App', 'Lectura de Sensores'],
    images: [
      '/images/iot1.png', 
      '/images/iot2.png', 
      '/images/iot3.png']
  }
];

const Robotics = () => {
  const [activeCategory, setActiveCategory] = useState(roboticsCategories[0]);
  const [selectedImage, setSelectedImage] = useState(null);

  const openWhatsapp = (topic) => {
    const text = `Hola InnovaLab, quiero información sobre Robótica: ${topic || 'General'}.`;
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

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-24 bg-[#0f172a] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/30 text-cyan-400 text-sm font-bold mb-6 border border-cyan-500/30 backdrop-blur-md">
              <Cpu size={16} /> Ingeniería y Desarrollo
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Robótica & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Automatización</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-light">Proyectos educativos, universitarios y soluciones a medida.</p>
          </div>
        </div>
      </section>

      {/* 2. TECNOLOGÍAS */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-brand-dark">Tecnologías que dominamos</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <TechCard icon={<Bot />} title="Arduino" desc="La base de la robótica educativa." color="text-teal-600" bg="bg-teal-50" />
             <TechCard icon={<Wifi />} title="ESP32 / IoT" desc="Conectividad WiFi y Bluetooth." color="text-blue-600" bg="bg-blue-50" />
             <TechCard icon={<Radio />} title="Sensores" desc="Ultrasonido, temperatura, gas, etc." color="text-red-600" bg="bg-red-50" />
             <TechCard icon={<Settings />} title="Impresión 3D" desc="Chasis y piezas mecánicas a medida." color="text-orange-600" bg="bg-orange-50" />
          </div>
        </div>
      </section>

      {/* 3. GALERÍA SCROLLABLE */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">Explora por Categoría</h2>
            <div className="h-1 w-20 bg-cyan-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 sticky top-24 z-10">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 space-y-2">
                {roboticsCategories.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat)} className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center justify-between group ${activeCategory.id === cat.id ? 'bg-brand-dark text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}>
                    <span className="font-bold">{cat.title}</span>
                    {activeCategory.id === cat.id && <Bot size={18} className="text-cyan-400" />}
                  </button>
                ))}
              </div>
              <div className="mt-6 bg-cyan-50 rounded-2xl p-6 border border-cyan-100 hidden lg:block">
                <h4 className="font-bold text-cyan-800 mb-2">¿Proyecto Especial?</h4>
                <p className="text-sm text-cyan-700/80 mb-4">Si tienes una idea o requerimiento de tesis, te asesoramos desde cero.</p>
                <button onClick={() => openWhatsapp('Asesoría Tesis/Proyecto')} className="w-full bg-cyan-200 hover:bg-cyan-300 text-cyan-900 font-bold py-2 rounded-lg text-sm transition-colors">Consultar Idea</button>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-[700px] flex flex-col">

                  <div className="mb-6 border-b border-gray-100 pb-6 shrink-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-3xl font-bold text-brand-dark mb-2">{activeCategory.title}</h3>
                            <p className="text-gray-600 text-sm">{activeCategory.desc}</p>
                        </div>
                        <button onClick={() => openWhatsapp(activeCategory.title)} className="inline-flex items-center justify-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/20 shrink-0">
                        <MessageCircle size={20} /> Cotizar
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {activeCategory.features.map((feat, idx) => (
                        <span key={idx} className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold"><Check size={14} className="text-cyan-600" /> {feat}</span>
                      ))}
                    </div>
                  </div>

                  <div className="overflow-y-auto custom-scrollbar pr-2 flex-grow">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
                        {activeCategory.images.map((imgSrc, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden cursor-pointer h-40 md:h-48 shadow-sm border border-gray-100" onClick={() => setSelectedImage(imgSrc)}>
                            <img src={imgSrc} alt={`${activeCategory.title} ${idx}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => {e.target.src = 'https://via.placeholder.com/400x400?text=Proyecto+Robotica'}} />
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

      {/* 4. SECCIÓN PDF */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto bg-[#0f172a] rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-block bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6">PORTAFOLIO 2025</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Catálogo de Kits & <br/> <span className="text-cyan-400">Proyectos</span></h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">Descarga nuestro portafolio completo con detalles técnicos de kits educativos, lista de componentes y servicios.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/portafolio_robotica.pdf" download="Catalogo_Robotica_InnovaLab" className="flex items-center justify-center gap-3 bg-white text-brand-dark font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1"><Download size={22} className="text-cyan-600" /> Descargar PDF</a>
                <a href="/portafolio_robotica.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 border border-gray-600 text-gray-300 font-bold py-4 px-8 rounded-xl hover:border-white hover:text-white transition-all"><ExternalLink size={22} /> Ver Online</a>
              </div>
            </div>
            <div className="relative group">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-gray-700 transform group-hover:scale-[1.02] transition-transform duration-500">
                <div className="bg-gray-900 rounded-t-xl px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
                  <div className="ml-4 bg-gray-800 px-3 py-1 rounded text-xs text-gray-400 flex items-center gap-2 w-full max-w-[200px]"><FileText size={10} /> portafolio_robotica.pdf</div>
                </div>
                <div className="bg-white h-[400px] w-full rounded-b-xl overflow-hidden relative">
                   <iframe src="/portafolio_robotica.pdf#toolbar=0" title="Visor Portafolio" className="w-full h-full"></iframe>
                   <a href="/portafolio_robotica.pdf" target="_blank" className="absolute bottom-4 right-4 bg-black/80 text-white p-2 rounded-lg hover:bg-cyan-500 transition-colors backdrop-blur-sm" title="Ver pantalla completa"><Maximize2 size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACTO FINAL */}
      <section className="py-24 bg-[#0f172a] relative overflow-hidden text-center border-t border-gray-800">
         <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
         <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Tienes un proyecto en mente?</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">Desarrollamos soluciones a medida para estudiantes, tesistas y empresas. Cuéntanos tu idea.</p>
            <a href="https://wa.me/51987564941?text=Hola,%20quiero%20información%20sobre%20Robótica." target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-5 px-12 rounded-full shadow-2xl shadow-green-900/30 transition-all hover:scale-105">
              <MessageCircle size={28} /> Solicitar Información
            </a>
         </div>
      </section>

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

// Componente Tarjeta Tech
const TechCard = ({ icon, title, desc, color, bg }) => (
  <div className={`p-6 rounded-xl border border-gray-100 transition-shadow hover:shadow-lg ${bg}`}>
    <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 ${color} shadow-sm`}>{icon}</div>
    <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

export default Robotics;