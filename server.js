const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');  // Ujistěte se, že máte tento import
require('dotenv').config();

const app = express();

// Statické soubory z adresáře 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pro parsování JSON dat
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Připojení k MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

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
