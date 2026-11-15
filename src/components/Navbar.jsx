import React from 'react';
import { Utensils, PlusCircle, Scale, Sparkles, ShieldCheck, LogOut, Heart, Lock } from 'lucide-react';

export default function Navbar({ 
  adminUser, 
  onOpenAdminLogin, 
  onLogoutAdmin, 
  onOpenAddRecipe, 
  onOpenGuide, 
  onResetHome,
  favoritesCount,
  onShowFavorites,
  isFavoritesActive
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand: Burmese Food Recipes */}
          <button 
            onClick={onResetHome}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-600 to-yellow-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-all">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-stone-900 tracking-tight">
                  Burmese Food Recipes
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-extrabold bg-orange-100 text-orange-800">
                  <Sparkles className="w-3 h-3 mr-0.5 text-orange-600" /> မြန်မာ့ရိုးရာ
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                အစားအစာ ချက်ပြုတ်နည်း လျှို့ဝှက်ချက်များနှင့် အချိုးအစားများ
              </p>
            </div>
          </button>

          {/* Action Center */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Favorites Toggle */}
            <button
              onClick={onShowFavorites}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isFavoritesActive
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-600'
              }`}
              title="Saved Favorites"
            >
              <Heart className={`w-4 h-4 ${isFavoritesActive || favoritesCount > 0 ? 'fill-current text-rose-500' : ''}`} />
              <span className="hidden sm:inline">အကြိုက်ဆုံးများ</span>
              {favoritesCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-2xs font-black ${
                  isFavoritesActive ? 'bg-white text-rose-600' : 'bg-rose-500 text-white'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Measurement Guide */}
            <button
              onClick={onOpenGuide}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <Scale className="w-4 h-4 text-stone-500" />
              <span>ဇွန်း/ဂရမ် ချိန်တွယ်နည်း</span>
            </button>

            {/* Admin Controls */}
            {adminUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAddRecipe}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>ဟင်းအသစ်ထည့်မည်</span>
                </button>

                <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Admin Mode</span>
                </div>

                <button
                  onClick={onLogoutAdmin}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-red-50 hover:text-red-600 text-stone-600 transition-colors cursor-pointer"
                  title="Logout Admin"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-stone-500" />
                <span>Admin Login</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
