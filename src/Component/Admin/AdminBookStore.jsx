import React, { useState, useEffect, useCallback } from "react";
import api from "../../../utils/api";
import PublisherAuthor from "./PublisherAuthor";

const AdminBookPanel = () => {
  const [showAuthorForm, setShowAuthorForm] = useState(false);
  const [authorUploading, setAuthorUploading] = useState(false);

  const initialFormData = {
    _id: "",
    title: "",
    subtitle: "",
    publishDesc: "",
    tags: "", // comma-separated (UI only)
    price: 0,
  };

  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch books
  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/store");
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const resetForm = () => {
    setFormData(initialFormData);
    setIsEdit(false);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      setFormData((p) => ({ ...p, price: Number(value) || 0 }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleEditClick = (book) => {
    setFormData({
      _id: book._id,
      title: book.title || "",
      subtitle: book.subtitle || "",
      publishDesc: book.publishDesc || "",
      tags: Array.isArray(book.tags) ? book.tags.join(", ") : "",
      price: Number(book.price) || 0,
    });
    setIsEdit(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        publishDesc: formData.publishDesc,
        price: formData.price,
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
      };

      if (isEdit) {
        await api.put(`/store/${formData._id}`, payload);
        alert("Book updated successfully");
      } else {
        await api.post("/store", payload);
        alert("Book added successfully");
      }

      await fetchBooks();
      resetForm();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save book");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await api.delete(`/store/${id}`);
      fetchBooks();
      alert("Book deleted");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  // Save author (called when PublisherAuthor calls onSave)
  const saveAuthor = async (authorData) => {
    setAuthorUploading(true);
    try {
      // POST to /authors - adjust endpoint if your backend uses another route
      await api.put("/store/author", authorData);
      alert("Author saved successfully");
      setShowAuthorForm(false);
    } catch (err) {
      console.error("Author save error:", err);
      alert("Failed to save author");
    } finally {
      setAuthorUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">📚 Book Admin</h1>
            <p className="text-slate-500">Manage your books</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                // open a fresh book form
                setFormData(initialFormData);
                setIsEdit(false);
                setShowForm((s) => !s);
              }}
              className={`px-5 py-2 rounded-md text-white font-medium transition
                ${showForm ? "bg-slate-500 hover:bg-slate-600" : "bg-red-800 hover:bg-red-900"}`}
            >
              {showForm ? "Close Book Form" : "Add New Book"}
            </button>

            <button
              onClick={() => setShowAuthorForm(true)}
              className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
            >
              About Publisher
            </button>
          </div>
        </div>

        {/* Book Form */}
        {showForm && (
          <div className="bg-white p-8 rounded-xl shadow border mb-10">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Book Title"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                  <input
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    placeholder="Subtitle"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Publish Description</label>
                  <textarea
                    name="publishDesc"
                    value={formData.publishDesc}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Publish description"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* Right */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
                  <input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g., fiction, thriller"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={String(formData.price ?? 0)}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Price"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 bg-red-800 text-white py-2 rounded-lg font-semibold hover:bg-red-900 transition disabled:opacity-60"
                  >
                    {isUploading ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update Book" : "Save Book")}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-slate-500 text-white py-2 rounded-lg font-semibold hover:bg-slate-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Author Form (modal-like block) */}
        {showAuthorForm && (
          <div className="bg-white p-6 rounded-xl shadow border mb-10">
            <div className="flex items-start justify-end">
              <button
                onClick={() => setShowAuthorForm(false)}
                className="text-sm text-slate-500 hover:text-slate-700"
                aria-label="Close author form"
              >
                Close
              </button>
            </div>

            <PublisherAuthor
              
              onSave={saveAuthor}
              onClose={() => setShowAuthorForm(false)}
              saving={authorUploading}
            />
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full divide-y">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs">Title</th>
                <th className="px-6 py-3 text-left text-xs">Price</th>
                <th className="px-6 py-3 text-center text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-t">
                  <td className="px-6 py-4">{book.title}</td>
                  <td className="px-6 py-4">Rs. {Number(book.price || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleEditClick(book)} className="text-indigo-600 mr-3">Edit</button>
                    <button onClick={() => handleDelete(book._id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-slate-500">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminBookPanel;
