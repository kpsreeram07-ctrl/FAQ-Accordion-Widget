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
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`font-mono text-[11px] tabular-nums ${
                  isActive
                    ? 'text-neutral-300 dark:text-neutral-600'
                    : 'text-neutral-400 dark:text-neutral-500'
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
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            selectedCategory === 'Favorites'
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Star
            className={`w-3.5 h-3.5 ${
              favoritesCount > 0
                ? 'fill-amber-400 text-amber-400'
                : 'text-neutral-400'
            }`}
          />
          <span>Favorites</span>
          <span
            className={`font-mono text-[11px] tabular-nums ${
              selectedCategory === 'Favorites'
                ? 'text-neutral-300 dark:text-neutral-600'
                : 'text-neutral-400 dark:text-neutral-500'
            }`}
          >
            {favoritesCount}
          </span>
        </button>
      </div>
    </div>
  );
};
