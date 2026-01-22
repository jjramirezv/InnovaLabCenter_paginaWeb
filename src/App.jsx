import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from './firebaseConfig';

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

// Importaciones Directas
import EditHome from './admin/pages/EditHome'; // <--- El editor de imágenes
import EditNews from './admin/pages/EditNews';
import EditTeam from './admin/pages/EditTeam';
import EditProjectCategory from './admin/pages/EditProjectCategory';
import EditService from './admin/pages/EditService';

const PrivateRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/admin/login" />;
};

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
      {!window.location.pathname.includes('/admin') && <Navbar />}

      <main> 
        <Routes>
          {/* Públicas */}
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

          {/* Admin */}
          <Route path="/admin/login" element={<Login />} />
          
          <Route path="/admin" element={<PrivateRoute user={user}><DashboardLayout /></PrivateRoute>}>
            
            {/* RUTA DIRECTA: "Inicio" en el sidebar lleva a editar la imagen del home */}
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
    </BrowserRouter>
  );
}

export default App;