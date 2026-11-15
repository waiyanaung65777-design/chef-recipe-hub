import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Sparkles, Utensils } from 'lucide-react';
import { categories } from '../data/recipes';

export default function AddRecipeModal({ isOpen, onClose, onSaveRecipe, recipeToEdit }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [chef, setChef] = useState('Burmese Food Recipes');
  const [category, setCategory] = useState(categories[1] || 'အဓိက ဟင်းလျာများ');
  const [difficulty, setDifficulty] = useState('အသင့်အတင့်');
  const [prepTime, setPrepTime] = useState('၁၅ မိနစ်');
  const [cookTime, setCookTime] = useState('၂၅ မိနစ်');
  const [baseServings, setBaseServings] = useState(4);
  const [calories, setCalories] = useState('420 kcal');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80');
  const [description, setDescription] = useState('');
  const [chefTip, setChefTip] = useState('');

  const [ingredients, setIngredients] = useState([
    { name: 'ဆား (Salt)', baseAmount: 1, unit: 'လက်ဖက်ရည်ဇွန်း' },
    { name: 'ကြက်သားမှုန့် သို့မဟုတ် အချိုမှုန့်', baseAmount: 1, unit: 'လက်ဖက်ရည်ဇွန်း' },
    { name: 'ဆီ (Oil)', baseAmount: 3, unit: 'ထမင်းစားဇွန်း' }
  ]);

  const [steps, setSteps] = useState([
    { step: 1, title: 'ပါဝင်ပစ္စည်းများ ပြင်ဆင်ခြင်း', desc: 'ပါဝင်ပစ္စည်းများကို သန့်စင်ပြီး အရသာနယ်ထားပါ။', timerSeconds: 300, tip: 'အသားထဲ အရသာစိမ့်ဝင်အောင် ၁၀ မိနစ်ခန့် နှပ်ထားပါ။' },
    { step: 2, title: 'ဆီသတ်ချက်ပြုတ်ခြင်း', desc: 'ဆီပူလာပါက မွှေးလာသည်အထိ ဆီသတ်ပြီး ကျက်သည်အထိ တည်ပါ။', timerSeconds: 600, tip: 'မီးအလွန်မပြင်းစေရန် သတိပြုပါ။' }
  ]);

  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title || '');
      setTitleEn(recipeToEdit.titleEn || '');
      setChef(recipeToEdit.chef || 'Burmese Food Recipes');
      setCategory(recipeToEdit.category || categories[1]);
      setDifficulty(recipeToEdit.difficulty || 'အသင့်အတင့်');
      setPrepTime(recipeToEdit.prepTime || '၁၅ မိနစ်');
      setCookTime(recipeToEdit.cookTime || '၂၅ မိနစ်');
      setBaseServings(recipeToEdit.baseServings || 4);
      setCalories(recipeToEdit.calories || '420 kcal');
      setImage(recipeToEdit.image || '');
      setDescription(recipeToEdit.description || '');
      setChefTip(recipeToEdit.chefTip || '');
      if (recipeToEdit.ingredients && recipeToEdit.ingredients.length > 0) {
        setIngredients(recipeToEdit.ingredients);
      }
      if (recipeToEdit.steps && recipeToEdit.steps.length > 0) {
        setSteps(recipeToEdit.steps);
      }
    }
  }, [recipeToEdit]);

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

    const recipeData = {
      ...(recipeToEdit || {}),
      id: recipeToEdit ? recipeToEdit.id : 'recipe-' + Date.now(),
      title: title.trim(),
      titleEn: titleEn.trim() || title.trim(),
      chef: chef.trim() || 'Burmese Food Recipes',
      chefTitle: 'Traditional Culinary Expert',
      category: category.startsWith('အားလုံး') ? 'အဓိက ဟင်းလျာများ' : category,
      difficulty,
      prepTime,
      cookTime,
      baseServings: parseInt(baseServings, 10) || 4,
      calories,
      rating: recipeToEdit?.rating || 5.0,
      reviewsCount: recipeToEdit?.reviewsCount || 0,
      image,
      description,
      chefTip,
      ingredients: ingredients.filter(ing => ing.name.trim() !== ''),
      steps: steps.filter(s => s.title.trim() !== '' || s.desc.trim() !== '')
    };

    onSaveRecipe(recipeData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-8 shadow-2xl border border-stone-200 space-y-5 relative max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-xl text-stone-900">
                {recipeToEdit ? 'ဟင်းချက်နည်း ပြင်ဆင်ခြင်း' : 'ဟင်းချက်နည်း အသစ်တင်မည်'}
              </h3>
              <p className="text-3xs sm:text-xs text-stone-500">
                Admin Panel: အချိုးအစားနှင့် အဆင့်များကို ထည့်ပါ
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-2xs sm:text-xs font-bold text-stone-700 mb-1">
                ဟင်းအမည် (မြန်မာလို) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="ဥပမာ - ကြက်သားဆီပြန်"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-2xs sm:text-xs font-bold text-stone-700 mb-1">
                English အမည်
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={e => setTitleEn(e.target.value)}
                placeholder="e.g. Burmese Chicken Curry"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <div>
              <label className="block text-3xs sm:text-2xs font-bold text-stone-700 mb-1">အမျိုးအစား</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs bg-white"
              >
                {categories.filter(c => !c.startsWith('အားလုံး')).map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-3xs sm:text-2xs font-bold text-stone-700 mb-1">ခက်ခဲမှု</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs bg-white"
              >
                <option value="လွယ်ကူ">လွယ်ကူ</option>
                <option value="အသင့်အတင့်">အသင့်အတင့်</option>
                <option value="အဆင့်မြင့်">အဆင့်မြင့်</option>
              </select>
            </div>

            <div>
              <label className="block text-3xs sm:text-2xs font-bold text-stone-700 mb-1">ပြင်ဆင်ချိန်</label>
              <input
                type="text"
                value={prepTime}
                onChange={e => setPrepTime(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-3xs sm:text-2xs font-bold text-stone-700 mb-1">ချက်ပြုတ်ချိန်</label>
              <input
                type="text"
                value={cookTime}
                onChange={e => setCookTime(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-2xs sm:text-xs font-bold text-stone-700 mb-1">ဟင်းဓာတ်ပုံ Link (URL)</label>
            <input
              type="url"
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-2xs sm:text-xs font-bold text-stone-700 mb-1">ဟင်းအကြောင်း အကျဉ်းချုပ်</label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="ဒီဟင်းရဲ့ ထူးခြားချက်..."
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Chef Tip */}
          <div className="bg-amber-50 p-3 sm:p-4 rounded-2xl border border-amber-200">
            <label className="block text-2xs sm:text-xs font-bold text-amber-900 mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              စားဖိုမှူး၏ လျှို့ဝှက်ချက် (Chef's Secret Tip)
            </label>
            <input
              type="text"
              value={chefTip}
              onChange={e => setChefTip(e.target.value)}
              placeholder="ဥပမာ - မီးပြင်းပြင်းမသုံးဘဲ မီးအေးအေးဖြင့် ဆီသတ်ပါ..."
              className="w-full px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-xs"
            />
          </div>

          {/* INGREDIENTS BUILDER (Mobile Optimized layout) */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-black text-xs sm:text-sm text-stone-900">
                  ပါဝင်ပစ္စည်းများနှင့် အချိုးအစား (၄ ယောက်စာ)
                </h4>
                <p className="text-3xs sm:text-2xs text-stone-500">ဆား၊ ဟင်းခတ်မှုန့် ပမာဏများ ထည့်ပါ</p>
              </div>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-3xs sm:text-xs font-bold bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> ပစ္စည်းအသစ်
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 p-2 rounded-xl bg-stone-50 sm:bg-transparent border sm:border-0 border-stone-200">
                  <input
                    type="text"
                    placeholder="ပစ္စည်း (ဥပမာ - ဆား)"
                    value={ing.name}
                    onChange={e => handleIngredientChange(idx, 'name', e.target.value)}
                    className="w-full sm:w-auto sm:flex-2 px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                  />
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="ပမာဏ"
                      value={ing.baseAmount}
                      onChange={e => handleIngredientChange(idx, 'baseAmount', e.target.value)}
                      className="w-16 px-2 py-1.5 rounded-lg border border-stone-200 text-xs text-center bg-white"
                    />
                    <input
                      type="text"
                      placeholder="ယူနစ်"
                      value={ing.unit}
                      onChange={e => handleIngredientChange(idx, 'unit', e.target.value)}
                      className="flex-1 sm:w-28 px-2 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEPS BUILDER */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-black text-xs sm:text-sm text-stone-900">
                  အဆင့်ဆင့် ချက်ပြုတ်နည်းများ
                </h4>
                <p className="text-3xs sm:text-2xs text-stone-500">အချိန်မှတ်စနစ် (စက္ကန့်) ထည့်နိုင်ပါသည်</p>
              </div>
              <button
                type="button"
                onClick={handleAddStep}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-3xs sm:text-xs font-bold bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> အဆင့်အသစ်
              </button>
            </div>

            <div className="space-y-2.5">
              {steps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-2xs text-orange-600">အဆင့် {step.step}</span>
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
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-bold"
                  />
                  <textarea
                    rows={2}
                    placeholder="အသေးစိတ် ချက်ပြုတ်ပုံ ရှင်းပြချက်..."
                    value={step.desc}
                    onChange={e => handleStepChange(idx, 'desc', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="စက္ကန့် (e.g. 300)"
                      value={step.timerSeconds || ''}
                      onChange={e => handleStepChange(idx, 'timerSeconds', e.target.value)}
                      className="px-2.5 py-1 rounded-xl bg-white border border-stone-200 text-2xs"
                    />
                    <input
                      type="text"
                      placeholder="အကြံပြုချက်"
                      value={step.tip || ''}
                      onChange={e => handleStepChange(idx, 'tip', e.target.value)}
                      className="px-2.5 py-1 rounded-xl bg-white border border-stone-200 text-2xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 cursor-pointer"
            >
              မလုပ်တော့ပါ
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              {recipeToEdit ? 'သိမ်းမည် (Update)' : 'တင်မည်'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
