import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  BookOpen,
  ArrowRight,
  HelpCircle,
  CheckCircle,
} from 'lucide-react';
import { askFAQAssistant, AIResponse } from '../utils/aiAssistant';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToFaq: (id: string) => void;
}

const PRESET_QUERIES = [
  'What payment methods are supported?',
  'How do I enable 2-Factor Authentication?',
  'What is your 30-day refund policy?',
  'What are the API rate limits?',
  'How do you handle backups & encryption?',
];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onJumpToFaq,
}) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<
    Array<{ question: string; response: AIResponse }>
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isLoading]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (queryText?: string) => {
    const textToSubmit = queryText || input;
    if (!textToSubmit.trim() || isLoading) return;

    const currentQuery = textToSubmit.trim();
    setInput('');
    setIsLoading(true);

    try {
      const response = await askFAQAssistant(currentQuery);
      setHistory((prev) => [...prev, { question: currentQuery, response }]);
    } catch {
      setHistory((prev) => [
        ...prev,
        {
          question: currentQuery,
          response: {
            answer:
              'An unexpected error occurred while searching documentation. Please browse the categorized questions directly or try again.',
            matchedFaqs: [],
            source: 'knowledge-base',
          },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-modal-title"
            className="relative w-full max-w-2xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col max-h-[85vh] z-10 text-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2
                    id="ai-modal-title"
                    className="text-sm font-semibold text-white"
                  >
                    AI Knowledge Assistant
                  </h2>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span>Grounded in verified documentation</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {history.length === 0 && (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto mb-3">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    Ask any question about our services
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 max-w-sm mx-auto">
                    Type a question below or click one of the suggested topics to get instant synthesized answers.
                  </p>

                  {/* Preset Suggestions */}
                  <div className="mt-5 flex flex-wrap justify-center gap-1.5">
                    {PRESET_QUERIES.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handleSubmit(preset)}
                        className="text-left px-3 py-1.5 text-xs rounded-lg border border-slate-700 bg-slate-800/80 hover:border-indigo-400 hover:bg-slate-750 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Thread */}
              {history.map((turn, index) => (
                <div key={index} className="space-y-3">
                  {/* User bubble */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-medium leading-relaxed shadow-sm">
                      {turn.question}
                    </div>
                  </div>

                  {/* Assistant response */}
                  <div className="flex justify-start">
                    <div className="max-w-[95%] p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs sm:text-sm space-y-3 shadow-md shadow-black/20">
                      {/* Answer prose */}
                      <div className="whitespace-pre-line leading-relaxed text-slate-300">
                        {turn.response.answer}
                      </div>

                      {/* Matched FAQ References */}
                      {turn.response.matchedFaqs.length > 0 && (
                        <div className="pt-3 border-t border-slate-700/60">
                          <span className="block text-[11px] font-semibold text-slate-400 mb-2">
                            Referenced Knowledge Base Articles:
                          </span>
                          <div className="space-y-1.5">
                            {turn.response.matchedFaqs.map((faq) => (
                              <button
                                key={faq.id}
                                onClick={() => {
                                  onJumpToFaq(faq.id);
                                  onClose();
                                }}
                                className="w-full text-left flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-indigo-400 transition-colors group cursor-pointer"
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

                      {/* Source attribution indicator */}
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>
                          {turn.response.source === 'gemini'
                            ? 'Generated with Gemini API & grounded in FAQ docs'
                            : 'Verified from FAQ knowledge base'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-400 p-3 bg-slate-800/60 rounded-lg border border-slate-700/70">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  <span>Searching knowledge base and synthesizing answer...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900"
            >
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question (e.g. How do I upgrade my team's seats?)..."
                  disabled={isLoading}
                  className="w-full pl-4 pr-12 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-1.5 rounded-lg bg-indigo-600 text-white disabled:opacity-40 hover:bg-indigo-500 transition-colors cursor-pointer shadow-md shadow-indigo-600/30"
                  aria-label="Send question"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
