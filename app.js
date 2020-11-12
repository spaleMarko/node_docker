const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import Routes
const authRoute = require('./routes/auth');

dotenv.config();
const app = express();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => {
  console.log('connected');
});

// Middlewares
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);

app.listen(process.env.PORT);