

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

const allowedOrigins = [
  'http://localhost:5173',
  'https://printter01.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

const sheetApiUrl = 'https://script.google.com/macros/s/AKfycbz8knlr_Y7ZhKi0MoSV1A2BhW83-HkV4XEYiLNAc8J1oZEIZE1sjEuZCPy8OhA1O37C/exec';

app.get('/nakhin', async (req, res) => {
  try {
    const response = await axios.get(sheetApiUrl);
    let data = response.data;

    if (req.query.name) {
      const name = req.query.name.toLowerCase();
      data = data.filter(item => item["ຊື່"]?.toLowerCase() === name);
    }

    res.json(data);
  } catch (err) {
    console.error('❌ Error fetching data:', err.message);
    res.status(500).json({ error: 'ไม่สามารถโหลดข้อมูลได้' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
