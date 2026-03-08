import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout & Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AlumniDirectory from './pages/AlumniDirectory';

const App = () => {
  return (
    <BrowserRouter>
      {/* We add Navbar to all pages to feel like a complete app */}
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/directory" element={<AlumniDirectory />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
