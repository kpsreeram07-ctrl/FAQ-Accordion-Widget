import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { FAQ_DATA } from './src/data/faqData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Initialize Gemini API client if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Knowledge base context representation for grounding
  const faqContext = FAQ_DATA.map(
    (item) => `[ID: ${item.id}] [Category: ${item.category}]\nQ: ${item.question}\nA: ${item.answer}`
  ).join('\n\n');

  // AI FAQ Assistant API endpoint
  app.post('/api/faq-assistant', async (req: Request, res: Response) => {
    try {
      const { question } = req.body;
      if (!question || typeof question !== 'string') {
        res.status(400).json({ error: 'Question string is required' });
        return;
      }

      if (!ai) {
        // Fallback response with matching FAQ ids if GEMINI_API_KEY is not configured
        const lowerQ = question.toLowerCase();
        const matches = FAQ_DATA.filter(
          (f) =>
            f.question.toLowerCase().includes(lowerQ) ||
            f.answer.toLowerCase().includes(lowerQ) ||
            f.tags.some((t) => t.toLowerCase().includes(lowerQ))
        ).slice(0, 3);

        if (matches.length > 0) {
          res.json({
            answer: `Here is the relevant information from our verified FAQ knowledge base:\n\n${matches[0].answer}`,
            faqIds: matches.map((m) => m.id),
            source: 'knowledge-base',
          });
        } else {
          res.json({
            answer: `I could not find a direct answer for "${question}" in our documentation. Please browse the General, Account, Payments, Technical Support, or Services categories.`,
            faqIds: [],
            source: 'knowledge-base',
          });
        }
        return;
      }

      const prompt = `User question: "${question}"

Knowledge base documentation:
${faqContext}

Instructions:
1. Answer the user's question directly, clearly, and accurately based ONLY on the provided knowledge base documentation.
2. If the documentation does not contain the answer, politely state that it is not covered in the current FAQ and suggest contacting human support.
3. At the end of your response, output a single line with JSON array of matching article IDs like this:
REFERENCES: ["general-1", "payment-2"]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are the expert FAQ and Knowledge Base Assistant. You provide helpful, concise, well-structured answers grounded strictly in the provided documentation.',
          temperature: 0.2,
        },
      });

      const rawText = response.text || '';
      let answerText = rawText;
      const faqIds: string[] = [];

      const refMatch = rawText.match(/REFERENCES:\s*(\[.*?\])/);
      if (refMatch) {
        try {
          const parsed = JSON.parse(refMatch[1]);
          if (Array.isArray(parsed)) {
            faqIds.push(...parsed);
          }
          answerText = rawText.replace(/REFERENCES:\s*(\[.*?\])/, '').trim();
        } catch {
          // ignore parsing error
        }
      }

      res.json({
        answer: answerText,
        faqIds,
        source: 'gemini',
      });
    } catch (err: unknown) {
      console.error('Error generating answer:', err);
      res.status(500).json({ error: 'Failed to process assistant request' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Mount Vite middleware in development or serve static in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
