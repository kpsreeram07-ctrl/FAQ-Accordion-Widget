import React from 'react';
import { Sun, Moon, Sparkles, BookOpen } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenAI: () => void;
  onSelectCategory: (cat: string) => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenAI,
  onSelectCategory,
  favoritesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-neutral-950/90 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-base font-bold tracking-tight text-neutral-900 dark:text-white group"
        >
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-indigo-700 transition-colors">
            <BookOpen className="w-4 h-4" />
          </span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            FAQ Accordion Widget
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <a
            href="#faq-list"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            All Questions
          </a>
          <a
            href="#categories"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Categories
          </a>
          <button
            onClick={() => onSelectCategory('Favorites')}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="font-mono text-xs tabular-nums text-amber-600 dark:text-amber-400">
                ({favoritesCount})
              </span>
            )}
          </button>
          <a
            href="#recently-viewed"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Recently Viewed
          </a>
          <a
            href="#ai-assistant"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            AI Assistant
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600" />
            )}
          </button>

          <button
            onClick={onOpenAI}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
