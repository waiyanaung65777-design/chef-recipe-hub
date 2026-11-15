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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-4 sm:p-7 shadow-2xl border border-stone-200 space-y-4 sm:space-y-5 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-stone-900">
                စျေးဝယ်စာရင်း (Shopping List)
              </h3>
              <p className="text-3xs sm:text-xs text-stone-500 line-clamp-1">
                {recipe.title} ({servings} ယောက်စာ)
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

        {/* Copy for Viber Button Bar */}
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 bg-orange-50/80 p-3 rounded-2xl border border-orange-200/80">
          <span className="text-3xs sm:text-xs font-semibold text-orange-950">
            ဝယ်ရန် ပစ္စည်းများကို အမှန်ခြစ်ပါ
          </span>
          <button
            onClick={handleCopyText}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-2xs sm:text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-xs transition-colors cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copy ယူပြီးပြီ</span>
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
        <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-0.5">
          {recipe.ingredients.map((ing, idx) => {
            const isDone = !!checkedItems[idx];
            const amt = formatAmount(ing.baseAmount * multiplier);

            return (
              <div
                key={idx}
                onClick={() => toggleItem(idx)}
                className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all select-none ${
                  isDone 
                    ? 'bg-stone-100/70 border-stone-200 text-stone-400 line-through' 
                    : 'bg-white hover:bg-stone-50 border-stone-200/80 text-stone-900 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                  <span className="text-xs sm:text-sm font-semibold truncate">
                    {ing.name}
                  </span>
                </div>

                <span className="text-2xs sm:text-xs font-bold text-orange-700 px-2 py-0.5 rounded-md bg-orange-50 shrink-0 whitespace-nowrap">
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
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            ပိတ်မည်
          </button>
        </div>

      </div>
    </div>
  );
}
