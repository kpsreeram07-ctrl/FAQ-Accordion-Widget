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
        <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-28 py-3.5 text-xs sm:text-sm rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 shadow-lg shadow-black/20 backdrop-blur-md transition-all"
          aria-label="Search FAQs"
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          {value ? (
            <button
              onClick={onClear}
              className="p-1 text-slate-400 hover:text-white transition-colors rounded cursor-pointer"
              title="Clear search"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-800/80 rounded border border-slate-700">
              /
            </kbd>
          )}

          {onOpenAI && (
            <button
              onClick={onOpenAI}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-300 hover:text-white hover:bg-indigo-600/30 rounded-md transition-colors cursor-pointer border border-indigo-500/30"
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
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400">
          <span className="text-slate-500 mr-1 font-medium">Popular:</span>
          {suggestions.map((topic) => (
            <button
              key={topic}
              onClick={() => onSelectSuggestion ? onSelectSuggestion(topic) : onChange(topic)}
              className="px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700/60 hover:border-slate-600 transition-colors whitespace-nowrap cursor-pointer text-[11px]"
            >
              {topic}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
