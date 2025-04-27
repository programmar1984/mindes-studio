const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.post('/api/ask-gpt', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o", // Or "gpt-3.5-turbo" if you're saving costs
      messages: [
        { role: "system", content: "You are a helpful design assistant who proposes creative layout ideas based on user goals." },
        { role: "user", content: message }
      ],
      temperature: 0.7,
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating AI response');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
