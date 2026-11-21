import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, Edit3, Trash2, ArrowLeft, LogOut, BookOpen, Clock, Users, Star, Eye } from 'lucide-react';

export default function AdminDashboardPage({ 
  adminUser, 
  recipes, 
  onLogout, 
  onOpenAddModal, 
  onEditRecipe, 
  onDeleteRecipe 
}) {
  const navigate = useNavigate();

  if (!adminUser) {
    navigate('/admin/login', { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-16">
      
      {/* Admin Top Navigation */}
      <header className="bg-stone-900 text-white sticky top-0 z-40 border-b border-stone-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors" title="Go to Website">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <img src="/logo.jpg" alt="Logo" className="h-8 w-auto rounded-md" />
              <span className="font-black text-sm text-amber-300">Admin Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-400 hidden sm:inline">
              Logged in as: <strong className="text-white">{adminUser.email}</strong>
            </span>
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 transition-colors shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ဟင်းအသစ်ထည့်မည်</span>
            </button>
            <button
              onClick={() => {
                onLogout();
                navigate('/');
              }}
              className="p-2 rounded-xl bg-stone-800 hover:bg-red-500 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">
              ဟင်းချက်နည်းများ စီမံခန့်ခွဲခြင်း ({recipes.length} ခု)
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              ဟင်းချက်နည်း အသစ်တင်ခြင်း၊ ပြင်ဆင်ခြင်းနှင့် ဖျက်ပစ်ခြင်းများကို ဤနေရာတွင် ပြုလုပ်နိုင်ပါသည်။
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-md transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>ဟင်းချက်နည်း အသစ်တင်မည်</span>
          </button>
        </div>

        {/* Recipes Table / Card Grid */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                <tr>
                  <th className="p-4">ဟင်းအမည်</th>
                  <th className="p-4 hidden sm:table-cell">အမျိုးအစား</th>
                  <th className="p-4 hidden md:table-cell">အချိန်</th>
                  <th className="p-4 hidden lg:table-cell">ပါဝင်ပစ္စည်း</th>
                  <th className="p-4 text-right">လုပ်ဆောင်ချက်</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recipes.map(recipe => (
                  <tr key={recipe.id} className="hover:bg-stone-50/80 transition-colors">
                    
                    {/* Dish Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title} 
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200" 
                        />
                        <div>
                          <p className="font-black text-sm text-stone-900">{recipe.title}</p>
                          <p className="text-3xs sm:text-2xs text-stone-500">{recipe.titleEn}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4 hidden sm:table-cell">
                      <span className="px-2.5 py-1 rounded-full text-2xs font-bold bg-orange-50 text-orange-800 border border-orange-100">
                        {recipe.category}
                      </span>
                    </td>

                    {/* Time */}
                    <td className="p-4 hidden md:table-cell text-stone-600 font-medium">
                      {recipe.prepTime} + {recipe.cookTime}
                    </td>

                    {/* Ingredients Count */}
                    <td className="p-4 hidden lg:table-cell text-stone-600 font-medium">
                      {recipe.ingredients?.length || 0} မျိုး
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/recipe/${recipe.id}`}
                          className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                          title="View on Website"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => onEditRecipe(recipe)}
                          className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`"${recipe.title}" ကို ဖျက်ရန် သေချာပါသလား?`)) {
                              onDeleteRecipe(recipe.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

    </div>
  );
}
