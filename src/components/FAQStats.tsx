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
      <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-md shadow-lg shadow-black/15">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
          <HelpCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-slate-400 truncate">
            Total FAQs
          </p>
          <p className="text-base sm:text-lg font-bold font-mono tabular-nums text-white">
            {totalCount}
          </p>
        </div>
      </div>

      {/* Visible FAQs */}
      <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-md shadow-lg shadow-black/15">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
          <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-slate-400 truncate">
            Visible FAQs
          </p>
          <p className="text-base sm:text-lg font-bold font-mono tabular-nums text-white">
            {visibleCount}
          </p>
        </div>
      </div>

      {/* Favorite FAQs */}
      <button
        onClick={onSelectFavorites}
        className="text-left flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-md shadow-lg shadow-black/15 hover:border-amber-400/50 hover:bg-slate-800/70 transition-colors group cursor-pointer"
        title="View favorite questions"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-amber-500/30">
          <Star className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-amber-400 text-amber-400" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-slate-400 truncate group-hover:text-amber-300 transition-colors">
            Favorites
          </p>
          <p className="text-base sm:text-lg font-bold font-mono tabular-nums text-white">
            {favoriteCount}
          </p>
        </div>
      </button>
    </div>
  );
};
