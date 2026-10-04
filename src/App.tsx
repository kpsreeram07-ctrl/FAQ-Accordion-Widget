import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { AccordionControls } from './components/AccordionControls';
import { FAQStats } from './components/FAQStats';
import { FAQList } from './components/FAQList';
import { AIAssistant } from './components/AIAssistant';
import { RecentlyViewed } from './components/RecentlyViewed';
import { AIAssistantModal } from './components/AIAssistantModal';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { FAQ_DATA, FAQCategory, FAQItem } from './data/faqData';
import { searchFAQs } from './utils/faqSearch';
import {
  getStoredTheme,
  setStoredTheme,
  getStoredFavorites,
  setStoredFavorites,
  getStoredRecentlyViewed,
  addStoredRecentlyViewed,
  getStoredFeedback,
  setStoredFeedback,
  getStoredMultiExpand,
  setStoredMultiExpand,
} from './utils/storage';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Accordion state
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['general-1']));
  const [isMultiExpand, setIsMultiExpand] = useState<boolean>(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('All');

  // Persistence data
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Record<string, 'yes' | 'no'>>({});

  // UI Modals & Notifications
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [highlightedFaqId, setHighlightedFaqId] = useState<string | null>(null);

  // Initial load from storage
  useEffect(() => {
    const savedTheme = getStoredTheme();
    setTheme(savedTheme);
    applyThemeClass(savedTheme);

    setFavorites(getStoredFavorites());
    setRecentIds(getStoredRecentlyViewed());
    setFeedback(getStoredFeedback());
    setIsMultiExpand(getStoredMultiExpand());
  }, []);

  const applyThemeClass = (currentTheme: 'light' | 'dark') => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setStoredTheme(newTheme);
    applyThemeClass(newTheme);
    addToast(
      newTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled',
      'info'
    );
  };

  const addToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Deep linking: parse hash on load or on hashchange
  const processHash = useCallback(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#faq-')) {
      const targetId = hash.replace('#faq-', '');
      const exists = FAQ_DATA.find((item) => item.id === targetId);
      if (exists) {
        // Expand the item
        setOpenIds((prev) => new Set([...prev, targetId]));
        setHighlightedFaqId(targetId);

        // Record in recently viewed
        const updatedRecent = addStoredRecentlyViewed(targetId);
        setRecentIds(updatedRecent);

        // Scroll to element after short tick
        setTimeout(() => {
          const el = document.getElementById(`faq-${targetId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);

        // Clear highlight flash after 3 seconds
        setTimeout(() => {
          setHighlightedFaqId(null);
        }, 3000);
      }
    }
  }, []);

  useEffect(() => {
    processHash();
    window.addEventListener('hashchange', processHash);
    return () => window.removeEventListener('hashchange', processHash);
  }, [processHash]);

  // Toggle single FAQ item
  const handleToggleFaq = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      const isAlreadyOpen = next.has(id);

      if (isAlreadyOpen) {
        next.delete(id);
      } else {
        if (!isMultiExpand) {
          next.clear();
        }
        next.add(id);

        // Add to recently viewed on open
        const updatedRecent = addStoredRecentlyViewed(id);
        setRecentIds(updatedRecent);
      }
      return next;
    });
  };

  // Multi-expand toggle
  const handleToggleMultiExpand = () => {
    const nextVal = !isMultiExpand;
    setIsMultiExpand(nextVal);
    setStoredMultiExpand(nextVal);

    // If switching to single-open mode and multiple are currently open, keep only the first one
    if (!nextVal && openIds.size > 1) {
      const first = Array.from(openIds)[0];
      setOpenIds(new Set([first]));
    }

    addToast(
      nextVal
        ? 'Multi-expand enabled: Open multiple questions at once'
        : 'Single mode enabled: Only one question open at a time',
      'info'
    );
  };

  // Expand All / Collapse All
  const handleExpandAll = () => {
    setIsMultiExpand(true);
    setStoredMultiExpand(true);
    const visibleIds = filteredFaqs.map((f) => f.id);
    setOpenIds(new Set(visibleIds));
    addToast(`Expanded ${visibleIds.length} questions`, 'info');
  };

  const handleCollapseAll = () => {
    setOpenIds(new Set());
    addToast('All questions collapsed', 'info');
  };

  // Favorites toggle
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      setStoredFavorites(next);
      addToast(
        exists ? 'Removed from favorites' : 'Saved to favorites ⭐',
        'success'
      );
      return next;
    });
  };

  // Feedback handler
  const handleProvideFeedback = (id: string, value: 'yes' | 'no') => {
    const updated = setStoredFeedback(id, value);
    setFeedback(updated);
    addToast('Thank you for your feedback!', 'success');
  };

  // Filtered FAQs calculation using searchFAQs
  const filteredFaqs = useMemo(() => {
    // 1. Filter by category or favorites
    let categoryFiltered = FAQ_DATA;
    if (selectedCategory === 'Favorites') {
      categoryFiltered = FAQ_DATA.filter((item) => favorites.includes(item.id));
    } else if (selectedCategory !== 'All') {
      categoryFiltered = FAQ_DATA.filter((item) => item.category === selectedCategory);
    }

    // 2. Filter by search query
    if (!searchQuery.trim()) {
      return categoryFiltered;
    }

    return searchFAQs(categoryFiltered, searchQuery);
  }, [selectedCategory, searchQuery, favorites]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: FAQ_DATA.length,
      General: 0,
      Account: 0,
      Payments: 0,
      'Technical Support': 0,
      Services: 0,
    };

    FAQ_DATA.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category] += 1;
      }
    });

    return counts;
  }, []);

  // Jump to specific FAQ from recent list or AI modal
  const handleJumpToFaq = (id: string) => {
    const target = FAQ_DATA.find((f) => f.id === id);
    if (!target) return;

    // Reset filters if item is currently hidden
    if (selectedCategory !== 'All' && selectedCategory !== target.category) {
      if (selectedCategory === 'Favorites' && !favorites.includes(id)) {
        setSelectedCategory('All');
      } else if (selectedCategory !== 'Favorites') {
        setSelectedCategory('All');
      }
    }
    setSearchQuery('');

    // Open target item
    setOpenIds((prev) => new Set([...prev, id]));
    setHighlightedFaqId(id);

    const updatedRecent = addStoredRecentlyViewed(id);
    setRecentIds(updatedRecent);

    // Update browser URL hash
    window.history.pushState(null, '', `#faq-${id}`);

    setTimeout(() => {
      const el = document.getElementById(`faq-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

    setTimeout(() => {
      setHighlightedFaqId(null);
    }, 2500);
  };

  const handleClearRecent = () => {
    localStorage.removeItem('faq_recently_viewed_list');
    setRecentIds([]);
    addToast('Recently viewed history cleared', 'info');
  };

  const recentItems = useMemo(() => {
    return recentIds
      .map((id) => FAQ_DATA.find((item) => item.id === id))
      .filter((item): item is FAQItem => item !== undefined);
  }, [recentIds]);

  const isFiltered = Boolean(searchQuery.trim() || selectedCategory !== 'All');

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Top Bar Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAI={() => setIsAIModalOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat as FAQCategory)}
        favoritesCount={favorites.length}
      />

      {/* Hero Section with Search Bar */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery('')}
        onOpenAI={() => setIsAIModalOpen(true)}
        totalCount={FAQ_DATA.length}
      />

      {/* Main FAQ Content Viewport */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Category Filter Tabs */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
          favoritesCount={favorites.length}
        />

        {/* FAQ Statistics Bar */}
        <FAQStats
          totalCount={FAQ_DATA.length}
          visibleCount={filteredFaqs.length}
          favoriteCount={favorites.length}
          onSelectFavorites={() => setSelectedCategory('Favorites')}
        />

        {/* Accordion Controls (Counter, Multi-expand toggle, Expand/Collapse all) */}
        <AccordionControls
          visibleCount={filteredFaqs.length}
          totalCount={FAQ_DATA.length}
          isMultiExpand={isMultiExpand}
          onToggleMultiExpand={handleToggleMultiExpand}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
          onResetFilters={handleResetFilters}
          isFiltered={isFiltered}
        />

        {/* FAQ Accordion List Section */}
        <FAQList
          faqs={filteredFaqs}
          openIds={openIds}
          onToggleFaq={handleToggleFaq}
          searchQuery={searchQuery}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          feedback={feedback}
          onProvideFeedback={handleProvideFeedback}
          onShowToast={addToast}
          highlightedFaqId={highlightedFaqId}
          selectedCategory={selectedCategory}
          isFiltered={isFiltered}
          onResetFilters={handleResetFilters}
          onOpenAI={() => setIsAIModalOpen(true)}
        />

        {/* Recently Viewed Section */}
        <RecentlyViewed
          recentItems={recentItems}
          onSelectFaq={handleJumpToFaq}
          onClearRecent={handleClearRecent}
        />

        {/* AI FAQ Assistant Section */}
        <AIAssistant onJumpToFaq={handleJumpToFaq} />
      </main>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onJumpToFaq={handleJumpToFaq}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat as FAQCategory);
          setSearchQuery('');
        }}
        onOpenAI={() => setIsAIModalOpen(true)}
      />
    </div>
  );
}
