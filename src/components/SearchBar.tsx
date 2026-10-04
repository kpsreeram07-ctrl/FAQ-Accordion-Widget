import React, { useRef, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onOpenAI?: () => void;
  placeholder?: string;
  suggestions?: string[];
  onSelectSuggestion?: (topic: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  onOpenAI,
  placeholder = 'Search by keywords, tags, or topics (e.g. refunds, 2FA, password, SLA)...',
  suggestions = [
    'Refund policy',
    'Two-Factor Authentication',
    'Password reset',
    'API rate limits',
    '99.99% SLA',
  ],
  onSelectSuggestion,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement !== inputRef.current &&
        !(document.activeElement instanceof HTMLInputElement) &&
        !(document.activeElement instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-28 py-3.5 text-xs sm:text-sm rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 shadow-xs transition-all"
          aria-label="Search FAQs"
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          {value ? (
            <button
              onClick={onClear}
              className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors rounded"
              title="Clear search"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700">
              /
            </kbd>
          )}

          {onOpenAI && (
            <button
              onClick={onOpenAI}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded-md transition-colors"
              title="Ask AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI</span>
            </button>
          )}
        </div>
      </div>

      {/* Suggested quick searches */}
      {suggestions && suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="text-neutral-400 dark:text-neutral-500 mr-1">Popular:</span>
          {suggestions.map((topic) => (
            <button
              key={topic}
              onClick={() => onSelectSuggestion ? onSelectSuggestion(topic) : onChange(topic)}
              className="px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              {topic}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
