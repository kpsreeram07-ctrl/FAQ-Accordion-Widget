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
      className={`rounded-xl border transition-all duration-200 scroll-mt-24 ${
        isOpen
          ? 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 shadow-sm'
          : 'bg-white/70 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
      } ${
        isHighlighted
          ? 'ring-2 ring-indigo-500 border-indigo-500 shadow-md'
          : ''
      }`}
    >
      {/* Header / Trigger */}
      <div className="p-4 sm:p-5">
        {/* Unboxed Metadata Line */}
        <div className="flex items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              {item.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{item.lastUpdated}</span>
            {item.popular && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
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
              className="p-1.5 rounded-md text-neutral-400 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star
                className={`w-4 h-4 transition-transform active:scale-125 ${
                  isFavorite
                    ? 'fill-amber-400 text-amber-400'
                    : 'stroke-neutral-400 dark:stroke-neutral-500'
                }`}
              />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Share or copy deep link"
              aria-label="Share question link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Button (Semantic button with accessible ARIA) */}
        <button
          type="button"
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-controls={`answer-${item.id}`}
          className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md py-0.5"
        >
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <HighlightText text={item.question} query={searchQuery} />
          </h3>

          {/* Plus/Minus rotation indicator */}
          <div
            className={`shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
              isOpen
                ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white rotate-45'
                : 'border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 group-hover:border-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200'
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
            <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
              {/* Answer Content */}
              <div className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                <HighlightText text={item.answer} query={searchQuery} />
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="text-neutral-400 dark:text-neutral-500">Related tags:</span>
                  {item.tags.map((tag, idx) => (
                    <span key={tag} className="text-neutral-600 dark:text-neutral-400">
                      #{tag}
                      {idx < item.tags.length - 1 && ' '}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom Utilities: Was this helpful? + Copy Button */}
              <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                {/* Helpful Feedback Section */}
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 dark:text-neutral-400">
                    Was this helpful?
                  </span>

                  {feedback ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {feedback === 'yes'
                        ? 'Thanks for your feedback! 👍'
                        : "Thanks for letting us know! We'll improve this. 📝"}
                    </span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onProvideFeedback(item.id, 'yes')}
                        className="flex items-center gap-1 px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                        title="Yes, this was helpful"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>Yes</span>
                      </button>
                      <button
                        onClick={() => onProvideFeedback(item.id, 'no')}
                        className="flex items-center gap-1 px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-300 dark:hover:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
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
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Copy full answer text"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
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
                    className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
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
