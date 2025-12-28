// AdminDashboard.jsx

import { useEffect } from "react";
import { FaCalendarAlt, FaNewspaper, FaImages,  FaBook } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const AdminDashboard = () => {
  const navigate =  useNavigate()



  // Sample data - replace with API or database later
  
  const [stats,updateStats] = useState({
  event:  { title: "Events", count: 3, icon: <FaCalendarAlt className="text-3xl" /> },
  news:  { title: "News", count: 3, icon: <FaNewspaper className="text-3xl" /> },
 gallery:   { title: "Gallery", count: 6, icon: <FaImages className="text-3xl" /> },
   books: { title: "Books", count: 4, icon: <FaBook className="text-3xl" /> },
})

  const [News,setNews] = useState([
    { id: 1, title: "Minister visits school", date: "2025-11-29" },
    { id: 2, title: "New project inauguration", date: "2025-11-28" },
  ])

  const  [Events,setEvents] = useState([
    { id: 1, title: "Town Hall Meeting", date: "2025-12-05" },
    { id: 2, title: "Press Conference", date: "2025-12-10" },
  ])

useEffect(() => {
  Promise.all([
    fetch("https://backendleadershiphub-2.onrender.com/event/getevent").then(r => r.json()),
    fetch("https://backendleadershiphub-2.onrender.com/gallery/getdata").then(r => r.json()),
    fetch("https://backendleadershiphub-2.onrender.com/store").then(r => r.json()),
    fetch("https://backendleadershiphub-2.onrender.com/news/getnews").then(r => r.json())
  ])
  .then(([event, gallery, books, news]) => {
    updateStats((prev)=>{
return {...prev , event:{...prev.event,count:event.data.length},news:{...prev.news,count :news.data.length},gallery:{...prev.gallery,count:gallery.data.length},books:{...prev.books,count:books.length}}
    })
    
    setEvents(event?.data)
    setNews(news?.data)
  })
  .catch(err => {
    toast.error("Cant Fetch the Data")
  });
}, []);




  return (
    <div className="space-y-6">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
          <div
            key={stats?.event.title}
            className="bg-white shadow rounded-lg p-5 flex items-center space-x-4"
          >
            <div className="text-blue-500">{stats?.event.icon}</div>
            <div>
              <h3 className="text-gray-500">{stats?.event.title}</h3>
              <p className="text-2xl font-bold">{stats?.event.count}</p>
            </div>
          </div>
          <div
            key={stats?.news.title}
            className="bg-white shadow rounded-lg p-5 flex items-center space-x-4"
          >
            <div className="text-blue-500">{stats?.news.icon}</div>
            <div>
              <h3 className="text-gray-500">{stats?.news.title}</h3>
              <p className="text-2xl font-bold">{stats?.news.count}</p>
            </div>
          </div>
          <div
            key={stats?.gallery.title}
            className="bg-white shadow rounded-lg p-5 flex items-center space-x-4"
          >
            <div className="text-blue-500">{stats?.gallery.icon}</div>
            <div>
              <h3 className="text-gray-500">{stats?.gallery.title}</h3>
              <p className="text-2xl font-bold">{stats?.gallery.count}</p>
            </div>
          </div>
          <div
            key={stats?.books.title}
            className="bg-white shadow rounded-lg p-5 flex items-center space-x-4"
          >
            <div className="text-blue-500">{stats?.books.icon}</div>
            <div>
              <h3 className="text-gray-500">{stats?.books.title}</h3>
              <p className="text-2xl font-bold">{stats?.books.count}</p>
            </div>
          </div>
        
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-5">
        <h2  className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={()=>navigate("/admin/events")} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Event
          </button>
          <button onClick={()=>{navigate("/admin/news")}} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add News
          </button>
          <button onClick={()=>{navigate("/admin/gallery")}} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Upload Gallery
          </button>
          <button onClick={()=>{navigate("/admin/biography")}} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Update Biography
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent News */}
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-3">Recent News</h2>
          <ul className="space-y-2">
            {News?.map((news) => (
              <li key={news.id} className="border-b pb-2">
                <p className="font-medium">{news.title}</p>
                <p className="text-gray-500 text-sm">{news.date.split("T")[0].toString()}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-3">Events</h2>
          <ul className="space-y-2">
            {Events?.map((event) => (
              <li key={event.id} className="border-b pb-2">
                <p className="font-medium">{event.title}</p>
                <p className="text-gray-500 text-sm">{event.date.split("T")[0].toString()}</p>{

                }
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
