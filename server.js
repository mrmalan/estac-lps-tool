const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/api/generate', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured.' });
  try {
    const body = {
     model: 'claude-haiku-4-5-20251001',
      max_tokens: 8000,
      messages: req.body.messages
    };
    console.log('Calling Anthropic with model:', body.model);
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log('Anthropic response status:', response.status);
    if (!response.ok) {
      console.log('Anthropic error:', JSON.stringify(data));
      return res.status(response.status).json(data);
    }
    res.json(data);
  } catch (err) {
    console.log('Fetch error:', err.message);
    res.status(500).json({ error: 'Proxy failed: ' + err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Estac LPS Tool running on port ' + PORT));
