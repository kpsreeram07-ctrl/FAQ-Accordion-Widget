import React from 'react';
import { History, X, ExternalLink } from 'lucide-react';
import { FAQItem } from '../data/faqData';

interface RecentlyViewedProps {
  recentItems: FAQItem[];
  onSelectFaq: (id: string) => void;
  onClearRecent: () => void;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  recentItems,
  onSelectFaq,
  onClearRecent,
}) => {
  if (recentItems.length === 0) return null;

  return (
    <section id="recently-viewed" className="w-full pt-8 pb-4">
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            <History className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Recently Viewed Questions</span>
            <span className="font-mono tabular-nums text-neutral-400 text-[11px]">
              ({recentItems.length})
            </span>
          </div>

          <button
            onClick={onClearRecent}
            className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            title="Clear history"
          >
            <X className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {recentItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectFaq(item.id)}
              className="text-left p-3 rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors group flex items-start justify-between gap-2"
            >
              <div className="min-w-0">
                <span className="block text-[11px] font-medium text-neutral-400 dark:text-neutral-500 mb-0.5">
                  {item.category}
                </span>
                <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.question}
                </p>
              </div>
              <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-indigo-600 shrink-0 mt-1" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
