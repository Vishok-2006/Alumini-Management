// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, GraduationCap, LayoutDashboard } from 'lucide-react';
import { logout, getCurrentUser } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <GraduationCap className="text-white h-6 w-6" />
        </div>
        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
          AlumniConnect
        </Link>
      </div>

      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <span className="text-slate-600 font-medium">Hello, {user.email}</span>
            <Link to="/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition">
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full font-medium transition shadow-sm"
            >
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/directory" className="font-medium text-slate-600 hover:text-blue-600 transition">Directory</Link>
            <Link to="/events" className="font-medium text-slate-600 hover:text-blue-600 transition">Events</Link>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium transition shadow-lg shadow-blue-500/30">
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
