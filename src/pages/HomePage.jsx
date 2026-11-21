import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import RecipeCard from '../components/RecipeCard';
import { categories } from '../data/recipes';
import { BookOpen, Heart, AlertCircle, Utensils } from 'lucide-react';

export default function HomePage({
  recipes,
  favorites,
  onToggleFavorite,
  isFavoritesActive,
  onDisableFavorites,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) {
  // Filter recipes
  const filteredRecipes = recipes.filter(recipe => {
    if (isFavoritesActive && !favorites.includes(recipe.id)) {
      return false;
    }

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

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Section (Only on main catalog, hidden if in Favorites mode) */}
      {!isFavoritesActive && (
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />
      )}

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Title */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
          <div className="flex items-center gap-2">
            {isFavoritesActive ? (
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            ) : (
              <Utensils className="w-5 h-5 text-orange-600" />
            )}
            <h2 className="text-lg sm:text-xl font-black text-stone-900">
              {isFavoritesActive ? 'သိမ်းဆည်းထားသော ဟင်းချက်နည်းများ' : 'လူကြိုက်အများဆုံး ဟင်းချက်နည်းများ'}
            </h2>
            <span className="text-xs font-bold text-stone-500">
              ({filteredRecipes.length} မျိုး)
            </span>
          </div>

          {isFavoritesActive && (
            <button
              onClick={onDisableFavorites}
              className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
            >
              ဟင်းများအားလုံး ပြန်ကြည့်မည်
            </button>
          )}
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-stone-900">
              {isFavoritesActive ? 'သိမ်းဆည်းထားသော ဟင်းမရှိသေးပါ' : 'ဟင်းချက်နည်း ရှာမတွေ့ပါ'}
            </h3>
            <p className="text-xs text-stone-500">
              {isFavoritesActive
                ? 'ဟင်းကတ်များရှိ အသည်းပုံ (Heart) လေးကို နှိပ်ပြီး မိမိနှစ်သက်ရာများကို သိမ်းဆည်းနိုင်ပါသည်။'
                : `"${searchQuery}" နှင့် ကိုက်ညီသော ဟင်းချက်နည်း မရှိသေးပါ။`}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(categories[0]);
                onDisableFavorites();
              }}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              ဟင်းများ အားလုံး ပြန်ကြည့်မည်
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
