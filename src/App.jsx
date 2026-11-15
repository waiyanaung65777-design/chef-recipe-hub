import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeModal from './components/AddRecipeModal';
import MeasurementGuideModal from './components/MeasurementGuideModal';
import AdminLoginModal from './components/AdminLoginModal';
import { initialRecipes, categories } from './data/recipes';
import { getStoredAdmin, logoutAdmin } from './lib/supabase';
import { Search, Sparkles, Filter, BookOpen, AlertCircle, Heart, Utensils, ShieldCheck } from 'lucide-react';

const LOCAL_STORAGE_RECIPES_KEY = 'burmese_food_recipes_list';
const LOCAL_STORAGE_FAVORITES_KEY = 'burmese_food_favorites';

export default function App() {
  // Admin User State
  const [adminUser, setAdminUser] = useState(() => getStoredAdmin());

  // Recipes State
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_RECIPES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialRecipes;
      }
    }
    return initialRecipes;
  });

  // Favorites State (Array of recipe IDs)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Selected Recipe for Detail View
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isFavoritesActive, setIsFavoritesActive] = useState(false);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Sync recipes to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_RECIPES_KEY, JSON.stringify(recipes));
  }, [recipes]);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Handle Favorites toggle
  const handleToggleFavorite = (recipeId) => {
    setFavorites(prev => {
      const exists = prev.includes(recipeId);
      if (exists) {
        showToast('အကြိုက်ဆုံးစာရင်းမှ ဖယ်ရှားလိုက်ပါပြီ');
        return prev.filter(id => id !== recipeId);
      } else {
        showToast('အကြိုက်ဆုံးစာရင်းထဲသို့ သိမ်းဆည်းလိုက်ပါပြီ ❤️');
        return [...prev, recipeId];
      }
    });
  };

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Favorite filter
      if (isFavoritesActive && !favorites.includes(recipe.id)) {
        return false;
      }

      // Category filter
      const matchesCategory = 
        selectedCategory.startsWith('အားလုံး') || 
        recipe.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesTitle = recipe.title.toLowerCase().includes(q) || recipe.titleEn?.toLowerCase().includes(q);
      const matchesDesc = recipe.description?.toLowerCase().includes(q);
      const matchesIngredient = recipe.ingredients?.some(ing => ing.name.toLowerCase().includes(q));

      return matchesCategory && (matchesTitle || matchesDesc || matchesIngredient);
    });
  }, [recipes, selectedCategory, searchQuery, isFavoritesActive, favorites]);

  // Recipe selection
  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add or Edit Recipe (Admin)
  const handleSaveRecipe = (recipeData) => {
    setRecipes(prev => {
      const index = prev.findIndex(r => r.id === recipeData.id);
      if (index >= 0) {
        // Edit existing
        const copy = [...prev];
        copy[index] = recipeData;
        showToast('ဟင်းချက်နည်းကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ! ✓');
        return copy;
      } else {
        // Add new
        showToast('ဟင်းချက်နည်းအသစ်ကို အောင်မြင်စွာ တင်ပြီးပါပြီ! 🍲');
        return [recipeData, ...prev];
      }
    });

    if (selectedRecipe && selectedRecipe.id === recipeData.id) {
      setSelectedRecipe(recipeData);
    }
    setRecipeToEdit(null);
  };

  // Delete Recipe (Admin)
  const handleDeleteRecipe = (recipeId) => {
    setRecipes(prev => prev.filter(r => r.id !== recipeId));
    setSelectedRecipe(null);
    showToast('ဟင်းချက်နည်းကို ဖျက်လိုက်ပါပြီ');
  };

  // Update Rating when review is submitted
  const handleUpdateRecipeRating = (recipeId, newScore) => {
    setRecipes(prev => prev.map(r => {
      if (r.id === recipeId) {
        const count = (r.reviewsCount || 0) + 1;
        const currentTotal = (r.rating || 5) * (r.reviewsCount || 1);
        const updatedRating = ((currentTotal + newScore) / (count + 1)).toFixed(1);
        return {
          ...r,
          rating: parseFloat(updatedRating),
          reviewsCount: count
        };
      }
      return r;
    }));
  };

  // Admin Login & Logout
  const handleLoginSuccess = (user) => {
    setAdminUser(user);
    showToast('Admin အဖြစ် အောင်မြင်စွာ ဝင်ရောက်ပြီးပါပြီ 🛡️');
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setAdminUser(null);
    showToast('Admin အကောင့်မှ ထွက်ခွာပြီးပါပြီ');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-stone-700 text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar 
        adminUser={adminUser}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onLogoutAdmin={handleLogout}
        onOpenAddRecipe={() => {
          setRecipeToEdit(null);
          setIsAddModalOpen(true);
        }}
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onResetHome={handleBackToList}
        favoritesCount={favorites.length}
        isFavoritesActive={isFavoritesActive}
        onShowFavorites={() => {
          setIsFavoritesActive(!isFavoritesActive);
          if (selectedRecipe) setSelectedRecipe(null);
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {selectedRecipe ? (
          // Recipe Detail Page
          <RecipeDetail 
            recipe={selectedRecipe}
            onBack={handleBackToList}
            onOpenGuide={() => setIsGuideModalOpen(true)}
            isFavorite={favorites.includes(selectedRecipe.id)}
            onToggleFavorite={handleToggleFavorite}
            adminUser={adminUser}
            onEditRecipe={(recipe) => {
              setRecipeToEdit(recipe);
              setIsAddModalOpen(true);
            }}
            onDeleteRecipe={handleDeleteRecipe}
            onUpdateRecipeRating={handleUpdateRecipeRating}
          />
        ) : (
          // Catalog & Showcase Page
          <div className="space-y-12 pb-16">
            
            {/* Hero Section */}
            {!isFavoritesActive && <Hero />}

            {/* Catalog Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-6">
              
              {/* Search & Categories Bar */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-orange-600" />
                      <span>{isFavoritesActive ? 'သိမ်းဆည်းထားသော အကြိုက်ဆုံး ဟင်းချက်နည်းများ' : 'ဟင်းချက်နည်းများ ရှာဖွေပါ'}</span>
                    </h2>
                    <p className="text-2xs sm:text-xs text-stone-500 mt-1 font-medium">
                      ဟင်းအမည်၊ သို့မဟုတ် "ဆား"၊ "ကြက်သား"၊ "ခေါက်ဆွဲ" စသည့် ပါဝင်ပစ္စည်းများဖြင့် အလွယ်တကူ ရှာဖွေနိုင်ပါသည်
                    </p>
                  </div>

                  {/* Search Input Box */}
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="ဟင်းအမည် သို့မဟုတ် ပါဝင်ပစ္စည်း..."
                      className="w-full pl-10 pr-12 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-2xs font-bold text-stone-400 hover:text-stone-700 cursor-pointer"
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
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsFavoritesActive(false);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                        !isFavoritesActive && selectedCategory === cat
                          ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}

                  {/* Favorite tab button in category row */}
                  <button
                    onClick={() => setIsFavoritesActive(true)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isFavoritesActive
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                        : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>အကြိုက်ဆုံးများ ({favorites.length})</span>
                  </button>
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
                      isFavorite={favorites.includes(recipe.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                // Empty State
                <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-xs max-w-lg mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-stone-900">
                    {isFavoritesActive ? 'သိမ်းဆည်းထားသော ဟင်းချက်နည်း မရှိသေးပါ' : 'ဟင်းချက်နည်း ရှာမတွေ့ပါခင်ဗျာ'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500">
                    {isFavoritesActive 
                      ? 'ဟင်းကတ်များရှိ အသည်းပုံ (Heart) ခလုတ်လေးကို နှိပ်ပြီး မိမိကြိုက်နှစ်သက်သော ဟင်းချက်နည်းများကို သိမ်းဆည်းနိုင်ပါသည်။' 
                      : `"${searchQuery}" နှင့် ကိုက်ညီသော ဟင်းချက်နည်း မရှိသေးပါ။`}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(categories[0]);
                      setIsFavoritesActive(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    ဟင်းချက်နည်းများ အားလုံး ပြန်ကြည့်မည်
                  </button>
                </div>
              )}

            </div>

          </div>
        )}
      </main>

      {/* Modals */}
      <AddRecipeModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setRecipeToEdit(null);
        }}
        onSaveRecipe={handleSaveRecipe}
        recipeToEdit={recipeToEdit}
      />

      <MeasurementGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-sm text-stone-900">
              Burmese Food Recipes © 2026
            </span>
          </div>
          <p className="text-2xs sm:text-xs text-stone-500 text-center sm:text-right">
            မြန်မာ့ရိုးရာ အစားအစာများကို အချိုးအစား တိကျစွာ အိမ်တွင် လိုက်ပါချက်ပြုတ်နိုင်စေရန် ဖန်တီးထားပါသည်။
          </p>
        </div>
      </footer>

    </div>
  );
}
