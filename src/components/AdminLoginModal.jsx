import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Mail, AlertCircle, Key, CheckCircle } from 'lucide-react';
import { loginAdmin, isSupabaseConfigured, ADMIN_EMAIL } from '../lib/supabase';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const user = await loginAdmin(email, password);
      onLoginSuccess(user);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Login ပြုလုပ်ခြင်း မအောင်မြင်ပါ။ ပြန်လည်စစ်ဆေးပါ။');
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemo = () => {
    setEmail('admin@burmesefoodrecipes.com');
    setPassword('admin123456');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-stone-900">
                Admin ဝင်ရောက်ရန်
              </h3>
              <p className="text-xs text-stone-500">
                ဟင်းချက်နည်းများ ပြင်ဆင်/ဖျက်ရန် အကောင့်ဝင်ပါ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Supabase status indicator */}
        <div className={`p-3 rounded-2xl text-xs flex items-start gap-2.5 ${
          isSupabaseConfigured 
            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
            : 'bg-amber-50 text-amber-900 border border-amber-200'
        }`}>
          {isSupabaseConfigured ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Supabase Cloud ချိတ်ဆက်ထားပါသည်</p>
                <p className="text-emerald-700">Database & Auth တိုက်ရိုက်အလုပ်လုပ်နေပါသည်။</p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Supabase Mock / Local Mode</p>
                <p className="text-amber-800">
                  Demo စမ်းသပ်နိုင်ရန်အတွက် အောက်ပါ Demo ခလုတ်ကို နှိပ်ပြီး ဝင်ရောက်နိုင်ပါသည်။
                </p>
              </div>
            </>
          )}
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@burmesefoodrecipes.com"
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
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? 'စစ်ဆေးနေပါသည်...' : 'Admin အဖြစ် ဝင်ရောက်မည်'}
          </button>
        </form>

        {/* Demo fill button */}
        {!isSupabaseConfigured && (
          <div className="pt-2 border-t border-stone-100 text-center">
            <button
              type="button"
              onClick={handleUseDemo}
              className="text-xs text-orange-600 hover:text-orange-700 font-bold inline-flex items-center gap-1 cursor-pointer hover:underline"
            >
              <Key className="w-3.5 h-3.5" /> Demo Login အချက်အလက်များ ဖြည့်ပေးပါ
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
