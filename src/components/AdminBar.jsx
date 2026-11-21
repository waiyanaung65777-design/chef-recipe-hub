import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PlusCircle, LayoutDashboard, LogOut } from 'lucide-react';

export default function AdminBar({ adminUser, onOpenAddRecipe, onLogout }) {
  if (!adminUser) return null;

  return (
    <div className="bg-stone-900 text-white text-xs px-4 py-2 border-b border-stone-800 flex items-center justify-between z-50 sticky top-0">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-amber-400" />
        <span className="font-bold text-amber-400">Admin Mode Active:</span>
        <span className="text-stone-300 hidden sm:inline">{adminUser.email}</span>
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors font-semibold"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>

        <button
          onClick={onOpenAddRecipe}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 transition-colors font-bold cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>ဟင်းအသစ်</span>
        </button>

        <button
          onClick={onLogout}
          className="p-1 rounded-lg hover:bg-red-500 text-stone-400 hover:text-white transition-colors cursor-pointer"
          title="Logout"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
