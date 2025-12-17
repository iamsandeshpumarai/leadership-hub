import React, { useState, useEffect, useCallback } from "react";
import api from "../../../utils/api";
import toast, { Toaster } from 'react-hot-toast'; // IMPORTED toast and Toaster

// --- Components Separation for Better Readability ---

/**
 * Component for editing a single existing event.
 * Using a card/form layout for each event.
 */
const EventEditCard = ({ event, index, onUpdate, onDelete }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(index, "imageFile", file);
        onUpdate(index, "imagePreview", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper for direct field updates
  const handleFieldChange = (field, value) => {
    onUpdate(index, field, value);
  };

  return (
    <div className="border border-indigo-300 p-6 rounded-xl bg-white shadow-md space-y-4"> {/* THEME CHANGE: indigo-300 */}
      <div className="flex justify-between items-start border-b pb-3 mb-4">
        <h4 className="font-bold text-xl text-indigo-800">Event #{index + 1}</h4> {/* THEME CHANGE: indigo-800 */}
        <button
          onClick={() => onDelete(index)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm transition shadow" // Keep Delete button red for danger
        >
          🗑️ Delete
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          value={event.title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full font-medium focus:ring-indigo-500 focus:border-indigo-500" // THEME CHANGE: indigo focus
          placeholder="Title"
        />
        <input
          type="date"
          value={event.date}
          onChange={(e) => handleFieldChange("date", e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500" // THEME CHANGE: indigo focus
        />
      </div>

      <textarea
        rows={3}
        value={event.description}
        onChange={(e) => handleFieldChange("description", e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500" // THEME CHANGE: indigo focus
        placeholder="Description"
      />

      {/* Image Upload and Preview */}
      <div className="grid md:grid-cols-2 gap-4 items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        {(event.imagePreview || event.imageUrl) && ( // Check for both imagePreview and imageUrl
          <div className="flex justify-center">
            <img 
                src={event.imagePreview || event.imageUrl} 
                alt="Preview" 
                className="max-w-full h-24 object-cover rounded-lg shadow-md" 
            />
          </div>
        )}
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
          <select
            value={event.status}
            onChange={(e) => handleFieldChange("status", e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500" // THEME CHANGE: indigo focus
          >
            <option>Past Event</option>
            <option>Upcoming Event</option>
          </select>
          {/* Read-only auto-filled fields for display */}
          <input
            type="text"
            value={event.day}
            readOnly
            className="border p-3 rounded-lg bg-gray-100 text-gray-500"
            placeholder="Day (auto)"
          />
          <input
            type="text"
            value={event.month}
            readOnly
            className="border p-3 rounded-lg bg-gray-100 text-gray-500"
            placeholder="Month (auto)"
          />
      </div>
    </div>
  );
};

/**
 * Main Admin Panel Component
 */
const AdminEventsPanel = () => {
  // State for all events
  const [events, setEvents] = useState([]);
  // State for the temporary new event form
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    status: "Past Event",
    imageFile: null,
    imagePreview: "",
    day: "",
    month: "",
  });
  // State for UI feedback
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // --- Utility Functions ---
  const extractDateParts = (dateValue) => {
    if (!dateValue) return { day: "", month: "" };
    // Use try/catch for robust date parsing
    try {
        const dateObj = new Date(dateValue);
        // Check if date is valid
        if (isNaN(dateObj.getTime())) return { day: "", month: "" }; 

        const day = dateObj.getDate().toString();
        // Set locale to 'en-US' for consistent 3-letter month abbreviations
        const month = dateObj.toLocaleString("en-US", { month: "short" });
        return { day, month };
    } catch(e) {
        console.error("Date parsing error:", e);
        return { day: "", month: "" };
    }
  };

  // IMPROVED: Extract fetch logic for reuse
  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/event/getevent');
      const data = res.data;
      setEvents(data?.data.map(e => ({
        ...e,
        id: e._id, // Normalize _id to id (string) for consistency
        imagePreview: e.imageUrl,
        imageFile: null,
        ...extractDateParts(e.date)
      })) || []); // Ensure setEvents gets an array even if data is null/undefined
    } catch (err) {
      console.error(err);
      toast.error('Could not load events. Please try refreshing.'); // TOAST NOTIFICATION
      setError('Could not load events. Please try refreshing.');
    } finally {
      setIsLoading(false);
    }
  }, []); // Added useCallback and empty dependency array for stability

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]); // Dependency added

  // Handler for adding the completed 'New Event'
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.description) {
      // Check if title, date, and description are present
      setEvents([...events, { ...newEvent, id: crypto.randomUUID() }]); 
      toast('Event card added to the edit list.', { icon: '📝' }); // TOAST NOTIFICATION
      // Reset the new event form
      setNewEvent({
        title: "",
        date: "",
        description: "",
        status: "Past Event",
        imageFile: null,
        imagePreview: "",
        day: "",
        month: "",
      });
    } else {
      toast.error("Please fill in the Title, Date, and Description for the new event."); // TOAST NOTIFICATION
    }
  };

  // Handler for manually adding a blank event card to the editable list
  const handleAddBlankEvent = () => {
    setEvents([...events, {
      title: "",
      date: "",
      description: "",
      status: "Past Event",
      imageFile: null,
      imagePreview: "",
      day: "",
      month: "",
      id: crypto.randomUUID() // IMPROVED: UUID
    }]);
    toast('Blank event card added.', { icon: '➕' }); // TOAST NOTIFICATION
  };

  // Handler for updating a field on an existing event by index
  const handleUpdateEvent = (index, field, value) => {
    const updated = [...events];
    updated[index][field] = value;

    // Auto update day/month if date changes
    if (field === "date") {
        const { day, month } = extractDateParts(value);
        updated[index].day = day;
        updated[index].month = month;
    }

    setEvents(updated);
  };

  // Handler for deleting an event by index
  const handleDelete = (index) => {
    // Note: The previous code had a confirmation modal. Using toast for feedback.
    if (window.confirm("Are you sure you want to delete this event? This action will only be permanent after clicking 'Save All Events'.")) {
      setEvents(events.filter((_, i) => i !== index));
      toast('Event removed from the current list (click Save to confirm).', { icon: '🗑️' }); // TOAST NOTIFICATION
    }
  };

  // Handler for new event date/day/month calculation
  const handleNewEventDateChange = (e) => {
    const value = e.target.value;
    const { day, month } = extractDateParts(value);
    setNewEvent({ ...newEvent, date: value, day, month });
  };
  
  // Handler for new event image preview
  const handleNewEventImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent({ ...newEvent, imageFile: file, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Save Logic ---
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    const saveToastId = toast.loading("Saving events..."); // TOAST NOTIFICATION: Loading

    // Frontend validation
    if (events.some(e => !e.title || !e.date || !e.description)) {
      const msg = "All events must have title, date, and description.";
      toast.error(msg, { id: saveToastId }); // TOAST NOTIFICATION: Error
      setError(msg);
      setIsSaving(false);
      return;
    }

    const formData = new FormData();

    // Map events for JSON payload
    const eventsToSend = events.map(event => ({
      id: event.id, 
      title: event.title,
      date: event.date,
      description: event.description,
      status: event.status,
      day: event.day,
      month: event.month,
      // Send imageUrl if no new file is present, otherwise null 
      imageUrl: event.imageFile ? null : event.imagePreview, 
      isNewImage: !!event.imageFile,
    }));

    formData.append('events', JSON.stringify(eventsToSend));

    // Append new image files for upload
    events.forEach(event => {
      if (event.imageFile) {
        formData.append(`image-${event.id}`, event.imageFile);
      }
    });

    try {
      const res = await api.post('/event/inserteventdata', formData);
      console.log(res.data);
      
      // IMPROVED: Prefer returned data; fallback to refetch
      if (res.data?.data) {
        setEvents(res.data.data.map(e => ({
          ...e,
          id: e._id,
          imagePreview: e.imageUrl,
          imageFile: null,
          ...extractDateParts(e.date)
        })));
      } else {
        await fetchEvents();
      }
      
      toast.success("✅ Events saved successfully!", { id: saveToastId }); // TOAST NOTIFICATION: Success
    } catch (err) {
      console.error('Error saving events:', err);
      const errMsg = err.response?.data?.message || "❌ Error saving events! Check console.";
      toast.error(errMsg, { id: saveToastId }); // TOAST NOTIFICATION: Error
      setError(errMsg);
    } finally {
      setIsSaving(false);
    }
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4"> {/* THEME CHANGE: bg-slate-50 */}
      <Toaster position="top-right" reverseOrder={false} /> {/* ADDED TOASTER */}

      <div className="max-w-6xl mx-auto"> {/* Adjusted max width to match AdminBookPanel */}
        
        {/* Header (Matching AdminBookPanel) */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">🗓️ Event Admin</h1>
            <p className="text-slate-500">Manage your events</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddBlankEvent}
              className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition" 
            >
              ➕ Add Blank Event Card
            </button>
          </div>
        </div>


        {/* Add New Event Section */}
        <section className="border border-indigo-400 p-8 rounded-xl bg-indigo-50 shadow-inner space-y-6 mb-10"> {/* THEME CHANGE: indigo-400/50 */}
          <h3 className="font-bold text-indigo-700 text-2xl">➕ Add New Event Quick Form</h3> {/* THEME CHANGE: indigo-700 */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 items-end">
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="border p-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500" // THEME CHANGE: indigo focus
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={handleNewEventDateChange}
              className="border p-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500" // THEME CHANGE: indigo focus
            />
            <select
              value={newEvent.status}
              onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
              className="border p-3 rounded-lg w-full bg-white focus:ring-indigo-500 focus:border-indigo-500" // THEME CHANGE: indigo focus
            >
              <option value="Past Event">Past Event</option>
              <option value="Upcoming Event">Upcoming Event</option>
            </select>
            <button
              onClick={handleAddEvent}
              disabled={isSaving}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-bold transition disabled:opacity-50" // Keep green for 'Add'
            >
              {isSaving ? "Adding..." : "Add Event to List"}
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 items-center">
              <textarea
                  rows={2}
                  placeholder="Short Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="border p-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500" // THEME CHANGE: indigo focus
              />
              <input
                  type="file"
                  accept="image/*"
                  onChange={handleNewEventImageChange}
                  className="border p-3 rounded-lg w-full bg-white"
              />
          </div>

          {newEvent.imagePreview && (
            <div className="text-center">
              <img src={newEvent.imagePreview} alt="New Image Preview" className="max-w-xs mx-auto rounded-lg shadow-xl" />
            </div>
          )}
        </section>

        {/* Existing Events List Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-700 text-2xl">📝 Edit All Events ({events.length})</h3> {/* THEME CHANGE: slate-700 */}
          </div>

          {/* Loading and Error States */}
          {isLoading && <p className="text-center text-indigo-500 text-xl py-8">Loading events... 🔄</p>} {/* THEME CHANGE: indigo-500 */}
          {error && <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center font-semibold">{error}</div>}

          {/* Event Cards */}
          {!isLoading && events.length === 0 ? (
            <p className="text-gray-500 text-center py-8 border-t pt-4">No events found. Start by adding one above!</p>
          ) : (
            <div className="space-y-6">
              {events.map((event, idx) => (
                <EventEditCard
                  key={event.id} 
                  event={event}
                  index={idx}
                  onUpdate={handleUpdateEvent}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>

        {/* Final Save Button (Matching AdminBookPanel's Save/Update button) */}
        <div className="text-center pt-8 border-t border-slate-300 mt-10"> {/* THEME CHANGE: slate-300 */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-red-800 text-white px-12 py-3 rounded-xl hover:bg-red-900 font-semibold text-xl transition disabled:bg-gray-500 disabled:scale-100" // THEME CHANGE: red-800/900 for final save/danger action
          >
            {isSaving ? "💾 Saving... Please Wait" : "🚀 Save All Events"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEventsPanel;