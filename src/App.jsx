import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeModal from './components/AddRecipeModal';
import MeasurementGuideModal from './components/MeasurementGuideModal';
import { initialRecipes, categories } from './data/recipes';
import { Search, Sparkles, Filter, ChefHat, Heart, Utensils, BookOpen, AlertCircle } from 'lucide-react';

export default function App() {
  // Recipes state (persisted in localStorage)
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('chef_recipes_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialRecipes;
      }
    }
    return initialRecipes;
  });

  // Selected Recipe for Detail View
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  // Save to localStorage whenever recipes change
  useEffect(() => {
    localStorage.setItem('chef_recipes_data', JSON.stringify(recipes));
  }, [recipes]);

  // Filter recipes based on category and search query (matches title, description, or ingredients!)
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesCategory = 
        selectedCategory.startsWith('အားလုံး') || 
        recipe.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesTitle = recipe.title.toLowerCase().includes(q) || recipe.titleEn?.toLowerCase().includes(q);
      const matchesDesc = recipe.description?.toLowerCase().includes(q);
      const matchesIngredient = recipe.ingredients.some(ing => ing.name.toLowerCase().includes(q));

      return matchesCategory && (matchesTitle || matchesDesc || matchesIngredient);
    });
  }, [recipes, selectedCategory, searchQuery]);

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNewRecipe = (newRecipe) => {
    setRecipes(prev => [newRecipe, ...prev]);
    setSelectedRecipe(newRecipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      
      {/* Navigation */}
      <Navbar 
        onOpenAddRecipe={() => setIsAddModalOpen(true)}
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onResetHome={handleBackToList}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedRecipe ? (
          // Recipe Detail View
          <RecipeDetail 
            recipe={selectedRecipe}
            onBack={handleBackToList}
            onOpenGuide={() => setIsGuideModalOpen(true)}
          />
        ) : (
          // Catalog & Home View
          <div className="space-y-12 pb-16">
            
            {/* Hero Section */}
            <Hero />

            {/* Catalog Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              
              {/* Search & Filter Header */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-orange-600" />
                      <span>ဟင်းချက်နည်းများ ရှာဖွေပါ</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      ဟင်းအမည်၊ သို့မဟုတ် "ဆား"၊ "ကြက်သား"၊ "ခေါက်ဆွဲ" စသည့် ပါဝင်ပစ္စည်းများဖြင့် ရှာဖွေနိုင်ပါသည်
                    </p>
                  </div>

                  {/* Search Input Box */}
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="ဟင်းအမည် သို့မဟုတ် ပါဝင်ပစ္စည်း ရိုက်ပါ..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700"
                      >
                        ဖျက်မည်
                      </button>
                    )}
                  </div>
                </div>

                {/* Categories Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipe Cards Grid */}
              {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredRecipes.map(recipe => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onSelect={handleSelectRecipe}
                    />
                  ))}
                </div>
              ) : (
                // Empty Search State
                <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-xs max-w-lg mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-extrabold text-lg text-stone-900">
                    ဟင်းချက်နည်း ရှာမတွေ့ပါခင်ဗျာ
                  </h3>
                  <p className="text-sm text-stone-500">
                    "{searchQuery}" နှင့် ကိုက်ညီသော ဟင်းချက်နည်း မရှိသေးပါ။ စာလုံးပေါင်း စစ်ဆေးပေးပါ သို့မဟုတ် အမျိုးအစား ပြောင်းလဲကြည့်ပါ။
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory(categories[0]); }}
                    className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm transition-colors cursor-pointer"
                  >
                    မူလအတိုင်း အားလုံး ပြန်ကြည့်မည်
                  </button>
                </div>
              )}

              {/* Kitchen Value Proposition Banner */}
              <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-8 sm:p-10 shadow-xl border border-stone-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <span className="text-2xl">⚖️</span>
                    <h4 className="font-extrabold text-base text-amber-300">
                      အချိုးအစား တိကျမှန်ကန်မှု
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      "ခန့်မှန်းခြေထည့်ပါ" မဟုတ်ဘဲ လူဦးရေအလိုက် ဆား၊ အချိုမှုန့်၊ ငါးငံပြာရည်ကို ဂရမ်/ဇွန်း အတိအကျ တွက်ချက်ပေးထားပါတယ်။
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-2xl">⏱️</span>
                    <h4 className="font-extrabold text-base text-orange-400">
                      မီးဖိုချောင်သုံး Timer ပါဝင်ခြင်း
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      ဖုန်းမှာ သီးသန့် timer ချိန်စရာမလိုဘဲ ဟင်းချက်အဆင့်တိုင်းမှာ တိုက်ရိုက် အချိန်မှတ်သားနိုင်ပါတယ်။
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-2xl">👨‍🍳</span>
                    <h4 className="font-extrabold text-base text-emerald-400">
                      စားဖိုမှူး၏ မူပိုင်လျှို့ဝှက်ချက်
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      အရသာအထူးကောင်းမွန်စေမယ့် လျှို့ဝှက်ချက်များကို ဟင်းချက်နည်းတိုင်းမှာ အခမဲ့ မျှဝေပေးထားပါတယ်။
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}
      </main>

      {/* Modals */}
      <AddRecipeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddRecipe={handleAddNewRecipe}
      />

      <MeasurementGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <ChefHat className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-sm text-stone-900">
              Chef Kyaw Min Kitchen © 2026
            </span>
          </div>
          <p className="text-xs text-stone-500 text-center sm:text-right">
            လူတိုင်း အိမ်မှာ စားသောက်ဆိုင်ကြီးများကဲ့သို့ အရသာရှိစွာ ဟင်းချက်နိုင်စေရန် ဖန်တီးထားပါသည်။
          </p>
        </div>
      </footer>

    </div>
  );
}
