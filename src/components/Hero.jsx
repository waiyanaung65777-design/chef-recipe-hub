import React from 'react';
import { Search, Sparkles, Heart } from 'lucide-react';

export default function Hero({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  onSelectCategory,
  isFavoritesActive,
  onToggleFavorites,
  favoritesCount
}) {
  return (
    <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 text-center bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent border-b border-stone-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Warm Friendly Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-stone-800 text-xs sm:text-sm font-bold shadow-xs border border-amber-200/80">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>မြန်မာ့ရိုးရာ အစားအစာ ချက်ပြုတ်နည်း လျှို့ဝှက်ချက်များ</span>
        </div>

        {/* Clean, Inviting Headline */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight tracking-tight">
            မိသားစုအတွက် <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">လက်ရာမွန် ဟင်းလျာများကို</span> ကိုယ်တိုင်ချက်ပြုတ်လိုက်ပါ
          </h1>
          <p className="text-xs sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed pt-1">
            စားမည့်လူဦးရေအလိုက် ဆား၊ အချိုမှုန့်နှင့် ဟင်းခတ်အမွှေးအကြိုင်များကို အတိအကျ တွက်ချက်ပေးသဖြင့် မည်သူမဆို အရသာမပျက် လွယ်ကူစွာ လိုက်ချက်နိုင်ပါသည်။
          </p>
        </div>

        {/* Unified Clean Search Box */}
        <div className="max-w-xl mx-auto pt-1">
          <div className="relative shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ဟင်းအမည် သို့မဟုတ် ပါဝင်ပစ္စည်း (ဥပမာ - ကြက်သား၊ ဆား၊ ခေါက်ဆွဲ)..."
              className="w-full pl-12 pr-14 py-3.5 sm:py-4 rounded-2xl border border-stone-200/90 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-2xs sm:text-xs font-bold text-stone-400 hover:text-stone-700 px-2 py-1 rounded-md bg-stone-100 hover:bg-stone-200 cursor-pointer"
              >
                ဖျက်မည်
              </button>
            )}
          </div>
        </div>

        {/* Category Pills & Favorites Toggle */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
          {categories.map((cat, idx) => {
            const isSelected = !isFavoritesActive && selectedCategory === cat;
            return (
              <button
                key={idx}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80 shadow-2xs'
                }`}
              >
                {cat}
              </button>
            );
          })}

          {/* Quick Favorites button in category row */}
          <button
            onClick={onToggleFavorites}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isFavoritesActive
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white hover:bg-rose-50 text-rose-700 border border-rose-200/70 shadow-2xs'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavoritesActive || favoritesCount > 0 ? 'fill-current' : ''}`} />
            <span>အကြိုက်ဆုံး ({favoritesCount})</span>
          </button>
        </div>

      </div>
    </section>
  );
}
