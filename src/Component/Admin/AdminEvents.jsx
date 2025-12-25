import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../../../utils/api";
import toast, { Toaster } from 'react-hot-toast';

// --- Utility Functions ---

const extractDateParts = (dateValue) => {
    if (!dateValue) return { day: "", month: "" };
    try {
        const dateObj = new Date(dateValue);
        if (isNaN(dateObj.getTime())) return { day: "", month: "" };
        const day = dateObj.getDate().toString();
        const month = dateObj.toLocaleString("en-US", { month: "short" });
        return { day, month };
    } catch (e) {
        return { day: "", month: "" };
    }
};

const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    return `${days} day${days !== 1 ? "s" : ""} ago`;
};

// --- Child Component: Single Event Editor ---

const EventEditCard = ({ event, index, onUpdate, onDelete, onSave }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const timeAgo = useMemo(() => getTimeAgo(event.createdAt || new Date()), [event.createdAt]);

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

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave(index, event._id);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Delete event "${event.title}"?`)) return;
        setIsDeleting(true);
        try {
            await onDelete(index, event._id);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="border border-blue-300 p-6 rounded-xl bg-white shadow-md space-y-4 transition hover:shadow-lg">
            <div className="flex justify-between items-center border-b pb-3 mb-2">
                <div>
                    <h4 className="font-bold text-lg text-blue-700">Event #{index + 1}</h4>
                    <p className="text-xs text-gray-400 uppercase">{event.day} {event.month}</p>
                </div>
                <p className="text-sm text-gray-500 font-medium">Updated: {timeAgo}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <input
                    type="text"
                    value={event.title}
                    onChange={(e) => onUpdate(index, "title", e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Event Title"
                />
                <input
                    type="date"
                    value={event.date ? event.date.substring(0, 10) : ""}
                    onChange={(e) => onUpdate(index, "date", e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <textarea
                rows={3}
                value={event.description}
                onChange={(e) => onUpdate(index, "description", e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Event Description"
            />

            <div className="grid md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-1">
                    <select
                        value={event.status}
                        onChange={(e) => onUpdate(index, "status", e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg w-full bg-blue-50 text-blue-700 font-semibold"
                    >
                        <option>Past Event</option>
                        <option>Upcoming Event</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-gray-500 w-full" />
                </div>
            </div>

            {/* Preview & Actions */}
            <div className="flex justify-between items-end pt-2">
                {(event.imagePreview || event.imageUrl) ? (
                    <img 
                        src={event.imagePreview || event.imageUrl} 
                        alt="Preview" 
                        className="h-16 w-24 object-cover rounded border border-blue-100" 
                    />
                ) : <div className="h-16" />}
                
                <div className="flex space-x-3">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting || isSaving}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium disabled:bg-gray-400"
                    >
                        {isDeleting ? "Deleting..." : "🗑️ Delete"}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isDeleting}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400"
                    >
                        {isSaving ? "Saving..." : "💾 Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Admin Panel Component ---

const AdminEventsPanel = () => {
    const queryClient = useQueryClient();
    const [eventList, setEventList] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: "", date: "", description: "", status: "Upcoming Event", imageFile: null, imagePreview: ""
    });

    // 1. Fetch Data
    const { data, isLoading } = useQuery({
        queryKey: ["eventsdata"],
        queryFn: async () => {
            const response = await api.get("/event/getevent");
            return (response?.data?.data || []).map(e => ({
                ...e,
                ...extractDateParts(e.date)
            })).sort((a, b) => new Date(b.date) - new Date(a.date));
        },
    });

    useEffect(() => {
        if (data) setEventList(data);
    }, [data]);

    // 2. Add Mutation
    const addMutation = useMutation({
        mutationFn: async (formData) => api.post("/event/inserteventdata", formData),
        onSuccess: () => {
            toast.success("Event added successfully!");
            setNewEvent({ title: "", date: "", description: "", status: "Upcoming Event", imageFile: null, imagePreview: "" });
            queryClient.invalidateQueries(["eventsdata"]);
        },
        onError: (err) => toast.error("Failed to add event: " + err.message)
    });

    // 3. Update Mutation
    const updateMutation = useMutation({
        mutationFn: async ({ id, formData }) => api.put(`/event/updateevent/${id}`, formData),
        onSuccess: () => {
            toast.success("Event updated successfully!");
            queryClient.invalidateQueries(["eventsdata"]);
        },
        onError: (err) => toast.error("Update failed: " + err.message)
    });

    // 4. Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`/event/deleteevent/${id}`),
        onSuccess: () => {
            toast.success("Event deleted!");
            queryClient.invalidateQueries(["eventsdata"]);
        },
        onError: (err) => toast.error("Delete failed: " + err.message)
    });

    // --- Handlers ---

    const handleAddEvent = () => {
        if (!newEvent.title || !newEvent.date) return toast.error("Title and Date are required!");
        
        const formData = new FormData();
        formData.append("title", newEvent.title);
        formData.append("date", newEvent.date);
        formData.append("description", newEvent.description);
        formData.append("status", newEvent.status);
        if (newEvent.imageFile) formData.append("image", newEvent.imageFile);
        
        addMutation.mutate(formData);
    };

    const handleEditLocal = (index, field, value) => {
        const updated = [...eventList];
        updated[index][field] = value;
        if (field === "date") {
            const { day, month } = extractDateParts(value);
            updated[index].day = day;
            updated[index].month = month;
        }
        setEventList(updated);
    };

    const handleSaveUpdate = async (index, id) => {
        const item = eventList[index];
        const formData = new FormData();
        formData.append("title", item.title);
        formData.append("date", item.date);
        formData.append("description", item.description);
        formData.append("status", item.status);
        formData.append("imageUrl", item.imageUrl);
        if (item.imageFile) formData.append("image", item.imageFile);

        updateMutation.mutate({ id, formData });
    };

    if (isLoading) return <div className="text-center text-xl p-10 text-blue-600">Loading Events... 🔄</div>;

    return (
        <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen space-y-10">
            <Toaster position="top-right" />
            
            <h2 className="text-4xl font-extrabold text-blue-900 text-center border-b-4 border-blue-200 pb-4">
                🗓️ Admin Events Panel
            </h2>

            {/* Add New Section */}
            <section className="border border-blue-400 p-8 rounded-xl bg-blue-50 shadow-inner space-y-6">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">➕ Add New Event</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <input
                        type="text" placeholder="Event Title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="border p-3 rounded-lg focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="border p-3 rounded-lg focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="file" accept="image/*"
                        onChange={(e) => setNewEvent({ ...newEvent, imageFile: e.target.files[0] })}
                        className="text-sm pt-2"
                    />
                </div>
                <textarea
                    placeholder="Description..."
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="border p-3 rounded-lg w-full h-20 focus:ring-blue-500 outline-none"
                />
                <button
                    onClick={handleAddEvent}
                    disabled={addMutation.isPending}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-bold transition disabled:bg-gray-400"
                >
                    {addMutation.isPending ? "Adding..." : "Add Event"}
                </button>
            </section>

            {/* List Section */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-800 border-b pb-2">📝 Current Events ({eventList.length})</h3>
                <div className="grid gap-6">
                    {eventList.map((event, index) => (
                        <EventEditCard
                            key={event._id}
                            event={event}
                            index={index}
                            onUpdate={handleEditLocal}
                            onDelete={() => deleteMutation.mutate(event._id)}
                            onSave={handleSaveUpdate}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminEventsPanel;