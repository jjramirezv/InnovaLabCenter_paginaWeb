import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore'; // Importamos query y orderBy
import { uploadImageToCloudinary } from '../../cloudinaryConfig';
import { Trash2, Plus, Image as ImageIcon, Loader, Save, Calendar, User, Tag } from 'lucide-react';

const EditNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Formulario Actualizado con todos los campos que la web pública necesita
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    category: 'Prototipado', // Valor por defecto
    author: '',
    desc: '',
    image: ''
  });

  // Categorías que coinciden con los filtros de tu página web
  const categories = ['Prototipado', 'Eventos', 'Desarrollo', 'Guías', 'Materiales', 'Institucional'];

  // 1. Cargar noticias (Ordenadas por fecha de creación)
  const fetchNews = async () => {
    try {
      const q = query(collection(db, "noticias"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const newsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNews(newsArray);
    } catch (error) {
      console.error("Error cargando noticias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // 2. Subir imagen
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

  // 3. Guardar
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.desc || !formData.image || !formData.author) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      await addDoc(collection(db, "noticias"), {
        ...formData,
        createdAt: new Date() // Importante para que salga primero la más nueva
      });
      
      setFormData({ 
        title: '', date: '', category: 'Prototipado', author: '', desc: '', image: '' 
      });
      fetchNews();
      alert("Noticia publicada correctamente");
    } catch (error) {
      console.error("Error guardando:", error);
      alert("Error al guardar");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta noticia?")) {
      await deleteDoc(doc(db, "noticias", id));
      fetchNews();
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Gestor de Noticias</h1>

      {/* --- FORMULARIO --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus size={20} className="text-cyan-600"/> Nueva Publicación
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Noticia</label>
              <input 
                type="text" 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Ej: Lanzamiento de Robot X-200"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Visible</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={18}/>
                  <input 
                    type="text" 
                    className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    placeholder="Ej: 20 Oct, 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 text-gray-400" size={18}/>
                  <select 
                    className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18}/>
                <input 
                  type="text" 
                  className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="Ej: InnovaLab Team"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción / Resumen</label>
              <textarea 
                rows="3"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Escribe el contenido breve de la noticia..."
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="block text-sm font-medium text-gray-700">Imagen o Video (Portada)</label>
            
            <div className={`border-2 border-dashed rounded-xl h-full min-h-[200px] flex flex-col items-center justify-center transition-colors ${formData.image ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 hover:border-cyan-400'}`}>
              {uploading ? (
                <div className="text-center text-cyan-600">
                  <Loader className="animate-spin mb-2 mx-auto" />
                  <span className="text-sm font-medium">Subiendo multimedia...</span>
                </div>
              ) : formData.image ? (
                <div className="relative w-full h-full p-2 group">
                    {formData.image.includes('.mp4') ? (
                         <video src={formData.image} className="w-full h-full object-cover rounded-lg" muted />
                    ) : (
                         <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    )}
                    
                    <button 
                        type="button"
                        onClick={() => setFormData({...formData, image: ''})}
                        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
                  <ImageIcon size={40} className="text-gray-300 mb-2" />
                  <span className="text-sm text-gray-500">Clic para subir foto/video</span>
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            <button 
              type="submit" 
              disabled={uploading}
              className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save size={20} /> Publicar Noticia
            </button>
          </div>
        </form>
      </div>

      {/* --- LISTADO --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative group">
            <div className="h-40 bg-gray-100 relative">
               {item.image && item.image.includes('.mp4') ? (
                 <video src={item.image} className="w-full h-full object-cover" />
               ) : (
                 <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
               )}
               <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                 {item.category}
               </span>
            </div>
            <div className="p-4">
               <h4 className="font-bold text-gray-800 line-clamp-1">{item.title}</h4>
               <p className="text-xs text-gray-500 mt-1">{item.date} • {item.author}</p>
            </div>
            <button 
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditNews;