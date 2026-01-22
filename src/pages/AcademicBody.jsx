import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Users, Target, Eye, Mail, Award, Terminal, Cpu, Code, ChevronRight, Linkedin, Github, PenTool, Database, Wifi, Wrench, Share2 } from 'lucide-react';

// --- DATOS DEL EQUIPO (8 Integrantes) ---
const teamMembers = [
  {
    id: 1,
    name: 'Ing. Carlos Pérez',
    role: 'Director General',
    specialty: 'Mecatrónica & Robótica',
    desc: 'Especialista en automatización industrial con 10 años de experiencia liderando proyectos tecnológicos.',
    email: 'director@innovalab.com',
    image: '/images/member1.jpg',
    color: 'text-cyan-400',
    icon: <Award size={20} className="text-cyan-400" />
  },
  {
    id: 2,
    name: 'Lic. Ana Gomez',
    role: 'Coord. Académica',
    specialty: 'Gestión Educativa',
    desc: 'Apasionada por la enseñanza STEAM y el desarrollo de currículas innovadoras para jóvenes y universitarios.',
    email: 'academico@innovalab.com',
    image: '/images/member2.jpg',
    color: 'text-purple-400',
    icon: <Users size={20} className="text-purple-400" />
  },
  {
    id: 3,
    name: 'Ing. David Torres',
    role: 'Lead Developer',
    specialty: 'Software & IoT',
    desc: 'Arquitecto de soluciones cloud y desarrollador Full Stack enfocado en sistemas industriales y dashboards.',
    email: 'dev@innovalab.com',
    image: '/images/member3.jpg',
    color: 'text-green-400',
    icon: <Terminal size={20} className="text-green-400" />
  },
  {
    id: 4,
    name: 'Tec. Sofia Ruiz',
    role: 'Jefa de Taller',
    specialty: 'Manufactura Digital',
    desc: 'Experta en impresión 3D, corte láser y prototipado rápido de alta precisión para ingeniería.',
    email: 'taller@innovalab.com',
    image: '/images/member4.jpg',
    color: 'text-orange-400',
    icon: <Cpu size={20} className="text-orange-400" />
  },
  {
    id: 5,
    name: 'Ing. Marco Díaz',
    role: 'Especialista IA',
    specialty: 'Visión Artificial',
    desc: 'Investigador en algoritmos de Machine Learning aplicados al reconocimiento de imágenes y control.',
    email: 'ia@innovalab.com',
    image: '/images/member5.jpg',
    color: 'text-blue-500',
    icon: <Eye size={20} className="text-blue-500" />
  },
  {
    id: 6,
    name: 'Lic. Laura Velez',
    role: 'Diseño de Producto',
    specialty: 'UX/UI & Prototipado',
    desc: 'Encargada de la experiencia de usuario en nuestros sistemas y la estética funcional de los robots.',
    email: 'design@innovalab.com',
    image: '/images/member6.jpg',
    color: 'text-pink-400',
    icon: <PenTool size={20} className="text-pink-400" />
  },
  {
    id: 7,
    name: 'Ing. Jorge Quispe',
    role: 'Instructor Senior',
    specialty: 'Microcontroladores',
    desc: 'Docente especializado en arquitectura de procesadores ARM, PIC y programación embebida avanzada.',
    email: 'instructor@innovalab.com',
    image: '/images/member7.jpg',
    color: 'text-red-400',
    icon: <Wifi size={20} className="text-red-400" />
  },
  {
    id: 8,
    name: 'Tec. Luis Mamani',
    role: 'Soporte Hardware',
    specialty: 'Electrónica de Potencia',
    desc: 'Responsable del mantenimiento de equipos CNC y diseño de PCBs para proyectos de alta demanda.',
    email: 'soporte@innovalab.com',
    image: '/images/member8.jpg',
    color: 'text-teal-400',
    icon: <Wrench size={20} className="text-teal-400" />
  }
];

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const AcademicBody = () => {
  // --- LÓGICA SPOTLIGHT (Solo para el Hero) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const backgroundCheck = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(14, 165, 233, 0.15), 
    transparent 80%
  )`;

  return (
    <div className="font-sans bg-[#0B0F19] min-h-screen text-white selection:bg-cyan-500 selection:text-white">
      
      <style>{`
        /* Animación de Nodos Conectados (Constelación) */
        .constellation-bg {
          background-image: 
            radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
        }
        
        @keyframes float-nodes {
          0% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        .animate-float-nodes { animation: float-nodes 10s ease-in-out infinite; }
      `}</style>

      {/* --- 1. HERO SECTION (DISEÑO MEJORADO: RED NEURAL) --- */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative pt-40 pb-24 overflow-hidden flex flex-col justify-center items-center group"
      >
        {/* Fondo Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#0B0F19]"></div>
        
        {/* Constelación de Nodos (Animada) */}
        <div className="absolute inset-0 z-0 opacity-30 constellation-bg animate-float-nodes"></div>

        {/* Spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-100"
          style={{ background: backgroundCheck }}
        />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            {/* Badge Tech */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Share2 size={12} /> Red de Expertos
            </div>
            
            {/* Título con Efecto de Profundidad */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight relative">
              <span className="relative z-10 text-white drop-shadow-2xl">
                Cuerpo Académico
              </span>
              {/* Sombra de color detrás */}
              <span className="absolute left-1 top-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600 opacity-30 blur-sm -z-10 select-none">
                Cuerpo Académico
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Un equipo multidisciplinario de ingenieros, desarrolladores y visionarios unidos por una misión común: 
              <span className="text-cyan-400 font-medium"> democratizar el acceso a la tecnología</span> en Huancayo.
            </p>
          </motion.div>
        </div>
        
        {/* Divisor difuminado */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0B0F19] to-transparent z-20"></div>
      </section>

      {/* --- 2. MISIÓN Y VISIÓN --- */}
      <section className="py-16 px-6 relative z-30 -mt-10">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent z-10"></div>
            <img 
              src="/images/team-group.jpg" 
              alt="Equipo InnovaLab" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070'}} 
            />
            <div className="absolute bottom-8 left-8 z-20">
              <h3 className="text-3xl font-bold text-white mb-2">InnovaLab Center Team</h3>
              <p className="text-cyan-400 font-mono text-sm">Huancayo, Perú — Est. 2024</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#151b2b] p-10 rounded-3xl border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity"><Target size={120} /></div>
              <div className="w-14 h-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mb-6"><Target size={28} /></div>
              <h2 className="text-2xl font-bold text-white mb-4">Nuestra Misión</h2>
              <p className="text-gray-400 leading-relaxed">Formar a la próxima generación de creadores tecnológicos mediante una educación práctica, accesible y de calidad industrial.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#151b2b] p-10 rounded-3xl border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity"><Eye size={120} /></div>
              <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6"><Eye size={28} /></div>
              <h2 className="text-2xl font-bold text-white mb-4">Nuestra Visión</h2>
              <p className="text-gray-400 leading-relaxed">Ser el referente líder en innovación y manufactura digital en la región central del Perú, reconocidos por incubar talento técnico de alto nivel.</p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* --- 3. CUERPO ACADÉMICO (Grid de 8) --- */}
      <section className="py-24 bg-[#0F1420] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-cyan-500 font-mono text-sm tracking-widest uppercase">Expertos a tu servicio</span>
            <h2 className="text-4xl font-extrabold text-white mt-2">Cuerpo Académico</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamMembers.map((member) => (
              <motion.div 
                key={member.id}
                variants={itemVariants}
                className="group relative bg-[#1a202c] rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
              >
                {/* Imagen Header */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity"></div>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/400x400?text=Miembro'}}
                  />
                </div>

                {/* Contenido Tarjeta */}
                <div className="p-6 relative">
                  {/* Badge Flotante Dinámico */}
                  <div className="absolute -top-6 right-4 bg-[#0B0F19] border border-white/10 p-2 rounded-lg shadow-lg">
                    {member.icon}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                  <p className={`text-[10px] font-mono uppercase tracking-wider mb-4 ${member.color}`}>
                    {member.role}
                  </p>
                  
                  <div className="h-[1px] w-full bg-white/10 mb-4"></div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 h-20 line-clamp-3">
                    {member.desc}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group/link">
                      <Mail size={16} className="text-cyan-400" />
                      <span className="group-hover/link:underline decoration-cyan-400 underline-offset-4">Contacto</span>
                    </a>
                    
                    <div className="flex gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                      <Linkedin size={18} className="hover:text-blue-400 cursor-pointer transition-colors" />
                      <Github size={18} className="hover:text-white cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>
                
                {/* Borde inferior brillante dinámico */}
                <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity ${member.color}`}></div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* --- 4. CTA FOOTER --- */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
           <h2 className="text-3xl font-bold text-white mb-6">¿Quieres unirte al equipo?</h2>
           <p className="text-gray-400 mb-8">
             Siempre estamos buscando talento apasionado por la tecnología. Si crees que tienes lo necesario para innovar con nosotros, envíanos tu CV.
           </p>
           <a href="mailto:rrhh@innovalab.com" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all backdrop-blur-md">
             <Mail size={20} /> Enviar Portafolio
           </a>
        </div>
      </section>

    </div>
  );
};

export default AcademicBody;