const express = require('express')
//const cors = require('cors')
const userRouter = require('./routes/v1/user.js')
const app = express()

// const corsOptions = {
//     origin: 'https://greenmark.com',
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// }

//app.use(cors(corsOptions))
app.use(express.json())
app.use('/users', userRouter)

const PORT = 4000;

app.listen(PORT, (req, res) => {
    console.log(`App listing on port ${PORT}`)
});