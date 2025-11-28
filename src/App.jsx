// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <ScrollToTop/>
      {/* Header is persistent across pages */}
      <Header />

      {/* Page routes */}
      <main className="pt-20"> {/* add padding to offset fixed header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/biography" element={<Biography />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<LatestNews />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/bookstore" element={<Bookstore />} />
        </Routes>
      </main>

      {/* Footer is persistent */}
      <Footer />
    </Router>
  );
};

export default App;
