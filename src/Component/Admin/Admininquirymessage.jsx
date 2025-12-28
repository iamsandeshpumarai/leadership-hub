import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../utils/api"; // Assuming your axios instance is here
import toast from "react-hot-toast";
import { Trash2, Mail, Calendar, User } from "lucide-react";

const MessageDashboard = () => {
  const queryClient = useQueryClient();

  // 1. Fetching Data using useQuery
  const { data: messages, isLoading, isError } = useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      const response = await api.get("/inquiry/getmessages");
      return response.data.data; // Accessing the array inside the data property
    },
  });

  // 2. Deleting Data using useMutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await api.delete(`/inquiry/deletemessage/${id}`);
    },
    onMutate: () => {
      toast.loading("Deleting message...", { id: "delete-inquiry" });
    },
    onSuccess: () => {
      // Refresh the list automatically
      queryClient.invalidateQueries(["inquiries"]);
      toast.success("Message deleted successfully", { id: "delete-inquiry" });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete", { id: "delete-inquiry" });
    },
  });

  if (isLoading) return <div className="p-10 text-center text-red-800">Loading messages...</div>;
  if (isError) return <div className="p-10 text-center text-red-500">Error loading data.</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-light text-red-900">
          Inquiry <span className="font-bold">Messages</span>
        </h2>
        <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
          Total: {messages?.length || 0}
        </span>
      </div>

      <div className="overflow-x-auto bg-white border border-red-100 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-red-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-red-900">User Details</th>
              <th className="px-6 py-4 text-sm font-semibold text-red-900">Subject</th>
              <th className="px-6 py-4 text-sm font-semibold text-red-900">Message</th>
              <th className="px-6 py-4 text-sm font-semibold text-red-900">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-red-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {messages && messages.length > 0 ? (
              messages.map((msg) => (
                <tr key={msg._id} className="hover:bg-red-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900 flex items-center gap-2">
                        <User size={14} className="text-red-600" /> {msg.fullName}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                        <Mail size={12} /> {msg.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                    {msg.subject}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                    {msg.message}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this inquiry?")) {
                          deleteMutation.mutate(msg._id);
                        }
                      }}
                      className="p-2 text-red-400 hover:text-red-700 hover:bg-red-100 rounded-full transition-all"
                      title="Delete Inquiry"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
                  No inquiry messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageDashboard;