import React from 'react';
import { X, Scale, Info, Check } from 'lucide-react';

export default function MeasurementGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const conversions = [
    { item: 'ဆား (Salt)', tsp: '၁ လက်ဖက်ရည်ဇွန်း', grams: '၅ မှ ၆ ဂရမ်', note: 'အငန်အရသာ အခြေခံ' },
    { item: 'ကြက်သားမှုန့် / အချိုမှုန့်', tsp: '၁ လက်ဖက်ရည်ဇွန်း', grams: '၄ မှ ၅ ဂရမ်', note: 'အချိုရည်နှင့် အနှစ်' },
    { item: 'သကြား (Sugar)', tsp: '၁ လက်ဖက်ရည်ဇွန်း', grams: '၄ ဂရမ်', note: '၁ ထမင်းစားဇွန်း = ၁၂ ဂရမ်' },
    { item: 'ငါးငံပြာရည် (Fish Sauce)', tsp: '၁ ထမင်းစားဇွန်း', grams: '၁၅ ml (၁၅ ဂရမ်)', note: 'ဟင်းအနံ့နှင့် အငန်' },
    { item: 'ဆီ (Cooking Oil)', tsp: '၁ ထမင်းစားဇွန်း', grams: '၁၄ ml', note: 'ဆီသတ်ရန်နှင့် အဆိမ့်' },
    { item: 'နနွင်းမှုန့် (Turmeric)', tsp: '၁/၂ လက်ဖက်ရည်ဇွန်း', grams: '၁.၅ ဂရမ်', note: 'အရောင်နှင့် ညှီနံ့ဖျောက်ရန်' },
    { item: 'ငရုတ်သီးအရောင်တင်မှုန့်', tsp: '၁ လက်ဖက်ရည်ဇွန်း', grams: '၃ မှ ၄ ဂရမ်', note: 'ဟင်းအရောင်လှပစေရန်' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-8 shadow-2xl border border-stone-200 space-y-4 sm:space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-xl text-stone-900">
                ဇွန်းနှင့် ဂရမ် ချိန်တွယ်နည်း လမ်းညွှန်
              </h3>
              <p className="text-3xs sm:text-xs text-stone-500">
                ဆားနှင့် ဟင်းခတ်မှုန့် အတိအကျ ထည့်နိုင်စေရန်
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Rule Box */}
        <div className="bg-amber-50 rounded-2xl p-3 sm:p-4 border border-amber-200/80 flex items-start gap-2.5 text-2xs sm:text-xs text-amber-950">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">အခြေခံ ဇွန်းသတ်မှတ်ချက်များ -</p>
            <p>• <strong>၁ ထမင်းစားဇွန်း (Tablespoon)</strong> = လက်ဖက်ရည်ဇွန်း (၃) ဇွန်း</p>
            <p>• <strong>၁ လက်ဖက်ရည်ဇွန်း (Teaspoon)</strong> = သာမန် ကော်ဖီဖျော်ဇွန်း (၅ ဂရမ်ခန့်)</p>
          </div>
        </div>

        {/* Table (Responsive horizontal scroll if needed) */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200">
          <table className="w-full text-left text-2xs sm:text-xs">
            <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
              <tr>
                <th className="p-2.5 sm:p-3">ပါဝင်ပစ္စည်း</th>
                <th className="p-2.5 sm:p-3">ဇွန်းအတိုင်းအတာ</th>
                <th className="p-2.5 sm:p-3">ဂရမ် / ml</th>
                <th className="p-2.5 sm:p-3 hidden sm:table-cell">မှတ်ချက်</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {conversions.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-50 transition-colors">
                  <td className="p-2.5 sm:p-3 font-bold text-stone-900">{row.item}</td>
                  <td className="p-2.5 sm:p-3 font-semibold text-orange-700 whitespace-nowrap">{row.tsp}</td>
                  <td className="p-2.5 sm:p-3 font-semibold text-stone-600 whitespace-nowrap">{row.grams}</td>
                  <td className="p-2.5 sm:p-3 text-stone-500 hidden sm:table-cell">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-1">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            နားလည်ပါပြီ
          </button>
        </div>

      </div>
    </div>
  );
}
