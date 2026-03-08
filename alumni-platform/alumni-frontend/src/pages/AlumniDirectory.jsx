import React, { useEffect, useState } from 'react';
import { Search, Briefcase, MapPin, Mail, Loader2, Linkedin } from 'lucide-react';
import api from '../services/api';

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await api.get('alumni/all');
        setAlumni(response.data);
      } catch (error) {
        console.error("Failed to fetch alumni", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
    // Use Mock Data if backend empty
    setTimeout(() => {
      if(alumni.length === 0) {
        setAlumni([
           {id: 1, fullName: "Sarah Connor", batchYear: 2020, currentCompany: "Google", jobTitle: "Software Engineer", location: "Mountain View, CA", department: {name: "Computer Science"}},
           {id: 2, fullName: "John Doe", batchYear: 2018, currentCompany: "Microsoft", jobTitle: "Product Manager", location: "Seattle, WA", department: {name: "Information Technology"}},
           {id: 3, fullName: "Jane Smith", batchYear: 2022, currentCompany: "Amazon", jobTitle: "Data Scientist", location: "New York, NY", department: {name: "Mathematics"}},
        ]);
        setLoading(false);
      }
    }, 1000);
  }, [alumni.length]);

  const filteredAlumni = alumni.filter(a => 
    a.fullName?.toLowerCase().includes(search.toLowerCase()) || 
    a.currentCompany?.toLowerCase().includes(search.toLowerCase()) ||
    a.batchYear?.toString().includes(search)
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Alumni Directory</h1>
          <p className="text-slate-500 text-lg mt-2">Connect with graduates around the globe.</p>
        </div>

        <div className="mb-10 w-full max-w-2xl">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 group-hover:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, company, or batch year..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition text-lg bg-white shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlumni.map((alum) => (
              <div key={alum.id} className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 hover-lift flex flex-col h-full group">
                <div className="flex items-start justify-between mb-6">
                   <div className="h-16 w-16 rounded-2xl bg-gradient-premium relative overflow-hidden flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                     {alum.fullName?.[0]}
                   </div>
                   <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                     Class of {alum.batchYear}
                   </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-1">{alum.fullName}</h3>
                <p className="text-slate-500 mb-6 font-medium text-sm flex items-center gap-1.5">
                   <Briefcase size={14} className="text-blue-400"/> {alum.jobTitle} @ <span className="text-blue-600 font-semibold">{alum.currentCompany}</span>
                </p>

                <div className="space-y-3 flex-grow border-t border-slate-100 pt-6 mt-2">
                  <div className="flex items-center gap-3 text-slate-600 text-sm">
                    <div className="bg-slate-50 p-2 rounded-lg"><MapPin size={16} className="text-slate-400" /></div>
                    <span className="font-medium">{alum.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm">
                    <div className="bg-slate-50 p-2 rounded-lg"><Mail size={16} className="text-slate-400" /></div>
                    <span className="font-medium">Contact via email</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                  <button className="text-blue-600 hover:text-white hover:bg-blue-600 font-semibold py-2 px-5 rounded-full transition-colors border border-blue-600 text-sm">
                    View Profile
                  </button>
                  <button className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                     <Linkedin size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredAlumni.length === 0 && (
           <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
             <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-slate-700">No alumni found</h3>
             <p className="text-slate-500 mt-2">Try adjusting your search criteria</p>
           </div>
        )}

      </div>
    </div>
  );
};

export default AlumniDirectory;
