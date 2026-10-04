import React from 'react';
import { FAQItem } from '../data/faqData';
import { FAQItemCard } from './FAQItemCard';
import { SearchX, Star, Sparkles } from 'lucide-react';

interface FAQListProps {
  faqs: FAQItem[];
  openIds: Set<string>;
  onToggleFaq: (id: string) => void;
  searchQuery: string;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  feedback: Record<string, 'yes' | 'no'>;
  onProvideFeedback: (id: string, value: 'yes' | 'no') => void;
  onShowToast: (text: string, type?: 'success' | 'info') => void;
  highlightedFaqId: string | null;
  selectedCategory: string;
  isFiltered: boolean;
  onResetFilters: () => void;
  onOpenAI: () => void;
}

export const FAQList: React.FC<FAQListProps> = ({
  faqs,
  openIds,
  onToggleFaq,
  searchQuery,
  favorites,
  onToggleFavorite,
  feedback,
  onProvideFeedback,
  onShowToast,
  highlightedFaqId,
  selectedCategory,
  isFiltered,
  onResetFilters,
  onOpenAI,
}) => {
  if (faqs.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-700/80 bg-slate-800/40 backdrop-blur-md my-6 shadow-lg shadow-black/15">
        <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center mx-auto mb-3 border border-slate-700">
          {selectedCategory === 'Favorites' ? (
            <Star className="w-6 h-6 text-amber-400 fill-amber-400/20" />
          ) : (
            <SearchX className="w-6 h-6 text-slate-400" />
          )}
        </div>

        <h3 className="text-base font-semibold text-white">
          {selectedCategory === 'Favorites'
            ? 'No favorite questions yet'
            : 'No matching questions found'}
        </h3>

        <p className="mt-1 text-xs text-slate-300 max-w-md mx-auto text-balance">
          {selectedCategory === 'Favorites'
            ? 'Click the star icon on any question to bookmark it here for fast reference.'
            : `We could not find any questions matching "${searchQuery}". Try using different keywords, clearing filters, or asking our AI Assistant.`}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Clear Search & Filters
            </button>
          )}

          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Assistant</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="faq-list" className="space-y-3 my-6">
      {faqs.map((faq) => (
        <FAQItemCard
          key={faq.id}
          item={faq}
          isOpen={openIds.has(faq.id)}
          onToggle={() => onToggleFaq(faq.id)}
          searchQuery={searchQuery}
          isFavorite={favorites.includes(faq.id)}
          onToggleFavorite={onToggleFavorite}
          feedback={feedback[faq.id]}
          onProvideFeedback={onProvideFeedback}
          onShowToast={onShowToast}
          isHighlighted={highlightedFaqId === faq.id}
        />
      ))}
    </div>
  );
};
