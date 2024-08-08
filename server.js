// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/feedbackDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for feedback
const feedbackSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// API endpoint to handle feedback submission
app.post('/api/feedback', async (req, res) => {
  try {
    const { message } = req.body;
    const feedback = new Feedback({ message });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while submitting feedback' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
