export const STORAGE_KEYS = {
  THEME: 'faq_theme_pref',
  FAVORITES: 'faq_favorites_list',
  RECENTLY_VIEWED: 'faq_recently_viewed_list',
  FEEDBACK: 'faq_feedback_map',
  MULTI_EXPAND: 'faq_multi_expand_pref',
} as const;

export function getStoredTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  if (saved === 'dark' || saved === 'light') return saved;
  return 'dark';
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

export function getStoredFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : ['general-1', 'payment-2'];
  } catch {
    return ['general-1', 'payment-2'];
  }
}

export function setStoredFavorites(ids: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(ids));
}

export function getStoredRecentlyViewed(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
    return raw ? JSON.parse(raw) : ['general-1'];
  } catch {
    return ['general-1'];
  }
}

export function addStoredRecentlyViewed(id: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getStoredRecentlyViewed().filter((item) => item !== id);
    const updated = [id, ...current].slice(0, 5);
    localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getStoredFeedback(): Record<string, 'yes' | 'no'> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setStoredFeedback(faqId: string, value: 'yes' | 'no'): Record<string, 'yes' | 'no'> {
  const current = getStoredFeedback();
  current[faqId] = value;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(current));
  }
  return { ...current };
}

export function getStoredMultiExpand(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.MULTI_EXPAND) === 'true';
}

export function setStoredMultiExpand(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.MULTI_EXPAND, String(enabled));
}
