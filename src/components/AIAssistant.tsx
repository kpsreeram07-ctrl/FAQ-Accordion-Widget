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
      <div className="rounded-2xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-md shadow-xl shadow-black/20 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-700/60 bg-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  AI FAQ Assistant
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Instant RAG
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Ask questions in natural language and receive grounded answers from our FAQ database.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400 self-start sm:self-center">
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
                <div className="max-w-[85%] px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-medium leading-relaxed shadow-sm">
                  {item.question}
                </div>
              </div>

              {/* Answer bubble in dark navy glass */}
              <div className="flex justify-start">
                <div className="max-w-[95%] p-4 rounded-xl bg-slate-900/70 border border-slate-700/70 text-slate-200 text-xs sm:text-sm space-y-3 shadow-md shadow-black/10">
                  <div className="whitespace-pre-line leading-relaxed text-slate-300">
                    {item.answer}
                  </div>

                  {/* Matched FAQ References */}
                  {item.matchedFaqs.length > 0 && (
                    <div className="pt-3 border-t border-slate-700/60">
                      <p className="text-[11px] font-semibold text-slate-400 mb-2">
                        Referenced Documentation:
                      </p>
                      <div className="space-y-1.5">
                        {item.matchedFaqs.map((faq) => (
                          <button
                            key={faq.id}
                            onClick={() => onJumpToFaq(faq.id)}
                            className="w-full text-left flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-indigo-400/80 hover:bg-slate-750 transition-colors group cursor-pointer"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                              <span className="text-xs font-medium text-slate-200 truncate group-hover:text-white">
                                {faq.question}
                              </span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>Verified Knowledge Base Grounding</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-3 bg-slate-900/50 rounded-lg border border-slate-700/60">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              <span>Analyzing knowledge base for the most accurate answer...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="px-5 py-2.5 bg-slate-900/40 border-t border-slate-700/60 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-slate-400 shrink-0 text-[11px] font-medium">Try asking:</span>
          {PRESET_QUERIES.map((preset) => (
            <button
              key={preset}
              onClick={() => handleSubmit(preset)}
              className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/70 text-slate-300 hover:text-white hover:bg-slate-700 whitespace-nowrap text-[11px] shrink-0 transition-colors cursor-pointer"
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
          className="p-4 sm:p-5 border-t border-slate-700/60 bg-slate-900/50 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question (e.g. Can I upgrade mid-cycle?)..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-indigo-600 text-white disabled:opacity-40 hover:bg-indigo-500 transition-colors cursor-pointer shadow-md shadow-indigo-600/30"
            aria-label="Send question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
};
