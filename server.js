// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Připojení k MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Definování modelu pro ukládání feedbacku
const feedbackSchema = new mongoose.Schema({
  email: String,
  feedback: String,
  submissionDate: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Middleware pro zpracování těla požadavku
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware pro povolení požadavků z jiných domén
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpoint pro příjem feedbacku
app.post('/submitFeedback', (req, res) => {
  const newFeedback = new Feedback({
    email: req.body.email,
    feedback: req.body.feedback
  });

  newFeedback.save()
    .then(() => res.status(201).send('Feedback saved successfully'))
    .catch(err => res.status(500).send('Failed to save feedback'));
});

// Spuštění serveru
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
