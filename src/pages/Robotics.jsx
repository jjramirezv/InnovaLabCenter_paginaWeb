import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Bot, Wifi, Code, Check, X, MessageCircle, Zap, GraduationCap, Settings, Radio, FileText, Download, ArrowRight } from 'lucide-react';

// --- DATOS (Categorías Robótica) ---
// RECUERDA: Guarda tus fotos en public/images/ con estos nombres
const categoriesData = [
  {
    id: 'kits',
    title: 'Kits Educativos',
    icon: <Bot size={24} />,
    desc: 'Aprende haciendo. Nuestros kits están diseñados para introducir a niños y jóvenes en el mundo de la programación y la mecánica de forma divertida.',
    features: ['Robot Seguidor de Línea', 'Brazo Robótico Armable', 'Carro Evasor de Obstáculos'],
    images: ['/images/kit1.png', '/images/kit2.png', '/images/kit3.png']
  },
  {
    id: 'escolar',
    title: 'Proyectos Escolares',
    icon: <Zap size={24} />,
    desc: 'Asesoría y desarrollo para ferias de ciencias. Proyectos funcionales, explicativos y visualmente impactantes para asegurar esa buena calificación.',
    features: ['Generadores de Energía', 'Maquetas Automatizadas', 'Sistemas Hidráulicos y Mecánicos'],
    images: ['/images/esc1.png', '/images/esc2.png', '/images/esc3.png']
  },
  {
    id: 'universitario',
    title: 'Nivel Universitario',
    icon: <GraduationCap size={24} />,
    desc: 'Ingeniería avanzada. Desarrollamos prototipos complejos con lógica de control, visión artificial y mecánica de precisión.',
    features: ['Robot Sumo y Minisumo', 'Control PID y Lógica Difusa', 'Visión Artificial (Python/OpenCV)'],
    images: ['/images/uni1.png', '/images/uni2.png', '/images/uni3.png']
  },
  {
    id: 'iot',
    title: 'IoT y Automatización',
    icon: <Wifi size={24} />,
    desc: 'Internet de las Cosas. Controla dispositivos desde tu celular o crea sistemas de monitoreo con sensores avanzados.',
    features: ['Domótica con ESP32 / ESP8266', 'Dashboards Web y App Móvil', 'Lectura de Sensores Industriales'],
    images: ['/images/iot1.png', '/images/iot2.png', '/images/iot3.png']
  }
];

const Robotics = () => {
  const [activeTab, setActiveTab] = useState(categoriesData[0].id);
  const [selectedImage, setSelectedImage] = useState(null);

  // Obtener datos de la categoría activa
  const activeContent = categoriesData.find(cat => cat.id === activeTab);

  const openWhatsapp = (category) => {
    const text = `Hola InnovaLab, quiero información sobre Robótica, específicamente: ${category}.`;
    window.open(`https://wa.me/51987564941?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">

      {/* --- 1. HERO SECTION (Estilo Cyber/Tech) --- */}
      <section className="relative pt-36 pb-24 bg-[#0f172a] overflow-hidden">
        {/* Fondo de red neuronal / tech */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        {/* Luces decorativas */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/30 text-cyan-400 text-sm font-bold mb-6 border border-cyan-500/30 backdrop-blur-md">
              <Cpu size={16} /> Ingeniería y Desarrollo
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Robótica & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Automatización</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Proyectos educativos, universitarios y soluciones a medida. 
              Desde tu primer robot seguidor de línea hasta sistemas complejos de IoT.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. PLATAFORMAS Y TECNOLOGÍAS --- */}
      <section className="py-20 bg-[#1e293b] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <div>
               <h2 className="text-3xl font-bold text-white">Tecnologías que dominamos</h2>
               <p className="text-gray-400 mt-2 max-w-lg">Trabajamos con los microcontroladores y lenguajes más demandados del mercado.</p>
             </div>
             <div className="text-cyan-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
               <Code size={16} /> Hardware & Software
             </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <TechCard title="Arduino" desc="La base de la robótica educativa y prototipado rápido." icon={<Bot size={24}/>} color="text-teal-400" bg="bg-teal-400/10" />
            <TechCard title="ESP32 / IoT" desc="Conectividad WiFi y Bluetooth para domótica avanzada." icon={<Wifi size={24}/>} color="text-blue-400" bg="bg-blue-400/10" />
            <TechCard title="Sensores" desc="Ultrasonido, temperatura, gas, movimiento y más." icon={<Radio size={24}/>} color="text-red-400" bg="bg-red-400/10" />
            <TechCard title="Impresión 3D" desc="Diseño y fabricación de chasis y piezas mecánicas." icon={<Settings size={24}/>} color="text-orange-400" bg="bg-orange-400/10" />
          </div>
        </div>
      </section>

      {/* --- 3. GALERÍA INTERACTIVA (Tabs System) --- */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">Explora por Categoría</h2>
            <p className="text-gray-500 text-lg">Selecciona un nivel o área para ver proyectos realizados.</p>
          </div>

          {/* MENU DE PESTAÑAS */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 sticky top-20 z-30 py-4 bg-[#F8FAFC]/90 backdrop-blur-sm">
            {categoriesData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-300 border shadow-sm ${
                  activeTab === cat.id 
                    ? 'bg-brand-dark text-white border-brand-dark ring-2 ring-cyan-500/50 transform scale-105' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-brand-primary hover:text-brand-primary'
                }`}
              >
                {React.cloneElement(cat.icon, { size: 18, className: activeTab === cat.id ? 'text-cyan-500' : 'text-gray-400' })}
                {cat.title}
              </button>
            ))}
          </div>

          {/* CONTENIDO DINÁMICO */}
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
                
                {/* Lado Izquierdo: Info */}
                <div className="lg:col-span-5 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center border border-cyan-100 shadow-inner">
                      {React.cloneElement(activeContent.icon, { size: 36, className: 'text-brand-primary' })}
                    </div>
                    <h3 className="text-3xl font-bold text-brand-dark leading-tight">{activeContent.title}</h3>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                    {activeContent.desc}
                  </p>

                  <div className="bg-cyan-50/50 rounded-xl p-6 mb-8 border border-cyan-100">
                    <h4 className="text-xs font-bold uppercase text-brand-primary mb-4 tracking-wider flex items-center gap-2">
                      <Cpu size={14} /> Incluye desarrollo de:
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
                        Cotizar Proyecto
                    </button>
                  </div>
                </div>

                {/* Lado Derecho: Imágenes Masonry */}
                <div className="lg:col-span-7 grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
                  {/* Foto Principal */}
                  <div 
                    className="col-span-2 row-span-2 md:col-span-1 md:row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group shadow-md"
                    onClick={() => setSelectedImage(activeContent.images[0])}
                  >
                    <img 
                      src={activeContent.images[0]} 
                      alt="Principal" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {e.target.src = 'https://via.placeholder.com/600x800?text=Proyecto+Robotica'}}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                         <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold text-brand-dark shadow-lg inline-block">
                             Ver Proyecto
                         </div>
                    </div>
                  </div>
                  
                  {/* Fotos Secundarias */}
                  {[1, 2].map((idx) => (
                    <div 
                      key={idx}
                      className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hidden md:block"
                      onClick={() => setSelectedImage(activeContent.images[idx])}
                    >
                      <img 
                        src={activeContent.images[idx]} 
                        alt={`Detalle ${idx}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=Detalle'}}
                      />
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* --- 4. [NUEVO] PORTAFOLIO PDF (Estilo Robótico) --- */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Decoración Cyan/Violeta */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-10 p-10 md:p-16 items-center">
            <div>
              <div className="inline-block bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-lg shadow-cyan-500/20">
                PORTAFOLIO OFICIAL
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Catálogo de Kits & <br/>Proyectos 2025
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Descarga nuestro portafolio completo con detalles técnicos de kits educativos, lista de componentes y servicios de automatización.
              </p>
              
              <a 
                href="/portafolio_robotica.pdf" // GUÁRDALO EN PUBLIC
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-[#0f172a] font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-cyan-50 transition-all transform hover:-translate-y-1"
              >
                <Download size={24} className="text-cyan-600" />
                Ver Portafolio PDF
              </a>
            </div>

            {/* Icono Visual */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-48 h-64 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <FileText size={48} className="text-cyan-400 mb-4" />
                <h3 className="text-white font-bold text-lg">PROYECTOS</h3>
                <p className="text-gray-400 text-xs uppercase">Robótica & IoT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. CONTACTO FINAL (FULL WIDTH) --- */}
      <section className="py-24 bg-brand-dark relative overflow-hidden text-center">
         <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Tienes un proyecto en mente?</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
               Desarrollamos soluciones a medida para estudiantes, tesistas y empresas. Cuéntanos tu idea.
            </p>
            <a 
              href="https://wa.me/51987564941?text=Hola%20InnovaLab%20Center,%20quiero%20información%20sobre%20Robótica."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-5 px-12 rounded-full shadow-2xl shadow-green-900/30 transition-all hover:scale-105"
            >
              <MessageCircle size={28} />
              Solicitar Información
            </a>
         </div>
      </section>

      {/* --- LIGHTBOX (Zoom) --- */}
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

// Componente Tarjeta Tech
const TechCard = ({ title, desc, icon, color, bg }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${bg} ${color}`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{desc}</p>
  </div>
);

export default Robotics;