import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import toast from "react-hot-toast";
import { 
  Plus, Trash2, Edit3, X, Play, Image as ImageIcon, 
  UploadCloud, ExternalLink, ChevronLeft 
} from "lucide-react";

const AdminGalleryPanel = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    year: new Date().getFullYear(),
    location: "",
    coverFile: null,
    coverPreview: "",
    galleryFiles: [], // New files being uploaded
    existingGalleryFiles: [] // Files already on Cloudinary
  });

  // --- FETCH DATA ---
  const fetchData = async () => {
    try {
      const res = await api.get("/gallery/getdata");
      if (res.data.success) {
        setGalleryData(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching gallery data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- FORM HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        coverFile: file,
        coverPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      file,
      type: file.type.startsWith("video/") ? "video" : "image",
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      galleryFiles: [...prev.galleryFiles, ...newFiles],
    }));
  };

  const removeNewFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryFiles: prev.galleryFiles.filter((_, i) => i !== index),
    }));
  };

  const removeExistingFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      existingGalleryFiles: prev.existingGalleryFiles.filter((_, i) => i !== index),
    }));
  };

  // --- ACTIONS ---
  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentId(item._id);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      year: item.year,
      location: item.location,
      coverFile: null,
      coverPreview: item.coverImage,
      galleryFiles: [],
      existingGalleryFiles: item.galleryFiles || [],
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this memory?")) return;
    try {
      const response = await api.delete(`/gallery/delete/${id}`);
      if (response.data.success) {
        setGalleryData((prev) => prev.filter((item) => item._id !== id));
        toast.success("Memory deleted successfully!");
      }
    } catch (err) {
      toast.error("Error deleting item.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const apiFormData = new FormData();
    apiFormData.append("title", formData.title);
    apiFormData.append("description", formData.description);
    apiFormData.append("category", formData.category);
    apiFormData.append("year", formData.year);
    apiFormData.append("location", formData.location);

    if (formData.coverFile) apiFormData.append("coverImage", formData.coverFile);
    
    // Add new files
    formData.galleryFiles.forEach((item) => apiFormData.append("galleryFiles", item.file));
    
    // Pass existing files as string so backend knows what to keep
    apiFormData.append("existingGalleryFiles", JSON.stringify(formData.existingGalleryFiles));

    try {
      const url = isEditing 
        ? `/gallery/update/${currentId}` 
        : "/gallery/insertgallery";

      const response = await api[isEditing ? 'put' : 'post'](url, apiFormData);

      if (response.data.success) {
        toast.success(isEditing ? "Updated!" : "Saved!");
        resetForm();
        fetchData(); // Refresh list
      }
    } catch (error) {
      toast.error("Process failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "", description: "", category: "", year: new Date().getFullYear(),
      location: "", coverFile: null, coverPreview: "", galleryFiles: [], existingGalleryFiles: []
    });
    setIsEditing(false);
    setCurrentId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Gallery Control</h1>
            <p className="text-slate-500 mt-1">Manage historical memories and media assets.</p>
          </div>
          <button
            onClick={() => { isEditing ? resetForm() : setShowForm(!showForm); }}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
              showForm ? "bg-slate-100 text-slate-600" : "bg-red-800 text-white hover:bg-red-900 shadow-lg shadow-red-900/20"
            }`}
          >
            {showForm ? <X size={20}/> : <Plus size={20}/>}
            {showForm ? "Cancel" : "Add New Memory"}
          </button>
        </div>

        {/* FORM SECTION */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Event Title *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all" placeholder="Enter title..." />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                      <option value="">Select Category</option>
                      <option value="Ministerial">Ministerial</option>
                      <option value="Constitutional">Constitutional</option>
                      <option value="Policy Work">Policy Work</option>
                      <option value="Party Leadership">Party Leadership</option>
                      <option value="Community">Community</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Year</label>
                      <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Location</label>
                      <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="City, Country" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="Provide context..."></textarea>
                  </div>
                </div>
              </div>

              {/* UPLOAD BOX */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-3 block">1. Main Cover Photo</label>
                  <div className="relative group aspect-video bg-white border-2 border-dashed border-slate-300 rounded-xl overflow-hidden flex items-center justify-center">
                    {formData.coverPreview ? (
                      <>
                        <img src={formData.coverPreview} className="w-full h-full object-cover" alt="Cover" />
                        <button type="button" onClick={() => setFormData({...formData, coverFile:null, coverPreview:""})} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full shadow-lg"><X size={14}/></button>
                      </>
                    ) : (
                      <div className="text-center">
                        <UploadCloud className="mx-auto text-slate-300 mb-2" size={32} />
                        <input type="file" accept="image/*" onChange={handleCoverChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Click to Upload</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-3 block">2. Gallery Files</label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {/* Existing Files */}
                    {formData.existingGalleryFiles.map((item, idx) => (
                      <div key={`ex-${idx}`} className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-sm border border-slate-200 group">
                        {item.type === "video" ? (
                          <div onClick={() => setPreviewMedia({type:'video', src:item.url})} className="w-full h-full flex items-center justify-center bg-slate-800 cursor-pointer"><Play size={20} className="text-white"/></div>
                        ) : (
                          <img src={item.url} onClick={() => setPreviewMedia({type:'image', src:item.url})} className="w-full h-full object-cover cursor-pointer" alt="Gallery" />
                        )}
                        <button type="button" onClick={() => removeExistingFile(idx)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12}/></button>
                      </div>
                    ))}
                    {/* New Files */}
                    {formData.galleryFiles.map((item, idx) => (
                      <div key={`new-${idx}`} className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-sm border-2 border-blue-400 group">
                         {item.type === "video" ? (
                          <div onClick={() => setPreviewMedia({type:'video', src:item.preview})} className="w-full h-full flex items-center justify-center bg-slate-900 cursor-pointer"><Play size={20} className="text-white"/></div>
                        ) : (
                          <img src={item.preview} onClick={() => setPreviewMedia({type:'image', src:item.preview})} className="w-full h-full object-cover cursor-pointer" alt="New" />
                        )}
                        <button type="button" onClick={() => removeNewFile(idx)} className="absolute top-1 right-1 bg-black text-white rounded-full p-0.5"><X size={12}/></button>
                      </div>
                    ))}
                    {/* Upload Trigger */}
                    <div className="relative aspect-square rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center hover:bg-white transition-colors">
                        <Plus className="text-slate-300" size={24}/>
                        <input type="file" multiple accept="image/*,video/*" onChange={handleGalleryChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isUploading} className="w-full bg-red-800 text-white py-4 rounded-xl font-bold hover:bg-red-900 transition-all shadow-lg shadow-red-900/30 disabled:opacity-50 flex justify-center items-center gap-2">
                  {isUploading ? "Uploading Data..." : isEditing ? "Update Memory" : "Save Memory"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* LIST GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {galleryData.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  {item.galleryFiles?.length || 0} Assets
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800 truncate">{item.title}</h4>
                </div>
                <p className="text-xs font-bold text-red-700 uppercase tracking-widest mb-4">{item.category} • {item.year}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button onClick={() => handleEditClick(item)} className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                    <Edit3 size={16}/> Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 text-slate-300 hover:text-red-600 transition-colors">
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {galleryData.length === 0 && !isUploading && (
          <div className="text-center py-40">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="text-slate-300" size={32} />
            </div>
            <h3 className="text-slate-500 font-bold">The gallery is empty</h3>
            <p className="text-slate-400 text-sm">Click "Add New Memory" to populate the database.</p>
          </div>
        )}

      </div>

      {/* FULLSCREEN LIGHTBOX PREVIEW */}
      {previewMedia && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 md:p-10 backdrop-blur-md"
          onClick={() => setPreviewMedia(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            onClick={() => setPreviewMedia(null)}
          >
            <X size={48} strokeWidth={1} />
          </button>

          <div className="relative max-w-7xl w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            {previewMedia.type === "image" ? (
              <img
                src={previewMedia.src}
                alt="Preview"
                className="max-h-full max-w-full object-contain rounded shadow-2xl animate-in zoom-in-95 duration-300"
              />
            ) : (
              <video
                src={previewMedia.src}
                controls
                autoPlay
                className="max-h-full max-w-full rounded shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGalleryPanel;