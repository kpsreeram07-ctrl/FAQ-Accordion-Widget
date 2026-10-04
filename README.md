# FAQ Accordion Widget

A modern, production-grade, accessible FAQ accordion website designed for deployment to **GitHub Pages**.

🔗 **Live GitHub Pages URL**: [https://kpsreeram07-ctrl.github.io/FAQ-Accordion-Widget/](https://kpsreeram07-ctrl.github.io/FAQ-Accordion-Widget/)

---

## Overview

FAQ Accordion Widget is a lightweight, responsive knowledge base interface built with React, Vite, TypeScript, and Tailwind CSS. It operates **100% statically** without requiring server-side rendering, databases, or API keys, while offering an optional AI-style FAQ knowledge assistant with client-side RAG retrieval.

---

## Key Features

1. **Collapsible Accordion & Smooth Animations**
   - Expand and collapse answers with smooth height and opacity transitions.
   - Clean `+` and `−` indicator icons with a 45-degree rotation animation.
   - Accessible buttons with ARIA states (`aria-expanded`, `aria-controls`, `role="region"`).

2. **Single & Multi-Expand Modes**
   - Toggle between **Single Item Mode** (only one item open at a time) and **Multi-Expand Mode**.
   - Dedicated **Expand All** and **Collapse All** actions.

3. **Instant FAQ Search & Keyword Highlighting**
   - Search across questions, answers, categories, and tags in real time.
   - Matches are highlighted directly in the text without disrupting layout.
   - Clean "No results found" state with one-click filter reset.

4. **Category Filtering**
   - Five core categories: **General**, **Account**, **Payments**, **Technical Support**, and **Services**.
   - Real-time count of questions per category.

5. **FAQ Statistics**
   - Metrics display showing **Total FAQs**, **Visible FAQs**, and **Favorite FAQs**.

6. **Favorites / Bookmarking**
   - Star any question to save it to your local favorites.
   - Filter directly by favorite questions.
   - Preserved across visits using `localStorage`.

7. **Helpful Feedback**
   - "Was this helpful?" (`[Yes]` / `[No]`) ratings on every answer.
   - Remembers previous feedback and displays a thank-you note.

8. **Direct Deep Linking & Share**
   - Every question has a direct URL anchor (e.g. `#faq-payment-1`).
   - Clicking a shared link scrolls directly to the question, opens it, and applies a subtle highlight flash.
   - Supports the Web Share API with an automatic copy-link fallback.

9. **Copy Answer**
   - Copy question answers to the clipboard with visual "Copied!" confirmation.

10. **Recently Viewed**
    - Tracks your 5 most recently opened questions in `localStorage` for quick re-consultation.

11. **Dark & Light Mode**
    - Instant theme switching with auto-detection and persistence in `localStorage`.

12. **AI FAQ Assistant**
    - Conversational assistant powered by static Retrieval-Augmented Generation (RAG).
    - Works out of the box **without requiring any API key** or backend server.
    - Matches user inquiries to relevant documentation and cites specific FAQ articles.

---

## Technical Architecture & GitHub Pages Configuration

### Vite Base Path
Configured in `vite.config.ts`:
```ts
export default defineConfig({
  base: '/FAQ-Accordion-Widget/',
  // ...
});
```

### Static Asset Handling
- All asset imports are resolved through Vite's bundler.
- `public/404.html` and `public/.nojekyll` are included to guarantee seamless SPA routing and prevent Jekyll processing on GitHub Pages.

### Component Structure
```
src/
├── components/
│   ├── AccordionControls.tsx # Mode toggles, expand/collapse all
│   ├── AIAssistant.tsx       # Inline AI FAQ Assistant with client RAG
│   ├── AIAssistantModal.tsx  # Quick-drawer AI FAQ Assistant modal
│   ├── CategoryFilter.tsx    # Category & Favorites tab buttons
│   ├── FAQItemCard.tsx       # Accessible collapsible accordion card
│   ├── FAQList.tsx           # Accordion container & zero-results state
│   ├── FAQStats.tsx          # Total, Visible, and Favorite count cards
│   ├── Footer.tsx            # SaaS footer with shortcuts & links
│   ├── Hero.tsx              # Hero header with knowledge base metrics
│   ├── Navbar.tsx            # Sticky top bar with navigation & dark mode toggle
│   ├── RecentlyViewed.tsx    # 5 most recently consulted questions
│   ├── SearchBar.tsx         # Search input with keyboard shortcuts
│   └── Toast.tsx             # Non-intrusive feedback notifications
├── data/
│   └── faqData.ts            # Type-safe FAQ knowledge base dataset
├── utils/
│   ├── faqSearch.ts          # Static client search & RAG query functions
│   ├── storage.ts            # LocalStorage abstraction (theme, favorites, history)
│   └── textHighlight.tsx     # Keyword search highlighter component
├── App.tsx                   # Main state orchestration
├── index.css                 # Tailwind CSS v4 styling & typography
└── main.tsx                  # React DOM mount point
```

---

## Deployment to GitHub Pages

This repository includes an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

### How It Works:
1. When you push to the `main` branch, the workflow triggers automatically.
2. It sets up Node.js 20, installs dependencies, and runs `npm run build`.
3. The generated `dist` folder is uploaded as a GitHub Pages artifact.
4. GitHub Pages deploys the static site to:
   `https://kpsreeram07-ctrl.github.io/FAQ-Accordion-Widget/`

### Enable GitHub Pages in Repository Settings:
1. Go to your repository on GitHub: `kpsreeram07-ctrl/FAQ-Accordion-Widget`.
2. Navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. Push your changes to the `main` branch or trigger the workflow under **Actions > Deploy to GitHub Pages > Run workflow**.

---

## Local Development & Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
This generates the optimized static files in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## Keyboard Shortcuts
- `/` : Focus search input
- `Enter` / `Space` : Toggle focused FAQ item
- `Esc` : Close modals / clear focus
