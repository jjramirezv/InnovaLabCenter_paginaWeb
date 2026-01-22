import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { 
  LayoutDashboard, 
  Newspaper, 
  Users, 
  Cpu, 
  Zap, 
  Box, 
  Bot, 
  LogOut, 
  Layers, 
  Settings, 
  Monitor 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const menuItems = [
    { title: 'Inicio', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    
    // Módulo de Contenido General
    { header: 'Blog & Equipo' },
    { title: 'Noticias', path: '/admin/noticias', icon: <Newspaper size={20} /> },
    { title: 'Cuerpo Académico', path: '/admin/equipo', icon: <Users size={20} /> },

    // Módulo de Servicios (Páginas Estáticas)
    { header: 'Páginas de Servicios' },
    { title: 'Impresión 3D', path: '/admin/servicios/3d', icon: <Box size={20} /> },
    { title: 'Corte Láser', path: '/admin/servicios/laser', icon: <Zap size={20} /> },
    { title: 'Robótica', path: '/admin/servicios/robotica', icon: <Bot size={20} /> },

    // Módulo de Proyectos (Las 3 áreas)
    { header: 'Gestión de Proyectos' },
    { title: 'Mecatrónica', path: '/admin/proyectos/mecatronica', icon: <Cpu size={20} /> },
    { title: 'Mecánica', path: '/admin/proyectos/mecanica', icon: <Settings size={20} /> },
    { title: 'Sistemas', path: '/admin/proyectos/sistemas', icon: <Monitor size={20} /> },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-50">
      
      {/* Header del Sidebar */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
            IL
          </div>
          <div>
            <h1 className="text-white font-bold text-sm">Panel Admin</h1>
            <p className="text-xs text-gray-500">InnovaLab Center</p>
          </div>
        </div>
      </div>

      {/* Lista de Navegación con Scroll */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {menuItems.map((item, index) => (
          item.header ? (
            <div key={index} className="px-3 mt-6 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
              {item.header}
            </div>
          ) : (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-cyan-600/10 text-cyan-400 border border-cyan-600/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              {item.icon}
              {item.title}
            </NavLink>
          )
        ))}
      </nav>

      {/* Footer del Sidebar (Logout) */}
      <div className="p-4 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;