import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Star,
  Copy,
  Check,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Link as LinkIcon,
} from 'lucide-react';
import { FAQItem } from '../data/faqData';
import { HighlightText } from '../utils/textHighlight';

interface FAQItemCardProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  searchQuery: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  feedback?: 'yes' | 'no';
  onProvideFeedback: (id: string, value: 'yes' | 'no') => void;
  onShowToast: (text: string, type?: 'success' | 'info') => void;
  isHighlighted?: boolean;
}

export const FAQItemCard: React.FC<FAQItemCardProps> = ({
  item,
  isOpen,
  onToggle,
  searchQuery,
  isFavorite,
  onToggleFavorite,
  feedback,
  onProvideFeedback,
  onShowToast,
  isHighlighted = false,
}) => {
  const [copied, setCopied] = useState(false);

  const hashId = `faq-${item.id}`;

  const handleCopyAnswer = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.answer).then(() => {
      setCopied(true);
      onShowToast('Answer copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const pathname = window.location.pathname.endsWith('/')
      ? window.location.pathname
      : `${window.location.pathname}/`;
    const shareUrl = `${window.location.origin}${pathname}#${hashId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.question,
          text: item.answer,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard if share was cancelled or unsupported
      }
    }

    navigator.clipboard.writeText(shareUrl).then(() => {
      onShowToast('Deep link copied to clipboard!', 'success');
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <article
      id={hashId}
      className={`rounded-xl border transition-all duration-300 backdrop-blur-md scroll-mt-24 shadow-lg shadow-black/20 ${
        isOpen
          ? 'bg-slate-800/75 border-slate-600/80 ring-1 ring-indigo-500/30'
          : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600/70 hover:bg-slate-800/65'
      } ${
        isHighlighted
          ? 'ring-2 ring-indigo-400 border-indigo-400 shadow-indigo-950/40 shadow-xl'
          : ''
      }`}
    >
      {/* Header / Trigger */}
      <div className="p-4 sm:p-5">
        {/* Unboxed Metadata Line */}
        <div className="flex items-center justify-between gap-3 text-xs text-slate-400 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-medium text-indigo-400">
              {item.category}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">{item.lastUpdated}</span>
            {item.popular && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                  <Sparkles className="w-3 h-3" />
                  Popular
                </span>
              </>
            )}
          </div>

          {/* Action buttons (Favorite & Deep Link) */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(item.id);
              }}
              className="p-1.5 rounded-md text-slate-400 hover:text-amber-400 hover:bg-slate-700/50 transition-colors"
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star
                className={`w-4 h-4 transition-transform active:scale-125 ${
                  isFavorite
                    ? 'fill-amber-400 text-amber-400'
                    : 'stroke-slate-400'
                }`}
              />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
              title="Share or copy deep link"
              aria-label="Share question link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Button with subtle hover effect (Semantic button with accessible ARIA) */}
        <button
          type="button"
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-controls={`answer-${item.id}`}
          className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 p-2 sm:p-2.5 -m-2 sm:-m-2.5 rounded-lg hover:bg-slate-700/30 transition-all duration-200 cursor-pointer"
        >
          <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
            <HighlightText text={item.question} query={searchQuery} />
          </h3>

          {/* Plus/Minus rotation indicator */}
          <div
            className={`shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
              isOpen
                ? 'bg-indigo-600 text-white border-indigo-500 rotate-45 shadow-sm shadow-indigo-600/40'
                : 'border-slate-600/80 bg-slate-700/50 text-slate-300 group-hover:border-slate-500 group-hover:text-white group-hover:bg-slate-700/80'
            }`}
            aria-hidden="true"
          >
            <Plus className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Collapsible Answer Region with Smooth Height Animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`answer-${item.id}`}
            role="region"
            aria-labelledby={hashId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-2 border-t border-slate-700/60">
              {/* Answer Content in light gray */}
              <div className="text-sm leading-relaxed text-slate-300">
                <HighlightText text={item.answer} query={searchQuery} />
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                  <span className="text-slate-500">Related tags:</span>
                  {item.tags.map((tag, idx) => (
                    <span key={tag} className="text-slate-300 hover:text-indigo-300 transition-colors">
                      #{tag}
                      {idx < item.tags.length - 1 && ' '}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom Utilities: Was this helpful? + Copy Button */}
              <div className="mt-5 pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                {/* Helpful Feedback Section */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">
                    Was this helpful?
                  </span>

                  {feedback ? (
                    <span className="text-emerald-400 font-medium">
                      {feedback === 'yes'
                        ? 'Thanks for your feedback! 👍'
                        : "Thanks for letting us know! We'll improve this. 📝"}
                    </span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onProvideFeedback(item.id, 'yes')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-950/40 transition-colors cursor-pointer"
                        title="Yes, this was helpful"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>Yes</span>
                      </button>
                      <button
                        onClick={() => onProvideFeedback(item.id, 'no')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-rose-300 hover:border-rose-500/50 hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="No, this was not helpful"
                      >
                        <ThumbsDown className="w-3 h-3" />
                        <span>No</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Copy Answer & Deep Link Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyAnswer}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/70 hover:border-slate-600 transition-colors cursor-pointer"
                    title="Copy full answer text"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">
                          Copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Answer</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`#${hashId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleShare(e);
                    }}
                    className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
                    title="Anchor link"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
