import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
import authRoutes from './routes/auth.js'; // Use the correct path and extension for your import
app.use('/api/auth', authRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

