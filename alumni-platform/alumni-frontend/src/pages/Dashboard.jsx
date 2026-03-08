import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Mail, Calendar, Edit, Building } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
          <div className="h-32 w-32 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold flex-shrink-0">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome, {user.email}!</h1>
            <p className="text-slate-500 font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{user.role}</span>
              <span>Member since 2026</span>
            </p>
            {user.role === 'ALUMNI' && (
              <button className="flex items-center justify-center md:justify-start gap-2 text-blue-600 hover:text-blue-800 font-medium transition">
                <Edit size={16} /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {user.role === 'ADMIN' && (
           <div className="grid md:grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover-lift">
               <h3 className="text-slate-500 font-medium mb-2">Total Alumni</h3>
               <p className="text-4xl font-bold text-slate-800">1,248</p>
             </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover-lift">
               <h3 className="text-slate-500 font-medium mb-2">Total Students</h3>
               <p className="text-4xl font-bold text-slate-800">4,521</p>
             </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover-lift">
               <h3 className="text-slate-500 font-medium mb-2">Upcoming Events</h3>
               <p className="text-4xl font-bold text-slate-800">5</p>
             </div>
           </div>
        )}

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
           <h2 className="text-2xl font-bold text-slate-800 mb-6">Recent Activity / Announcements</h2>
           <div className="space-y-4">
              {[1, 2, 3].map((post) => (
                <div key={post} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-800 text-lg">Annual Alumni Meetup 2026</h4>
                    <span className="text-xs text-slate-400 bg-white px-2 py-1 flex rounded-lg border border-slate-100">2 days ago</span>
                  </div>
                  <p className="text-slate-600">Join us for the upcoming annual alumni meetup at the college campus. Reconnect with old friends and professors!</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
