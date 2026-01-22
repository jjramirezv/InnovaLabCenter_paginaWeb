import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Importamos tu conexión
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Aquí Firebase verifica si el usuario que creaste existe
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard'); // Si es correcto, entra al panel
    } catch (err) {
      setError('Acceso denegado. Verifica tus credenciales.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 relative overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#020617] to-[#020617]"></div>

      <div className="max-w-md w-full bg-[#0f172a] p-8 rounded-2xl border border-white/5 shadow-2xl relative z-10">
        
        <Link to="/" className="absolute top-4 left-4 text-gray-500 hover:text-white transition-colors">
            <ArrowLeft size={20} />
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Lock size={32} className="text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Panel de Control</h2>
          <p className="text-gray-400 mt-2 text-xs uppercase tracking-widest">Acceso Restringido</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-pulse">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2 uppercase ml-1">Correo Institucional</label>
            <div className="relative group">
              <Mail size={18} className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="email" 
                className="w-full bg-[#1e293b] border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600"
                placeholder="admin@innovalab.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2 uppercase ml-1">Contraseña</label>
            <div className="relative group">
              <Lock size={18} className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="password" 
                className="w-full bg-[#1e293b] border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-900/20 transition-all transform hover:scale-[1.01] active:scale-95"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;