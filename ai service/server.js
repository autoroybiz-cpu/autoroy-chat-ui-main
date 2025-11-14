// ai-service/server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ===== Basic config =====
const PORT = process.env.PORT || 4002; // תוודא שזה לא מתנגש עם שירותים אחרים

app.use(cors());
app.use(express.json());

// ===== Healthcheck =====
app.get('/health', (req, res) => {
res.json({
status: 'ok',
service: 'ai-service',
timestamp: new Date().toISOString()
});
});

// ===== Fake AI endpoint (שלב ראשון: בלי AI אמיתי) =====
app.post('/api/ai/lead-intent', (req, res) => {
const { text } = req.body || {};

if (!text) {
return res.status(400).json({
error: 'Missing "text" in request body'
});
}

console.log('📩 Received text from chat:', text);

// כרגע מוח מזויף – רק בודק שהזרימה עובדת
const fakeResponse = {
intent: 'create_lead',
fields: {
name: 'לקוח לדוגמה',
phone: '050-0000000',
note: text
},
reply_text: 'קיבלתי את הפרטים ואני מוסיף את הלקוח לרשימת הלידים שלך (כרגע זה דמו 🤖).'
};

return res.json(fakeResponse);
});

// ===== Start server =====
app.listen(PORT, () => {
console.log(`🚀 ai-service running on port ${PORT}`);
});
