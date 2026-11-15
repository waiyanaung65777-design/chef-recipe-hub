import React from 'react';
import { Clock, Users, Star, ArrowRight, Heart, Utensils } from 'lucide-react';

export default function RecipeCard({ recipe, onSelect, isFavorite, onToggleFavorite }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(recipe.id);
  };

  return (
    <div 
      onClick={() => onSelect(recipe)}
      className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Image & Badges */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-stone-100">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent"></div>
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-2xs sm:text-xs font-black bg-white/95 text-stone-800 shadow-sm backdrop-blur-xs">
          {recipe.category}
        </span>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2.5 right-2.5 p-2 sm:p-2.5 rounded-full shadow-md backdrop-blur-xs transition-all cursor-pointer ${
            isFavorite 
              ? 'bg-rose-500 text-white scale-105' 
              : 'bg-white/90 hover:bg-white text-stone-600 hover:text-rose-500 hover:scale-105'
          }`}
          title={isFavorite ? 'Remove Favorite' : 'Save Favorite'}
          aria-label="Toggle favorite"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Bar Info on Image */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-2xs sm:text-xs font-semibold">
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg">
            <Clock className="w-3 h-3 text-amber-300" />
            {recipe.prepTime} + {recipe.cookTime}
          </span>
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg">
            <Users className="w-3 h-3 text-orange-300" />
            {recipe.baseServings} ယောက်စာ
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
        <div>
          <div className="flex items-center justify-between text-2xs sm:text-xs text-amber-700 font-semibold mb-1">
            <span className="inline-flex items-center gap-1 truncate max-w-[70%]">
              <Utensils className="w-3 h-3 text-orange-600 shrink-0" />
              <span className="truncate">{recipe.chef || 'Burmese Food Recipes'}</span>
            </span>

            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-900 font-bold shrink-0">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{recipe.rating || 5.0}</span>
            </span>
          </div>

          <h3 className="font-black text-base sm:text-lg text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1">
            {recipe.title}
          </h3>

          <p className="text-3xs sm:text-2xs text-stone-500 font-medium mb-1.5 line-clamp-1">
            {recipe.titleEn}
          </p>

          <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
          <span className="inline-block px-2 py-0.5 rounded-md text-3xs sm:text-2xs font-bold bg-stone-100 text-stone-700">
            {recipe.difficulty}
          </span>

          <div className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
            <span>ချက်နည်း ကြည့်မည်</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
