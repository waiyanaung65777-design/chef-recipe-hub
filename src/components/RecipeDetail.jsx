import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Users, Clock, Flame, Star, ChefHat, CheckSquare, Square, 
  Play, Pause, RotateCcw, Lightbulb, Printer, Share2, CheckCircle2, 
  Sparkles, Volume2, BookmarkCheck, Scale
} from 'lucide-react';

// Helper to format fraction nicely
function formatAmount(amount) {
  if (!amount) return 'အနည်းငယ်';
  
  // Round to 2 decimal places
  const rounded = Math.round(amount * 100) / 100;
  
  if (rounded === 0.25) return '၁/၄ (၀.၂၅)';
  if (rounded === 0.5) return '၁/၂ (၀.၅)';
  if (rounded === 0.75) return '၃/၄ (၀.၇၅)';
  if (rounded === 1.5) return '၁ ခွဲ (၁.၅)';
  if (rounded === 2.5) return '၂ ခွဲ (၂.၅)';
  if (Number.isInteger(rounded)) return rounded.toString();
  
  return rounded.toString();
}

export default function RecipeDetail({ recipe, onBack, onOpenGuide }) {
  // Servings state
  const [servings, setServings] = useState(recipe.baseServings || 4);
  
  // Checked ingredients state
  const [checkedIngredients, setCheckedIngredients] = useState({});

  // Active cooking timer states: { [stepIndex]: { remaining: number, isRunning: boolean } }
  const [timers, setTimers] = useState({});

  // Completed steps tracker
  const [completedSteps, setCompletedSteps] = useState({});

  // Multiplier factor based on servings
  const multiplier = servings / (recipe.baseServings || 4);

  // Initialize timers for steps that have timerSeconds
  useEffect(() => {
    const initialTimers = {};
    recipe.steps.forEach((step, idx) => {
      if (step.timerSeconds) {
        initialTimers[idx] = {
          total: step.timerSeconds,
          remaining: step.timerSeconds,
          isRunning: false
        };
      }
    });
    setTimers(initialTimers);
  }, [recipe]);

  // Interval hook for active timers
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
              // Timer finished!
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

  // Web Audio chime when timer completes
  const playTimerAlarm = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {
      // AudioContext not allowed or not supported
    }
  };

  const toggleIngredientCheck = (idx) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleStepComplete = (idx) => {
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleStartTimer = (idx) => {
    setTimers(prev => ({
      ...prev,
      [idx]: { ...prev[idx], isRunning: true }
    }));
  };

  const handlePauseTimer = (idx) => {
    setTimers(prev => ({
      ...prev,
      [idx]: { ...prev[idx], isRunning: false }
    }));
  };

  const handleResetTimer = (idx, totalSeconds) => {
    setTimers(prev => ({
      ...prev,
      [idx]: { total: totalSeconds, remaining: totalSeconds, isRunning: false }
    }));
  };

  const formatTimerDisplay = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Chef Kyaw Min ရဲ့ ${recipe.title} ချက်နည်း ကြည့်လိုက်ပါ!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('လင့်ခ်ကို ကော်ပီကူးယူပြီးပါပြီခင်ဗျာ!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:p-0 print:m-0">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4 print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ဟင်းချက်နည်းများ စာရင်းသို့ ပြန်သွားမည်</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 shadow-2xs transition-colors cursor-pointer"
            title="Share Recipe"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 shadow-2xs transition-colors cursor-pointer"
            title="Print Recipe"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print ထုတ်မည်</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white shadow-xl">
        <div className="relative h-72 sm:h-96 w-full">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-600 text-white">
                {recipe.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-stone-950 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                {recipe.rating} ({recipe.reviewsCount} ချက်ဖူးသူများ)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-xs">
                {recipe.difficulty}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {recipe.title}
            </h1>
            <p className="text-sm sm:text-base text-stone-300 font-medium">
              {recipe.titleEn}
            </p>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-300 pt-1">
              <ChefHat className="w-4 h-4" />
              <span>{recipe.chef} ({recipe.chefTitle}) ၏ မူပိုင်ချက်နည်း</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs text-center">
          <p className="text-xs text-stone-500 font-medium">ပြင်ဆင်ချိန်</p>
          <p className="text-base font-extrabold text-stone-900 mt-0.5">{recipe.prepTime}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs text-center">
          <p className="text-xs text-stone-500 font-medium">ချက်ပြုတ်ချိန်</p>
          <p className="text-base font-extrabold text-stone-900 mt-0.5">{recipe.cookTime}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs text-center">
          <p className="text-xs text-stone-500 font-medium">အာဟာရစွမ်းအင်</p>
          <p className="text-base font-extrabold text-stone-900 mt-0.5">{recipe.calories || '450 kcal'}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs text-center">
          <p className="text-xs text-stone-500 font-medium">ဟင်းချက်အဆင့်</p>
          <p className="text-base font-extrabold text-stone-900 mt-0.5">{recipe.steps.length} ဆင့်</p>
        </div>
      </div>

      {/* Chef's Secret Tip Card (Golden Callout) */}
      {recipe.chefTip && (
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 p-6 border-2 border-amber-300/80 shadow-xs relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
              <Lightbulb className="w-6 h-6 animate-bounce" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-amber-950">
                  စားဖိုမှူး၏ အထူးလျှို့ဝှက်ချက် (Chef's Golden Tip)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-200 text-amber-900">
                  မဖြစ်မနေသိထားရန်
                </span>
              </div>
              <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-medium">
                "{recipe.chefTip}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Left = Ingredients with Servings Calculator, Right = Steps with Timers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Servings & Ingredients (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6 sticky top-28">
            
            {/* Servings Multiplier Section */}
            <div className="bg-orange-50/70 rounded-2xl p-4 border border-orange-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  <span className="font-extrabold text-stone-900 text-sm">
                    စားမည့်လူဦးရေ ရွေးပါ
                  </span>
                </div>
                <button
                  onClick={onOpenGuide}
                  className="text-xs text-orange-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" /> ဇွန်း/ဂရမ် ချိန်တွယ်နည်း
                </button>
              </div>

              {/* Servings Presets */}
              <div className="flex items-center justify-between gap-1.5">
                {[1, 2, 4, 6, 8, 10].map(num => (
                  <button
                    key={num}
                    onClick={() => setServings(num)}
                    className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      servings === num
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/25 scale-105'
                        : 'bg-white text-stone-700 hover:bg-orange-100 border border-orange-200/60'
                    }`}
                  >
                    {num} ယောက်
                  </button>
                ))}
              </div>

              <p className="text-xs text-orange-950/80 font-medium text-center">
                👉 စားမည့်လူဦးရေ <strong className="text-orange-700 font-bold">{servings} ယောက်စာ</strong> အတွက် ဆား၊ ဟင်းခတ်မှုန့်နှင့် ပါဝင်ပစ္စည်းများကို အလိုအလျောက် ပြောင်းလဲတွက်ချက်ပေးထားပါသည်။
              </p>
            </div>

            {/* Ingredients Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-stone-700" />
                <h2 className="font-extrabold text-lg text-stone-900">
                  ပါဝင်ပစ္စည်းများနှင့် အတိုင်းအတာ
                </h2>
              </div>
              <span className="text-xs text-stone-500 font-semibold">
                {Object.values(checkedIngredients).filter(Boolean).length} / {recipe.ingredients.length} အဆင်သင့်
              </span>
            </div>

            {/* Ingredients List */}
            <div className="space-y-2.5">
              {recipe.ingredients.map((ing, idx) => {
                const calculatedAmount = ing.baseAmount * multiplier;
                const isChecked = !!checkedIngredients[idx];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredientCheck(idx)}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer select-none ${
                      isChecked 
                        ? 'bg-emerald-50/70 border-emerald-200 text-stone-400 line-through' 
                        : 'bg-stone-50/80 hover:bg-stone-100/80 border-stone-200/80 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-stone-400 shrink-0" />
                      )}
                      <span className={`text-sm font-semibold ${isChecked ? 'text-stone-400' : 'text-stone-900'}`}>
                        {ing.name}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`font-black text-sm px-2.5 py-1 rounded-lg ${
                        isChecked ? 'bg-emerald-100/50 text-emerald-700' : 'bg-orange-100 text-orange-900'
                      }`}>
                        {formatAmount(calculatedAmount)} {ing.unit}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Garnishes / Extra Touches */}
            {recipe.garnishes && recipe.garnishes.length > 0 && (
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  တွဲဖက်ရန် / အလှဆင်ရန်များ
                </h4>
                <ul className="space-y-1.5">
                  {recipe.garnishes.map((item, i) => (
                    <li key={i} className="text-xs sm:text-sm text-stone-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT COLUMN: Step-by-Step Cooking Guide (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h2 className="font-extrabold text-xl text-stone-900">
                  အဆင့်ဆင့် ချက်ပြုတ်နည်း လမ်းညွှန်
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  စားဖိုမှူး ညွှန်ကြားထားသည့်အတိုင်း အဆင့်ဆင့် လိုက်ပါချက်ပြုတ်နိုင်ပါသည်
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <BookmarkCheck className="w-4 h-4" />
                <span>{Object.values(completedSteps).filter(Boolean).length} / {recipe.steps.length} ပြီးစီး</span>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-6">
              {recipe.steps.map((step, idx) => {
                const isCompleted = !!completedSteps[idx];
                const timerState = timers[idx];

                return (
                  <div 
                    key={idx}
                    className={`relative rounded-2xl p-5 border transition-all ${
                      isCompleted 
                        ? 'bg-stone-50/50 border-stone-200 opacity-80' 
                        : 'bg-white border-stone-200/90 shadow-2xs hover:border-orange-300'
                    }`}
                  >
                    {/* Step Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl font-extrabold text-sm flex items-center justify-center shrink-0 ${
                          isCompleted 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-orange-600 text-white shadow-sm shadow-orange-500/20'
                        }`}>
                          {step.step}
                        </div>
                        <h3 className={`font-extrabold text-base sm:text-lg ${
                          isCompleted ? 'text-stone-500 line-through' : 'text-stone-900'
                        }`}>
                          {step.title}
                        </h3>
                      </div>

                      {/* Completed Toggle Button */}
                      <button
                        onClick={() => toggleStepComplete(idx)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                          isCompleted 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {isCompleted ? 'ပြီးပါပြီ ✓' : 'ပြီးစီးကြောင်း မှတ်မည်'}
                      </button>
                    </div>

                    {/* Step Description */}
                    <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal pl-11">
                      {step.desc}
                    </p>

                    {/* Step Secret Hint */}
                    {step.tip && (
                      <div className="mt-3 ml-11 p-3 rounded-xl bg-amber-50/90 border border-amber-200/60 flex items-start gap-2 text-xs sm:text-sm text-amber-950 font-medium">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>အကြံပြုချက် -</strong> {step.tip}</span>
                      </div>
                    )}

                    {/* Interactive Step Timer (If step requires timing) */}
                    {timerState && (
                      <div className="mt-4 ml-11 p-3.5 rounded-xl bg-stone-900 text-white flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Clock className={`w-4 h-4 ${timerState.isRunning ? 'text-orange-400 animate-spin' : 'text-stone-400'}`} />
                          <span className="text-xs text-stone-300 font-medium">ချက်ပြုတ်ချိန် အချိန်မှတ်စနစ်:</span>
                          <span className="font-mono font-black text-lg text-amber-400 tracking-wider">
                            {formatTimerDisplay(timerState.remaining)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {timerState.isRunning ? (
                            <button
                              onClick={() => handlePauseTimer(idx)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 transition-colors cursor-pointer"
                            >
                              <Pause className="w-3.5 h-3.5" /> ခေတ္တရပ်မည်
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStartTimer(idx)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-sm transition-colors cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5" /> စတင်မှတ်မည်
                            </button>
                          )}

                          <button
                            onClick={() => handleResetTimer(idx, timerState.total)}
                            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
                            title="Reset Timer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Bottom Final Celebratory Box */}
            <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6 border border-emerald-200 text-center space-y-2">
              <span className="text-3xl">🍲✨</span>
              <h4 className="font-extrabold text-base text-stone-900">
                ဟင်းချက်နည်း ပြီးမြောက်ပါပြီ!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                စားဖိုမှူး၏ လမ်းညွှန်ချက်အတိုင်း ပြည့်စုံစွာ ချက်ပြုတ်ပြီးပါက မိသားစု သို့မဟုတ် မိတ်ဆွေများနှင့်အတူ အရသာရှိစွာ သုံးဆောင်နိုင်ပါပြီခင်ဗျာ။
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
