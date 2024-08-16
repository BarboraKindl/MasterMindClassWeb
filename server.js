const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware pro parsování JSON dat
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Připojení k MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Definice schématu a modelu pro zpětnou vazbu
const feedbackSchema = new mongoose.Schema({
    email: { type: String, required: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// API endpoint pro příjem a uložení zpětné vazby
app.post('/api/feedback', async (req, res) => {
    try {
        const { email, message } = req.body;
        const feedback = new Feedback({ email, message });
        await feedback.save();
        res.status(201).send('Zpětná vazba byla úspěšně uložena.');
    } catch (error) {
        res.status(500).send('Došlo k chybě při ukládání zpětné vazby.');
    }
});

// Spuštění serveru
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});
