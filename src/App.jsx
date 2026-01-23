import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // <--- Importamos useLocation
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from './firebaseConfig';

// --- LIBRERÍAS 3D ---
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';

// Públicos
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Print3D from './pages/Print3D';
import Laser from './pages/Laser';
import Robotics from './pages/Robotics';
import ProjectCategory from './pages/ProjectCategory';
import AcademicBody from './pages/AcademicBody';
import News from './pages/News';
import Contact from './pages/Contact';

// Admin
import Login from './admin/Login';
import DashboardLayout from './admin/DashboardLayout';
import EditHome from './admin/pages/EditHome';
import EditNews from './admin/pages/EditNews';
import EditTeam from './admin/pages/EditTeam';
import EditProjectCategory from './admin/pages/EditProjectCategory';
import EditService from './admin/pages/EditService';

const PrivateRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/admin/login" />;
};

// --- 1. COMPONENTE AVATAR 3D ---
const Avatar3D = () => {
  const { scene } = useGLTF('/ingeniero1.glb'); 
  return (
    <primitive 
      object={scene} 
      scale={5}      
      position={[0, -1.1, 0]} 
      rotation={[0, 0, 0]}
    />
  );
};

// --- 2. COMPONENTE ASISTENTE INTELIGENTE (Lógica de Mensajes) ---
const FloatingAssistant = () => {
  const location = useLocation(); // Detecta en qué página estamos

  // Si estamos en admin, no mostramos nada
  if (location.pathname.includes('/admin')) return null;

  // Lógica para decidir qué mensaje mostrar según la ruta
  const getContextData = () => {
    const path = location.pathname;

    if (path.includes('/robotica')) {
      return { 
        bubble: "🤖 ¿Buscas Kits?", 
        msg: "Hola InnovaLab, estoy viendo la sección de Robótica y me interesan los kits o componentes." 
      };
    }
    if (path.includes('/impresion-3d')) {
      return { 
        bubble: "🖨️ ¿Cotizar 3D?", 
        msg: "Hola, estoy en la sección de Impresión 3D y quisiera cotizar un modelo." 
      };
    }
    if (path.includes('/corte-laser')) {
      return { 
        bubble: "✨ Corte y Grabado", 
        msg: "Hola, me interesa el servicio de Corte Láser y Grabado." 
      };
    }
    if (path.includes('/proyectos')) {
      return { 
        bubble: "🚀 Asesoría Tesis", 
        msg: "Hola, vi sus proyectos realizados y quisiera asesoría para el mío." 
      };
    }
    if (path.includes('/contacto')) {
      return { 
        bubble: "📍 ¿Nos visitas?", 
        msg: "Hola, quisiera agendar una visita a sus oficinas." 
      };
    }
    
    // Default (Home y otras)
    return { 
      bubble: "👋 ¡Contáctanos!", 
      msg: "Hola InnovaLab Center, vengo de su página web y quisiera más información." 
    };
  };

  const { bubble, msg } = getContextData();
  const whatsappUrl = `https://wa.me/51987564941?text=${encodeURIComponent(msg)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end group">
      {/* Globo de Texto Dinámico */}
      <a 
        href={whatsappUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-white text-gray-800 px-5 py-3 rounded-2xl shadow-xl border border-cyan-100 mb-[-5px] mr-8 transform transition-all duration-300 origin-bottom-right group-hover:scale-105 relative z-50 hover:bg-gray-50 cursor-pointer min-w-[140px] text-center"
      >
          <p className="text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap">
            {bubble}
          </p>
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 border-r border-b border-cyan-100"></div>
      </a>

      {/* Escena 3D */}
      <div className="relative w-48 h-56 avatar-float transition-transform duration-300 group-hover:scale-105">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <directionalLight position={[-5, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
                <Avatar3D />
                <Environment preset="city" />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={4} />
          </Canvas>
      </div>
    </div>
  );
};

// --- 3. APP PRINCIPAL ---
function App() {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (isChecking) {
    return (
      <div className="h-screen bg-[#0B0F19] flex items-center justify-center text-cyan-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <style>{`
        @keyframes float-avatar {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .avatar-float { 
          animation: float-avatar 4s ease-in-out infinite; 
        }
        .group:hover .avatar-float, .group:active .avatar-float {
            animation-play-state: paused;
        }
      `}</style>

      {!window.location.pathname.includes('/admin') && <Navbar />}

      <main> 
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/impresion-3d" element={<Print3D />} />
          <Route path="/corte-laser" element={<Laser />} />
          <Route path="/robotica" element={<Robotics />} />
          <Route path="/proyectos/mecatronica" element={<ProjectCategory type="mecatronica" />} />
          <Route path="/proyectos/mecanica" element={<ProjectCategory type="mecanica" />} />
          <Route path="/proyectos/sistemas" element={<ProjectCategory type="sistemas" />} />
          <Route path="/academic-body" element={<AcademicBody />} />
          <Route path="/news" element={<News />} />
          <Route path="/contacto" element={<Contact />} />

          {/* Rutas Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute user={user}><DashboardLayout /></PrivateRoute>}>
            <Route path="dashboard" element={<EditHome />} />
            <Route path="noticias" element={<EditNews />} />
            <Route path="equipo" element={<EditTeam />} />
            <Route path="servicios/3d" element={<EditService serviceId="print3d" />} />
            <Route path="servicios/laser" element={<EditService serviceId="laser" />} />
            <Route path="servicios/robotica" element={<EditService serviceId="robotica" />} />
            <Route path="proyectos/mecatronica" element={<EditProjectCategory type="mecatronica" />} />
            <Route path="proyectos/mecanica" element={<EditProjectCategory type="mecanica" />} />
            <Route path="proyectos/sistemas" element={<EditProjectCategory type="sistemas" />} />
          </Route>
        </Routes>
      </main>

      {/* AQUÍ INSERTAMOS EL ASISTENTE INTELIGENTE */}
      <FloatingAssistant />

    </BrowserRouter>
  );
}

export default App;