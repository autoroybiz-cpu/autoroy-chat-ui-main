import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ai-service',
    timestamp: new Date().toISOString()
  });
});

// MAIN AI ENDPOINT
app.post('/api/ai/lead-intent', async (req, res) => {
  const text = req.body.text || '';
  // כאן אפשר לשים מודל שתבחר
  res.json({
    intent: "test",
    received: text
  });
});

// ⛔ אל תשנה את זה — Render קובע את הפורט!
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`AI-service running on port ${PORT}`);
  