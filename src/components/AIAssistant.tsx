import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  BookOpen,
  ArrowRight,
  HelpCircle,
  CheckCircle,
  Bot,
} from 'lucide-react';
import { queryKnowledgeBase } from '../utils/faqSearch';
import { FAQItem, FAQ_DATA } from '../data/faqData';

interface AIAssistantProps {
  onJumpToFaq: (id: string) => void;
}

const PRESET_QUERIES = [
  'What payment methods are supported?',
  'How do I enable 2-Factor Authentication?',
  'What is your 30-day refund policy?',
  'What are the API rate limits?',
  'How do you handle backups & encryption?',
];

export const AIAssistant: React.FC<AIAssistantProps> = ({ onJumpToFaq }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<
    Array<{
      question: string;
      answer: string;
      matchedFaqs: FAQItem[];
      source: 'knowledge-base' | 'gemini';
    }>
  >([
    {
      question: 'How do I get a refund if I am not satisfied?',
      answer:
        'According to our documentation on "What is your refund policy if I am not satisfied?":\n\nWe offer a no-questions-asked 30-day money-back guarantee on all standard monthly and annual self-serve subscriptions. You can request a refund directly in the Billing dashboard or contact our support team.',
      matchedFaqs: [FAQ_DATA.find((f) => f.id === 'payment-2')!].filter(Boolean),
      source: 'knowledge-base',
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (queryText?: string) => {
    const textToSubmit = queryText || input;
    if (!textToSubmit.trim() || isLoading) return;

    const currentQuery = textToSubmit.trim();
    setInput('');
    setIsLoading(true);

    // Simulated short realistic processing latency (180ms)
    setTimeout(() => {
      // 100% static knowledge base query that works on GitHub Pages without API keys or servers
      const result = queryKnowledgeBase(FAQ_DATA, currentQuery);

      setHistory((prev) => [
        ...prev,
        {
          question: currentQuery,
          answer: result.answer,
          matchedFaqs: result.matchedFaqs,
          source: 'knowledge-base',
        },
      ]);
      setIsLoading(false);
    }, 220);
  };

  return (
    <section id="ai-assistant" className="w-full my-12 scroll-mt-24">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                  AI FAQ Assistant
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Instant RAG
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Ask questions in natural language and receive grounded answers from our FAQ database.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 self-start sm:self-center">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Ready · No API key required</span>
          </div>
        </div>

        {/* Conversation Box */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[460px] overflow-y-auto">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-3">
              {/* Question bubble */}
              <div className="flex justify-end">
                <div className="max-w-[85%] px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-medium leading-relaxed">
                  {item.question}
                </div>
              </div>

              {/* Answer bubble */}
              <div className="flex justify-start">
                <div className="max-w-[95%] p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm space-y-3">
                  <div className="whitespace-pre-line leading-relaxed">
                    {item.answer}
                  </div>

                  {/* Matched FAQ References */}
                  {item.matchedFaqs.length > 0 && (
                    <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                      <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
                        Referenced Documentation:
                      </p>
                      <div className="space-y-1.5">
                        {item.matchedFaqs.map((faq) => (
                          <button
                            key={faq.id}
                            onClick={() => onJumpToFaq(faq.id)}
                            className="w-full text-left flex items-center justify-between gap-2 p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors group cursor-pointer"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                              <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                {faq.question}
                              </span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-indigo-600 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 dark:text-neutral-500">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>Verified Knowledge Base Grounding</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-lg">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
              <span>Analyzing knowledge base for the most accurate answer...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="px-5 py-2.5 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-neutral-400 shrink-0 text-[11px] font-medium">Try asking:</span>
          {PRESET_QUERIES.map((preset) => (
            <button
              key={preset}
              onClick={() => handleSubmit(preset)}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap text-[11px] shrink-0 transition-colors cursor-pointer"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="p-4 sm:p-5 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question (e.g. Can I upgrade mid-cycle?)..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-indigo-600 text-white disabled:opacity-40 hover:bg-indigo-700 transition-colors cursor-pointer"
            aria-label="Send question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
};
