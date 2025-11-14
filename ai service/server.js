// server.js – AI service (Render + Local)

// ==== Imports ====
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// ==== App setup ====
const app = express();
app.use(express.json());
app.use(cors());

// ==== Health check ====
app.get('/health', (req, res) => {
res.json({
status: 'ok',
service: 'ai-service',
timestamp: new Date().toISOString()
});
});

// ==== MAIN AI ENDPOINT ====
app.post('/api/ai/lead-intent', async (req, res) => {
const text = req.body.text || '';

res.json({
intent: 'test',
received: text
});
});

// ==== PORT (Render נותן אותו אוטומטית) ====
const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
console.log(`AI-service running on port ${PORT}`);
});