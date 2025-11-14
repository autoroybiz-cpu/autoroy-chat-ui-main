// server.js - AI service (Render + Local)

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4002;

// ===== CORS פתוח לכל המקורות (UI ברנדר, לוקאלי וכו') =====
const corsOptions = {
origin: '*',
methods: ['GET', 'POST', 'OPTIONS'],
allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ===== JSON body =====
app.use(express.json());

// ===== Health check =====
function healthPayload() {
return {
status: 'ok',
service: 'ai-service',
timestamp: new Date().toISOString(),
};
}

app.get('/', (req, res) => {
res.json(healthPayload());
});

app.get('/health', (req, res) => {
res.json(healthPayload());
});

// ===== MAIN AI ENDPOINT =====
app.post('/api/ai/lead-intent', async (req, res) => {
const text = req.body.text || '';
console.log('[AI] /api/ai/lead-intent HIT:', new Date().toISOString(), 'text =', text);

// כרגע מחזירים תשובה דמו כדי לוודא שהכל עובד
res.json({
intent: 'test',
received: text,
});
});

// ===== Start server =====
app.listen(PORT, () => {
console.log(`AI-service running on port ${PORT}`);
});