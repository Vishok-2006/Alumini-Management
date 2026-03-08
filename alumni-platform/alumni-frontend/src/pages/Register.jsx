import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { register } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'ALUMNI',
    batchYear: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    // basic validation
    if (!formData.email || !formData.password || !formData.fullName) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const payload = { ...formData };
      if (payload.role === 'ALUMNI' && payload.batchYear) {
        payload.batchYear = parseInt(payload.batchYear, 10);
      } else {
        payload.batchYear = null;
      }
      
      await register(payload);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register account');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center mb-10">
          <div className="bg-blue-100 p-3 rounded-2xl inline-flex mb-4">
            <GraduationCap className="text-blue-600 h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
          <p className="text-slate-500 mt-2">Join the Alumni Network</p>
        </div>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center font-medium">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-sm text-center font-medium">{success}</div>}

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Account Type</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="ALUMNI">Alumni</option>
                <option value="STUDENT">Student</option>
              </select>
            </div>
            {formData.role === 'ALUMNI' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Batch Year</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="2020"
                  value={formData.batchYear}
                  onChange={(e) => setFormData({...formData, batchYear: e.target.value})}
                />
              </div>
            )}
          </div>
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 mt-2 rounded-xl font-semibold transition shadow-lg shadow-blue-500/30">
            Create Account
          </button>
        </form>
        
        <p className="text-center text-slate-600 mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
