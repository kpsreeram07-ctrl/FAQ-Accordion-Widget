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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/70 border-b border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white group"
        >
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-600/30 group-hover:bg-indigo-500 transition-colors">
            <BookOpen className="w-4 h-4" />
          </span>
          <span className="font-semibold text-white tracking-tight">
            FAQ Accordion Widget
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#faq-list"
            className="hover:text-white transition-colors"
          >
            All Questions
          </a>
          <a
            href="#categories"
            className="hover:text-white transition-colors"
          >
            Categories
          </a>
          <button
            onClick={() => onSelectCategory('Favorites')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="font-mono text-xs tabular-nums text-amber-400">
                ({favoritesCount})
              </span>
            )}
          </button>
          <a
            href="#recently-viewed"
            className="hover:text-white transition-colors"
          >
            Recently Viewed
          </a>
          <a
            href="#ai-assistant"
            className="hover:text-white transition-colors"
          >
            AI Assistant
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700 cursor-pointer"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-300" />
            )}
          </button>

          <button
            onClick={onOpenAI}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/30 whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
