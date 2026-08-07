const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

// 1. Set up the server
const app = express();
app.use(cors()); // Lets your frontend talk to this backend
app.use(express.json()); // Lets the server read JSON data sent from the frontend

// 2. Set up the AI using your secret key from the .env file
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 3. Create the route that handles the chatbox requests
app.post('/api/recommend-trip', async (req, res) => {
  try {
    // Get the data sent from your frontend chatbox
    const { budget, duration, query } = req.body;

    // Tell the AI how to act and give it the user's details
    const prompt = `You are a helpful travel assistant. 
    The user has a budget of $${budget || 'unknown'}. 
    The trip is for ${duration || 'an unknown number of'} days. 
    The user asks: "${query}". 
    Please give a short, simple travel plan, a quick cost estimate, and suggest a destination.`;

    // Ask the AI to generate the response
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    // Send the AI's answer back to your frontend
    res.json({ result: response.text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sorry, the AI could not process that request right now.' });
  }
});

// 4. Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});