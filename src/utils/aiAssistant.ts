import { FAQ_DATA, FAQItem } from '../data/faqData';

export interface AIResponse {
  answer: string;
  matchedFaqs: FAQItem[];
  source: 'gemini' | 'knowledge-base';
}

export async function askFAQAssistant(userQuestion: string): Promise<AIResponse> {
  const trimmed = userQuestion.trim();
  if (!trimmed) {
    return {
      answer: 'Please enter a question so I can search the knowledge base for you.',
      matchedFaqs: [],
      source: 'knowledge-base',
    };
  }

  // On GitHub Pages or static host, directly use client knowledge base without failed network calls
  const isStaticHost =
    typeof window !== 'undefined' &&
    (window.location.hostname.includes('github.io') ||
      window.location.protocol === 'file:');

  if (!isStaticHost) {
    // Attempt backend API with timeout if running locally or on server with Gemini
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);

      const res = await fetch('/api/faq-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: trimmed }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.answer) {
          const matchedFaqs: FAQItem[] = [];
          if (Array.isArray(data.faqIds)) {
            data.faqIds.forEach((id: string) => {
              const found = FAQ_DATA.find((f) => f.id === id);
              if (found) matchedFaqs.push(found);
            });
          }

          if (matchedFaqs.length === 0) {
            matchedFaqs.push(...findRelevantFaqs(trimmed, 2));
          }

          return {
            answer: data.answer,
            matchedFaqs,
            source: 'gemini',
          };
        }
      }
    } catch {
      // Seamlessly fallback to client knowledge-base engine
    }
  }

  // Client-side intelligent semantic search and answer synthesis
  return generateClientFAQAnswer(trimmed);
}

function findRelevantFaqs(query: string, maxCount = 3): FAQItem[] {
  const lowerQuery = query.toLowerCase();
  const queryTokens = lowerQuery
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const scored = FAQ_DATA.map((item) => {
    let score = 0;
    const lowerQuestion = item.question.toLowerCase();
    const lowerAnswer = item.answer.toLowerCase();
    const lowerTags = item.tags.map((t) => t.toLowerCase());

    // Exact phrase match
    if (lowerQuestion.includes(lowerQuery)) score += 30;
    if (lowerAnswer.includes(lowerQuery)) score += 15;

    // Token matches
    queryTokens.forEach((token) => {
      if (lowerQuestion.includes(token)) score += 10;
      if (lowerTags.includes(token)) score += 8;
      if (lowerAnswer.includes(token)) score += 4;
    });

    return { item, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCount)
    .map((s) => s.item);
}

function generateClientFAQAnswer(query: string): AIResponse {
  const matched = findRelevantFaqs(query, 3);

  if (matched.length === 0) {
    return {
      answer: `I could not find a specific match for "${query}" in our existing knowledge base articles. You can try rephrasing your question or check the categories: General, Account, Payments, Technical Support, and Services. You can also contact our support team for specialized help.`,
      matchedFaqs: [],
      source: 'knowledge-base',
    };
  }

  const primary = matched[0];
  const secondary = matched.slice(1);

  let synthesized = `Based on our verified documentation for "${primary.question}":\n\n${primary.answer}`;

  if (secondary.length > 0) {
    synthesized += `\n\nRelated topics include: ${secondary.map((s) => `"${s.question}"`).join(' and ')}.`;
  }

  return {
    answer: synthesized,
    matchedFaqs: matched,
    source: 'knowledge-base',
  };
}
