// server.js - AI service (Render + Local)

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// ===== App setup =====
const app = express();
const PORT = process.env.PORT || 4002;

// JSON body
app.use(express.json());

// ===== Open CORS for all origins =====
app.use(cors());

// ===== Simple logger for all requests =====
app.use((req, res, next) => {
console.log('[AI]', req.method, req.url, 'at', new Date().toISOString());
next();
});

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