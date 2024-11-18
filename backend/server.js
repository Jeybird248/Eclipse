const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
