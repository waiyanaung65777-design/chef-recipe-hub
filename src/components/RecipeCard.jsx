import React from 'react';
import { Clock, Users, Star, ChefHat, ArrowRight } from 'lucide-react';

export default function RecipeCard({ recipe, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(recipe)}
      className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image & Badges */}
      <div className="relative h-52 overflow-hidden bg-stone-100">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"></div>
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-stone-800 shadow-sm backdrop-blur-xs">
          {recipe.category}
        </span>

        {/* Rating Badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-current" />
          {recipe.rating}
        </span>

        {/* Quick Info Bar on Image Bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            {recipe.prepTime} + {recipe.cookTime}
          </span>
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
            <Users className="w-3.5 h-3.5 text-orange-300" />
            မူလ {recipe.baseServings} ယောက်စာ
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-700 font-medium mb-1">
            <ChefHat className="w-3.5 h-3.5" />
            <span>{recipe.chef} ၏ မူပိုင်လက်ရာ</span>
          </div>

          <h3 className="font-extrabold text-lg text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1">
            {recipe.title}
          </h3>

          <p className="text-xs text-stone-500 font-medium mb-2">
            {recipe.titleEn}
          </p>

          <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-100 text-stone-700">
            {recipe.difficulty}
          </span>

          <div className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
            <span>ဟင်းချက်နည်း ကြည့်မည်</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
