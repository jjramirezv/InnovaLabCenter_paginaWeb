import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore'; 
import { uploadImageToCloudinary } from '../../cloudinaryConfig';
import { Image as ImageIcon, Loader, Trash2, Plus, LayoutGrid, Layers, Home } from 'lucide-react';

const EditHome = () => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // --- ESTADO 1: FONDO DE PORTADA ---
  const [heroImage, setHeroImage] = useState('');

  // --- ESTADO 2: IMÁGENES DE SERVICIOS (Las 3 principales) ---
  const [serviceImages, setServiceImages] = useState({
    robotica: '',
    print3d: '',
    laser: ''
  });

  // --- ESTADO 3: GALERÍA DE PROYECTOS ---
  const [galleryItems, setGalleryItems] = useState([]);
  const [newCard, setNewCard] = useState({ title: '', subtitle: '', tag: '', image: '' });

  // --- CARGAR DATOS AL INICIAR ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Cargar Fondo Hero
        const heroRef = doc(db, "web_content", "home_hero");
        const heroSnap = await getDoc(heroRef);
        if (heroSnap.exists()) setHeroImage(heroSnap.data().heroImage || '');

        // 2. Cargar Servicios
        const srvRef = doc(db, "web_content", "home_services");
        const srvSnap = await getDoc(srvRef);
        if (srvSnap.exists()) setServiceImages(srvSnap.data());

        // 3. Cargar Galería
        const galSnap = await getDocs(collection(db, "home_gallery"));
        const items = galSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setGalleryItems(items);

      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  // --- SUBIR FONDO PORTADA ---
  const handleHeroUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImageToCloudinary(file);
    if (url) {
      setHeroImage(url);
      // Guardamos en 'home_hero' mezclando con lo que ya exista (textos, etc)
      await setDoc(doc(db, "web_content", "home_hero"), { heroImage: url }, { merge: true });
    }
    setUploading(false);
  };

  // --- SUBIR IMÁGENES SERVICIOS ---
  const handleServiceUpload = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImageToCloudinary(file);
    if (url) {
      const updated = { ...serviceImages, [key]: url };
      setServiceImages(updated);
      await setDoc(doc(db, "web_content", "home_services"), updated);
    }
    setUploading(false);
  };

  // --- GESTIÓN GALERÍA ---
  const handleGalleryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImageToCloudinary(file);
    if (url) setNewCard({ ...newCard, image: url });
    setUploading(false);
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (!newCard.image || !newCard.title) return alert("Falta imagen o título");
    const docRef = await addDoc(collection(db, "home_gallery"), newCard);
    setGalleryItems([...galleryItems, { id: docRef.id, ...newCard }]);
    setNewCard({ title: '', subtitle: '', tag: '', image: '' });
  };

  const handleDeleteCard = async (id) => {
    if(!window.confirm("¿Borrar esta tarjeta?")) return;
    await deleteDoc(doc(db, "home_gallery", id));
    setGalleryItems(galleryItems.filter(i => i.id !== id));
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Cargando editor...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      
      {/* 1. EDITOR PORTADA */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Home className="text-indigo-600"/> 1. Foto de Portada (Fondo)
        </h2>
        <div className="aspect-[21/9] bg-gray-900 rounded-xl overflow-hidden border border-gray-200 relative group">
            {heroImage ? (
                <img src={heroImage} className="w-full h-full object-cover opacity-80" />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                    <ImageIcon size={48} className="mb-2 opacity-50"/>
                    <span>Actualmente es fondo negro. Sube una foto para cambiarlo.</span>
                </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="cursor-pointer bg-white text-sm font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
                    {uploading ? <Loader className="animate-spin" size={18}/> : <ImageIcon size={18}/>}
                    Cambiar Fondo
                    <input type="file" className="hidden" onChange={handleHeroUpload} disabled={uploading}/>
                </label>
            </div>
        </div>
      </section>

      {/* 2. EDITOR SERVICIOS */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Layers className="text-indigo-600"/> 2. Imágenes de Servicios
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {['robotica', 'print3d', 'laser'].map((key) => (
            <div key={key} className="space-y-3">
              <span className="block text-sm font-bold uppercase text-gray-500">{key === 'print3d' ? 'Impresión 3D' : key}</span>
              <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative group">
                {serviceImages[key] ? (
                  <img src={serviceImages[key]} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon/></div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-white text-xs font-bold px-3 py-2 rounded-lg hover:scale-105 transition-transform">
                    Cambiar Foto
                    <input type="file" className="hidden" onChange={(e) => handleServiceUpload(e, key)} disabled={uploading}/>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EDITOR GALERÍA */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <LayoutGrid className="text-indigo-600"/> 3. Galería de Proyectos
        </h2>

        {/* Formulario */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
          <h3 className="text-sm font-bold text-gray-600 mb-4">Agregar Nuevo Item</h3>
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-1">
                <label className="cursor-pointer flex items-center justify-center h-12 bg-white border border-gray-300 rounded-lg text-xs text-gray-500 hover:border-indigo-500 hover:text-indigo-500 transition-colors">
                    {uploading ? <Loader className="animate-spin"/> : (newCard.image ? "¡Foto lista!" : <><ImageIcon size={16} className="mr-2"/> Cargar Foto</>)}
                    <input type="file" className="hidden" onChange={handleGalleryUpload} disabled={uploading}/>
                </label>
            </div>
            <div className="md:col-span-1">
                <input className="w-full p-3 border rounded-lg text-sm" placeholder="Título" value={newCard.title} onChange={e => setNewCard({...newCard, title: e.target.value})}/>
            </div>
            <div className="md:col-span-1">
                <input className="w-full p-3 border rounded-lg text-sm" placeholder="Subtítulo" value={newCard.subtitle} onChange={e => setNewCard({...newCard, subtitle: e.target.value})}/>
            </div>
            <div className="md:col-span-1 flex gap-2">
                <input className="w-full p-3 border rounded-lg text-sm" placeholder="Etiqueta (3D)" value={newCard.tag} onChange={e => setNewCard({...newCard, tag: e.target.value})}/>
                <button onClick={handleAddCard} disabled={uploading} className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg"><Plus/></button>
            </div>
          </div>
        </div>

        {/* Lista */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryItems.map(item => (
            <div key={item.id} className="relative group aspect-[3/4] rounded-xl overflow-hidden bg-gray-900 border border-gray-200">
              <img src={item.image} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                <span className="text-xs text-indigo-400 font-bold">{item.tag}</span>
                <span className="text-white font-bold text-sm leading-tight">{item.title}</span>
              </div>
              <button onClick={() => handleDeleteCard(item.id)} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
                <Trash2 size={16}/>
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default EditHome;