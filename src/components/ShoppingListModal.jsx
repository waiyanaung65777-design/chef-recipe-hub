import React, { useState } from 'react';
import { X, ShoppingBag, CheckSquare, Square, Copy, Check, Share2 } from 'lucide-react';

export default function ShoppingListModal({ isOpen, onClose, recipe, servings, multiplier }) {
  if (!isOpen || !recipe) return null;

  const [checkedItems, setCheckedItems] = useState({});
  const [copied, setCopied] = useState(false);

  const toggleItem = (idx) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const formatAmount = (amount) => {
    if (!amount) return '';
    const rounded = Math.round(amount * 100) / 100;
    return rounded;
  };

  const handleCopyText = () => {
    let text = `🛒 စျေးဝယ်စာရင်း - ${recipe.title} (${servings} ယောက်စာ)\n`;
    text += `----------------------------------------\n`;
    recipe.ingredients.forEach((ing, i) => {
      const isDone = checkedItems[i] ? '✅' : '▫️';
      const amt = formatAmount(ing.baseAmount * multiplier);
      text += `${isDone} ${ing.name}: ${amt} ${ing.unit}\n`;
    });
    text += `\nShared from Burmese Food Recipes`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 relative max-h-[88vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-stone-900">
                စျေးဝယ်စာရင်း (Shopping List)
              </h3>
              <p className="text-xs text-stone-500">
                {recipe.title} ({servings} ယောက်စာအတွက်)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action button */}
        <div className="flex items-center justify-between bg-orange-50/80 p-3.5 rounded-2xl border border-orange-200/80">
          <span className="text-xs font-semibold text-orange-950">
            စျေးဝယ်ရန် လိုအပ်သည့် ပစ္စည်းများကို အမှန်ခြစ်ပါ
          </span>
          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ကော်ပီယူပြီးပြီ</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Viber/Notes သို့ Copy ကူးမည်</span>
              </>
            )}
          </button>
        </div>

        {/* List */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {recipe.ingredients.map((ing, idx) => {
            const isDone = !!checkedItems[idx];
            const amt = formatAmount(ing.baseAmount * multiplier);

            return (
              <div
                key={idx}
                onClick={() => toggleItem(idx)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all select-none ${
                  isDone 
                    ? 'bg-stone-100/70 border-stone-200 text-stone-400 line-through' 
                    : 'bg-white hover:bg-stone-50 border-stone-200/80 text-stone-900 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                  <span className="text-xs sm:text-sm font-semibold">
                    {ing.name}
                  </span>
                </div>

                <span className="text-xs font-bold text-orange-700 px-2.5 py-0.5 rounded-md bg-orange-50">
                  {amt} {ing.unit}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-stone-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs sm:text-sm font-bold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            ပိတ်မည်
          </button>
        </div>

      </div>
    </div>
  );
}
