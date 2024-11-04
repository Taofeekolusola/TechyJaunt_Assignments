const dotenv = require('dotenv')
const express = require('express');
const cors = require('cors');
const testRouter = require('../routes/testRoute')
const userRouter = require('../routes/userRoute');
const jobRouter = require('../routes/jobRoute');

const app = express();

dotenv.config();

// Middleware
const corsOptions = {
    origin: 'https://greenmark.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}


// Routes
app.use(cors(corsOptions))
app.use(express.json());
app.use('/test', testRouter);
app.use('/users', userRouter);
app.use('/jobs', jobRouter);

module.exports = app;