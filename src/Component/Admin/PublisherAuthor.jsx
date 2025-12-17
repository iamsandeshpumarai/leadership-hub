import React, { useState } from "react";
import { useEffect } from "react";

/**
 * Props:
 * - onChange(authorObject)  // called on every internal change (optional)
 * - onSave(authorObject)    // called when Save Author is clicked (optional)
 * - onClose()               // called when Close is clicked
 * - saving (bool)           // optional loading state from parent
 */
const PublisherAuthor = ({ onChange, onSave, onClose, saving = false }) => {
  const [author, setAuthor] = useState({
    aboutauthor: "",
    authortags: [{ role: "", badge: "" }],
  });

  // Update about author
  const handleAboutChange = (e) => {
    const updated = { ...author, aboutauthor: e.target.value };
    setAuthor(updated);
    onChange?.(updated);
  };

  // Update role / badge
  const handleTagChange = (index, field, value) => {
    const updatedTags = [...author.authortags];
    updatedTags[index] = { ...updatedTags[index], [field]: value };
    const updatedAuthor = { ...author, authortags: updatedTags };
    setAuthor(updatedAuthor);
    onChange?.(updatedAuthor);
  };

  // Add new tag
  const addAuthorRole = () => {
    const updatedAuthor = {
      ...author,
      authortags: [...author.authortags, { role: "", badge: "" }],
    };
    setAuthor(updatedAuthor);
    onChange?.(updatedAuthor);
  };

  // Remove tag
  const removeAuthorRole = (index) => {
    const updatedTags = author.authortags.filter((_, i) => i !== index);
    const updatedAuthor = { ...author, authortags: updatedTags.length ? updatedTags : [{ role: "", badge: "" }] };
    setAuthor(updatedAuthor);
    onChange?.(updatedAuthor);
  };
useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await fetch("https://backendleadershiphub-2.onrender.com/store/getauthor");
        const data = await res.json();

        // Optional: remove Mongo fields you don't need
        const cleaned = {
          aboutauthor: data.aboutauthor || "",
          authortags: data.authortags?.length
            ? data.authortags.map(({ role, badge }) => ({ role, badge }))
            : [{ role: "", badge: "" }],
        };

        setAuthor(cleaned);
        onChange?.(cleaned);
      } catch (error) {
        console.error("Failed to load author", error);
      }
    };

    fetchAuthor();
  }, []);

  return (
    <div className="space-y-6 border-t border-slate-200 pt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Add Editor / Publisher</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onClose?.()}
            className="text-sm text-slate-600 hover:text-slate-800"
          >
            Close
          </button>
        </div>
      </div>

      {/* About Author */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">About Author</label>
        <textarea
          rows={3}
          value={author.aboutauthor}
          onChange={handleAboutChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
          placeholder="Write something about the author..."
        />
      </div>

      {/* Author Roles */}
      <div className="space-y-3">
        <h4 className="font-semibold text-slate-800">Author Roles / Badges</h4>

        {author?.authortags.map((tag, index) => (
          <div key={index} className="flex gap-3 items-center">
            <input
              value={tag.role}
              onChange={(e) => handleTagChange(index, "role", e.target.value)}
              placeholder="Role (e.g. Editor)"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />

            <select
              value={tag.badge}
              onChange={(e) => handleTagChange(index, "badge", e.target.value)}
              className="w-40 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value="">Badge</option>
              <option value="publisher">Publisher</option>
              <option value="achievement">Achievement</option>
            </select>

            {author?.authortags.length > 1 && (
              <button
                type="button"
                onClick={() => removeAuthorRole(index)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addAuthorRole}
          className="text-sm bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          + Add Author Role
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-2">
        <button
          type="button"
          onClick={() => onClose?.()}
          className="px-4 py-2 rounded-md bg-slate-500 text-white hover:bg-slate-600"
        >
          Close
        </button>

        <button
          type="button"
          onClick={() => onSave?.(author)}
          disabled={saving}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Author"}
        </button>
      </div>
    </div>
  );
};

export default PublisherAuthor;
