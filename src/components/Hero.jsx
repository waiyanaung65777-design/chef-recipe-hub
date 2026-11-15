import React from 'react';
import { Flame, Award, Heart, UtensilsCrossed, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-900 text-xs sm:text-sm font-bold border border-orange-200">
              <Flame className="w-4 h-4 text-orange-600 animate-pulse" />
              <span>မြန်မာ့အစားအစာ ချက်ပြုတ်နည်းများ (Burmese Food Recipes)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 leading-tight tracking-tight">
              မည်သူမဆို အိမ်မှာ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600">စားသောက်ဆိုင်ကြီးများကဲ့သို့</span> တိကျစွာ လိုက်ချက်နိုင်ပါပြီ!
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              "ဆား ဘယ်လောက်ထည့်ရမလဲ? ဟင်းခတ်မှုန့် ဘယ်နှစ်ဇွန်းလဲ?" စားမည့်လူဦးရေ (၁) ယောက်မှသည် (၁၀) ယောက်အထိ စားမည့်သူအရေအတွက်အလိုက် ပါဝင်ပစ္စည်း အချိုးအစားများကို အတိအကျ တွက်ချက်ပြသပေးထားပါသည်။
            </p>

            {/* Badges / Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white shadow-xs border border-stone-200">
                <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-2xs text-stone-500 font-semibold">အရသာစစ်စစ်</p>
                  <p className="text-xs sm:text-sm font-extrabold text-stone-900">မြန်မာ့ရိုးရာလက်ရာ</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white shadow-xs border border-stone-200">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-2xs text-stone-500 font-semibold">ပါဝင်ပစ္စည်းတိုင်း</p>
                  <p className="text-xs sm:text-sm font-extrabold text-stone-900">တိကျသော အချိုးအဆ</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white shadow-xs border border-stone-200">
                <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-2xs text-stone-500 font-semibold">အသိုက်အဝန်း</p>
                  <p className="text-xs sm:text-sm font-extrabold text-stone-900">Ratings & Reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl p-5 shadow-xl border border-stone-200/80 space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" 
                    alt="Burmese Food"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-stone-900/85 backdrop-blur-md text-white p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-sm">Burmese Food Recipes</p>
                      <p className="text-2xs text-stone-300">Authentic & Modern Culinary Guide</p>
                    </div>
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-3 border border-amber-200/60">
                  <p className="text-xs text-amber-950 font-medium italic text-center">
                    "ဟင်းကောင်းတစ်ခွက် ဖြစ်ဖို့ဆိုတာ စိတ်ရှည်မှုနဲ့ ပါဝင်ပစ္စည်း အချိုးအဆ မှန်ကန်မှုအပေါ်မှာ မူတည်ပါတယ်။"
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
