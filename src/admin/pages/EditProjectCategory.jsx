import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { uploadImageToCloudinary } from '../../cloudinaryConfig';
import { Trash2, Plus, Video, Image as ImageIcon, Loader, Save, Users, Layers, Cpu, Settings, Monitor } from 'lucide-react';

const EditProjectCategory = ({ type }) => {
  // Configuración visual según el área
  const config = {
    mecatronica: { color: 'text-purple-600', bg: 'bg-purple-100', icon: <Cpu size={24}/>, label: 'Ingeniería Mecatrónica' },
    mecanica: { color: 'text-blue-600', bg: 'bg-blue-100', icon: <Settings size={24}/>, label: 'Ingeniería Mecánica' },
    sistemas: { color: 'text-green-600', bg: 'bg-green-100', icon: <Monitor size={24}/>, label: 'Ingeniería de Sistemas' }
  }[type];

  // --- ESTADOS ---
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' o 'students'
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Formularios
  const [projectForm, setProjectForm] = useState({ title: '', desc: '', video: '', tech: '' }); // tech será string separado por comas
  const [studentForm, setStudentForm] = useState({ name: '', role: '', image: '' });

  // --- CARGAR DATOS ---
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Cargar Proyectos de esta categoría
      const qProjects = query(collection(db, "proyectos"), where("category", "==", type));
      const projSnap = await getDocs(qProjects);
      setProjects(projSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // 2. Cargar Estudiantes de esta categoría
      const qStudents = query(collection(db, "estudiantes_area"), where("category", "==", type));
      const studSnap = await getDocs(qStudents);
      setStudents(studSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type]); // Se recarga si cambias de página en el menú

  // --- SUBIDA DE ARCHIVOS ---
  const handleUpload = async (file, formType) => {
    setUploading(true);
    const url = await uploadImageToCloudinary(file);
    if (url) {
      if (formType === 'project') setProjectForm(prev => ({ ...prev, video: url }));
      if (formType === 'student') setStudentForm(prev => ({ ...prev, image: url }));
    }
    setUploading(false);
  };

  // --- GUARDAR ---
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.video) return alert("Falta título o video");
    
    // Convertir "React, Node, Arduino" -> ["React", "Node", "Arduino"]
    const techArray = projectForm.tech.split(',').map(t => t.trim()).filter(t => t);

    await addDoc(collection(db, "proyectos"), {
      ...projectForm,
      tech: techArray,
      category: type,
      createdAt: new Date()
    });
    setProjectForm({ title: '', desc: '', video: '', tech: '' });
    fetchData();
    alert("Proyecto guardado");
  };

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.image) return alert("Falta nombre o foto");

    await addDoc(collection(db, "estudiantes_area"), {
      ...studentForm,
      category: type,
      createdAt: new Date()
    });
    setStudentForm({ name: '', role: '', image: '' });
    fetchData();
    alert("Estudiante agregado");
  };

  // --- BORRAR ---
  const handleDelete = async (id, collectionName) => {
    if (window.confirm("¿Eliminar?")) {
      await deleteDoc(doc(db, collectionName, id));
      fetchData();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Dinámico */}
      <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
        <div className={`p-3 rounded-xl ${config.bg} ${config.color}`}>
          {config.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{config.label}</h1>
          <p className="text-gray-500 text-sm">Gestiona los proyectos y el equipo de esta área</p>
        </div>
      </div>

      {/* Tabs / Pestañas */}
      <div className="flex gap-4">
        <button 
          onClick={() => setActiveTab('projects')}
          className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'projects' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          <Layers size={18}/> Proyectos ({projects.length})
        </button>
        <button 
          onClick={() => setActiveTab('students')}
          className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'students' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          <Users size={18}/> Estudiantes ({students.length})
        </button>
      </div>

      {/* --- PESTAÑA 1: PROYECTOS --- */}
      {activeTab === 'projects' && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulario Proyectos */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm h-fit">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Plus size={18}/> Nuevo Proyecto</h3>
            <form onSubmit={handleSaveProject} className="space-y-4">
              <input 
                placeholder="Título del Proyecto" 
                className="w-full p-3 border rounded-lg bg-gray-50"
                value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})}
              />
              <textarea 
                placeholder="Descripción breve..." 
                className="w-full p-3 border rounded-lg bg-gray-50" rows="3"
                value={projectForm.desc} onChange={e => setProjectForm({...projectForm, desc: e.target.value})}
              />
              <input 
                placeholder="Tecnologías (ej: React, Python, Arduino)" 
                className="w-full p-3 border rounded-lg bg-gray-50 text-sm"
                value={projectForm.tech} onChange={e => setProjectForm({...projectForm, tech: e.target.value})}
              />
              
              {/* Carga de Video/Imagen */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {uploading ? <Loader className="animate-spin mx-auto text-gray-400"/> : (
                  projectForm.video ? (
                    <div className="relative">
                      <video src={projectForm.video} className="w-full rounded h-24 object-cover" muted/>
                      <button type="button" onClick={() => setProjectForm({...projectForm, video: ''})} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"><Trash2 size={12}/></button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <Video className="mx-auto text-gray-400 mb-1"/>
                      <span className="text-xs text-gray-500">Subir Video/Img</span>
                      <input type="file" className="hidden" onChange={e => handleUpload(e.target.files[0], 'project')}/>
                    </label>
                  )
                )}
              </div>

              <button disabled={uploading} className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700">Guardar Proyecto</button>
            </form>
          </div>

          {/* Lista Proyectos */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
            {projects.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-200 relative group">
                <div className="h-32 bg-black rounded-lg mb-3 overflow-hidden">
                  <video src={p.video} className="w-full h-full object-cover opacity-80" muted/>
                </div>
                <h4 className="font-bold text-gray-800 leading-tight">{p.title}</h4>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tech?.map((t,i) => <span key={i} className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">{t}</span>)}
                </div>
                <button onClick={() => handleDelete(p.id, "proyectos")} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- PESTAÑA 2: ESTUDIANTES --- */}
      {activeTab === 'students' && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulario Estudiantes */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm h-fit">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Nuevo Estudiante</h3>
            <form onSubmit={handleSaveStudent} className="space-y-4">
              <input 
                placeholder="Nombre del Estudiante" 
                className="w-full p-3 border rounded-lg bg-gray-50"
                value={studentForm.name} onChange={e => setStudentForm({...studentForm, name: e.target.value})}
              />
              <input 
                placeholder="Rol (ej: Líder, Programador)" 
                className="w-full p-3 border rounded-lg bg-gray-50"
                value={studentForm.role} onChange={e => setStudentForm({...studentForm, role: e.target.value})}
              />
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {uploading ? <Loader className="animate-spin mx-auto text-gray-400"/> : (
                  studentForm.image ? (
                    <div className="relative">
                      <img src={studentForm.image} className="w-20 h-20 mx-auto rounded-full object-cover"/>
                      <button type="button" onClick={() => setStudentForm({...studentForm, image: ''})} className="absolute top-0 right-10 bg-red-500 text-white p-1 rounded-full"><Trash2 size={12}/></button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <ImageIcon className="mx-auto text-gray-400 mb-1"/>
                      <span className="text-xs text-gray-500">Subir Foto</span>
                      <input type="file" className="hidden" onChange={e => handleUpload(e.target.files[0], 'student')}/>
                    </label>
                  )
                )}
              </div>

              <button disabled={uploading} className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-black">Agregar Estudiante</button>
            </form>
          </div>

          {/* Lista Estudiantes */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {students.map(s => (
              <div key={s.id} className="bg-white p-4 rounded-xl border border-gray-200 text-center relative group">
                <img src={s.image} className="w-16 h-16 rounded-full mx-auto object-cover mb-2 bg-gray-100"/>
                <h4 className="font-bold text-sm text-gray-800">{s.name}</h4>
                <p className="text-xs text-cyan-600 font-bold uppercase">{s.role}</p>
                <button onClick={() => handleDelete(s.id, "estudiantes_area")} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProjectCategory;