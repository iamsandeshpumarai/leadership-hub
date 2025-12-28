import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logOutMutation } from "../../../utils/fetchData"; // Ensure this path is correct

const AdminLayout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Logout = useMutation({
    mutationKey: ["logout"],
    mutationFn: logOutMutation,
    onSuccess: () => {
      toast.success("Logout Successfully");
      queryClient.invalidateQueries(["auth"]);
      navigate("/login");
    },
    onError: () => {
      toast.error("Already Logged out");
    },
  });

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Home", path: "/admin/homes" },
    { name: "Biography", path: "/admin/biography" },
    { name: "News", path: "/admin/news" },
    { name: "Events", path: "/admin/events" },
    { name: "Gallery", path: "/admin/gallery" },
    { name: "Bookstore", path: "/admin/bookstore" },
    { name: "Contact Info", path: "/admin/contact" },
    { name: "Inquiry Messages", path: "/admin/inquiry" },
    { name: "Setting", path: "/admin/setting" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* --- Mobile Overlay (Backdrop) --- */}
      {/* This darkens the background when sidebar is open on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden glass"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Sidebar Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          
          {/* Close Button (Visible only on mobile) */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded hover:bg-gray-700 focus:outline-none transition-colors"
          >
            {/* SVG Icon for 'X' */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col mt-6 px-2 space-y-1 overflow-y-auto max-h-[calc(100vh-80px)]">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)} // Auto-close sidebar on mobile when a link is clicked
              className={({ isActive }) =>
                `py-2.5 px-4 rounded transition-colors duration-200 ${
                  isActive 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* --- Main Content Wrapper --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow-sm z-30 px-6 py-4">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu (Visible only on mobile) */}
            <button
              className="md:hidden text-gray-600 focus:outline-none hover:text-gray-900"
              onClick={() => setSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">Dashboard Overview</h1>
          </div>

          {/* Logout Button */}
          <button 
            onClick={() => Logout.mutate()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors shadow-sm"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;