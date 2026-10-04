export interface FAQItem {
  id: string;
  category: 'General' | 'Account' | 'Payments' | 'Technical Support' | 'Services';
  question: string;
  answer: string;
  tags: string[];
  lastUpdated: string;
  popular?: boolean;
}

export const FAQ_CATEGORIES = [
  'All',
  'General',
  'Account',
  'Payments',
  'Technical Support',
  'Services',
] as const;

export type FAQCategory = (typeof FAQ_CATEGORIES)[number] | 'Favorites';

export const FAQ_DATA: FAQItem[] = [
  // --- GENERAL ---
  {
    id: 'general-1',
    category: 'General',
    question: 'What is the FAQ Accordion Widget and how does it work?',
    answer: 'The FAQ Accordion Widget is a production-grade, accessible knowledge base interface designed for SaaS platforms, enterprise applications, and modern websites. It provides collapsible question-and-answer panels, instant search highlighting, customizable categories, single/multiple expansion modes, dark mode styling, and persistent bookmarks.',
    tags: ['overview', 'accordion', 'saas', 'widget'],
    lastUpdated: 'October 2026',
    popular: true,
  },
  {
    id: 'general-2',
    category: 'General',
    question: 'Can I integrate this accordion into my existing tech stack?',
    answer: 'Yes. The widget is built with modular React components and styled using Tailwind CSS. It is decoupled from any specific backend, making it trivial to embed into existing React, Next.js, Remix, or Vite applications. All data is structured in a type-safe TypeScript schema.',
    tags: ['integration', 'react', 'tailwind', 'frameworks'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'general-3',
    category: 'General',
    question: 'What browsers and devices are officially supported?',
    answer: 'We officially support all evergreen modern browsers, including Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and mobile browsers on iOS (Safari/Chrome) and Android. The layout adheres to WCAG 2.1 AA accessibility guidelines and responsive design principles.',
    tags: ['browsers', 'compatibility', 'mobile', 'accessibility'],
    lastUpdated: 'August 2026',
  },
  {
    id: 'general-4',
    category: 'General',
    question: 'How do I link directly to a specific question or answer?',
    answer: 'Every FAQ item features an automatic URL anchor hash (for example, #faq-general-1). You can click the "Share" or deep-link icon on any question to copy the exact URL. Opening that link will automatically scroll to and expand the target question with a visual pulse indicator.',
    tags: ['deep linking', 'url', 'anchor', 'sharing'],
    lastUpdated: 'October 2026',
    popular: true,
  },

  // --- ACCOUNT ---
  {
    id: 'account-1',
    category: 'Account',
    question: 'How do I reset or change my account password?',
    answer: 'Navigate to your Account Settings > Security tab and select "Change Password". If you have forgotten your password and cannot sign in, click the "Forgot Password" link on the login page. Enter your verified email address, and a secure password reset link valid for 15 minutes will be dispatched immediately.',
    tags: ['password', 'reset', 'security', 'login'],
    lastUpdated: 'September 2026',
    popular: true,
  },
  {
    id: 'account-2',
    category: 'Account',
    question: 'How can I enable Two-Factor Authentication (2FA)?',
    answer: 'To enable 2FA, open Settings > Security > Two-Factor Authentication. Scan the displayed QR code with your preferred authenticator app (such as Google Authenticator, 1Password, or Authy). Enter the generated 6-digit verification code to confirm, and be sure to safely download your emergency recovery backup codes.',
    tags: ['2fa', 'mfa', 'security', 'authenticator'],
    lastUpdated: 'August 2026',
  },
  {
    id: 'account-3',
    category: 'Account',
    question: 'Can I transfer workspace ownership or change my primary email?',
    answer: 'Workspace owners can transfer ownership to any verified administrator under Settings > Team & Permissions > Transfer Ownership. To update your primary login email, navigate to Profile Settings, input your new address, and confirm the verification link sent to both old and new inboxes.',
    tags: ['email', 'workspace', 'ownership', 'admin'],
    lastUpdated: 'July 2026',
  },
  {
    id: 'account-4',
    category: 'Account',
    question: 'What happens when I request account deletion?',
    answer: 'Account deletion is irreversible. Under Settings > Danger Zone, selecting "Delete Account" initiates a 7-day grace period during which you may cancel the request. After 7 days, all associated profile records, API tokens, and private data are permanently purged in accordance with GDPR and CCPA regulations.',
    tags: ['deletion', 'gdpr', 'privacy', 'data retention'],
    lastUpdated: 'September 2026',
  },

  // --- PAYMENTS ---
  {
    id: 'payment-1',
    category: 'Payments',
    question: 'What payment methods and currencies do you accept?',
    answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and SEPA direct debit for European entities. Enterprise accounts qualify for automated invoice billing via ACH or SWIFT bank wire with Net-30 payment terms.',
    tags: ['payment', 'credit card', 'paypal', 'ach', 'wire'],
    lastUpdated: 'October 2026',
    popular: true,
  },
  {
    id: 'payment-2',
    category: 'Payments',
    question: 'What is your refund policy if I am not satisfied?',
    answer: 'We offer a no-questions-asked 30-day money-back guarantee on all standard monthly and annual self-serve subscriptions. If you wish to cancel within your first 30 days, contact support or click "Request Refund" in the Billing dashboard. Custom enterprise contracts are governed by individual Master Services Agreements.',
    tags: ['refund', 'guarantee', 'cancellation', 'policy'],
    lastUpdated: 'August 2026',
    popular: true,
  },
  {
    id: 'payment-3',
    category: 'Payments',
    question: 'How do seat upgrades and mid-cycle plan changes work?',
    answer: 'When you upgrade your plan or add team seats mid-billing cycle, we apply prorated billing. You are only charged for the exact days remaining in the current cycle. Credit balances from plan downgrades are automatically credited toward subsequent renewal statements.',
    tags: ['upgrade', 'proration', 'billing', 'seats'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'payment-4',
    category: 'Payments',
    question: 'Where can I download VAT-compliant tax invoices and receipts?',
    answer: 'All historical invoices, tax receipts, and payment statements are available in Billing > Invoices. Invoices are generated as downloadable PDFs complete with your registered business name, tax ID (VAT/GST/EIN), and itemized line breakdowns.',
    tags: ['invoices', 'vat', 'taxes', 'pdf', 'receipts'],
    lastUpdated: 'July 2026',
  },

  // --- TECHNICAL SUPPORT ---
  {
    id: 'tech-1',
    category: 'Technical Support',
    question: 'How do I report a system bug or unexpected glitch?',
    answer: 'You can submit technical bug reports via our Help Center ticket portal or by clicking the "Report Issue" button in the application footer. For high-priority operational defects, include your browser version, operating system, console logs, and steps to reproduce for expedited triage.',
    tags: ['bugs', 'support', 'troubleshooting', 'logs'],
    lastUpdated: 'October 2026',
    popular: true,
  },
  {
    id: 'tech-2',
    category: 'Technical Support',
    question: 'What are the API rate limits and how do I authenticate requests?',
    answer: 'REST and GraphQL API requests authenticate via Bearer token headers (Authorization: Bearer YOUR_API_KEY). Standard tier plans have a rate ceiling of 1,200 requests per minute with burst capability up to 60 RPS. Enterprise plans offer custom rate allocations and dedicated IP whitelisting.',
    tags: ['api', 'rate limit', 'token', 'authentication'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'tech-3',
    category: 'Technical Support',
    question: 'How is data encrypted in transit and at rest?',
    answer: 'All data transmitted across our public edge networks is encrypted using TLS 1.3 with automated HSTS enforcement. Persistent storage volumes and database instances utilize AES-256 encryption at rest with automated cryptographic key rotation managed via Google Cloud KMS.',
    tags: ['encryption', 'security', 'tls', 'aes-256', 'compliance'],
    lastUpdated: 'August 2026',
  },
  {
    id: 'tech-4',
    category: 'Technical Support',
    question: 'How often are automated system backups performed?',
    answer: 'Automated incremental snapshots are captured every 6 hours, supplemented by daily full encrypted snapshots replicated across multiple geographic cloud regions. Point-in-time recovery (PITR) is maintained for a 35-day rolling window.',
    tags: ['backups', 'snapshots', 'disaster recovery', 'pitr'],
    lastUpdated: 'July 2026',
  },

  // --- SERVICES ---
  {
    id: 'services-1',
    category: 'Services',
    question: 'What Service Level Agreement (SLA) uptime guarantee do you offer?',
    answer: 'We provide a 99.95% monthly uptime guarantee for Business tier customers and a 99.99% financially-backed SLA for Enterprise tier agreements. Our public status monitor provides real-time latency indicators and 90-day incident retrospectives.',
    tags: ['sla', 'uptime', 'reliability', 'enterprise'],
    lastUpdated: 'October 2026',
    popular: true,
  },
  {
    id: 'services-2',
    category: 'Services',
    question: 'Do you offer professional migration and onboarding consulting?',
    answer: 'Yes. Our Professional Services engineering group provides white-glove data migration, bespoke CRM/ERP integrations, custom webhook architectures, and tailored team training workshops. Contact our solutions architecture team to discuss scope.',
    tags: ['migration', 'consulting', 'onboarding', 'training'],
    lastUpdated: 'August 2026',
  },
  {
    id: 'services-3',
    category: 'Services',
    question: 'How does priority 24/7 dedicated support work?',
    answer: 'Enterprise organizations receive direct access to a dedicated Slack or Microsoft Teams shared channel, a assigned Technical Account Manager (TAM), and a 15-minute response SLA for critical Severity-1 production incidents around the clock.',
    tags: ['support', '24/7', 'tam', 'slack', 'incident'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'services-4',
    category: 'Services',
    question: 'Can we request customized feature development or security audits?',
    answer: 'Enterprise contracts include quarterly roadmap advisory sessions where feature enhancements can be prioritized. We also accommodate third-party SOC 2 Type II, ISO 27001, and custom vendor risk assessment questionnaires upon request.',
    tags: ['custom', 'soc2', 'audit', 'compliance', 'security'],
    lastUpdated: 'July 2026',
  },
];
