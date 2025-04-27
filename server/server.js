// server/server.js
import OpenAI from 'openai';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,               
  }));
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/ask-gpt', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to OpenAI');
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
