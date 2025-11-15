// server.js – AI service (Render + Local)

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// ===== CORS פתוח לכל המקורות עם תמיכה מלאה =====
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ===== JSON body parser =====
app.use(express.json());

// ===== לוגר מפורט לכל הבקשות =====
app.use((req, res, next) => {
  const start = Date.now();
  console.log('[AI] Request:', req.method, req.url, 'at', new Date().toISOString(), 'IP:', req.ip);
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log('[AI] Response:', req.method, req.url, 'Status:', res.statusCode, 'Time:', duration + 'ms');
  });
  next();
});

// ===== Health check endpoints =====
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ai-service',
    timestamp: new Date().toISOString(),
    port: PORT,
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ai-service',
    timestamp: new Date().toISOString(),
    port: PORT,
  });
});

// ===== AI endpoint מדומה עם טיפול בשגיאות =====
app.post('/api/ai/lead-intent', (req, res) => {
  try {
    const { text, username, password } = req.body || {};

    console.log('[AI] /api/ai/lead-intent body:', req.body);

    if (!text && !username && !password) {
      return res.status(400).json({
        error: 'no text or credentials provided',
        timestamp: new Date().toISOString(),
      });
    }

    if (text) {
      const intent = text.toLowerCase().includes('אתר') ? 'website_request' : 'general_inquiry';
      return res.json({
        intent: intent,
        received: text,
        notes: 'תגובה דמה מה-AI-service. ניתן לשפר עם מודל AI.',
        timestamp: new Date().toISOString(),
      });
    }

    if (username && password) {
      return res.json({
        token: 'dummy-login-token-' + Date.now(),
        user: username,
        message: 'login OK (dummy)',
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('[AI] Error in /api/ai/lead-intent:', error);
    return res.status(500).json({
      error: 'internal server error',
      details: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// ===== טיפול בשגיאות כללי =====
app.use((err, req, res, next) => {
  console.error('[AI] Unhandled Error:', err.stack);
  res.status(500).json({
    error: 'internal server error',
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// ===== הפעלת השרת עם טיפול בשגיאות =====
const server = app.listen(PORT, () => {
  console.log('AI-service running on port', PORT);
  console.log('Your service is live 💫');
  console.log('Available at your primary URL on Render');
}).on('error', (err) => {
  console.error('[AI] Server failed to start:', err.message);
  process.exit(1);
});

module.exports = server;