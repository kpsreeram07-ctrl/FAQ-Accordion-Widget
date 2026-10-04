import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { FAQ_CATEGORIES } from '../data/faqData';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenAI: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAI }) => {
  return (
    <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Wordmark & Summary */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <BookOpen className="w-3.5 h-3.5" />
              </span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                FAQ Accordion Widget
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-sm">
              Accessible, interactive accordion documentation engine with instant search, deep-linking, category filters, and intelligent knowledge grounding.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs">
              <button
                onClick={onOpenAI}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Ask AI Assistant</span>
              </button>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {FAQ_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Keyboard Shortcuts */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider mb-3">
              Keyboard Shortcuts
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li className="flex items-center justify-between">
                <span className="text-neutral-500">Focus search</span>
                <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 text-[11px]">
                  /
                </kbd>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-neutral-500">Toggle question</span>
                <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 text-[11px]">
                  Enter / Space
                </kbd>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-neutral-500">Close modal</span>
                <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 text-[11px]">
                  Esc
                </kbd>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} FAQ Accordion Widget. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-600 dark:hover:text-neutral-300">
              WCAG 2.1 AA Compliant
            </span>
            <span>·</span>
            <span className="hover:text-neutral-600 dark:hover:text-neutral-300">
              Semantic React & Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
