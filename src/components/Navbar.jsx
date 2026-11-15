import React from 'react';
import { ChefHat, PlusCircle, Scale, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenAddRecipe, onOpenGuide, onResetHome }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button 
            onClick={onResetHome}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-stone-900 tracking-tight">
                  Chef Kyaw Min
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                  <Sparkles className="w-3 h-3 mr-1 text-amber-600" /> Kitchen
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                မြန်မာ့ရိုးရာနှင့် ခေတ်မီဟင်းချက်နည်း လျှို့ဝှက်ချက်များ
              </p>
            </div>
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenGuide}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <Scale className="w-4 h-4 text-stone-500" />
              <span>ဇွန်း/ဂရမ် ချိန်တွယ်နည်း</span>
            </button>

            <button
              onClick={onOpenAddRecipe}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-md shadow-orange-500/20 hover:shadow-lg transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ဟင်းချက်နည်းအသစ်ထည့်မည်</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
