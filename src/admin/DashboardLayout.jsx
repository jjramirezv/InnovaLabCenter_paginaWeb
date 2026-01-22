import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Importamos iconos para el botón
import Sidebar from './components/Sidebar';

const DashboardLayout = () => {
  // Estado para controlar si el menú lateral está visible en móvil
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex relative">
      
      {/* --- 1. OVERLAY (FONDO OSCURO EN MÓVIL) --- */}
      {/* Solo se ve en móvil cuando el menú está abierto. Al hacer clic, cierra el menú. */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- 2. BARRA LATERAL (SIDEBAR WRAPPER) --- */}
      {/* - fixed inset-y-0: Ocupa toda la altura.
          - z-50: Está por encima de todo.
          - md:relative: En escritorio vuelve a ser relativo (empuja el contenido).
          - translate-x: Controla la animación de entrada/salida en móvil.
      */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#0B0F19] text-white transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:inset-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Botón X para cerrar en móvil (opcional, por usabilidad) */}
        <div className="absolute top-4 right-4 md:hidden">
           <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
             <X size={24} />
           </button>
        </div>

        {/* Tu componente Sidebar original se carga aquí dentro */}
        <div className="h-full overflow-y-auto">
           <Sidebar />
        </div>
      </aside>

      {/* --- 3. ÁREA DE CONTENIDO PRINCIPAL --- */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen"> 
        
        {/* BARRA SUPERIOR (HEADER) */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-4 md:px-8 justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-4">
            {/* BOTÓN HAMBURGUESA (Solo visible en móvil 'md:hidden') */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} />
            </button>

            <h2 className="text-gray-800 font-bold text-lg truncate">Administración</h2>
          </div>

          {/* PERFIL */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">Hola, Admin</span>
            <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
              A
            </div>
          </div>
        </header>

        {/* CONTENIDO DE LAS PÁGINAS (OUTLET) */}
        <main className="p-4 md:p-8 flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;