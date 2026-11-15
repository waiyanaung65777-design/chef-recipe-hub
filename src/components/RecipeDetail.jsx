import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Users, Clock, Flame, Star, CheckSquare, Square, 
  Play, Pause, RotateCcw, Lightbulb, Printer, Share2, CheckCircle2, 
  Sparkles, Volume2, BookmarkCheck, Scale, Heart, ShoppingBag, 
  Edit3, Trash2, ShieldCheck, Utensils, Minus, Plus
} from 'lucide-react';
import ReviewsSection from './ReviewsSection';
import ShoppingListModal from './ShoppingListModal';

function formatAmount(amount) {
  if (!amount) return 'အနည်းငယ်';
  const rounded = Math.round(amount * 100) / 100;
  if (rounded === 0.25) return '၁/၄ (၀.၂၅)';
  if (rounded === 0.5) return '၁/၂ (၀.၅)';
  if (rounded === 0.75) return '၃/၄ (၀.၇၅)';
  if (rounded === 1.5) return '၁ ခွဲ (၁.၅)';
  if (rounded === 2.5) return '၂ ခွဲ (၂.၅)';
  if (Number.isInteger(rounded)) return rounded.toString();
  return rounded.toString();
}

export default function RecipeDetail({ 
  recipe, 
  onBack, 
  onOpenGuide,
  isFavorite,
  onToggleFavorite,
  adminUser,
  onEditRecipe,
  onDeleteRecipe,
  onUpdateRecipeRating
}) {
  const [servings, setServings] = useState(recipe.baseServings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [timers, setTimers] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});
  const [isShoppingOpen, setIsShoppingOpen] = useState(false);

  const multiplier = servings / (recipe.baseServings || 4);

  useEffect(() => {
    const initialTimers = {};
    if (recipe.steps) {
      recipe.steps.forEach((step, idx) => {
        if (step.timerSeconds) {
          initialTimers[idx] = {
            total: step.timerSeconds,
            remaining: step.timerSeconds,
            isRunning: false
          };
        }
      });
    }
    setTimers(initialTimers);
  }, [recipe]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        let updated = false;
        const next = { ...prev };

        Object.keys(next).forEach(key => {
          if (next[key].isRunning) {
            if (next[key].remaining > 0) {
              next[key] = { ...next[key], remaining: next[key].remaining - 1 };
              updated = true;
            } else {
              next[key] = { ...next[key], isRunning: false };
              updated = true;
              playTimerAlarm();
            }
          }
        });

        return updated ? next : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const playTimerAlarm = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {}
  };

  const toggleIngredientCheck = (idx) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStepComplete = (idx) => {
    setCompletedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleStartTimer = (idx) => {
    setTimers(prev => ({ ...prev, [idx]: { ...prev[idx], isRunning: true } }));
  };

  const handlePauseTimer = (idx) => {
    setTimers(prev => ({ ...prev, [idx]: { ...prev[idx], isRunning: false } }));
  };

  const handleResetTimer = (idx, totalSeconds) => {
    setTimers(prev => ({ ...prev, [idx]: { total: totalSeconds, remaining: totalSeconds, isRunning: false } }));
  };

  const formatTimerDisplay = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePrint = () => window.print();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Burmese Food Recipes - ${recipe.title} ချက်နည်း ကြည့်လိုက်ပါ!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('ဟင်းချက်နည်း Link ကို Copy ကူးယူပြီးပါပြီခင်ဗျာ!');
    }
  };

  const handleDelete = () => {
    if (window.confirm(`"${recipe.title}" ဟင်းချက်နည်းကို ဖျက်ရန် သေချာပါသလား?`)) {
      onDeleteRecipe(recipe.id);
    }
  };

  const changeServings = (delta) => {
    setServings(prev => Math.max(1, Math.min(20, prev + delta)));
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 print:p-0 print:m-0">
      
      {/* Top Bar Navigation & Actions (Mobile Optimized) */}
      <div className="flex items-center justify-between gap-2 print:hidden">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden xs:inline">ဟင်းချက်နည်းများ သို့ ပြန်သွားမည်</span>
          <span className="xs:hidden">ရှေ့သို့ပြန်</span>
        </button>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Favorite */}
          <button
            onClick={() => onToggleFavorite(recipe.id)}
            className={`inline-flex items-center gap-1 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFavorite 
                ? 'bg-rose-500 text-white shadow-xs' 
                : 'bg-white hover:bg-rose-50 text-stone-700 hover:text-rose-600 border border-stone-200'
            }`}
            title={isFavorite ? 'Remove Favorite' : 'Save Favorite'}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'သိမ်းပြီး' : 'သိမ်းမည်'}</span>
          </button>

          {/* Shopping list button */}
          <button
            onClick={() => setIsShoppingOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 shadow-2xs transition-colors cursor-pointer"
            title="Shopping List"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
            <span className="hidden md:inline">စျေးဝယ်စာရင်း</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 sm:p-2.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 shadow-2xs transition-colors cursor-pointer"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="p-2 sm:p-2.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 shadow-2xs transition-colors cursor-pointer hidden sm:block"
            title="Print"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* ADMIN ONLY CONTROLS */}
          {adminUser && (
            <div className="flex items-center gap-1 pl-1 border-l border-stone-200">
              <button
                onClick={() => onEditRecipe(recipe)}
                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors cursor-pointer"
                title="Edit"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ပြင်မည်</span>
              </button>

              <button
                onClick={handleDelete}
                className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white shadow-xl">
        <div className="relative h-60 sm:h-80 md:h-96 w-full">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 space-y-2 sm:space-y-3">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-3xs sm:text-xs font-black bg-orange-600 text-white">
                {recipe.category}
              </span>
              <span className="px-2 py-0.5 rounded-full text-3xs sm:text-xs font-bold bg-amber-500 text-stone-950 flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {recipe.rating || 5.0}
              </span>
              <span className="px-2 py-0.5 rounded-full text-3xs sm:text-xs font-medium bg-black/50 backdrop-blur-xs">
                {recipe.difficulty}
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {recipe.title}
            </h1>
            <p className="text-2xs sm:text-sm text-stone-300 font-medium line-clamp-1">
              {recipe.titleEn}
            </p>

            <div className="flex items-center gap-1.5 text-3xs sm:text-xs text-amber-300 pt-0.5">
              <Utensils className="w-3.5 h-3.5" />
              <span>{recipe.chef || 'Burmese Food Recipes'} ၏ မူပိုင်ချက်နည်း</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Pills (Responsive 2x2 or 4x1) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-stone-200 shadow-2xs text-center">
          <p className="text-3xs sm:text-2xs text-stone-500 font-semibold">ပြင်ဆင်ချိန်</p>
          <p className="text-xs sm:text-base font-extrabold text-stone-900 mt-0.5">{recipe.prepTime}</p>
        </div>
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-stone-200 shadow-2xs text-center">
          <p className="text-3xs sm:text-2xs text-stone-500 font-semibold">ချက်ပြုတ်ချိန်</p>
          <p className="text-xs sm:text-base font-extrabold text-stone-900 mt-0.5">{recipe.cookTime}</p>
        </div>
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-stone-200 shadow-2xs text-center">
          <p className="text-3xs sm:text-2xs text-stone-500 font-semibold">အာဟာရစွမ်းအင်</p>
          <p className="text-xs sm:text-base font-extrabold text-stone-900 mt-0.5">{recipe.calories || '450 kcal'}</p>
        </div>
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-stone-200 shadow-2xs text-center">
          <p className="text-3xs sm:text-2xs text-stone-500 font-semibold">ဟင်းချက်အဆင့်</p>
          <p className="text-xs sm:text-base font-extrabold text-stone-900 mt-0.5">{recipe.steps?.length || 0} ဆင့်</p>
        </div>
      </div>

      {/* Chef's Secret Tip Card */}
      {recipe.chefTip && (
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 p-4 sm:p-6 border-2 border-amber-300/80 shadow-xs relative overflow-hidden">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-black text-sm sm:text-base text-amber-950">
                  စားဖိုမှူး၏ အထူးလျှို့ဝှက်ချက်
                </h3>
                <span className="px-1.5 py-0.2 rounded-full text-3xs font-extrabold bg-amber-200 text-amber-900">
                  Golden Tip
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                "{recipe.chefTip}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Left = Servings & Ingredients, Right = Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* LEFT COLUMN: Servings & Ingredients (Not sticky on mobile, sticky on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200 shadow-xs space-y-5 lg:sticky lg:top-24">
            
            {/* Servings Multiplier Section (Mobile Stepper + Chips) */}
            <div className="bg-orange-50/80 rounded-2xl p-4 border border-orange-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span className="font-black text-stone-900 text-xs sm:text-sm">
                    စားမည့်လူဦးရေ ရွေးပါ
                  </span>
                </div>
                <button
                  onClick={onOpenGuide}
                  className="text-3xs sm:text-xs text-orange-700 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <Scale className="w-3 h-3" /> ချိန်တွယ်နည်း
                </button>
              </div>

              {/* Stepper Control: (-) [ X ယောက်စာ ] (+) */}
              <div className="flex items-center justify-between bg-white rounded-xl p-1.5 border border-orange-200">
                <button
                  onClick={() => changeServings(-1)}
                  disabled={servings <= 1}
                  className="w-10 h-10 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-800 font-black flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer"
                  aria-label="Decrease servings"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="text-center px-4">
                  <span className="font-black text-xl text-stone-900">{servings}</span>
                  <span className="text-xs font-bold text-stone-500 ml-1">ယောက်စာ</span>
                </div>

                <button
                  onClick={() => changeServings(1)}
                  disabled={servings >= 20}
                  className="w-10 h-10 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-black flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                  aria-label="Increase servings"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Preset Chips */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 4, 6, 8].map(num => (
                  <button
                    key={num}
                    onClick={() => setServings(num)}
                    className={`flex-1 py-1.5 rounded-lg text-2xs font-extrabold transition-all cursor-pointer ${
                      servings === num
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-white text-stone-600 hover:bg-orange-100 border border-orange-200/60'
                    }`}
                  >
                    {num} ယောက်
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-3xs sm:text-2xs text-orange-950 font-medium">
                  👉 <strong className="text-orange-700">{servings} ယောက်စာ</strong> အချိုးကျ ပြောင်းထားပါသည်
                </p>
                <button
                  onClick={() => setIsShoppingOpen(true)}
                  className="text-3xs sm:text-2xs font-black text-orange-700 underline flex items-center gap-0.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3 h-3" /> စျေးဝယ်စာရင်း
                </button>
              </div>
            </div>

            {/* Ingredients Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <div className="flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-stone-700" />
                <h2 className="font-black text-sm sm:text-base text-stone-900">
                  ပါဝင်ပစ္စည်းများနှင့် အတိုင်းအတာ
                </h2>
              </div>
              <span className="text-2xs text-stone-500 font-bold">
                {Object.values(checkedIngredients).filter(Boolean).length} / {recipe.ingredients?.length || 0} အဆင်သင့်
              </span>
            </div>

            {/* Ingredients List */}
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-0.5">
              {recipe.ingredients?.map((ing, idx) => {
                const calculatedAmount = ing.baseAmount * multiplier;
                const isChecked = !!checkedIngredients[idx];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredientCheck(idx)}
                    className={`p-2.5 sm:p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 cursor-pointer select-none ${
                      isChecked 
                        ? 'bg-emerald-50/70 border-emerald-200 text-stone-400 line-through' 
                        : 'bg-stone-50/80 hover:bg-stone-100/80 border-stone-200/80 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                      <span className={`text-xs sm:text-sm font-semibold truncate ${isChecked ? 'text-stone-400' : 'text-stone-900'}`}>
                        {ing.name}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`font-black text-2xs sm:text-xs px-2 py-0.5 rounded-lg whitespace-nowrap ${
                        isChecked ? 'bg-emerald-100/50 text-emerald-700' : 'bg-orange-100 text-orange-950'
                      }`}>
                        {formatAmount(calculatedAmount)} {ing.unit}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Step-by-Step Cooking Guide */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-4 sm:p-7 border border-stone-200 shadow-xs space-y-5">
            
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="font-black text-base sm:text-lg text-stone-900">
                  အဆင့်ဆင့် ချက်ပြုတ်နည်း လမ်းညွှန်
                </h2>
                <p className="text-3xs sm:text-xs text-stone-500 mt-0.5">
                  မီးဖိုချောင်တွင် အဆင်ပြေစွာ လိုက်ပါချက်ပြုတ်နိုင်ပါသည်
                </p>
              </div>

              <div className="flex items-center gap-1 text-2xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 shrink-0">
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>{Object.values(completedSteps).filter(Boolean).length} / {recipe.steps?.length || 0}</span>
              </div>
            </div>

            {/* Steps Timeline (Optimized padding on mobile) */}
            <div className="space-y-4 sm:space-y-6">
              {recipe.steps?.map((step, idx) => {
                const isCompleted = !!completedSteps[idx];
                const timerState = timers[idx];

                return (
                  <div 
                    key={idx}
                    className={`relative rounded-2xl p-4 sm:p-5 border transition-all space-y-2.5 ${
                      isCompleted 
                        ? 'bg-stone-50/50 border-stone-200 opacity-80' 
                        : 'bg-white border-stone-200/90 shadow-2xs hover:border-orange-300'
                    }`}
                  >
                    {/* Step Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg font-black text-xs flex items-center justify-center shrink-0 ${
                          isCompleted 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-orange-600 text-white shadow-xs'
                        }`}>
                          {step.step}
                        </div>
                        <h3 className={`font-black text-xs sm:text-base ${
                          isCompleted ? 'text-stone-500 line-through' : 'text-stone-900'
                        }`}>
                          {step.title}
                        </h3>
                      </div>

                      <button
                        onClick={() => toggleStepComplete(idx)}
                        className={`text-3xs sm:text-2xs font-bold px-2 py-0.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                          isCompleted 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {isCompleted ? 'ပြီးပါပြီ ✓' : 'ပြီးစီးကြောင်း မှတ်မည်'}
                      </button>
                    </div>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                      {step.desc}
                    </p>

                    {/* Tip Callout */}
                    {step.tip && (
                      <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50 border border-amber-200/60 flex items-start gap-1.5 text-2xs sm:text-xs text-amber-950 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>အကြံပြုချက် -</strong> {step.tip}</span>
                      </div>
                    )}

                    {/* Step Timer Bar (Single neat responsive bar) */}
                    {timerState && (
                      <div className="p-2.5 sm:p-3 rounded-xl bg-stone-900 text-white flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${timerState.isRunning ? 'text-orange-400 animate-spin' : 'text-stone-400'}`} />
                          <span className="text-3xs sm:text-2xs text-stone-300 font-medium hidden xs:inline">အချိန်မှတ်:</span>
                          <span className="font-mono font-black text-sm sm:text-base text-amber-400 tracking-wider">
                            {formatTimerDisplay(timerState.remaining)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {timerState.isRunning ? (
                            <button
                              onClick={() => handlePauseTimer(idx)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-2xs sm:text-xs font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 transition-colors cursor-pointer"
                            >
                              <Pause className="w-3 h-3" /> ရပ်မည်
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStartTimer(idx)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-2xs sm:text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-xs transition-colors cursor-pointer"
                            >
                              <Play className="w-3 h-3" /> စတင်မည်
                            </button>
                          )}

                          <button
                            onClick={() => handleResetTimer(idx, timerState.total)}
                            className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
                            title="Reset Timer"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>

      {/* REVIEWS & RATINGS SECTION */}
      <ReviewsSection 
        recipeId={recipe.id} 
        adminUser={adminUser}
        onReviewAdded={(newReview) => {
          if (onUpdateRecipeRating) onUpdateRecipeRating(recipe.id, newReview.rating);
        }}
      />

      {/* Shopping List Modal */}
      <ShoppingListModal
        isOpen={isShoppingOpen}
        onClose={() => setIsShoppingOpen(false)}
        recipe={recipe}
        servings={servings}
        multiplier={multiplier}
      />

    </div>
  );
}
