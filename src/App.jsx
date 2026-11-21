import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminBar from './components/AdminBar';
import Hero from './components/Hero';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeModal from './components/AddRecipeModal';
import MeasurementGuideModal from './components/MeasurementGuideModal';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { initialRecipes, categories } from './data/recipes';
import { getStoredAdmin, logoutAdmin } from './lib/supabase';
import { Sparkles, UtensilsCrossed, AlertCircle, Heart, ArrowLeft } from 'lucide-react';

const LOCAL_STORAGE_RECIPES_KEY = 'burmese_food_recipes_list';
const LOCAL_STORAGE_FAVORITES_KEY = 'burmese_food_favorites';

// ─── Recipe Detail Wrapper (uses useParams) ───────────────────────────────────
function RecipeDetailWrapper({
  recipes, favorites, handleToggleFavorite,
  adminUser, handleSaveRecipe, handleDeleteRecipe,
  handleUpdateRecipeRating, setIsGuideModalOpen,
  setRecipeToEdit, setIsAddModalOpen,
}) {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find(r => r.id === recipeId);

  if (!recipe) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 flex items-center justify-center text-3xl">🍲</div>
        <h2 className="text-xl font-black text-stone-900">ဟင်းချက်နည်း ရှာမတွေ့ပါ</h2>
        <p className="text-sm text-stone-500">ဤဟင်းချက်နည်းသည် ရှိမနေတော့ပါ သို့မဟုတ် ဖယ်ရှားခံရပါပြီ။</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ပင်မစာမျက်နှာသို့ ပြန်သွားမည်</span>
        </button>
      </div>
    );
  }

  return (
    <RecipeDetail
      recipe={recipe}
      onBack={() => navigate('/')}
      onOpenGuide={() => setIsGuideModalOpen(true)}
      isFavorite={favorites.includes(recipe.id)}
      onToggleFavorite={handleToggleFavorite}
      adminUser={adminUser}
      onEditRecipe={(r) => { setRecipeToEdit(r); setIsAddModalOpen(true); }}
      onDeleteRecipe={(id) => { handleDeleteRecipe(id); navigate('/'); }}
      onUpdateRecipeRating={handleUpdateRecipeRating}
    />
  );
}

// ─── Main Public Site Layout ─────────────────────────────────────────────────
function MainSite({
  adminUser,
  recipes,
  favorites,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  isFavoritesActive,
  setIsFavoritesActive,
  filteredRecipes,
  handleToggleFavorite,
  handleSaveRecipe,
  handleDeleteRecipe,
  handleUpdateRecipeRating,
  handleLogout,
  toastMessage,
  isGuideModalOpen,
  setIsGuideModalOpen,
  isAddModalOpen,
  setIsAddModalOpen,
  recipeToEdit,
  setRecipeToEdit,
}) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">

      {/* Admin Mode Bar (only shown when logged in) */}
      <AdminBar
        adminUser={adminUser}
        onOpenAddRecipe={() => {
          setRecipeToEdit(null);
          setIsAddModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-stone-700 text-xs sm:text-sm font-bold flex items-center justify-center sm:justify-start gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Public Navbar (No Admin button visible) */}
      <Navbar
        onOpenGuide={() => setIsGuideModalOpen(true)}
        favoritesCount={favorites.length}
        isFavoritesActive={isFavoritesActive}
        onShowFavorites={() => setIsFavoritesActive(v => !v)}
      />

      <main className="flex-1">
        <Routes>
          {/* Home — Clean, uncluttered view */}
          <Route path="/" element={
            <div className="space-y-6 sm:space-y-8 pb-14">
              
              {/* Unified Hero with integrated Search & Categories */}
              <Hero
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setIsFavoritesActive(false);
                }}
                isFavoritesActive={isFavoritesActive}
                onToggleFavorites={() => setIsFavoritesActive(v => !v)}
                favoritesCount={favorites.length}
              />

              {/* Recipe Catalog Grid */}
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                
                {/* Clean Status & Results Label */}
                <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-orange-600" />
                    <h2 className="text-sm sm:text-base font-black text-stone-900">
                      {isFavoritesActive 
                        ? `အကြိုက်ဆုံး ဟင်းလျာများ (${filteredRecipes.length})` 
                        : searchQuery 
                        ? `"${searchQuery}" ရှာဖွေမှုရလဒ် (${filteredRecipes.length})` 
                        : `${selectedCategory} (${filteredRecipes.length})`}
                    </h2>
                  </div>

                  {(searchQuery || isFavoritesActive || !selectedCategory.startsWith('အားလုံး')) && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory(categories[0]);
                        setIsFavoritesActive(false);
                      }}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"
                    >
                      မူလအတိုင်း ပြန်ကြည့်မည်
                    </button>
                  )}
                </div>

                {/* Recipe Cards Grid */}
                {filteredRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
                    {filteredRecipes.map(recipe => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        isFavorite={favorites.includes(recipe.id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-stone-200/80 shadow-xs max-w-md mx-auto space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
                      <AlertCircle className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-black text-base text-stone-900">
                        {isFavoritesActive ? 'သိမ်းဆည်းထားသော ဟင်း မရှိသေးပါ' : 'ဟင်းချက်နည်း ရှာမတွေ့ပါ'}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        {isFavoritesActive
                          ? 'ဟင်းကတ်များရှိ အသည်းပုံ (Heart) ခလုတ်လေးကို နှိပ်ပြီး အကြိုက်ဆုံးစာရင်း သိမ်းထားနိုင်ပါသည်။'
                          : `"${searchQuery}" နှင့် ကိုက်ညီသော ဟင်းချက်နည်း မရှိသေးပါ။`}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory(categories[0]);
                        setIsFavoritesActive(false);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      ဟင်းအားလုံး ပြန်ကြည့်မည်
                    </button>
                  </div>
                )}

              </div>
            </div>
          } />

          {/* Recipe Detail Route */}
          <Route path="/recipe/:recipeId" element={
            <RecipeDetailWrapper
              recipes={recipes}
              favorites={favorites}
              handleToggleFavorite={handleToggleFavorite}
              adminUser={adminUser}
              handleSaveRecipe={handleSaveRecipe}
              handleDeleteRecipe={handleDeleteRecipe}
              handleUpdateRecipeRating={handleUpdateRecipeRating}
              setIsGuideModalOpen={setIsGuideModalOpen}
              setRecipeToEdit={setRecipeToEdit}
              setIsAddModalOpen={setIsAddModalOpen}
            />
          } />

          {/* 404 / Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-stone-200 py-6 sm:py-8 print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Burmese Food Recipes" className="h-9 w-auto object-contain rounded-lg border border-amber-200/80" />
            <div>
              <span className="font-black text-sm text-stone-900 block">
                Burmese Food Recipes © 2026
              </span>
              <span className="text-3xs text-stone-400">
                Traditional Burmese Cooking Made Simple
              </span>
            </div>
          </div>
          <p className="text-2xs text-stone-500 max-w-md">
            မြန်မာ့ရိုးရာ အစားအစာများကို အချိုးအစား တိကျစွာ အိမ်တိုင်းတွင် လိုက်ပါချက်ပြုတ်နိုင်စေရန် ဖန်တီးထားပါသည်။
          </p>
        </div>
      </footer>

      {/* Shared Modals */}
      <AddRecipeModal
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); setRecipeToEdit(null); }}
        onSaveRecipe={handleSaveRecipe}
        recipeToEdit={recipeToEdit}
      />
      <MeasurementGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────
export default function App() {
  const [adminUser, setAdminUser] = useState(() => getStoredAdmin());

  const [recipes, setRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_RECIPES_KEY);
      return saved ? JSON.parse(saved) : initialRecipes;
    } catch { return initialRecipes; }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isFavoritesActive, setIsFavoritesActive] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_RECIPES_KEY, JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (recipeId) => {
    setFavorites(prev => {
      const exists = prev.includes(recipeId);
      showToast(exists ? 'အကြိုက်ဆုံးစာရင်းမှ ဖယ်ရှားလိုက်ပါပြီ' : 'အကြိုက်ဆုံးစာရင်းထဲသို့ သိမ်းဆည်းလိုက်ပါပြီ ❤️');
      return exists ? prev.filter(id => id !== recipeId) : [...prev, recipeId];
    });
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      if (isFavoritesActive && !favorites.includes(recipe.id)) return false;
      const matchesCategory = selectedCategory.startsWith('အားလုံး') || recipe.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;
      const matchesTitle = recipe.title.toLowerCase().includes(q) || recipe.titleEn?.toLowerCase().includes(q);
      const matchesDesc = recipe.description?.toLowerCase().includes(q);
      const matchesIngredient = recipe.ingredients?.some(ing => ing.name.toLowerCase().includes(q));
      return matchesCategory && (matchesTitle || matchesDesc || matchesIngredient);
    });
  }, [recipes, selectedCategory, searchQuery, isFavoritesActive, favorites]);

  const handleSaveRecipe = (recipeData) => {
    setRecipes(prev => {
      const idx = prev.findIndex(r => r.id === recipeData.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = recipeData;
        showToast('ဟင်းချက်နည်းကို ပြင်ဆင်ပြီးပါပြီ! ✓');
        return copy;
      }
      showToast('ဟင်းချက်နည်းအသစ်ကို တင်ပြီးပါပြီ! 🍲');
      return [recipeData, ...prev];
    });
    setRecipeToEdit(null);
  };

  const handleDeleteRecipe = (recipeId) => {
    setRecipes(prev => prev.filter(r => r.id !== recipeId));
    showToast('ဟင်းချက်နည်းကို ဖျက်လိုက်ပါပြီ');
  };

  const handleUpdateRecipeRating = (recipeId, newScore) => {
    setRecipes(prev => prev.map(r => {
      if (r.id !== recipeId) return r;
      const count = (r.reviewsCount || 0) + 1;
      const currentTotal = (r.rating || 5) * (r.reviewsCount || 1);
      return { ...r, rating: parseFloat(((currentTotal + newScore) / (count + 1)).toFixed(1)), reviewsCount: count };
    }));
  };

  const handleLoginSuccess = (user) => {
    setAdminUser(user);
    showToast('Admin အဖြစ် ဝင်ရောက်ပြီးပါပြီ 🛡️');
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setAdminUser(null);
    showToast('Admin အကောင့်မှ ထွက်ခွာပြီးပါပြီ');
  };

  const sharedProps = {
    adminUser, recipes, favorites,
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    isFavoritesActive, setIsFavoritesActive,
    filteredRecipes,
    handleToggleFavorite, handleSaveRecipe,
    handleDeleteRecipe, handleUpdateRecipeRating,
    handleLogout, toastMessage,
    isGuideModalOpen, setIsGuideModalOpen,
    isAddModalOpen, setIsAddModalOpen,
    recipeToEdit, setRecipeToEdit,
  };

  return (
    <Routes>
      {/* Admin Login Route (Secret standalone page) */}
      <Route path="/admin/login" element={
        <AdminLoginPage adminUser={adminUser} onLoginSuccess={handleLoginSuccess} />
      } />

      {/* Admin Dashboard Route (Protected) */}
      <Route path="/admin" element={
        adminUser
          ? <AdminDashboardPage
              adminUser={adminUser}
              recipes={recipes}
              onLogout={handleLogout}
              onOpenAddModal={() => { setRecipeToEdit(null); setIsAddModalOpen(true); }}
              onEditRecipe={(r) => { setRecipeToEdit(r); setIsAddModalOpen(true); }}
              onDeleteRecipe={handleDeleteRecipe}
            />
          : <Navigate to="/admin/login" replace />
      } />

      {/* Public Pages */}
      <Route path="/*" element={<MainSite {...sharedProps} />} />
    </Routes>
  );
}
