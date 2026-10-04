import React from 'react';
import { FAQ_CATEGORIES, FAQCategory } from '../data/faqData';
import { Star } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: FAQCategory;
  onSelectCategory: (category: FAQCategory) => void;
  categoryCounts: Record<string, number>;
  favoritesCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  favoritesCount,
}) => {
  return (
    <div id="categories" className="w-full">
      <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none py-1">
        {FAQ_CATEGORIES.map((cat) => {
          const count = categoryCounts[cat] || 0;
          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-500'
                  : 'bg-slate-800/50 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-600'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`font-mono text-[11px] tabular-nums ${
                  isActive
                    ? 'text-indigo-200'
                    : 'text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}

        {/* Favorites filter button */}
        <button
          onClick={() => onSelectCategory('Favorites')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
            selectedCategory === 'Favorites'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-500'
              : 'bg-slate-800/50 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-600'
          }`}
        >
          <Star
            className={`w-3.5 h-3.5 ${
              favoritesCount > 0
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-400'
            }`}
          />
          <span>Favorites</span>
          <span
            className={`font-mono text-[11px] tabular-nums ${
              selectedCategory === 'Favorites'
                ? 'text-indigo-200'
                : 'text-slate-400'
            }`}
          >
            {favoritesCount}
          </span>
        </button>
      </div>
    </div>
  );
};
