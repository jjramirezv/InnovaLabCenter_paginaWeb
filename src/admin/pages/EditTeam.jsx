import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { uploadImageToCloudinary } from '../../cloudinaryConfig';
import { Trash2, UserPlus, Upload, Loader, Save, Briefcase, User, Mail, FileText } from 'lucide-react';

const EditTeam = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Formulario completo (Agregué email y desc para que coincida con tu diseño web)
  const [formData, setFormData] = useState({
    name: '',
    role: '', 
    specialty: '',
    email: '',
    desc: '',
    image: ''
  });

  const fetchMembers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "equipo"));
      const membersArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMembers(membersArray);
    } catch (error) {
      console.error("Error cargando equipo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImageToCloudinary(file);
    if (url) {
      setFormData({ ...formData, image: url });
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.image) {
      alert("Por favor completa al menos Nombre, Cargo y Foto.");
      return;
    }

    try {
      await addDoc(collection(db, "equipo"), formData);
      setFormData({ name: '', role: '', specialty: '', email: '', desc: '', image: '' });
      fetchMembers();
      alert("Integrante agregado correctamente");
    } catch (error) {
      console.error("Error guardando:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar a este integrante?")) {
      await deleteDoc(doc(db, "equipo", id));
      fetchMembers();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Equipo</h1>
        <span className="bg-cyan-100 text-cyan-800 py-1 px-3 rounded-full text-sm font-bold">
          {members.length} Integrantes
        </span>
      </div>

      {/* --- FORMULARIO --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-700">
          <UserPlus size={24} className="text-cyan-600"/> Nuevo Integrante
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
          {/* Columna Izquierda: Foto */}
          <div className="w-full md:w-1/3 flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-600">Fotografía</label>
            <div className={`aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center relative overflow-hidden transition-all ${formData.image ? 'border-cyan-500' : 'border-gray-300 hover:border-cyan-400 bg-gray-50'}`}>
              
              {uploading ? (
                <Loader className="animate-spin text-cyan-600" />
              ) : formData.image ? (
                <>
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, image: ''})}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-white font-bold"
                  >
                    <Trash2 className="mr-2"/> Cambiar
                  </button>
                </>
              ) : (
                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-cyan-600">
                  <Upload size={30} className="mb-2"/>
                  <span className="text-xs text-center px-4">Clic para subir foto</span>
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>

          {/* Columna Derecha: Datos */}
          <div className="w-full md:w-2/3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-3 text-gray-400"/>
                  <input 
                    type="text" 
                    className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    placeholder="Ej: Dr. Juan Pérez"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              
              {/* CAMBIO: INPUT LIBRE PARA CARGO */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo / Rol</label>
                <div className="relative">
                  <Briefcase size={18} className="absolute left-3 top-3 text-gray-400"/>
                  <input 
                    type="text"
                    className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    placeholder="Ej: Director General / Docente"
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    placeholder="Ej: Robótica Móvil"
                    value={formData.specialty}
                    onChange={e => setFormData({...formData, specialty: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contacto</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-3 text-gray-400"/>
                    <input 
                        type="email" 
                        className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                        placeholder="correo@innovalab.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Biografía Corta</label>
              <div className="relative">
                <FileText size={18} className="absolute left-3 top-3 text-gray-400"/>
                <textarea 
                  rows="3"
                  className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="Pequeña descripción de su experiencia..."
                  value={formData.desc}
                  onChange={e => setFormData({...formData, desc: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={uploading}
              className="w-full mt-4 bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <Save size={18} /> Guardar Integrante
            </button>
          </div>
        </form>
      </div>

      {/* --- LISTA DE MIEMBROS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col group relative">
            <div className="h-48 overflow-hidden bg-gray-100">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            
            <div className="p-4 text-center">
              <h3 className="font-bold text-gray-800 text-lg">{member.name}</h3>
              <p className="text-cyan-600 text-sm font-bold uppercase tracking-wider mb-1">{member.role}</p>
              <p className="text-gray-400 text-xs line-clamp-2">{member.desc}</p>
            </div>

            <button 
              onClick={() => handleDelete(member.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
              title="Eliminar"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditTeam;