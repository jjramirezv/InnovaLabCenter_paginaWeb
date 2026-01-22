import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown, Cpu, Settings, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileProjOpen, setMobileProjOpen] = useState(false); // Estado para el acordeón móvil
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Definimos la estructura de links. 'Proyectos' tiene type: 'dropdown'
  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Impresión 3D', path: '/impresion-3d' },
    { name: 'Corte Láser', path: '/corte-laser' },
    { name: 'Robótica', path: '/robotica' },
    { name: 'Proyectos', type: 'dropdown' }, // Ítem Especial
    { name: 'Cuerpo Académico', path: '/academic-body' },
    { name: 'Noticias', path: '/news' },
    { name: 'Academia', path: 'https://innovalabcenter.up.railway.app/', external: true },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'py-2 bg-[#0B0F19]/90 backdrop-blur-lg border-b border-white/10 shadow-lg' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                IL
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-lg leading-none text-white">
                  InnovaLab
                </span>
                <span className="text-xs tracking-widest uppercase text-gray-400">
                  Center
                </span>
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
              {links.map((link) => (
                link.type === 'dropdown' ? (
                  // --- AQUÍ INCRUSTAMOS EL DROPDOWN DE PROYECTOS ---
                  <div key={link.name} className="relative group h-full flex items-center px-1">
                    <button className="flex items-center gap-1 text-gray-300 hover:text-white font-medium transition-colors py-2 px-3 text-sm">
                      Proyectos <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300"/>
                    </button>

                    {/* Menú Flotante */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 w-72">
                        <div className="bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 overflow-hidden ring-1 ring-white/10">
                        
                        <Link to="/proyectos/mecatronica" className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 group/item transition-colors">
                            <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover/item:bg-purple-500 group-hover/item:text-white transition-all">
                            <Cpu size={24} />
                            </div>
                            <div>
                            <span className="block text-white font-bold text-sm">Mecatrónica</span>
                            <span className="block text-gray-400 text-xs">Robótica y Control</span>
                            </div>
                        </Link>

                        <Link to="/proyectos/mecanica" className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 group/item transition-colors">
                            <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all">
                            <Settings size={24} />
                            </div>
                            <div>
                            <span className="block text-white font-bold text-sm">Mecánica</span>
                            <span className="block text-gray-400 text-xs">Diseño y Manufactura</span>
                            </div>
                        </Link>

                        <Link to="/proyectos/sistemas" className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 group/item transition-colors">
                            <div className="p-3 bg-green-500/20 rounded-lg text-green-400 group-hover/item:bg-green-500 group-hover/item:text-white transition-all">
                            <Monitor size={24} />
                            </div>
                            <div>
                            <span className="block text-white font-bold text-sm">Sistemas</span>
                            <span className="block text-gray-400 text-xs">Software & IoT</span>
                            </div>
                        </Link>

                        </div>
                    </div>
                  </div>
                  // ------------------------------------------------
                ) : (
                  <LinkItem 
                    key={link.name} 
                    link={link} 
                    isActive={location.pathname === link.path}
                  />
                )
              ))}
              <Link 
                to="/contacto"
                className="ml-2 bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105 flex items-center gap-1"
              >
                Contacto <ChevronRight size={14} />
              </Link>
            </div>

            {/* BOTÓN MÓVIL */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-[#0B0F19] pt-24 px-6 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-2">
              {links.map((link, idx) => (
                link.type === 'dropdown' ? (
                    // --- ACORDEÓN MÓVIL PARA PROYECTOS ---
                    <div key={idx} className="border-b border-white/10">
                        <button 
                            onClick={() => setMobileProjOpen(!mobileProjOpen)}
                            className="w-full flex items-center justify-between text-2xl font-bold text-white/80 hover:text-cyan-400 py-3"
                        >
                            Proyectos 
                            <ChevronDown size={20} className={`transition-transform ${mobileProjOpen ? 'rotate-180' : ''}`}/>
                        </button>
                        <AnimatePresence>
                            {mobileProjOpen && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden pl-4 pb-4 space-y-4"
                                >
                                    <Link to="/proyectos/mecatronica" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-300 hover:text-purple-400">
                                        <Cpu size={18}/> Mecatrónica
                                    </Link>
                                    <Link to="/proyectos/mecanica" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-300 hover:text-blue-400">
                                        <Settings size={18}/> Mecánica
                                    </Link>
                                    <Link to="/proyectos/sistemas" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-300 hover:text-green-400">
                                        <Monitor size={18}/> Sistemas
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    >
                    <LinkItemMobile 
                        link={link} 
                        onClick={() => setIsOpen(false)}
                    />
                    </motion.div>
                )
              ))}
              <Link 
                to="/contacto"
                onClick={() => setIsOpen(false)}
                className="mt-8 w-full bg-cyan-600 text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-cyan-500 transition-colors"
              >
                Contactar Ahora
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Componente Link Simple Desktop
const LinkItem = ({ link, isActive }) => {
  const Component = link.external ? 'a' : Link;
  const props = link.external ? { href: link.path, target: '_blank', rel: 'noopener noreferrer' } : { to: link.path };

  return (
    <Component 
      {...props}
      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        isActive 
          ? 'text-white bg-cyan-600 shadow-md' 
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {link.name}
    </Component>
  );
};

// Componente Link Simple Mobile
const LinkItemMobile = ({ link, onClick }) => {
    const Component = link.external ? 'a' : Link;
    const props = link.external ? { href: link.path, target: '_blank', rel: 'noopener noreferrer' } : { to: link.path };
  
    return (
      <Component 
        {...props}
        onClick={onClick}
        className="block text-2xl font-bold text-white/80 hover:text-cyan-400 py-3 border-b border-white/10"
      >
        {link.name}
      </Component>
    );
  };

export default Navbar;