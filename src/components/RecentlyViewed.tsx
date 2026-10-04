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
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-md p-4 sm:p-5 shadow-lg shadow-black/15">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <History className="w-3.5 h-3.5 text-indigo-400" />
            <span>Recently Viewed Questions</span>
            <span className="font-mono tabular-nums text-slate-400 text-[11px]">
              ({recentItems.length})
            </span>
          </div>

          <button
            onClick={onClearRecent}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
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
              className="text-left p-3 rounded-lg border border-slate-700/60 bg-slate-800/60 hover:border-indigo-400/80 hover:bg-slate-750 transition-colors group flex items-start justify-between gap-2 cursor-pointer shadow-xs"
            >
              <div className="min-w-0">
                <span className="block text-[11px] font-medium text-indigo-400 mb-0.5">
                  {item.category}
                </span>
                <p className="text-xs font-medium text-slate-200 line-clamp-1 group-hover:text-white transition-colors">
                  {item.question}
                </p>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-400 shrink-0 mt-1" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
