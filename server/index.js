const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Route Imports
const tripRoutes = require('./routes/tripRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Essential for Postman/Frontend to send JSON data

// API Routes
app.use('/api/trips', tripRoutes);     // Handles CRUD for trips and items
app.use('/api/reports', reportRoutes); // Handles Aggregation reports

// Basic Health Check Route
app.get('/', (req, res) => {
    res.send('Grocery Tracker API is running...');
});

// Server Listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});