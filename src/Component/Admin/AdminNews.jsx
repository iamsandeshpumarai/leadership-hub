import { useEffect, useState, useMemo } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../../../utils/api"; // Assuming 'api' handles authentication and base URL
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading";

// --- Utility Functions ---

/**
 * Calculates time difference from a given date string.
 * @param {string} dateString - ISO date string.
 * @returns {string} Time difference (e.g., "5 days ago").
 */
const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // Average days per month
  const years = Math.floor(days / 365.25); // Average days per year

  if (days === 0) {
    if (hours === 0) return "Just now";
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  return `${years} year${years !== 1 ? "s" : ""} ago`;
};

// --- Child Component: Single News Item Editor ---

const NewsEditCard = ({ news, index, onUpdate, onDelete, onSave }) => {
    // State to manage saving status specifically for this card
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const timeAgo = useMemo(() => getTimeAgo(news.date), [news.date]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave(index, news._id);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete "${news.title}"?`)) {
            return;
        }
        setIsDeleting(true);
        try {
            await onDelete(index, news._id);
        } finally {
            // Note: If deletion succeeds, the list rerenders, unmounting this component.
            // If it fails, we turn off the loading state.
            setIsDeleting(false); 
        }
    };

    return (
        <div key={news._id || index} className="border border-blue-300 p-5 rounded-xl bg-white shadow-md space-y-3 transition hover:shadow-lg">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h4 className="font-semibold text-lg text-blue-700">News Item #{index + 1}</h4>
                <p className="text-sm text-gray-500 font-medium">Published: {timeAgo}</p>
            </div>
            
            {/* Title Input */}
            <input
                type="text"
                placeholder="Title"
                value={news.title}
                onChange={(e) => onUpdate(index, "title", e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 font-medium"
            />

            {/* Date Input */}
            <input
                type="date"
                value={news.date ? news.date.substring(0, 10) : ''} // Format date for input field
                onChange={(e) => onUpdate(index, "date", e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {/* social media url  */}
<input
                type="text"
                placeholder="News URL"
                value={news.newsurl || ""}
                onChange={(e) => onUpdate(index, "newsurl", e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {/* Description Textarea */}
            <textarea
                placeholder="Description"
                rows={4}
                value={news.description}
                onChange={(e) => onUpdate(index, "description", e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg min-h-[100px] focus:ring-blue-500 focus:border-blue-500"
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-2">
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
    );
}

// --- Main Admin Panel Component ---

const AdminNewsPanel = () => {
    const queryClient = useQueryClient();
    const [newsList, setNewsList] = useState([]);
    const [newNews, setNewNews] = useState({
        title: "",
        date: "",
        description: "",
        newsurl:""
    });

    // 1. Fetch Data using useQuery
    const { data, isLoading, error } = useQuery({
        queryKey: ["newsdata"],
        queryFn: async () => {
            const response = await api.get("/news/getnews");
            // Sort by date descending (newest first)
            return (response?.data?.data || []).sort((a, b) => new Date(b.date) - new Date(a.date));
        },
    });

    // Sync local state when data changes (e.g., initial fetch or refetch)
    useEffect(() => {
        if (data) {
            setNewsList(data);
        }
    }, [data]);

    // 2. Add News Mutation
    const addMutation = useMutation({
        mutationFn: (newsData) => api.post("/news/insertnews", newsData),
        onSuccess: (response) => {
            toast.success("News added successfully!");
            // Prepend the new item (from server response) to the local list
            setNewsList(prev => [response.data.data, ...prev]); 
            setNewNews({ title: "", date: "", description: "",newsurl:"", });
            // Invalidate the query to keep cached data fresh
            queryClient.invalidateQueries(["newsdata"]);
        },
        onError: (err) => {
            console.error(err);
            toast.error("Failed to add news: " + err.message);
        }
    });

    // 3. Update/Save News Mutation
    // This is passed down to the child component
    const updateMutation = useMutation({
        mutationFn: ({ id, newsData }) => api.put(`/news/updatenews/${id}`, newsData),
        onSuccess: (response, variables) => {
            toast.success(`News item "${response.data.data.title}" saved successfully!`);
            
            // OPTIONAL: Update local state with the server's response for that specific item
            // This is safer than just using the local state copy in case the server altered data.
            setNewsList(prevList => prevList.map(item => 
                item._id === variables.id ? response.data.data : item
            ));
            queryClient.invalidateQueries(["newsdata"]);
        },
        onError: (err) => {
            console.error(err);
            toast.error("Failed to save news: " + err.message);
        }
    });
    
    // 4. Delete News Mutation
    // This is passed down to the child component
    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`/news/deletenews/${id}`),
        onSuccess: (_, deletedId) => {
            toast.success("News deleted successfully!");
            // Optimistic update: filter out the deleted item from the local state
            setNewsList(prev => prev.filter(news => news._id !== deletedId));
            queryClient.invalidateQueries(["newsdata"]);
        },
        onError: (err) => {
            console.error(err);
            toast.error("Failed to delete news: " + err.message);
        }
    });


    // --- Handlers using Mutations ---

    const handleAddNews = () => {
        if (!newNews.title || !newNews.description || !newNews.date || !newNews.newsurl) {
            return toast.error("Fill all fields for the new news item!");
        }
        addMutation.mutate(newNews);
    };

    const handleDelete = async (index, id) => {
        // The NewsEditCard component handles the confirmation dialog
        deleteMutation.mutate(id);
    };

    // Edit News (local) - Used by NewsEditCard
    const handleEdit = (index, field, value) => {
        const updated = newsList.map((news, i) =>
            i === index ? { ...news, [field]: value } : news
        );
        setNewsList(updated);
    };

    // Save Edited News - Used by NewsEditCard
    const handleSave = async (index, id) => {
        const news = newsList[index];
        updateMutation.mutate({ id, newsData: news });
    };


    if (isLoading) return <Loading/>
    if (error) return <div className="text-center text-xl p-10 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">Error fetching news: {error.message}</div>;

    return (
        <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-2xl shadow-2xl space-y-10">
            
            <h2 className="text-4xl font-extrabold text-blue-900 text-center border-b-4 border-blue-200 pb-4">
                🗞️ Admin News Panel
            </h2>

            {/* Add New News Section */}
            <section className="border border-blue-400 p-8 rounded-xl bg-blue-50 shadow-inner space-y-6">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">➕ Add New News Item</h3>

                <div className="grid md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newNews.title}
                        onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                        className="border p-3 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="date"
                        value={newNews.date}
                        onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
                        className="border p-3 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        onClick={handleAddNews}
                        disabled={addMutation.isPending}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold transition disabled:opacity-50 disabled:bg-gray-500"
                    >
                        {addMutation.isPending ? "Adding..." : "Add News Item"}
                    </button>
                </div>
                
                <textarea
                    placeholder="Description for the news item"
                    rows={4}
                    value={newNews.description}
                    onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
                    className="border p-3 rounded-lg w-full min-h-[100px] focus:ring-blue-500 focus:border-blue-500"
                />
                <input 
    type="text" 
    placeholder="URL for event news (e.g., https://...)" 
    className="w-[100%] border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
    value={newNews.newsurl}
    onChange={(e) => setNewNews({ ...newNews, newsurl: e.target.value })} // ADD THIS LINE
/>
            </section>

            {/* Existing News Section */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-700 border-b pb-2">📝 Existing News Items ({newsList.length})</h3>

                <div className="space-y-6">
                    {newsList?.map((news, index) => (
                        <NewsEditCard
                            key={news._id} // Use the unique ID from the database
                            news={news}
                            index={index}
                            onUpdate={handleEdit}
                            onDelete={handleDelete}
                            onSave={handleSave}
                        />
                    ))}
                </div>
                
                {!isLoading && newsList.length === 0 && (
                    <p className="text-gray-500 text-center py-8 border-t pt-4">No news items found. Add one above!</p>
                )}
            </section>
        </div>
    );
};

export default AdminNewsPanel;