import { , Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './Component/Header/Header';
import Footer from './Component/footer/footer';
import Home from './page/Home';
import Biography from './page/Biography';
import Events from './page/Events';
import Gallery from './page/Gallery';
import LatestNews from './page/LatestNews';
import Contactpage from './page/Contactpage';
import Bookstore from './page/Bookstore';
import ScrollToTop from './Scrolltotop';
import AdminLayout from './Component/Admin/AdminLayout';
import AdminDashboard from './Component/Admin/AdminDashboard';
import AdminBiography from './Component/Admin/PanelBiography';
import AdminNewsPanel from './Component/Admin/AdminNews';
import AdminEventsPanel from './Component/Admin/AdminEvents';
import AdminGalleryPanel from './Component/Admin/AdminGallery';
import AdminContactPanel from './Component/Admin/AdminContact';
import AdminHomePanel from './Component/Admin/AdminHome';
import AdminBookStorePanel from './Component/Admin/AdminBookStore';
import AdminLogin from './Component/Admin/AdminLogin';
import {ProtectRoute} from './Context/ProtectRoute';
import { Toaster } from 'react-hot-toast';

const App = () => {


  const { pathname } = useLocation();
  const Adminlogin = pathname === "/login" || pathname.startsWith("/admin");

  return (
    <div>
      <Toaster position='top-right'/>
      <ScrollToTop/>
      {!Adminlogin && <Header/>}

      <main className="">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ <AdminLogin/>  } />
          <Route path="/biography" element={<Biography />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<LatestNews />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/bookstore" element={<Bookstore />} />

          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectRoute>
                <AdminLayout />
              </ProtectRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="biography" element={<AdminBiography />} />
            <Route path="news" element={<AdminNewsPanel />} />
            <Route path="events" element={<AdminEventsPanel />} />
            <Route path="gallery" element={<AdminGalleryPanel />} />
            <Route path="contact" element={<AdminContactPanel />} />
            <Route path="homes" element={<AdminHomePanel />} />
            <Route path="bookstore" element={<AdminBookStorePanel />} />
          </Route>
        </Routes>
      </main>

      {!Adminlogin && <Footer />}
    </div>
  );
};

export default App;
