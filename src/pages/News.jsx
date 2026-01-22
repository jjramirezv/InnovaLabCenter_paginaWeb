import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag, Search, Radio, Globe, Signal, Zap, ChevronRight } from 'lucide-react';

// --- IMPORTS FIREBASE ---
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// --- DATOS SIMULADOS (Solo se usan si NO hay internet o BD vacía) ---
const staticNewsData = [
  {
    id: 'static-1',
    title: 'Lanzamiento del Prototipo "X-Rover" para Minería',
    category: 'Prototipado',
    date: '20 Oct, 2025',
    author: 'Ing. David Torres',
    desc: 'Tras meses de desarrollo en nuestro taller, presentamos el primer robot explorador diseñado específicamente para terrenos irregulares.',
    image: 'https://cdn.pixabay.com/video/2020/05/25/40139-424930032_large.mp4', 
    featured: true
  },
  {
    id: 'static-2',
    title: 'Nuevo Filamento de Fibra de Carbono',
    category: 'Materiales',
    date: '18 Oct, 2025',
    author: 'Tec. Sofia Ruiz',
    desc: 'Ya disponible en nuestro laboratorio. Este material ofrece una resistencia mecánica superior.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=2070',
    featured: false
  }
];

// Animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const News = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const filters = ['Todos', 'Prototipado', 'Eventos', 'Desarrollo', 'Guías', 'Materiales', 'Institucional'];

  // Estado de noticias
  const [newsList, setNewsList] = useState(staticNewsData);
  const [loading, setLoading] = useState(true);

  // --- CARGAR DE FIREBASE ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(collection(db, "noticias"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const firebaseNews = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // LÓGICA CLAVE: Si hay datos reales, REEMPLAZAMOS los estáticos.
        if (firebaseNews.length > 0) {
          setNewsList(firebaseNews);
        }
      } catch (error) {
        console.error("Error cargando noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // --- LÓGICA DE VISUALIZACIÓN ---
  // 1. Filtrar por categoría
  const filteredNews = activeFilter === 'Todos' 
    ? newsList 
    : newsList.filter(n => n.category === activeFilter);

  // 2. Separar la Destacada (La primera de la lista filtrada)
  const featuredNews = filteredNews[0]; 
  const otherNews = filteredNews.slice(1);

  // --- EFECTOS VISUALES ---
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const backgroundCheck = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(56, 189, 248, 0.15), 
    transparent 80%
  )`;

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
       <style>{`
        @keyframes ticker-slide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-ticker { animation: ticker-slide 30s linear infinite; }
        .dot-map { background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px); background-size: 40px 40px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* 1. HERO SECTION */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative pt-40 pb-40 bg-[#0B0F19] overflow-hidden flex flex-col items-center justify-center group"
      >
        <div className="absolute top-1/4 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none">
           <div className="whitespace-nowrap animate-ticker text-[8rem] font-black text-white">
              LATEST NEWS • INNOVATION • DEVELOPMENT • FUTURE • LATEST NEWS • INNOVATION • DEVELOPMENT • FUTURE •
           </div>
        </div>
        <div className="absolute inset-0 z-0 dot-map opacity-50"></div>
        <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background: backgroundCheck }} />

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 border border-red-500/30 rounded-full bg-red-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-red-400 text-xs font-mono font-bold tracking-widest uppercase">Newsroom Live Feed</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight relative inline-block">
              Bitácora de <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">Innovación</span>
              <Globe className="absolute -top-8 -right-12 text-sky-500/20 hidden md:block" size={64} />
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Mantente conectado con el pulso tecnológico de Huancayo. <span className="text-sky-400">Lanzamientos y avances</span> en tiempo real.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50/10 to-transparent z-20"></div>
      </section>

      {/* 2. NOTICIA DESTACADA */}
      {featuredNews && (
      <section className="relative -mt-24 px-6 pb-20 z-30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2 border border-gray-100"
          >
            <div className="relative h-[400px] lg:h-auto bg-[#0B0F19] overflow-hidden group">
               {featuredNews.image && (featuredNews.image.includes('.mp4') || featuredNews.image.includes('video')) ? (
                 <video src={featuredNews.image} autoPlay loop muted className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
               ) : (
                 <img src={featuredNews.image || 'https://via.placeholder.com/800x600'} alt={featuredNews.title} className="w-full h-full object-cover" />
               )}
               <div className="absolute top-6 left-6 flex gap-2">
                 <span className="bg-cyan-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2">
                    <Zap size={12} fill="currentColor"/> Última Hora
                 </span>
               </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center relative">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 font-mono border-b border-gray-100 pb-4">
                <span className="flex items-center gap-1"><Calendar size={14} className="text-cyan-600"/> {featuredNews.date}</span>
                <span className="flex items-center gap-1"><User size={14} className="text-cyan-600"/> {featuredNews.author || 'InnovaLab'}</span>
                <span className="flex items-center gap-1"><Tag size={14} className="text-cyan-600"/> {featuredNews.category}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B0F19] mb-4 leading-tight hover:text-cyan-600 transition-colors cursor-pointer">
                {featuredNews.title}
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed line-clamp-3">
                {featuredNews.desc}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-auto">
                <button className="bg-[#0B0F19] text-white px-8 py-4 rounded-xl font-bold hover:bg-cyan-600 transition-all flex items-center gap-2 shadow-lg">
                  Leer Artículo <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* 3. BARRA DE FILTROS */}
      <div className="bg-gray-50/95 sticky top-20 z-20 py-4 border-b border-gray-200 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                  activeFilter === filter 
                    ? 'bg-cyan-600 border-cyan-600 text-white shadow-md' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. GRID DE NOTICIAS RESTANTES */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {loading ? (
             <div className="text-center text-gray-400 py-10">Cargando...</div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {otherNews.map((item) => (
                <motion.article 
                  key={item.id}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    {item.image && (item.image.includes('.mp4')) ? (
                        <video src={item.image} muted loop onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} className="w-full h-full object-cover" />
                    ) : (
                        <img 
                          src={item.image || 'https://via.placeholder.com/400x300'} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur text-brand-dark px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <Tag size={10} className="text-cyan-600" /> {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-mono">
                      <span className="flex items-center gap-1"><Calendar size={12}/> {item.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="flex items-center gap-1"><User size={12}/> {item.author}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#0B0F19] mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {item.desc}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                      <button className="text-[#0B0F19] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Leer más <ChevronRight size={16} className="text-cyan-600" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* 5. NEWSLETTER (Igual) */}
      <section className="py-24 bg-[#151b2b] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block p-4 bg-white/5 rounded-2xl mb-6 border border-white/10">
            <Radio size={32} className="text-white animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">No te pierdas ninguna novedad</h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg">Recibe actualizaciones sobre nuevos cursos y lanzamientos.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="tu@correo.com" className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-all"/>
            <button className="px-8 py-4 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition-all">Suscribirme</button>
          </form>
        </div>
      </section> 
    </div>
  );
};

export default News;