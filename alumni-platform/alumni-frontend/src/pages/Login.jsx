import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { login } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if(!email || !password) {
         setError("All fields are required.");
         return;
      }
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center mb-10">
          <div className="bg-blue-100 p-3 rounded-2xl inline-flex mb-4">
            <GraduationCap className="text-blue-600 h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Sign in to your account</p>
        </div>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center font-medium">{error}</div>}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition shadow-lg shadow-blue-500/30">
            Sign In
          </button>
        </form>
        
        <p className="text-center text-slate-600 mt-8 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
