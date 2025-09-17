const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Set up CORS to only allow requests from your Client URL
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/outlets', require('./routes/outletRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));