import React from 'react';
import { SearchBar } from './SearchBar';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  onOpenAI: () => void;
  totalCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  onOpenAI,
  totalCount,
}) => {
  return (
    <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-14 border-b border-slate-800/80 bg-slate-900/20 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Subtle unboxed metadata kicker */}
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 mb-3.5">
          <span className="text-indigo-400 font-semibold tracking-wide">Knowledge Base</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="font-mono tabular-nums text-slate-300">{totalCount} Questions</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">Instant Search & Deep Links</span>
        </div>

        {/* Headline with balanced wrap in pure white */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto text-balance">
          Frequently Asked Questions
        </h1>

        <p className="mt-3.5 text-sm sm:text-base text-slate-300 max-w-xl mx-auto text-balance leading-relaxed">
          Instant answers to questions regarding your account, billing, security protocols, technical support, and platform architecture.
        </p>

        {/* Central Search Bar */}
        <div className="mt-8">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onClear={onClearSearch}
            onOpenAI={onOpenAI}
            onSelectSuggestion={onSearchChange}
          />
        </div>
      </div>
    </section>
  );
};

