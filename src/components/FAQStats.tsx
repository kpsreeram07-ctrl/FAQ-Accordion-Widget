import React from 'react';
import { HelpCircle, Eye, Star } from 'lucide-react';

interface FAQStatsProps {
  totalCount: number;
  visibleCount: number;
  favoriteCount: number;
  onSelectFavorites?: () => void;
}

export const FAQStats: React.FC<FAQStatsProps> = ({
  totalCount,
  visibleCount,
  favoriteCount,
  onSelectFavorites,
}) => {
  return (
    <div className="w-full grid grid-cols-3 gap-2.5 sm:gap-4 my-6">
      {/* Total FAQs */}
      <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <HelpCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
            Total FAQs
          </p>
          <p className="text-base sm:text-lg font-bold font-mono tabular-nums text-neutral-900 dark:text-white">
            {totalCount}
          </p>
        </div>
      </div>

      {/* Visible FAQs */}
      <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
          <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
            Visible FAQs
          </p>
          <p className="text-base sm:text-lg font-bold font-mono tabular-nums text-neutral-900 dark:text-white">
            {visibleCount}
          </p>
        </div>
      </div>

      {/* Favorite FAQs */}
      <button
        onClick={onSelectFavorites}
        className="text-left flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs hover:border-amber-400/60 dark:hover:border-amber-500/60 transition-colors group cursor-pointer"
        title="View favorite questions"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Star className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-amber-400 text-amber-400" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Favorites
          </p>
          <p className="text-base sm:text-lg font-bold font-mono tabular-nums text-neutral-900 dark:text-white">
            {favoriteCount}
          </p>
        </div>
      </button>
    </div>
  );
};
