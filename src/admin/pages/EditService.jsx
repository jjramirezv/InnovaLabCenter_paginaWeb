import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc } from 'firebase/firestore'; 
import { uploadImageToCloudinary } from '../../cloudinaryConfig';
import { Trash2, Image as ImageIcon, Loader, Save, Plus, List, Box, Zap, Bot, RefreshCw } from 'lucide-react';

const EditService = ({ serviceId }) => {
  const serviceConfig = {
    'print3d': { title: 'Impresión 3D', icon: <Box size={24} className="text-cyan-600"/> },
    'laser': { title: 'Corte Láser', icon: <Zap size={24} className="text-orange-600"/> },
    'robotica': { title: 'Robótica', icon: <Bot size={24} className="text-purple-600"/> }
  };
  const currentConfig = serviceConfig[serviceId];

  // --- ESTADOS ---
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [images, setImages] = useState([]);
  
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingImages, setLoadingImages] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [catForm, setCatForm] = useState({ title: '', desc: '', features: '' });
  const [isEditingCat, setIsEditingCat] = useState(false);

  // --- 1. CARGAR CATEGORÍAS ---
  const fetchCategories = async () => {
    setLoadingCats(true);
    try {
      const q = query(collection(db, "servicios_categorias"), where("serviceId", "==", serviceId));
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Ordenamos por título o fecha (opcional)
      setCategories(data);
      
      // Si no hay seleccionada y hay datos, seleccionar la primera
      if (!selectedCat && data.length > 0) {
        handleSelectCategory(data[0]);
      } else if (data.length === 0) {
        setSelectedCat(null);
      }
    } catch (error) {
      console.error("Error categorías:", error);
    } finally {
      setLoadingCats(false);
    }
  };

  // --- 2. CARGAR IMÁGENES ---
  const fetchImages = async () => {
    if (!selectedCat) return;
    setLoadingImages(true);
    try {
      const q = query(
        collection(db, "servicios_galeria"),
        where("serviceId", "==", serviceId),
        where("categoryId", "==", selectedCat.id)
      );
      const snap = await getDocs(q);
      const imgs = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setImages(imgs);
    } catch (error) { console.error(error); } 
    finally { setLoadingImages(false); }
  };

  useEffect(() => { fetchCategories(); }, [serviceId]);
  useEffect(() => { fetchImages(); }, [selectedCat]);

  // --- "BOTÓN MÁGICO": CARGAR DATOS POR DEFECTO ---
  const handleLoadDefaults = async () => {
    if (!window.confirm("¿Seguro? Esto creará las categorías base automáticamente.")) return;
    
    // Diccionario con tus textos originales
    const defaultData = {
        'print3d': [
            { title: 'Objetos Personalizados', desc: 'Materializa tus ideas más creativas. Regalos, merchandising y moda.', features: ['Personajes', 'Llaveros', 'Cosplay'] },
            { title: 'Figuras de Colección', desc: 'Alta resolución en Resina 8K para coleccionistas.', features: ['Anime', 'Bustos', 'Art Toys'] },
            { title: 'Moldes Industriales', desc: 'Matrices para producción en serie (jabones, concreto, chocolate).', features: ['Moldes Jabón', 'Matrices', 'Concreto'] },
            { title: 'Repuestos Técnicos', desc: 'Piezas descontinuadas de alta resistencia mecánica.', features: ['Engranajes', 'Soportes', 'Automotriz'] },
            { title: 'Prototipos Ingeniería', desc: 'Valida forma y función antes de fabricar.', features: ['Validación', 'Carcasas', 'Mecanismos'] },
            { title: 'Sector Biomédico', desc: 'Soluciones personalizadas para medicina.', features: ['Prótesis', 'Guías Quirúrgicas', 'Modelos'] }
        ],
        'laser': [
            { title: 'Llaveros Personalizados', desc: 'El souvenir perfecto en MDF, acrílico o madera.', features: ['Eventos', 'Merchandising', 'Grabados'] },
            { title: 'Placas y Letreros', desc: 'Señalética corporativa y trofeos elegantes.', features: ['Oficinas', 'Trofeos', 'Letreros LED'] },
            { title: 'Nombres y Letras 3D', desc: 'Decoración volumétrica para eventos.', features: ['Candy Bar', 'Bodas', 'Infantil'] },
            { title: 'Decoración y Hogar', desc: 'Cuadros calados y lámparas geométricas.', features: ['Mandalas', 'Lámparas', 'Organizadores'] },
            { title: 'Producción Empresas', desc: 'Corte masivo y maquila industrial.', features: ['Maquila', 'Ensamble', 'Branding'] }
        ],
        'robotica': [
            { title: 'Kits Educativos', desc: 'Aprende haciendo con kits de inicio.', features: ['Seguidor Línea', 'Brazo Robot', 'Evasor'] },
            { title: 'Proyectos Escolares', desc: 'Asesoría para ferias de ciencias.', features: ['Generadores', 'Maquetas', 'Hidráulica'] },
            { title: 'Nivel Universitario', desc: 'Ingeniería avanzada y control.', features: ['Robot Sumo', 'Control PID', 'Visión Artificial'] },
            { title: 'IoT y Automatización', desc: 'Control domótico e internet de las cosas.', features: ['ESP32', 'Dashboards', 'Sensores'] }
        ]
    };

    const defaults = defaultData[serviceId] || [];
    setLoadingCats(true);
    
    try {
        // Crear cada categoría en Firebase
        for (const cat of defaults) {
            await addDoc(collection(db, "servicios_categorias"), {
                serviceId,
                title: cat.title,
                desc: cat.desc,
                features: cat.features,
                createdAt: new Date()
            });
        }
        await fetchCategories(); // Recargar lista
        alert("¡Categorías creadas! Ahora puedes editarlas o subir fotos.");
    } catch (e) {
        console.error("Error cargando defaults:", e);
    } finally {
        setLoadingCats(false);
    }
  };

  // --- CRUD CATEGORÍAS ---
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!catForm.title) return alert("Título obligatorio");
    const featuresArray = typeof catForm.features === 'string' ? catForm.features.split(',').map(f => f.trim()) : catForm.features;
    
    try {
        if (isEditingCat && selectedCat) {
            await updateDoc(doc(db, "servicios_categorias", selectedCat.id), { 
                title: catForm.title, desc: catForm.desc, features: featuresArray 
            });
            alert("Actualizado");
        } else {
            const ref = await addDoc(collection(db, "servicios_categorias"), {
                serviceId, title: catForm.title, desc: catForm.desc, features: featuresArray, createdAt: new Date()
            });
            setSelectedCat({ id: ref.id, ...catForm, features: featuresArray });
        }
        setIsEditingCat(false);
        fetchCategories();
    } catch (error) { console.error(error); }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCat || !window.confirm("¿Borrar categoría y sus fotos?")) return;
    await deleteDoc(doc(db, "servicios_categorias", selectedCat.id));
    images.forEach(async (img) => await deleteDoc(doc(db, "servicios_galeria", img.id)));
    setSelectedCat(null);
    fetchCategories();
  };

  const handleSelectCategory = (cat) => {
    setSelectedCat(cat);
    setCatForm({ 
        title: cat.title, 
        desc: cat.desc, 
        features: Array.isArray(cat.features) ? cat.features.join(', ') : cat.features 
    });
    setIsEditingCat(false);
  };

  // --- IMÁGENES ---
  const handleUploadImage = async (e) => {
    if (!selectedCat) return alert("Selecciona una categoría");
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImageToCloudinary(file);
    if (url) {
      await addDoc(collection(db, "servicios_galeria"), {
        serviceId, categoryId: selectedCat.id, image: url, createdAt: new Date()
      });
      fetchImages();
    }
    setUploading(false);
  };

  const handleDeleteImage = async (id) => {
    if (window.confirm("¿Borrar foto?")) {
      await deleteDoc(doc(db, "servicios_galeria", id));
      fetchImages();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
        <div className="p-3 rounded-xl bg-gray-100">{currentConfig.icon}</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestor: {currentConfig.title}</h1>
          <p className="text-gray-500 text-sm">Gestiona categorías y galería.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* LISTA */}
        <div className="lg:col-span-4 space-y-4">
            {/* BOTÓN MÁGICO: SOLO APARECE SI NO HAY DATOS */}
            {categories.length === 0 && !loadingCats && (
                <button 
                    onClick={handleLoadDefaults}
                    className="w-full py-4 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg font-bold flex flex-col items-center justify-center gap-1 transition-colors border border-green-200 mb-4 animate-pulse"
                >
                    <RefreshCw size={20}/> 
                    <span>Cargar Categorías Base</span>
                    <span className="text-xs font-normal opacity-80">(Llaveros, Moldes, etc.)</span>
                </button>
            )}

            <button onClick={() => { setSelectedCat(null); setCatForm({title:'', desc:'', features:''}); setIsEditingCat(true); setImages([]); }}
                className="w-full py-3 bg-gray-800 hover:bg-black text-white rounded-lg font-bold flex items-center justify-center gap-2"
            >
                <Plus size={18}/> Nueva Categoría
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loadingCats ? <div className="p-4 text-center text-gray-400">Cargando...</div> : 
                 categories.length === 0 ? <div className="p-4 text-center text-gray-400 text-sm">Lista vacía.</div> :
                 categories.map(cat => (
                    <button key={cat.id} onClick={() => handleSelectCategory(cat)}
                        className={`w-full text-left px-4 py-3 border-b border-gray-100 flex justify-between items-center ${selectedCat?.id === cat.id ? 'bg-cyan-50 text-cyan-700 font-bold border-l-4 border-l-cyan-500' : 'text-gray-600'}`}
                    >
                        {cat.title}
                    </button>
                ))}
            </div>
        </div>

        {/* EDITOR */}
        <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                {!selectedCat && !isEditingCat ? (
                    <div className="text-center text-gray-400 py-10">Selecciona o crea una categoría.</div>
                ) : (
                    <form onSubmit={handleSaveCategory}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-700 flex items-center gap-2"><List size={18}/> {selectedCat ? 'Editar Textos' : 'Nueva Categoría'}</h3>
                            {selectedCat && <button type="button" onClick={handleDeleteCategory} className="text-red-500 text-sm flex gap-1"><Trash2 size={14}/> Borrar</button>}
                        </div>
                        <div className="space-y-4">
                            <input className="w-full p-3 border rounded-lg bg-gray-50 font-bold" placeholder="Título" value={catForm.title} onChange={e => setCatForm({...catForm, title: e.target.value})}/>
                            <textarea className="w-full p-3 border rounded-lg bg-gray-50 text-sm" rows="2" placeholder="Descripción" value={catForm.desc} onChange={e => setCatForm({...catForm, desc: e.target.value})}/>
                            <input className="w-full p-3 border rounded-lg bg-gray-50 text-sm" placeholder="Características (sep. por comas)" value={catForm.features} onChange={e => setCatForm({...catForm, features: e.target.value})}/>
                            <button className="w-full bg-cyan-600 text-white font-bold py-2 rounded-lg hover:bg-cyan-700"><Save size={18} className="inline mr-2"/> Guardar Texto</button>
                        </div>
                    </form>
                )}
            </div>

            {/* GALERÍA */}
            {selectedCat && selectedCat.id && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-700">Imágenes</h3>
                        <label className="cursor-pointer bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm flex gap-2">
                            {uploading ? <Loader size={16} className="animate-spin"/> : <ImageIcon size={16}/>} Subir
                            <input type="file" className="hidden" onChange={handleUploadImage} disabled={uploading}/>
                        </label>
                    </div>
                    {images.length === 0 ? <div className="text-center py-8 border-2 border-dashed border-gray-100 text-gray-400 text-sm">Sin fotos. Sube una.</div> : (
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                            {images.map(img => (
                                <div key={img.id} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                    <img src={img.image} className="w-full h-full object-cover"/>
                                    <button onClick={() => handleDeleteImage(img.id)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white"><Trash2 size={20}/></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default EditService;