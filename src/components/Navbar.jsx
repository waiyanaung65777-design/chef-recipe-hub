import React, { useState } from 'react';
import { Utensils, PlusCircle, Scale, Sparkles, ShieldCheck, LogOut, Heart, Lock, Menu, X } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => {
              onResetHome();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer shrink-0"
          >
            <div className="h-11 sm:h-14 flex items-center justify-center p-0.5 rounded-xl border border-amber-200/60 bg-white shadow-2xs group-hover:shadow-md transition-all">
              <img 
                src="/logo.jpg" 
                alt="Burmese Food Recipes" 
                className="h-10 sm:h-13 w-auto object-contain rounded-lg group-hover:scale-102 transition-transform"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-base sm:text-xl text-stone-900 tracking-tight">
                  Burmese Food Recipes
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-2xs font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
                  <Sparkles className="w-2.5 h-2.5 mr-0.5 text-amber-600" /> ရိုးရာ
                </span>
              </div>
              <p className="text-2xs text-stone-500 font-medium hidden xs:block">
                မြန်မာ့အစားအစာ ချက်ပြုတ်နည်း လျှို့ဝှက်ချက်များ
              </p>
            </div>
          </button>

          {/* Desktop & Tablet Navigation */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            
            {/* Favorites Toggle */}
            <button
              onClick={onShowFavorites}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isFavoritesActive
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavoritesActive || favoritesCount > 0 ? 'fill-current text-rose-500' : ''}`} />
              <span>အကြိုက်ဆုံးများ</span>
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
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
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

                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Admin</span>
                </div>

                <button
                  onClick={onLogoutAdmin}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-red-50 hover:text-red-600 text-stone-600 transition-colors cursor-pointer"
                  title="Logout"
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

          {/* Mobile Right Bar (Icon Pills + Hamburger Toggle) */}
          <div className="flex md:hidden items-center gap-1.5">
            
            {/* Quick Mobile Favorite Icon */}
            <button
              onClick={onShowFavorites}
              className={`p-2 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                isFavoritesActive 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-stone-100 text-stone-700'
              }`}
              title="Favorites"
            >
              <Heart className={`w-4 h-4 ${isFavoritesActive || favoritesCount > 0 ? 'fill-current text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-3xs font-black rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Quick Add Recipe if Admin */}
            {adminUser && (
              <button
                onClick={onOpenAddRecipe}
                className="p-2 rounded-xl bg-orange-600 text-white shadow-xs cursor-pointer"
                title="Add Recipe"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            )}

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-100 space-y-2.5 animate-in slide-in-from-top-2">
            
            <button
              onClick={() => {
                onOpenGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-stone-50 text-stone-800 text-xs font-bold text-left cursor-pointer"
            >
              <Scale className="w-4 h-4 text-orange-600" />
              <span>ဇွန်း/ဂရမ် ချိန်တွယ်နည်း လမ်းညွှန်</span>
            </button>

            <button
              onClick={() => {
                onShowFavorites();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-stone-50 text-stone-800 text-xs font-bold text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>သိမ်းဆည်းထားသော ဟင်းများ (Favorites)</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-2xs font-black bg-rose-100 text-rose-700">
                {favoritesCount}
              </span>
            </button>

            {adminUser ? (
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <div className="flex items-center justify-between px-3 py-1.5 bg-amber-50 rounded-xl text-xs font-bold text-amber-900">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Admin Login ဝင်ထားသည်
                  </span>
                  <button
                    onClick={() => {
                      onLogoutAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="text-red-600 text-xs font-bold hover:underline cursor-pointer"
                  >
                    Logout
                  </button>
                </div>

                <button
                  onClick={() => {
                    onOpenAddRecipe();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>ဟင်းချက်နည်း အသစ်တင်မည်</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-stone-100">
                <button
                  onClick={() => {
                    onOpenAdminLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Admin Login ဝင်ရောက်မည်</span>
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </header>
  );
}
