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
    <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-12 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Subtle unboxed metadata kicker */}
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-3">
          <span>Knowledge Base</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{totalCount} Questions</span>
          <span aria-hidden="true">·</span>
          <span>Instant Search & Deep Links</span>
        </div>

        {/* Headline with balanced wrap */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white max-w-2xl mx-auto text-balance">
          Frequently Asked Questions
        </h1>

        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto text-balance">
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

