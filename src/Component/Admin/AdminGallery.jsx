import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import toast from "react-hot-toast";

// You can keep INITIAL_DATA for testing, or fetch it from DB on load
const INITIAL_DATA = [];

const AdminGalleryPanel = () => {
  const [galleryData, setGalleryData] = useState(INITIAL_DATA);
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
    imageFile: null,
    imagePreview: "",
  });

  // --- FETCH DATA ON LOAD ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://backendleadershiphub-2.onrender.com/gallery/getdata");
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        if (data.success) {
          setGalleryData(data.data || []);
        } else {
          alert(`Failed to fetch data: ${data.message}`);
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching gallery data. Ensure backend is running.");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, imageFile: null, imagePreview: "" });
    const fileInput = document.getElementById("image-upload");
    if (fileInput) fileInput.value = "";
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentId(item._id);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      year: item.year,
      location: item.location,
      imageFile: null,
      imagePreview: item.image,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- MAIN SUBMIT FUNCTION ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enhanced client-side validation
    if (!formData.title || (!formData.imagePreview && !formData.imageFile) || !formData.year) {
      toast.error("Title, Year, and Image are required!");
      return;
    }

    setIsUploading(true);

    const apiFormData = new FormData();
    apiFormData.append("title", formData.title);
    apiFormData.append("description", formData.description);
    apiFormData.append("category", formData.category);
    apiFormData.append("year", formData.year);
    apiFormData.append("location", formData.location);

    if (formData.imageFile) {
      apiFormData.append("image", formData.imageFile);
    }

    try {
      let response;
      let result;

      if (isEditing) {
        response = await fetch(`https://backendleadershiphub-2.onrender.com/gallery/update/${currentId}`, {
          method: "PUT",
          body: apiFormData,
        });
      } else {
        response = await fetch("https://backendleadershiphub-2.onrender.com/gallery/insertgallery", {
          method: "POST",
          body: apiFormData,
        });
      }

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      result = await response.json();

      if (result.success) {
        if (isEditing) {
          // Immutable update
          setGalleryData((prev) => prev.map((item) => (item._id === currentId ? result.data : item)));
          toast.success("Gallery Updated Successfully!");
        } else {
          // Immutable add
          setGalleryData((prev) => [result.data, ...prev]);
          toast.success("Gallery Added Successfully!");
        }
        resetForm();
      } else {
        toast.error(`Failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Ensure backend is running on port 5000.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this memory?")) {
      try {
        const response = await api.delete(`/gallery/delete/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const result = await response.json();
        if (result.success) {
          // Immutable remove
          setGalleryData((prev) => prev.filter((item) => item._id !== id));
          toast.success("Gallery Deleted Successfully!");
        } else {
          toast.success(`Delete failed: ${result.message}`);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error deleting item.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      year: new Date().getFullYear(),
      location: "",
      imageFile: null,
      imagePreview: "",
    });
    setIsEditing(false);
    setCurrentId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gallery Admin</h1>
            <p className="text-slate-500 mt-1">Manage photos, videos, and memories.</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(!showForm); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all shadow-md ${
              showForm 
              ? "bg-slate-200 text-slate-700 hover:bg-slate-300" 
              : "bg-red-800 text-white hover:bg-red-900"
            }`}
          >
            {showForm ? (
              <>Cancel</>
            ) : (
              <>Add New Memory</>
            )}
          </button>
        </div>

        {/* --- ADD/EDIT FORM --- */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg border border-red-100 p-8 mb-12">
            <h2 className="text-xl font-bold text-red-800 mb-6 border-b pb-2">
              {isEditing ? "Edit Gallery Item" : "Add New Gallery Item"}
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Text Fields */}
              <div className="lg:col-span-2 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                    >
                      <option value="">Select Category</option>
                      <option value="Ministerial">Ministerial</option>
                      <option value="Constitutional">Constitutional</option>
                      <option value="Policy Work">Policy Work</option>
                      <option value="Community">Community</option>
                      <option value="Party Leadership">Party Leadership</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Year *</label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Gallery Image *</label>
                <div className={`relative w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center overflow-hidden ${formData.imagePreview ? 'border-red-500 bg-white' : 'border-slate-300 bg-slate-50'}`}>
                  {formData.imagePreview ? (
                    <>
                      <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 shadow-md"
                      >
                        X
                      </button>
                    </>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
                      <span className="text-sm text-slate-500">Click to upload</span>
                      <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} className="hidden" required={!isEditing} />
                    </label>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full mt-6 bg-red-800 text-white py-3 rounded-lg font-semibold hover:bg-red-900 transition disabled:opacity-70"
                >
                  {isUploading ? "Uploading..." : (isEditing ? "Update Item" : "Save to Gallery")}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryData.map((item) => (
              <div key={item._id} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 mb-2">{item.category} • {item.year}</p>
                  <div className="flex gap-2 mt-3">
                     <button onClick={() => handleEditClick(item)} className="text-blue-600 text-sm font-medium">Edit</button>
                     <button onClick={() => handleDelete(item._id)} className="text-red-600 text-sm font-medium">Delete</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGalleryPanel;