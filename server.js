const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config(); // Načte proměnné z .env souboru

const app = express();

// Připojení k databázi
connectDB();

// Middleware pro parsování JSON těla požadavků
app.use(express.json());

// Definujte vaše routes
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Nastavení portu z .env nebo použití výchozího portu 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});
