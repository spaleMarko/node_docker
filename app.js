const express = require('express');

const userRouter = require('./routes/user');

const app = express();
const PORT = 5000;

app.use('/api/users', userRouter);

app.listen(5000);