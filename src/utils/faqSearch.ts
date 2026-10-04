import { FAQItem } from '../data/faqData';

export interface SearchResult {
  item: FAQItem;
  score: number;
  matchedFields: ('question' | 'answer' | 'tag' | 'category')[];
}

/**
 * Searches FAQs using keyword matching and relevance scoring.
 * Works 100% statically in the browser without any backend or external API.
 */
export function searchFAQs(faqs: FAQItem[], query: string): FAQItem[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return faqs;

  const queryTokens = cleanQuery
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((token) => token.length > 1);

  const scored: SearchResult[] = [];

  for (const item of faqs) {
    const questionLower = item.question.toLowerCase();
    const answerLower = item.answer.toLowerCase();
    const categoryLower = item.category.toLowerCase();
    const tagsLower = item.tags.map((t) => t.toLowerCase());

    let score = 0;
    const matchedFields: ('question' | 'answer' | 'tag' | 'category')[] = [];

    // Exact full query match
    if (questionLower.includes(cleanQuery)) {
      score += 40;
      matchedFields.push('question');
    }
    if (answerLower.includes(cleanQuery)) {
      score += 20;
      matchedFields.push('answer');
    }
    if (categoryLower.includes(cleanQuery)) {
      score += 15;
      matchedFields.push('category');
    }
    if (tagsLower.some((t) => t.includes(cleanQuery))) {
      score += 15;
      matchedFields.push('tag');
    }

    // Token-level matches
    for (const token of queryTokens) {
      if (questionLower.includes(token)) {
        score += 8;
        if (!matchedFields.includes('question')) matchedFields.push('question');
      }
      if (tagsLower.some((t) => t.includes(token))) {
        score += 6;
        if (!matchedFields.includes('tag')) matchedFields.push('tag');
      }
      if (answerLower.includes(token)) {
        score += 4;
        if (!matchedFields.includes('answer')) matchedFields.push('answer');
      }
    }

    if (score > 0) {
      scored.push({ item, score, matchedFields });
    }
  }

  return scored.sort((a, b) => b.score - a.score).map((res) => res.item);
}

/**
 * Knowledge retrieval for the AI FAQ Assistant.
 * Synthesizes grounded answers from matched FAQ records.
 */
export function queryKnowledgeBase(
  faqs: FAQItem[],
  query: string
): {
  answer: string;
  matchedFaqs: FAQItem[];
  confidence: 'high' | 'medium' | 'low';
} {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return {
      answer: 'Please enter a question to search the knowledge base.',
      matchedFaqs: [],
      confidence: 'low',
    };
  }

  const matches = searchFAQs(faqs, cleanQuery);

  if (matches.length === 0) {
    return {
      answer: `I could not find an exact answer for "${cleanQuery}" in the knowledge base. Try searching for related topics such as passwords, payments, refunds, two-factor authentication, or API documentation.`,
      matchedFaqs: [],
      confidence: 'low',
    };
  }

  const primary = matches[0];
  const secondary = matches.slice(1, 3);

  let synthesized = `According to our documentation on "${primary.question}":\n\n${primary.answer}`;

  if (secondary.length > 0) {
    synthesized += `\n\nRelated questions that may also help: ${secondary.map((s) => `"${s.question}"`).join(' and ')}.`;
  }

  return {
    answer: synthesized,
    matchedFaqs: matches.slice(0, 3),
    confidence: matches.length > 1 ? 'high' : 'medium',
  };
}
