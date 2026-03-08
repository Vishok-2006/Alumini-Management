import React from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, Building2, Search, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 glass-dark p-12 rounded-3xl border border-white/20 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/30 text-white/90 text-sm font-medium mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            The Next Generation Alumni Network
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Connect. Engage. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Empower.</span>
          </h2>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Join the centralized platform tailored for our college's alumni data management. Stay connected with your institution and explore opportunities from around the globe.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/register" className="flex items-center gap-2 bg-white text-blue-900 hover:bg-slate-100 px-8 py-4 rounded-full font-semibold text-lg hover-lift shadow-xl">
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/directory" className="flex items-center gap-2 glass text-white hover:bg-white/20 px-8 py-4 rounded-full font-semibold text-lg hover-lift border border-white/30">
              Browse Directory
            </Link>
          </div>
        </div>
      </main>

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-16 text-slate-800">Why Join AlumniConnect?</h3>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: <Users className="h-8 w-8 text-blue-500" />, title: "Networking", desc: "Connect directly with prominent alumni in your field of interest." },
            {icon: <Building2 className="h-8 w-8 text-indigo-500" />, title: "Career Opportunities", desc: "Find exclusive job postings and referral opportunities from alumni." },
            {icon: <Search className="h-8 w-8 text-cyan-500" />, title: "Directory", desc: "Filter and discover alumni globally via robust search capabilities." }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover-lift group">
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-50 transition">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <p>© 2026 AlumniConnect Platform. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
