import React from 'react';
import { ChefHat, Flame, Award, Heart, UtensilsCrossed } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs sm:text-sm font-semibold border border-orange-200">
              <Flame className="w-4 h-4 text-orange-600 animate-pulse" />
              <span>စားဖိုမှူးလက်ရာ အချိုးအစား တိကျစွာ သင်ကြားပေးမည့် Website</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 leading-tight tracking-tight">
              မည်သူမဆို အိမ်မှာ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">စားသောက်ဆိုင်ကြီးများကဲ့သို့</span> အရသာရှိစွာ လိုက်ချက်နိုင်ပါပြီ!
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              "ဆား ဘယ်လောက်ထည့်ရမလဲ? အချိုမှုန့်/ကြက်သားမှုန့် ဘယ်နှစ်ဇွန်းလဲ?" 
              လူဦးရေ (၁) ယောက်မှသည် (၁၀) ယောက်အထိ စားမည့်သူအရေအတွက်အလိုက် ပါဝင်ပစ္စည်း အချိုးအစားများကို စားဖိုမှူး ကျော်မင်း ကိုယ်တိုင် အတိအကျ တွက်ချက်ပြသပေးထားပါသည်။
            </p>

            {/* Badges / Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white shadow-xs border border-stone-200">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-stone-500 font-medium">အတွေ့အကြုံ</p>
                  <p className="text-sm font-bold text-stone-900">၁၅ နှစ်ကျော် လက်ရာ</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white shadow-xs border border-stone-200">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-stone-500 font-medium">ပါဝင်ပစ္စည်းတိုင်း</p>
                  <p className="text-sm font-bold text-stone-900">တိကျသော အတိုင်းအတာ</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white shadow-xs border border-stone-200">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-stone-500 font-medium">လျှို့ဝှက်ချက်များ</p>
                  <p className="text-sm font-bold text-stone-900">၁၀၀% အခမဲ့ မျှဝေခြင်း</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Chef Profile Feature Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative bg-white rounded-3xl p-5 shadow-xl border border-stone-200/80">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80" 
                    alt="Chef Kyaw Min"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-stone-900/80 backdrop-blur-md text-white p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm">Chef Kyaw Min</p>
                      <p className="text-xs text-stone-300">Executive Traditional & Modern Chef</p>
                    </div>
                    <ChefHat className="w-6 h-6 text-amber-400" />
                  </div>
                </div>

                <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200/50">
                  <p className="text-xs text-amber-950 font-medium italic">
                    "ဟင်းကောင်းတစ်ခွက် ဖြစ်ဖို့ဆိုတာ စိတ်ရှည်မှုနဲ့ ပါဝင်ပစ္စည်း အချိုးအဆ မှန်ကန်မှုအပေါ်မှာ မူတည်ပါတယ်။ အားလုံး မီးဖိုချောင်မှာ ပျော်ရွှင်ကြပါစေ။"
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
