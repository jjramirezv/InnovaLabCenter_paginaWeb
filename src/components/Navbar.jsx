import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Impresión 3D', path: '/impresion-3d' },
    { name: 'Corte Láser', path: '/corte-laser' },
    { name: 'Robótica', path: '/robotica' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: 'Academia', path: 'https://innovalabcenter.up.railway.app/', external: true },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'py-2 bg-brand-dark/90 backdrop-blur-lg border-b border-white/10 shadow-lg' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-primary/20 group-hover:scale-105 transition-transform">
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

            <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
              {links.map((link) => (
                <LinkItem 
                  key={link.name} 
                  link={link} 
                  isActive={location.pathname === link.path}
                />
              ))}
              <Link 
                to="/contacto"
                className="ml-2 bg-brand-accent hover:bg-brand-accentLight text-white px-5 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105 flex items-center gap-1"
              >
                Contacto <ChevronRight size={14} />
              </Link>
            </div>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-brand-dark pt-24 px-6 lg:hidden overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {links.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-2xl font-bold text-white/80 hover:text-brand-accent py-2 border-b border-white/10"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Link 
                to="/contacto"
                onClick={() => setIsOpen(false)}
                className="mt-8 w-full bg-brand-primary text-white text-center py-4 rounded-xl font-bold text-lg"
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

const LinkItem = ({ link, isActive }) => {
  const Component = link.external ? 'a' : Link;
  const props = link.external ? { href: link.path, target: '_blank', rel: 'noopener noreferrer' } : { to: link.path };

  return (
    <Component 
      {...props}
      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        isActive 
          ? 'text-white bg-brand-primary shadow-md' 
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {link.name}
    </Component>
  );
};

export default Navbar;