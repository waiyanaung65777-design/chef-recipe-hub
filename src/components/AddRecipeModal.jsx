import React, { useState } from 'react';
import { X, Plus, Trash2, ChefHat, Sparkles, AlertCircle } from 'lucide-react';
import { categories } from '../data/recipes';

export default function AddRecipeModal({ isOpen, onClose, onAddRecipe }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState(categories[1] || 'အဓိက ဟင်းလျာများ');
  const [difficulty, setDifficulty] = useState('အသင့်အတင့်');
  const [prepTime, setPrepTime] = useState('၁၅ မိနစ်');
  const [cookTime, setCookTime] = useState('၂၅ မိနစ်');
  const [baseServings, setBaseServings] = useState(4);
  const [calories, setCalories] = useState('420 kcal');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80');
  const [description, setDescription] = useState('');
  const [chefTip, setChefTip] = useState('');

  // Ingredients state
  const [ingredients, setIngredients] = useState([
    { name: 'ဆား (Salt)', baseAmount: 1, unit: 'လက်ဖက်ရည်ဇွန်း' },
    { name: 'ကြက်သားမှုန့် သို့မဟုတ် အချိုမှုန့်', baseAmount: 1, unit: 'လက်ဖက်ရည်ဇွန်း' },
    { name: 'ဆီ (Oil)', baseAmount: 3, unit: 'ထမင်းစားဇွန်း' }
  ]);

  // Steps state
  const [steps, setSteps] = useState([
    { step: 1, title: 'ပါဝင်ပစ္စည်းများ ပြင်ဆင်ခြင်း', desc: 'ပါဝင်ပစ္စည်းများကို သန့်စင်ပြီး အရသာနယ်ထားပါ။', timerSeconds: 300, tip: 'အသားထဲ အရသာစိမ့်ဝင်အောင် ၁၀ မိနစ်ခန့် နှပ်ထားပါ။' },
    { step: 2, title: 'ဆီသတ်ချက်ပြုတ်ခြင်း', desc: 'ဆီပူလာပါက မွှေးလာသည်အထိ ဆီသတ်ပြီး ကျက်သည်အထိ တည်ပါ။', timerSeconds: 600, tip: 'မီးအလွန်မပြင်းစေရန် သတိပြုပါ။' }
  ]);

  const handleAddIngredient = () => {
    setIngredients(prev => [...prev, { name: '', baseAmount: 1, unit: 'ဇွန်း' }]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, field, value) => {
    setIngredients(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: field === 'baseAmount' ? parseFloat(value) || 0 : value };
      return copy;
    });
  };

  const handleAddStep = () => {
    setSteps(prev => [
      ...prev,
      { step: prev.length + 1, title: '', desc: '', timerSeconds: 300, tip: '' }
    ]);
  };

  const handleRemoveStep = (index) => {
    setSteps(prev => prev.filter((_, i) => i !== index).map((s, i) => ({ ...s, step: i + 1 })));
  };

  const handleStepChange = (index, field, value) => {
    setSteps(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: field === 'timerSeconds' ? parseInt(value, 10) || null : value };
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('ကျေးဇူးပြု၍ ဟင်းအမည် ထည့်သွင်းပေးပါခင်ဗျာ!');
      return;
    }

    const newRecipe = {
      id: 'custom-' + Date.now(),
      title,
      titleEn: titleEn || title,
      chef: 'Chef Kyaw Min',
      chefTitle: 'Executive Chef',
      category: category.startsWith('အားလုံး') ? 'အဓိက ဟင်းလျာများ' : category,
      difficulty,
      prepTime,
      cookTime,
      baseServings: parseInt(baseServings, 10) || 4,
      calories,
      rating: 5.0,
      reviewsCount: 1,
      image,
      description,
      chefTip,
      ingredients: ingredients.filter(ing => ing.name.trim() !== ''),
      steps: steps.filter(s => s.title.trim() !== '' || s.desc.trim() !== '')
    };

    onAddRecipe(newRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 relative max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-stone-900">
                ဟင်းချက်နည်းအသစ် ထည့်သွင်းခြင်း (Chef Portal)
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                ပါဝင်ပစ္စည်းများ၊ အတိုင်းအတာနှင့် ချက်ပြုတ်အဆင့်များကို ထည့်သွင်းပါ
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                ဟင်းအမည် (မြန်မာလို) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="ဥပမာ - ကြက်သားဆီပြန် မွှေးမွှေးလေး"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                English အမည်
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={e => setTitleEn(e.target.value)}
                placeholder="e.g. Classic Burmese Chicken Curry"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">အမျိုးအစား</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm bg-white"
              >
                {categories.filter(c => !c.startsWith('အားလုံး')).map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">ခက်ခဲမှုအဆင့်</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm bg-white"
              >
                <option value="လွယ်ကူ">လွယ်ကူ</option>
                <option value="အသင့်အတင့်">အသင့်အတင့်</option>
                <option value="အဆင့်မြင့်">အဆင့်မြင့်</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">ပြင်ဆင်ချိန်</label>
              <input
                type="text"
                value={prepTime}
                onChange={e => setPrepTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">ချက်ပြုတ်ချိန်</label>
              <input
                type="text"
                value={cookTime}
                onChange={e => setCookTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">ဟင်းဓာတ်ပုံ Link (URL)</label>
            <input
              type="url"
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">ဟင်းအကြောင်း အကျဉ်းချုပ်</label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="ဒီဟင်းရဲ့ ထူးခြားချက်နှင့် အရသာကို ဖော်ပြပါ..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Chef Tip */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
            <label className="block text-xs font-bold text-amber-900 mb-1 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              စားဖိုမှူး၏ အထူးလျှို့ဝှက်ချက် (Chef's Secret Tip)
            </label>
            <input
              type="text"
              value={chefTip}
              onChange={e => setChefTip(e.target.value)}
              placeholder="ဥပမာ - မီးပြင်းပြင်းမသုံးဘဲ မီးအေးအေးဖြင့် ဆီသတ်ပါက..."
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-200 text-sm"
            />
          </div>

          {/* INGREDIENTS LIST BUILDER */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-stone-900">
                  ပါဝင်ပစ္စည်းများနှင့် အတိုင်းအတာ (မူလ ၄ ယောက်စာအတွက်)
                </h4>
                <p className="text-xs text-stone-500">ဆား၊ ဟင်းခတ်မှုန့်၊ သကြား ပမာဏများကို အတိအကျ ထည့်သွင်းပေးပါ</p>
              </div>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> ပစ္စည်းအသစ်ထည့်မည်
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="ပစ္စည်းအမည် (ဥပမာ - ဆား)"
                    value={ing.name}
                    onChange={e => handleIngredientChange(idx, 'name', e.target.value)}
                    className="flex-2 px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm"
                  />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="ပမာဏ"
                    value={ing.baseAmount}
                    onChange={e => handleIngredientChange(idx, 'baseAmount', e.target.value)}
                    className="w-20 px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm text-center"
                  />
                  <input
                    type="text"
                    placeholder="ယူနစ် (လက်ဖက်ရည်ဇွန်း / ဂရမ်)"
                    value={ing.unit}
                    onChange={e => handleIngredientChange(idx, 'unit', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    className="p-2 text-stone-400 hover:text-red-500 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* STEPS BUILDER */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-stone-900">
                  အဆင့်ဆင့် ချက်ပြုတ်နည်းများ
                </h4>
                <p className="text-xs text-stone-500">အဆင့်တိုင်းအတွက် အချိန်မှတ်စနစ် (စက္ကန့်) သတ်မှတ်နိုင်ပါသည်</p>
              </div>
              <button
                type="button"
                onClick={handleAddStep}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> အဆင့်အသစ်ထည့်မည်
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-orange-600">အဆင့် {step.step}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      className="text-stone-400 hover:text-red-500 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="အဆင့် ခေါင်းစဉ် (ဥပမာ - ကြက်သား ဆီသတ်ခြင်း)"
                    value={step.title}
                    onChange={e => handleStepChange(idx, 'title', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm font-semibold"
                  />
                  <textarea
                    rows={2}
                    placeholder="အသေးစိတ် ချက်ပြုတ်ပုံ ရှင်းပြချက်..."
                    value={step.desc}
                    onChange={e => handleStepChange(idx, 'desc', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="အချိန်မှတ်စနစ် (စက္ကန့်) e.g. 300"
                      value={step.timerSeconds || ''}
                      onChange={e => handleStepChange(idx, 'timerSeconds', e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="ဤအဆင့်အတွက် အကြံပြုချက်"
                      value={step.tip || ''}
                      onChange={e => handleStepChange(idx, 'tip', e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-semibold text-sm hover:bg-stone-50 cursor-pointer"
            >
              မလုပ်တော့ပါ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              ဟင်းချက်နည်း တင်မည်
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
