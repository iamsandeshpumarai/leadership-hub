import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import toast from "react-hot-toast";

const AdminGalleryPanel = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    year: new Date().getFullYear(),
    location: "",
    coverFile: null,
    coverPreview: "",
    galleryFiles: [],
    galleryPreviews: [],
  });

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://backendleadershiphub-2.onrender.com/gallery/getdata");
        const data = await res.json();
        console.log(data,"this isthe gallery data")
        if (data.success) {
          setGalleryData(data.data || []);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching gallery data.");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        coverFile: file,
        coverPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      galleryFiles: [...prev.galleryFiles, ...files],
      galleryPreviews: [...prev.galleryPreviews, ...newPreviews],
    }));
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryFiles: prev.galleryFiles.filter((_, i) => i !== index),
      galleryPreviews: prev.galleryPreviews.filter((_, i) => i !== index),
    }));
  };

  // --- EDIT ACTION ---
  const handleEditClick = (item) => {
    console.log(item ,"this is the item to be edited")
    setIsEditing(true);
    setCurrentId(item._id);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      year: item.year,
      location: item.location,
      coverFile: null,
      coverPreview: item.coverImage || item.image, // Supports old and new schema
      galleryFiles: [],
      galleryPreviews: item.galleryImages || [], // Show existing URLs
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- DELETE ACTION ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this memory?")) {
      try {
        const response = await api.delete(`/gallery/delete/${id}`);
        if (response.data.success) {
          setGalleryData((prev) => prev.filter((item) => item._id !== id));
          toast.success("Memory deleted successfully!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error deleting item.");
      }
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
    formData.galleryFiles.forEach((file) => apiFormData.append("galleryImages", file));

    try {
      const url = isEditing 
        ? `https://backendleadershiphub-2.onrender.com/gallery/update/${currentId}` 
        : "https://backendleadershiphub-2.onrender.com/gallery/insertgallery";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        body: apiFormData,
      });

      const result = await response.json();
      if (result.success) {
        toast.success(isEditing ? "Updated!" : "Saved!");
        resetForm();
        window.location.reload(); 
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
      location: "", coverFile: null, coverPreview: "", galleryFiles: [], galleryPreviews: [],
    });
    setIsEditing(false);
    setCurrentId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gallery Admin</h1>
            <p className="text-slate-500 mt-1">Manage bulk images and cover photos.</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(!showForm); }}
            className={`px-6 py-3 rounded-lg font-medium shadow-md transition-all ${
              showForm ? "bg-slate-200 text-slate-700" : "bg-red-800 text-white hover:bg-red-900"
            }`}
          >
            {showForm ? "Cancel" : "Add New Memory"}
          </button>
        </div>

        {/* FORM SECTION */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg border border-red-100 p-8 mb-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
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
                      <label className="block text-sm font-medium text-slate-700 mb-1">Year *</label>
                      <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                      <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border rounded-lg"></textarea>
                  </div>
                </div>
              </div>

              {/* IMAGE UPLOAD SECTION */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">1. Cover Photo (Main) *</label>
                  <div className="border-2 border-dashed border-red-100 p-3 rounded-lg bg-red-50/30">
                    {formData.coverPreview ? (
                      <div className="relative h-32">
                        <img src={formData.coverPreview} className="w-full h-full object-cover rounded shadow" alt="Cover" />
                        <button type="button" onClick={() => setFormData({...formData, coverFile:null, coverPreview:""})} className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6">✕</button>
                      </div>
                    ) : (
                      <input type="file" accept="image/*" onChange={handleCoverChange} className="text-sm" />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">2. Additional Gallery Images</label>
                  <input type="file" multiple accept="image/*" onChange={handleGalleryChange} className="text-sm mb-3 block w-full" />
                  <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 border rounded bg-slate-50">
                    {formData.galleryPreviews.map((src, idx) => (
                      <div key={idx} className="relative group h-16">
                        <img src={src} className="w-full h-full object-cover rounded" alt="Gallery" />
                        <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute -top-1 -right-1 bg-black text-white rounded-full w-4 h-4 text-[10px]">✕</button>
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" disabled={isUploading} className="w-full bg-red-800 text-white py-3 rounded-lg font-bold hover:bg-red-900 transition disabled:opacity-50">
                  {isUploading ? "Uploading..." : isEditing ? "Update Memory" : "Save to Gallery"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- LIST WITH EDIT/DELETE --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryData.map((item) => (
            <div key={item._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={item.coverImage || item.image} alt={item.title} className="w-full h-48 object-cover" />
                <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                  {item.galleryImages?.length || 0} Photos
                </span>
              </div>
              
              <div className="p-4">
                <h4 className="font-bold text-slate-800 truncate mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 mb-4">{item.category} • {item.year}</p>
                
                <div className="flex items-center justify-between border-t pt-3">
                  <button 
                    onClick={() => handleEditClick(item)} 
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)} 
                    className="text-red-600 hover:text-red-800 text-sm font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {galleryData.length === 0 && !isUploading && (
          <div className="text-center py-20 text-slate-400">
            No gallery items found. Click "Add New Memory" to start.
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminGalleryPanel;