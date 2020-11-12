const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Import Routes
const authRoute = require('./routes/auth');

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => {
  console.log('connected');
});

const app = express();
const PORT = 5000;

// Route Middlewares
app.use('/api/user', authRoute);

app.listen(5000);