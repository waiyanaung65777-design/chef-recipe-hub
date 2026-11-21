import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../lib/supabase';

export default function AdminLoginPage({ adminUser, onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If already logged in, redirect to admin dashboard
  if (adminUser) {
    navigate('/admin', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const user = await loginAdmin(email, password);
      onLoginSuccess(user);
      navigate('/admin');
    } catch (err) {
      setErrorMsg(err.message || 'Username သို့မဟုတ် Password မှားယွင်းနေပါသည်။');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Back to Home Link */}
      <div className="max-w-md w-full mx-auto mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ပင်မစာမျက်နှာသို့ ပြန်သွားမည်</span>
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-8 shadow-xl border border-stone-200/80 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white p-2 border border-amber-200/80 shadow-xs flex items-center justify-center">
            <img src="/logo.jpg" alt="Burmese Food Recipes" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-xl font-black text-stone-900">
              Admin Portal
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Burmese Food Recipes စီမံခန့်ခွဲမှု အကောင့်ဝင်ရောက်ရန်
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Admin Username / Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@bfr.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{loading ? 'စစ်ဆေးနေပါသည်...' : 'Admin Login'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
