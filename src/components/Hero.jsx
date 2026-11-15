import React from 'react';
import { Flame, Award, Heart, UtensilsCrossed, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent pt-4 pb-8 sm:pt-12 sm:pb-16 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-2xs sm:text-sm font-bold border border-orange-200">
              <Flame className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
              <span>မြန်မာ့အစားအစာ ချက်ပြုတ်နည်းများ (Burmese Food Recipes)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-snug tracking-tight">
              မည်သူမဆို အိမ်မှာ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600">စားသောက်ဆိုင်ကြီးများကဲ့သို့</span> တိကျစွာ လိုက်ချက်နိုင်ပါပြီ!
            </h1>

            <p className="text-xs sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              "ဆား ဘယ်လောက်ထည့်ရမလဲ? ဟင်းခတ်မှုန့် ဘယ်နှစ်ဇွန်းလဲ?" စားမည့်လူဦးရေ (၁) ယောက်မှ (၁၀) ယောက်အထိ စားမည့်သူအရေအတွက်အလိုက် ပါဝင်ပစ္စည်း အချိုးအစားများကို အလိုအလျောက် အတိအကျ တွက်ချက်ပြသပေးထားပါသည်။
            </p>

            {/* Badges / Stats - Responsive Grid on Mobile */}
            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-start pt-1">
              <div className="p-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white shadow-2xs border border-stone-200 text-center sm:text-left flex flex-col sm:flex-row items-center sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-1 sm:mb-0">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-3xs sm:text-2xs text-stone-500 font-semibold">အရသာစစ်စစ်</p>
                  <p className="text-2xs sm:text-xs font-black text-stone-900">မြန်မာ့ရိုးရာ</p>
                </div>
              </div>

              <div className="p-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white shadow-2xs border border-stone-200 text-center sm:text-left flex flex-col sm:flex-row items-center sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-1 sm:mb-0">
                  <UtensilsCrossed className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-3xs sm:text-2xs text-stone-500 font-semibold">ပါဝင်ပစ္စည်း</p>
                  <p className="text-2xs sm:text-xs font-black text-stone-900">တိကျသော အချိုး</p>
                </div>
              </div>

              <div className="p-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white shadow-2xs border border-stone-200 text-center sm:text-left flex flex-col sm:flex-row items-center sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-1 sm:mb-0">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-3xs sm:text-2xs text-stone-500 font-semibold">အသိုက်အဝန်း</p>
                  <p className="text-2xs sm:text-xs font-black text-stone-900">Ratings/Reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur-lg opacity-25"></div>
              <div className="relative bg-white rounded-3xl p-3.5 sm:p-5 shadow-xl border border-stone-200/80 space-y-3">
                <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" 
                    alt="Burmese Food"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-stone-900/85 backdrop-blur-md text-white p-2.5 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-black text-xs sm:text-sm">Burmese Food Recipes</p>
                      <p className="text-3xs sm:text-2xs text-stone-300">Authentic Culinary Guide</p>
                    </div>
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200/60">
                  <p className="text-2xs sm:text-xs text-amber-950 font-medium italic text-center leading-normal">
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
