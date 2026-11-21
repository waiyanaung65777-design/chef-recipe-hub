import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Heart, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ 
  onOpenGuide, 
  favoritesCount, 
  onShowFavorites, 
  isFavoritesActive 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Official Brand Logo */}
          <Link 
            to="/" 
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
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-2xs font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
                  <Sparkles className="w-2.5 h-2.5 mr-0.5 text-amber-600" /> ရိုးရာလက်ရာ
                </span>
              </div>
              <p className="text-2xs text-stone-500 font-medium hidden xs:block">
                မြန်မာ့အစားအစာ ချက်ပြုတ်နည်း လျှို့ဝှက်ချက်များ
              </p>
            </div>
          </Link>

          {/* Clean Right Actions (Public) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Favorites Button */}
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <Scale className="w-4 h-4 text-stone-500" />
              <span className="hidden sm:inline">ဇွန်း/ဂရမ် ချိန်တွယ်နည်း</span>
              <span className="sm:hidden">ချိန်တွယ်နည်း</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
