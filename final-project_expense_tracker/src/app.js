const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const sharedRouter = require('../routes/sharedRoute')
const userRoute = require('../routes/userRoute')
const categoryRoute = require('../routes/categoryRoute')
const expenseRoute = require('../routes/expenseRoute')
const app = express()

// Loads .env file
dotenv.config();

// Middleware
const corsOptions = {
    origin: 'https://greenmark.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}


// Routes
app.use(cors(corsOptions))
app.use(express.json())
app.use('/shared', sharedRouter)
app.use('/user', userRoute)
app.use('/category', categoryRoute)
app.use('/expense', expenseRoute)

module.exports = app